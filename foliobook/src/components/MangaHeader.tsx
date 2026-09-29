import React from 'react';
import { Play, ArrowLeft, Maximize, Minimize, LayoutList, Columns, ChevronDown } from 'lucide-react';
import { ReadingMode } from '../types/manga';
import { SunWheelIcon } from './SunWheelIcon';
import { CHAPTER_LIST } from '../data/mangaData';

interface MangaHeaderProps {
  currentView: 'home' | 'reader';
  currentChapter: number;
  readingMode: ReadingMode;
  onNavigateHome: () => void;
  onOpenReader: (chapterNumber?: number, page?: number) => void;
  onSelectChapter: (chapterNumber: number) => void;
  onToggleReadingMode: () => void;
  onScrollToSection: (sectionId: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  lastReadPage: number;
}

export const MangaHeader: React.FC<MangaHeaderProps> = ({
  currentView,
  currentChapter,
  readingMode,
  onNavigateHome,
  onOpenReader,
  onSelectChapter,
  onToggleReadingMode,
  onScrollToSection,
  isFullscreen,
  onToggleFullscreen,
  lastReadPage,
}) => {
  return (
    <header className="w-full z-40 bg-[#09090c]/95 border-b border-stone-800 text-stone-200 backdrop-blur-md sticky top-0 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
        
        {/* Zone 1: Logo OR Easy "Back to Home" button when reading */}
        <div className="flex items-center gap-2">
          {currentView === 'reader' ? (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-manga-tech text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(245,158,11,0.4)] active:scale-95 cursor-pointer"
              title="Return to Home Page"
              aria-label="Return to Home Page"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>HOME</span>
            </button>
          ) : (
            <button
              onClick={onNavigateHome}
              className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
              aria-label="SUN WHEELS Home"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:text-amber-400 group-hover:scale-105 transition-all">
                <SunWheelIcon size={18} animated />
              </div>
              <span className="font-manga-title tracking-wider text-xl font-bold uppercase text-white group-hover:text-amber-400 transition-colors">
                SUN WHEELS
              </span>
            </button>
          )}

          {/* If reading, show Chapter Selector Dropdown */}
          {currentView === 'reader' && (
            <div className="relative flex items-center">
              <select
                value={currentChapter}
                onChange={(e) => onSelectChapter(parseInt(e.target.value, 10))}
                className="bg-stone-900 border border-stone-700 hover:border-amber-500 text-stone-200 text-xs font-manga-tech font-bold py-1.5 px-2.5 rounded-lg appearance-none pr-7 cursor-pointer focus:outline-none transition-colors"
                aria-label="Select Chapter"
              >
                {CHAPTER_LIST.map((ch) => (
                  <option key={ch.chapterNumber} value={ch.chapterNumber}>
                    CH. {ch.chapterNumber}: {ch.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-amber-500 absolute right-2 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (When on Home) */}
        {currentView === 'home' && (
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-manga-tech font-bold text-stone-400">
            <button
              onClick={onNavigateHome}
              className="transition-colors py-1 text-amber-400 border-b-2 border-amber-400"
            >
              Cover
            </button>
            <button
              onClick={() => onScrollToSection('chapters')}
              className="transition-colors py-1 hover:text-white"
            >
              All 10 Chapters
            </button>
            <button
              onClick={() => onScrollToSection('characters')}
              className="transition-colors py-1 hover:text-white"
            >
              Characters
            </button>
            <button
              onClick={() => onScrollToSection('lore')}
              className="transition-colors py-1 hover:text-white"
            >
              Codex Lore
            </button>
          </nav>
        )}

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Reading Mode Switcher in Reader */}
          {currentView === 'reader' && (
            <button
              onClick={onToggleReadingMode}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-manga-tech flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
              title={`Switch to ${readingMode === 'page' ? 'Webtoon (Vertical)' : 'Manga Page (Horizontal)'} Mode`}
            >
              {readingMode === 'page' ? (
                <>
                  <LayoutList className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">Webtoon</span>
                </>
              ) : (
                <>
                  <Columns className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">Page Mode</span>
                </>
              )}
            </button>
          )}

          {/* Fullscreen button */}
          <button
            onClick={onToggleFullscreen}
            className="hidden sm:flex p-2 rounded-lg border border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-stone-300 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Main Action Button */}
          {currentView === 'home' ? (
            <button
              onClick={() => onOpenReader(currentChapter || 1, lastReadPage || 1)}
              className="px-3.5 sm:px-4 py-2 text-xs font-manga-tech font-bold tracking-wider uppercase rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-black active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{lastReadPage > 1 ? `Resume (Ch ${currentChapter} · p. ${lastReadPage})` : 'Read Ch. 1'}</span>
            </button>
          ) : (
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs font-manga-tech uppercase tracking-wider rounded-lg border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 transition-colors cursor-pointer"
            >
              Exit
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
