import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, X, BookOpen, ArrowRight } from 'lucide-react';
import { PageContent, ReadingTheme } from '../types/book';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: PageContent[];
  onSelectPage: (page: number) => void;
  theme: ReadingTheme;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  pages,
  onSelectPage,
  theme,
}) => {
  const [query, setQuery] = useState('');
  const isNight = theme === 'midnight';

  // Compute search results across all paragraphs, footnotes, quotes
  const results = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return [];
    const lowerQuery = query.toLowerCase();

    return pages
      .map((page) => {
        const matchingParagraphs: string[] = [];
        page.paragraphs.forEach((p) => {
          if (p.toLowerCase().includes(lowerQuery)) {
            matchingParagraphs.push(p);
          }
        });

        if (page.pullQuote && page.pullQuote.text.toLowerCase().includes(lowerQuery)) {
          matchingParagraphs.push(`“${page.pullQuote.text}”`);
        }

        if (page.footnote && page.footnote.toLowerCase().includes(lowerQuery)) {
          matchingParagraphs.push(`Footnote: ${page.footnote}`);
        }

        if (matchingParagraphs.length > 0) {
          return {
            pageNumber: page.pageNumber,
            chapterTitle: page.chapterTitle,
            matches: matchingParagraphs,
          };
        }
        return null;
      })
      .filter(Boolean) as {
        pageNumber: number;
        chapterTitle: string;
        matches: string[];
      }[];
  }, [query, pages]);

  if (!isOpen) return null;

  // Highlight matched snippet
  const highlightMatch = (text: string, q: string) => {
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 140) + '...';
    const start = Math.max(0, idx - 45);
    const end = Math.min(text.length, idx + q.length + 65);
    const prefix = start > 0 ? '...' : '';
    const suffix = end < text.length ? '...' : '';
    const slice = text.slice(start, end);

    const parts = slice.split(new RegExp(`(${q})`, 'gi'));
    return (
      <span>
        {prefix}
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-stone-900 dark:text-amber-200 px-0.5 rounded font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
        {suffix}
      </span>
    );
  };

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
        {/* Header with Search Input */}
        <div className="p-4 border-b border-amber-900/10 dark:border-stone-800 flex items-center gap-3">
          <SearchIcon className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, characters, astrolabe..."
            autoFocus
            className={`w-full bg-transparent text-sm sm:text-base focus:outline-none ${
              isNight ? 'placeholder:text-stone-500 text-stone-100' : 'placeholder:text-stone-400 text-stone-900'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-600 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 book-scrollbar">
          {query.trim().length < 2 ? (
            <div className="text-center py-12 space-y-2">
              <SearchIcon className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto" />
              <p className="text-sm font-serif text-stone-500">
                Type at least 2 characters to search across the entire story.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['astrolabe', 'compass', 'observatory', 'meridian', 'gears'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 hover:border-amber-600 text-stone-600 dark:text-stone-400 transition-colors"
                  >
                    “{tag}”
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-serif text-stone-500">
                No passages found matching “{query}”.
              </p>
              <p className="text-xs text-stone-400">
                Try searching for broader terms like “clockwork”, “library”, or “stars”.
              </p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={res.pageNumber}
                onClick={() => {
                  onSelectPage(res.pageNumber);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isNight
                    ? 'border-stone-800 bg-stone-900/60 hover:bg-stone-800 hover:border-amber-500/40'
                    : 'border-amber-900/10 bg-white/70 hover:bg-white hover:border-amber-700/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-serif mb-1.5">
                  <span className="font-semibold">Page {res.pageNumber}</span>
                  <span className="text-stone-400 flex items-center gap-1">
                    <span>{res.chapterTitle}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm font-serif text-stone-700 dark:text-stone-300">
                  {res.matches.slice(0, 2).map((snippet, sIdx) => (
                    <p key={sIdx} className="leading-relaxed">
                      {highlightMatch(snippet, query)}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-6 py-2.5 border-t border-amber-900/10 dark:border-stone-800 text-xs text-stone-500 text-right">
            Found {results.length} page{results.length === 1 ? '' : 's'} matching
          </div>
        )}
      </div>
    </div>
  );
};
