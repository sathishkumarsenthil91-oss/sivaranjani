import React from 'react';
import { Play, RotateCcw, Clock, BookOpen, Bookmark as BookmarkIcon, Compass, Sparkles } from 'lucide-react';
import { StoryBook, ReadingTheme } from '../types/book';

interface BookCoverHeroProps {
  book: StoryBook;
  lastReadPage: number;
  totalPages: number;
  theme: ReadingTheme;
  bookmarksCount: number;
  onStartReading: () => void;
  onContinueReading: () => void;
  onSelectChapter: (chapterNumber: number) => void;
  isBookOpening: boolean;
}

export const BookCoverHero: React.FC<BookCoverHeroProps> = ({
  book,
  lastReadPage,
  totalPages,
  theme,
  bookmarksCount,
  onStartReading,
  onContinueReading,
  onSelectChapter,
  isBookOpening,
}) => {
  const isNight = theme === 'midnight';
  const progressPercent = Math.round(((lastReadPage - 1) / (totalPages - 1)) * 100);
  const hasStarted = lastReadPage > 1;

  return (
    <div className={`relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-10 px-4 sm:px-6 transition-colors duration-500 overflow-hidden ${
      isNight ? 'bg-[#12100E] text-stone-200' : 'bg-[#F6F1E7] text-stone-900'
    }`}>
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000 ${
          isNight 
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-transparent to-stone-950' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/70 via-transparent to-[#F6F1E7]'
        }`} 
      />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Realistic 3D Physical Book Showcase */}
          <div className="lg:col-span-5 flex justify-center perspective-container">
            <div 
              className={`relative transition-all duration-700 select-none group ${
                isBookOpening ? 'scale-105 rotate-y-[-24deg] translate-x-4 opacity-75' : 'hover:scale-[1.02] hover:-rotate-1'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isBookOpening ? 'rotateY(-20deg) scale(1.05)' : undefined
              }}
            >
              {/* Physical Book Shadow on table */}
              <div 
                aria-hidden="true" 
                className="absolute -bottom-8 left-6 right-6 h-8 bg-black/40 blur-xl rounded-full" 
              />

              {/* Book Spine Edge (creates 3D thickness) */}
              <div 
                aria-hidden="true"
                className={`absolute top-0 bottom-0 -left-4 w-4 rounded-l-sm bg-gradient-to-r ${
                  isNight 
                    ? 'from-amber-950 via-stone-900 to-stone-800' 
                    : 'from-amber-950 via-amber-900 to-amber-800'
                } border-y border-l border-amber-700/30 shadow-md`}
              >
                {/* Gold spine ribs */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-amber-500/40" />
                <div className="absolute top-16 left-0 right-0 h-0.5 bg-amber-500/30" />
                <div className="absolute bottom-16 left-0 right-0 h-0.5 bg-amber-500/30" />
                <div className="absolute bottom-8 left-0 right-0 h-1 bg-amber-500/40" />
              </div>

              {/* Main Book Cover Container */}
              <div className="relative w-[280px] sm:w-[330px] md:w-[360px] aspect-[3/4] rounded-r-lg rounded-l-xs overflow-hidden book-cover-shadow border-t border-r border-b border-amber-600/40 bg-stone-900">
                {/* Book Cover Artwork Image */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Antiquarian Gold Foil & Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
                
                {/* Spine crease shadow on the front face */}
                <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
                
                {/* Gold filigree decorative frame */}
                <div className="absolute inset-3 border border-amber-400/40 rounded-sm pointer-events-none">
                  <div className="absolute inset-1 border border-amber-400/20" />
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/70" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400/70" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400/70" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/70" />
                </div>

                {/* Silk Ribbon Bookmark dangling */}
                <div 
                  aria-hidden="true" 
                  className="absolute -top-1 right-8 w-4 h-16 bg-gradient-to-b from-red-800 to-red-600 shadow-md border-x border-red-950"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                />

                {/* Cover Typographic Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-center z-10 pointer-events-none">
                  <div className="pt-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-amber-200/90 font-serif font-semibold">
                      Vol. I · The Grand Archives
                    </p>
                    <div className="w-8 h-px bg-amber-400/40 mx-auto mt-2" />
                  </div>

                  <div className="py-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 tracking-wider leading-tight drop-shadow-md">
                      {book.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-serif italic text-amber-200/80 mt-1 max-w-[240px] mx-auto">
                      {book.subtitle}
                    </p>
                  </div>

                  <div className="pb-3">
                    <p className="text-xs tracking-widest uppercase font-serif text-amber-200/90 font-medium">
                      By {book.author}
                    </p>
                    <p className="text-[10px] text-amber-400/60 font-serif mt-1">
                      {book.publishedYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stacked Pages Edge Texture (right side of closed book) */}
              <div 
                aria-hidden="true" 
                className="absolute top-2 bottom-2 -right-3 w-3 rounded-r-xs bg-gradient-to-r from-stone-400 via-amber-100 to-stone-300 border-y border-r border-stone-400/50 shadow-inner"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #F3ECE1 0px, #F3ECE1 1px, #E5DCce 1px, #E5DCce 2px)'
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Book Synopsis, Author & Interactive Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Metadata Kickers (Zero Pill Discipline) */}
            <div className={`flex flex-wrap items-center gap-3 text-xs tracking-wide ${
              isNight ? 'text-stone-400' : 'text-stone-600'
            }`}>
              <span className="font-serif italic">{book.genre}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{book.estimatedTotalReadMinutes} min read</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{totalPages} Illustrated Pages</span>
              {bookmarksCount > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <BookmarkIcon className="w-3.5 h-3.5" />
                    <span>{bookmarksCount} bookmarked</span>
                  </span>
                </>
              )}
            </div>

            {/* Book Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-balance leading-[1.15]">
                {book.title}
              </h1>
              <p className={`text-lg sm:text-xl font-serif italic ${
                isNight ? 'text-amber-300/80' : 'text-amber-900/80'
              }`}>
                {book.subtitle}
              </p>
            </div>

            {/* Hairline Divider */}
            <div className={`h-px w-full ${isNight ? 'bg-stone-800' : 'bg-amber-950/10'}`} />

            {/* Story Description */}
            <p className={`text-base sm:text-lg font-serif leading-relaxed text-pretty ${
              isNight ? 'text-stone-300' : 'text-stone-700'
            }`}>
              {book.description}
            </p>

            {/* Author Attribution */}
            <div className={`flex items-center gap-3 pt-1 text-sm ${
              isNight ? 'text-stone-400' : 'text-stone-600'
            }`}>
              <div className="w-8 h-8 rounded-full border border-amber-700/30 flex items-center justify-center font-serif font-bold text-amber-700 bg-amber-100/40">
                EV
              </div>
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">{book.author}</p>
                <p className="text-xs text-stone-500">{book.authorBio}</p>
              </div>
            </div>

            {/* Reading Progress Indicator if previously opened */}
            {hasStarted && (
              <div className={`p-4 rounded-xl border ${
                isNight ? 'bg-stone-900/60 border-stone-800' : 'bg-white/70 border-amber-900/10 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    Last read: Page {lastReadPage} of {totalPages}
                  </span>
                  <span className="font-semibold tabular-nums text-amber-600">
                    {progressPercent}% completed
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-600 transition-all duration-500 rounded-full" 
                    style={{ width: `${Math.max(progressPercent, 4)}%` }} 
                  />
                </div>
              </div>
            )}

            {/* Action Buttons: Start Reading / Continue Reading */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {hasStarted ? (
                <>
                  <button
                    onClick={onContinueReading}
                    disabled={isBookOpening}
                    className="px-6 py-3 rounded-xl font-medium text-sm tracking-wide bg-amber-700 hover:bg-amber-600 active:scale-98 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Continue Reading (Page {lastReadPage})</span>
                  </button>

                  <button
                    onClick={onStartReading}
                    disabled={isBookOpening}
                    className={`px-4 py-3 rounded-xl font-medium text-sm border transition-colors flex items-center gap-1.5 ${
                      isNight
                        ? 'border-stone-800 hover:bg-stone-800 text-stone-300'
                        : 'border-amber-900/20 hover:bg-amber-50 text-stone-700'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart from Page 1</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={onStartReading}
                  disabled={isBookOpening}
                  className="px-7 py-3.5 rounded-xl font-medium text-base tracking-wide bg-amber-700 hover:bg-amber-600 active:scale-98 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Start Reading</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>

            {/* Table of Contents Quick Preview */}
            <div className="pt-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-400 mb-3">
                Chronicle Chapters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {book.chapters.map((ch) => (
                  <button
                    key={ch.chapterNumber}
                    onClick={() => onSelectChapter(ch.chapterNumber)}
                    className={`text-left p-3 rounded-lg border transition-all flex flex-col justify-between group ${
                      isNight
                        ? 'border-stone-800/80 bg-stone-900/40 hover:bg-stone-900 hover:border-stone-700'
                        : 'border-amber-950/5 bg-white/50 hover:bg-white hover:border-amber-900/20 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-serif">Chapter {ch.chapterNumber}</span>
                      <span className="tabular-nums">pp. {ch.startPage}–{ch.endPage}</span>
                    </div>
                    <span className="text-sm font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {ch.title.replace(/^Chapter [IVX]+:\s*/, '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
