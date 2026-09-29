import React, { useState } from 'react';
import { X, Bookmark, BookOpen, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { Chapter, Bookmark as BookmarkType, ReadingTheme } from '../types/book';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentPage: number;
  onSelectPage: (page: number) => void;
  bookmarks: BookmarkType[];
  onRemoveBookmark: (pageNumber: number) => void;
  theme: ReadingTheme;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  chapters,
  currentPage,
  onSelectPage,
  bookmarks,
  onRemoveBookmark,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'bookmarks'>('chapters');
  const isNight = theme === 'midnight';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border transition-colors ${
          isNight
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-[#FBF8F2] border-amber-900/15 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/10 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`text-sm font-serif font-semibold tracking-wider uppercase pb-1 border-b-2 transition-colors ${
                activeTab === 'chapters'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              Table of Contents
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`text-sm font-serif font-semibold tracking-wider uppercase pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookmarks'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarks ({bookmarks.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            aria-label="Close Table of Contents"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 book-scrollbar">
          {activeTab === 'chapters' ? (
            chapters.map((ch) => {
              const isCurrentChapter = currentPage >= ch.startPage && currentPage <= ch.endPage;
              return (
                <div
                  key={ch.chapterNumber}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrentChapter
                      ? isNight 
                        ? 'border-amber-500/50 bg-stone-800/80 shadow-inner' 
                        : 'border-amber-700/40 bg-white/90 shadow-sm'
                      : isNight
                      ? 'border-stone-800 bg-stone-900/40 hover:bg-stone-800/60'
                      : 'border-amber-900/5 bg-white/60 hover:bg-white hover:border-amber-900/15'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs font-serif text-stone-500 dark:text-stone-400">
                        <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                          Chapter {ch.chapterNumber}
                        </span>
                        <span>·</span>
                        <span className="tabular-nums">Pages {ch.startPage} – {ch.endPage}</span>
                        {isCurrentChapter && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-sans font-medium">
                            Current Reading
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                        {ch.title.replace(/^Chapter [IVX]+:\s*/, '')}
                      </h4>

                      <p className="text-xs sm:text-sm font-serif italic text-stone-500 dark:text-stone-400 line-clamp-1">
                        {ch.subtitle}
                      </p>

                      <p className="text-xs text-stone-600 dark:text-stone-400 pt-1 leading-relaxed">
                        {ch.summary}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 shrink-0 pt-1">
                      <button
                        onClick={() => {
                          onSelectPage(ch.startPage);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-700 hover:bg-amber-600 text-white flex items-center gap-1 transition-all"
                      >
                        <span>Open</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Bookmarks tab
            bookmarks.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Bookmark className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto" />
                <p className="text-sm font-serif text-stone-500 dark:text-stone-400">
                  No bookmarks placed yet.
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 max-w-xs mx-auto">
                  Click the red ribbon bookmark icon at the top corner of any page while reading to save your spot here.
                </p>
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div
                  key={bm.pageNumber}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isNight
                      ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800'
                      : 'border-amber-900/10 bg-white/70 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelectPage(bm.pageNumber);
                      onClose();
                    }}
                    className="text-left flex-1 space-y-1 focus:outline-none"
                  >
                    <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-serif font-semibold">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>Page {bm.pageNumber}</span>
                      <span className="text-stone-400 font-normal">· {bm.chapterTitle}</span>
                    </div>
                    <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 line-clamp-2">
                      “{bm.previewText}”
                    </p>
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(bm.pageNumber)}
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-amber-900/10 dark:border-stone-800 text-xs text-stone-400 dark:text-stone-500 flex items-center justify-between">
          <span className="font-serif">The Clockwork Cartographer</span>
          <span className="tabular-nums">4 Chapters · 13 Pages</span>
        </div>
      </div>
    </div>
  );
};
