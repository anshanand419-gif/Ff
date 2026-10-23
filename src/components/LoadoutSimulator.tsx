import React, { useState, useMemo } from 'react';
import { CHARACTERS, PASSIVE_SKILLS, WEAPONS, Character, Weapon, PassiveSkill } from '../data/gameData';
import { Shield, Zap, Sparkles, HeartPulse, Crosshair, Copy, Check, SlidersHorizontal, RefreshCw, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

export const LoadoutSimulator: React.FC = () => {
  const [activeCharId, setActiveCharId] = useState<string>('rusha');
  const [selectedPassives, setSelectedPassives] = useState<string[]>([
    'agile_fingers',
    'armor_pierce',
    'scavenger',
  ]);
  const [primaryWeaponId, setPrimaryWeaponId] = useState<string>('mp40');
  const [secondaryWeaponId, setSecondaryWeaponId] = useState<string>('m1887');
  const [copiedCode, setCopiedCode] = useState(false);

  // Active character
  const activeChar = CHARACTERS.find((c) => c.id === activeCharId) || CHARACTERS[0];
  const primaryWeapon = WEAPONS.find((w) => w.id === primaryWeaponId) || WEAPONS[0];
  const secondaryWeapon = WEAPONS.find((w) => w.id === secondaryWeaponId) || WEAPONS[1];

  // Dynamic calculations based on active + passives + weapons
  const calculatedStats = useMemo(() => {
    let speed = Math.round(activeChar.speedRating * 0.7 + primaryWeapon.mobility * 0.3);
    let armor = Math.round(activeChar.defenseRating * 0.7);
    let damage = Math.round((primaryWeapon.damage * 0.6 + secondaryWeapon.damage * 0.4));
    let healing = Math.round(activeChar.role === 'Support' ? 85 : 45);

    selectedPassives.forEach((pId) => {
      const p = PASSIVE_SKILLS.find((item) => item.id === pId);
      if (p) {
        if (p.statBonus.stat === 'speed') speed += p.statBonus.value;
        if (p.statBonus.stat === 'armor') armor += p.statBonus.value;
        if (p.statBonus.stat === 'damage') damage += p.statBonus.value;
        if (p.statBonus.stat === 'healing') healing += p.statBonus.value;
      }
    });

    return {
      speed: Math.min(100, speed),
      armor: Math.min(100, armor),
      damage: Math.min(100, damage),
      healing: Math.min(100, healing),
    };
  }, [activeChar, primaryWeapon, secondaryWeapon, selectedPassives]);

  // Handle passive toggle (limit max 3)
  const togglePassive = (id: string) => {
    sound.playClick();
    if (selectedPassives.includes(id)) {
      setSelectedPassives(selectedPassives.filter((p) => p !== id));
    } else {
      if (selectedPassives.length >= 3) {
        // replace first
        setSelectedPassives([...selectedPassives.slice(1), id]);
      } else {
        setSelectedPassives([...selectedPassives, id]);
      }
    }
  };

  // Preset loadouts
  const applyPreset = (presetName: string) => {
    sound.playSelect();
    if (presetName === 'rusher') {
      setActiveCharId('rusha');
      setSelectedPassives(['agile_fingers', 'armor_pierce', 'scavenger']);
      setPrimaryWeaponId('mp40');
      setSecondaryWeaponId('m1887');
    } else if (presetName === 'clash') {
      setActiveCharId('aegis');
      setSelectedPassives(['iron_body', 'agile_fingers', 'armor_pierce']);
      setPrimaryWeaponId('m1887');
      setSecondaryWeaponId('desert-eagle');
    } else if (presetName === 'sniper') {
      setActiveCharId('ghost');
      setSelectedPassives(['falcon_eye', 'silent_sprint', 'armor_pierce']);
      setPrimaryWeaponId('awm');
      setSecondaryWeaponId('mp40');
    } else if (presetName === 'support') {
      setActiveCharId('medic');
      setSelectedPassives(['scavenger', 'iron_body', 'agile_fingers']);
      setPrimaryWeaponId('vector');
      setSecondaryWeaponId('gloo-wall');
    }
  };

  const copyLoadoutCode = () => {
    sound.playClick();
    const code = `SIGMA-${activeChar.name.toUpperCase()}-${primaryWeapon.id}-${secondaryWeapon.id}-${selectedPassives.join('-')}`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="loadout" className="py-20 bg-[#0F0F12] border-b border-[#282834] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FFB800] font-bold">
              <SlidersHorizontal className="w-4 h-4 text-[#FFB800]" />
              Tactical Meta Simulator
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase italic tracking-tight mt-1">
              BATTLE LOADOUT <span className="text-[#00E5FF]">SIMULATOR</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Equip 1 active operative skill, combine 3 passive modules, and test gun pairings to preview calculated combat attributes before matchmaking.
            </p>
          </div>

          {/* Quick Presets Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1">Presets:</span>
            <button
              onClick={() => applyPreset('rusher')}
              className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-[#282834] text-xs font-display font-bold uppercase text-slate-300 hover:text-[#FFB800] hover:border-[#FFB800]/50 transition-colors"
            >
              Factory Rusher
            </button>
            <button
              onClick={() => applyPreset('clash')}
              className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-[#282834] text-xs font-display font-bold uppercase text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-colors"
            >
              Clash Squad Anchor
            </button>
            <button
              onClick={() => applyPreset('sniper')}
              className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-[#282834] text-xs font-display font-bold uppercase text-slate-300 hover:text-purple-400 hover:border-purple-400/50 transition-colors"
            >
              Ghost Sniper
            </button>
            <button
              onClick={() => applyPreset('support')}
              className="px-3 py-1.5 rounded-lg bg-[#16161C] border border-[#282834] text-xs font-display font-bold uppercase text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
            >
              Medic Healer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selectors (Slots) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Slot 1: Active Skill Character */}
            <div className="p-5 rounded-2xl bg-[#16161C] border border-[#282834]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#FFB800] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Slot 1: Active Operative (Pick 1)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Current: <strong className="text-white">{activeChar.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CHARACTERS.map((char) => {
                  const isActive = char.id === activeCharId;
                  return (
                    <button
                      key={char.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveCharId(char.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-[#1E1E26] border-[#FFB800] ring-1 ring-[#FFB800]/50'
                          : 'bg-[#0F0F12] border-[#282834] hover:border-[#3E3E50]'
                      }`}
                    >
                      <div className="font-display font-black text-lg text-white uppercase">
                        {char.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#FFB800] truncate">
                        {char.activeSkill.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {char.role}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot 2: 3 Passive Skills Multi-Select */}
            <div className="p-5 rounded-2xl bg-[#16161C] border border-[#282834]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Slot 2: Passive Modules ({selectedPassives.length}/3 Selected)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Tap to add or replace
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PASSIVE_SKILLS.map((passive) => {
                  const isChecked = selectedPassives.includes(passive.id);
                  return (
                    <button
                      key={passive.id}
                      onClick={() => togglePassive(passive.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'bg-[#1E1E26] border-[#00E5FF] ring-1 ring-[#00E5FF]/40'
                          : 'bg-[#0F0F12] border-[#282834] hover:border-[#3E3E50]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-base text-white uppercase">
                          {passive.name}
                        </span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold' : 'border-[#282834]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        {passive.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold">
                        +{passive.statBonus.value} {passive.statBonus.unit}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot 3: Weapons Combo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Weapon */}
              <div className="p-5 rounded-2xl bg-[#16161C] border border-[#282834]">
                <span className="text-xs font-mono text-white uppercase font-bold tracking-wider block mb-3">
                  Primary Weapon
                </span>
                <div className="space-y-2">
                  {WEAPONS.filter(w => w.category !== 'Utility' && w.category !== 'Pistol').map(wpn => (
                    <button
                      key={wpn.id}
                      onClick={() => {
                        sound.playClick();
                        setPrimaryWeaponId(wpn.id);
                      }}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs font-mono transition-all ${
                        primaryWeaponId === wpn.id
                          ? 'bg-[#1E1E26] border-[#FFB800] text-[#FFB800]'
                          : 'bg-[#0F0F12] border-[#282834] text-slate-300'
                      }`}
                    >
                      <span className="font-bold">{wpn.name}</span>
                      <span className="text-slate-500">{wpn.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Weapon */}
              <div className="p-5 rounded-2xl bg-[#16161C] border border-[#282834]">
                <span className="text-xs font-mono text-white uppercase font-bold tracking-wider block mb-3">
                  Secondary / Sidearm
                </span>
                <div className="space-y-2">
                  {WEAPONS.map(wpn => (
                    <button
                      key={wpn.id}
                      onClick={() => {
                        sound.playClick();
                        setSecondaryWeaponId(wpn.id);
                      }}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs font-mono transition-all ${
                        secondaryWeaponId === wpn.id
                          ? 'bg-[#1E1E26] border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#0F0F12] border-[#282834] text-slate-300'
                      }`}
                    >
                      <span className="font-bold">{wpn.name}</span>
                      <span className="text-slate-500">{wpn.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Total Attributes Summary Box */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#111116] border border-[#282834] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-[#282834]">
                <div>
                  <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">Dynamic Telemetry</span>
                  <h3 className="font-display font-black text-2xl text-white uppercase italic">
                    LOADOUT STATS
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-[#0F0F12] border border-[#282834] text-emerald-400 font-mono text-xs font-bold">
                  READY
                </div>
              </div>

              {/* Stat Meters */}
              <div className="space-y-4 py-5">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                    <span className="text-slate-400">Total Sprint Speed</span>
                    <span className="text-[#FFB800]">{calculatedStats.speed}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                    <div 
                      className="h-full bg-[#FFB800] rounded-full transition-all duration-300"
                      style={{ width: `${calculatedStats.speed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                    <span className="text-slate-400">Armor & Blast Negation</span>
                    <span className="text-[#00E5FF]">{calculatedStats.armor}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                    <div 
                      className="h-full bg-[#00E5FF] rounded-full transition-all duration-300"
                      style={{ width: `${calculatedStats.armor}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                    <span className="text-slate-400">Burst Damage Potential</span>
                    <span className="text-red-400">{calculatedStats.damage} DPS</span>
                  </div>
                  <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                    <div 
                      className="h-full bg-red-400 rounded-full transition-all duration-300"
                      style={{ width: `${calculatedStats.damage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold uppercase mb-1">
                    <span className="text-slate-400">Healing & Regen Rate</span>
                    <span className="text-emerald-400">{calculatedStats.healing} PTS</span>
                  </div>
                  <div className="h-2 w-full bg-[#0F0F12] rounded-full overflow-hidden border border-[#282834]">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${calculatedStats.healing}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Loadout Composition Recap */}
              <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-[#282834] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Operative:</span>
                  <span className="text-white font-bold">{activeChar.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Primary Gun:</span>
                  <span className="text-white font-bold">{primaryWeapon.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Secondary:</span>
                  <span className="text-white font-bold">{secondaryWeapon.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Utility Wall:</span>
                  <span className="text-[#00E5FF] font-bold">Gloo Wall (3x)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  onClick={copyLoadoutCode}
                  className="w-full py-3 rounded-xl bg-[#1E1E26] hover:bg-[#282834] border border-[#282834] text-white font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Loadout Code Copied!' : 'Copy Loadout Code'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playGunshot(primaryWeapon.soundType);
                  }}
                  className="w-full py-3 rounded-xl bg-[#FFB800] hover:bg-[#FFA000] text-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FFB800]/20"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Fire Combo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
