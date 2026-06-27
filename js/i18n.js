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
    'projects.intro': `Six production systems — AI agents, automation pipelines and full-cycle SaaS, all shipped solo.`,
    'badge.flagship': `FLAGSHIP`,
    'badge.current': `CURRENT`,

    'p1.sub': `AI content-marketing SaaS where AI agents run strategy and auto-posting`,
    'p1.b1': `"Brain" multi-agent system — 3 agents (analyst / scriptwriter / closer) sharing a pgvector knowledge base`,
    'p1.b2': `Orchestrated via the Claude Agent SDK; monorepo of 5 services behind one Nginx gateway`,
    'p1.b3': `Fastify + PostgreSQL backend, React 18 + Vite frontend, 43 backend tests, Playwright E2E, Dockerized on a VPS`,
    'p1.m1': `5 services`,
    'p1.m2': `3 AI agents`,
    'p1.m3': `43 tests`,

    'p2.sub': `Autonomous AI agent that chats with recruiters and applies to jobs for me`,
    'p2.b1': `Claude-based agent across 5 conversation channels (AI recruiter, live recruiter, Telegram, Google Forms, hh.ru forms)`,
    'p2.b2': `RAG retriever over a modular knowledge base — only relevant cards enter the prompt; auto-learns from clarifications`,
    'p2.b3': `Autopilot scheduler, Playwright over SOCKS5, a Telegram userbot (GramJS) and an admin control bot`,
    'p2.m1': `5 channels`,
    'p2.m2': `RAG`,
    'p2.m3': `Autopilot`,

    'p3.sub': `Internal AI platform that cut content production time by 75%`,
    'p3.b1': `20 backend services with real-time progress over WebSocket/SSE`,
    'p3.b2': `Multiple AI providers (Gemini, Kling, Veo, Topaz, OpenRouter) with load-balancing, retry and fallback`,
    'p3.b3': `Fault-tolerant job queue (memory → DB → file) with auto-recovery; 16-page React SPA`,
    'p3.m1': `fault-tolerant`,
    'p3.m2': `20 services`,
    'p3.m3': `−75% time`,

    'p4.sub': `Fully automated digital-goods store — 24/7, zero humans in the loop`,
    'p4.b1': `4 microservices (FunPay, Playerok, GGSEL bots + Midasbuy auto-purchase worker)`,
    'p4.b2': `10-state FSM for the full order lifecycle; Playwright checkout with auto 3-D Secure OTP from email (IMAP)`,
    'p4.b3': `Dynamic pricing; concurrency-safe (SELECT FOR UPDATE), idempotent orders, graceful shutdown`,
    'p4.m1': `10-state FSM`,
    'p4.m2': `24/7`,
    'p4.m3': `Auto 3DS`,

    'p5.sub': `0→1 voice-dictation SaaS — macOS + web + payments backend`,
    'p5.b1': `Native macOS app (Swift/SwiftUI) — hotkey dictation (Option+Space), Groq Whisper, paste into the active app`,
    'p5.b2': `FastAPI backend — 13 API modules, JWT (ES256), rate limiting, Prometheus metrics`,
    'p5.b3': `Free/Standard/Pro subscriptions (YooKassa, CryptoCloud), auto-renewal, payment webhooks; GPT-4.1 text cleanup`,
    'p5.m1': `macOS + Web`,
    'p5.m2': `JWT ES256`,
    'p5.m3': `Payments`,

    'p6.sub': `A series of bots for sales automation, notifications and monitoring`,
    'p6.b1': `python-telegram-bot / GramJS with job queues and inline keyboards`,
    'p6.b2': `Integrated with external APIs and databases; balance monitoring and alerts`,
    'p6.b3': `Admin controls, rate limiting via semaphores, Redis-backed settings`,
    'p6.m1': `Inline UI`,
    'p6.m2': `Job queue`,
    'p6.m3': `Redis`,

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
    'projects.intro': `Шесть продакшен-систем — AI-агенты, пайплайны автоматизации и full-cycle SaaS, всё сделано solo.`,
    'badge.flagship': `ФЛАГМАН`,
    'badge.current': `ТЕКУЩИЙ`,

    'p1.sub': `SaaS AI-контент-маркетинга, где AI-агенты ведут стратегию и автопостинг`,
    'p1.b1': `Мультиагентная система «Brain» — 3 агента (аналитик / сценарист / closer) с общей базой знаний на pgvector`,
    'p1.b2': `Оркестрация через Claude Agent SDK; монорепо из 5 сервисов за единым Nginx-gateway`,
    'p1.b3': `Backend на Fastify + PostgreSQL, фронтенд React 18 + Vite, 43 backend-теста, Playwright E2E, Docker на VPS`,
    'p1.m1': `5 сервисов`,
    'p1.m2': `3 AI-агента`,
    'p1.m3': `43 теста`,

    'p2.sub': `Автономный AI-агент, который общается с HR и откликается на вакансии вместо меня`,
    'p2.b1': `Агент на Claude в 5 каналах общения (AI-HR, живой HR, Telegram, Google Forms, анкеты hh.ru)`,
    'p2.b2': `RAG-ретривер по модульной базе знаний — в промт идут только релевантные карточки; auto-learning из уточнений`,
    'p2.b3': `Планировщик-автопилот, Playwright через SOCKS5, Telegram-userbot (GramJS) и admin-бот управления`,
    'p2.m1': `5 каналов`,
    'p2.m2': `RAG`,
    'p2.m3': `Автопилот`,

    'p3.sub': `Внутренняя AI-платформа, сократившая время продакшена контента на 75%`,
    'p3.b1': `20 backend-сервисов, прогресс в реальном времени по WebSocket/SSE`,
    'p3.b2': `Несколько AI-провайдеров (Gemini, Kling, Veo, Topaz, OpenRouter) с балансировкой, retry и fallback`,
    'p3.b3': `Отказоустойчивая очередь задач (memory → DB → file) с авто-восстановлением; React SPA на 16 страниц`,
    'p3.m1': `отказоустойчивость`,
    'p3.m2': `20 сервисов`,
    'p3.m3': `−75% времени`,

    'p4.sub': `Полностью автоматизированный магазин цифровых товаров — 24/7, без участия человека`,
    'p4.b1': `4 микросервиса (боты FunPay, Playerok, GGSEL + воркер автозакупки Midasbuy)`,
    'p4.b2': `FSM на 10 состояний на весь цикл заказа; Playwright-оплата с авто-вводом 3-D Secure OTP из почты (IMAP)`,
    'p4.b3': `Динамический прайсинг; конкурентоустойчивость (SELECT FOR UPDATE), идемпотентные заказы, graceful shutdown`,
    'p4.m1': `FSM 10 состояний`,
    'p4.m2': `24/7`,
    'p4.m3': `Авто-3DS`,

    'p5.sub': `Голосовой диктовщик 0→1 — macOS + web + платёжный backend`,
    'p5.b1': `Нативное macOS-приложение (Swift/SwiftUI) — диктовка по хоткею (Option+Space), Groq Whisper, вставка в активное приложение`,
    'p5.b2': `Backend на FastAPI — 13 API-модулей, JWT (ES256), rate limiting, метрики Prometheus`,
    'p5.b3': `Подписки Free/Standard/Pro (YooKassa, CryptoCloud), автопродление, платёжные webhooks; чистка текста GPT-4.1`,
    'p5.m1': `macOS + Web`,
    'p5.m2': `JWT ES256`,
    'p5.m3': `Платежи`,

    'p6.sub': `Серия ботов для автоматизации продаж, уведомлений и мониторинга`,
    'p6.b1': `python-telegram-bot / GramJS с job-queue и inline-кнопками`,
    'p6.b2': `Интеграция с внешними API и базами данных; мониторинг балансов и алерты`,
    'p6.b3': `Админ-управление, rate limiting через семафоры, настройки в Redis`,
    'p6.m1': `Inline UI`,
    'p6.m2': `Job queue`,
    'p6.m3': `Redis`,

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
