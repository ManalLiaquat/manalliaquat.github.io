---
name: Manal Liaquat
description: A dark, cinematic single-page portfolio whose scroll is choreographed like a product launch.
colors:
  stage: "#0b0b0d"
  stage-panel: "#141417"
  stage-panel-raised: "#1b1b20"
  stage-ink: "#f3f1ec"
  stage-muted: "#a3a3ad"
  stage-line: "rgba(243, 241, 236, 0.12)"
  periwinkle: "#8f9dff"
  paper: "#efede8"
  paper-panel: "#ffffff"
  paper-panel-raised: "#f7f6f2"
  paper-ink: "#111113"
  paper-muted: "#5d5d66"
  paper-line: "rgba(17, 17, 19, 0.12)"
  cobalt: "#4152d9"
  live-green: "#4ade80"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(64px, 23.6vw, 30rem)"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-0.04em"
    fontVariation: "\"opsz\" 96"
  display-closing:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(56px, 13vw, 13rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  display-company:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(44px, 8vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(48px, 9vw, 9rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.6vw, 72px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  panel-heading:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 64px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  pill:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(22px, 3vw, 44px)"
    fontWeight: 600
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.8vw, 38px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "clamp(19px, 2vw, 26px)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  micro:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  focus: "6px"
  panel: "16px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  gutter: "clamp(16px, 4.5vw, 64px)"
  section: "clamp(80px, 10vw, 160px)"
  stack-gap: "8vh"
components:
  button-primary:
    backgroundColor: "{colors.stage-ink}"
    textColor: "{colors.stage}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-primary-hover:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.stage}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-ghost-hover:
    backgroundColor: "{colors.stage-ink}"
    textColor: "{colors.stage}"
  button-sm:
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-lg:
    rounded: "{rounded.pill}"
    padding: "22px 34px"
  nav:
    backgroundColor: "{colors.stage-panel}"
    rounded: "{rounded.pill}"
    padding: "8px 8px 8px 18px"
  nav-link:
    textColor: "{colors.stage-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-active:
    backgroundColor: "{colors.stage-line}"
    textColor: "{colors.stage-ink}"
  badge:
    textColor: "{colors.stage-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px 8px 12px"
  card-experience:
    backgroundColor: "{colors.stage-panel}"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(28px, 4vw, 56px)"
  chip-note:
    textColor: "{colors.stage-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  pill-skill:
    backgroundColor: "{colors.stage-panel}"
    textColor: "{colors.stage-ink}"
    typography: "{typography.pill}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  pill-skill-hover:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.stage}"
  row-credential:
    textColor: "{colors.paper-ink}"
    typography: "{typography.title}"
    padding: "26px 8px"
  post-panel:
    backgroundColor: "{colors.paper-panel}"
    textColor: "{colors.paper-ink}"
    typography: "{typography.panel-heading}"
    rounded: "{rounded.panel}"
    padding: "clamp(24px, 3vw, 40px)"
  social-link:
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
---

# Design System: Manal Liaquat

## Overview

**Creative North Star: "The Launch Keynote"**

The site plays like a product launch on a dark stage. The name arrives at full width and full weight. The summary lights up word by word while the page holds still. Each role slides in as a panel over the last one, and the skills run past in rows. Then the house lights come up: the page fades to warm paper for credentials and writing, goes dark again, and closes on a full-bleed call to email. Scroll sets the pace. Every movement is tied to the reader's scroll position or pointer, and almost nothing moves on a timer.

Density is low and scale is extreme. One or two very large Bricolage Grotesque words own each section, and Onest body text sits quietly beneath them. The material is plain: flat near-black panels, 1px hairlines at 12% ink, pill controls and 16px-radius panels. Depth comes from motion (scale, brightness and stacking order), not from shadow, glass or glow. The one periwinkle accent marks the second line of the name, roles, links and the filled state of a control, and nothing else.

Every effect is optional. Under `prefers-reduced-motion` the intro, smooth scroll, scrubbing, marquees, magnetic pull and cursor ring all switch off, and the page shows its final state at once. The native cursor always stays.

**Key Characteristics:**
- Near-black stage, warm off-white ink, one periwinkle accent; a single shift to paper for the credentials and writing sections.
- Display type at extreme scale (up to 30rem) with tight but legible tracking (-0.04em).
- Hairline rules, 16px-radius panels and fully rounded pill controls; no shadows.
- Scroll-scrubbed choreography (GSAP ScrollTrigger with Lenis) on one shared ease curve.
- All motion removed under reduced motion; content and layout never depend on it.

## Colors

The page uses two tonal scenes, a dark stage and a light paper, and each has exactly one accent.

### Primary
- **Periwinkle** (`periwinkle`): the accent on the dark stage. Used for the second line of the hero name, each role title, the second line of the contact headline, the focus outline, selected text, link affordances ("Verify"), the skill-pill hover fill, the hover fill of the solid button and the labelled cursor ring.
- **Cobalt** (`cobalt`): the same accent role on the paper scene, deepened so it meets AA contrast on paper. It takes over automatically when a section is marked as light; never place it on the dark stage.

### Neutral
- **Stage Black** (`stage`): the page background and the ink on filled light controls (solid button, hover fills, the intro curtain's type). It doubles as the accent-ink on the dark stage.
- **Stage Panel** (`stage-panel`): experience cards, skill pills and the base of the floating nav. `stage-panel-raised` is defined for a second tier but rarely used.
- **Warm Ink** (`stage-ink`): all primary text on dark, the solid button fill, the hover fill of ghost buttons and socials, and the intro curtain.
- **Ash** (`stage-muted`): dates, counts, the badge, chip notes, marquee labels, nav links at rest, footer text.
- **Hairline** (`stage-line`): every border and rule on dark, and the background of the active nav link.
- **Paper** (`paper`), **Paper White** (`paper-panel`), **Paper Raised** (`paper-panel-raised`), **Paper Ink** (`paper-ink`), **Graphite** (`paper-muted`), **Paper Hairline** (`paper-line`): the light scene's equivalents, swapped in as a set. Paper White is also the accent-ink on paper and the backing tile behind company logos.
- **Live Green** (`live-green`): only the pulsing "currently" dot in the hero badge. It is a status signal, not an accent.

### Named Rules
**The One Accent Rule.** Each scene has exactly one accent: periwinkle on the stage, cobalt on paper. A second hue (Live Green excepted) never enters.

**The Scene Swap Rule.** Colors are always assigned through the role variables (background, panel, ink, muted, line, accent, accent-ink), never as raw hex values in a component. The light scene is a full swap of those roles on the page root, cross-faded over 0.7s, so every component works in both scenes without its own light variant.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Onest Variable, system-ui)
**Body Font:** Onest Variable (with system-ui, sans-serif)

Both are self-hosted variable fonts loaded from `@fontsource-variable`.

**Character:** Bricolage carries the voice: heavy, slightly quirky, tracked tight and set enormous. Onest is the plain, even reading face that stays out of its way. All h1 to h3 headings use Bricolage, with `text-wrap: balance`.

### Hierarchy
- **Display** (700, clamp 64px to 30rem, 0.84 line height, -0.04em, optical size 96): the hero name only, set across the full width in two lines (26.5vw on mobile).
- **Display Closing** (700, clamp 56px to 13rem, 0.9, -0.045em): the two-line contact headline, whose second line is in the accent.
- **Display Company** (700, clamp 44px to 8rem, 0.95, -0.04em): company names on the experience cards.
- **Headline** (700, clamp 48px to 9rem, 0.92, -0.04em): section titles, one or two words, revealed line by line out of a mask.
- **Statement** (600, clamp 30px to 72px, 1.12, -0.03em, max 21em): the pinned summary paragraph that lights up word by word.
- **Panel Heading** (700, clamp 34px to 64px, 1, -0.035em): writing-panel titles.
- **Pill** (600, clamp 22px to 44px, -0.02em): skill pills in the marquees.
- **Title** (600, clamp 22px to 38px, 1.1, -0.02em): credential row titles.
- **Lead** (400, clamp 19px to 26px, 1.35): the hero tagline (max 22ch) and role titles (500 weight, in the accent color).
- **Body** (400, 17px, 1.6): running text. Post summaries are capped at 44ch.
- **Label** (400 to 500, 15px): nav links, the badge, dates (tabular numerals), chip notes, marquee labels, small buttons.
- **Caption** (14px): the footer.
- **Micro** (600, 13px): the label inside the cursor ring and the ML monogram (Bricolage 700 there). The hero's vertical scroll cue is also 13px, but it is uppercase with 0.2em tracking, which makes it a one-off rather than a reusable label style.

### Named Rules
**The Two Voices Rule.** Bricolage is for things you look at, Onest is for things you read. Never set a paragraph in Bricolage below statement size, and never set a heading in Onest.

**The Tight-But-Legal Rule.** Display tracking runs between -0.02em and -0.045em, getting tighter as the size grows; it never goes tight enough for letters to collide.

## Layout

The layout is a single full-bleed column with a fluid gutter (clamp 16px to 64px) on both sides. Sections are separated by generous fluid padding (clamp 80px to 160px at the top for experience, 80px to 140px for credentials and writing, 100px to 200px for contact). Each section opens with a heading block: a huge title on the left, an optional muted count on the right, and a hairline rule below, with clamp 32px to 64px of space before the content.

- **Hero:** at least one full viewport (`100svh`), content aligned to the bottom. The badge, name, tagline and buttons stack in the lower left, with a vertical scroll cue in the lower right.
- **Statement:** a 260vh track with a sticky, viewport-tall frame, so the paragraph stays put while its words light up.
- **Experience:** an ordered list of sticky cards with 8vh between them. Each sticks at `96px + index × 22px` (84px + index × 14px on mobile), so the edges of earlier cards stay visible above the current one.
- **Skills:** full-bleed marquee rows. Each row has a fixed label column (`minmax(120px, 13vw)`) and a masked viewport that fades out at 6% from each edge.
- **Credentials:** a three-column row grid (title, issuer, action at 100px) between hairlines.
- **Writing:** two equal panels with a 20px gap.
- **Small gaps** run on 8, 12, 16 and 20px steps; pills and chips use 8 to 14px gaps.

One breakpoint at **860px**. Below it the nav hides its links and name, keeping the monogram and the Contact button. The scroll cue disappears. The hero drops its full-height rule and takes 140px of top padding. Marquee labels stack above their rows, credential rows collapse to two columns, and writing panels go to one column.

## Elevation & Depth

The system is flat at rest and has no `box-shadow` anywhere. Depth comes from three sources. First, tonal layering: a panel sits one step above the background, with a 1px hairline. Second, stacking: sticky cards physically overlap. Third, motion: as the next card slides over a card, the earlier one scales to 0.93 and dims to 62% brightness, and the hero recedes (moves up 18%, scales to 0.94, fades to 0.15 opacity) as you scroll past it. The floating nav is the only surface with a backdrop blur (14px over an 82% panel tint), and that is what lets it float over the content.

### Named Rules
**The Recede, Don't Lift Rule.** To show something is behind, push it back with scale and brightness tied to scroll. Never add a drop shadow to bring something forward.

**The Hover Lift Exception.** Writing panels are the only panels that rise on hover (up 6px over 0.6s). They also show a soft accent wash that follows the cursor (18% accent, 420px radius), which only appears while hovering.

## Shapes

The shape language is pill plus panel. Every control (buttons, nav, nav links, badge, chip notes, skill pills, social links, the skip link) is fully rounded (999px). Every content container (experience cards, writing panels, logo tiles, the floating credential preview) uses a 16px radius. Circles appear only for the nav monogram, the live dot and the cursor ring. The focus outline is 2px in the accent, offset 4px with a 6px radius. Borders are always 1px hairlines in the line color. Interface icons are a single 16px stroked arrow (1.8 stroke, round caps), straight for actions and diagonal for external links. On hover it nudges 2 to 3px in the direction it points.

## Components

All transitions share one curve, `cubic-bezier(0.16, 1, 0.3, 1)` (a fast start with a long, soft settle), unless noted.

### Buttons
- **Shape:** full pill, 1px hairline border, Onest 500, with an optional trailing arrow.
- **Primary (solid):** ink fill with stage-colored text. On hover a periwinkle layer rises from below (translateY 101% to 0 over 0.5s) and the text switches to accent-ink.
- **Ghost:** transparent with ink text. On hover an ink layer rises from below and the text turns stage black.
- **Sizes:** default 15px by 26px padding; small 9px by 18px at 15px (nav Contact); large 22px by 34px at clamp 17px to 26px (the contact email, which may break anywhere).
- **Magnetic:** hero and contact buttons lean toward a fine pointer (30% of the offset, 20% for the large one, 0.5s power3 easing) and spring back when the pointer leaves.
- **Focus:** the global accent outline.

### Chips
- **Chip notes** (experience highlights): pill, hairline border, muted 15px text, 7px by 14px padding. They are static and have no hover state.
- **Skill pills:** pill on the panel color, in Bricolage 600 at clamp 22px to 44px, 14px by 28px padding. On hover they fill with the accent and accent-ink text.

### Cards / Containers
- **Experience card:** 16px radius, panel background, hairline border, padding clamp 28px to 56px, minimum height min(56vh, 480px). A date (tabular) and a 64px logo on a white 16px tile sit at the top, then the company name at display scale, the role in the accent, and the chip notes. When it enters, its contents fade up 40px with a 0.06s stagger.
- **Writing panel:** 16px radius, panel background, hairline border, padding clamp 24px to 40px, minimum height 300px (no minimum on mobile). The heading sits at the top, followed by a muted summary capped at 44ch, and a "Read on Medium" link pinned to the bottom. Hover adds the lift and cursor wash described under Elevation, and the border turns to the accent.

### Navigation
- **Floating pill nav:** fixed 16px from the top, centered, up to 980px wide, 82% panel tint with a 14px blur and a hairline border. It holds the ML monogram (a 32px ink circle that spins a full turn on hover), the name, section links and a small Contact button.
- **Links:** muted 15px text in 8px by 14px pills. On hover, and on the active section (tracked by scroll position), they get ink text on a hairline-tinted fill.
- **Scroll behavior:** the nav slides up out of view when scrolling down and returns when scrolling up or within 120px of the top (0.45s, power3.out). After 40px it switches to a 90% background tint.

### Credential Rows (signature)
These are full-width rows between hairlines. The title is set in Bricolage, the issuer is muted, and verifiable rows end with an accent "Verify" and a diagonal arrow. On hover the row slides 20px inward (8px to 28px left padding) and the title turns to the accent. With a mouse, a 150px white tile showing the certificate image follows the cursor, appearing from 0.5 scale and -8° rotation. When the list scrolls in, the rows wipe in from the left (clip-path, 1s power4.inOut, 0.07s stagger).

### Skill Marquees (signature)
Rows of skill pills scroll sideways in alternating directions on a 38s loop. Their speed jumps with scroll velocity (up to 7× normal) and settles back over 1.2s. A group with fewer than three items stays still and unmasked rather than repeating itself. Under reduced motion, each row shows one wrapped set of pills.

### Kinetic Type (signature)
Headings are split into masked letters or lines that rise into place. Hero letters rise from 115% (1.1s power4.out, 0.04s stagger). Section titles rise line by line from 110% when they enter the viewport. The contact headline scales up from 0.86 as you scroll to it. Supporting elements fade up 40px over 1s (power3.out). Screen readers get each string once, intact.

### Cursor Ring
A 36px ring with a 1px border follows the native cursor (0.35s power3) in difference blend mode. Over links and buttons it grows to 64px and fills. Over targets that carry a label ("Verify", "Read") it grows to 84px, fills with the accent and shows the label. It shrinks to 26px while pressed. It only appears with a fine pointer and normal motion settings, and it never replaces the native cursor.

### Intro Curtain
This plays once per session: the name assembles in stage black on an ink curtain with a 2px progress bar, the letters lift out, and the curtain slides up (0.8s power4.inOut). It is skipped on repeat visits and under reduced motion.

## Do's and Don'ts

### Do:
- **Do** assign every color through the role variables so a section marked as light swaps the whole palette at once.
- **Do** keep one accent per scene: periwinkle on the stage, cobalt on paper.
- **Do** use Bricolage at 600 to 700 with -0.02em to -0.045em tracking for anything meant to be looked at, and Onest at 17px with 1.6 line height for anything meant to be read.
- **Do** make every control a 999px pill with a 1px hairline, and every content container a 16px-radius panel.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for CSS transitions and power3/power4 eases for GSAP, and tie large movements to scroll position.
- **Do** show depth by receding with scale and brightness, not by lifting with shadows.
- **Do** give every motion a reduced-motion path that shows the final state, and keep the native cursor and the 2px accent focus outline.

### Don't:
- **Don't** use gradient text, glass cards or glow halos. The nav's backdrop blur is the only frosted surface, and the writing panels' accent wash appears only on hover.
- **Don't** add `box-shadow` to panels, cards or buttons.
- **Don't** introduce a second accent hue or put cobalt on the dark stage.
- **Don't** fall back to equal-card grids with generic fade-ups; each section has its own scroll behavior.
- **Don't** hide the native cursor or make any content depend on hover, the pointer or motion.
