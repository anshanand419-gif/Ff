import React, { useState } from 'react';
import { CHARACTERS, WEAPONS, Character, Weapon, GAME_IMAGES } from '../data/gameData';
import { Zap, Shield, HeartPulse, Crosshair, Sparkles, Volume2, Gauge, Flame, Check, Radio } from 'lucide-react';
import { sound } from '../utils/audio';

export const CharacterAndArsenal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'characters' | 'weapons'>('characters');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(WEAPONS[0]);
  const [isFiring, setIsFiring] = useState(false);

  const handleFireTest = () => {
    setIsFiring(true);
    sound.playGunshot(selectedWeapon.soundType);
    setTimeout(() => setIsFiring(false), 250);
  };

  return (
    <section id="characters" className="py-20 bg-[#121217] border-b border-[#282834] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] font-bold">
              <Crosshair className="w-4 h-4 text-[#00E5FF]" />
              Battlefield Meta & Equipment
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase italic tracking-tight mt-1">
              OPERATIVES & <span className="text-[#FFB800]">ARSENAL</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Master active combat skills and fine-tune your loadout with high-velocity SMGs, one-shot shotguns, and tactical gloo wall barriers.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-[#16161C] border border-[#282834] rounded-xl self-start md:self-auto">
            <button
              onClick={() => {
                sound.playSelect();
                setActiveTab('characters');
              }}
              className={`px-6 py-2.5 rounded-lg font-display font-black text-sm uppercase tracking-wider transition-all ${
                activeTab === 'characters'
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black shadow-lg shadow-[#FFB800]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Operatives (Skills)
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setActiveTab('weapons');
              }}
              className={`px-6 py-2.5 rounded-lg font-display font-black text-sm uppercase tracking-wider transition-all ${
                activeTab === 'weapons'
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#0284C7] text-black shadow-lg shadow-[#00E5FF]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Weapons & Armory
            </button>
          </div>
        </div>

        {/* TAB 1: OPERATIVES SHOWCASE */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Character Selector Column */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Select Active Operative
              </span>
              {CHARACTERS.map((char) => {
                const isSelected = selectedCharacter.id === char.id;
                return (
                  <button
                    key={char.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCharacter(char);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#1E1E26] border-[#FFB800] shadow-lg shadow-[#FFB800]/10'
                        : 'bg-[#16161C] border-[#282834] hover:border-[#3E3E50]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-display font-black text-lg transition-transform group-hover:scale-105 ${
                        isSelected ? 'bg-[#FFB800] text-black' : 'bg-[#0F0F12] text-slate-300 border border-[#282834]'
                      }`}>
                        {char.role === 'Rusher' ? <Zap className="w-5 h-5" /> : char.role === 'Defender' ? <Shield className="w-5 h-5" /> : char.role === 'Support' ? <HeartPulse className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-xl text-white uppercase">
                            {char.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-[#282834]">
                            {char.role}
                          </span>
                        </div>
                        <span className="text-xs text-[#FFB800] font-medium block">
                          {char.activeSkill.name} ({char.activeSkill.cooldown})
                        </span>
                      </div>
                    </div>

                    <div className={`text-xs font-mono font-bold ${isSelected ? 'text-[#FFB800]' : 'text-slate-600'}`}>
                      {isSelected ? 'ACTIVE' : 'SELECT'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Character Showcase Card with Visual */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-6 sm:p-8 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Character Concept Portrait */}
                  <div className="md:col-span-5 relative aspect-[3/4] rounded-xl overflow-hidden bg-black/60 border border-[#282834]">
                    <img
                      src={GAME_IMAGES.rusha}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="font-display font-black text-2xl text-white uppercase italic tracking-wider block">
                        {selectedCharacter.name}
                      </span>
                      <span className="text-xs font-mono text-[#FFB800]">
                        {selectedCharacter.title}
                      </span>
                    </div>
                  </div>

                  {/* Character Abilities & Stat Readout */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase font-bold">
                        <Zap className="w-3.5 h-3.5" /> Active Battle Skill
                      </div>
                      <h3 className="font-display font-black text-3xl text-white uppercase italic mt-1">
                        {selectedCharacter.activeSkill.name}
                      </h3>
                      <div className="mt-1 text-xs font-mono text-slate-400">
                        Cooldown: <span className="text-[#FFB800] font-bold">{selectedCharacter.activeSkill.cooldown}</span>
                        <span className="mx-2">·</span>
                        Effect: <span className="text-emerald-400 font-bold">{selectedCharacter.activeSkill.effectStat}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed bg-[#0F0F12] p-4 rounded-xl border border-[#282834]">
                      {selectedCharacter.activeSkill.description}
                    </p>

                    {/* Operative Ratings */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                          <span className="text-slate-400">Sprint & Mobility</span>
                          <span className="text-[#FFB800]">{selectedCharacter.speedRating} / 100</span>
                        </div>
                        <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FFB800] to-[#FFA000] rounded-full transition-all duration-500"
                            style={{ width: `${selectedCharacter.speedRating}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                          <span className="text-slate-400">Defense & Armor</span>
                          <span className="text-[#00E5FF]">{selectedCharacter.defenseRating} / 100</span>
                        </div>
                        <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                          <div 
                            className="h-full bg-gradient-to-r from-[#00E5FF] to-[#0284C7] rounded-full transition-all duration-500"
                            style={{ width: `${selectedCharacter.defenseRating}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                          <span className="text-slate-400">Tactical Utility</span>
                          <span className="text-purple-400">{selectedCharacter.utilityRating} / 100</span>
                        </div>
                        <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${selectedCharacter.utilityRating}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARSENAL & WEAPONS SHOWCASE */}
        {activeTab === 'weapons' && (
          <div id="arsenal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Weapon Selector */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Select Firearm or Tactical Utility
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {WEAPONS.map((wpn) => {
                  const isSelected = selectedWeapon.id === wpn.id;
                  return (
                    <button
                      key={wpn.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedWeapon(wpn);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1E1E26] border-[#00E5FF] shadow-lg shadow-[#00E5FF]/10'
                          : 'bg-[#16161C] border-[#282834] hover:border-[#3E3E50]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-lg text-white uppercase">
                            {wpn.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-slate-400">
                          <span className="text-[#00E5FF]">{wpn.category}</span>
                          <span>·</span>
                          <span>Dmg: {wpn.damage}</span>
                          <span>·</span>
                          <span>RPM: {wpn.fireRate}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-[#FFB800] border border-[#FFB800]/30 font-bold">
                        {wpn.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weapon Detail Inspector */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-6 sm:p-8">
                {/* Armory Header Banner */}
                <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-black mb-6 border border-[#282834]">
                  <img
                    src={GAME_IMAGES.armory}
                    alt="Armory Weapons Showcase"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161C] via-[#16161C]/40 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold tracking-wider">
                        Class: {selectedWeapon.category}
                      </span>
                      <h3 className="font-display font-black text-3xl text-white uppercase italic">
                        {selectedWeapon.name}
                      </h3>
                    </div>

                    {/* Test Fire Audio Button */}
                    <button
                      onClick={handleFireTest}
                      disabled={isFiring}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-display font-black text-sm uppercase tracking-wider transition-all ${
                        isFiring 
                          ? 'bg-red-500 text-white scale-95 shadow-red-500/50' 
                          : 'bg-[#FFB800] text-black hover:bg-[#FFA000] shadow-md shadow-[#FFB800]/30'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isFiring ? 'FIRING...' : 'Test Fire SFX'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-[#0F0F12] p-4 rounded-xl border border-[#282834] mb-6">
                  {selectedWeapon.description}
                </p>

                {/* 6 Grid Weapon Stat Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Damage</span>
                      <span className="text-white font-bold">{selectedWeapon.damage}</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${selectedWeapon.damage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Fire Rate (RPM)</span>
                      <span className="text-white font-bold">{selectedWeapon.fireRate}</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-[#FFB800] rounded-full" style={{ width: `${selectedWeapon.fireRate}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Effective Range</span>
                      <span className="text-white font-bold">{selectedWeapon.range}</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-[#00E5FF] rounded-full" style={{ width: `${selectedWeapon.range}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Mobility</span>
                      <span className="text-white font-bold">{selectedWeapon.mobility}</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${selectedWeapon.mobility}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Magazine Capacity</span>
                      <span className="text-white font-bold">{selectedWeapon.magazine} rounds</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.min(100, selectedWeapon.magazine * 1.6)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                      <span className="text-slate-400">Reload Speed</span>
                      <span className="text-white font-bold">{selectedWeapon.reloadSpeed}</span>
                    </div>
                    <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedWeapon.reloadSpeed}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
