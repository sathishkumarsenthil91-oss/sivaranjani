import React from 'react';
import { ChapterMeta } from '../types/manga';
import { Play, BookOpen, Clock, Sparkles } from 'lucide-react';
import { SunWheelIcon } from './SunWheelIcon';

interface ChapterLibraryProps {
  chapters: ChapterMeta[];
  currentChapter: number;
  onSelectChapter: (chapterNumber: number) => void;
}

export const ChapterLibrary: React.FC<ChapterLibraryProps> = ({
  chapters,
  currentChapter,
  onSelectChapter,
}) => {
  return (
    <section id="chapters" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-manga-tech tracking-widest text-amber-500 uppercase font-bold">
            <SunWheelIcon size={14} animated />
            <span>Season 1 Complete Saga</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-manga-title tracking-wider text-white mt-1">
            ALL 10 CHAPTERS
          </h2>
        </div>
        <p className="text-xs text-stone-400 font-dialogue max-w-md">
          From the discovery of the Echo Vault to the awakening of the global Sun Wheel Network. Read every chapter now.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {chapters.map((ch) => {
          const isSelected = ch.chapterNumber === currentChapter;

          return (
            <div
              key={ch.chapterNumber}
              onClick={() => onSelectChapter(ch.chapterNumber)}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-amber-400 bg-stone-900 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                  : 'border-stone-800/80 bg-stone-950/60 hover:bg-stone-900 hover:border-amber-500/70 hover:shadow-xl'
              }`}
            >
              {/* Artwork Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={ch.coverImage}
                  alt={ch.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                
                {/* Chapter Number Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-manga-tech font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md">
                    CH. 0{ch.chapterNumber < 10 ? `0${ch.chapterNumber}`.slice(-2) : ch.chapterNumber}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-manga-tech px-2 py-0.5 rounded bg-black/70 text-stone-300 backdrop-blur-xs">
                    {ch.totalPages} PGS
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <h3 className="text-base font-manga-title tracking-wide text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] font-narration italic text-amber-500/90 line-clamp-1">
                    {ch.subtitle}
                  </p>
                  <p className="text-xs font-dialogue text-stone-300 pt-1 line-clamp-2 leading-relaxed">
                    {ch.synopsis}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="pt-2 border-t border-stone-800/80">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectChapter(ch.chapterNumber);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-stone-900 group-hover:bg-amber-500 group-hover:text-black text-amber-400 font-manga-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-stone-700/60 group-hover:border-amber-400"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>READ CHAPTER</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
