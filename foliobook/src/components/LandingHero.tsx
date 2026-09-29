import React from 'react';
import { Play, RotateCcw, BookOpen, Users, Compass, Sparkles, Clock } from 'lucide-react';
import { MANGA_STORY } from '../data/mangaData';
import { SunWheelIcon } from './SunWheelIcon';

interface LandingHeroProps {
  lastReadPage: number;
  totalPages: number;
  onReadNow: () => void;
  onContinueReading: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  lastReadPage,
  totalPages,
  onReadNow,
  onContinueReading,
  onScrollToSection,
}) => {
  const hasStarted = lastReadPage > 1;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden bg-[#09090c]">
      {/* Background Graphic Layers */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-25 filter blur-xs"
        style={{
          backgroundImage: `url(${MANGA_STORY.coverImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-[#09090c]/80 to-[#09090c]/40 z-0" />
      <div className="absolute inset-0 manga-halftone opacity-20 pointer-events-none z-0" />

      {/* Massive subtle rotating Sun Wheel in backdrop */}
      <div 
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-15 pointer-events-none z-0"
      >
        <SunWheelIcon size={800} animated className="text-amber-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Cover Art Presentation */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative group max-w-[340px] sm:max-w-[380px] w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)] border-2 border-amber-600/40 bg-black">
              {/* Cover Image */}
              <img
                src={MANGA_STORY.coverImage}
                alt="SUN WHEELS Manga Cover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cover Film & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 manga-halftone opacity-30 pointer-events-none" />

              {/* Manga Cover Typography */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/90 text-black font-manga-tech text-[10px] font-black tracking-wider uppercase">
                    <SunWheelIcon size={12} />
                    <span>VOL. 1 · SHONEN SCI-FI</span>
                  </div>
                  <span className="text-[10px] font-manga-tech tracking-widest text-amber-400">
                    ORIGINAL MANGA
                  </span>
                </div>

                <div className="space-y-1 text-center py-4">
                  <h2 className="text-4xl sm:text-5xl font-manga-title tracking-wider text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    SUN WHEELS
                  </h2>
                  <p className="text-xs uppercase tracking-[0.25em] font-manga-tech text-amber-400 font-bold">
                    THE ECHO VAULT
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-manga-tech text-stone-300 pt-2 border-t border-amber-500/30">
                  <span>CHAPTER 1 AVAILABLE</span>
                  <span className="text-amber-400 font-bold">{totalPages} PAGES</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Title, Lore Kickers, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 order-1 lg:order-2">
            
            {/* Genre & Category Pills (Clean unboxed style) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-manga-tech text-amber-500/90 tracking-wider">
              <span className="flex items-center gap-1.5">
                <SunWheelIcon size={14} animated />
                <span className="font-bold">SCI-FI</span>
              </span>
              <span>·</span>
              <span>MYSTERY</span>
              <span>·</span>
              <span>TIME LOOP</span>
              <span>·</span>
              <span>ANCIENT CIVILIZATION</span>
              <span>·</span>
              <span className="text-stone-400">11 PAGES</span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-manga-title tracking-tight text-white leading-none">
                SUN WHEELS
              </h1>
              <p className="text-lg sm:text-xl font-narration italic text-amber-400 drop-shadow-sm">
                “{MANGA_STORY.subtitle}”
              </p>
            </div>

            {/* Hairline Divider */}
            <div className="w-full h-px bg-gradient-to-r from-amber-600/50 via-stone-800 to-transparent" />

            {/* Synopsis */}
            <p className="text-sm sm:text-base font-dialogue leading-relaxed text-stone-300 max-w-2xl">
              {MANGA_STORY.synopsis}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {hasStarted ? (
                <>
                  <button
                    onClick={onContinueReading}
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-manga-tech font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2.5 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Continue Ch. 1 (Page {lastReadPage})</span>
                  </button>

                  <button
                    onClick={onReadNow}
                    className="px-5 py-3.5 rounded-xl border border-stone-700 hover:border-amber-500 bg-stone-900/60 hover:bg-stone-900 text-stone-300 hover:text-white font-manga-tech text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Read from Page 1</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={onReadNow}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-manga-tech font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] flex items-center gap-3 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-black" />
                  <span>READ CHAPTER 1 NOW</span>
                  <Sparkles className="w-4 h-4 text-black" />
                </button>
              )}

              {/* Navigation Jump Buttons */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <button
                  onClick={() => onScrollToSection('chapters')}
                  className="px-4 py-3 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/40 text-stone-400 hover:text-stone-200 font-manga-tech text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chapters</span>
                </button>

                <button
                  onClick={() => onScrollToSection('characters')}
                  className="px-4 py-3 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/40 text-stone-400 hover:text-stone-200 font-manga-tech text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>Characters</span>
                </button>

                <button
                  onClick={() => onScrollToSection('lore')}
                  className="px-4 py-3 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/40 text-stone-400 hover:text-stone-200 font-manga-tech text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>World Lore</span>
                </button>
              </div>
            </div>

            {/* Quick Teaser Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-stone-800/80">
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
                <p className="text-[10px] font-manga-tech uppercase text-amber-500 font-bold">The Echo Vault</p>
                <p className="text-xs text-stone-400 font-dialogue mt-1">Reconstructs memories locked deep in stone</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
                <p className="text-[10px] font-manga-tech uppercase text-amber-500 font-bold">Aathirai</p>
                <p className="text-xs text-stone-400 font-dialogue mt-1">Ancient tech empire trapped in an endless sunset</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
                <p className="text-[10px] font-manga-tech uppercase text-amber-500 font-bold">The Loop Anomaly</p>
                <p className="text-xs text-stone-400 font-dialogue mt-1">Everyone forgets each reset. Only Ilan remembers.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
