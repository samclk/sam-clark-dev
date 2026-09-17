# CLK Studio — build brief

One-page site for Sam Clark, creative developer. `index.html` + `style.css` + `script.js` in
this folder are a working, responsive reference build of the design — open `index.html` in a
browser and it runs. Treat them as the source of truth for look and motion, not as the final
codebase.

The design canvas this came from has four artboards: the page at desktop and phone width, an
interaction specimen board, and a type/colour board.

---

## 1. The direction, in one line

Brutally quiet. Warm paper ground, near-black ink, hairlines and space instead of cards and
shadows. One accent that only ever appears on hover. Everything that moves is either responding
to the pointer or arriving for the first time — with exactly one exception, the availability dot.

If a change makes the page louder, it is the wrong change.

---

## 2. Tokens

All defined on `:root` in `style.css`.

### Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F4F3EF` | page ground |
| `--paper-raised` | `#FAF9F6` | the one tint above the ground (spec tiles) |
| `--ink` | `#14140F` | headlines, primary body |
| `--quiet` | `#5E5D56` | secondary body — 5.4:1 on paper |
| `--faint` | `#8A897E` | mono labels only — 4.6:1, never below 11px |
| `--hairline` | `rgba(20,20,15,.13)` | every rule on the page |
| `--accent` | `#B4502F` | hover states only. Nothing is accent-coloured at rest |
| `--status` | `#3F7A55` | availability dot, nothing else |
| `--tile` | `#EAE9E3` | empty mosaic tile |

Hairlines are ink at 13%, never a grey. That is what keeps them from reading as borders.

### Type

Three families, all Google Fonts:

- **Schibsted Grotesk** (400/500/600) — headlines and body.
- **Instrument Serif** italic — accent words inside headlines only. Currently just
  *more beautiful* in the hero. Do not let it spread.
- **JetBrains Mono** (400/500) — labels, indices, the clock, tags. Always 11px, `0.1em`
  tracking, uppercase.

Scale is fluid via `clamp()`; the desktop and phone ends are:

| Token | Phone → Desktop |
|---|---|
| `--fs-hero` | 38 → 82 / 1.04, `-0.028em` |
| `--fs-work` | 24 → 44, `-0.02em` |
| `--fs-mail` | 26 → 64, `-0.028em` |
| `--fs-lede` | 19 → 27 / 1.48 |
| `--fs-body` | 16 → 19 / 1.5–1.62 |
| `--fs-label` | 11, fixed |

### Space

- `--gutter`: `clamp(24px, 5.2vw, 120px)` — page margin.
- `--section`: `clamp(88px, 11vw, 168px)` — gap between sections.
- `--maxw`: `1440px`.

---

## 3. Motion

One easing curve for the whole site: `cubic-bezier(0.22, 1, 0.36, 1)`, exposed as `--ease`.
Transforms and opacity only — nothing animates layout.

| Moment | Spec |
|---|---|
| Entry reveal | 20px rise + fade, 1100ms, staggered 120ms per sibling. Fires once on first entry; scrolling back up does not replay |
| Work row | name `translateX(18px)`, index lifts 3px and tints accent, 1px accent rule draws left→right over 760ms, arrow fades in from −14px, meta drops to 45% |
| Nav / social underline | wipes out to the left, back in from the right (`transform-origin` swaps on hover) |
| Email underline | 2px accent, always left→right, 760ms |
| Mosaic tile | media scales to 1.045 over 1400ms, scrim + caption fade up |
| Portrait | scales to 1.035 over 1400ms |
| Availability dot | ring breathes out every 2800ms. The only unprompted motion on the page |

`prefers-reduced-motion: reduce` drops every animation to its static end state. This is already
wired in both CSS and JS — keep it working through any rewrite.

---

## 4. Page structure

Single page, four anchors. The header links are jump links, not routes — there are no other
pages, and the numbering (01–04) exists to say so.

```
header          wordmark · 01–04 jump links · live local clock
#top   hero     status dot · headline · meta row (Who / Currently / Based / Available)
#highlights     section head · 12-col staggered mosaic (7+5, then 4+4+4)
#work           section head · four rows, index + name + role/stack + arrow
#about          portrait 4:5 · lede + body
#contact        big mailto · Instagram / LinkedIn / GitHub
footer          © · back to top
```

Breakpoints: 1080px drops the clock, 860px swaps the nav for a Contact pill, stacks the mosaic
(full / half+half / full), wraps the work rows and stacks About.

---

## 5. Content status

**Real, verified — from the live site and Sam's CV:**

- Positioning: creative developer. Ten years, SaaS / e-commerce / agency.
- Currently contracting at Neverbland. Available October 2026. UK, remote.
- Stack: React, Next.js, TypeScript, Tailwind, CSS Modules, Styled-Components, Redux, xState,
  Storybook · Sanity, GraphCMS, Commerce Layer, Contentful, Shopify · GitHub Actions, Vitest,
  Cypress · Framer Motion, GSAP, Three.js, WebGL.
- Work rows: Backstage with Bon Jovi (Lead Developer, Three.js · WebGL, Awwwards SOTD) ·
  Natoora (Lead Developer, Sanity · Commerce Layer) · Neverbland Studio (Sole Developer, design
  system · page builder).
- `sam@clkstudio.co.uk`, and the three social URLs.

**Still placeholder — search the source for `[`:**

- `[ROLE]` / `[WHAT YOU BUILT]` on the RSPCA Assured row. Not in the CV.
- Every mosaic tile: `[IMAGE OR VIDEO]` and `[WHAT THIS IS — PROJECT, YEAR]`.
- Project years across all four rows are deliberately absent rather than guessed.

**Deliberately not built yet:** a capabilities block. The CV has four clean skill groups
(Frontend / CMS / Testing & Tooling / Animation & Creative) that would sit under About if
wanted. Left out to keep the page short.

---

## 6. Filling the mosaic

Each tile is a `<figure class="tile">` holding one media element with `class="m"`. Swap the
placeholder div for the real thing and keep the classes:

```html
<!-- image -->
<img class="m" src="assets/mizkan-cms.jpg" alt="" width="1400" height="900">

<!-- video: muted, looping, plays on hover, poster shows at rest -->
<video class="m" muted loop playsinline preload="metadata"
       poster="assets/imgs-stadium.jpg" src="assets/imgs-stadium.mp4"></video>
```

`script.js` already handles play on `pointerenter` and pause + rewind on leave, and skips video
entirely under reduced motion. Encode clips as short silent MP4/WebM loops under ~2MB — they
are decoration, not content.

---

## 7. If this becomes a Next.js build

The obvious shape given the stack:

- Next.js App Router + TypeScript. Single `page.tsx`, one component per section
  (`Hero`, `Mosaic`, `Work`, `About`, `Contact`).
- Tokens go into `tailwind.config.ts` under `theme.extend` — colours, the fluid font sizes as
  `clamp()` strings, and `--ease` as a custom `transitionTimingFunction`. Keep the names used
  here so the spec stays readable against the code.
- Framer Motion replaces the IntersectionObserver: `whileInView` with `viewport={{ once: true }}`
  and a stagger on the hero children. Match the numbers in §3 rather than Framer's defaults, and
  respect `useReducedMotion()`.
- Hover states are cheaper in plain CSS than in Motion — keep the work row, underline and tile
  transitions as CSS, and use Motion only for entry.
- The mosaic wants a CMS behind it if it is going to be added to regularly. Sanity fits the rest
  of the stack: one `highlight` document with media, caption, project ref, aspect hint (wide /
  narrow / third), and an order field.
- `next/image` for the portrait and tile stills; keep `object-position: 50% 32%` on the
  portrait, it is doing real work on that crop.

---

## 8. Things worth not losing

- The accent never appears at rest. The moment something is rust-coloured before you touch it,
  the page stops being quiet.
- One accent word in the serif italic. Two is a pattern, and the pattern cheapens it.
- The clock is a small, human detail. It is also the only thing on the page that would look
  broken if JS fails — it degrades to `--:--:--`, which is fine.
- Touch targets are ≥44px throughout. Keep them there when the nav becomes a menu.
- No fake status bars, no shadows, no rounded cards. The tag pill is the single rounded thing
  on the page and it has earned it.
