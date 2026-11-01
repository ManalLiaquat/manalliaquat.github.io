# Interactive Portfolio Revamp — Design

## Goal
Replace the developerFolio (CRA / React 16) site with an interactive portfolio that
loads one of three themes at random, while keeping all content available without
interaction.

## Stack
Vite + React 18. Plain CSS per theme. No UI/animation libraries.

## Architecture
- `src/data/portfolio.js` — single source of content: profile, socials, experience
  (4 roles), skills, certifications, Medium blogs.
- `src/App.jsx` — theme selection: `?theme=terminal|motion|desktop` if present,
  otherwise Terminal (the default). Themes are `React.lazy` loaded so only one ships per visit.
- `src/components/ThemeSwitcher.jsx` — fixed pill (bottom-right) to switch themes;
  updates `?theme=` via `history.replaceState` so links are shareable.
- `src/themes/terminal/` — typeable terminal hero (help, whoami, experience, skills,
  certs, blog, contact, socials, theme, clear; tab completion; ↑/↓ history), followed by
  scrolling sections: career timeline, skills, certs, blog, contact.
- `src/themes/motion/` — canvas node field reacting to cursor, big type hero, magnetic
  CTAs, scroll-reveal experience, horizontal card rail for certs/blogs.
- `src/themes/desktop/` — menubar, desktop icons, dock; draggable/focusable/closable
  windows (About open by default). Below 768px: home-screen icon grid opening
  full-screen sheets.

## Cross-cutting rules
- `prefers-reduced-motion` disables canvas animation, reveals and typing effects.
- Keyboard accessible, visible focus, native cursor kept.
- No invented metrics. Placeholder phone number dropped.

## Deploy
- `npm run deploy` → `vite build` → `gh-pages -d dist -b gh-pages`.
- GitHub Pages source switched from `master` to `gh-pages` (user approved).
- `.github/workflows/deploy.yml` updated to build `dist` with Node 20.

## Testing
Production build succeeds; each theme checked at desktop and mobile widths in a
browser; terminal commands, window dragging, theme switcher and `?theme=` verified.

## SEO and AI agents
`seo/seoPlugin.js` (Vite plugin) generates from `src/data/portfolio.js` at build time:
prerendered semantic HTML inside `#root`, meta/OG/Twitter tags, canonical URL, `rel="me"`
links, Schema.org JSON-LD (`WebSite`, `ProfilePage`, `Person`, `BlogPosting`), `robots.txt`
(explicitly allowing AI crawlers), `sitemap.xml`, `llms.txt`, `llms-full.txt` and
`resume.json` (JSON Resume schema). `public/og-image.png` is the 1200×630 share image.
