---
title: Concentrated Liquidity Market-Making Bot (HyperEVM) — DeFi автоматизация
tags: [project, defi, blockchain, web3, concentrated-liquidity, market-making, hyperliquid, hyperevm, python, automation]
keywords: [HyperLiquid, HyperEVM, DeFi, ликвидность, liquidity, concentrated liquidity, пулы, market making, маркет-мейкинг, Uniswap V3, Ramses, Project X, web3, on-chain, range, диапазон, ре-центринг, Python, smart contracts, tick, sqrtPrice]
---

# Concentrated Liquidity Market-Making Bot (HyperEVM)

Внутреннее кодовое имя — **pupuly** (в README — «Liquid Bot»). Бот активного маркет-мейкинга в
concentrated-liquidity пулах (CL-форки Uniswap V3) на блокчейне **HyperEVM** — L1-сети
экосистемы HyperLiquid (`chainId 999`). Управляется через Telegram, работает 24/7 автономно.

## Что это и зачем

В classic-AMM ликвидность размазана по всей ценовой кривой. В concentrated liquidity
(механика Uniswap V3) LP задаёт **узкий ценовой диапазон («окно»)**, и весь его капитал
работает только внутри этого окна — плотность активной ликвидности на текущем тике, а значит
и **доля собираемых комиссий на вложенный доллар**, обратно пропорциональна ширине окна.
Чем уже окно — тем больше процент комиссий снимает кошелёк. Цена этого — мгновенный выход
из range (позиция перестаёт зарабатывать), поэтому стратегия держится на **агрессивном
авто-ре-центринге**: окно постоянно «приклеено» к текущей цене.

Цель проекта: market making в DeFi на молодых incentivized-DEX HyperEVM минимальным капиталом —
выжимать максимум комиссий ультра-узким окном и держать его в range непрерывно.

## Ключевой приём — «окно» (range/window)

- **Ультра-узкое окно**, симметричное относительно текущего тика: `[center − W·tickSpacing,
  center + W·tickSpacing]`, выровненное по `tickSpacing` пула. По умолчанию `W = 1` шаг тиков
  (`WIDTH_STEPS=1`) — технически минимально возможный диапазон (есть гард `lower==upper → +1
  tickSpacing`). Для Ramses ширину можно задать в рантайме в процентах через Telegram-UI: значение
  пишется в Redis (`lpbot:ramses:width_pct`) и конвертируется в число шагов
  (`steps = pct / (tick_spacing · 0.01)`, минимум 1). Подпись «±0.06%» в дашборде — это лишь
  дефолтный плейсхолдер UI, а не вычисляемое из шагов значение.
- **Авто-ре-центринг каждый poll-цикл (по умолчанию `POLL_INTERVAL = 5` с):** цикл читает текущий
  тик из `slot0` пула и перевыставляет позицию, если цена **вышла из range** (`tick ≤ tickLower`
  или `tick ≥ tickUpper`) или **подошла ≥80% ширины окна к краю** (`(tick − tickLower) ≥ 0.8·rng`
  / `(tickUpper − tick) ≥ 0.8·rng`). Перевыставление — это `decreaseLiquidity → collect → burn`
  старой позиции и `mint` новой, центрированной на текущей цене. Позиция буквально «гоняется» за
  ценой, удерживая узкое окно активным 24/7.
- Экономический смысл: на молодых DEX с программами наград (Project X — поинты/airdrop,
  Ramses — ve(3,3)-эмиссии) узкое активное окно = максимум доли комиссий и активности на
  вложенный капитал.

## Архитектура

- **Оркестратор на Telegram-боте** (python-telegram-bot 22.5): платформы как enum (Project X /
  Ramses / Balancer / Uniswap-заглушка). Каждая стратегия — синхронный web3-цикл в отдельном
  демон-потоке, обёрнутом в asyncio-задачу; graceful shutdown (`stop_event`) закрывает позиции
  перед выходом; реестр задач персистится в Redis (`lpbot:tasks*`) и **авто-восстанавливается
  после рестарта** (`post_init` → `restore_tasks`). Доступ к управлению — allowlist по Telegram
  username.
- **CL-боты под два DEX** (Project X, Ramses): инвариант «одна позиция» с on-chain сверкой
  (`balanceOf` + `tokenOfOwnerByIndex`, держим `max(tokenId)`, лишние закрываем), двойная
  персистенция tokenId (Redis + JSON-файл), парсинг нового tokenId из 4-го топика `Transfer`-лога.
  В Ramses перед бродкастом mint выполняется **dry-run** (`eth_call` mint с теми же параметрами);
  Project X dry-run не делает.
- **Балансировщик инвентаря** (`balancer.py`): держит баланс кошелька **HYPE / WHYPE / USDC**
  в целевых весах (по умолчанию 1/3 каждый), считает веса по USD-стоимости и свопает перевешенный
  актив в недовешенный. Поддержаны **два агрегатора свопов — KyberSwap и OpenOcean** (активный
  выбирается конфигом `BALANCER_AGG`, дефолт kyber); котировки двух токенов (HYPE→USDC, WHYPE→USDC)
  берутся параллельно через `ThreadPoolExecutor`. HYPE↔WHYPE — напрямую через нативный wrap/unwrap
  (`deposit`/`withdraw`), минуя агрегатор. Это «кормит» CL-боты: узкой позиции при mint нужно
  ~50/50 token0/token1. Эконом-гварды: soft/hard-band, `min_notional`, slippage-guard
  (сверка эффективной цены свопа с референсной).
- **Состояние** — Redis (позиции, статусы, конфиги, реестр задач, wakeup-флаг для мгновенного
  применения настроек без ожидания цикла). **Event-лог** — опционально PostgreSQL (psycopg v3,
  JSONB, таблица `lpbot_events`).

## Сильные инженерные решения

- Корректная **on-chain CL-математика**: `tick → price = 1.0001^tick · 10^(dec0−dec1)`, выравнивание
  границ по `tickSpacing`, конверсия ширины %↔тики.
- **Сырой `eth_call` к `slot0` (селектор `0x3850c7bd`) с ручным парсингом 7×32-байтных слов и
  two's-complement декодом знакового тика (`int24`)** — обход расхождений ABI между CL-форками
  (low-level Ethereum). Project X читает `slot0` через обычный ABI, Ramses — сырым вызовом.
- **Декодирование revert-причин по keccak-селекторам** (`Slippage()`, `NotCleared()`,
  `ERC721NonexistentToken(uint256)` и др.) для диагностики failed-транзакций.
- Абстракция над двумя разными CL-семантиками `MintParams`: Uniswap-V3-стиль со статичным
  `fee`-tier (Project X) vs Ramses-стиль, где пул ключуется `tickSpacing` в том же слоте, а
  `positions()` возвращает другой layout (без `nonce`/`operator`). Плюс абстракция над двумя
  агрегаторами свопов.
- Async-оркестрация блокирующих web3-циклов в демон-потоках + restore задач из Redis
  (отказоустойчивость), wakeup-флаг для мгновенного применения настроек.

## Стек

Python 3.13, web3.py, python-telegram-bot 22.5, Redis (`redis` 7.1), PostgreSQL (psycopg v3, JSONB —
опциональный event-лог), `requests` (HTTP к агрегаторам), KyberSwap & OpenOcean Aggregator API,
HyperEVM RPC. Concentrated liquidity (CL-форки Uniswap V3: Project X, Ramses). Нет фреймворков/сборки —
набор Python-модулей (~3200 LOC, 7 файлов). Секреты — через `.env`; доступ к управлению —
admin-allowlist по Telegram username.
