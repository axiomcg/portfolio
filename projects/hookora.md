---
title: hookora — монорепо инструментов для контент-авторов (short-video)
tags: [project, hookora, monorepo, fastify, typescript, react, postgres, ai-groq, whisper, remotion, oauth, meta-webhook, флагман, основной]
keywords: [hookora, монорепо, npm workspaces, Fastify, TypeScript, PostgreSQL, pg, React, Vite, Tailwind, TanStack Query, Groq, Whisper, llama-3.3-70b, транскрипция, генерация капшнов, Remotion, рендеринг видео, ffmpeg, OAuth, автопостинг, YouTube Data API, TikTok, Instagram Graph, Meta webhook, воронки comment-to-DM, виральный поиск, Apify, AES-256-GCM, rate limiting, Docker Compose, nginx, Cloudflare]
---

# hookora — монорепо инструментов для контент-авторов

Актуальный флагманский проект. **Монорепо (npm workspaces) из 4 независимых
backend-сервисов + единый React-SPA + nginx-gateway**, объединённых одной
инфраструктурой (один PostgreSQL, один `docker-compose`). Это набор продуктов
для авторов коротких видео; данные между инструментами не связаны — каждый
самостоятелен, но живут они под одной крышей и общим UI.

> Позиционирование честное: это сильный **full-stack / backend-инжиниринг** с
> реальной, аккуратно сделанной **AI-интеграцией** (Groq Whisper + LLM). Это
> НЕ мультиагентная система и НЕ «AI ведёт контент-стратегию» — AI здесь
> сфокусированная фича (транскрипция + генерация текстов), а не агентный harness.

## Архитектура

- **Монорепозиторий** (npm workspaces) за единым **nginx-gateway**. 4 backend-сервиса:
  - **`funnels`** (:3010) — Instagram-воронки «комментарий → DM» на **Meta-webhook**
    (многошаговый флоу: коммент → кнопка-DM → опц. проверка подписки → финальная
    кнопка-ссылка); HMAC-SHA256 верификация подписи вебхука, дедуп ретраев.
  - **`search`** (:3030) — поиск виральных коротких видео по **YouTube (Data API v3)**,
    **TikTok и Instagram Reels (через Apify-скраперы)**; virality-score = просмотры/часы
    с момента публикации, кэширование результатов для экономии квоты API.
  - **`studio`** (:3110) — студия субтитров: загрузка видео → извлечение аудио (ffmpeg)
    → **транскрипция Groq Whisper** → рендер видео с субтитрами через **Remotion**
    (headless Chromium); очередь рендеров, zod-валидация, проверка файлов по magic-bytes.
  - **`autopost`** (:3120) — подключение TikTok/Instagram/YouTube по **OAuth** (токены
    шифруются at-rest, **AES-256-GCM**); композер: транскрибирует видео и
    **AI-генерирует 3 варианта капшнов**, затем **публикует** в YouTube / TikTok / Instagram.
- **Backend** — **Fastify 5 на Node.js / TypeScript (ESM)**, у каждого сервиса свои
  таблицы; idempotent self-migration схемы на старте (`CREATE TABLE IF NOT EXISTS`).
- **PostgreSQL 16** через прямой драйвер **`pg`** (raw параметризованный SQL, без ORM,
  без BaaS) — одна общая БД `hookora`, владение таблицами по префиксам.
- Единый формат ответа всех сервисов — конверт `{ success, data, error }`.
- **Frontend** — единый **React 18 + TypeScript + Vite 6 + Tailwind v4 + TanStack Query** SPA
  на все 4 инструмента; Remotion-player для предпросмотра; общий workspace-пакет
  `@hookora/remotion-captions`.
- **Деплой** — Docker Compose (postgres + 4 сервиса + nginx) на VPS за **Cloudflare**-туннелем;
  админ-UI закрыт Cloudflare Access (email-OTP), публично открыты только `/webhook` и `/health`.

## AI-составляющая (что реально в коде)

- **Только Groq.** Транскрипция — `whisper-large-v3`; генерация капшнов —
  `llama-3.3-70b-versatile` (строгий JSON-ответ, ровно 3 варианта).
- **Защита от prompt-injection** на уровне дизайна: правила — в system-сообщении,
  недоверенный транскрипт и инструкция автора идут в user-сообщении в размеченных
  блоках `<transcript>`/`<instruction>` и трактуются как данные, не как команды.
- Платные Groq-вызовы прикрыты ужесточённым per-route rate-limit поверх глобального.

## Качество и инженерия

- **782 теста (Vitest)** в 84 файлах (autopost 201, studio 230, funnels 177, search 174),
  гоняются против изолированной БД `hookora_test` (guard запрещает не-тестовый URL).
- **Безопасность:** OAuth-токены AES-256-GCM at-rest; HMAC-SHA256 вебхука с
  constant-time сравнением; только параметризованный SQL; rate-limit глобальный +
  per-route; nginx-слой DDoS (limit_req 10r/s, limit_conn, slowloris-таймауты,
  лимит тела, drop пустого User-Agent → 444); edge-защита Cloudflare.
- Аддитивная архитектура: новые сервисы подключаются к compose/nginx без ломки
  существующих; параллельные стеки на разных портах (`NGINX_BIND`) для multi-session.

## Стек

TypeScript, **Fastify 5**, Node.js (ESM), **PostgreSQL 16** (`pg`, raw SQL),
React 18, Vite 6, Tailwind v4, TanStack Query, **Groq** (Whisper + Llama),
**Remotion** + ffmpeg, OAuth (YouTube/TikTok/Instagram), Meta Graph webhooks,
Apify, Docker Compose, nginx, Cloudflare.
