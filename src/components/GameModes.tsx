import React, { useState } from 'react';
import { GAME_MODES, GameMode, GAME_IMAGES } from '../data/gameData';
import { Users, Clock, Flame, Shield, Trophy, Check, ArrowRight, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export const GameModes: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GameMode>(GAME_MODES[0]);

  return (
    <section id="modes" className="py-20 bg-[#0F0F12] border-b border-[#282834] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FFB800] font-bold">
              <Flame className="w-4 h-4 text-[#FFB800]" />
              High-Velocity Combat Formats
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase italic tracking-tight mt-1">
              GAME MODES <span className="text-[#00E5FF]">SHOWCASE</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Whether you prefer high-stake solo drops into Peak or synchronized 4v4 rounds with custom economy, Sigma Clash brings uncompromising speed.
            </p>
          </div>

          {/* Quick Filter Switch */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#16161C] border border-[#282834] rounded-xl self-start md:self-auto overflow-x-auto">
            {GAME_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  sound.playSelect();
                  setActiveMode(mode);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeMode.id === mode.id
                    ? 'bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black shadow-md shadow-[#FFB800]/25'
                    : 'text-slate-400 hover:text-white hover:bg-[#282834]/40'
                }`}
              >
                {mode.title}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Main Mode Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {GAME_MODES.map((mode, idx) => {
            const isSelected = activeMode.id === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => {
                  sound.playClick();
                  setActiveMode(mode);
                }}
                className={`group relative rounded-2xl bg-[#16161C] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FFB800] shadow-2xl shadow-[#FFB800]/15 -translate-y-1'
                    : 'border-[#282834] hover:border-[#3E3E50] hover:-translate-y-0.5'
                }`}
              >
                {/* Visual Top Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={idx === 1 ? GAME_IMAGES.clashSquad : idx === 0 ? GAME_IMAGES.hero : GAME_IMAGES.armory}
                    alt={mode.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161C] via-[#16161C]/30 to-transparent" />
                  
                  {/* Floating Metadata Pill Replacement: clean unboxed styling */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#FFB800] bg-black/60 px-2.5 py-1 rounded border border-[#FFB800]/30 backdrop-blur-sm">
                      {mode.matchDuration}
                    </span>
                    <span className="text-[#00E5FF] bg-black/60 px-2.5 py-1 rounded border border-[#00E5FF]/30 backdrop-blur-sm">
                      {mode.playerCount}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight group-hover:text-[#FFB800] transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                      {mode.tagline}
                    </p>
                  </div>

                  {/* Highlights feature list */}
                  <div className="space-y-2 pt-2 border-t border-[#282834]/80">
                    {mode.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#FFB800] shrink-0 stroke-[3]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <span className={`inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider ${
                      isSelected ? 'text-[#FFB800]' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      <span>Inspect Match Rules</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Mode Deep Dive Drawer */}
        <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#121217] border border-[#282834] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#282834]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center font-display font-black text-2xl">
                0{GAME_MODES.findIndex(m => m.id === activeMode.id) + 1}
              </div>
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold tracking-widest">Selected Blueprint</span>
                <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase italic">
                  {activeMode.title} Rules & Strategy
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFB800]" />
                <span>Pace: {activeMode.matchDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00E5FF]" />
                <span>Lobby: {activeMode.playerCount}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {activeMode.rules.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0F0F12] border border-[#282834] flex flex-col justify-between">
                <span className="font-mono text-xs text-[#FFB800] font-bold">TACTIC #{idx + 1}</span>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
