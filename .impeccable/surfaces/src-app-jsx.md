---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface: portfolio home (/)

Scope: the whole single-page portfolio. Mode: Experience. Replaces the Terminal, Motion and Desktop themes and the theme switcher.
Audience: recruiters/hiring managers and freelance clients, equally (see PRODUCT.md). Action: email Manal or open a profile. Constraint: content only from src/data/portfolio.js; parallax/depth requested by the user.

## Direction contract

THESIS: Manal's career is a metro network map: disciplines are coloured lines, employers are stations, interchanges are roles that spanned disciplines. Refuses the dev-portfolio default of hero + subcopy + a row of project cards.

OWN-WORLD: White map paper, ink black, four saturated line colours as named roles (Backend red, Frontend blue, Mobile green, Tooling amber), 45° line geometry, white station discs with ink rings, overpass-style signage type (Overpass) with Overpass Mono only for dates and codes. Recognisable with content removed: thick coloured strokes meeting at ringed interchanges.

STORY: The visitor reads the network left to right (2019 to now), sees Manal moved from mobile and frontend onto the backend line and is "here" at Plai, scans the line strip maps for skills, checks credentials in a timetable, then emails.

FIRST VIEWPORT: Title block top-left (name at display scale, title, tagline). The network map fills the viewport: three lines crossing four stations by start date, "You are here" at Plai, the Backend line running on past the frame edge. Legend strip and the primary "Email Manal" sign at top-right.

FORM: Transit map career. Position 1 on the ordered list (Impeccable's pick, chosen by the user over the assigned candidate 7). seed:7c36d687a02cacfd

Signature interaction: the lines draw themselves along scroll and the stations light as reached; hover/focus a station to read its board. Motion grammar: scroll-tied stroke drawing plus layered parallax (district shading far, lines mid, labels near); off under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
