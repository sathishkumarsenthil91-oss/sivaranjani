import React, { useRef, useState, useEffect } from 'react';
import { Bookmark, ChevronLeft, ChevronRight, CornerRightUp } from 'lucide-react';
import { PageContent, ReaderSettings } from '../types/book';

interface PageSpreadProps {
  page: PageContent;
  secondPage?: PageContent; // If 2-page spread is active on widescreen
  totalPages: number;
  settings: ReaderSettings;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onToggleControls: () => void;
  isControlsVisible: boolean;
  turnDirection: 'next' | 'prev' | null;
  isFlipping: boolean;
  onOpenTOC: () => void;
}

export const PageSpread: React.FC<PageSpreadProps> = ({
  page,
  secondPage,
  totalPages,
  settings,
  isBookmarked,
  onToggleBookmark,
  onNextPage,
  onPrevPage,
  onToggleControls,
  turnDirection,
  isFlipping,
  onOpenTOC,
}) => {
  const isNight = settings.theme === 'midnight';
  const isIvory = settings.theme === 'ivory';

  // Touch gesture state for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);

  // Reset swipe offset when page changes
  useEffect(() => {
    setSwipeOffset(0);
  }, [page.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Only apply horizontal drag if user is swiping horizontally more than vertically
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 15) {
      // Bound the drag visual resistance
      const clampedOffset = Math.max(-80, Math.min(80, diffX * 0.4));
      setSwipeOffset(clampedOffset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setSwipeOffset(0);
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;
    const duration = Date.now() - touchStartTime.current;

    setSwipeOffset(0);

    // If tap was quick and stationary, toggle controls
    if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10 && duration < 300) {
      onToggleControls();
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    // Horizontal swipe threshold: 45px or fast flick (velocity)
    const isHorizontal = Math.abs(diffX) > Math.abs(diffY) * 1.3;
    const isFlick = duration < 250 && Math.abs(diffX) > 30;

    if (isHorizontal && (Math.abs(diffX) > 45 || isFlick)) {
      if (diffX < 0) {
        // Swiped Left -> Move forward
        if (page.pageNumber < totalPages) {
          onNextPage();
        }
      } else {
        // Swiped Right -> Move backward
        if (page.pageNumber > 1) {
          onPrevPage();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Typography font size mapping
  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'sm':
        return 'text-[15px] sm:text-[16px]';
      case 'lg':
        return 'text-[19px] sm:text-[20px]';
      case 'xl':
        return 'text-[21px] sm:text-[23px]';
      case 'md':
      default:
        return 'text-[17px] sm:text-[18px]';
    }
  };

  // Font family mapping
  const getFontFamilyClass = () => {
    switch (settings.fontStyle) {
      case 'elegant':
        return 'font-editorial';
      case 'sans':
        return 'font-sans';
      case 'serif':
      default:
        return 'font-serif';
    }
  };

  // Line height mapping
  const getLineHeightClass = () => {
    switch (settings.lineSpacing) {
      case 'compact':
        return 'leading-relaxed';
      case 'spacious':
        return 'leading-[2.1]';
      case 'relaxed':
      default:
        return 'leading-[1.8]';
    }
  };

  // Paper texture styling
  const getPaperBg = () => {
    if (isNight) return 'paper-texture-midnight text-stone-200';
    if (isIvory) return 'paper-texture-ivory text-stone-900';
    return 'paper-texture-parchment text-[#2D2620]';
  };

  // Drop cap style
  const getDropCapClass = () => {
    if (isNight) return 'drop-cap-midnight';
    if (isIvory) return 'drop-cap-ivory';
    return 'drop-cap-parchment';
  };

  const isFirstPage = page.pageNumber === 1;
  const isLastPage = (secondPage ? secondPage.pageNumber : page.pageNumber) >= totalPages;

  return (
    <div
      className="relative w-full max-w-6xl mx-auto flex items-center justify-center py-2 sm:py-6 px-2 sm:px-4 select-text"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Left Page Turn Click Zone */}
      <button
        onClick={onPrevPage}
        disabled={isFirstPage}
        aria-label="Previous Page"
        className={`hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all z-20 ${
          isFirstPage
            ? 'opacity-0 pointer-events-none'
            : isNight
            ? 'bg-stone-800/80 hover:bg-stone-700 text-stone-300 shadow-md'
            : 'bg-white/80 hover:bg-white text-stone-800 shadow-md hover:scale-105 border border-amber-900/10'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Desktop Right Page Turn Click Zone */}
      <button
        onClick={onNextPage}
        disabled={isLastPage}
        aria-label="Next Page"
        className={`hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all z-20 ${
          isLastPage
            ? 'opacity-0 pointer-events-none'
            : isNight
            ? 'bg-stone-800/80 hover:bg-stone-700 text-stone-300 shadow-md'
            : 'bg-white/80 hover:bg-white text-stone-800 shadow-md hover:scale-105 border border-amber-900/10'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Physical Book Perspective Wrapper */}
      <div 
        className="w-full perspective-container"
        style={{
          transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
          transition: swipeOffset === 0 ? 'transform 0.25s ease-out' : 'none'
        }}
      >
        {/* Book Outer Spine & Drop Shadow Frame */}
        <div className={`relative w-full rounded-xl sm:rounded-2xl transition-all duration-300 book-physical-shadow overflow-hidden border ${
          isNight ? 'border-stone-800/90' : 'border-amber-900/15'
        }`}>

          {/* Book Bookmark Ribbon in Corner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this page'}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark this page'}
            className="absolute top-0 right-8 sm:right-12 z-30 group focus:outline-none"
          >
            <div 
              className={`w-6 sm:w-7 h-10 sm:h-12 transition-all duration-300 flex items-center justify-center shadow-md ${
                isBookmarked 
                  ? 'bg-gradient-to-b from-red-800 to-red-600 -translate-y-1' 
                  : 'bg-stone-400/40 hover:bg-amber-600/60 -translate-y-4 group-hover:-translate-y-2'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)'
              }}
            >
              <Bookmark className={`w-3.5 h-3.5 mt-1 ${isBookmarked ? 'text-amber-200 fill-amber-200' : 'text-white'}`} />
            </div>
          </button>

          {/* Page Turn 3D Animation Layer */}
          <div 
            className={`w-full transition-transform duration-500 transform-style-3d ${
              isFlipping && turnDirection === 'next'
                ? 'rotate-y-[-8deg] scale-[0.99] origin-left'
                : isFlipping && turnDirection === 'prev'
                ? 'rotate-y-[8deg] scale-[0.99] origin-right'
                : 'rotate-y-0 scale-100'
            }`}
          >
            {/* The Book Pages: Either 2-Page Spread or Single Page */}
            <div className={`grid ${secondPage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} divide-y md:divide-y-0 md:divide-x ${
              isNight ? 'divide-stone-800' : 'divide-amber-900/10'
            }`}>
              
              {/* PAGE 1 (Left on 2-spread, or Solo) */}
              <SinglePageSheet
                page={page}
                totalPages={totalPages}
                settings={settings}
                isNight={isNight}
                getPaperBg={getPaperBg}
                getDropCapClass={getDropCapClass}
                getFontSizeClass={getFontSizeClass}
                getFontFamilyClass={getFontFamilyClass}
                getLineHeightClass={getLineHeightClass}
                onOpenTOC={onOpenTOC}
                isRightSide={false}
                hasSiblingPage={!!secondPage}
              />

              {/* PAGE 2 (Right on 2-spread, if present) */}
              {secondPage && (
                <SinglePageSheet
                  page={secondPage}
                  totalPages={totalPages}
                  settings={settings}
                  isNight={isNight}
                  getPaperBg={getPaperBg}
                  getDropCapClass={getDropCapClass}
                  getFontSizeClass={getFontSizeClass}
                  getFontFamilyClass={getFontFamilyClass}
                  getLineHeightClass={getLineHeightClass}
                  onOpenTOC={onOpenTOC}
                  isRightSide={true}
                  hasSiblingPage={true}
                />
              )}

            </div>
          </div>

          {/* Book Center Gutter Fold Shadow (Visible when 2 pages shown) */}
          {secondPage && (
            <div 
              aria-hidden="true" 
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20 bg-gradient-to-r from-black/10 via-black/25 to-black/10 dark:from-black/40 dark:via-black/70 dark:to-black/40" 
            />
          )}

        </div>

        {/* Mobile Swipe Guidance Hint */}
        <div className="md:hidden flex items-center justify-between px-2 pt-2 text-[11px] text-stone-400 font-serif">
          <span>← Swipe right for prev</span>
          <span>Tap center for menu</span>
          <span>Swipe left for next →</span>
        </div>
      </div>
    </div>
  );
};

interface SinglePageSheetProps {
  page: PageContent;
  totalPages: number;
  settings: ReaderSettings;
  isNight: boolean;
  getPaperBg: () => string;
  getDropCapClass: () => string;
  getFontSizeClass: () => string;
  getFontFamilyClass: () => string;
  getLineHeightClass: () => string;
  onOpenTOC: () => void;
  isRightSide: boolean;
  hasSiblingPage: boolean;
}

const SinglePageSheet: React.FC<SinglePageSheetProps> = ({
  page,
  totalPages,
  isNight,
  getPaperBg,
  getDropCapClass,
  getFontSizeClass,
  getFontFamilyClass,
  getLineHeightClass,
  onOpenTOC,
  isRightSide,
  hasSiblingPage,
}) => {
  return (
    <article
      className={`relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] max-h-[85vh] flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto book-scrollbar transition-colors ${getPaperBg()} ${
        hasSiblingPage
          ? isRightSide
            ? 'book-gutter-right'
            : 'book-gutter-left'
          : 'book-gutter-left book-gutter-right'
      }`}
    >
      {/* Top Header: Running Head & Chapter info */}
      <header className="flex items-center justify-between border-b pb-3 mb-6 select-none text-xs font-serif tracking-widest uppercase transition-colors border-amber-950/10 dark:border-stone-800">
        <button
          onClick={onOpenTOC}
          className="hover:text-amber-600 transition-colors text-stone-500 dark:text-stone-400 flex items-center gap-1.5 truncate max-w-[220px]"
          title="Jump to Table of Contents"
        >
          <span>{page.chapterTitle}</span>
          <CornerRightUp className="w-3 h-3 opacity-60 shrink-0" />
        </button>

        <span className="text-[11px] text-stone-400 dark:text-stone-500 tabular-nums shrink-0">
          Folio {page.pageNumber}
        </span>
      </header>

      {/* Main Reading Text Column */}
      <div className="flex-1 flex flex-col justify-start space-y-5">
        
        {/* Chapter Title Banner on First Page of Chapter */}
        {page.isChapterOpening && (
          <div className="text-center pt-2 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-serif font-semibold text-amber-700 dark:text-amber-400">
              Chronicle Chapter {page.chapterNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-balance text-stone-900 dark:text-stone-100">
              {page.chapterTitle.replace(/^Chapter [IVX]+:\s*/, '')}
            </h2>
            {page.chapterSubtitle && (
              <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400">
                {page.chapterSubtitle}
              </p>
            )}
            <div className="w-12 h-px bg-amber-700/30 dark:bg-amber-400/30 mx-auto mt-3" />
          </div>
        )}

        {/* Chapter Illustration (if available on page) */}
        {page.illustration && (
          <figure className="my-3 rounded-lg overflow-hidden border border-amber-900/15 dark:border-stone-800 shadow-sm bg-stone-900">
            <img
              src={page.illustration}
              alt={page.illustrationCaption || page.chapterTitle}
              referrerPolicy="no-referrer"
              className="w-full max-h-[260px] sm:max-h-[300px] object-cover object-center filter brightness-[0.96] contrast-[1.04]"
            />
            {page.illustrationCaption && (
              <figcaption className="p-2.5 text-center text-xs font-serif italic text-stone-500 dark:text-stone-400 bg-stone-100/50 dark:bg-stone-900/50 border-t border-amber-900/10 dark:border-stone-800">
                {page.illustrationCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Body Paragraphs */}
        <div className={`space-y-4 text-pretty ${getFontSizeClass()} ${getFontFamilyClass()} ${getLineHeightClass()}`}>
          {page.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className={`${
                idx === 0 && page.isChapterOpening ? getDropCapClass() : ''
              } text-justify`}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Pull Quote Callout (if present on this page) */}
        {page.pullQuote && (
          <blockquote className={`my-6 py-4 px-6 border-l-2 ${
            isNight ? 'border-amber-500 bg-stone-900/40 text-amber-100' : 'border-amber-700 bg-amber-950/3 text-stone-800'
          } rounded-r-lg`}>
            <p className="text-lg sm:text-xl font-serif italic leading-relaxed">
              “{page.pullQuote.text}”
            </p>
            {page.pullQuote.attribution && (
              <cite className="block text-xs uppercase tracking-wider font-serif not-italic mt-2 text-stone-500 dark:text-stone-400">
                — {page.pullQuote.attribution}
              </cite>
            )}
          </blockquote>
        )}

        {/* Footnote (if present) */}
        {page.footnote && (
          <aside className="pt-4 mt-auto border-t border-amber-900/10 dark:border-stone-800/80 text-xs font-serif italic text-stone-500 dark:text-stone-400">
            * {page.footnote}
          </aside>
        )}

      </div>

      {/* Footer: Page Number & Reading Position */}
      <footer className="pt-6 mt-6 border-t border-amber-950/10 dark:border-stone-800 flex items-center justify-between text-xs font-serif select-none text-stone-500 dark:text-stone-400">
        <span className="italic">
          {page.chapterTitle}
        </span>
        <span className="font-semibold tabular-nums tracking-wider">
          Page {page.pageNumber} of {totalPages}
        </span>
      </footer>

    </article>
  );
};
