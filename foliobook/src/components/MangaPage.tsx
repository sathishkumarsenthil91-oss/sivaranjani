import React from 'react';
import { MangaPageData } from '../types/manga';
import { ComicPanel } from './ComicPanel';

interface MangaPageProps {
  page: MangaPageData;
  totalPages: number;
  onZoom?: (imageSrc: string, caption?: string) => void;
  background?: string;
  isBlackAndWhiteMode?: boolean;
}

export const MangaPage: React.FC<MangaPageProps> = ({
  page,
  totalPages,
  onZoom,
  background = 'dark',
  isBlackAndWhiteMode = false,
}) => {
  const getPageBg = () => {
    switch (background) {
      case 'oled':
        return 'bg-black text-white';
      case 'sepia':
        return 'bg-[#1c1815] text-[#e8d8c8]';
      case 'light':
        return 'bg-[#f4f4f5] text-stone-900';
      case 'dark':
      default:
        return 'bg-[#0f0f13] text-stone-100';
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-lg sm:rounded-xl overflow-hidden shadow-2xl transition-colors duration-300 ${getPageBg()}`}>
      
      {/* Top Manga Page Header / Running Head */}
      <div className="px-4 py-2 border-b border-stone-800/80 flex items-center justify-between text-[11px] font-manga-tech tracking-wider uppercase opacity-70 select-none">
        <span className="text-amber-500 font-bold">
          SUN WHEELS · CH. {page.chapterNumber}
        </span>
        <span className="truncate max-w-[200px] text-stone-400">
          {page.chapterTitle}
        </span>
        <span className="tabular-nums">
          PAGE {page.pageNumber < 10 ? `0${page.pageNumber}` : page.pageNumber} / {totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>
      </div>

      {/* Comic Panels Container */}
      <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
        {page.layout === 'two-row' ? (
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {page.panels.map((panel) => (
              <ComicPanel
                key={panel.id}
                panel={panel}
                onZoom={onZoom}
                isBlackAndWhiteMode={isBlackAndWhiteMode}
              />
            ))}
          </div>
        ) : page.layout === 'three-panel-action' ? (
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {page.panels.map((panel) => (
              <ComicPanel
                key={panel.id}
                panel={panel}
                onZoom={onZoom}
                isBlackAndWhiteMode={isBlackAndWhiteMode}
              />
            ))}
          </div>
        ) : (
          /* single-splash or custom */
          page.panels.map((panel) => (
            <ComicPanel
              key={panel.id}
              panel={panel}
              onZoom={onZoom}
              isBlackAndWhiteMode={isBlackAndWhiteMode}
            />
          ))
        )}
      </div>

      {/* Page Footer Gutter */}
      <div className="px-4 py-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-manga-tech text-stone-500 select-none">
        <span>© SUN WHEELS CHRONICLES</span>
        <span className="font-bold text-amber-500/80">
          PAGE {page.pageNumber} / {totalPages}
        </span>
      </div>

      {/* If this is the last page of the chapter, show End of Chapter Navigation Card */}
      {page.pageNumber === totalPages && (
        <div className="p-4 sm:p-6 bg-gradient-to-t from-black via-stone-900 to-transparent border-t border-amber-500/30 text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-manga-tech text-amber-400 font-bold uppercase tracking-widest">
              End of Chapter {page.chapterNumber}
            </span>
            <h4 className="text-xl font-manga-title text-white">
              {page.chapterTitle}
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('nav-home'))}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-manga-tech font-bold uppercase tracking-wider transition-colors border border-stone-700 cursor-pointer"
            >
              ⟵ Return to Home
            </button>

            {page.chapterNumber < 10 ? (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('nav-next-chapter'))}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-manga-tech font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Read Chapter {page.chapterNumber + 1} ⟶
              </button>
            ) : (
              <span className="text-xs font-manga-tech text-amber-400 uppercase tracking-widest font-bold">
                SEASON ONE COMPLETE · SEASON 2 COMING SOON
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
