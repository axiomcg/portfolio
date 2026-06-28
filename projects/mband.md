---
title: MBand AI Service — внутренняя AI-платформа
tags: [project, mband, ai, fullstack, mario-berlucci, основной проект, главный]
keywords: [MBand, AI Service, Mario Berlucci, AI платформа, контент, визуальный контент, видео, FastAPI, OpenRouter, Gemini, Kling, Veo, Topaz, Supabase, observability, SSE, чат, FFmpeg, Bitrix CMS]
---

# MBand AI Service

Внутренняя AI-платформа для команды бренда Mario Berlucci (дизайнеры, SEO, контент-маркетологи, комьюнити-менеджеры). Автоматизирует производство визуального контента (фото/видео), генерацию текстов (описания товаров, отзывы, лендинги) и AI-чаты; генерируемые лендинги встраиваются в сайт бренда на Bitrix CMS.

**Это коммерческий проект — рабочее место (см. [[mario-berlucci]]).** Карточка дублирует часть информации, потому что HR-агент будет искать "MBand" как pet-проект тоже.

## Роль

Solo full-cycle — архитектура, бэкенд, фронтенд, деплой, мониторинг.

## Ключевые достижения

- Архитектура (подтверждено по коду): **FastAPI-бэкенд — 23 группы роутов, ~200 API-эндпоинтов, 30+ сервисных модулей**; ~36K строк Python + ~32K строк TypeScript (~68K LOC), solo full-cycle
- **React SPA — 19 страниц-инструментов** в едином интерфейсе: crop-селектор на Canvas, drag & drop, SSE-стриминг AI-чата
- Оркестрация **6+ AI-провайдеров**: Gemini (image/text), OpenRouter (GPT-5.2 / GPT-4.1 / мульти-модельный роутинг), Kling AI и Google Veo (видео, через агрегатор KIE.ai), Topaz (апскейл), ByteDance Seedance (видео)
- **Персистентная очередь задач** с параллельной обработкой под per-type лимитами конкурентности (RSY Simple — последовательно, CPU-bound FFmpeg; RSY Dual — параллельно, внешние API); состояние переживает рестарт контейнера, авто-восстановление «зависших» задач на старте (`recover_stuck_jobs()`). Хранилища задач: in-memory, SQLite/JSON на диске, Supabase Postgres
- **AI-чат с SSE-стримингом** (OpenRouter GPT-5.2 + персистентность в Supabase); потоковая отдача также в генерации описаний/отзывов/RSY
- **Telegram-бот** как альтернативный интерфейс: 8 slash-команд (`/start`, `/help`, `/logo`, `/upscale`, `/mode`, `/crop`, `/rsy`, `/rsy_dual`) + reply-/inline-кнопки, Redis для состояния
- **Production-grade observability**: Prometheus + Loki + Promtail + Grafana (3 дашборда: HTTP, ошибки/задачи, логи), структурное JSON-логирование, `prometheus-fastapi-instrumentator`
- **Генерация лендингов** с экспортом HTML, совместимым с Bitrix CMS сайта бренда (инжект стилей в `<body>` — Bitrix вырезает `<head>`; конвертация `font-weight`→`font-family`; защита от 16+ оверрайдящих вендорных стилей)
- Бизнес-результат (заявленный, не выводится из кода): время команды на визуальный контент сокращено на **~75%** (20+ мин → 3-5 мин), большинство ручных операций автоматизировано

## Стек

- **Бэкенд:** Python 3.11, FastAPI, uvicorn, asyncio, Pydantic, httpx/aiohttp
- **БД / хранилища:** Supabase (Postgres + Auth(JWT) + Storage), SQLite (локальные job-стора), Redis (Telegram-бот)
- **Фронтенд:** React 18, TypeScript, Vite, Tailwind, Zustand, React Query, React Router
- **AI:** Gemini, OpenRouter (GPT-5.2 / GPT-4.1 / Gemini / Seedance), Kling AI, Google Veo, Topaz, ByteDance Seedance, агрегатор KIE.ai
- **Медиа:** FFmpeg для программной обработки видео и изображений
- **Деплой / инфра:** Docker, Caddy (reverse-proxy + SSL) на VPS, Cloudflare; Railway/Nixpacks-совместимо; staging→prod пайплайн
- **Observability:** Prometheus, Loki, Promtail, Grafana
- **Интеграции:** Telegram Bot API, Google Sheets (данные о товарах/эталонные отзывы), Yandex Disk (медиа), Bitrix CMS (встраивание лендингов)
