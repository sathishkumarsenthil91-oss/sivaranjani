import React from 'react';
import { BookOpen, Search, Bookmark as BookmarkIcon, List, Moon, Sun, Coffee, Maximize, Minimize } from 'lucide-react';
import { ReadingTheme } from '../types/book';

interface HeaderNavProps {
  currentView: 'home' | 'reader';
  currentPage: number;
  totalPages: number;
  theme: ReadingTheme;
  onNavigateHome: () => void;
  onOpenReader: (page?: number) => void;
  onOpenTOC: () => void;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onCycleTheme: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  bookmarkCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  currentPage,
  totalPages,
  theme,
  onNavigateHome,
  onOpenReader,
  onOpenTOC,
  onOpenBookmarks,
  onOpenSearch,
  onCycleTheme,
  isFullscreen,
  onToggleFullscreen,
  bookmarkCount,
}) => {
  const isNight = theme === 'midnight';

  const themeIcon = () => {
    switch (theme) {
      case 'midnight':
        return <Sun className="w-4 h-4 text-amber-300" />;
      case 'ivory':
        return <Coffee className="w-4 h-4 text-stone-600" />;
      case 'parchment':
      default:
        return <Moon className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <header
      className={`w-full z-40 transition-colors duration-300 border-b ${
        isNight
          ? 'bg-stone-950/90 border-stone-800 text-stone-200'
          : 'bg-[#FBF8F2]/95 border-amber-900/10 text-stone-800'
      } backdrop-blur-md sticky top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
          aria-label="Foliant Home"
        >
          <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-transform group-hover:scale-105 ${
            isNight ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-100 text-amber-900 border border-amber-800/10'
          }`}>
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-serif tracking-widest text-lg font-bold uppercase transition-colors group-hover:text-amber-600">
            Foliant
          </span>
        </button>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium">
          <button
            onClick={onNavigateHome}
            className={`transition-colors py-1 ${
              currentView === 'home'
                ? isNight ? 'text-amber-400 border-b border-amber-400' : 'text-amber-900 border-b border-amber-900 font-semibold'
                : isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Cover
          </button>
          <button
            onClick={onOpenTOC}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Chapters</span>
          </button>
          <button
            onClick={onOpenBookmarks}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookmarkIcon className="w-3.5 h-3.5" />
            <span>Bookmarks</span>
            {bookmarkCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                isNight ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-200 text-amber-900'
              }`}>
                {bookmarkCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenSearch}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search on mobile */}
          <button
            onClick={onOpenSearch}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100 text-stone-700'
            }`}
            title="Search Story"
            aria-label="Search Story"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Table of contents mobile trigger */}
          <button
            onClick={onOpenTOC}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isNight ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-amber-100 text-stone-700'
            }`}
            title="Table of Contents"
            aria-label="Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Theme switcher button */}
          <button
            onClick={onCycleTheme}
            className={`p-2 rounded-lg border transition-colors ${
              isNight
                ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-amber-300'
                : 'border-amber-900/10 bg-white/60 hover:bg-white text-stone-700'
            }`}
            title={`Reading Theme: ${theme}`}
            aria-label="Cycle Reading Theme"
          >
            {themeIcon()}
          </button>

          {/* Fullscreen button */}
          <button
            onClick={onToggleFullscreen}
            className={`hidden sm:flex p-2 rounded-lg border transition-colors ${
              isNight
                ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-stone-300'
                : 'border-amber-900/10 bg-white/60 hover:bg-white text-stone-700'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Main Action: Continue or Read */}
          {currentView === 'home' ? (
            <button
              onClick={() => onOpenReader(currentPage > 1 ? currentPage : 1)}
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-sm whitespace-nowrap bg-amber-700 hover:bg-amber-600 text-white active:scale-95"
            >
              {currentPage > 1 ? `Continue (p. ${currentPage})` : 'Start Reading'}
            </button>
          ) : (
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                isNight
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  : 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-800'
              }`}
            >
              Cover
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
