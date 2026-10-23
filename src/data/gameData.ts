export interface Character {
  id: string;
  name: string;
  title: string;
  role: 'Rusher' | 'Defender' | 'Support' | 'Infiltrator' | 'Scout';
  activeSkill: {
    name: string;
    cooldown: string;
    description: string;
    effectStat: string;
  };
  lore: string;
  speedRating: number;
  defenseRating: number;
  utilityRating: number;
  themeColor: string;
}

export interface Weapon {
  id: string;
  name: string;
  category: 'SMG' | 'Shotgun' | 'Sniper' | 'Pistol' | 'Utility';
  damage: number;
  fireRate: number;
  range: number;
  mobility: number;
  magazine: number;
  reloadSpeed: number;
  description: string;
  soundType: 'smg' | 'shotgun' | 'sniper' | 'gloo';
  badge: string;
}

export interface PassiveSkill {
  id: string;
  name: string;
  description: string;
  statBonus: {
    stat: 'speed' | 'armor' | 'damage' | 'healing';
    value: number;
    unit: string;
  };
}

export interface DropZone {
  id: string;
  name: string;
  code: string;
  lootTier: 'Tier S (High)' | 'Tier A (Med)' | 'Tier B (Safe)';
  dangerRating: number; // 1-5
  vantagePoints: string;
  recommendedWeapon: string;
  tacticalTip: string;
  xPercent: number; // For interactive map pin coordinates on image
  yPercent: number;
}

export interface GameMode {
  id: string;
  title: string;
  matchDuration: string;
  playerCount: string;
  tagline: string;
  rules: string[];
  features: string[];
  accentColor: string;
}

export const GAME_IMAGES = {
  hero: '/src/assets/images/hero_battle_royale_1792689428814.jpg',
  clashSquad: '/src/assets/images/mode_clash_squad_1792689429653.jpg',
  rusha: '/src/assets/images/character_rusha_1792689429963.jpg',
  map: '/src/assets/images/bermuda_tactical_map_1792689431420.jpg',
  armory: '/src/assets/images/weapon_arsenal_showcase_1792689431869.jpg',
};

export const GAME_STATS = [
  { label: 'Total Downloads', value: '10M+', unit: 'verified APK installs' },
  { label: 'Player Rating', value: '4.8★', unit: 'from 450K+ reviews' },
  { label: 'Target Frame Rate', value: '60 FPS', unit: 'ultra-smooth render' },
  { label: 'Min RAM Requirement', value: '2 GB', unit: 'low-spec friendly' },
];

export const GAME_MODES: GameMode[] = [
  {
    id: 'battle-royale',
    title: 'Classic Battle Royale',
    matchDuration: '10 Minutes',
    playerCount: '50 Players',
    tagline: 'High-intensity skydiving, loot drops, and fast-paced survival on Bermuda Island.',
    rules: [
      '50 survivalists parachute onto a rapidly shrinking electric island grid.',
      'Scavenge tier-3 military vests, rare airdrop weapons, and gloo wall grenades.',
      'Eliminate rival squads or out-position them inside the safe boundary zone.',
      'Last survivor or squad standing claims the Sigma Champion trophy.'
    ],
    features: ['10-Min Fast Pace', 'Dynamic Airdrop Crates', 'Fast Healing Kits', 'Low-End Optimized'],
    accentColor: '#FFB800',
  },
  {
    id: 'clash-squad',
    title: '4v4 Clash Squad',
    matchDuration: '7 Fast Rounds',
    playerCount: '4 vs 4',
    tagline: 'Competitive round-based tactical economy, clutch firefights, and synchronized rushes.',
    rules: [
      'Two 4-player squads compete across 7 fast rounds in closed arena districts.',
      'Earn battle coins each round to purchase MP40s, M1887 shotguns, or utility barriers.',
      'No airdrops, pure gunplay skill and strategic gloo-wall push coordination.',
      'First team to win 4 rounds secures the competitive ranked victory.'
    ],
    features: ['In-Round Economy', 'Instant Respawn Next Round', 'Ranked Tiers', 'Voice Chat Ready'],
    accentColor: '#00E5FF',
  },
  {
    id: 'custom-room',
    title: 'Custom Room League',
    matchDuration: 'Host Defined',
    playerCount: '1v1 / 2v2 / 4v4',
    tagline: 'Host private scrims, tournament rules, unlimited gloo walls, and custom sensitivity.',
    rules: [
      'Host private lobbies with password protection for community tournaments.',
      'Toggle Unlimited Gloo Walls, Headshot-Only Mode, or No Armor presets.',
      'Spectator mode with free-cam broadcasting and live damage telemetry.',
      'Direct room ID sharing to invite friends in under 5 seconds.'
    ],
    features: ['Unlimited Gloo Wall', 'Zero Delay Spectator', '1v1 Duel Mode', 'Custom Damage Multipliers'],
    accentColor: '#A855F7',
  },
];

export const CHARACTERS: Character[] = [
  {
    id: 'rusha',
    name: 'Rusha',
    title: 'The Cyber Sprint Specialist',
    role: 'Rusher',
    activeSkill: {
      name: 'Speed Surge',
      cooldown: '35s',
      description: 'Increases sprint speed by +22% for 6 seconds and grants 15% instant reload speed on dash.',
      effectStat: '+22% Sprint & Fast Reload',
    },
    lore: 'An agile combat operative trained in neo-city rooftops. Rusha excels at breaching defensive fortifications and dominating close-quarter SMG gunfights before opponents can erect barriers.',
    speedRating: 95,
    defenseRating: 65,
    utilityRating: 70,
    themeColor: '#FFB800',
  },
  {
    id: 'aegis',
    name: 'Aegis',
    title: 'Hexagonal Shield Sentinel',
    role: 'Defender',
    activeSkill: {
      name: 'Kinetic Forcefield',
      cooldown: '45s',
      description: 'Deploys an instant 500 HP stationary hexagonal energy dome that absorbs incoming gunfire while allowing squad members to shoot outward.',
      effectStat: '500 HP 360° Barrier',
    },
    lore: 'Former military defense engineer outfitted with kinetic dampener plating. Aegis provides crucial cover when caught in open fields or reviving fallen teammates in late-game circles.',
    speedRating: 60,
    defenseRating: 98,
    utilityRating: 85,
    themeColor: '#00E5FF',
  },
  {
    id: 'medic',
    name: 'Vitalis (Medic)',
    title: 'Bio-Aura Resonator',
    role: 'Support',
    activeSkill: {
      name: 'Aura Surge',
      cooldown: '40s',
      description: 'Emits a 8-meter healing frequency restoring 5 HP/sec for all teammates and boosting squad speed by 12% for 10 seconds.',
      effectStat: '5 HP/s Squad Regeneration',
    },
    lore: 'Field combat physician equipped with high-yield nanomachine emitters. The pillar of any squad, turning the tide of attrition battles with uninterrupted squad sustainability.',
    speedRating: 75,
    defenseRating: 80,
    utilityRating: 95,
    themeColor: '#10B981',
  },
  {
    id: 'ghost',
    name: 'Ghost',
    title: 'Shadow Infiltrator',
    role: 'Infiltrator',
    activeSkill: {
      name: 'Phantom Step',
      cooldown: '50s',
      description: 'Muffles footstep audio by 80%, erases mini-map radar markers, and grants +15% silent damage from behind for 12 seconds.',
      effectStat: 'Silent Movement & Stealth',
    },
    lore: 'Silent assassin specialized in flanking enemy squads engaged in firefights. Once Ghost triggers Phantom Step, enemies cannot hear approaching steps until it is too late.',
    speedRating: 90,
    defenseRating: 55,
    utilityRating: 88,
    themeColor: '#EC4899',
  },
];

export const WEAPONS: Weapon[] = [
  {
    id: 'mp40',
    name: 'MP40 Neon Fury',
    category: 'SMG',
    damage: 38,
    fireRate: 96,
    range: 42,
    mobility: 88,
    magazine: 32,
    reloadSpeed: 74,
    description: 'The premier close-range SMG. Unrivaled cyclic fire rate that melts enemy armor in split seconds during face-to-face house pushes.',
    soundType: 'smg',
    badge: 'Rusher Favorite',
  },
  {
    id: 'm1887',
    name: 'M1887 Volt Rage',
    category: 'Shotgun',
    damage: 100,
    fireRate: 44,
    range: 22,
    mobility: 82,
    magazine: 2,
    reloadSpeed: 58,
    description: 'Double-barrel devastating shotgun. Lethal 2-tap headshot capability that punishes rushers jumping around gloo walls.',
    soundType: 'shotgun',
    badge: '1-Shot Burst',
  },
  {
    id: 'awm',
    name: 'AWM Ghost Sniper',
    category: 'Sniper',
    damage: 98,
    fireRate: 26,
    range: 96,
    mobility: 46,
    magazine: 5,
    reloadSpeed: 42,
    description: 'Legendary bolt-action sniper rifle. Capable of dropping an enemy wearing level 3 helmet with a single calculated headshot.',
    soundType: 'sniper',
    badge: 'Heavy Airdrop',
  },
  {
    id: 'gloo-wall',
    name: 'Gloo Wall Projector',
    category: 'Utility',
    damage: 0,
    fireRate: 100,
    range: 15,
    mobility: 95,
    magazine: 3,
    reloadSpeed: 90,
    description: 'Instant crystalline ice barrier with 800 HP. The hallmark tactical tool for defending against open crossfires and trapping enemies.',
    soundType: 'gloo',
    badge: 'Essential Defense',
  },
  {
    id: 'desert-eagle',
    name: 'Desert Eagle Caliber',
    category: 'Pistol',
    damage: 66,
    fireRate: 54,
    range: 52,
    mobility: 90,
    magazine: 7,
    reloadSpeed: 78,
    description: 'High-caliber precision sidearm that rewards precise one-tap flick shots in first-round Clash Squad encounters.',
    soundType: 'shotgun',
    badge: 'Pistol Round King',
  },
  {
    id: 'vector',
    name: 'Vector Akimbo',
    category: 'SMG',
    damage: 32,
    fireRate: 99,
    range: 32,
    mobility: 94,
    magazine: 60,
    reloadSpeed: 62,
    description: 'Dual-wield rapid bullet hose with intense suppression capability for clearing tight corridor bunkers.',
    soundType: 'smg',
    badge: 'Dual Wield',
  },
];

export const PASSIVE_SKILLS: PassiveSkill[] = [
  {
    id: 'agile_fingers',
    name: 'Agile Fingers',
    description: 'Increases weapon reload speed by +25% across all firearms.',
    statBonus: { stat: 'speed', value: 8, unit: '% Reload Spd' }
  },
  {
    id: 'armor_pierce',
    name: 'Armor Piercer',
    description: 'Shots bypass 20% of enemy vest durability and damage reduction.',
    statBonus: { stat: 'damage', value: 15, unit: '% Penetration' }
  },
  {
    id: 'falcon_eye',
    name: 'Falcon Eye',
    description: 'Increases precision headshot damage multiplier by +18% on rifles & snipers.',
    statBonus: { stat: 'damage', value: 18, unit: '% Crit Boost' }
  },
  {
    id: 'scavenger',
    name: 'Scavenger Core',
    description: 'Instantly recovers 25 HP and replenishes 1 Gloo Wall grenade upon enemy elimination.',
    statBonus: { stat: 'healing', value: 14, unit: '% Combat HP' }
  },
  {
    id: 'iron_body',
    name: 'Iron Plating',
    description: 'Reduces explosive blast and shotgun spread damage taken by 16%.',
    statBonus: { stat: 'armor', value: 20, unit: '% Damage Negation' }
  },
  {
    id: 'silent_sprint',
    name: 'Silent Cadence',
    description: 'Footstep detection radius on enemy mini-maps reduced by 35%.',
    statBonus: { stat: 'speed', value: 10, unit: '% Stealth Speed' }
  },
];

export const DROP_ZONES: DropZone[] = [
  {
    id: 'factory',
    name: 'Factory Area',
    code: 'ZONE-07',
    lootTier: 'Tier S (High)',
    dangerRating: 5,
    vantagePoints: 'Roof crane catwalk, exhaust stacks, interior iron stairway',
    recommendedWeapon: 'MP40 or M1887 shotgun',
    tacticalTip: 'Hot drop territory. Land directly on top of the factory roof to secure initial crates, then use Gloo Walls to jump down into the main hall safely.',
    xPercent: 68,
    yPercent: 64,
  },
  {
    id: 'peak',
    name: 'Peak Mountain',
    code: 'ELEV-215M',
    lootTier: 'Tier S (High)',
    dangerRating: 5,
    vantagePoints: 'Radar dish platform, mansion roof, hillside pine tree clusters',
    recommendedWeapon: 'AWM Sniper & MP40',
    tacticalTip: 'The geographical heart of Bermuda. Holding the high altitude mansion gives clear sightlines over rotations heading toward Clock Tower or Mill.',
    xPercent: 54,
    yPercent: 36,
  },
  {
    id: 'clock-tower',
    name: 'Clock Tower Town',
    code: 'SECTOR-C3',
    lootTier: 'Tier A (Med)',
    dangerRating: 4,
    vantagePoints: 'Clock tower spire window, residential balcony walkways',
    recommendedWeapon: 'M1887 Shotgun & Gloo Wall',
    tacticalTip: 'Urban labyrinth with intense staircase battles. Always watch windows when crossing the center stone plaza. High level 3 vest spawn rate.',
    xPercent: 32,
    yPercent: 58,
  },
  {
    id: 'the-mill',
    name: 'The Mill',
    code: 'HILL-NORTH',
    lootTier: 'Tier A (Med)',
    dangerRating: 3,
    vantagePoints: 'Upper lumber warehouse, steep drainage pipe slope',
    recommendedWeapon: 'AR / Sniper combo',
    tacticalTip: 'Ideal squad landing zone with condensed loot in the dual warehouse. Climb the hillside ramp quickly to catch squads rotating out of the coastline.',
    xPercent: 44,
    yPercent: 21,
  },
  {
    id: 'pochinok',
    name: 'Pochinok Houses',
    code: 'RES-SOUTH',
    lootTier: 'Tier B (Safe)',
    dangerRating: 2,
    vantagePoints: 'Two-story green houses, stone fence corners',
    recommendedWeapon: 'SMG & Assault Rifle',
    tacticalTip: 'Consistent, lower-risk landing area with enough loot to fully equip a 4-man squad before pushing toward the central circle.',
    xPercent: 25,
    yPercent: 42,
  },
  {
    id: 'shipyard',
    name: 'Coastal Shipyard',
    code: 'PORT-BAY',
    lootTier: 'Tier A (Med)',
    dangerRating: 3,
    vantagePoints: 'Yellow cargo gantry cranes, container stack summits',
    recommendedWeapon: 'Sniper & Desert Eagle',
    tacticalTip: 'Use launch pads to catapult directly into high crane perches for long-range surveillance across the ocean channel.',
    xPercent: 78,
    yPercent: 46,
  },
];

export const SYSTEM_SPECS = {
  minimum: [
    { label: 'Operating System', value: 'Android 5.0 (Lollipop) or above' },
    { label: 'Processor', value: 'Quad-Core 1.5 GHz or equivalent' },
    { label: 'RAM Memory', value: '2 GB RAM' },
    { label: 'Storage Required', value: '1.2 GB available disk space' },
    { label: 'Target Frame Rate', value: '30 - 45 FPS (Smooth Graphics)' },
    { label: 'Supported Devices', value: 'Snapdragon 400+, MediaTek Helio A22+' },
  ],
  recommended: [
    { label: 'Operating System', value: 'Android 10.0 / 13.0 / 14.0+' },
    { label: 'Processor', value: 'Octa-Core 2.4 GHz (Snapdragon 700+ / Dimensity)' },
    { label: 'RAM Memory', value: '4 GB RAM or 6 GB RAM' },
    { label: 'Storage Required', value: '2.5 GB high-speed UFS storage' },
    { label: 'Target Frame Rate', value: '60 - 90 FPS (Ultra / Vivid HD mode)' },
    { label: 'Supported Devices', value: 'Snapdragon 778G+, Dimensity 8000+, Tensor' },
  ],
};
