# glebium.me

My personal site, styled as a cozy illustrated café. The menu on the
counter is the navigation — order the "About Me" and see what happens.

Built with React + Vite. No frameworks beyond that, no external
requests: every image, font fallback, and the background track are
served locally.

## Art

Background and UI illustrations are from **"Cafe in the Clouds"** by
**mythridate, bithox & shuttlefrog**, used with the artists' permission.
Everything else (layout, code, the questionable jokes) is mine.

## Running locally

```bash
npm install
npm run dev
```

`npm run build` produces the deployable `dist/` folder. Hosted on
Vercel, which builds straight from this repo on every push.

## How it's put together

- `src/App.jsx` — audio state, panel routing, the music invite timing
- `src/components/CafeScene.jsx` — the café backdrop and lamp glows
- `src/components/MenuBooklet.jsx` — the menu: every internal size
  derives from one `--bw` variable so the booklet scales like a
  printed object and text always lands in the art's blank zones
- `src/components/ContentPanel.jsx` — the four sections' content
- `src/components/MusicToggle.jsx` — music button + volume slider
- `src/styles/global.css` — all styling; palette tokens up top

Small details I care about: navigation works entirely by keyboard
(Tab/Enter, Escape closes panels), `prefers-reduced-motion` switches
off the tilt and ambient animation, music never autoplays — a note
politely offers it instead — and the menu's hover notes live in
reserved space so nothing ever overlaps.

`RainCanvas.jsx` is an unused leftover from an earlier rainy-window
version of the site. It might come back one day.
