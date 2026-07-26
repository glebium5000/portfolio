/**
 * CafeScene — v6: the window is gone entirely.
 * The illustrated interior fills the viewport with a slight blur so the
 * centred menu booklet reads as the crisp foreground subject. Lamp glows
 * stay (they sit over the painted pendants). RainCanvas.jsx remains in
 * the repo unused, in case the rain returns in a future composition.
 */
export default function CafeScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="interior-bg" />
      <div className="lamp-spot ls-1" />
      <div className="lamp-spot ls-2" />
      <div className="lamp-spot ls-3" />
    </div>
  )
}
