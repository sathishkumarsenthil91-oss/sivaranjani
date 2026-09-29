import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Maximize, 
  Minimize, 
  Bookmark, 
  Eye, 
  EyeOff, 
  LayoutList, 
  Columns, 
  Volume2, 
  VolumeX,
  Palette,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { ReadingMode, ReaderBackground } from '../types/manga';
import { SunWheelIcon } from './SunWheelIcon';

interface MangaReaderControlsProps {
  currentChapter: number;
  totalChapters: number;
  currentPage: number;
  totalPages: number;
  readingMode: ReadingMode;
  onToggleReadingMode: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onScrubPage: (page: number) => void;
  onReturnHome: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  background: ReaderBackground;
  onChangeBackground: (bg: ReaderBackground) => void;
}

export const MangaReaderControls: React.FC<MangaReaderControlsProps> = ({
  currentChapter,
  totalChapters,
  currentPage,
  totalPages,
  readingMode,
  onToggleReadingMode,
  onPrevPage,
  onNextPage,
  onPrevChapter,
  onNextChapter,
  onScrubPage,
  onReturnHome,
  isBookmarked,
  onToggleBookmark,
  isFullscreen,
  onToggleFullscreen,
  isVisible,
  onToggleVisibility,
  soundEnabled,
  onToggleSound,
  background,
  onChangeBackground,
}) => {
  const nextBg: Record<ReaderBackground, ReaderBackground> = {
    dark: 'oled',
    oled: 'sepia',
    sepia: 'light',
    light: 'dark',
  };

  return (
    <>
      {/* Floating Peek Button when HUD is hidden */}
      {!isVisible && (
        <button
          onClick={onToggleVisibility}
          className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-stone-900/90 hover:bg-amber-500 text-stone-300 hover:text-black border border-stone-700 shadow-xl backdrop-blur-md transition-all active:scale-95"
          title="Show Manga Controls"
          aria-label="Show Manga Controls"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}

      {/* Main HUD Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-auto ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full bg-[#0d0d12]/95 border-t border-stone-800 backdrop-blur-md shadow-2xl text-stone-200">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5">
            
            {/* Top Row: Page Scrubber (Visible in Page Mode) */}
            {readingMode === 'page' && (
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] font-manga-tech tabular-nums text-amber-500 font-bold shrink-0">
                  CH. {currentChapter} · PAGE {currentPage < 10 ? `0${currentPage}` : currentPage}
                </span>

                <div className="relative flex-1 flex items-center">
                  <input
                    type="range"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => onScrubPage(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                    aria-label="Manga page scrubber"
                  />
                </div>

                <span className="text-[11px] font-manga-tech tabular-nums text-stone-400 shrink-0">
                  {totalPages} PAGES
                </span>
              </div>
            )}

            {/* Bottom Row: Minimal Interactive Controls */}
            <div className="flex items-center justify-between gap-2">
              
              {/* Left Group: Return to Home & Chapter Skip */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={onReturnHome}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-manga-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                  title="Return to Home Page"
                  aria-label="Return to Home Page"
                >
                  <Home className="w-3.5 h-3.5 fill-black" />
                  <span className="hidden sm:inline">Home</span>
                </button>

                {/* Chapter Previous / Next */}
                <div className="flex items-center bg-stone-900 rounded-lg border border-stone-800 p-0.5">
                  <button
                    onClick={onPrevChapter}
                    disabled={currentChapter <= 1}
                    className={`p-1.5 rounded hover:bg-stone-800 transition-colors ${
                      currentChapter <= 1 ? 'opacity-30 cursor-not-allowed' : 'text-stone-300 hover:text-amber-400'
                    }`}
                    title="Previous Chapter"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-[10px] font-manga-tech text-stone-400 font-bold whitespace-nowrap">
                    CH {currentChapter}
                  </span>
                  <button
                    onClick={onNextChapter}
                    disabled={currentChapter >= totalChapters}
                    className={`p-1.5 rounded hover:bg-stone-800 transition-colors ${
                      currentChapter >= totalChapters ? 'opacity-30 cursor-not-allowed' : 'text-stone-300 hover:text-amber-400'
                    }`}
                    title="Next Chapter"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mode toggle */}
                <button
                  onClick={onToggleReadingMode}
                  className="px-2 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-manga-tech flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
                  title={`Switch to ${readingMode === 'page' ? 'Webtoon (Vertical)' : 'Manga Page (Horizontal)'} Mode`}
                >
                  {readingMode === 'page' ? (
                    <>
                      <LayoutList className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden md:inline">Webtoon</span>
                    </>
                  ) : (
                    <>
                      <Columns className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden md:inline">Page Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onToggleBookmark}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'text-amber-500 bg-amber-500/10' 
                      : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Center Group: Prev / Next Buttons in Page Mode */}
              {readingMode === 'page' ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onPrevPage}
                    disabled={currentPage <= 1}
                    className={`px-3 py-1.5 rounded-lg text-xs font-manga-tech flex items-center gap-1 transition-all ${
                      currentPage <= 1
                        ? 'opacity-30 cursor-not-allowed bg-stone-900 text-stone-600'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <span className="text-xs font-manga-tech font-bold tabular-nums text-amber-400 px-1">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={onNextPage}
                    disabled={currentPage >= totalPages}
                    className={`px-3 py-1.5 rounded-lg text-xs font-manga-tech font-bold flex items-center gap-1 transition-all ${
                      currentPage >= totalPages
                        ? 'opacity-30 cursor-not-allowed bg-stone-900 text-stone-600'
                        : 'bg-amber-600 hover:bg-amber-500 text-black shadow-md active:scale-95'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-xs font-manga-tech text-stone-400 flex items-center gap-1.5">
                  <SunWheelIcon size={14} animated />
                  <span>CH. {currentChapter} · SCROLL</span>
                </div>
              )}

              {/* Right Group: Sound, Theme, Fullscreen, Hide */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChangeBackground(nextBg[background])}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                  title={`Background: ${background.toUpperCase()}`}
                >
                  <Palette className="w-4 h-4" />
                </button>

                <button
                  onClick={onToggleSound}
                  className={`p-1.5 rounded-lg transition-colors ${
                    soundEnabled ? 'text-amber-400 hover:bg-stone-800' : 'text-stone-500 hover:bg-stone-800'
                  }`}
                  title={soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={onToggleFullscreen}
                  className="hidden sm:flex p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>

                <button
                  onClick={onToggleVisibility}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                  title="Hide Controls"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
