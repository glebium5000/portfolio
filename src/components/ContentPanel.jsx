/**
 * ContentPanel — replaces Panel.jsx.
 * Panels use frame-alt.webp as a border-image over a warm cream fill, so the
 * ornate painted border wraps any panel size without distortion. Project
 * cards use frame.webp the same way. Palette shifted to the game's
 * maroon/cream/gold. Dialog semantics kept: focus moves to close on open,
 * Escape closes (handled in App), click outside closes.
 */
import { useEffect, useRef } from 'react'

const CONTENT = {
  about: {
    title: 'About Me',
    stamp: 'house blend',
    body: (
      <>
        <p className="hand-lead">Hey, I'm Gleb ☾</p>
        <div className="about-prose">
          <p>By day I work in fintech, in compliance and business development.</p>
          <p>
            By night I build things under my own small solo dev studio, Glebium
            Labs Ltd. Right now I am building{' '}
            <a className="inline-link" href="https://slabtcg.app" target="_blank" rel="noopener">Slab TCG</a>,
            a collection app for trading card collectors, and{' '}
            <a className="inline-link" href="https://chainwarden.glebium.me" target="_blank" rel="noopener">Chainwarden</a>,
            an AML risk screening tool for crypto wallets that's open and free
            to use.
          </p>
          <p>
            Outside of that: keeping plants alive, lifting weights and playing TCGs.
            <br />
            Based in London.
          </p>
        </div>
        <ul className="about-tags">
          <li>React</li><li>Three.js</li><li>Blender</li><li>TypeScript</li><li>Python</li>
        </ul>
        <p className="margin-note">— currently accepting freelance orders</p>
      </>
    ),
  },
  projects: {
    title: 'Projects',
    stamp: 'baked fresh',
    body: (
      <div className="project-grid">
        <article className="project-card">
          <div className="pc-header">
            <h3>Slab TCG</h3>
            <span className="pc-badge">coming soon</span>
          </div>
          <p>
            A collection app for trading card collectors, covering Pokémon, Magic:
            The Gathering, Yu-Gi-Oh!, Riftbound, One Piece and Lorcana. Finish sets,
            log your pulls and trade with friends. Beta coming soon on iPhone and
            Android.
          </p>
          <div className="pc-tags">
            <span>iOS</span><span>Android</span><span>Claude API</span>
          </div>
          <a className="pc-link" href="https://slabtcg.app" target="_blank" rel="noopener">visit the site ↗</a>
        </article>

        <article className="project-card">
          <div className="pc-header">
            <h3>Chainwarden</h3>
            <span className="pc-badge">open &amp; free</span>
          </div>
          <p>
            An AML risk screening tool for crypto wallets. Trace transaction flows,
            score wallet risk with fully explainable math, and dig into exchange
            intelligence. It's open and free to use.
          </p>
          <div className="pc-tags">
            <span>Python</span><span>FastAPI</span><span>Ethereum</span><span>Claude API</span>
          </div>
          <a className="pc-link" href="https://chainwarden.glebium.me" target="_blank" rel="noopener">view project ↗</a>
        </article>
      </div>
    ),
  },
  contact: {
    title: 'Contact Me',
    stamp: 'Open 24/7!',
    body: (
      <div className="contact-list">
        <a className="contact-line" href="mailto:gleb@glebium.me">
          <span className="cl-icon">✉</span><span className="cl-label">Email</span>
          <span className="cl-value">gleb@glebium.me</span>
        </a>
        <a className="contact-line" href="https://github.com/glebium5000" target="_blank" rel="noreferrer">
          <span className="cl-icon">☾</span><span className="cl-label">GitHub</span>
          <span className="cl-value">github.com/glebium5000</span>
        </a>
        <a className="contact-line" href="https://www.linkedin.com/in/gleb-r-98875b212/" target="_blank" rel="noreferrer">
          <span className="cl-icon">✶</span><span className="cl-label">LinkedIn</span>
          <span className="cl-value">linkedin.com/in/gleb-r</span>
        </a>
        <p className="contact-foot">replies guaranteed · tips not accepted</p>
      </div>
    ),
  },
  blog: {
    title: 'Blog',
    stamp: "today's specials",
    body: (
      <div className="blog-empty">
        <p className="blog-closed-sign">☾ the kitchen's closed ☽</p>
        <p className="blog-closed-note">new recipes are still in the oven — check back soon</p>
      </div>
    ),
  },
}

export default function ContentPanel({ section, onClose }) {
  const closeRef = useRef(null)
  const { title, stamp, body } = CONTENT[section]

  useEffect(() => {
    closeRef.current?.focus()
  }, [section])

  return (
    <div className="panel-scrim" onClick={onClose}>
      <section
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="panel-head">
          <h2>{title}</h2>
          <span className="panel-stamp" aria-hidden="true">{stamp}</span>
          <button
            ref={closeRef}
            className="panel-close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ×
          </button>
        </header>
        <div className="panel-body">{body}</div>
      </section>
    </div>
  )
}
