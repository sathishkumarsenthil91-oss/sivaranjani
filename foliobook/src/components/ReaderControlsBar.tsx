import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  List, 
  Bookmark, 
  SlidersHorizontal, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  CloudRain,
  Eye,
  EyeOff
} from 'lucide-react';
import { ReaderSettings, ReadingTheme } from '../types/book';

interface ReaderControlsBarProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onNavigateHome: () => void;
  onOpenTOC: () => void;
  onOpenSettings: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
  onScrubPage: (page: number) => void;
}

export const ReaderControlsBar: React.FC<ReaderControlsBarProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onNavigateHome,
  onOpenTOC,
  onOpenSettings,
  isBookmarked,
  onToggleBookmark,
  settings,
  onUpdateSettings,
  isFullscreen,
  onToggleFullscreen,
  isVisible,
  onToggleVisibility,
  onScrubPage,
}) => {
  const isNight = settings.theme === 'midnight';
  const progressPercent = Math.round(((currentPage - 1) / (totalPages - 1)) * 100);

  const cycleTheme = () => {
    const nextTheme: Record<ReadingTheme, ReadingTheme> = {
      parchment: 'ivory',
      ivory: 'midnight',
      midnight: 'parchment',
    };
    onUpdateSettings({ theme: nextTheme[settings.theme] });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      onScrubPage(newPage);
    }
  };

  return (
    <>
      {/* Floating Toggle HUD Peek Button when controls are hidden */}
      {!isVisible && (
        <button
          onClick={onToggleVisibility}
          className={`fixed bottom-4 right-4 z-40 p-2.5 rounded-full shadow-lg border backdrop-blur-md transition-all active:scale-95 ${
            isNight
              ? 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800'
              : 'bg-white/80 border-amber-900/15 text-stone-700 hover:bg-white'
          }`}
          title="Show Reading Controls"
          aria-label="Show Reading Controls"
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
        <div className={`w-full border-t backdrop-blur-md transition-colors duration-300 ${
          isNight
            ? 'bg-stone-950/92 border-stone-800 text-stone-200'
            : 'bg-[#FBF8F2]/95 border-amber-900/10 text-stone-800 shadow-xl'
        }`}>
          <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5">
            
            {/* Top Row: Reading Progress Bar & Scrubber */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-serif tabular-nums text-stone-500 shrink-0">
                p. {currentPage}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-stone-300 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
                  aria-label="Book page scrubber"
                />
              </div>

              <span className="text-[11px] font-serif tabular-nums text-stone-500 shrink-0">
                {progressPercent}%
              </span>
            </div>

            {/* Bottom Row: Minimal Interactive Controls */}
            <div className="flex items-center justify-between">
              
              {/* Left group: Navigation & TOC */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={onNavigateHome}
                  className={`p-2 rounded-lg transition-colors ${
                    isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100/70 text-stone-700'
                  }`}
                  title="Return to Book Cover"
                  aria-label="Return to Book Cover"
                >
                  <Home className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenTOC}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-colors ${
                    isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100/70 text-stone-700'
                  }`}
                  title="Table of Contents"
                  aria-label="Table of Contents"
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Chapters</span>
                </button>

                <button
                  onClick={onToggleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'text-red-500 bg-red-50 dark:bg-red-950/30' 
                      : isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100/70 text-stone-700'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
                  aria-label={isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Center group: Page Step Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onPrevPage}
                  disabled={currentPage <= 1}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    currentPage <= 1
                      ? 'opacity-30 cursor-not-allowed'
                      : isNight
                      ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 active:scale-95'
                      : 'bg-stone-200/70 hover:bg-stone-300/70 text-stone-800 active:scale-95'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <span className="text-xs font-serif tabular-nums text-stone-500 px-1">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={onNextPage}
                  disabled={currentPage >= totalPages}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    currentPage >= totalPages
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-amber-700 hover:bg-amber-600 text-white shadow-xs active:scale-95'
                  }`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right group: Settings, Sounds, Fullscreen, Hide HUD */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Ambient rain audio button */}
                <button
                  onClick={() => onUpdateSettings({ ambientSound: !settings.ambientSound })}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.ambientSound
                      ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                      : isNight ? 'hover:bg-stone-800 text-stone-400' : 'hover:bg-amber-100/70 text-stone-600'
                  }`}
                  title={settings.ambientSound ? 'Ambient study rain: ON' : 'Ambient study rain: OFF'}
                  aria-label="Toggle Ambient Audio"
                >
                  <CloudRain className="w-4 h-4" />
                </button>

                {/* Page flip sound effect toggle */}
                <button
                  onClick={() => onUpdateSettings({ soundEffects: !settings.soundEffects })}
                  className={`hidden sm:flex p-2 rounded-lg transition-colors ${
                    settings.soundEffects
                      ? isNight ? 'text-stone-300' : 'text-stone-700'
                      : 'opacity-40 text-stone-400'
                  }`}
                  title={settings.soundEffects ? 'Page-flip audio: ON' : 'Page-flip audio: OFF'}
                  aria-label="Toggle Page-flip sound effects"
                >
                  {settings.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Reader customization options */}
                <button
                  onClick={onOpenSettings}
                  className={`p-2 rounded-lg transition-colors ${
                    isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100/70 text-stone-700'
                  }`}
                  title="Typography & Reading Settings"
                  aria-label="Typography & Reading Settings"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>

                {/* Hide controls button */}
                <button
                  onClick={onToggleVisibility}
                  className={`p-2 rounded-lg transition-colors ${
                    isNight ? 'hover:bg-stone-800 text-stone-400' : 'hover:bg-amber-100/70 text-stone-500'
                  }`}
                  title="Hide Controls (Distraction-free reading)"
                  aria-label="Hide Controls"
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
