import React, { useState } from 'react';
import { X, Play, Volume2, VolumeX, Shield, Crosshair, Award, Zap, Flame } from 'lucide-react';
import { GAME_IMAGES } from '../data/gameData';
import { sound } from '../utils/audio';

interface GameplayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameplayModal: React.FC<GameplayModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hudActive, setHudActive] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#16161C] border border-[#282834] shadow-2xl p-4 sm:p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#282834]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
            <h3 className="font-display font-black text-2xl text-white uppercase italic">
              SIGMA CLASH — GAMEPLAY TRAILER & HUD DEMO
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#0F0F12] border border-[#282834] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Gameplay Player Simulation */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black mt-4 border border-[#282834] group">
          <img
            src={GAME_IMAGES.clashSquad}
            alt="Sigma Clash Gameplay Trailer"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Vignette & scanlines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive Battle Royale In-Game HUD Overlay */}
          {hudActive && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none text-white select-none">
              {/* Top HUD: Alive & Kills */}
              <div className="flex items-center justify-between">
                {/* Squad Members */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 rounded border border-[#282834] text-xs font-mono">
                    <span className="text-[#FFB800] font-bold">1</span>
                    <span>Rusha (You)</span>
                    <span className="text-emerald-400">200 HP</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 rounded border border-[#282834] text-xs font-mono opacity-80">
                    <span className="text-[#00E5FF] font-bold">2</span>
                    <span>Aegis</span>
                    <span className="text-emerald-400">185 HP</span>
                  </div>
                </div>

                {/* Match Counter */}
                <div className="bg-black/70 px-4 py-1.5 rounded-xl border border-[#FFB800]/40 text-center font-display">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Bermuda Zone 3</div>
                  <div className="text-lg font-black text-[#FFB800] leading-none">
                    ALIVE: 14 <span className="text-slate-500">/</span> KILLS: 7
                  </div>
                </div>

                {/* Mini Kill Feed */}
                <div className="text-right space-y-1">
                  <div className="text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded text-slate-200 border border-[#282834]">
                    <span className="text-[#FFB800] font-bold">Rusha</span> [MP40] <span className="text-red-400">ApexGamer</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Safe Zone shrinks in 00:45
                  </div>
                </div>
              </div>

              {/* Center Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#00E5FF]/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
              </div>

              {/* Bottom HUD: Weapon & Health */}
              <div className="flex items-end justify-between">
                {/* Health Bar */}
                <div className="space-y-1 w-48 sm:w-64">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold">HP 200 / 200</span>
                    <span className="text-[#00E5FF] font-bold">EP 150</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/80 rounded-full overflow-hidden border border-[#282834]">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                  <div className="h-1.5 w-full bg-black/80 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00E5FF] w-3/4" />
                  </div>
                </div>

                {/* Weapon Slot */}
                <div className="flex items-center gap-3 bg-black/75 px-4 py-2 rounded-xl border border-[#282834] font-mono">
                  <div>
                    <div className="text-xs font-bold text-[#FFB800]">MP40 NEON FURY</div>
                    <div className="text-xl font-display font-black text-white leading-none">
                      32 <span className="text-xs text-slate-400">/ 120</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-[#00E5FF]/20 rounded border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-bold">
                    AUTO
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Controls & Toggle HUD */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playGunshot('smg');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#FFB800] text-black font-display font-bold uppercase tracking-wider hover:bg-[#FFA000] transition-colors"
            >
              Simulate Gunfire Sound
            </button>
            <button
              onClick={() => {
                sound.playGunshot('gloo');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#00E5FF] text-black font-display font-bold uppercase tracking-wider hover:bg-[#38BDF8] transition-colors"
            >
              Deploy Gloo Wall SFX
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <button
              onClick={() => setHudActive(!hudActive)}
              className="hover:text-white underline underline-offset-4"
            >
              {hudActive ? 'Hide Battle HUD' : 'Show Battle HUD'}
            </button>
            <span>·</span>
            <span>60 FPS Native Capture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
