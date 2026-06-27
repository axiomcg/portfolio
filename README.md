# Gleb Pyatkov — Portfolio

Single-page **static** portfolio for an AI Automation Engineer. Dark, AI-native,
techno-premium. Bilingual **EN/RU** (default EN, persisted in `localStorage`,
`?lang=ru` honored). No framework, no build step — plain HTML + CSS + vanilla JS
(ES modules).

## Structure

```
portfolio/
  index.html          # markup + EN static fallback content
  css/styles.css      # design tokens + all sections (single, well-sectioned file)
  js/i18n.js          # I18N dictionary (EN/RU) + applyLang()
  js/main.js          # counters, scroll-reveal, gallery + video autoplay, nav, lang/menu
  robots.txt          # allow all
  assets/             # images, video, posters, manifest.json, CV (produced separately)
```

## Run locally

Just open `index.html` in a browser — it works from `file://` (the gallery falls
back to an embedded item list if `assets/manifest.json` can't be fetched).

For a closer-to-production check, serve over HTTP:

```bash
cd portfolio
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Deploy on Nginx (static root)

Copy the `portfolio/` directory to the server (e.g. `/var/www/portfolio`) and
serve it as the static root:

```nginx
server {
    listen 443 ssl http2;
    server_name gleb.example.com;

    root /var/www/portfolio;
    index index.html;

    # SPA-free static site: just serve files, fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Long cache for fingerprint-free static assets
    location ~* \.(?:webp|jpg|jpeg|png|mp4|woff2?|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Correct MIME for ES modules
    location ~* \.(?:js|mjs)$ {
        types { application/javascript js mjs; }
        default_type application/javascript;
        expires 7d;
    }

    # Basic hardening
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

> Put the server behind Cloudflare (or another CDN/WAF) for TLS termination,
> DDoS protection and edge caching. The origin should not be reachable directly.

## Notes

- Fonts load from Google Fonts (`preconnect` + `display=swap`): Space Grotesk
  (headings), Inter (body), JetBrains Mono (chips/metrics).
- The gallery reads `assets/manifest.json` at runtime; an identical
  `FALLBACK_GALLERY` is embedded in `js/main.js` for resilience.
- Respects `prefers-reduced-motion`: counters/reveal/parallax are disabled and
  gallery videos show a poster + manual play button instead of autoplaying.
- Footer year is hardcoded to **2026**.
