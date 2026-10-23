import React, { useState } from 'react';
import { DROP_ZONES, DropZone, GAME_IMAGES } from '../data/gameData';
import { MapPin, Skull, Crosshair, ShieldAlert, Award, Compass, Sparkles, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';

export const TacticalMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<DropZone>(DROP_ZONES[0]);

  return (
    <section id="map" className="py-20 bg-[#121217] border-b border-[#282834] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] font-bold">
              <Compass className="w-4 h-4 text-[#00E5FF]" />
              Bermuda Island Reconnaissance
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase italic tracking-tight mt-1">
              TACTICAL <span className="text-[#FFB800]">DROP ZONES</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Select key combat drop zones to analyze loot concentration, danger ratings, high-ground vantage points, and squad survivability routes.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300 bg-[#16161C] p-2 rounded-lg border border-[#282834]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span>Hot Drop (Tier S)</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] inline-block" />
              <span>Medium (Tier A)</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span>Low-Risk (Tier B)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Hologram Map Display */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-3 sm:p-5 relative overflow-hidden shadow-2xl">
              {/* Top Header inside Hologram Terminal */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#282834] text-xs font-mono">
                <span className="text-[#00E5FF] font-bold">SAT-CAM PROTOCOL: ACTIVE SIGHTLINE</span>
                <span className="text-slate-400">COORDINATES: BERMUDA 04-B</span>
              </div>

              {/* Map Canvas Frame */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/80 border border-[#282834] select-none group">
                <img
                  src={GAME_IMAGES.map}
                  alt="Tactical Battle Royale Map"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Grid Overlay lines */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #00E5FF 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Clickable Pins on Map */}
                {DROP_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedZone(zone);
                      }}
                      style={{
                        left: `${zone.xPercent}%`,
                        top: `${zone.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                    >
                      {/* Pulsing ring when selected */}
                      {isSelected && (
                        <span className="absolute -inset-3 rounded-full bg-[#FFB800]/40 animate-ping" />
                      )}

                      {/* Pin Button */}
                      <div className={`px-2.5 py-1 rounded-md text-[11px] font-display font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl transition-all ${
                        isSelected
                          ? 'bg-[#FFB800] text-black scale-110 ring-2 ring-white drop-shadow-[0_0_12px_rgba(255,184,0,0.8)]'
                          : 'bg-[#0F0F12]/90 text-white border border-[#282834] hover:border-[#00E5FF] hover:text-[#00E5FF]'
                      }`}>
                        <MapPin className={`w-3 h-3 ${isSelected ? 'fill-current' : 'text-[#00E5FF]'}`} />
                        <span>{zone.name.split(' ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer helper */}
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Click any pin or list item below to view tactical reconnaissance</span>
                <span className="text-[#00E5FF] font-bold">Safe Zone Phase: 2/5</span>
              </div>
            </div>

            {/* Quick Zone Selector Buttons List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {DROP_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedZone(zone);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-[#1E1E26] border-[#FFB800] text-[#FFB800]'
                        : 'bg-[#16161C] border-[#282834] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-display font-black text-sm uppercase text-white truncate">
                      {zone.name}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{zone.code}</span>
                      <span className={zone.dangerRating >= 4 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {zone.dangerRating}/5 Skulls
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Reconnaissance Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#282834]">
                <div>
                  <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold tracking-widest">
                    Zone Dossier [{selectedZone.code}]
                  </span>
                  <h3 className="font-display font-black text-3xl text-white uppercase italic">
                    {selectedZone.name}
                  </h3>
                </div>

                <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold uppercase ${
                  selectedZone.lootTier.includes('Tier S') 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : selectedZone.lootTier.includes('Tier A')
                    ? 'bg-[#FFB800]/10 border-[#FFB800]/30 text-[#FFB800]'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                }`}>
                  {selectedZone.lootTier}
                </div>
              </div>

              {/* Danger Rating meter */}
              <div className="py-4 border-b border-[#282834]">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Skull className="w-3.5 h-3.5 text-red-400" /> Hot-Drop Danger Rating
                  </span>
                  <span className="text-red-400 font-bold">{selectedZone.dangerRating} of 5 Skulls</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2 flex-1 rounded-sm ${
                        lvl <= selectedZone.dangerRating
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-sm shadow-red-500/40'
                          : 'bg-[#0F0F12] border border-[#282834]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Vantage Points & Weapon Pick */}
              <div className="space-y-4 py-4">
                <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-[#00E5FF]" /> Key Vantage Points
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    {selectedZone.vantagePoints}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#FFB800]" /> Recommended Weapon
                  </span>
                  <p className="text-xs text-[#FFB800] font-bold font-mono">
                    {selectedZone.recommendedWeapon}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Survivalist Guide & Rotation Tip
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedZone.tacticalTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
