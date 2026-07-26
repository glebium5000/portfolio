/**
 * App — v4 addendum changes:
 * - EntryOverlay removed: the scene loads immediately (a short "lights up"
 *   transition still plays on mount via the is-open class).
 * - v9: background parallax removed — the scene is static; only the
 *   booklet (tilt) and its contents respond to the pointer.
 * - Music is OFF by default. A MusicInvite note appears after 2.5s;
 *   accepting starts the BGM with a fade to the chosen volume.
 * - Default/fade-target volume is 0.09 everywhere (v8).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import CafeScene from './components/CafeScene.jsx'
import MenuBooklet from './components/MenuBooklet.jsx'
import ContentPanel from './components/ContentPanel.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import MusicInvite from './components/MusicInvite.jsx'

export default function App() {
  const [open, setOpen] = useState(false)          // drives the load-in transition
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.09)
  const [activePanel, setActivePanel] = useState(null)
  const [invite, setInvite] = useState('pending')  // 'pending' | 'shown' | 'gone'
  const audioRef = useRef(null)
  const volumeRef = useRef(0.09)
  const fadeRef = useRef(null)

  // Lights come up on mount; the invite note appears shortly after
  useEffect(() => {
    const t1 = requestAnimationFrame(() => setOpen(true))
    const t2 = setTimeout(() => {
      setInvite((v) => (v === 'pending' ? 'shown' : v))
    }, 2500)
    return () => { cancelAnimationFrame(t1); clearTimeout(t2) }
  }, [])

  const startAudio = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0
    a.play()
      .then(() => {
        setPlaying(true)
        let v = 0
        fadeRef.current = setInterval(() => {
          const target = volumeRef.current
          v = Math.min(target, v + Math.max(0.008, target / 16))
          a.volume = v
          if (v >= target) {
            clearInterval(fadeRef.current)
            fadeRef.current = null
          }
        }, 90)
      })
      .catch(() => setPlaying(false))
  }, [])

  const acceptMusic = useCallback(() => {
    setInvite('gone')
    startAudio()
  }, [startAudio])

  const dismissInvite = useCallback(() => setInvite('gone'), [])

  const toggleMusic = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null }
      a.pause()
      setPlaying(false)
    } else {
      setInvite('gone') // using the toggle answers the invite either way
      a.volume = volumeRef.current
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [playing])

  const changeVolume = useCallback((v) => {
    volumeRef.current = v
    setVolume(v)
    if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null }
    const a = audioRef.current
    if (a) a.volume = v
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActivePanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`cafe ${open ? 'is-open' : ''}`}>
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      <CafeScene />
      <MenuBooklet onOrder={setActivePanel} activePanel={activePanel} />

      <div className="vignette" aria-hidden="true" />

      <p className="art-credit">
        art: &ldquo;Cafe in the Clouds&rdquo; &middot; mythridate, bithox &amp; shuttlefrog
      </p>

      {activePanel && (
        <ContentPanel section={activePanel} onClose={() => setActivePanel(null)} />
      )}

      <MusicToggle
        playing={playing}
        onToggle={toggleMusic}
        volume={volume}
        onVolume={changeVolume}
      />

      {invite === 'shown' && (
        <MusicInvite onAccept={acceptMusic} onDismiss={dismissInvite} />
      )}
    </div>
  )
}
