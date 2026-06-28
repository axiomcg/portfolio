---
title: VikiShop — автоматическая перепродажа цифровых товаров
tags: [project, vikishop, ecommerce, automation, playwright, pubg, gaming]
keywords: [VikiShop, перепродажа, PUBG UC, FunPay, Playerok, GGSEL, Midasbuy, автоматизация, маркетплейс, цифровые товары, FSM, 3DS, патчрайт, антибот]
---

# VikiShop — платформа автоматической перепродажи

Монорепозиторий (~35K строк Python + React/TypeScript-фронтенд): автоматизированная
торговля игровой валютой PUBG Mobile UC. Система сама принимает заказы на маркетплейсах
(FunPay / Playerok / GGSEL), закупает UC на Midasbuy через браузерную автоматизацию,
доставляет покупателю и переставляет лоты — без участия человека.

## Архитектура

- **Микросервисный Docker-стек** на общей PostgreSQL: 3 бота-маркетплейса (FunPay,
  Playerok, GGSEL) + воркер автозакупки Midasbuy + админ-бот Telegram + CRM (FastAPI API
  и React-фронт) + мониторинг (Prometheus / Grafana / node-exporter). Сервисы общаются
  только через БД-очередь (без прямой связности).
- **FSM заказа на 11 состояний** (`new → awaiting_id → id_received → confirming_id →
  queued → purchasing → delivered → relisted`, плюс ветки `failed / manual / refunded`)
  с явным графом валидируемых переходов, retry-логикой и эскалацией в ручной разбор.
- **Единый протокол `PlatformClient`** поверх трёх разных клиентов: Playerok (async
  GraphQL через кастомный TLS-транспорт с обходом DDoS-Guard), FunPay (синхронный API в
  `asyncio.to_thread`), GGSEL (async REST на aiohttp).

## Браузерная автоматизация (Midasbuy)

- **Stealth-автоматизация на `patchright`** (антидетект-форк Playwright) для обхода
  антибота Midasbuy. Page Object Model (login / topup / payment), оптимизация трафика
  через перехват сетевых запросов.
- **Пул браузеров** — по изолированному браузеру на каждый аккаунт/карту, конкурентные
  закупки в нескольких контекстах одновременно.
- **Автоматический ввод OTP из почты** (IMAP, Gmail / Mail.ru): мульти-форматный парсинг
  кодов 3DS / EPN, очистка старых писем перед закупкой, лимит соединений через семафор.

## Бизнес-логика

- **Динамический прайсинг** — парсинг цен конкурентов с FunPay/Playerok, фильтр
  скам-лотов, стратегия «всегда подрезать минимального конкурента на 1 ₽» с защитным
  полом по безубыточности; отслеживание и валидация FX-курса (USD/QAR → ₽).
- **Failover карт** — приоритетная ротация: при отклонении (B100 / недостаток баланса)
  переключение на следующую карту, при исчерпании всех — пауза заказов и алерт.
- **Админ-бот Telegram** — заказы, очередь, балансы, цены, логи, сброс карт, аналитика;
  командный канал через состояние в БД. 24/7 операции.

## Технические решения

- **Конкурентоустойчивость:** атомарный захват из очереди через
  `SELECT … FOR UPDATE SKIP LOCKED`; переходы статусов под row-lock `SELECT FOR UPDATE`
  (защита от TOCTOU).
- **Идемпотентность:** UNIQUE-ограничение на `platform_order_id`, backoff через
  `retry_after`, частичный индекс под retry-поллинг.
- **Безопасность:** Fernet-шифрование чувствительных полей карт в БД (fail-closed),
  жёстко запиненные зависимости (воспроизводимые сборки — «код двигает деньги»), CRM за
  Cloudflare Access (JWT RS256/JWKS + RBAC + audit), rate limiting (slowapi) на API.
- **Отказоустойчивость:** Docker health checks и лимиты памяти на всех сервисах, login
  fallback, пересоздание страниц, graceful shutdown, Alembic-миграции.
- **Тесты:** ~495 тестов (pytest) — FSM, репозиторий, crypto, OTP, прайсинг, чат-flow,
  транспорт, очередь закупки, CRM (auth/RBAC/stats).

## CRM

- **Бэкенд:** FastAPI — Cloudflare Access JWT-аутентификация (RS256 через JWKS), RBAC,
  audit-журнал, response-envelope, пагинация, rate limiting.
- **Фронтенд:** React 18 + Vite + TypeScript (`@tanstack/react-query`, `react-table`,
  `recharts`). Мульти-shop-архитектура (поле `shop` в заказах под несколько витрин).

## Стек

Python 3.12, asyncio, SQLAlchemy 2.0 (async) + asyncpg, PostgreSQL, Alembic, patchright
(stealth Playwright), aiohttp, IMAP, cryptography (Fernet), FastAPI, React + TypeScript +
Vite, Telegram Bot API, Prometheus + Grafana, Docker Compose.

> Вторая продуктовая линия — воркер автозакупки **Telegram Stars через Fragment** на
> TON-блокчейне (`tonutils` / `pytoniq` / `dedust`): код и тесты готовы, вывод в прод
> запланирован (в `docker-compose` пока выключен).
