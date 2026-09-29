import React, { useRef } from 'react';
import { ComicPanelData } from '../types/manga';
import { ZoomIn } from 'lucide-react';

interface ComicPanelProps {
  panel: ComicPanelData;
  onZoom?: (imageSrc: string, caption?: string) => void;
  isBlackAndWhiteMode?: boolean;
}

export const ComicPanel: React.FC<ComicPanelProps> = ({
  panel,
  onZoom,
  isBlackAndWhiteMode = false,
}) => {
  const lastTapRef = useRef<number>(0);

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Double tap detected
      if (panel.image && onZoom) {
        onZoom(panel.image, panel.narrations?.[0]?.text || panel.dialogues?.[0]?.text);
      }
    }
    lastTapRef.current = now;
  };

  const getSfxSize = (size?: string) => {
    switch (size) {
      case 'sm':
        return 'text-lg sm:text-xl';
      case 'md':
        return 'text-2xl sm:text-3xl';
      case 'lg':
        return 'text-3xl sm:text-5xl';
      case 'xl':
        return 'text-5xl sm:text-7xl';
      case 'giant':
        return 'text-6xl sm:text-8xl';
      default:
        return 'text-2xl sm:text-3xl';
    }
  };

  return (
    <div
      onTouchEnd={handleTouchEnd}
      className={`comic-panel relative w-full ${panel.heightClass || 'min-h-[260px]'} group ${
        isBlackAndWhiteMode && !panel.isColorSplash ? 'filter grayscale contrast-125' : ''
      }`}
    >
      {/* Background artwork image */}
      {panel.image ? (
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
          <img
            src={panel.image}
            alt={panel.narrations?.[0]?.text || 'Manga panel'}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.08] transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Subtle panel vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        </div>
      ) : (
        /* Dynamic procedural comic background if not an image */
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            panel.bgGradient || 'from-stone-900 via-stone-950 to-black'
          }`}
        >
          {/* Manga Halftone Screentone */}
          <div className="absolute inset-0 manga-halftone opacity-40 pointer-events-none" />
          
          {/* Optional Action Speed Lines */}
          {panel.speedLines && (
            <div className="absolute inset-0 manga-radial-lines opacity-60 pointer-events-none" />
          )}
        </div>
      )}

      {/* Halftone texture overlay on top of images for classic manga print feel */}
      <div className="absolute inset-0 manga-halftone opacity-20 pointer-events-none" />

      {/* Speed lines overlay if panel is high action */}
      {panel.speedLines && (
        <div className="absolute inset-0 manga-speed-lines opacity-40 pointer-events-none" />
      )}

      {/* Zoom Button on Desktop Hover */}
      {panel.image && onZoom && (
        <button
          onClick={() => onZoom(panel.image!, panel.narrations?.[0]?.text || panel.dialogues?.[0]?.text)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-amber-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-xs"
          title="Zoom Panel"
          aria-label="Zoom Panel"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      )}

      {/* Narration Boxes */}
      {panel.narrations?.map((narration, idx) => (
        <div
          key={`nar_${idx}`}
          style={{
            top: narration.position.top,
            bottom: narration.position.bottom,
            left: narration.position.left,
            right: narration.position.right,
            transform: narration.position.left === '50%' ? 'translateX(-50%)' : undefined,
          }}
          className="absolute z-20 max-w-[85%] sm:max-w-md px-3.5 py-2 narration-box rounded-xs shadow-lg animate-in fade-in"
        >
          <p className="text-[11px] sm:text-xs font-manga-tech uppercase tracking-widest text-amber-400 font-bold leading-relaxed text-center sm:text-left">
            {narration.text}
          </p>
        </div>
      ))}

      {/* Sound Effect Text (SFX) */}
      {panel.sfx?.map((sfx, idx) => (
        <div
          key={`sfx_${idx}`}
          style={{
            top: sfx.position.top,
            bottom: sfx.position.bottom,
            left: sfx.position.left,
            right: sfx.position.right,
            transform: `rotate(${sfx.rotation || '0deg'})`,
          }}
          className="absolute z-20 pointer-events-none select-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]"
        >
          <span
            style={{ color: sfx.color || '#fbbf24' }}
            className={`sfx-text ${getSfxSize(sfx.size)} uppercase font-black tracking-tight`}
          >
            {sfx.text}
          </span>
        </div>
      ))}

      {/* Speech / Thought / Shout Bubbles */}
      {panel.dialogues?.map((diag) => {
        const isShout = diag.type === 'shout';
        const isThought = diag.type === 'thought';
        const isWhisper = diag.type === 'whisper';

        const tailClass =
          diag.tailPosition === 'bottom-left'
            ? 'speech-bubble-bottom-left'
            : diag.tailPosition === 'bottom-right'
            ? 'speech-bubble-bottom-right'
            : '';

        return (
          <div
            key={diag.id}
            style={{
              top: diag.position.top,
              bottom: diag.position.bottom,
              left: diag.position.left,
              right: diag.position.right,
            }}
            className={`absolute z-20 animate-in fade-in duration-300 max-w-[260px] sm:max-w-[300px] ${
              isShout ? 'shout-bubble' : isThought ? 'speech-bubble rounded-3xl border-dashed' : `speech-bubble ${tailClass}`
            } ${isWhisper ? 'border-dashed opacity-90' : ''}`}
          >
            {diag.speaker && (
              <span className="block text-[9px] uppercase tracking-wider font-manga-tech text-stone-500 font-bold -mt-0.5 mb-0.5">
                {diag.speaker}
              </span>
            )}
            <p className={`font-dialogue ${isShout ? 'text-xs sm:text-sm font-black tracking-tight' : 'text-xs sm:text-[13px] font-bold leading-snug'}`}>
              {diag.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};
