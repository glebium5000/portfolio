/**
 * MusicInvite — replaces the entry overlay (v4 addendum).
 * A handwritten paper note that slides in bottom-left a few seconds after
 * load, offering music. Built as a CSS paper note (torn edges, cream,
 * maroon accents) rather than textbox.png, whose 1920×289 aspect can't
 * make a small note without non-uniform scaling. "Yes please" uses the
 * illustrated nav-button art. Dismissal is session-state only.
 */
export default function MusicInvite({ onAccept, onDismiss }) {
  return (
    <div className="invite" role="dialog" aria-label="Music invitation">
      <button className="invite-close" onClick={onDismiss} aria-label="No music, thanks">×</button>
      <p className="invite-text">♪ want some music with your coffee?</p>
      <button className="invite-yes" onClick={onAccept}>yes please</button>
    </div>
  )
}
