---
name: Manal Liaquat
description: A backend engineer's career drawn as a metro network map.
colors:
  map-paper: "#f8f9fa"
  fare-zone: "#eef0f3"
  station-white: "#ffffff"
  signal-ink: "#16181d"
  timetable-grey: "#555b69"
  track-rule: "#d5d9df"
  backend-red: "#d42a30"
  frontend-blue: "#1a5fc9"
  mobile-green: "#0d8346"
  tooling-amber: "#f2a900"
  night-rule: "#3a3e48"
  night-muted: "#aab0bd"
  night-focus: "#8fb6ff"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(52px, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(38px, 5.4vw, 72px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(30px, 4vw, 46px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
  lede:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(19px, 2vw, 24px)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.06em"
  code:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
rounded:
  tag: "2px"
  focus: "4px"
  sign: "8px"
  panel: "10px"
  tile: "14px"
  pill: "999px"
  disc: "50%"
spacing:
  gutter: "clamp(16px, 5vw, 72px)"
  band: "clamp(72px, 9vw, 128px)"
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "44px"
  xl: "64px"
components:
  sign-primary:
    backgroundColor: "{colors.signal-ink}"
    textColor: "{colors.map-paper}"
    rounded: "{rounded.sign}"
    padding: "9px 14px 7px"
  sign-primary-hover:
    backgroundColor: "{colors.backend-red}"
    textColor: "{colors.map-paper}"
  sign-large:
    backgroundColor: "{colors.signal-ink}"
    textColor: "{colors.map-paper}"
    rounded: "{rounded.sign}"
    padding: "20px 26px 17px"
  sign-on-night:
    backgroundColor: "{colors.map-paper}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.sign}"
  line-tag:
    backgroundColor: "{colors.station-white}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.pill}"
    padding: "3px 12px 2px 4px"
  line-bullet:
    backgroundColor: "{colors.backend-red}"
    textColor: "{colors.station-white}"
    rounded: "{rounded.disc}"
    size: "30px"
  map-key:
    backgroundColor: "{colors.station-white}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.panel}"
    padding: "14px 18px 12px"
  you-are-here:
    backgroundColor: "{colors.signal-ink}"
    textColor: "{colors.station-white}"
    rounded: "{rounded.pill}"
    height: "28px"
  timetable-head:
    backgroundColor: "{colors.signal-ink}"
    textColor: "{colors.map-paper}"
    typography: "{typography.label}"
    padding: "12px 20px 10px"
  station-logo:
    backgroundColor: "{colors.station-white}"
    rounded: "{rounded.tile}"
    size: "112px"
    padding: "14px"
---

# Design System: Manal Liaquat

## Overview

**Creative North Star: "The Network Map"**

The whole site is printed transit cartography. A pale map paper carries ink-black signage and four thick, saturated line colours, each of which names a discipline (Backend, Frontend, Mobile, Tooling). Content is arranged the way a metro authority arranges information: a map with a key, a station guide, strip maps per line, a timetable, and a terminus. Strip every word away and the system is still recognisable: 10 to 12px coloured strokes on 45° diagonals, white discs with heavy ink rings where lines meet, rectangular end-of-line bars, and alternating fare-zone bands behind them.

Density is calm and wayfinding-first. Type is large, heavy and direct, set in Overpass, a face descended from highway signage; Overpass Mono appears only for dates, years and codes, the way a timetable sets departure times. Depth comes from layered planes (zone bands far, lines and stations mid, labels near) that drift apart with scroll and pointer, never from shadows or blur. Motion is cartographic, and every move is something a network does. On arrival the name wipes in, the lines draw themselves along their paths, stations appear once the line reaches them, a train runs the backend line into Plai, and "You are here" pops in. Scrolling past the map sends the train on along the line. Hovering or focusing a station opens its board (logo, role, dates, highlights, lines). The header's bottom rule fills red as scroll progress, and the nav underlines the section in view. Each section enters in its own way: headings rise with a short bar in their line colour, the station guide's track fills and dims stations not yet reached, the strip maps draw across and their stops pop in order, timetable rows flip in like a departures board, writing slides in, and the terminus line draws to its station ring. Signs fill red from the left on hover. All of it switches off under `prefers-reduced-motion`, and the content reads completely without it.

The hero map draws on load as a timed sequence (about 3.5s end to end); the scroll-tied drawing lives in the train's departure and the station guide. Entrances are hidden only under `.anim-on`, which the app sets when motion is allowed, so content is visible if scripts fail.

**Key Characteristics:**
- Map paper, ink, and four line colours as named roles; nothing else carries hue.
- Thick round-capped strokes, 45° diagonals only, white ringed interchanges.
- Overpass at weight 800 for every heading; Overpass Mono only for time and codes.
- Flat surfaces; depth is parallax between map planes, not shadow.
- Ink-filled "signs" with an arrow are the only buttons.
- One dark surface, the terminus, where the backend line runs into contact.

## Colors

A near-white map paper and cool ink with four transit-saturated line colours that function strictly as labels for disciplines.

### Primary
- **Backend Red** (backend-red): the current line, the one that runs off the page edge. Strokes, the "You are here" dot, the terminus line and disc, and the hover state of every ink sign and nav underline. The most important colour because it marks where the career is now.

### Secondary
- **Frontend Blue** (frontend-blue): the frontend line, and the system's interactive colour: focus outlines (3px, offset 3px), text selection, "Verify" and "Read on Medium" links, the intermediate stop tick on the map, and focused station labels.

### Tertiary
- **Mobile Green** (mobile-green): the mobile line, on the map, the station guide track and the line bullets.
- **Tooling Amber** (tooling-amber): the tooling line. It appears only as a fill (strip-map track and bullet), always carrying ink text, never white text and never as text on paper.

### Neutral
- **Map Paper** (map-paper): page background, header background, alternate fare-zone bands, and text on ink surfaces. Also the `theme-color`.
- **Fare Zone** (fare-zone): the alternating year bands behind the map, the Lines section background, even timetable rows, and the scrollbar track.
- **Station White** (station-white): the fill of every station disc, ring and strip-map stop; the map key panel, line tags and logo tiles. Pure white reads as "the station" against off-white paper.
- **Signal Ink** (signal-ink): all text, station rings, header and section rules (2px), sign backgrounds, the timetable head, the "You are here" pill, and the terminus surface.
- **Timetable Grey** (timetable-grey): secondary text (taglines, highlights, issuers, post descriptions), dates and year labels.
- **Track Rule** (track-rule): 1 to 1.5px dividers, tag and tile borders, and the unreached station-guide track and disc rings.
- **Night Rule / Night Muted / Night Focus** (night-rule, night-muted, night-focus): the terminus only. Dividers between connections, secondary text, and a lightened focus outline that keeps the blue focus language legible on ink.

### Named Rules
**The Line Colour Rule.** Red, blue, green and amber each name a discipline. A line colour appears only where that discipline is meant (a stroke, a bullet, a tag, a strip track), with two sanctioned interaction uses: blue for focus and links, red for hover on signs and underlines. No line colour is ever decoration.

**The Ink On Amber Rule.** Text set on a line colour is white on red, blue and green, and ink on amber.

## Typography

**Display Font:** Overpass (with Helvetica Neue, Arial, sans-serif), self-hosted at 400, 600, 700, 800.
**Body Font:** Overpass.
**Label/Mono Font:** Overpass Mono (with ui-monospace, monospace), self-hosted at 400 and 600.

**Character:** Signage type. Overpass at 800 with tight negative tracking gives every heading the weight of a station name board; Overpass Mono beside it reads as a printed timetable.

### Hierarchy
- **Display** (800, clamp(52px, 8.4vw, 6rem), 0.92, -0.03em): the name in the hero, and the terminus heading at a slightly larger clamp (up to 6rem, 0.95).
- **Headline** (800, clamp(38px, 5.4vw, 72px), 1, -0.03em): section names (Stations, Lines, Credentials, Writing).
- **Title** (800, clamp(30px, 4vw, 46px), 1.05, -0.025em): station names in the guide; post titles a step smaller (clamp(26px, 3.2vw, 38px)); map station names at 20px.
- **Title Small** (800, 26px, -0.02em): strip-map line names and the floor of post titles.
- **Subtitle** (700, 19 to 24px): role lines under names (hero title, station role).
- **Lede** (400, clamp(19px, 2vw, 24px), 1.45, max 38em): section introductions; descriptions cap at 60ch.
- **Body** (400, 17px, 1.55): highlights, table cells, descriptions.
- **Body Small** (600, 15px): nav links, the header sign, map roles, connection handles, mono dates in the guide.
- **Caption** (600, 14px): map key entries, line tags, the "You are here" pill, the footer.
- **Label** (800, 13px, 0.06em, uppercase): the map key heading and timetable column heads only.
- **Code** (Overpass Mono 400, 12 to 15px): dates, years on the fare-zone bands, date ranges in the guide.

### Named Rules
**The Mono Is Time Rule.** Overpass Mono is reserved for dates, years and codes. Names, roles and prose are always Overpass.

**The Baseline Lift Rule.** Overpass sits high in its box, so filled elements carry 2 to 3px more padding on top than on bottom (signs 9/7 and 20/17, tags 3/2, bullets padding-top 0.12em). Keep the asymmetry when adding filled labels.

## Layout

A full-bleed page with a fluid side gutter (gutter) and generous vertical bands (band padding). The header is a 64px sticky bar on map paper with a 2px ink bottom rule; anchor scrolling is offset by 84px to clear it. The hero is a two-column grid (title block, then the map key aligned to the bottom right) above a full-width SVG network map whose current line bleeds past the right edge, clipped by the hero.

The station guide is a two-column grid (intro at minmax(280px, 1fr), list at 1.7fr) with a sticky intro (top 112px). Each stop is a three-column row: a 60px track gutter with a 10px vertical track, the body, and a 112px logo tile. Strip maps are a 200px name column beside a horizontal track with evenly flexed stops (max 190px each). Lists and posts cap at 980px. Connections use an auto-fill grid of 260px minimum columns.

At 900px and below: the nav hides (the Email sign stays), the key becomes an unboxed legend strip under a 2px ink rule, the map swaps to a vertical drawing where time runs top to bottom, strip maps turn vertical, the guide intro stops sticking, and logos shrink to 56px tiles in the corner of each stop. At 600px the timetable drops its header and each row becomes a two-column card.

## Elevation & Depth

The system is flat: there is no `box-shadow`, gradient or blur anywhere. Separation comes from 2px ink rules, 1 to 1.5px track-rule borders, the fare-zone tint, and the single ink terminus surface. Depth is spatial instead: the hero map is three stacked SVG planes (fare-zone bands far, lines and stations mid, labels near) that translate at different rates with scroll and a fine pointer, and the title block drifts slightly against the map. Hovering a station label thickens its ring on the mid plane, so the planes answer each other.

### Named Rules
**The Paper Map Rule.** Nothing floats above the paper. Depth is planes sliding against each other, never a cast shadow.

## Shapes

Strokes are thick and round: 12px map lines and 10px guide and strip tracks, all with round caps and joins, turning only at 45°. Stations are circles: 24px strip stops and 40px guide discs in white with 5 to 7px rings, 12px-radius map interchanges with a 5px ink ring (6px at the current station, 8px on hover). Line ends are flat rectangular bars (2px radius). Bars and tracks with rounded ends take half their thickness as radius (3px on the 6px key swatch, 5px on the 10px strip track, 6px where the 12px terminus line ends). The focus outline carries a 4px radius. Containers are soft rectangles: signs at 8px, the map key and timetable at 10px, logo tiles at 14px; tags and the "You are here" marker are full pills. Line bullets are solid circles bearing a single letter.

## Components

### Buttons (Signs)
Ink panels that read like station direction signs.
- **Shape:** gently rounded (8px).
- **Primary:** signal ink fill, map paper text, 700 weight, a trailing 16px stroked arrow; small (15px, 9px 14px 7px) in the header, large (clamp(18px, 2.6vw, 30px), 20px 26px 17px) for the email address at the terminus.
- **Hover / Focus:** fill turns backend red in 0.15s and the arrow slides 3px right; focus is the 3px blue outline. On the ink terminus the sign inverts to paper with ink text, then red with white text on hover.

### Chips (Line Tags)
- **Style:** white pill with a 1.5px track-rule border, 14px 600 text, led by a 22px line bullet.
- **State:** static labels; no selected state.

### Line Bullets
Solid line-coloured circles with the line's letter in 800 weight, at 22, 30 or 44px. They name a line wherever it is mentioned outside the map.

### Cards / Containers
- **Corner Style:** 10px for the map key and timetable frame, 14px for logo tiles.
- **Background:** station white on map paper.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 2px signal ink for the key and timetable, 1.5px track rule for logo tiles.
- **Internal Padding:** 14px 18px 12px (key), 14px (logo tile).

### Navigation
600 weight 15px ink links spaced 26px apart, no underline at rest, underline in backend red on hover. The home link pairs the site mark (three short line strokes meeting at a white ringed interchange) with the name in 800. Below 900px the links hide; the Email sign remains.

### Network Map (signature)
An SVG metro map of the career: one lane per discipline, time along the long axis, 45° transfers between lanes, ringed interchanges where a role spanned two lines, a blue tick for a single-line stop, end bars where a line stops, and a ringed red-dot station with an ink "You are here" pill for the current role. Station labels are links to the guide entry (name 800 20px, role 400 15px, date in mono). Lines draw in sequence over 1.3s with the expo-out ease; stations fade in after.

### Station Guide (signature)
A vertical line diagram of the career. Each stop's track segment takes the colour of the line that joins it to the next stop and fills top-down as the reader scrolls; its disc ring turns from track rule to ink when reached.

### Strip Maps
One per line: the line bullet and name, then a 10px coloured track with white ink-ringed stops, one per skill, labelled beneath in 600 16px.

### Timetable
Credentials as a departures board: ink header row in uppercase labels, zebra fare-zone rows, 700 names, grey issuers, and a right-aligned blue "Verify" link with an external arrow.

### Terminus
The contact section on signal ink. The backend line enters from the left edge and ends in a white disc with a red ring, followed by the display heading, the large email sign and a grid of connections divided by night rules.

## Do's and Don'ts

### Do:
- **Do** give every discipline its line colour (backend-red, frontend-blue, mobile-green, tooling-amber) and use that colour every time the discipline appears.
- **Do** draw connections as thick round-capped strokes (10 to 12px) that turn only at 45°, with white ringed discs at stations.
- **Do** set headings in Overpass 800 with negative tracking, and dates and years in Overpass Mono.
- **Do** keep primary actions as ink signs with an arrow that turn backend red on hover.
- **Do** show keyboard focus as the 3px frontend-blue outline at 3px offset (night-focus on the terminus).
- **Do** switch off stroke drawing, fades, entrances, the train run, guide fill and parallax under `prefers-reduced-motion`, leaving every element in its final state (the train parked at Plai).

### Don't:
- **Don't** add box shadows, gradients or blur; depth comes from parallax planes and rules.
- **Don't** introduce a hue outside the four line colours, or use a line colour as decoration.
- **Don't** put white text on tooling amber or set amber text on paper.
- **Don't** draw curved or arbitrary-angle lines on the map; 45° diagonals only.
- **Don't** set names, roles or prose in Overpass Mono.
