# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters and hiring managers** weighing Manal for a senior backend or team-lead role. They need experience, scope, stack and proof quickly.
- **Freelance and consulting clients** deciding whether to hire Manal for a project. They need to know what Manal builds and how to get in touch.

Both usually arrive from a link (LinkedIn, GitHub, a résumé, Medium) and scan before they read.

## Product Purpose

The personal portfolio of Manal Liaquat, Backend Engineer and Backend Team Lead at Plai. It presents 7+ years of web and mobile work and turns interest into contact (email or a social profile). Success means a visitor understands who Manal is and what Manal does within seconds, and can reach out without hunting.

## Positioning

A backend engineer and team lead who has also shipped frontend (React, Next.js) and mobile (React Native) products for insurance, marketing and agency clients. The systems behind the product are the core of the work.

## Capabilities and Constraints

- Static site on GitHub Pages, built with Vite + React 18 and deployed to the `gh-pages` branch by `.github/workflows/deploy.yml`.
- One design. The three-theme switcher (Terminal, Motion, Desktop) is being retired (confirmed by the user, 2026-11-07).
- No existing feature must survive: the 3D companions, the typeable terminal and the parallax added earlier are all optional. Only the content is binding.
- All content lives in `src/data/portfolio.js`; `seo/seoPlugin.js` generates prerendered HTML, meta tags, JSON-LD, sitemap, robots.txt, llms.txt and resume.json from it. This SEO and AI-agent support must keep working.
- `prefers-reduced-motion` must be respected; the site must be keyboard accessible.

## Evidence on Hand

From `src/data/portfolio.js`:

- Profile: name, current title, tagline, summary, email, avatar (`https://github.com/manalliaquat.png`).
- Experience: four roles (Plai, Insurance Market, Digital MarknAdsPlan, Systems Avenue) with dates, logos in `public/img/`, and short highlights.
- Skills in four groups (Backend, Frontend, Mobile, Tooling).
- Six certifications (Udacity, SMIT ×2, freeCodeCamp ×2, NIBAF Pakistan), some with verification links.
- Two Medium articles.
- Seven social profiles.

Absent, and not to be fabricated: project case studies, metrics, testimonials, client names beyond the employers listed, a phone number.

## Product Principles

1. Who Manal is and what Manal does is legible in the first viewport.
2. Every claim comes from the content file; nothing is invented.
3. Contact is never more than one action away.
4. Motion and interactivity serve the content; the site works fully without them.

## Accessibility & Inclusion

Respect `prefers-reduced-motion`, keep visible keyboard focus, keep the native cursor, and meet WCAG AA contrast.
