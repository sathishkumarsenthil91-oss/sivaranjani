import React, { useEffect, useState } from 'react';
import { SunWheelIcon } from './SunWheelIcon';

interface MangaLoadingScreenProps {
  onComplete: () => void;
  chapterTitle?: string;
}

export const MangaLoadingScreen: React.FC<MangaLoadingScreenProps> = ({
  onComplete,
  chapterTitle = 'CHAPTER 1: THE ECHO VAULT',
}) => {
  const [stage, setStage] = useState<'initiating' | 'opening' | 'ready'>('initiating');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage('opening');
    }, 700);

    const t2 = setTimeout(() => {
      setStage('ready');
    }, 1500);

    const t3 = setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#08080a] flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true"
        className="absolute w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Rotating Sun Wheel Symbol */}
        <div className="relative flex items-center justify-center">
          <SunWheelIcon
            size={110}
            glow
            animated
            className="text-amber-500 transition-all duration-700 hover:text-amber-400"
          />
          {/* Secondary counter-rotating faint aura */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <SunWheelIcon
              size={140}
              className="text-amber-300 animate-spin-reverse-slow"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-manga-title tracking-widest text-white drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
            SUN WHEELS
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500/80 font-manga-tech">
            {chapterTitle}
          </p>
        </div>

        {/* Status indicator */}
        <div className="pt-4 flex flex-col items-center space-y-2">
          <p className="text-sm font-narration italic text-stone-300 tracking-wide transition-all duration-300">
            {stage === 'initiating'
              ? 'Accessing Ancient Coordinates...'
              : stage === 'opening'
              ? 'The Echo Vault is opening...'
              : 'Entering Aathirai Meridian...'}
          </p>
          <div className="w-36 h-1 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700"
              style={{
                width: stage === 'initiating' ? '35%' : stage === 'opening' ? '80%' : '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
