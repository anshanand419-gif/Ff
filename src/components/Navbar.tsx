import React, { useState } from 'react';
import { Download, Volume2, VolumeX, Menu, X, Shield, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Modes', href: '#modes' },
    { label: 'Characters', href: '#characters' },
    { label: 'Arsenal', href: '#arsenal' },
    { label: 'Drop Zones', href: '#map' },
    { label: 'Loadout Sim', href: '#loadout' },
    { label: 'System Specs', href: '#specs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F12]/95 backdrop-blur-md border-b border-[#282834]">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#FFB800]/10 via-[#00E5FF]/10 to-[#FFB800]/10 border-b border-[#282834]/60 py-1 px-4 text-center text-xs font-medium text-slate-300 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Season 01 Active: Cyber Infiltration</span>
        <span className="text-slate-500">·</span>
        <span className="text-[#FFB800] font-semibold">Claim 500 Free Diamonds & Rusha Skin</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFB800] to-[#FF8C00] flex items-center justify-center font-display font-black text-2xl text-black shadow-lg shadow-[#FFB800]/20 group-hover:scale-105 transition-transform">
            Σ
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-wider text-white uppercase italic leading-none flex items-center gap-1.5">
              SIGMA <span className="text-[#FFB800]">CLASH</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00E5FF] font-semibold">
              Battle Royale Mobile
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide uppercase text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => sound.playSelect()}
              className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0 hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg bg-[#16161C] border border-[#282834] text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00E5FF]" />}
          </button>

          {/* Download APK Primary Action Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDownload();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-display font-black text-base tracking-wider uppercase shadow-lg shadow-[#FFB800]/25 hover:shadow-[#FFB800]/40 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download APK</span>
            <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded font-mono font-bold">280MB</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#16161C] border border-[#282834] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16161C] border-b border-[#282834] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sound.playSelect();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md bg-[#0F0F12] border border-[#282834] text-sm font-semibold uppercase text-slate-300 hover:text-[#FFB800]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenDownload();
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-display font-black text-base uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#FFB800]/30"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download APK (280MB)</span>
          </button>
        </div>
      )}
    </header>
  );
};
