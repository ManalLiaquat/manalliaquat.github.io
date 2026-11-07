---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface: portfolio home (/)

Scope: the whole single-page portfolio. Mode: Experience. Replaces the transit-map design (rejected by the user).
Audience: recruiters/hiring managers and freelance clients, equally (see PRODUCT.md). Action: email Manal or open a profile. Constraint: content only from src/data/portfolio.js.

## Direction contract

THESIS: The premium standard, played straight at studio fidelity: a dark, cinematic single-page portfolio whose scroll is choreographed like a product launch page. Refuses the static template (hero, then sections of equal cards with fade-ups).

OWN-WORLD: Near-black stage (#0b0b0d) with warm off-white type, one periwinkle accent, and a late shift to a light paper section for credentials and writing. Bricolage Grotesque at very large display sizes with tight but legal tracking; Onest for reading. Hairline rules, 16px-radius panels, pill controls. No gradient text, no glass cards, no glow halos.

STORY: The visitor meets the name at full scale, reads the summary as it lights up word by word, steps through each role as stacked cards, feels the breadth of skills in moving rows, checks credentials and writing, and ends on a full-bleed call to email.

FIRST VIEWPORT: The name set across the full width in two lines at display scale, letters rising in; a "Currently Backend Team Lead @ Plai" badge with a live dot above it; the tagline and two magnetic buttons (Email me, See the work) bottom-left; a scroll cue bottom-right. Pill nav floating at top.

FORM: Premium standard (the standing exit, chosen by the user over the re-rolled hand). Quality bar: Apple product pages and Awwwards studio sites. seed:7c36d687a02cacfd

Signature interaction: scroll-scrubbed storytelling (GSAP ScrollTrigger + Lenis smooth scroll): pinned word-by-word summary, stacking experience cards that recede, velocity-reactive skill marquees, hover-follow logos on credential rows, a cursor-follower ring that grows over interactive targets, a one-time intro curtain. All off under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
