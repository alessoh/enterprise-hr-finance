# Meridian — Design System

Source of truth for every visual decision on the Meridian website. Tokens live in `src/app/globals.css`; primitives in `src/components/ui/`; site chrome in `src/components/site/`. If this document and the code disagree, fix the code.

## 1. Direction

**A navigator's chart: warm paper, precise ink, one instrument blue.**

Meridian sells governed agents to CFOs, CHROs and CIOs. The site must feel like the product: exact, calm, accountable. Warm off-white surfaces (paper) carry near-black ink typography; hairline rules do the structural work that shadows and gradients do on lesser sites; a single deep blue is reserved for interaction, live signals and the signature 3D object. Nothing glows unless it is alive.

Three defining words: **Governed. Precise. Warm.**

Calibration references: Stripe (density and type discipline), Attio (warm neutrals, hairlines), Linear (motion restraint, header), Anthropic (editorial serif on paper), Ramp/Mercury (finance-grade tables and numerals).

## 2. Typography

Faces: **Geist Sans** (UI, headings h2–h6, body), **Geist Mono** (code, IDs, metrics labels), plus exactly one display face: **Newsreader** (Google, variable, optical sizing) for display and h1 only, plus pull quotes in customer stories.

Why one serif: Geist alone reads as Vercel's house style, and every AI startup ships it. A single high-contrast serif at display sizes on warm paper gives Meridian an editorial, institutional voice that finance and HR buyers already trust from annual reports and broadsheets, while every UI surface stays in Geist so the product feels modern. Serif is never used below 40px.

| Role | Face | Size (rem / px) | Line-height | Tracking | Weight |
|---|---|---|---|---|---|
| display | Newsreader | 4.5 / 72 (mobile 2.75 / 44) | 1.0 | -0.015em | 400 |
| h1 | Newsreader | 3.5 / 56 (mobile 2.5 / 40) | 1.05 | -0.015em | 400 |
| h2 | Geist Sans | 2.5 / 40 (mobile 2 / 32) | 1.1 | -0.02em | 500 |
| h3 | Geist Sans | 1.75 / 28 | 1.2 | -0.015em | 500 |
| h4 | Geist Sans | 1.375 / 22 | 1.3 | -0.01em | 500 |
| h5 | Geist Sans | 1.125 / 18 | 1.4 | -0.005em | 500 |
| h6 | Geist Sans | 1 / 16 | 1.5 | 0 | 600 |
| lede | Geist Sans | 1.25 / 20 (mobile 1.125) | 1.5 | -0.005em | 400, fg-muted |
| body | Geist Sans | 1 / 16 | 1.6 | 0 | 400 |
| body-lg | Geist Sans | 1.125 / 18 | 1.6 | 0 | 400 |
| small | Geist Sans | 0.875 / 14 | 1.5 | 0 | 400 |
| caption | Geist Sans | 0.75 / 12 | 1.4 | 0.01em | 400, fg-subtle |
| eyebrow | Geist Sans | 0.75 / 12 | 1 | 0.08em, uppercase | 500, fg-muted (accent when live) |
| stat | Geist Sans | 3–3.5 / 48–56 | 1 | -0.03em | 500, tabular |
| mono | Geist Mono | 0.875 / 14 | 1.6 | 0 | 400 |

Rules
- Measure: 60–72ch for running text. `Container size="narrow"` is 42rem for articles.
- `font-variant-numeric: tabular-nums` on every metric, table cell, price, timestamp and stat. Never proportional figures in data.
- Optical sizing on Newsreader (`font-optical-sizing: auto`); Geist has none, so letter-spacing carries the weight.
- Negative tracking only at h3 and above. Body and small are never tightened.
- `text-wrap: balance` on headings; `text-wrap: pretty` on ledes and paragraphs.
- Headings are sentence case. No all-caps except eyebrows and table headers.
- Max heading lengths: H1 ≤ 9 words, H2 ≤ 8 words, card titles ≤ 4 words.

## 3. Color

All tokens are OKLCH. Hex values are the sRGB render for reference only. Light mode only; there is no dark mode and no dark sections except the primary button and code blocks.

### Neutral (warm stone, hue 70–80)

| Token | OKLCH | Hex | Use |
|---|---|---|---|
| bg | 0.995 0.002 80 | #fefdfc | page |
| bg-subtle | 0.977 0.004 80 | #f9f7f4 | alternating sections, table headers |
| bg-muted | 0.955 0.006 80 | #f2f0ec | hover fills, code, inset panels |
| bg-elevated | 1 0 0 | #ffffff | cards, inputs, dropdowns, mockups |
| border | 0.91 0.006 80 | #e3e1dd | hairlines (the default border) |
| border-strong | 0.84 0.008 80 | #cdcac5 | hover borders, secondary button, inputs |
| fg | 0.21 0.012 70 | #1c1712 | headings, body, primary button fill |
| fg-muted | 0.45 0.006 70 | #575552 | ledes, secondary text, nav |
| fg-subtle | 0.53 0.006 70 | #6e6b68 | captions, placeholders, footers |
| fg-faint | 0.70 0.005 75 | #a09e9a | decorative only: dividers, disabled icons. Never text. |

### Accent (instrument blue, hue 255) — one ramp, used sparingly

| Token | OKLCH | Hex | Use |
|---|---|---|---|
| accent | 0.44 0.115 255 | #1f5390 | links, active states, live indicators, chart-1, 3D prime meridian |
| accent-hover | 0.40 0.115 255 | #124784 | link hover |
| accent-pressed | 0.36 0.11 255 | #083c75 | pressed |
| accent-soft | 0.955 0.02 255 | #e7f1fe | tinted badge / callout fills, selection |
| accent-fg (on-accent) | 1 0 0 | #ffffff | text on accent fills |
| accent-ring | 0.60 0.12 255 | #4c82c6 | focus rings (2px, offset 2px) |

Primary buttons are **ink** (`fg`), not blue. Blue is for things you can click inline, things that are live, and the hero object. This is the single most important color rule.

### Semantic

| Token | OKLCH | Hex | Soft | Soft hex |
|---|---|---|---|---|
| success | 0.52 0.13 150 | #1d7d3e | 0.96 0.03 150 | #e4f8e7 |
| warning | 0.53 0.125 70 | #995c00 | 0.965 0.04 85 | #fff2d6 |
| danger | 0.52 0.19 27 | #be2323 | 0.96 0.025 25 | #ffece9 |
| info | = accent | | = accent-soft | |

### Charts

Categorical (in order): chart-1 #1f5390 (accent) · chart-2 #339797 teal (0.62 0.09 195) · chart-3 #d9a440 amber (0.75 0.13 80) · chart-4 #925b8d plum (0.55 0.10 330) · chart-5 #5b904f moss (0.60 0.11 140) · chart-6 #978e82 stone (0.65 0.02 75).
Sequential (accent scale): #e7f1fe → #b8d0ef → #7ea7dc → #467cc0 → #1f5390 → #0c335f. Gridlines use `border`; axis text uses `fg-subtle` at 12px tabular.

### 3D scene palette

Canvas transparent over `bg`. Sphere body `bg-subtle` #f9f7f4 with a faint rim in `border-strong`. Meridian lines: `fg` at 28% opacity. Prime meridian: `accent` at 100%. Agent nodes: `accent`, with a 2px `bg` halo. Ambient glow behind the sphere: `accent-soft` at 50%, blur 120px, one only.

### WCAG AA contrast (measured on rendered sRGB)

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| fg | bg / bg-subtle / bg-muted / bg-elevated | 17.5 / 16.6 / 15.6 / 17.7 | AAA |
| fg-muted | bg / bg-subtle / bg-muted | 7.34 / 6.97 / 6.54 | AAA |
| fg-subtle | bg / bg-subtle / bg-muted | 5.21 / 4.95 / 4.64 | AA (any size) |
| fg-faint | bg | 2.64 | decorative only, never text |
| bg (white text) | fg (primary button) | 17.5 | AAA |
| accent-fg | accent / accent-hover | 7.70 / 9.15 | AAA |
| accent | bg / bg-subtle | 7.70 / 7.31 | AAA |
| accent-hover (text) | accent-soft | 8.15 | AAA |
| success | success-soft / bg | 4.67 / 5.11 | AA |
| warning | warning-soft / bg | 4.88 / 5.34 | AA |
| danger | danger-soft / bg | 5.33 / 5.99 | AA |
| white | success / warning / danger | 5.11 / 5.34 / 5.99 | AA |
| accent-ring | bg | 3.90 | AA for UI components (≥3:1) |

## 4. Spacing & layout

- Base unit 4px. Tailwind spacing scale as-is. Component internals use 4/8/12/16/24; layout uses 32/48/64/96/128.
- **Section rhythm**: default `py-24 lg:py-32` (96 → 128px); compact `py-16 lg:py-20` (64 → 80px); hero `pt-16 pb-20 lg:pt-24 lg:pb-28`. Inside a section: header → 48px (lg 64px) → content. Stacked blocks inside content: 24px or 32px, never 40.
- **Containers**: default 75rem (1200px) content width; wide 85rem (1360px) for hero and product mockups; narrow 42rem (672px) for articles. Horizontal padding 20px (mobile) / 32px (md) / 40px (lg).
- **Grid**: 12 columns, 24px gutter (lg 32px). Cards: 3-up on lg, 2-up on md, 1-up on mobile. Never 4-up cards of text; 4-up is for stats and logos only.
- **Radii**: sm 6px (badges, kbd, small inputs) · md 8px (buttons, inputs, tooltips) · lg 12px (cards) · xl 16px (mockup frames, feature panels) · 2xl 24px (hero panels) · full (pills, avatars, status dots).
- **Hairlines**: 1px `border`. Structural hairlines separate sections that change background; never two hairlines within 8px. Cards use a hairline, not a shadow, at rest.
- **Shadows** (warm ink tint, layered): 
  - xs `0 1px 2px oklch(0.21 0.012 70 / 0.05)` — inputs at rest
  - sm `0 1px 2px …/0.05, 0 2px 6px -1px …/0.05` — hovered cards, dropdown
  - md `0 2px 4px …/0.04, 0 12px 24px -8px …/0.10` — popovers, mega menu
  - lg `0 4px 8px …/0.04, 0 32px 64px -16px …/0.14` — dialogs, product mockups
  - ring `0 0 0 1px border` — pseudo-border for images/mockups
- **Decorative textures**: DotGrid (1px dots, 24px pitch, `border-strong`, radial mask fading to 0 at 70%), HairlineGrid (vertical rails at container edges and center, `border` at 60%), Glow (one radial `accent-soft` blob, blur 120px, opacity ≤ 0.6). Restraint: at most one texture per section, at most two textured sections per page, never behind running text or inside cards, never animated.

## 5. Motion

- Durations: 120ms hover color · 160ms menus/tooltips · 200ms state change · 400ms entrance reveal · 480ms dialogs and sheets.
- Easings: `--ease-out-quart cubic-bezier(0.25, 1, 0.5, 1)` (entrances, menus); `--ease-in-out cubic-bezier(0.65, 0, 0.35, 1)` (movement); `--ease-standard cubic-bezier(0.2, 0, 0, 1)` (color/opacity).
- **Entrance reveal**: opacity 0→1 and translateY 12px→0 (max 16px), 400ms ease-out-quart, viewport `once`, trigger at -10% margin, stagger 60ms across at most 6 siblings; after 6 they animate together. Never on the hero H1 (it renders instantly for LCP); the hero sub and CTAs may reveal with delay ≤ 120ms.
- Hover micro-interactions: buttons change fill only; cards change border to `border-strong` and gain shadow-sm; arrow links move the arrow 2px right; nav triggers change text color. No scale transforms on anything larger than an icon.
- Number count-ups: 1200ms ease-out-expo from 0 to value, once, when 50% visible, tabular numerals so width never shifts, SSR renders the final value.
- Reduced motion: `prefers-reduced-motion: reduce` removes all transforms, disables the marquee (static grid), renders count-ups at their final value, replaces the 3D scene with the poster, and shortens remaining transitions to 1ms.
- Never animated: layout dimensions, header height, background gradients, text color of body copy, logos (no scale), page transitions, cursors, parallax on text, scroll-jacked sections, infinite bouncing arrows, typing effects.

## 6. Component specs

- **Buttons**: primary (ink fill, white text, hover fg/90), secondary (bg-elevated, border-strong hairline, hover bg-subtle), ghost (transparent, hover bg-muted), link (accent text, underline on hover, offset 4px), destructive (danger fill). Sizes sm 32px/13px text, md 40px/14px, lg 48px/16px, icon 40×40. Radius md. Font-weight 500. Icons 16px, gap 8px; a trailing arrow is the only decoration and it shifts 2px on hover. Loading replaces the icon with a spinner and sets `aria-busy`. Focus: 2px accent-ring outline, offset 2px. Never two primary buttons side by side.
- **Header**: 72px, sticky, hairline bottom. At rest `bg` at 0 alpha; after 8px scroll `bg/85` + 16px backdrop blur. Left: mark + wordmark (20px). Nav: Product · Customers · Pricing · Resources, 14px/500 fg-muted, hover fg. Product opens a mega menu on hover-intent (80ms) or click/Enter: three agent columns (HR / Finance / Legal & Ops, each item 14px name + 13px one-liner + GA/Early access badge) and a fourth Platform column (5 pillars + Security) separated by a hairline, footer row "See all agents →" / "See it live →". Resources opens a 4-item list with descriptions. Right: Sign in (ghost), Book a demo (secondary), Start free (primary), all sm. Below lg: hamburger → right Sheet with accordion groups and full-width CTAs.
- **Footer**: `bg-subtle`, hairline top. Row 1: mark + one-line description + status dot ("All systems operational" → /status) left, newsletter form right. Row 2: six link columns (Product, Agents, Platform, Company, Resources, Legal), 14px, fg-muted → fg. Row 3: "© 2026 Meridian Systems, Inc." and micro-links. No social icon row; text links only.
- **Cards**: bg-elevated, hairline border, radius lg, padding 24px (lg 28px). Title h5, description small fg-muted. Interactive cards: border-strong + shadow-sm on hover, whole card is the link. No icon-in-a-colored-square headers.
- **Badges**: 12px/500, pill, 22px tall. neutral (border + fg-muted), accent (accent-soft + accent-hover text), success, warning, danger. Presets: **GA** = neutral with a 6px success dot; **Early access** = accent.
- **Stat blocks**: value 48–56px Geist 500 tabular -0.03em, unit inline at 60% size, footnote marker as superscript link, label 14px fg-muted below, optional delta (▲/▼ text glyph, success/danger). Grid of 3 or 4 with hairline dividers between, not cards.
- **Tables**: hairline rows only, no vertical rules, header 12px uppercase eyebrow style on bg-subtle, cells 14px, numeric cells right-aligned tabular, row hover bg-subtle, sticky header on long tables, radius lg with ring.
- **Inputs**: 40px, bg-elevated, border-strong, radius md, 14px, placeholder fg-subtle, focus border accent + accent-ring outline. Labels 14px/500 above, 6px gap; help/error 13px below.
- **Accordion**: hairline separated, trigger 16px/500 with a chevron that rotates 180°, content 15px fg-muted with 16px bottom padding. Content is always in the DOM (SEO).
- **Tabs**: underline style; list has a hairline bottom, active tab ink text + 2px ink underline, inactive fg-muted. Panel content also rendered in DOM.
- **Code blocks**: Geist Mono 13px/1.6, bg `fg` (the only dark surface) with `bg` text at 90%, radius lg, 20px padding, optional filename bar. Inline code: bg-muted, radius sm, 0.9em.
- **Logo wall**: fictional partner wordmarks set in type, each with its own typographic treatment (weight, case, tracking, a small glyph at most), rendered in fg-subtle, hover fg. Marquee 48s linear, duplicated track, pauses on hover, static 4×2 grid under reduced motion or `variant="grid"`. Height 32px each, 64px gap.
- **Product-UI mockups**: `WindowFrame` — bg-elevated, ring + shadow-lg, radius xl, 40px title bar with three neutral 10px dots (never red/yellow/green), 12px title, optional URL pill. Inside: dense real-product typography (13px body, 12px labels, tabular numerals), tokens only, real-looking data (names from the fictional partners, dates in 2026, amounts with cents, IDs like `CASE-48211`), status badges from this system, no lorem, no rainbow charts, one accent per view. Mockups are HTML, not images, so they scale and stay crisp.
- **Section header pattern**: eyebrow (12px uppercase, fg-muted, optional live dot) → H2 ≤ 8 words → lede 1–2 sentences fg-muted, max 60ch. Left-aligned by default; centered only for the final CTA band and pricing header.
- **Footnote pattern**: any outcome metric carries a superscript marker `¹` linking to `#fn-1`. Every page with metrics ends its section (or the page) with a Footnotes list: "1. Modeled outcomes from design-partner deployments; results vary by data quality and workflow scope." Markers are 11px accent, footnotes 13px fg-subtle.

## 7. Three.js direction — "The Meridian"

Concept: a globe drawn only in meridians. Twenty-four thin longitude lines wrap a paper-colored sphere tilted 23.4°. One meridian, the prime meridian, is drawn in accent blue: the governed line. Twelve small nodes (the twelve agents) travel slowly along their own meridians; each time a node crosses the prime meridian it pulses once, 600ms, a 1.6× halo in accent-soft. Work passes through the governed line and is checked. That is the product in one object.

- Geometry: inner sphere r=1 (32×32 segments), meridians as 24 `Line` loops (drei `Line` or `Line2`, 1.25px, 128 points each), nodes r=0.018 spheres. Total triangles < 10k.
- Materials: sphere `MeshStandardMaterial` color bg-subtle, roughness 0.95, metalness 0; lines `LineBasicMaterial`/`LineMaterial` color fg at 0.28 opacity, prime meridian accent at 1.0; nodes `MeshBasicMaterial` accent. No environment maps, no bloom, no post-processing.
- Lighting: hemisphere light (sky `bg`, ground `border-strong`, 1.1) + one directional at (3, 4, 5) intensity 0.6, no shadows.
- Camera: perspective fov 32, position (0, 0.35, 5.2), lookAt origin. Sphere occupies ~62% of canvas height. Canvas alpha, `powerPreference: "low-power"`, DPR `min(devicePixelRatio, 2)`, antialias on.
- Motion: idle rotation about the tilted axis 0.06 rad/s; nodes move 0.10–0.16 rad/s with fixed phase offsets; pointer parallax rotates the group ±4° with lerp 0.06; no motion on touch devices.
- Poster: `public/brand/hero-poster.svg` is a faithful static render (same palette, same tilt). It is the `<img>` beneath the canvas; canvas fades in over 400ms once the first frame renders, so there is no pop and no LCP penalty.
- Fallbacks: prefers-reduced-motion → poster; `< 768px` → poster; WebGL unavailable → poster; canvas paused via IntersectionObserver when < 10% visible and on `document.hidden`.
- Budget: three chunk ≤ 250KB gzipped (import from `three` and `@react-three/fiber` only; from drei import individual modules), dynamic import `ssr:false`, loaded after hero text paints, `requestIdleCallback` on desktop.

## 8. Page templates

**Home** — 1 Hero (H1 "AI agents that run HR and finance." serif, lede, Start free + Book a demo, trust line "SOC 2 Type II · ISO 27001 · No training on your data"; right: The Meridian) → 2 Logo wall (eight design partners) → 3 Proof stats (4 stats with footnote) → 4 The agent contract (six tenets as a hairline list, the positioning section) → 5 Agents catalog (12 cards grouped HR / Finance / Legal & Ops, status badges) → 6 See it live (WindowFrame with the SSE operations feed and live metrics, link to /dashboard) → 7 Platform (five pillars as tabs with a mockup each; Trust strip beneath) → 8 Customer story feature (serif pull quote + two stats) → 9 Pricing teaser (three plans, credits one-liner) → 10 FAQ (accordion, in DOM) → 11 Final CTA band (centered, bg-subtle). Footnotes after section 3 and 8.

**Agent detail** — Breadcrumbs → eyebrow "HR agent" + status badge → H1 agent name (serif) → lede = one-line job → CTAs → headline metric stat → "What it does" (3 numbered steps) → WindowFrame mockup of the agent at work → The agent contract (six tenets, checked) → Data it reads / Actions it takes / What needs approval (three columns) → Outcomes (stats with footnote) → FAQ → Related agents (3 cards) → CTA.

**Platform pillar** — Breadcrumbs → eyebrow "Platform" → H1 pillar name → lede → hero mockup or diagram → capabilities grid (3×2 cards, no icons-in-squares) → specification table (standards, protocols, limits) → how it fits (the other four pillars as arrow links) → FAQ → CTA.

**Pricing** — centered header → monthly/annual toggle → three plan cards (Growth marked "Recommended for most teams" with border-strong) → credit rate table → calculator (inputs left, recommendation + estimated credits + hours saved right, footnote) → full comparison table → FAQ → Enterprise CTA.

**Article** — narrow container; eyebrow category + date + reading time → H1 → lede → author line (initials avatar) → Key takeaways callout → sticky TOC on xl (right) → `prose-meridian` body → FAQ → related agents → CTA.

**Customer story** — partner wordmark → H1 (result-led) → meta table (industry, size, agents, region) → 3 headline stats → serif pull quote → body (challenge / approach / outcome) → related agents → CTA.

## 9. Anti-patterns (never)

Purple-blue gradients; glassmorphism on anything but the scrolled header; emoji anywhere; generic 3-up icon grids with icons in colored squares; centering everything; drop shadows on everything; fake star ratings, review counts or "trusted by 10,000+"; stock photos or AI-generated people; hype copy and exclamation marks; rainbow charts; animated gradient text; oversized rounded blobs; bouncing scroll cues; typewriter headlines; dark hero on light site; more than one accent; text below 12px; body text lighter than fg-muted; two primary buttons together; carousels for content; cookie-banner-sized announcement bars; buttons with both an icon and an arrow.

## 10. Copy rules (from BRIEF §2)

Meridian, never "Meridian AI". Legal: Meridian Systems, Inc. Voice: precise, confident, calm, concrete; short sentences; numbers over adjectives. Banned: revolutionary, supercharge, unleash, seamless, cutting-edge, next-gen, unlock. No emoji, no exclamation marks. "Narrow, governed agents", not chatbots. Model posture: "supports" / "bring your own model", never "partnered with". No real vendor names from the briefing, no real customer logos, no real people. Every outcome figure carries the footnote "Modeled outcomes from design-partner deployments."

## 11. CTA arrow convention

A trailing arrow marks a move to another page to look at something ("See it live", "Read the story"). It never appears
on the primary conversion button ("Book a demo", "Start free"): that button is the end of the journey, not a step in it.
So in a primary/secondary pair the arrow belongs to the secondary. Never put an arrow on both.

## 12. Rules earned in the blind gauntlet

These were all learned by losing a comparison. Do not undo them without a better reason than the one that produced them.

- **A number is one thing.** A stat is a numeral with its unit set tight at the numeral's own weight. Never shrink the
  unit to 60% and recolour it, and never hang the footnote marker off the figure: the marker rides the label.
- **Colour only where it means something.** Blue is for what is live or clickable. Amber means a human still has to
  decide, and nothing else. A status row that is healthy gets no badge and no saturated fill; the exceptions get both.
- **Three encodings of one fact is two too many.** A badge, a green bar and a percentage all saying "operational" makes
  "fine" the loudest thing on the page.
- **Wordmarks are type, so a half-faded one reads as a misspelling.** Use a static variant wherever a mark could be cut.
  One cap-height and one weight across a set; tell them apart by case, tracking and a glyph.
- **An abstract hero visual has to earn its half of the fold.** If it cannot be read as a diagram, pair it with a real
  product artefact and give the two a deliberate relationship. "Decorative geometry" is the most common fatal note.
- **A fold needs a floor.** A hero that ends in white space floats; close the band with a partner row or a rule.
- **Placeholder-shaped copy is worse than no copy.** A row that describes what a section contains, rather than what it
  says, reads as unreplaced boilerplate.
- **Never let a page repeat a hero.** A detail page that reuses the overview's hero has no design of its own.
