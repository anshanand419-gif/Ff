import React from 'react';
import { Download, Play, ShieldAlert, Cpu, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { GAME_IMAGES, GAME_STATS } from '../data/gameData';
import { sound } from '../utils/audio';

interface HeroProps {
  onOpenDownload: () => void;
  onOpenGameplay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onOpenGameplay }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#282834]">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={GAME_IMAGES.hero}
          alt="Sigma Clash Battle Royale Island Key Art"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse [animation-duration:12s]"
          referrerPolicy="no-referrer"
        />
        {/* Layered dark gradients for contrast and anti-glare */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-[#0F0F12]/85 to-[#0F0F12]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-[#0F0F12]/50" />
        {/* Subtle cyber grid lines overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #00E5FF 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Server Indicator Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16161C]/90 border border-[#282834] text-xs font-medium text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-semibold uppercase tracking-wider">Servers Online</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 font-mono">Ping: 24ms (Global Matchmaking)</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] font-bold block">
                Next-Gen Mobile Battle Royale
              </span>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase italic leading-[0.95]">
                LIGHTER. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-[#FFD000] to-[#FFA000] drop-shadow-[0_0_20px_rgba(255,184,0,0.4)]">FASTER.</span>
                <br />
                ULTIMATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#38BDF8]">SURVIVAL.</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              Experience fast 10-minute 50-player battle royale action with anime-styled graphics, custom gloo-wall tactics, and zero lag on any Android device.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Glowing Download CTA */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDownload();
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FFC72C] to-[#FFA000] text-black font-display font-black text-xl tracking-wider uppercase shadow-2xl shadow-[#FFB800]/40 hover:shadow-[#FFB800]/60 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
              >
                {/* Glowing sheen sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                
                <Smartphone className="w-6 h-6 stroke-[2.5]" />
                <div className="flex flex-col text-left">
                  <span className="leading-none">Download APK</span>
                  <span className="text-[11px] font-mono font-bold tracking-normal opacity-90">v2.4.1 · 280MB</span>
                </div>
              </button>

              {/* Secondary Watch Gameplay CTA */}
              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenGameplay();
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#16161C]/90 hover:bg-[#1E1E26] border border-[#282834] hover:border-[#00E5FF]/60 text-white font-display font-bold text-lg tracking-wider uppercase transition-all shadow-md group"
              >
                <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00E5FF] group-hover:text-black transition-all">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Watch Gameplay</span>
              </button>
            </div>

            {/* Micro badges below CTA */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> No Root Required
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Anti-Cheat Shield Protected
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct High-Speed CDN
              </span>
            </div>
          </div>

          {/* Right Column: Holographic Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glowing Border Frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[#FFB800] via-[#00E5FF] to-[#A855F7] opacity-40 blur-xl" />
              
              <div className="relative rounded-2xl bg-[#16161C] border border-[#282834] overflow-hidden p-5 shadow-2xl">
                {/* Header of Preview Box */}
                <div className="flex items-center justify-between pb-3 border-b border-[#282834]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2 font-semibold uppercase">BERMUDA RECON PROTOCOL</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/20">
                    60 FPS LOCKED
                  </span>
                </div>

                {/* Hero Feature Visual */}
                <div className="relative aspect-video rounded-lg overflow-hidden my-4 border border-[#282834] group cursor-pointer" onClick={onOpenGameplay}>
                  <img
                    src={GAME_IMAGES.clashSquad}
                    alt="Clash Squad Action Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-xs font-mono text-[#FFB800] block uppercase font-bold">Fast-Action 4v4</span>
                        <span className="font-display font-black text-lg text-white uppercase">ZONE 7 CLASH SQUAD</span>
                      </div>
                      <div className="p-2 rounded-full bg-[#FFB800] text-black">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactical Mini Telemetry */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 rounded-lg bg-[#0F0F12] border border-[#282834]">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Engine Load</span>
                    <span className="text-sm font-display font-black text-[#00E5FF]">280 MB</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0F0F12] border border-[#282834]">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Match Time</span>
                    <span className="text-sm font-display font-black text-[#FFB800]">10 MIN</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0F0F12] border border-[#282834]">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Max Players</span>
                    <span className="text-sm font-display font-black text-emerald-400">50 DROPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stats Ticker Strip */}
        <div className="mt-14 pt-8 border-t border-[#282834]/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {GAME_STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-[#16161C]/80 border border-[#282834] hover:border-[#FFB800]/40 transition-colors"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline gap-1">
                  <span className={idx === 0 ? 'text-[#FFB800]' : idx === 1 ? 'text-[#00E5FF]' : idx === 2 ? 'text-emerald-400' : 'text-purple-400'}>
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
