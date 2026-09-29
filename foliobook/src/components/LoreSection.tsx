import React from 'react';
import { Compass, HelpCircle, Layers, ShieldAlert, Sparkles, Sun } from 'lucide-react';
import { SunWheelIcon } from './SunWheelIcon';

export const LoreSection: React.FC = () => {
  return (
    <section id="lore" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-stone-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-manga-tech tracking-widest text-amber-500 uppercase font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>World Codex &amp; Mysteries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-manga-title tracking-wider text-white mt-1">
            ABOUT THE WORLD
          </h2>
        </div>
        <p className="text-xs text-stone-400 font-dialogue max-w-sm">
          Deciphering the forbidden mechanics of the Echo Vault and the lost city of Aathirai.
        </p>
      </div>

      {/* Grid of Lore Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3 relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-manga-title text-white">THE SUN WHEELS</h3>
          <p className="text-xs font-dialogue text-stone-300 leading-relaxed">
            Gigantic celestial conduits forged from ancient star-metal and volcanic stone. Legend describes seven wheels distributed across ancient continents, capable of anchoring physical space-time into unbroken stasis fields.
          </p>
          <div className="text-[10px] font-manga-tech text-amber-500 font-bold uppercase">
            Codex Classification: Class-X Temporal Relic
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3 relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-manga-title text-white">THE ECHO VAULT</h3>
          <p className="text-xs font-dialogue text-stone-300 leading-relaxed">
            Buried miles beneath Vetri Nagar, the machine reads the quantum memories fossilized inside ancient mineral lattice. When activated by an attuned resonant frequency, it doesn’t just replay the past—it materializes it.
          </p>
          <div className="text-[10px] font-manga-tech text-amber-500 font-bold uppercase">
            Subterranean Site: Vetri Nagar Sub-Sector 4
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3 relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-manga-title text-white">AATHIRAI METROPOLIS</h3>
          <p className="text-xs font-dialogue text-stone-300 leading-relaxed">
            A technologically triumphant civilization characterized by towering Dravidian granite architecture, crystalline aqueducts, and atmospheric energy grids. It exists in an endless golden hour—the exact moment preceding its historic erasure.
          </p>
          <div className="text-[10px] font-manga-tech text-amber-500 font-bold uppercase">
            Temporal Status: Locked at 17:42 Sunset
          </div>
        </div>
      </div>

      {/* The 5 Grand Mysteries Box */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-black to-stone-900 border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <SunWheelIcon size={24} animated glow className="text-amber-500" />
          <h3 className="text-2xl sm:text-3xl font-manga-title tracking-wider text-white">
            THE FIVE CORE MYSTERIES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-manga-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              01
            </div>
            <div>
              <h4 className="text-sm font-manga-title text-amber-400">WHO ERASED AATHIRAI?</h4>
              <p className="text-xs text-stone-300 font-dialogue mt-1">
                Was the city struck by an external cosmic cataclysm, or did the Archons trigger their own temporal shield to prevent an encroaching catastrophe?
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-manga-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              02
            </div>
            <div>
              <h4 className="text-sm font-manga-title text-amber-400">WHY THE ENDLESS SUNSET TIME LOOP?</h4>
              <p className="text-xs text-stone-300 font-dialogue mt-1">
                The sky refuses to yield to night. The cycle resets at the exact millisecond the sun kisses the apex of the High Spires.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-manga-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              03
            </div>
            <div>
              <h4 className="text-sm font-manga-title text-amber-400">WHAT IS ILAN’S GENETIC CONNECTION?</h4>
              <p className="text-xs text-stone-300 font-dialogue mt-1">
                The Echo Vault ignored centuries of seismic surveys and diggers, yet flared to life upon the touch of Ilan’s bare hand.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-manga-tech text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              04
            </div>
            <div>
              <h4 className="text-sm font-manga-title text-amber-400">WHY DOES ONLY ILAN REMEMBER?</h4>
              <p className="text-xs text-stone-300 font-dialogue mt-1">
                When the white pulse washes across Aathirai, every citizen reverts to zero. Only Ilan stands conscious in the river of time.
              </p>
            </div>
          </div>
        </div>

        {/* 5th Highlight */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
          <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-manga-tech text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
            05
          </div>
          <div>
            <h4 className="text-sm font-manga-title text-amber-300">THE TRUE PURPOSE OF THE SUN WHEELS</h4>
            <p className="text-xs text-stone-200 font-dialogue mt-1">
              Are the Sun Wheels anchors to preserve memories, or cosmic weapons designed to reboot Earth’s evolutionary clock?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
