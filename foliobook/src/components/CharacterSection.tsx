import React, { useState } from 'react';
import { CHARACTERS } from '../data/mangaData';
import { CharacterProfile } from '../types/manga';
import { Lock, Shield, Sparkles, User, Zap } from 'lucide-react';
import { SunWheelIcon } from './SunWheelIcon';

export const CharacterSection: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<CharacterProfile>(CHARACTERS[0]);

  return (
    <section id="characters" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-stone-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-manga-tech tracking-widest text-amber-500 uppercase font-bold">
            <User className="w-3.5 h-3.5" />
            <span>Personnel &amp; Entities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-manga-title tracking-wider text-white mt-1">
            KEY CHARACTERS
          </h2>
        </div>
        <p className="text-xs text-stone-400 font-dialogue max-w-sm">
          The individuals caught within the eternal stasis field of the Sun Wheels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Character Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar.id === char.id;
            const isLocked = char.status === 'Locked';

            return (
              <div
                key={char.id}
                onClick={() => !isLocked && setSelectedChar(char)}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                  isLocked
                    ? 'border-stone-800/60 bg-stone-950/40 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'border-amber-500 bg-stone-900 shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer'
                    : 'border-stone-800 bg-stone-900/40 hover:bg-stone-900/80 hover:border-stone-700 cursor-pointer'
                }`}
              >
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-stone-700">
                  <img
                    src={char.avatar}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover object-center ${
                      isLocked ? 'filter grayscale blur-xs' : ''
                    }`}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-stone-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-manga-title tracking-wide text-white truncate">
                      {char.name}
                    </h4>
                    <span
                      className={`text-[9px] font-manga-tech px-2 py-0.5 rounded uppercase font-bold ${
                        char.status === 'Active'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : char.status === 'Unknown'
                          ? 'bg-purple-900/40 text-purple-300 border border-purple-800'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      {char.status}
                    </span>
                  </div>
                  <p className="text-xs font-narration italic text-amber-500/90 truncate">
                    {char.title}
                  </p>
                  <p className="text-[11px] font-dialogue text-stone-400 mt-0.5 line-clamp-1">
                    {char.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Character Showcase Spotlight */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-950 to-black border-2 border-amber-600/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Watermark Sun Wheel */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none">
            <SunWheelIcon size={360} animated />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-xl shrink-0 bg-black">
              <img
                src={selectedChar.avatar}
                alt={selectedChar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-manga-tech uppercase tracking-widest text-amber-500 font-bold">
                  {selectedChar.role}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-xs font-manga-tech text-stone-400">
                  STATUS: {selectedChar.status}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-manga-title tracking-wider text-white">
                {selectedChar.name}
              </h3>
              <p className="text-sm font-narration italic text-amber-400">
                {selectedChar.title}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-xs uppercase font-manga-tech text-stone-500 tracking-wider font-bold">
              DOSSIER ARCHIVE
            </p>
            <p className="text-sm font-dialogue leading-relaxed text-stone-300">
              {selectedChar.description}
            </p>
          </div>

          {/* Quote */}
          <blockquote className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-sm font-narration italic text-amber-200">
            {selectedChar.quote}
          </blockquote>

          {/* Abilities */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <span className="text-xs font-manga-tech uppercase tracking-widest text-stone-400 font-bold block">
              Observed Resonances
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedChar.abilities.map((ability, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-stone-800/80 border border-stone-700 text-xs font-manga-tech text-amber-300 flex items-center gap-1.5"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>{ability}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
