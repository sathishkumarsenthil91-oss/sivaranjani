import React from 'react';
import { X, Type, BookOpen, Volume2, Moon, Sun, Coffee, Sparkles, Columns, Square } from 'lucide-react';
import { ReaderSettings, ReadingTheme, FontSize, FontStyle, LineSpacing } from '../types/book';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const isNight = settings.theme === 'midnight';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-md rounded-2xl flex flex-col overflow-hidden shadow-2xl border transition-colors ${
          isNight
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-[#FBF8F2] border-amber-900/15 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/10 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base uppercase tracking-wider">
              Reading Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh] book-scrollbar">
          
          {/* 1. Theme Palette Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-serif uppercase tracking-widest text-stone-500 font-semibold block">
              Paper Texture & Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'parchment' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                  settings.theme === 'parchment'
                    ? 'border-amber-700 bg-[#F4EFE6] text-amber-900 ring-2 ring-amber-600/30 font-semibold'
                    : 'border-stone-300 dark:border-stone-800 bg-[#FAF7F0] text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#E8DEC8] border border-amber-800/30" />
                <span>Parchment</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'ivory' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                  settings.theme === 'ivory'
                    ? 'border-stone-900 bg-white text-stone-900 ring-2 ring-stone-400/30 font-semibold'
                    : 'border-stone-300 dark:border-stone-800 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white border border-stone-400" />
                <span>Clean Ivory</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'midnight' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                  settings.theme === 'midnight'
                    ? 'border-amber-500 bg-stone-950 text-amber-300 ring-2 ring-amber-500/30 font-semibold'
                    : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#12100E] border border-amber-500/40" />
                <span>Midnight</span>
              </button>
            </div>
          </div>

          {/* 2. Font Size Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-serif uppercase tracking-widest text-stone-500 font-semibold block">
              Type Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: 'sm', label: 'Small', sample: 'Aa' },
                  { id: 'md', label: 'Medium', sample: 'Aa' },
                  { id: 'lg', label: 'Large', sample: 'Aa' },
                  { id: 'xl', label: 'X-Large', sample: 'Aa' },
                ] as { id: FontSize; label: string; sample: string }[]
              ).map((fs) => (
                <button
                  key={fs.id}
                  onClick={() => onUpdateSettings({ fontSize: fs.id })}
                  className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    settings.fontSize === fs.id
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <span className={`font-serif ${
                    fs.id === 'sm' ? 'text-xs' : fs.id === 'md' ? 'text-sm' : fs.id === 'lg' ? 'text-base' : 'text-lg'
                  }`}>
                    {fs.sample}
                  </span>
                  <span className="text-[10px] mt-0.5 opacity-80">{fs.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Font Family Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-serif uppercase tracking-widest text-stone-500 font-semibold block">
              Typeface
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'serif', label: 'Newsreader', desc: 'Book Serif' },
                  { id: 'elegant', label: 'Garamond', desc: 'Editorial' },
                  { id: 'sans', label: 'Modern', desc: 'Clean Sans' },
                ] as { id: FontStyle; label: string; desc: string }[]
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ fontStyle: f.id })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    settings.fontStyle === f.id
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div className={`text-sm ${
                    f.id === 'serif' ? 'font-serif' : f.id === 'elegant' ? 'font-editorial italic' : 'font-sans'
                  }`}>
                    {f.label}
                  </div>
                  <div className="text-[10px] text-stone-400">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Desktop Layout: Spread vs Single */}
          <div className="space-y-2.5">
            <label className="text-xs font-serif uppercase tracking-widest text-stone-500 font-semibold block">
              Desktop Presentation
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ twoPageSpread: false })}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all text-xs ${
                  !settings.twoPageSpread
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                <Square className="w-4 h-4" />
                <span>Single Page</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ twoPageSpread: true })}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all text-xs ${
                  settings.twoPageSpread
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                <Columns className="w-4 h-4" />
                <span>2-Page Spread</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-400">
              * Note: Mobile devices automatically present in single-page mode for optimum readability.
            </p>
          </div>

          {/* 5. Sound & Atmosphere Toggles */}
          <div className="space-y-3 pt-2 border-t border-amber-900/10 dark:border-stone-800">
            <label className="text-xs font-serif uppercase tracking-widest text-stone-500 font-semibold block">
              Audio & Physical Immersion
            </label>

            {/* Page flip sound */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Page Turn Sound</span>
                <p className="text-xs text-stone-400">Tactile paper rustle when flipping pages</p>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => onUpdateSettings({ soundEffects: e.target.checked })}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
            </div>

            {/* Ambient rain */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Ambient Rain Study</span>
                <p className="text-xs text-stone-400">Gentle relaxing background rain sound</p>
              </div>
              <input
                type="checkbox"
                checked={settings.ambientSound}
                onChange={(e) => onUpdateSettings({ ambientSound: e.target.checked })}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-amber-900/10 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-colors"
          >
            Apply &amp; Return to Reading
          </button>
        </div>
      </div>
    </div>
  );
};
