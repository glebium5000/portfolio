/**
 * MenuBooklet — replaces TableScene.jsx.
 * The illustrated menu booklet (menu-booklet-back.webp) sits bottom-anchored
 * on the painted counter, occupying the empty character space in the centre
 * of the interior art. Navigation items use the game's nav-button art for
 * idle/hover states (hover swaps background-image, preloaded via CSS).
 * Two cropped pastry illustrations rest ON the counter line beside it, with
 * a very slow bob — no CSS drop-shadows, since the art has painted shadows.
 */
const MENU = [
  { id: 'about',    name: 'About Me',   note: 'the house blend' },
  { id: 'projects', name: 'Projects',   note: 'baked fresh daily' },
  { id: 'contact',  name: 'Contact Me', note: "say hello, it's free" },
  { id: 'blog',     name: 'Blog',       note: "today's specials" },
]

import { useEffect, useRef } from 'react'

/* v6: booklet is centred mid-viewport; all internal sizing is derived
   from the booklet width in CSS so text lands in the art's blank zones.
   v7: gentle pointer-tracking tilt (fine pointers only, respects
   reduced motion) so the booklet feels held rather than pinned. */
export default function MenuBooklet({ onOrder, activePanel }) {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return
    const el = ref.current
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', (nx * 5).toFixed(2) + 'deg')
      el.style.setProperty('--rx', (ny * -3.5).toFixed(2) + 'deg')
    }
    const onLeave = () => {
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="counter-layer">
      <nav className="booklet" aria-label="Site navigation" ref={ref}>
        <header className="booklet-head">
          <span className="booklet-est">London, United Kingdom</span>
          <h1 className="booklet-title">Gleb R.</h1>
          <p className="booklet-tag">fintech compliance &amp; hobby developer</p>
        </header>
        <ul className="booklet-list">
          {MENU.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-btn ${activePanel === item.id ? 'is-active' : ''}`}
                onClick={() => onOrder(item.id)}
                aria-haspopup="dialog"
              >
                <span className="nb-name">{item.name}</span>
                <span className="nb-note" aria-hidden="true">{item.note}</span>
              </button>
            </li>
          ))}
        </ul>
        <footer className="booklet-foot" aria-hidden="true">
          <img className="foot-star" src="/assets/decorative/star.png" alt="" />
          <span>☾ open late ☽</span>
          <img className="foot-star fs-2" src="/assets/decorative/star.png" alt="" />
        </footer>

        {/* pastries resting at the booklet's base — inside the nav so
           they inherit the tilt and stay glued to the corners at every
           size; future upgrade path: turn these into buttons w/ popups */}
        <img className="snack snack-cake" src="/assets/decorative/snack-cake.webp" alt="" />
        <img className="snack snack-tart" src="/assets/decorative/snack-tart.webp" alt="" />
        <img className="snack snack-bun" src="/assets/decorative/snack-bun.webp" alt="" />
      </nav>
    </div>
  )
}
