// i18n.js — bilingual dictionary + applyLang() for the terminal/CLI portfolio.
// EN/RU copy reused verbatim from the approved content spec, with the v2
// content changes (renamed sections, completed education, new UI strings).
// Template literals are used for every value so embedded straight quotes/arrows
// need no escaping. EN and RU key sets are kept strictly identical.

export const I18N = {
  en: {
    // ── Nav ──────────────────────────────────────────────────────────────
    'nav.about': `About`,
    'nav.projects': `Projects`,
    'nav.approach': `Approach`,
    'nav.skills': `Skills`,
    'nav.experience': `Experience`,
    'nav.contact': `Contact`,
    'nav.contactBtn': `contact`,

    // ── Hero ─────────────────────────────────────────────────────────────
    'hero.eyebrow': `AI AUTOMATION ENGINEER`,
    'hero.name': `Gleb Pyatkov`,
    'hero.title': `Agentic Workflows & Multi-Agent Systems`,
    'hero.tagline': `I architect and ship production AI systems — multi-agent orchestration, RAG and vector search, fine-tuning and prompt engineering — together with the surrounding software: web interfaces, native macOS (Swift) applications, backend services and infrastructure. AI-native, full-cycle from architecture to operations, delivered solo.`,
    'hero.location': `Remote-first · Open to relocation`,
    'hero.status': `open to work`,
    'hero.ctaEmail': `email`,
    'hero.ctaTelegram': `telegram`,
    'hero.ctaCV': `download cv`,

    // ── Stats ────────────────────────────────────────────────────────────
    'stats.systems': `in production`,
    'stats.solo': `solo, full-cycle`,
    'stats.platform': `full-stack + native`,
    'stats.automated': `automated`,
    'stats.autonomous': `autonomous`,
    'stats.zeroToOne': `idea → production`,

    // ── Projects ─────────────────────────────────────────────────────────
    'projects.kicker': `// what I build`,
    'projects.title': `Projects`,
    'projects.intro': `Seven production systems — AI agents, automation pipelines and full-cycle SaaS, all shipped solo.`,
    'badge.flagship': `FLAGSHIP`,
    'badge.current': `CURRENT`,

    'p1.sub': `TS monorepo for short-video creators: IG→DM funnels, viral search, AI captions, autopost`,
    'p1.b1': `4 independent Fastify 5 + TypeScript services over one PostgreSQL 16 behind an nginx gateway (Docker Compose); each self-migrates and returns a uniform {success, data, error} envelope`,
    'p1.b2': `Production AI: Groq Whisper-large-v3 transcription + Llama-3.3-70B caption generation, with system/user prompt-injection isolation over untrusted transcripts`,
    'p1.b3': `End-to-end social integrations — OAuth publishing to YouTube, TikTok & Instagram (tokens AES-256-GCM at rest), Meta-webhook comment→DM funnels (HMAC-verified), viral search via YouTube Data API + Apify`,
    'p1.m1': `4 services`,
    'p1.m2': `782 tests`,
    'p1.m3': `AES-256-GCM`,

    'p2.sub': `Autonomous AI agent that chats with recruiters and applies to jobs for me`,
    'p2.b1': `Claude-based agent across 5 conversation channels (AI recruiter, live recruiter, Telegram, Google Forms, hh.ru forms)`,
    'p2.b2': `RAG retriever over a modular knowledge base — only relevant cards enter the prompt; auto-learns from clarifications`,
    'p2.b3': `Autopilot scheduler, Playwright over SOCKS5, a Telegram userbot (GramJS) and an admin control bot`,
    'p2.m1': `5 channels`,
    'p2.m2': `RAG`,
    'p2.m3': `Autopilot`,

    'p3.sub': `Internal AI platform automating image, video & copy production for a fashion brand`,
    'p3.b1': `Solo full-cycle: FastAPI backend — 23 route groups, ~200 endpoints, 30+ service modules; ~68K LOC across Python + TypeScript`,
    'p3.b2': `Orchestrates 6+ AI providers (Gemini, OpenRouter, Kling, Veo, Topaz, Seedance) behind a persistent job queue with parallel processing, per-type concurrency limits and stuck-job recovery on restart`,
    'p3.b3': `React + TypeScript SPA — 19 tool pages (Canvas crop editor, drag-&-drop, SSE-streamed AI chat) on Supabase (Postgres + Auth + Storage), with Prometheus/Loki/Grafana observability`,
    'p3.m1': `~200 endpoints`,
    'p3.m2': `6+ AI providers`,
    'p3.m3': `−75% time`,

    'p4.sub': `Hands-off PUBG UC resale — bots buy on Midasbuy, auto-sell across 3 marketplaces`,
    'p4.b1': `Microservice Docker stack on one PostgreSQL — 3 marketplace bots (FunPay/Playerok/GGSEL) + Midasbuy purchase worker + Telegram admin bot + FastAPI/React CRM + Prometheus/Grafana; services talk only via a DB queue`,
    'p4.b2': `11-state order FSM with a validated transition graph and retry/escalation; concurrency-safe via SELECT … FOR UPDATE SKIP LOCKED queue claims and row-locked transitions; idempotent on a unique platform order id`,
    'p4.b3': `Stealth browser automation on patchright (anti-detect Playwright fork) bypassing Midasbuy's anti-bot — per-account browser pool, multi-format IMAP OTP (3DS/EPN), priority card failover, Fernet-encrypted card data`,
    'p4.m1': `11-state FSM`,
    'p4.m2': `3 marketplaces`,
    'p4.m3': `~495 tests`,

    'p5.sub': `Cross-platform voice-dictation SaaS — native macOS app, FastAPI backend, web portal`,
    'p5.b1': `Native macOS app (Swift/SwiftUI, ~12.5k LOC): global push-to-talk hotkeys, Groq Whisper transcription, clipboard + ⌘V injection into any app, cloud-synced Memory Storage`,
    'p5.b2': `FastAPI backend — 15 API modules: Supabase JWT (ES256/HS256), Redis per-user/IP rate limiting, prompt-injection-hardened Groq Llama-3.3-70B text restructuring`,
    'p5.b3': `End-to-end monetization — two payment gateways (YooKassa + CryptoCloud) with auto-renewal and referral bonuses; Prometheus/Grafana/Loki observability, Docker + nginx + Cloudflare`,
    'p5.m1': `macOS + Web`,
    'p5.m2': `JWT ES256`,
    'p5.m3': `Payments`,

    'p6.sub': `Event-driven Bybit USDT-perp futures bot — short-only fade-pump on Telegram signals`,
    'p6.b1': `Dual Bybit v5 WebSocket: a private order/execution/position stream with manual HMAC-SHA256 auth as the source of truth, plus a public ticker feed — orjson serialization, auto-reconnect, graceful SIGINT/SIGTERM shutdown`,
    'p6.b2': `Exchange-side risk management: server stop-loss attached atomically to the entry order (no unprotected window), leverage control with TTL cache + retries and Bybit error-code handling, fixed-notional sizing rounded to the lot step`,
    'p6.b3': `Persisted trade ledger on PostgreSQL + SQLAlchemy 2.0 (typed Mapped) + Alembic: a trade_log table with a 5-state trade FSM, partial-fill aggregation, weighted entry price and PnL via ORM hybrid-properties`,
    'p6.m1': `dual WebSocket`,
    'p6.m2': `HMAC-SHA256`,
    'p6.m3': `FSM ledger`,

    'p7.sub': `Concentrated-liquidity market-making bot on HyperEVM (DeFi)`,
    'p7.b1': `Auto-recenters an ultra-narrow LP window every cycle (default 5s) — closes (decreaseLiquidity → collect → burn) and re-mints on the live tick when price exits range or nears an edge, keeping the position earning fees 24/7`,
    'p7.b2': `Low-level on-chain Ethereum: raw eth_call to slot0 with manual two's-complement int24 tick decode, keccak-selector revert decoding and tickSpacing-aligned range math — abstracting two CL DEX forks (Project X, Ramses)`,
    'p7.b3': `Telegram-orchestrated 24/7 service: synchronous web3 loops in daemon threads wrapped as asyncio tasks, a Redis-persisted task registry that auto-restores after restart, plus a 3-asset inventory balancer routing swaps via KyberSwap/OpenOcean`,
    'p7.m1': `auto re-centering`,
    'p7.m2': `Uniswap V3 forks`,
    'p7.m3': `on-chain CL math`,

    // ── Approach ─────────────────────────────────────────────────────────
    'approach.kicker': `// how I work`,
    'approach.title': `Approach`,
    'about.intro': `An engineer who takes business processes from idea to production with AI agents. I orchestrate LLM agents (Claude Agent SDK, MCP, RAG) and own the whole stack — backend, integrations, frontend, infrastructure and deployment.`,
    'pillar1.title': `AUTOMATION-FIRST`,
    'pillar1.desc': `I design processes around AI agents and multi-agent orchestration, automating up to 95% of manual work.`,
    'pillar2.title': `SOLO, FULL-CYCLE`,
    'pillar2.desc': `From architecture and design to deploy and monitoring — including payments and auth.`,
    'pillar3.title': `AI-NATIVE DEVELOPMENT`,
    'pillar3.desc': `LLM agents at every stage: design, coding, testing, code review.`,
    'pillar4.title': `PRODUCTION-READY`,
    'pillar4.desc': `Every project ships: Docker, health checks, monitoring, error handling, scale.`,

    // ── Skills ───────────────────────────────────────────────────────────
    'skills.kicker': `// stack`,
    'skills.title': `Skills & tooling`,
    'skills.intro': `The stack I use to design, build and ship autonomous systems — end to end.`,
    'skills.g1': `ai & agents`,
    'skills.g2': `backend`,
    'skills.g3': `data & infra`,
    'skills.g4': `frontend & software`,
    'skills.g5': `automation`,

    // ── Shared UI strings ────────────────────────────────────────────────
    'ui.expand': `expand ▸`,
    'ui.collapse': `collapse ▾`,
    'ui.swipe': `swipe →`,
    'ui.workflow': `▶ workflow`,

    // ── Experience ───────────────────────────────────────────────────────
    'exp.kicker': `// experience`,
    'exp.title': `Experience`,
    'exp.company': `Mario Berlucci`,
    'exp.role': `Fullstack Developer`,
    'exp.meta': `Jan 2024 — Present`,
    'exp.tag': `Footwear & apparel retail brand`,
    'exp.b1': `Built a content-automation platform that cut video processing time by 75% (20+ min → 3–5 min) and automated 95% of manual operations`,
    'exp.b2': `Designed a multi-service architecture — 20 backend services with real-time WebSocket/SSE progress`,
    'exp.b3': `Integrated multiple external AI services with load-balancing, retry logic and dynamic pricing`,
    'exp.b4': `Built a fault-tolerant job queue (memory → DB → file) with auto-recovery and parallel processing of up to 4 videos`,
    'exp.b5': `Set up production deployment — Docker, Caddy reverse proxy with SSL, rsync delivery, health checks`,

    // ── Education / Languages ────────────────────────────────────────────
    'edu.title': `Education`,
    'edu.school': `NUST MISIS`,
    'edu.line': `Applied Informatics · Bachelor's degree · 2026`,
    'lang.title': `Languages`,
    'lang.value': `Russian — Native · English — B2 (Upper-Intermediate)`,

    // ── Contact / Footer ─────────────────────────────────────────────────
    'contact.kicker': `$ contact`,
    'contact.closing': `Let's build something that runs itself.`,
    'contact.sub': `Open to AI Automation / Agentic Engineering roles — remote-first, open to relocation.`,
    'contact.lblEmail': `email`,
    'contact.lblTelegram': `telegram`,
    'contact.lblPhone': `phone`,
    'footer.copy': `© 2026 Gleb Pyatkov · Static site, deployed on a VPS`,
    'footer.backToTop': `back to top ↑`,

    // ── ARIA labels ──────────────────────────────────────────────────────
    'aria.langGroup': `Language`,
    'aria.menuOpen': `Open menu`,
    'aria.menuClose': `Close menu`,
    'aria.railPrev': `Scroll left`,
    'aria.railNext': `Scroll right`,
    'aria.railRegion': `Project media — use arrow keys to scroll`,
    'aria.playToggle': `Play or pause video`,
  },

  ru: {
    // ── Nav ──────────────────────────────────────────────────────────────
    'nav.about': `О себе`,
    'nav.projects': `Проекты`,
    'nav.approach': `Подход`,
    'nav.skills': `Навыки`,
    'nav.experience': `Опыт`,
    'nav.contact': `Контакты`,
    'nav.contactBtn': `contact`,

    // ── Hero ─────────────────────────────────────────────────────────────
    'hero.eyebrow': `AI AUTOMATION ENGINEER`,
    'hero.name': `Глеб Пятков`,
    'hero.title': `Агентные пайплайны и мультиагентные системы`,
    'hero.tagline': `Проектирую и вывожу в продакшен AI-системы — мультиагентная оркестрация, RAG и векторный поиск, файнтюнинг и промпт-инжиниринг — вместе со всем сопутствующим ПО: веб-интерфейсами, нативными macOS-приложениями (Swift), бэкенд-сервисами и инфраструктурой. AI-native подход, полный цикл от архитектуры до эксплуатации, самостоятельно.`,
    'hero.location': `Remote-first · открыт к релокации`,
    'hero.status': `открыт к работе`,
    'hero.ctaEmail': `почта`,
    'hero.ctaTelegram': `telegram`,
    'hero.ctaCV': `скачать резюме`,

    // ── Stats ────────────────────────────────────────────────────────────
    'stats.systems': `в продакшене`,
    'stats.solo': `solo, полный цикл`,
    'stats.platform': `фулстек + нативно`,
    'stats.automated': `автоматизировано`,
    'stats.autonomous': `автономно`,
    'stats.zeroToOne': `от идеи до прода`,

    // ── Projects ─────────────────────────────────────────────────────────
    'projects.kicker': `// что я делаю`,
    'projects.title': `Проекты`,
    'projects.intro': `Семь продакшен-систем — AI-агенты, пайплайны автоматизации и full-cycle SaaS, всё сделано solo.`,
    'badge.flagship': `ФЛАГМАН`,
    'badge.current': `ТЕКУЩИЙ`,

    'p1.sub': `TS-монорепо для авторов коротких видео: IG-воронки, поиск виральных видео, AI-капшны, автопостинг`,
    'p1.b1': `4 независимых сервиса на Fastify 5 + TypeScript над одним PostgreSQL 16 за nginx-gateway (Docker Compose); каждый self-мигрирует и отвечает единым конвертом {success, data, error}`,
    'p1.b2': `AI в проде: транскрипция Groq Whisper-large-v3 + генерация капшнов Llama-3.3-70B, с изоляцией prompt-injection (system/user) над недоверенным транскриптом`,
    'p1.b3': `Соц-интеграции end-to-end — OAuth-публикация в YouTube, TikTok и Instagram (токены AES-256-GCM at-rest), Meta-webhook воронки коммент→DM (HMAC), виральный поиск через YouTube Data API + Apify`,
    'p1.m1': `4 сервиса`,
    'p1.m2': `782 теста`,
    'p1.m3': `AES-256-GCM`,

    'p2.sub': `Автономный AI-агент, который общается с HR и откликается на вакансии вместо меня`,
    'p2.b1': `Агент на Claude в 5 каналах общения (AI-HR, живой HR, Telegram, Google Forms, анкеты hh.ru)`,
    'p2.b2': `RAG-ретривер по модульной базе знаний — в промт идут только релевантные карточки; auto-learning из уточнений`,
    'p2.b3': `Планировщик-автопилот, Playwright через SOCKS5, Telegram-userbot (GramJS) и admin-бот управления`,
    'p2.m1': `5 каналов`,
    'p2.m2': `RAG`,
    'p2.m3': `Автопилот`,

    'p3.sub': `Внутренняя AI-платформа: генерация фото, видео и текстов для команды fashion-бренда`,
    'p3.b1': `Solo full-cycle: FastAPI-бэкенд — 23 группы роутов, ~200 эндпоинтов, 30+ сервисных модулей; ~68K строк (Python + TypeScript)`,
    'p3.b2': `Оркестрация 6+ AI-провайдеров (Gemini, OpenRouter, Kling, Veo, Topaz, Seedance) за персистентной очередью задач: параллельная обработка, per-type лимиты конкурентности, авто-восстановление зависших задач при рестарте`,
    'p3.b3': `React + TypeScript SPA — 19 страниц-инструментов (Canvas crop-редактор, drag-&-drop, AI-чат с SSE-стримингом) на Supabase (Postgres + Auth + Storage), observability Prometheus/Loki/Grafana`,
    'p3.m1': `~200 эндпоинтов`,
    'p3.m2': `6+ AI-провайдеров`,
    'p3.m3': `−75% времени`,

    'p4.sub': `Автоперепродажа PUBG UC — боты закупают на Midasbuy и продают на 3 маркетплейсах`,
    'p4.b1': `Микросервисный Docker-стек на общей PostgreSQL — 3 бота-маркетплейса (FunPay/Playerok/GGSEL) + воркер закупки Midasbuy + админ-бот Telegram + CRM (FastAPI/React) + Prometheus/Grafana; связь только через БД-очередь`,
    'p4.b2': `FSM заказа на 11 состояний с валидируемым графом переходов и retry/эскалацией; конкурентобезопасность через SELECT … FOR UPDATE SKIP LOCKED и row-lock на переходах; идемпотентность по уникальному id заказа`,
    'p4.b3': `Stealth-автоматизация на patchright (антидетект-форк Playwright) для обхода антибота Midasbuy — пул браузеров на аккаунт, мульти-форматный IMAP-OTP (3DS/EPN), failover карт по приоритету, Fernet-шифрование карт`,
    'p4.m1': `FSM · 11 состояний`,
    'p4.m2': `3 маркетплейса`,
    'p4.m3': `~495 тестов`,

    'p5.sub': `SaaS голосовой диктовки — нативное macOS-приложение, FastAPI-бэкенд и веб-портал`,
    'p5.b1': `Нативное macOS-приложение (Swift/SwiftUI, ~12,5k строк): глобальные push-to-talk хоткеи, транскрибация Groq Whisper, вставка в любое приложение через буфер + ⌘V, Memory Storage с облачной синхронизацией`,
    'p5.b2': `FastAPI-бэкенд — 15 модулей API: Supabase JWT (ES256/HS256), rate limiting по user/IP на Redis, реструктуризация текста Groq Llama-3.3-70B с защитой от prompt injection`,
    'p5.b3': `Монетизация под ключ — 2 платёжных шлюза (YooKassa + CryptoCloud) с автопродлением и реферальными бонусами; observability Prometheus/Grafana/Loki, Docker + nginx + Cloudflare`,
    'p5.m1': `macOS + Web`,
    'p5.m2': `JWT ES256`,
    'p5.m3': `Платежи`,

    'p6.sub': `Событийный алготрейдинг-бот для фьючерсов Bybit — short-фейд пампа по TG-сигналам`,
    'p6.b1': `Два WebSocket Bybit v5: приватный поток order/execution/position с ручной HMAC-SHA256 аутентификацией как источник истины и публичный тикер-фид — сериализация orjson, авто-reconnect, graceful-стоп по SIGINT/SIGTERM`,
    'p6.b2': `Биржевой риск-менеджмент: серверный стоп-лосс, прикреплённый атомарно к входному ордеру (нет окна без стопа), контроль плеча с TTL-кэшем, ретраями и обработкой кодов ошибок Bybit, фиксированный номинал с округлением до шага лота`,
    'p6.b3': `Персистентный леджер сделок на PostgreSQL + SQLAlchemy 2.0 (typed Mapped) + Alembic: таблица trade_log с FSM сделки на 5 состояний, агрегацией частичных филлов, взвешенной ценой входа и PnL через ORM hybrid-property`,
    'p6.m1': `два WebSocket`,
    'p6.m2': `HMAC-SHA256`,
    'p6.m3': `FSM-леджер`,

    'p7.sub': `Бот маркет-мейкинга в concentrated-liquidity пулах на HyperEVM (DeFi)`,
    'p7.b1': `Авто-ре-центрирует ультра-узкое LP-окно каждый цикл (по умолчанию 5 с): закрывает (decreaseLiquidity → collect → burn) и пере-минтит по текущему тику при выходе из range или приближении к краю — позиция активна и собирает комиссии 24/7`,
    'p7.b2': `Low-level on-chain Ethereum: сырой eth_call к slot0 с ручным two's-complement декодом тика (int24), декодирование revert по keccak-селекторам и выравнивание границ по tickSpacing — поверх абстракции над двумя CL-форками (Project X, Ramses)`,
    'p7.b3': `Telegram-оркестрация 24/7: синхронные web3-циклы в демон-потоках как asyncio-задачи, реестр задач в Redis с авто-восстановлением после рестарта, плюс балансировщик инвентаря из 3 активов со свопами через KyberSwap/OpenOcean`,
    'p7.m1': `авто-ре-центринг`,
    'p7.m2': `форки Uniswap V3`,
    'p7.m3': `on-chain CL-математика`,

    // ── Approach ─────────────────────────────────────────────────────────
    'approach.kicker': `// как я работаю`,
    'approach.title': `Подход`,
    'about.intro': `Инженер, который доводит бизнес-процессы от идеи до продакшена на AI-агентах. Оркеструю LLM-агентов (Claude Agent SDK, MCP, RAG) и закрываю весь стек — бэкенд, интеграции, фронтенд, инфраструктуру и деплой.`,
    'pillar1.title': `СНАЧАЛА АВТОМАТИЗАЦИЯ`,
    'pillar1.desc': `Проектирую процессы вокруг AI-агентов и мультиагентной оркестрации — до 95% ручного труда автоматизировано.`,
    'pillar2.title': `SOLO, ПОЛНЫЙ ЦИКЛ`,
    'pillar2.desc': `От архитектуры и дизайна до деплоя и мониторинга — включая платежи и авторизацию.`,
    'pillar3.title': `AI-NATIVE РАЗРАБОТКА`,
    'pillar3.desc': `LLM-агенты на всех этапах: проектирование, кодинг, тесты, code review.`,
    'pillar4.title': `ГОТОВНОСТЬ К ПРОДАКШЕНУ`,
    'pillar4.desc': `Каждый проект доходит до прода: Docker, health-checks, мониторинг, обработка ошибок, масштаб.`,

    // ── Skills ───────────────────────────────────────────────────────────
    'skills.kicker': `// стек`,
    'skills.title': `Навыки и инструменты`,
    'skills.intro': `Стек, на котором проектирую, собираю и довожу до прода автономные системы — от и до.`,
    'skills.g1': `ai и агенты`,
    'skills.g2': `backend`,
    'skills.g3': `данные и инфра`,
    'skills.g4': `frontend и ПО`,
    'skills.g5': `автоматизация`,

    // ── Shared UI strings ────────────────────────────────────────────────
    'ui.expand': `развернуть ▸`,
    'ui.collapse': `свернуть ▾`,
    'ui.swipe': `листай →`,
    'ui.workflow': `▶ воркфлоу`,

    // ── Experience ───────────────────────────────────────────────────────
    'exp.kicker': `// опыт`,
    'exp.title': `Опыт`,
    'exp.company': `Mario Berlucci`,
    'exp.role': `Fullstack-разработчик`,
    'exp.meta': `Январь 2024 — настоящее время`,
    'exp.tag': `Розничный бренд одежды и обуви`,
    'exp.b1': `Разработал платформу автоматизации контента — сократил время обработки видео на 75% (20+ мин → 3–5 мин), автоматизировал 95% ручных операций`,
    'exp.b2': `Спроектировал мультисервисную архитектуру — 20 backend-сервисов, прогресс в реальном времени по WebSocket/SSE`,
    'exp.b3': `Интегрировал несколько внешних AI-сервисов с балансировкой нагрузки, retry-логикой и динамическим прайсингом`,
    'exp.b4': `Реализовал отказоустойчивую очередь задач (memory → DB → file) с авто-восстановлением и параллельной обработкой до 4 видео`,
    'exp.b5': `Настроил production-деплой — Docker, Caddy reverse proxy с SSL, rsync-доставка, health-checks`,

    // ── Education / Languages ────────────────────────────────────────────
    'edu.title': `Образование`,
    'edu.school': `НИТУ МИСИС`,
    'edu.line': `Прикладная информатика · высшее образование · 2026`,
    'lang.title': `Языки`,
    'lang.value': `Русский — родной · Английский — B2 (выше среднего)`,

    // ── Contact / Footer ─────────────────────────────────────────────────
    'contact.kicker': `$ contact`,
    'contact.closing': `Давай построим то, что работает само.`,
    'contact.sub': `Открыт к ролям AI Automation / Agentic Engineering — remote-first, готов к релокации.`,
    'contact.lblEmail': `почта`,
    'contact.lblTelegram': `telegram`,
    'contact.lblPhone': `телефон`,
    'footer.copy': `© 2026 Глеб Пятков · Статический сайт, задеплоен на VPS`,
    'footer.backToTop': `наверх ↑`,

    // ── ARIA labels ──────────────────────────────────────────────────────
    'aria.langGroup': `Язык`,
    'aria.menuOpen': `Открыть меню`,
    'aria.menuClose': `Закрыть меню`,
    'aria.railPrev': `Прокрутить влево`,
    'aria.railNext': `Прокрутить вправо`,
    'aria.railRegion': `Медиа проекта — листайте стрелками`,
    'aria.playToggle': `Воспроизвести или поставить на паузу`,
  },
};

/**
 * Apply a language to the document:
 *  - sets <html lang>
 *  - fills every [data-i18n] textContent and [data-i18n-aria] aria-label
 *  - updates the segmented toggle (aria-pressed + active class)
 *  - persists to localStorage
 *  - dispatches a `langchange` CustomEvent so JS-built content re-renders
 */
export function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    const val = dict[key];
    if (val != null) el.setAttribute('aria-label', val);
  });

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    const active = btn.getAttribute('data-lang-btn') === lang;
    btn.setAttribute('aria-pressed', String(active));
    btn.classList.toggle('is-active', active);
  });

  try {
    localStorage.setItem('lang', lang);
  } catch {
    /* storage may be unavailable (private mode / file://) — non-fatal */
  }

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}
