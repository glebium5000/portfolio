# Café Gleb — illustrated portfolio (v3)

A single-page portfolio composed from hand-painted café illustrations:
you're inside the café, the menu booklet on the counter is the navigation,
and a rainy window onto the street is the custom centrepiece.

## Run it

```bash
npm install
npm run dev
```

## Deploy

`npm run build`, then deploy to Vercel/Netlify with default Vite settings
(output `dist`). All assets are local — no external URLs.

## Asset notes

- Illustrated assets live in `/public/assets`, converted to WebP
  (backgrounds went from ~3.1 MB PNG to ~240 KB total).
- Cursors are downscaled PNGs (36px) — CSS cursors need PNG/SVG.
- Individual pastries were cropped out of the snack sheets
  (alpha connected-components) so they can sit on the counter
  as singles instead of pasting a whole scatter-sheet.
- `textbox.png` was deliberately not used for panels: its fixed
  1920×289 aspect would require non-uniform scaling. Panels use
  `frame-alt` as border-image instead, which wraps any size cleanly.

## Where things live

- `src/components/CafeScene.jsx` — interior background, the window
  (sky + street + night tint + rain), lamp glows
- `src/components/RainCanvas.jsx` — dual-layer rain system
- `src/components/MenuBooklet.jsx` — navigation booklet + counter pastries
- `src/components/ContentPanel.jsx` — the four sections (put your real
  bio/projects/links/posts here)
- `src/components/MusicToggle.jsx` — music note button + volume slider
- `src/styles/global.css` — all styling; palette tokens at the top

## Accessibility & performance

- Real buttons, Escape closes panels, focus management on open
- `prefers-reduced-motion` calms rain/flicker/bob animations
- Rain is canvas-based; parallax runs through CSS variables
  (no React re-renders, no layout thrash)
