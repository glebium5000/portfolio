/**
 * MusicToggle — updated for the illustrated aesthetic.
 * Round maroon button with the game's musicnote icon (note when playing,
 * musicnote2 dimmed when muted). Volume slider below: maroon recessed
 * track, warm cream/gold thumb. Slider is 22px tall for touch, with
 * touch-action:none so mobile drags stay on the slider.
 */
export default function MusicToggle({ playing, onToggle, volume, onVolume }) {
  return (
    <div className="radio-dock">
      <button
        className={`music-btn ${playing ? 'is-playing' : 'is-muted'}`}
        onClick={onToggle}
        aria-label={playing ? 'Pause the music' : 'Play the music'}
        aria-pressed={playing}
        title={playing ? 'Pause the music' : 'Play the music'}
      >
        <img
          className="music-icon"
          src={playing ? '/assets/ui/musicnote.png' : '/assets/ui/musicnote2.png'}
          alt=""
        />
      </button>

      {playing && (
        <div className="volume-row">
          <input
            className="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolume(parseFloat(e.target.value))}
            aria-label="Music volume"
          />
        </div>
      )}
    </div>
  )
}
