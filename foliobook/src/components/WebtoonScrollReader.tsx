import React, { useEffect, useRef } from 'react';
import { MangaPageData } from '../types/manga';
import { ComicPanel } from './ComicPanel';
import { ArrowUp, BookOpen, Sparkles } from 'lucide-react';
import { SunWheelIcon } from './SunWheelIcon';

interface WebtoonScrollReaderProps {
  pages: MangaPageData[];
  currentChapter: number;
  totalChapters: number;
  onZoom?: (imageSrc: string, caption?: string) => void;
  background?: string;
  isBlackAndWhiteMode?: boolean;
  onReturnToHome: () => void;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  onPageVisible?: (pageNumber: number) => void;
}

export const WebtoonScrollReader: React.FC<WebtoonScrollReaderProps> = ({
  pages,
  currentChapter,
  totalChapters,
  onZoom,
  background = 'dark',
  isBlackAndWhiteMode = false,
  onReturnToHome,
  onNextChapter,
  onPrevChapter,
  onPageVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer to track which page is currently centered on screen
  useEffect(() => {
    if (!onPageVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page') || '1', 10);
            onPageVisible(pageNum);
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.webtoon-page-block');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pages, onPageVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chapterTitle = pages[0]?.chapterTitle || `CHAPTER ${currentChapter}`;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex flex-col items-center pb-24 space-y-4"
    >
      {/* Webtoon Start Banner */}
      <div className="w-full text-center py-6 px-4 border-b border-stone-800 space-y-2 bg-[#0d0d11]/80 backdrop-blur-md rounded-b-xl mb-4">
        <div className="flex items-center justify-center gap-2 text-amber-500 font-manga-tech text-xs tracking-widest uppercase">
          <SunWheelIcon size={16} animated />
          <span>SUN WHEELS · WEBTOON SCROLL MODE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-manga-title tracking-wider text-white">
          CHAPTER {currentChapter}: {chapterTitle}
        </h2>
        <p className="text-xs text-stone-400 font-dialogue">
          Scroll downward to experience the continuous cinematic timeline
        </p>
      </div>

      {/* Pages rendered continuously without horizontal breaks */}
      {pages.map((page) => (
        <div
          key={`webtoon_p_${page.pageNumber}`}
          data-page={page.pageNumber}
          className="webtoon-page-block w-full space-y-3 sm:space-y-4 relative"
        >
          {/* Subtle page marker */}
          <div className="flex items-center justify-between px-3 text-[10px] font-manga-tech text-stone-600 uppercase">
            <span>CH. {currentChapter}</span>
            <span className="text-amber-500/70 font-bold">PANEL SECTION {page.pageNumber}</span>
          </div>

          {page.panels.map((panel) => (
            <ComicPanel
              key={panel.id}
              panel={panel}
              onZoom={onZoom}
              isBlackAndWhiteMode={isBlackAndWhiteMode}
            />
          ))}
        </div>
      ))}

      {/* Webtoon End of Chapter Card */}
      <div className="w-full mt-12 p-8 rounded-2xl bg-gradient-to-b from-stone-900 via-black to-stone-950 border-2 border-amber-600/40 text-center space-y-6 shadow-2xl">
        <SunWheelIcon size={64} glow animated className="text-amber-500 mx-auto" />

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] font-manga-tech text-amber-400 font-bold">
            Chapter {currentChapter} Completed
          </p>
          <h3 className="text-2xl sm:text-3xl font-manga-title tracking-wider text-white">
            {chapterTitle}
          </h3>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReturnToHome}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-manga-tech font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>⟵ Return to Home / Archives</span>
          </button>

          {currentChapter < totalChapters && onNextChapter && (
            <button
              onClick={onNextChapter}
              className="px-5 py-2.5 rounded-xl border border-amber-500/60 hover:bg-amber-500 hover:text-black bg-stone-900 text-xs font-manga-tech font-bold uppercase tracking-wider text-amber-400 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Next Chapter ({currentChapter + 1}) ⟶</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-xl border border-stone-700 hover:border-amber-500 bg-stone-800/80 text-xs font-manga-tech uppercase tracking-wider text-stone-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Top</span>
          </button>
        </div>

        <div className="border-t border-stone-800/80 pt-4 flex items-center justify-between text-xs text-stone-500 font-manga-tech">
          <span>CHAPTER {currentChapter} OF {totalChapters}</span>
          <span className="text-amber-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentChapter < totalChapters ? `NEXT: CHAPTER ${currentChapter + 1}` : 'SEASON ONE COMPLETE'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
