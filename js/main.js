// main.js — runtime behavior for the terminal/CLI portfolio (ES module).
// Owns: language toggle, navbar, mobile menu, scroll-reveal, stat counters,
// per-project media ribbons (built from the manifest, grouped by project) with
// scroll-into-view video autoplay, per-rail arrows/keyboard/progress, and the
// project expand/collapse toggles.

import { I18N, applyLang } from './i18n.js?v=4';

/* ─────────────────────────────────────────────────────────────────────────
   FALLBACK_GALLERY — identical to assets/manifest.json (same ids / project /
   type / src / poster / w / h / captions / order). Used only when fetching the
   manifest fails (e.g. file:// CORS). The manifest is the primary source.
   ───────────────────────────────────────────────────────────────────────── */
const FALLBACK_GALLERY = {
  items: [
    { id: 'hookora-demo', project: 'hookora', type: 'video', src: 'assets/video/hookora-demo.mp4', poster: 'assets/poster/hookora-demo.jpg', w: 1500, h: 1000, caption: { en: 'hookora — platform demo', ru: 'hookora — демо платформы' } },
    { id: 'hookora-2', project: 'hookora', type: 'image', src: 'assets/img/hookora-2.webp', w: 1500, h: 1000, caption: { en: 'Keyword funnels — auto-DM on comment trigger', ru: 'Воронки — авто-ДМ по ключевому слову' } },
    { id: 'hookora-3', project: 'hookora', type: 'image', src: 'assets/img/hookora-3.webp', w: 1500, h: 1000, caption: { en: 'Video search — trending clips by topic',      ru: 'Поиск видео — вирусные ролики по теме' } },
    { id: 'hookora-6', project: 'hookora', type: 'image', src: 'assets/img/hookora-6.webp', w: 1500, h: 1000, caption: { en: 'Subtitle studio — project library',          ru: 'Субтитр-студия — библиотека проектов' } },
    { id: 'hookora-7', project: 'hookora', type: 'image', src: 'assets/img/hookora-7.webp', w: 1500, h: 1000, caption: { en: 'Subtitle studio — speech recognition',       ru: 'Субтитр-студия — распознавание речи' } },
    { id: 'hookora-8', project: 'hookora', type: 'image', src: 'assets/img/hookora-8.webp', w: 1500, h: 1000, caption: { en: 'Subtitle studio — style editor, live preview', ru: 'Субтитр-студия — редактор стиля с превью' } },
    { id: 'hookora-1', project: 'hookora', type: 'image', src: 'assets/img/hookora-1.webp', w: 1500, h: 1000, caption: { en: 'Autoposting — connected platforms',          ru: 'Автопостинг — подключённые платформы' } },
    { id: 'hookora-4', project: 'hookora', type: 'image', src: 'assets/img/hookora-4.webp', w: 1500, h: 1000, caption: { en: 'Reel transcription — ready to process',       ru: 'Транскрипция Reels — готово к запуску' } },
    { id: 'hookora-5', project: 'hookora', type: 'image', src: 'assets/img/hookora-5.webp', w: 1500, h: 1000, caption: { en: 'Reel transcription — timestamped result',     ru: 'Транскрипция Reels — результат с таймкодами' } },

    { id: 'whispo-web-demo',     project: 'whispo', type: 'video', src: 'assets/video/whispo-web-demo.mp4', poster: 'assets/poster/whispo-web-demo.jpg', w: 1500, h: 1000, caption: { en: 'Web — live demo',       ru: 'Веб — живое демо' } },
    { id: 'whispo-mac-demo',     project: 'whispo', type: 'video', src: 'assets/video/whispo-mac-demo-v2.mp4', poster: 'assets/poster/whispo-mac-demo-v2.jpg', w: 1500, h: 1000, caption: { en: 'macOS app — live demo', ru: 'macOS-приложение — живое демо' } },
    { id: 'whispo-mac-home',     project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-home.webp',     w: 1500, h: 1000, caption: { en: 'macOS — home & hotkeys',            ru: 'macOS — главный экран и хоткеи' } },
    { id: 'whispo-mac-history',  project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-history.webp',  w: 1500, h: 1000, caption: { en: 'macOS — transcription history',     ru: 'macOS — история транскрипций' } },
    { id: 'whispo-mac-memory',   project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-memory.webp',   w: 1500, h: 1000, caption: { en: 'macOS — memory storage (AI notes)', ru: 'macOS — память (AI-заметки)' } },
    { id: 'whispo-mac-style',    project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-style.webp',    w: 1500, h: 1000, caption: { en: 'macOS — output style',              ru: 'macOS — стиль вывода' } },
    { id: 'whispo-mac-settings', project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-settings.webp', w: 1500, h: 1000, caption: { en: 'macOS — settings & language',       ru: 'macOS — настройки и язык' } },
    { id: 'whispo-mac-invite',   project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-invite.webp',   w: 1500, h: 1000, caption: { en: 'macOS — invite friends',            ru: 'macOS — пригласить друзей' } },
    { id: 'whispo-mac-help',     project: 'whispo', type: 'image', src: 'assets/img/whispo-mac-help.webp',     w: 1500, h: 1000, caption: { en: 'macOS — help & shortcuts',          ru: 'macOS — помощь и хоткеи' } },
    { id: 'whispo-web-home',     project: 'whispo', type: 'image', src: 'assets/img/whispo-web-home.webp',     w: 1500, h: 1000, caption: { en: 'Web — landing',                     ru: 'Веб — лендинг' } },
    { id: 'whispo-web-pricing',  project: 'whispo', type: 'image', src: 'assets/img/whispo-web-pricing.webp',  w: 1500, h: 1000, caption: { en: 'Web — pricing',                     ru: 'Веб — тарифы' } },
    { id: 'whispo-web-download', project: 'whispo', type: 'image', src: 'assets/img/whispo-web-download.webp', w: 1500, h: 1000, caption: { en: 'Web — download',                    ru: 'Веб — загрузка' } },
    { id: 'whispo-web-faq',      project: 'whispo', type: 'image', src: 'assets/img/whispo-web-faq.webp',      w: 1500, h: 1000, caption: { en: 'Web — FAQ',                        ru: 'Веб — FAQ' } },
    { id: 'whispo-web-contact',  project: 'whispo', type: 'image', src: 'assets/img/whispo-web-contact.webp',  w: 1500, h: 1000, caption: { en: 'Web — contact',                    ru: 'Веб — контакты' } },

    { id: 'hh-demo', project: 'hh-agent', type: 'video', src: 'assets/video/hh-demo.mp4', poster: 'assets/poster/hh-demo.jpg', w: 1500, h: 1000, caption: { en: 'hh.ru Job Agent — live demo', ru: 'hh.ru Job Agent — живое демо' } },
    { id: 'hh-1', project: 'hh-agent', type: 'image', src: 'assets/img/hh-1.webp', w: 1500, h: 1000, caption: { en: 'Dashboard — chat stats overview',          ru: 'Дашборд — обзор статистики чатов' } },
    { id: 'hh-2', project: 'hh-agent', type: 'image', src: 'assets/img/hh-2.webp', w: 1500, h: 1000, caption: { en: 'HR chats — all negotiations',              ru: 'Чаты — переговоры с HR' } },
    { id: 'hh-3', project: 'hh-agent', type: 'image', src: 'assets/img/hh-3.webp', w: 1500, h: 1000, caption: { en: 'Knowledge base — candidate profile cards', ru: 'База знаний — карточки профиля' } },
    { id: 'hh-4', project: 'hh-agent', type: 'image', src: 'assets/img/hh-4.webp', w: 1500, h: 1000, caption: { en: 'Autopilot — queries & schedule',           ru: 'Автопилот — запросы и расписание' } },
    { id: 'hh-5', project: 'hh-agent', type: 'image', src: 'assets/img/hh-5.webp', w: 1500, h: 1000, caption: { en: 'Run history — launch log + live terminal',  ru: 'Запуски — лог с живым терминалом' } },
    { id: 'hh-6', project: 'hh-agent', type: 'image', src: 'assets/img/hh-6.webp', w: 1500, h: 1000, caption: { en: 'Eval — answer-quality testing',            ru: 'Эвал — тест качества ответов' } },
    { id: 'hh-7', project: 'hh-agent', type: 'image', src: 'assets/img/hh-7.webp', w: 1500, h: 1000, caption: { en: 'Prompt editor — versioned system prompt',  ru: 'Редактор промпта — версии системного промпта' } },

    { id: 'mband-demo',    project: 'mband', type: 'video', src: 'assets/video/mband-demo.mp4',    poster: 'assets/poster/mband-demo.jpg',    w: 1500, h: 1000, caption: { en: 'MBand — platform demo',                  ru: 'MBand — демо платформы' } },
    { id: 'mband-landing', project: 'mband', type: 'video', src: 'assets/video/mband-landing.mp4', poster: 'assets/poster/mband-landing.jpg', w: 1500, h: 1000, caption: { en: 'Landing Builder — AI landing generator', ru: 'Landing Builder — AI-генератор лендингов' } },
    { id: 'mband-1', project: 'mband', type: 'image', src: 'assets/img/mband-1.webp', w: 1500, h: 1000, caption: { en: 'MBand AI — content tools hub',            ru: 'MBand AI — хаб инструментов' } },
    { id: 'mband-2', project: 'mband', type: 'image', src: 'assets/img/mband-2.webp', w: 1500, h: 1000, caption: { en: 'AI chat — built-in LLM assistant',        ru: 'ИИ-чат — встроенный LLM-ассистент' } },
    { id: 'mband-3', project: 'mband', type: 'image', src: 'assets/img/mband-3.webp', w: 1500, h: 1000, caption: { en: 'Image to video — Kling / Veo / Seedance',  ru: 'Изображение в видео — Kling / Veo / Seedance' } },
    { id: 'mband-4', project: 'mband', type: 'image', src: 'assets/img/mband-4.webp', w: 1500, h: 1000, caption: { en: 'AI image — text-to-image generation',     ru: 'ИИ-изображение — генерация по промту' } },
    { id: 'mband-5', project: 'mband', type: 'image', src: 'assets/img/mband-5.webp', w: 1500, h: 1000, caption: { en: 'Edit image — AI photo editing + history',  ru: 'Редактирование фото — ИИ-правка с историей' } },
    { id: 'mband-6', project: 'mband', type: 'image', src: 'assets/img/mband-6.webp', w: 1500, h: 1000, caption: { en: 'Upscale — Topaz AI, before/after',         ru: 'Апскейл — Topaz AI, до/после' } },
    { id: 'mband-7', project: 'mband', type: 'image', src: 'assets/img/mband-7.webp', w: 1500, h: 1000, caption: { en: 'Lamoda Fit — marketplace photo prep',     ru: 'Lamoda Fit — фото для маркетплейса' } },
    { id: 'mband-8', project: 'mband', type: 'image', src: 'assets/img/mband-8.webp', w: 1500, h: 1000, caption: { en: 'Compress — media size reduction',          ru: 'Сжатие медиа — без потери качества' } },
    { id: 'mband-9', project: 'mband', type: 'image', src: 'assets/img/mband-9.webp', w: 1500, h: 1000, caption: { en: 'Logo on video — brand watermark',         ru: 'Логотип на видео — брендирование' } },

    { id: 'viki-arch', project: 'vikishop', type: 'image', src: 'assets/img/viki-arch.svg', w: 1500, h: 1000, caption: { en: 'System architecture — one DB queue, 3 marketplaces', ru: 'Архитектура — одна БД-очередь, 3 маркетплейса' } },
    { id: 'viki-fsm', project: 'vikishop', type: 'image', src: 'assets/img/viki-fsm.svg', w: 1500, h: 1000, caption: { en: 'Order lifecycle — 11-state FSM', ru: 'Жизненный цикл заказа — FSM на 11 состояний' } },

    { id: 'bybit-arch', project: 'bybit', type: 'image', src: 'assets/img/bybit-arch.svg', w: 1500, h: 1000, caption: { en: 'Signal → order pipeline', ru: 'Конвейер: сигнал → ордер' } },
    { id: 'bybit-ledger', project: 'bybit', type: 'image', src: 'assets/img/bybit-ledger.svg', w: 1500, h: 1000, caption: { en: 'Trade FSM ledger — 5 states', ru: 'FSM-леджер сделок — 5 состояний' } },

    { id: 'hyperevm-recenter', project: 'hyperevm', type: 'image', src: 'assets/img/hyperevm-recenter.svg', w: 1500, h: 1000, caption: { en: 'Concentrated-liquidity auto re-centering', ru: 'Авто-ре-центринг узкого диапазона' } },
    { id: 'hyperevm-arch', project: 'hyperevm', type: 'image', src: 'assets/img/hyperevm-arch.svg', w: 1500, h: 1000, caption: { en: 'System architecture', ru: 'Архитектура системы' } },
  ],
};

// project id → caption tag label
const PROJECT_LABELS = {
  hookora: 'hookora',
  'hh-agent': 'hh.ru Agent',
  mband: 'MBand',
  vikishop: 'VikiShop',
  whispo: 'Whispo',
  bybit: 'Bybit Bot',
  hyperevm: 'HyperEVM Bot',
};

const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
const ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
const ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let currentLang = resolveInitialLang();

/* ── Language resolution: localStorage → ?lang= → browser-ru → 'en' ── */
function resolveInitialLang() {
  const norm = (v) => (v === 'ru' || v === 'en' ? v : null);
  let stored = null;
  try { stored = localStorage.getItem('lang'); } catch { /* ignore */ }
  const url = new URLSearchParams(location.search).get('lang');
  return (
    norm(stored) ||
    norm(url) ||
    ((navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en')
  );
}

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || '';
}
function caption(item) {
  const c = item.caption || {};
  return c[currentLang] || c.en || '';
}
function clamp(min, val, max) {
  return Math.min(Math.max(val, min), max);
}

/* Re-render everything JS-built when the language changes. */
document.addEventListener('langchange', (e) => {
  currentLang = e.detail.lang;
  renderDynamic();
});

/* ───────────────────────────── Init ───────────────────────────── */
function init() {
  applyLang(currentLang); // static text + toggle state first (no flash of wrong lang)
  setupLangToggle();
  setupNavbar();
  setupMobileMenu();
  setupExpanders();
  setupReveal();
  setupCounters();
  setupRibbons(); // async — fetch manifest, build per-project rails
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ───────────────────────────── Language toggle ───────────────────────────── */
function setupLangToggle() {
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang-btn');
      if (lang && lang !== currentLang) applyLang(lang);
    });
  });
}

/* ───────────────────────────── Navbar scrolled state ───────────────────────────── */
function setupNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ───────────────────────────── Mobile menu ───────────────────────────── */
function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  const open = () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', t('aria.menuClose'));
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', t('aria.menuOpen'));
    document.body.style.overflow = '';
    const onEnd = () => {
      if (!menu.classList.contains('is-open')) menu.hidden = true;
      menu.removeEventListener('transitionend', onEnd);
    };
    menu.addEventListener('transitionend', onEnd);
  };

  burger.addEventListener('click', () => (menu.hidden ? open() : close()));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) close();
  });
}

/* ───────────────────────────── Expand / collapse toggles ───────────────────────────── */
function setupExpanders() {
  document.querySelectorAll('.project__toggle').forEach((btn) => {
    const region = document.getElementById(btn.getAttribute('aria-controls'));
    if (!region) return;
    setToggle(btn, region, false, true); // default COLLAPSED, no animation on init
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      setToggle(btn, region, open, false);
    });
  });
}

function setToggle(btn, region, open, instant) {
  btn.setAttribute('aria-expanded', String(open));
  const label = btn.querySelector('.project__toggle-label');
  if (label) label.textContent = t(open ? 'ui.collapse' : 'ui.expand');
  if (open) openRegion(region, instant);
  else closeRegion(region, instant);
}

function openRegion(region, instant) {
  region.hidden = false;
  if (instant || prefersReduced) { region.style.height = ''; region.style.opacity = ''; return; }
  const h = region.scrollHeight;
  region.style.height = '0px';
  region.style.opacity = '0';
  requestAnimationFrame(() => {
    region.style.height = `${h}px`;
    region.style.opacity = '1';
  });
  const onEnd = (e) => {
    if (e.propertyName !== 'height') return;
    region.style.height = '';
    region.removeEventListener('transitionend', onEnd);
  };
  region.addEventListener('transitionend', onEnd);
}

function closeRegion(region, instant) {
  if (instant || prefersReduced) { region.hidden = true; region.style.height = ''; region.style.opacity = ''; return; }
  const h = region.scrollHeight;
  region.style.height = `${h}px`;
  region.style.opacity = '1';
  requestAnimationFrame(() => {
    region.style.height = '0px';
    region.style.opacity = '0';
  });
  const onEnd = (e) => {
    if (e.propertyName !== 'height') return;
    region.hidden = true;
    region.style.height = '';
    region.style.opacity = '';
    region.removeEventListener('transitionend', onEnd);
  };
  region.addEventListener('transitionend', onEnd);
}

/* ───────────────────────────── Scroll reveal (staggered) ───────────────────────────── */
function setupReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const counts = new Map();
  els.forEach((el) => {
    const p = el.parentElement;
    const i = counts.get(p) || 0;
    el.style.setProperty('--reveal-delay', `${Math.min(i * 70, 350)}ms`);
    counts.set(p, i + 1);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/* ───────────────────────────── Counters ───────────────────────────── */
function setupCounters() {
  // Only numeric stats animate; literal values (e.g. "24/7", "0→1") keep their text.
  const nums = [...document.querySelectorAll('.stat__num')].filter((el) => el.dataset.target != null);
  const setFinal = (el) => {
    el.textContent = (el.dataset.target || '') + (el.dataset.suffix || '');
  };
  if (prefersReduced || !('IntersectionObserver' in window)) {
    nums.forEach(setFinal);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((n) => io.observe(n));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || '';
  const dur = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(tick);
}

/* ───────────────────────────── Ribbons (per-project media rails) ───────────────────────────── */
async function setupRibbons() {
  const mounts = Array.from(document.querySelectorAll('.ribbon[data-ribbon]'));
  if (!mounts.length) return;

  let items;
  try {
    const res = await fetch('assets/manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`manifest HTTP ${res.status}`);
    const data = await res.json();
    items = data && Array.isArray(data.items) && data.items.length ? data.items : null;
    if (!items) throw new Error('manifest empty');
  } catch {
    items = FALLBACK_GALLERY.items; // file:// / offline resilience
  }

  const byProject = groupBy(items, 'project');

  mounts.forEach((mount) => {
    const key = mount.getAttribute('data-ribbon');
    const list = byProject.get(key) || [];
    if (!list.length) { mount.remove(); return; } // no media → no ribbon
    buildRibbon(mount, list);
  });
}

function groupBy(arr, prop) {
  const map = new Map();
  arr.forEach((it) => {
    const k = it[prop];
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(it);
  });
  return map;
}

function buildRibbon(mount, items) {
  const wrap = document.createElement('div');
  wrap.className = 'rail-wrap';

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'rail-arrow rail-arrow--prev';
  prev.innerHTML = ICON_PREV;
  prev.setAttribute('data-i18n-aria', 'aria.railPrev');
  prev.setAttribute('aria-label', t('aria.railPrev'));

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'rail-arrow rail-arrow--next';
  next.innerHTML = ICON_NEXT;
  next.setAttribute('data-i18n-aria', 'aria.railNext');
  next.setAttribute('aria-label', t('aria.railNext'));

  const rail = document.createElement('div');
  rail.className = 'rail';
  rail.tabIndex = 0;
  rail.setAttribute('role', 'region');
  rail.setAttribute('data-i18n-aria', 'aria.railRegion');
  rail.setAttribute('aria-label', t('aria.railRegion'));

  const frag = document.createDocumentFragment();
  items.forEach((item) => frag.appendChild(buildCard(item, wrap)));
  rail.appendChild(frag);

  const foot = document.createElement('div');
  foot.className = 'rail-foot';
  const progress = document.createElement('span');
  progress.className = 'rail-progress';
  const bar = document.createElement('i');
  progress.appendChild(bar);
  const hint = document.createElement('span');
  hint.className = 'rail-hint';
  hint.setAttribute('data-i18n', 'ui.swipe');
  hint.textContent = t('ui.swipe');
  foot.append(progress, hint);

  wrap.append(prev, rail, foot);
  mount.appendChild(wrap);

  setupRailVideos(wrap, rail);
  setupRailNav(wrap, rail, prev, next, bar, foot);
}

function buildCard(item, wrap) {
  const card = document.createElement('figure');
  card.className = 'card';
  card.dataset.project = item.project;
  card._item = item;

  const media = document.createElement('div');
  media.className = 'media';
  // per-item aspect ratio clamped so tall screenshots aren't a sliver
  if (item.w && item.h) media.style.aspectRatio = String(clamp(0.8, item.w / item.h, 1.6));
  const cap = caption(item);

  const onError = () => {
    card.remove();
    if (!wrap.querySelector('.card')) {
      // rail emptied (all media failed) → remove the ribbon entirely
      const mount = wrap.closest('.ribbon');
      if (mount) mount.remove(); else wrap.remove();
      return;
    }
    if (wrap._updateNav) wrap._updateNav();
  };

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    if (item.poster) video.poster = item.poster;
    video.setAttribute('aria-label', cap);
    const source = document.createElement('source');
    source.src = item.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.addEventListener('error', onError);
    media.appendChild(video);

    const badge = document.createElement('span');
    badge.className = 'media__badge';
    badge.setAttribute('data-i18n', 'ui.workflow');
    badge.textContent = t('ui.workflow');
    media.appendChild(badge);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = cap;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', onError);
    media.appendChild(img);
  }

  const figcap = document.createElement('figcaption');
  figcap.className = 'card__cap';
  const tag = document.createElement('span');
  tag.className = 'cap__tag';
  tag.textContent = PROJECT_LABELS[item.project] || item.project;
  const text = document.createElement('span');
  text.className = 'cap__text';
  text.textContent = cap;
  figcap.append(tag, text);

  card.append(media, figcap);
  return card;
}

/* ── Per-rail video autoplay-on-scroll ── */
function setupRailVideos(wrap, rail) {
  const videos = Array.from(rail.querySelectorAll('video'));
  if (!videos.length) return;

  if (prefersReduced) {
    videos.forEach((v) => addManualPlayButton(v));
    return;
  }
  if (!('IntersectionObserver' in window)) return;

  const inView = new Set();
  let railOnScreen = false;

  // horizontal: plays a clip when ≥55% visible within THIS rail
  const horiz = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting) {
          inView.add(v);
          if (railOnScreen) v.play().catch(() => {});
        } else {
          inView.delete(v);
          v.pause();
        }
      });
    },
    { root: rail, threshold: 0.55 }
  );
  videos.forEach((v) => horiz.observe(v));

  // vertical: pause this rail's videos when the rail leaves the viewport
  const vert = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        railOnScreen = entry.isIntersecting;
        if (!railOnScreen) videos.forEach((v) => v.pause());
        else inView.forEach((v) => v.play().catch(() => {}));
      });
    },
    { threshold: 0 }
  );
  vert.observe(rail);
}

function addManualPlayButton(video) {
  const media = video.parentElement;
  if (!media) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'rail-play';
  btn.setAttribute('data-i18n-aria', 'aria.playToggle');
  btn.setAttribute('aria-label', t('aria.playToggle'));
  btn.innerHTML = ICON_PLAY;
  btn.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener('play', () => { btn.innerHTML = ICON_PAUSE; });
  video.addEventListener('pause', () => { btn.innerHTML = ICON_PLAY; });
  media.appendChild(btn);
}

/* ── Per-rail arrows, keyboard, progress ── */
function setupRailNav(wrap, rail, prev, next, bar, foot) {
  const behavior = prefersReduced ? 'auto' : 'smooth';
  const step = () => {
    const card = rail.querySelector('.card');
    const gap = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 16;
    return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
  };
  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const x = rail.scrollLeft;
    const single = max <= 2;
    prev.disabled = single || x <= 2;
    next.disabled = single || x >= max - 2;
    prev.hidden = single;
    next.hidden = single;
    foot.style.display = single ? 'none' : '';
    bar.style.width = `${max > 0 ? (x / max) * 100 : 0}%`;
  };
  wrap._updateNav = update;

  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior }));
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior }); }
  });
  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  // recompute once media has laid out
  update();
  requestAnimationFrame(update);
  window.addEventListener('load', update, { once: true });
}

/* ───────────────────────────── Re-render on language change ───────────────────────────── */
function renderDynamic() {
  // ribbon captions / alt / aria / workflow badges
  document.querySelectorAll('.card').forEach((card) => {
    const item = card._item;
    if (!item) return;
    const cap = caption(item);
    const text = card.querySelector('.cap__text');
    if (text) text.textContent = cap;
    const img = card.querySelector('img');
    if (img) img.alt = cap;
    const video = card.querySelector('video');
    if (video) video.setAttribute('aria-label', cap);
  });
  // expand/collapse labels follow each toggle's current state
  document.querySelectorAll('.project__toggle').forEach((btn) => {
    const label = btn.querySelector('.project__toggle-label');
    if (label) label.textContent = t(btn.getAttribute('aria-expanded') === 'true' ? 'ui.collapse' : 'ui.expand');
  });
}
