---
name: Manal Liaquat
description: A near-black, Kanit-set creator portfolio with gradient display type, a magenta-to-ember Contact button and scroll-driven motion.
colors:
  void-black: "#0c0c0c"
  mist-ink: "#d7e2ea"
  slate-steel: "#646973"
  steel-mist: "#bbccd7"
  paper-white: "#ffffff"
  aubergine-night: "#18011f"
  magenta-bloom: "#b600a8"
  ultraviolet: "#7621b0"
  ember: "#be4c00"
  silk-plum: "#3a1745"
typography:
  display-hero:
    fontFamily: "Kanit, sans-serif"
    fontSize: "12.4vw"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(3rem, 12vw, 160px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  numeral:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(3rem, 10vw, 140px)"
    fontWeight: 900
    lineHeight: 0.9
  marquee:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 6.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1.6rem, 4.4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1rem, 2.2vw, 2.1rem)"
    fontWeight: 500
    lineHeight: 1.15
  body-lead:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.35rem)"
    fontWeight: 500
    lineHeight: 1.625
  body:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)"
    fontWeight: 300
    lineHeight: 1.625
  tagline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)"
    fontWeight: 300
    lineHeight: 1.375
    letterSpacing: "0.025em"
  label:
    fontFamily: "Kanit, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  tile-sm: "14px"
  tile: "24px"
  panel: "40px"
  panel-wide: "50px"
  panel-xl: "60px"
  pill: "999px"
spacing:
  chip-gap: "10px"
  gutter: "1.25rem"
  gutter-hero: "1.5rem"
  gutter-wide: "2.5rem"
  section: "5rem"
  section-lg: "8rem"
components:
  button-contact:
    backgroundColor: "{colors.magenta-bloom}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 2rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist-ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.6rem"
  button-ghost-hover:
    backgroundColor: "rgba(215, 226, 234, 0.1)"
    textColor: "{colors.mist-ink}"
  card-work:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.mist-ink}"
    rounded: "{rounded.panel}"
    padding: "1rem"
  card-post:
    backgroundColor: "{colors.void-black}"
    textColor: "{colors.mist-ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
  chip:
    textColor: "{colors.mist-ink}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.2rem"
  panel-light:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.panel}"
    padding: "5rem 1.25rem"
  logo-tile:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.tile}"
    padding: "10px"
---

# Design System: Manal Liaquat

## Overview

**Creative North Star: "The Midnight Showreel"**

The Motion theme is a creator's showreel cut for the dark: one near-black stage (void-black), cool mist-coloured text, and enormous uppercase Kanit that fills the viewport edge to edge. It follows the MotionSites "3D Creator portfolio" brief the user supplied (recorded in PRODUCT.md under Brand Commitments) and is written in plain CSS in `src/themes/motion/motion.css`, scoped under `.mt-root`. The page reads as a sequence of reels: hero, skills marquee, about, a white numbered skills panel, sticky stacking work cards, credentials and writing, contact.

Colour is held back to two moments. The headings carry a cool steel gradient that fades from slate to mist, and the Contact action carries a hot four-stop gradient from aubergine through magenta and ultraviolet to ember. Everything else is ink on black, or black on white inside the skills panel. Density is low and type is the main visual material; there is no illustration system, only the photographic avatar, employer logos on white tiles, and the React Bits effects (Silk, Lanyard, ProfileCard) that add depth.

Motion is constant but never required: content fades up as it enters, paragraphs brighten character by character on scroll, work cards scale back as the next one stacks over them, and Lenis smooths the scroll. Every effect has a `prefers-reduced-motion` path, and the native cursor stays visible under the TargetCursor brackets.

The site ships a second theme, **Terminal** (the default), with its own styles in `src/themes/terminal/terminal.css`. It is not covered by this document; the tokens below describe the Motion theme only.

**Key Characteristics:**
- One typeface, Kanit, from 300 to 900, with 900 uppercase at viewport scale for display.
- Gradient display text (#646973 to #bbccd7, 180deg) as a deliberate brand commitment.
- A single hot gradient reserved for the Contact action.
- Very large radii (40px rising to 60px) and full pills; nothing square.
- Scroll-linked motion with a reduced-motion fallback for every effect.

## Colors

A monochrome near-black stage with cool steel text, interrupted only by one hot magenta-to-ember gradient.

### Primary
- **Magenta Bloom** (#b600a8): The core of the Contact gradient, the text-selection highlight, the tint of the work-card spotlight (at 22% alpha) and of the Contact button's outer glow.
- **Aubergine Night** (#18011f): The dark opening stop of the Contact gradient, so the button grows out of the black ground.

### Secondary
- **Ultraviolet** (#7621b0): The third Contact gradient stop, the Contact button's inner glow and the Lanyard strap colour.

### Tertiary
- **Ember** (#be4c00): The closing stop of the Contact gradient. Never used on its own.

### Neutral
- **Void Black** (#0c0c0c): The page ground, work cards, and the ink of the white skills panel and its numerals.
- **Mist Ink** (#d7e2ea): All body text on black, ghost-button borders, the focus outline, the TargetCursor and ClickSpark colour, and (at 35% / 15% alpha) the hairline borders of chips, posts and rows.
- **Slate Steel** (#646973): The top stop of the heading gradient.
- **Steel Mist** (#bbccd7): The bottom stop of the heading gradient, the Silk sheen and the work-card date line (at 70% opacity).
- **Paper White** (#ffffff): The skills panel, the logo tiles behind employer and certificate logos, and the Contact button's text and inset outline.
- **Silk Plum** (#3a1745): The base colour of the hero's Silk shader, shown at 55% opacity and masked out toward the bottom.

### Named Rules
**The Steel Gradient Rule.** Display headings on the dark stage are filled with `linear-gradient(180deg, #646973 0%, #bbccd7 100%)` clipped to the text. This is a brand commitment from the supplied brief, not decoration to be removed. Headings on the white skills panel are solid void-black instead.

**The One Hot Gradient Rule.** The aubergine, magenta, ultraviolet, ember gradient (123deg, stops at 7 / 37 / 72 / 100%) belongs to the Contact action. Its only other appearances are echoes of it: the Lanyard badge header, the selection colour and the spotlight tint.

## Typography

**Display Font:** Kanit (self-hosted via @fontsource/kanit, weights 300, 400, 500, 700, 900), falling back to sans-serif
**Body Font:** Kanit, same stack

**Character:** A single geometric Thai-Latin grotesque used at both extremes: 900 uppercase with tight tracking for display, 300 for long-form reading. Weight, not a second family, carries the hierarchy.

### Hierarchy
- **Display Hero** (900, 12.4vw at base rising to 13.2vw, 14.2vw and 15.4vw at 640 / 768 / 1024, line-height 1, -0.025em, uppercase, no wrap): The "Hi, I'm Manal" hero line, sized to span the full width.
- **Display** (900, clamp(3rem, 12vw, 160px), 1, -0.025em, uppercase, centred): Section titles (About me, Skills, Work, Credentials, Writing, contact line).
- **Numeral** (900, clamp(3rem, 10vw, 140px), 0.9): The 01, 02 index numbers in the skills list and on work cards.
- **Marquee** (900, clamp(2.5rem, 7vw, 6.5rem), 1.1, -0.02em, uppercase): The ScrollVelocity skill rows.
- **Headline** (700, clamp(1.6rem, 4.4vw, 4rem), 1, uppercase): Company names on work cards; post titles use the same weight at clamp(1.6rem, 3.4vw, 2.8rem).
- **Title** (500, clamp(1rem, 2.2vw, 2.1rem), uppercase): Skill-group names and credential titles.
- **Body Lead** (500, clamp(1rem, 2vw, 1.35rem), 1.625, max 560px, centred): The About summary.
- **Body** (300, clamp(0.85rem, 1.6vw, 1.25rem), 1.625, max 42rem): Skill lists, post excerpts and meta lines, usually at 60 to 70% opacity.
- **Tagline** (300, clamp(0.75rem, 1.4vw, 1.5rem), 1.375, 0.025em, uppercase, max 160 to 260px): The hero tagline beside the Contact button.
- **Label** (500, 0.75rem rising to 1rem, 0.1em, uppercase): Button text; chips use 0.06em tracking.

### Named Rules
**The Weight Is the Hierarchy Rule.** Kanit is the only family. Steps are made with weight (300 / 500 / 700 / 900), case and size, never with a second typeface.

**The Uppercase Display Rule.** Everything at 700 and above is uppercase. Running text (About, skill lists, excerpts) stays in sentence case.

## Layout

A single centred column with full-bleed sections. Content measures cap at 64rem for lists, rows, posts and footer, 72rem for the work stack and 42rem for body copy. Side gutters are 1.25rem on phones, 2rem from 640px and 2.5rem from 768px (1.5rem in the hero at base). Sections breathe at 5rem vertical padding, rising to 6rem and 8rem on the white panel at the larger breakpoints.

The hero is one full viewport (100svh, min 560px): PillNav centred at the top, the hero title just under it, the avatar centred (280px, then 360 / 440 / 520px and anchored to the bottom from 640px), and the tagline and Contact button pinned to the bottom corners.

Sections overlap rather than stack: the white skills panel and the black work section each round their top corners and the work section pulls up by 2.5rem (3rem, 3.5rem at larger sizes) so each slides over the last. Work cards sit in 85vh slots and stick at 6rem (8rem from 768px) with a 28px stagger per card.

Breakpoints follow the brief's Tailwind steps: 640px (two-column posts, contact grid becomes avatar beside actions), 768px (wider gutters, larger radii), 1024px (Lanyard badge appears in About, three.js loads only here).

## Elevation & Depth

Flat surfaces with outlined edges; depth comes from layering and motion rather than shadows. Cards are defined by a 2px mist-ink border, sections by overlapping rounded tops, and the hero by the Silk shader behind the type and the avatar in front of it. The only system shadow belongs to the Contact button; the PillNav and ProfileCard bring their own component-level shadows.

### Shadow Vocabulary
- **Contact glow** (`box-shadow: 0 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721b1`): A magenta drop under and a violet inner bevel on the Contact button only.

### Named Rules
**The Outline Not Shadow Rule.** Cards and posts separate from the black ground with a 2px border (solid mist-ink on work cards, 35% mist-ink on posts and chips), never a drop shadow.

## Shapes

Everything is round. Containers use very large radii: 40px at base, 50px from 640px and 60px from 768px, applied to work cards, posts, the avatar (40px) and the top corners only of the white skills panel and the work section. Actions and chips are full pills (999px). Logo tiles use 24px on work cards and 14px in credential rows. Hairline dividers (1px at 15% alpha) separate list rows top and bottom.

## Components

### Buttons
Rounded, uppercase and tracked, either hot or hollow.
- **Shape:** Full pill (999px).
- **Contact (primary):** The four-stop gradient (`linear-gradient(123deg, #18011f 7%, #b600a8 37%, #7621b0 72%, #be4c00 100%)`), white 500 text at 0.1em tracking, a 2px white outline inset by 3px, and the Contact glow. Padding 0.75rem 2rem at 0.75rem text, growing to 0.875rem 2.5rem / 0.875rem at 640px and 1rem 3rem / 1rem at 768px. Used in the hero, About and (with the email address in sentence case at 0.02em) in Contact.
- **Hover / Active:** Lifts 2px and brightens to 1.12 over 0.3s; returns on press. No transition under reduced motion.
- **Ghost:** 2px mist-ink border, mist-ink text, padding 0.6rem 1.6rem (0.75rem 2rem from 640px), 0.8rem to 0.9rem label. Hover fills with mist-ink at 10%. Used for Verify, Read on Medium and every social link.

### Chips
- **Style:** Work-card highlights as pills with a 2px border at 35% mist-ink, padding 0.55rem 1.2rem, uppercase at 0.06em, wrapping with a 10px gap.
- **State:** Static; no selection states.

### Cards / Containers
- **Work card:** Void-black, 2px solid mist-ink border, 40 / 50 / 60px radius, inner padding 1rem / 1.5rem / 2rem. Content: numeral, date line in steel mist, company headline, role in 300, logo on a white 24px tile, chips pinned to the bottom. Wrapped in SpotlightCard with a magenta spotlight (`rgba(182, 0, 168, 0.22)`). Cards stick and scale back by 3% per card still to come as the stack scrolls (disabled under reduced motion).
- **Post card:** Same radius scale, 2px border at 35% mist-ink, padding clamp(1.5rem, 3vw, 2.5rem), min-height 300px, SpotlightCard with a mist spotlight (`rgba(215, 226, 234, 0.16)`).
- **Skills panel:** Full-width white sheet with 40 / 50 / 60px top corners, void-black display title (no gradient) and a numbered list with 1px dividers at 15% black.

### Navigation
- **PillNav** (React Bits), configured with `theme="dark"`, `surface="glass"`, an "ML" monogram logo (mist-ink disc, void-black letters) linking to `#top`, and four anchors: About, Skills, Work, Contact. Centred at the top of the hero, fading down on load. Anchor clicks glide via Lenis (`scrollTo`, 1.3s).
- A skip link ("Skip to content") sits off-screen as a mist-ink pill and drops in on focus.

### Signature effects (React Bits, configured in MotionTheme.jsx)
- **Silk:** Hero background shader, `color="#3a1745"`, `sheenColor="#BBCCD7"`, `speed={3}`, `glow={0.2}`, at 55% opacity, masked to transparent below 55% height.
- **Magnet** (local, parts.jsx): Pulls the hero avatar toward a fine pointer within 150px (strength 3); fine-pointer and motion-allowed only.
- **ScrollVelocity:** Two skill rows at velocity 60, four copies, faded edges, alternate rows outlined.
- **Lanyard:** 3D badge at 1024px and up only, lazy-loaded, ultraviolet strap, glossy finish, size 0.62, face drawn as an SVG in the Contact gradient.
- **AnimatedText** (local): The About summary brightens each character from 20% to 100% opacity as it scrolls through view; the full text is also exposed to screen readers.
- **DecryptedText:** Skill-group names decrypt sequentially from the start when they enter view (speed 40).
- **SpotlightCard:** Pointer spotlight on work and post cards (tints above).
- **ProfileCard:** Contact section card with the GitHub avatar, name, current title, handle and an "Email me" action, max 340px wide.
- **ClickSpark:** Eight mist-ink sparks, radius 22, on every click.
- **TargetCursor:** Mist-ink corner brackets snap to links and buttons; `hideDefaultCursor={false}` keeps the native cursor.
- **FadeIn** (local): Default entrance for nearly everything: from 30 to 40px below (20px for small elements, -20px for the nav), 0.7s, `cubic-bezier(0.25, 0.1, 0.25, 1)`, once, with 0.06 to 0.1s staggers in lists.

## Do's and Don'ts

### Do:
- **Do** set every dark-stage display heading in Kanit 900 uppercase with the Steel Gradient (#646973 to #bbccd7, 180deg).
- **Do** use the Contact gradient button for the contact action and nothing else.
- **Do** round containers at 40px, stepping to 50px at 640px and 60px at 768px; use full pills for actions and chips.
- **Do** give every motion effect a `prefers-reduced-motion` path that leaves the content fully visible and static.
- **Do** keep the native cursor visible when TargetCursor is active.
- **Do** keep logos on white tiles (24px or 14px radius) so they read on the black stage.

### Don't:
- **Don't** add a second typeface; Kanit carries every role.
- **Don't** introduce hues beyond the gradient stops; new emphasis comes from weight, scale or the steel gradient.
- **Don't** put the steel gradient on the white skills panel; headings there are solid void-black.
- **Don't** separate cards from the ground with drop shadows; use the 2px outline.
- **Don't** use square or small-radius containers.
