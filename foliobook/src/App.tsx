import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MANGA_STORY, CHAPTER_LIST, ALL_CHAPTERS_PAGES, CHARACTERS } from './data/mangaData';
import { MangaHeader } from './components/MangaHeader';
import { LandingHero } from './components/LandingHero';
import { ChapterLibrary } from './components/ChapterLibrary';
import { CharacterSection } from './components/CharacterSection';
import { LoreSection } from './components/LoreSection';
import { MangaPage } from './components/MangaPage';
import { WebtoonScrollReader } from './components/WebtoonScrollReader';
import { MangaReaderControls } from './components/MangaReaderControls';
import { MangaLoadingScreen } from './components/MangaLoadingScreen';
import { ZoomModal } from './components/ZoomModal';
import { ReadingMode, ReaderBackground } from './types/manga';
import { bookAudio } from './utils/audio';
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from 'lucide-react';

const STORAGE_KEYS = {
  CHAPTER: 'sunwheels_chapter_v2',
  PAGE: 'sunwheels_page_v2',
  MODE: 'sunwheels_mode_v2',
  BG: 'sunwheels_bg_v2',
  BOOKMARKS: 'sunwheels_bookmarks_v2',
  SOUND: 'sunwheels_sound_v2',
};

export default function App() {
  const totalChapters = CHAPTER_LIST.length;

  // View state: 'home' | 'reader'
  const [currentView, setCurrentView] = useState<'home' | 'reader'>('home');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [readingMode, setReadingMode] = useState<ReadingMode>('page');
  const [background, setBackground] = useState<ReaderBackground>('dark');
  const [bookmarks, setBookmarks] = useState<string[]>([]); // Format "ch_page"
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Reader HUD visibility & animations
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(true);
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(false);
  const [loadingChapterTitle, setLoadingChapterTitle] = useState<string>('CHAPTER 1: THE ECHO VAULT');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Zoom modal state
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomedCaption, setZoomedCaption] = useState<string | undefined>(undefined);

  // Touch gesture tracking for horizontal swipe in page mode
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  // Wheel debounce
  const lastWheelTime = useRef<number>(0);

  // Current chapter pages
  const chapterPages = ALL_CHAPTERS_PAGES[currentChapter] || ALL_CHAPTERS_PAGES[1];
  const totalPagesInChapter = chapterPages.length;

  // 1. Load initial persistent state
  useEffect(() => {
    try {
      const savedCh = localStorage.getItem(STORAGE_KEYS.CHAPTER);
      if (savedCh) {
        const parsedCh = parseInt(savedCh, 10);
        if (!isNaN(parsedCh) && parsedCh >= 1 && parsedCh <= totalChapters) {
          setCurrentChapter(parsedCh);
        }
      }

      const savedPage = localStorage.getItem(STORAGE_KEYS.PAGE);
      if (savedPage) {
        const parsedPage = parseInt(savedPage, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1) {
          setCurrentPage(parsedPage);
        }
      }

      const savedMode = localStorage.getItem(STORAGE_KEYS.MODE) as ReadingMode;
      if (savedMode === 'page' || savedMode === 'webtoon') {
        setReadingMode(savedMode);
      }

      const savedBg = localStorage.getItem(STORAGE_KEYS.BG) as ReaderBackground;
      if (savedBg) setBackground(savedBg);

      const savedBm = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (savedBm) setBookmarks(JSON.parse(savedBm));

      const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
      if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    } catch {}
  }, [totalChapters]);

  // 2. Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAPTER, currentChapter.toString());
      localStorage.setItem(STORAGE_KEYS.PAGE, currentPage.toString());
    } catch {}
  }, [currentChapter, currentPage]);

  // 3. Save settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MODE, readingMode);
      localStorage.setItem(STORAGE_KEYS.BG, background);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      localStorage.setItem(STORAGE_KEYS.SOUND, soundEnabled.toString());
    } catch {}
  }, [readingMode, background, bookmarks, soundEnabled]);

  // Fullscreen tracking
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  };

  // Next Chapter navigation
  const handleNextChapter = useCallback(() => {
    if (currentChapter < totalChapters) {
      const nextCh = currentChapter + 1;
      const chMeta = CHAPTER_LIST.find((c) => c.chapterNumber === nextCh);
      setLoadingChapterTitle(`CHAPTER ${nextCh}: ${chMeta?.title || ''}`);
      setIsLoadingScreen(true);
      setCurrentChapter(nextCh);
      setCurrentPage(1);
      if (soundEnabled) bookAudio.playSunWheelPulse();
    }
  }, [currentChapter, totalChapters, soundEnabled]);

  // Previous Chapter navigation
  const handlePrevChapter = useCallback(() => {
    if (currentChapter > 1) {
      const prevCh = currentChapter - 1;
      const chMeta = CHAPTER_LIST.find((c) => c.chapterNumber === prevCh);
      setLoadingChapterTitle(`CHAPTER ${prevCh}: ${chMeta?.title || ''}`);
      setIsLoadingScreen(true);
      setCurrentChapter(prevCh);
      setCurrentPage(1);
      if (soundEnabled) bookAudio.playSunWheelPulse();
    }
  }, [currentChapter, soundEnabled]);

  // Page turns with audio
  const handleNextPage = useCallback(() => {
    if (currentPage >= totalPagesInChapter) {
      // If at end of chapter, prompt next chapter
      if (currentChapter < totalChapters) {
        handleNextChapter();
      }
      return;
    }
    if (soundEnabled) {
      bookAudio.playPageTurn(true);
    }
    setCurrentPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, totalPagesInChapter, currentChapter, totalChapters, handleNextChapter, soundEnabled]);

  const handlePrevPage = useCallback(() => {
    if (currentPage <= 1) return;
    if (soundEnabled) bookAudio.playPageTurn(false);
    setCurrentPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, soundEnabled]);

  const handleScrubPage = useCallback((targetPage: number) => {
    if (targetPage >= 1 && targetPage <= totalPagesInChapter) {
      if (soundEnabled) bookAudio.playPageTurn(targetPage > currentPage);
      setCurrentPage(targetPage);
    }
  }, [currentPage, totalPagesInChapter, soundEnabled]);

  // Start Reading Flow (triggers animated loading screen)
  const handleStartReading = (chapterNum: number = 1, pageNum: number = 1) => {
    const chMeta = CHAPTER_LIST.find((c) => c.chapterNumber === chapterNum);
    setLoadingChapterTitle(`CHAPTER ${chapterNum}: ${chMeta?.title || ''}`);
    setIsLoadingScreen(true);
    if (soundEnabled) bookAudio.playSunWheelPulse();
    setCurrentChapter(chapterNum);
    setCurrentPage(pageNum);
  };

  const handleFinishLoading = () => {
    setIsLoadingScreen(false);
    setCurrentView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Bookmark toggle
  const bookmarkKey = `${currentChapter}_${currentPage}`;
  const isCurrentBookmarked = bookmarks.includes(bookmarkKey);

  const handleToggleBookmark = useCallback(() => {
    setBookmarks((prev) => {
      const exists = prev.includes(bookmarkKey);
      if (exists) {
        return prev.filter((k) => k !== bookmarkKey);
      } else {
        if (soundEnabled) bookAudio.playBookmarkChime();
        return [...prev, bookmarkKey];
      }
    });
  }, [bookmarkKey, soundEnabled]);

  // Listen to custom events from MangaPage
  useEffect(() => {
    const onNavHome = () => setCurrentView('home');
    const onNavNext = () => handleNextChapter();

    window.addEventListener('nav-home', onNavHome);
    window.addEventListener('nav-next-chapter', onNavNext);

    return () => {
      window.removeEventListener('nav-home', onNavHome);
      window.removeEventListener('nav-next-chapter', onNavNext);
    };
  }, [handleNextChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape') {
        if (zoomedImage) setZoomedImage(null);
        else if (currentView === 'reader') setCurrentView('home');
        return;
      }

      if (currentView !== 'reader') return;

      if (readingMode === 'page') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          handleNextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          handlePrevPage();
        }
      }

      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'b' || e.key === 'B') {
        handleToggleBookmark();
      } else if (e.key === 'm' || e.key === 'M') {
        setReadingMode((m) => (m === 'page' ? 'webtoon' : 'page'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, readingMode, zoomedImage, handleNextPage, handlePrevPage, handleToggleBookmark]);

  // Mouse wheel paging in page mode
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (currentView !== 'reader' || readingMode !== 'page') return;
      const now = Date.now();
      if (now - lastWheelTime.current < 600) return;

      if (Math.abs(e.deltaY) > 40) {
        if (e.deltaY > 0) {
          lastWheelTime.current = now;
          handleNextPage();
        } else if (e.deltaY < 0) {
          lastWheelTime.current = now;
          handlePrevPage();
        }
      }
    },
    [currentView, readingMode, handleNextPage, handlePrevPage]
  );

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    const duration = Date.now() - touchStartTime.current;

    // Tap center detection
    if (Math.abs(diffX) < 12 && Math.abs(diffY) < 12 && duration < 250) {
      setIsControlsVisible((v) => !v);
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    // Horizontal swipe in Page Mode
    if (readingMode === 'page') {
      const isHorizontal = Math.abs(diffX) > Math.abs(diffY) * 1.3;
      if (isHorizontal && (Math.abs(diffX) > 45 || (duration < 250 && Math.abs(diffX) > 25))) {
        if (diffX < 0) {
          handleNextPage();
        } else {
          handlePrevPage();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPageData = chapterPages.find((p) => p.pageNumber === currentPage) || chapterPages[0];

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        background === 'oled'
          ? 'bg-black text-stone-100'
          : background === 'sepia'
          ? 'bg-[#181412] text-[#e8d8c8]'
          : background === 'light'
          ? 'bg-[#f4f4f6] text-stone-900'
          : 'bg-[#09090c] text-stone-100'
      }`}
    >
      {/* Loading Screen Overlay */}
      {isLoadingScreen && (
        <MangaLoadingScreen
          onComplete={handleFinishLoading}
          chapterTitle={loadingChapterTitle}
        />
      )}

      {/* Header Navigation with Instant "Home" & Chapter selector */}
      <MangaHeader
        currentView={currentView}
        currentChapter={currentChapter}
        readingMode={readingMode}
        onNavigateHome={() => setCurrentView('home')}
        onOpenReader={(ch, page) => handleStartReading(ch || currentChapter, page || 1)}
        onSelectChapter={(ch) => handleStartReading(ch, 1)}
        onToggleReadingMode={() => setReadingMode((m) => (m === 'page' ? 'webtoon' : 'page'))}
        onScrollToSection={handleScrollToSection}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        lastReadPage={currentPage}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col justify-start">
        {currentView === 'home' ? (
          <div className="space-y-12">
            <LandingHero
              lastReadPage={currentPage}
              totalPages={totalPagesInChapter}
              onReadNow={() => handleStartReading(1, 1)}
              onContinueReading={() => handleStartReading(currentChapter, currentPage)}
              onScrollToSection={handleScrollToSection}
            />

            {/* Chapter Library showing all 10 chapters */}
            <ChapterLibrary
              chapters={CHAPTER_LIST}
              currentChapter={currentChapter}
              onSelectChapter={(chNum) => handleStartReading(chNum, 1)}
            />

            <CharacterSection />
            <LoreSection />

            {/* Footer */}
            <footer className="py-12 border-t border-stone-800 text-center space-y-3 text-xs font-manga-tech text-stone-500">
              <p className="uppercase tracking-widest text-amber-500 font-bold">
                SUN WHEELS · SEASON 1: THE SEVEN WHEELS
              </p>
              <p className="text-stone-600">
                All 10 chapters of Season 1 are available. Season 2: The Seven Cities coming next.
              </p>
            </footer>
          </div>
        ) : (
          /* Reader View */
          <div className="flex-1 flex flex-col items-center justify-start p-2 sm:p-6 select-none relative">
            
            {/* Quick Home Floating Pill on Top Left of Reader */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between pb-3 px-2">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-amber-500 text-stone-300 hover:text-black border border-stone-800 text-xs font-manga-tech font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                title="Return to Home Page"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Return to Home</span>
              </button>

              <div className="text-xs font-manga-tech text-stone-400">
                <span>CHAPTER {currentChapter} OF {totalChapters}</span>
              </div>
            </div>

            {/* Desktop Left / Right Click Turn Zones in Page Mode */}
            {readingMode === 'page' && (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  aria-label="Previous Page"
                  className={`hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center z-30 transition-all ${
                    currentPage <= 1
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-stone-900/80 hover:bg-amber-500 text-stone-300 hover:text-black shadow-xl border border-stone-800 hover:scale-110 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPagesInChapter && currentChapter >= totalChapters}
                  aria-label="Next Page"
                  className={`hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center z-30 transition-all ${
                    currentPage >= totalPagesInChapter && currentChapter >= totalChapters
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-stone-900/80 hover:bg-amber-500 text-stone-300 hover:text-black shadow-xl border border-stone-800 hover:scale-110 active:scale-95'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Page Mode vs Webtoon Mode */}
            {readingMode === 'page' ? (
              <div className="w-full flex justify-center pb-20">
                <MangaPage
                  page={currentPageData}
                  totalPages={totalPagesInChapter}
                  onZoom={(src, cap) => {
                    setZoomedImage(src);
                    setZoomedCaption(cap);
                  }}
                  background={background}
                />
              </div>
            ) : (
              <WebtoonScrollReader
                pages={chapterPages}
                currentChapter={currentChapter}
                totalChapters={totalChapters}
                onZoom={(src, cap) => {
                  setZoomedImage(src);
                  setZoomedCaption(cap);
                }}
                background={background}
                onReturnToHome={() => setCurrentView('home')}
                onNextChapter={handleNextChapter}
                onPrevChapter={handlePrevChapter}
                onPageVisible={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
      </main>

      {/* Reader Controls HUD (Visible only while inside Reader) */}
      {currentView === 'reader' && (
        <MangaReaderControls
          currentChapter={currentChapter}
          totalChapters={totalChapters}
          currentPage={currentPage}
          totalPages={totalPagesInChapter}
          readingMode={readingMode}
          onToggleReadingMode={() => setReadingMode((m) => (m === 'page' ? 'webtoon' : 'page'))}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          onScrubPage={handleScrubPage}
          onReturnHome={() => setCurrentView('home')}
          isBookmarked={isCurrentBookmarked}
          onToggleBookmark={handleToggleBookmark}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          isVisible={isControlsVisible}
          onToggleVisibility={() => setIsControlsVisible((v) => !v)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((s) => !s)}
          background={background}
          onChangeBackground={(bg) => setBackground(bg)}
        />
      )}

      {/* Zoom Modal */}
      <ZoomModal
        isOpen={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
        imageSrc={zoomedImage}
        caption={zoomedCaption}
      />
    </div>
  );
}
