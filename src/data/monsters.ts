/**
 * monsters.ts — Data model for all 42 monsters in Monsters World.
 * 7 monsters per type: fire, water, psychic, plant, dragon, electric.
 */

export type MonsterType = 'fire' | 'water' | 'psychic' | 'plant' | 'dragon' | 'electric';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface MonsterStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface MonsterAbility {
  name: string;
  type: MonsterType;
  damage: number;
  accuracy: number; // 0-100
}

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  rarity: Rarity;
  stats: MonsterStats;
  abilities: MonsterAbility[];
  evolution: {
    name: string;
    requiredHits: number;
  } | null;
  emoji: string;
  color: string;
}

/* ── Type & rarity colour maps ──────────────────────────────── */

export const TYPE_COLORS: Record<MonsterType, string> = {
  fire: '#ef4444',
  water: '#3b82f6',
  psychic: '#a855f7',
  plant: '#22c55e',
  dragon: '#f59e0b',
  electric: '#eab308',
};

export const TYPE_EMOJIS: Record<MonsterType, string> = {
  fire: '🔥',
  water: '💧',
  psychic: '🔮',
  plant: '🌿',
  dragon: '🐉',
  electric: '⚡',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#a0a0a0',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario',
};

export const TYPE_LABELS: Record<MonsterType, string> = {
  fire: 'Fuego',
  water: 'Agua',
  psychic: 'Psíquico',
  plant: 'Planta',
  dragon: 'Dragón',
  electric: 'Eléctrico',
};

/* ── All 42 Monsters ────────────────────────────────────────── */

export const MONSTERS: Monster[] = [
  // ═══════════════════ FIRE ═══════════════════
  {
    id: 'ignisaurio',
    name: 'Ignisaurio',
    type: 'fire',
    rarity: 'common',
    stats: { hp: 80, attack: 60, defense: 40, speed: 50 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
    ],
    evolution: { name: 'Ignisaurio Typhon', requiredHits: 50 },
    emoji: '🦖',
    color: '#ef4444',
  },
  {
    id: 'emberion',
    name: 'Emberion',
    type: 'fire',
    rarity: 'rare',
    stats: { hp: 90, attack: 70, defense: 45, speed: 55 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
      { name: 'Giro Fuego', type: 'fire', damage: 35, accuracy: 75 },
    ],
    evolution: { name: 'Infernion', requiredHits: 75 },
    emoji: '🔥',
    color: '#ef4444',
  },
  {
    id: 'pyraxion',
    name: 'Pyraxion',
    type: 'fire',
    rarity: 'epic',
    stats: { hp: 100, attack: 80, defense: 50, speed: 60 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
      { name: 'Giro Fuego', type: 'fire', damage: 35, accuracy: 75 },
      { name: 'Lluvia Ígnea', type: 'fire', damage: 50, accuracy: 70 },
    ],
    evolution: { name: 'Pyraxion Omega', requiredHits: 100 },
    emoji: '🌋',
    color: '#ef4444',
  },
  {
    id: 'volcanos',
    name: 'Volcanos',
    type: 'fire',
    rarity: 'legendary',
    stats: { hp: 120, attack: 90, defense: 60, speed: 55 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
      { name: 'Giro Fuego', type: 'fire', damage: 35, accuracy: 75 },
      { name: 'Lluvia Ígnea', type: 'fire', damage: 50, accuracy: 70 },
    ],
    evolution: null,
    emoji: '☄️',
    color: '#ef4444',
  },
  {
    id: 'cinderion',
    name: 'Cinderion',
    type: 'fire',
    rarity: 'common',
    stats: { hp: 75, attack: 55, defense: 35, speed: 55 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
    ],
    evolution: { name: 'Cinderion Blaze', requiredHits: 50 },
    emoji: '🕯️',
    color: '#ef4444',
  },
  {
    id: 'blazodon',
    name: 'Blazodon',
    type: 'fire',
    rarity: 'rare',
    stats: { hp: 95, attack: 75, defense: 50, speed: 50 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
      { name: 'Giro Fuego', type: 'fire', damage: 35, accuracy: 75 },
    ],
    evolution: { name: 'Blazodon Titan', requiredHits: 75 },
    emoji: '🦤',
    color: '#ef4444',
  },
  {
    id: 'ignaroth',
    name: 'Ignaroth',
    type: 'fire',
    rarity: 'epic',
    stats: { hp: 105, attack: 85, defense: 55, speed: 58 },
    abilities: [
      { name: 'Llama', type: 'fire', damage: 20, accuracy: 90 },
      { name: 'Brasas', type: 'fire', damage: 25, accuracy: 80 },
      { name: 'Giro Fuego', type: 'fire', damage: 35, accuracy: 75 },
      { name: 'Lluvia Ígnea', type: 'fire', damage: 50, accuracy: 70 },
    ],
    evolution: { name: 'Ignaroth Eternal', requiredHits: 100 },
    emoji: '👹',
    color: '#ef4444',
  },

  // ═══════════════════ WATER ═══════════════════
  {
    id: 'tidalon',
    name: 'Tidalon',
    type: 'water',
    rarity: 'common',
    stats: { hp: 85, attack: 55, defense: 50, speed: 45 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
    ],
    evolution: { name: 'Tidalon Draken', requiredHits: 50 },
    emoji: '🐋',
    color: '#3b82f6',
  },
  {
    id: 'aquarion',
    name: 'Aquarion',
    type: 'water',
    rarity: 'rare',
    stats: { hp: 95, attack: 60, defense: 55, speed: 50 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
      { name: 'Hidro', type: 'water', damage: 30, accuracy: 80 },
    ],
    evolution: { name: 'Abyssion', requiredHits: 75 },
    emoji: '🐠',
    color: '#3b82f6',
  },
  {
    id: 'neptunix',
    name: 'Neptunix',
    type: 'water',
    rarity: 'epic',
    stats: { hp: 105, attack: 70, defense: 60, speed: 55 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
      { name: 'Hidro', type: 'water', damage: 30, accuracy: 80 },
      { name: 'Tsunami', type: 'water', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Neptunix Prime', requiredHits: 100 },
    emoji: '🌊',
    color: '#3b82f6',
  },
  {
    id: 'leviathan',
    name: 'Leviathan',
    type: 'water',
    rarity: 'legendary',
    stats: { hp: 130, attack: 75, defense: 65, speed: 50 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
      { name: 'Hidro', type: 'water', damage: 30, accuracy: 80 },
      { name: 'Tsunami', type: 'water', damage: 45, accuracy: 70 },
    ],
    evolution: null,
    emoji: '🐉',
    color: '#3b82f6',
  },
  {
    id: 'coralion',
    name: 'Coralion',
    type: 'water',
    rarity: 'common',
    stats: { hp: 80, attack: 50, defense: 45, speed: 48 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
    ],
    evolution: { name: 'Coralion Tide', requiredHits: 50 },
    emoji: '🪸',
    color: '#3b82f6',
  },
  {
    id: 'wavecrest',
    name: 'Wavecrest',
    type: 'water',
    rarity: 'rare',
    stats: { hp: 100, attack: 65, defense: 60, speed: 52 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
      { name: 'Hidro', type: 'water', damage: 30, accuracy: 80 },
    ],
    evolution: { name: 'Wavecrest Abyss', requiredHits: 75 },
    emoji: '🌊',
    color: '#3b82f6',
  },
  {
    id: 'abyssalos',
    name: 'Abyssalos',
    type: 'water',
    rarity: 'epic',
    stats: { hp: 110, attack: 75, defense: 65, speed: 55 },
    abilities: [
      { name: 'Chorro', type: 'water', damage: 18, accuracy: 90 },
      { name: 'Burbuja', type: 'water', damage: 22, accuracy: 85 },
      { name: 'Hidro', type: 'water', damage: 30, accuracy: 80 },
      { name: 'Tsunami', type: 'water', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Abyssalos Eternal', requiredHits: 100 },
    emoji: '🦑',
    color: '#3b82f6',
  },

  // ═══════════════════ PSYCHIC ═══════════════════
  {
    id: 'menthix',
    name: 'Menthix',
    type: 'psychic',
    rarity: 'common',
    stats: { hp: 70, attack: 50, defense: 45, speed: 60 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
    ],
    evolution: { name: 'Menthix Storm', requiredHits: 50 },
    emoji: '🧠',
    color: '#a855f7',
  },
  {
    id: 'cerebrix',
    name: 'Cerebrix',
    type: 'psychic',
    rarity: 'rare',
    stats: { hp: 80, attack: 60, defense: 50, speed: 65 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
      { name: 'Mente', type: 'psychic', damage: 30, accuracy: 75 },
    ],
    evolution: { name: 'Psionex', requiredHits: 75 },
    emoji: '🔮',
    color: '#a855f7',
  },
  {
    id: 'zenithos',
    name: 'Zenithos',
    type: 'psychic',
    rarity: 'epic',
    stats: { hp: 90, attack: 70, defense: 55, speed: 70 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
      { name: 'Mente', type: 'psychic', damage: 30, accuracy: 75 },
      { name: 'Telekinesis', type: 'psychic', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Zenithos Supreme', requiredHits: 100 },
    emoji: '👁️',
    color: '#a855f7',
  },
  {
    id: 'oraculos',
    name: 'Oraculos',
    type: 'psychic',
    rarity: 'legendary',
    stats: { hp: 110, attack: 80, defense: 60, speed: 65 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
      { name: 'Mente', type: 'psychic', damage: 30, accuracy: 75 },
      { name: 'Telekinesis', type: 'psychic', damage: 45, accuracy: 70 },
    ],
    evolution: null,
    emoji: '🌀',
    color: '#a855f7',
  },
  {
    id: 'phrenix',
    name: 'Phrenix',
    type: 'psychic',
    rarity: 'common',
    stats: { hp: 65, attack: 45, defense: 40, speed: 62 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
    ],
    evolution: { name: 'Phrenix Surge', requiredHits: 50 },
    emoji: '🦊',
    color: '#a855f7',
  },
  {
    id: 'mindarius',
    name: 'Mindarius',
    type: 'psychic',
    rarity: 'rare',
    stats: { hp: 85, attack: 65, defense: 55, speed: 68 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
      { name: 'Mente', type: 'psychic', damage: 30, accuracy: 75 },
    ],
    evolution: { name: 'Mindarius Prime', requiredHits: 75 },
    emoji: '🦉',
    color: '#a855f7',
  },
  {
    id: 'psylordon',
    name: 'Psylordon',
    type: 'psychic',
    rarity: 'epic',
    stats: { hp: 95, attack: 75, defense: 60, speed: 72 },
    abilities: [
      { name: 'Onda', type: 'psychic', damage: 18, accuracy: 90 },
      { name: 'Confusión', type: 'psychic', damage: 22, accuracy: 80 },
      { name: 'Mente', type: 'psychic', damage: 30, accuracy: 75 },
      { name: 'Telekinesis', type: 'psychic', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Psylordon Eternal', requiredHits: 100 },
    emoji: '🐱',
    color: '#a855f7',
  },

  // ═══════════════════ PLANT ═══════════════════
  {
    id: 'floravex',
    name: 'Floravex',
    type: 'plant',
    rarity: 'common',
    stats: { hp: 85, attack: 50, defense: 55, speed: 40 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
    ],
    evolution: { name: 'Floravex Titan', requiredHits: 50 },
    emoji: '🌸',
    color: '#22c55e',
  },
  {
    id: 'thornix',
    name: 'Thornix',
    type: 'plant',
    rarity: 'rare',
    stats: { hp: 95, attack: 55, defense: 60, speed: 45 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
      { name: 'Veneno', type: 'plant', damage: 28, accuracy: 80 },
    ],
    evolution: { name: 'Verdanox', requiredHits: 75 },
    emoji: '🌵',
    color: '#22c55e',
  },
  {
    id: 'sylvanex',
    name: 'Sylvanex',
    type: 'plant',
    rarity: 'epic',
    stats: { hp: 105, attack: 65, defense: 65, speed: 50 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
      { name: 'Veneno', type: 'plant', damage: 28, accuracy: 80 },
      { name: 'Raíz', type: 'plant', damage: 40, accuracy: 75 },
    ],
    evolution: { name: 'Sylvanex Eternal', requiredHits: 100 },
    emoji: '🌳',
    color: '#22c55e',
  },
  {
    id: 'dryadon',
    name: 'Dryadon',
    type: 'plant',
    rarity: 'legendary',
    stats: { hp: 125, attack: 70, defense: 70, speed: 45 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
      { name: 'Veneno', type: 'plant', damage: 28, accuracy: 80 },
      { name: 'Raíz', type: 'plant', damage: 40, accuracy: 75 },
    ],
    evolution: null,
    emoji: '🌲',
    color: '#22c55e',
  },
  {
    id: 'leafion',
    name: 'Leafion',
    type: 'plant',
    rarity: 'common',
    stats: { hp: 80, attack: 45, defense: 50, speed: 42 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
    ],
    evolution: { name: 'Leafion Bloom', requiredHits: 50 },
    emoji: '🍃',
    color: '#22c55e',
  },
  {
    id: 'thornador',
    name: 'Thornador',
    type: 'plant',
    rarity: 'rare',
    stats: { hp: 100, attack: 60, defense: 65, speed: 48 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
      { name: 'Veneno', type: 'plant', damage: 28, accuracy: 80 },
    ],
    evolution: { name: 'Thornador Prime', requiredHits: 75 },
    emoji: '🥀',
    color: '#22c55e',
  },
  {
    id: 'verdanox',
    name: 'Verdanox',
    type: 'plant',
    rarity: 'epic',
    stats: { hp: 110, attack: 70, defense: 70, speed: 52 },
    abilities: [
      { name: 'Espora', type: 'plant', damage: 18, accuracy: 90 },
      { name: 'Látigo', type: 'plant', damage: 22, accuracy: 85 },
      { name: 'Veneno', type: 'plant', damage: 28, accuracy: 80 },
      { name: 'Raíz', type: 'plant', damage: 40, accuracy: 75 },
    ],
    evolution: { name: 'Verdanox Eternal', requiredHits: 100 },
    emoji: '🌳',
    color: '#22c55e',
  },

  // ═══════════════════ DRAGON ═══════════════════
  {
    id: 'drakorex',
    name: 'Drakorex',
    type: 'dragon',
    rarity: 'common',
    stats: { hp: 90, attack: 65, defense: 40, speed: 50 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
    ],
    evolution: { name: 'Drakorex Alpha', requiredHits: 50 },
    emoji: '🐲',
    color: '#f59e0b',
  },
  {
    id: 'wyvernix',
    name: 'Wyvernix',
    type: 'dragon',
    rarity: 'rare',
    stats: { hp: 100, attack: 75, defense: 45, speed: 55 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
      { name: 'Alas', type: 'dragon', damage: 32, accuracy: 80 },
    ],
    evolution: { name: 'Dragonar', requiredHits: 75 },
    emoji: '🦇',
    color: '#f59e0b',
  },
  {
    id: 'draconis',
    name: 'Draconis',
    type: 'dragon',
    rarity: 'epic',
    stats: { hp: 110, attack: 85, defense: 50, speed: 60 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
      { name: 'Alas', type: 'dragon', damage: 32, accuracy: 80 },
      { name: 'Aliento', type: 'dragon', damage: 48, accuracy: 70 },
    ],
    evolution: { name: 'Draconis Eternal', requiredHits: 100 },
    emoji: '🦖',
    color: '#f59e0b',
  },
  {
    id: 'bahamut',
    name: 'Bahamut',
    type: 'dragon',
    rarity: 'legendary',
    stats: { hp: 140, attack: 95, defense: 55, speed: 55 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
      { name: 'Alas', type: 'dragon', damage: 32, accuracy: 80 },
      { name: 'Aliento', type: 'dragon', damage: 48, accuracy: 70 },
    ],
    evolution: null,
    emoji: '👑',
    color: '#f59e0b',
  },
  {
    id: 'scaleon',
    name: 'Scaleon',
    type: 'dragon',
    rarity: 'common',
    stats: { hp: 85, attack: 60, defense: 35, speed: 52 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
    ],
    evolution: { name: 'Scaleon Feral', requiredHits: 50 },
    emoji: '🦎',
    color: '#f59e0b',
  },
  {
    id: 'drakestorm',
    name: 'Drakestorm',
    type: 'dragon',
    rarity: 'rare',
    stats: { hp: 105, attack: 80, defense: 50, speed: 58 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
      { name: 'Alas', type: 'dragon', damage: 32, accuracy: 80 },
    ],
    evolution: { name: 'Drakestorm Alpha', requiredHits: 75 },
    emoji: '🌩️',
    color: '#f59e0b',
  },
  {
    id: 'dragonaut',
    name: 'Dragonaut',
    type: 'dragon',
    rarity: 'epic',
    stats: { hp: 115, attack: 90, defense: 55, speed: 62 },
    abilities: [
      { name: 'Colmillo', type: 'dragon', damage: 22, accuracy: 90 },
      { name: 'Rugido', type: 'dragon', damage: 18, accuracy: 95 },
      { name: 'Alas', type: 'dragon', damage: 32, accuracy: 80 },
      { name: 'Aliento', type: 'dragon', damage: 48, accuracy: 70 },
    ],
    evolution: { name: 'Dragonaut Eternal', requiredHits: 100 },
    emoji: '🚀',
    color: '#f59e0b',
  },

  // ═══════════════════ ELECTRIC ═══════════════════
  {
    id: 'voltaris',
    name: 'Voltaris',
    type: 'electric',
    rarity: 'common',
    stats: { hp: 75, attack: 60, defense: 40, speed: 65 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
    ],
    evolution: { name: 'Voltaris Blitz', requiredHits: 50 },
    emoji: '⚡',
    color: '#eab308',
  },
  {
    id: 'sparkion',
    name: 'Sparkion',
    type: 'electric',
    rarity: 'rare',
    stats: { hp: 85, attack: 70, defense: 45, speed: 70 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
      { name: 'Trueno', type: 'electric', damage: 30, accuracy: 80 },
    ],
    evolution: { name: 'Thunderix', requiredHits: 75 },
    emoji: '✨',
    color: '#eab308',
  },
  {
    id: 'electroduke',
    name: 'Electroduke',
    type: 'electric',
    rarity: 'epic',
    stats: { hp: 95, attack: 80, defense: 50, speed: 75 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
      { name: 'Trueno', type: 'electric', damage: 30, accuracy: 80 },
      { name: 'Tormenta', type: 'electric', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Electroduke Prime', requiredHits: 100 },
    emoji: '🌩️',
    color: '#eab308',
  },
  {
    id: 'zeusion',
    name: 'Zeusion',
    type: 'electric',
    rarity: 'legendary',
    stats: { hp: 115, attack: 90, defense: 55, speed: 70 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
      { name: 'Trueno', type: 'electric', damage: 30, accuracy: 80 },
      { name: 'Tormenta', type: 'electric', damage: 45, accuracy: 70 },
    ],
    evolution: null,
    emoji: '⚡',
    color: '#eab308',
  },
  {
    id: 'sparkodon',
    name: 'Sparkodon',
    type: 'electric',
    rarity: 'common',
    stats: { hp: 70, attack: 55, defense: 35, speed: 68 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
    ],
    evolution: { name: 'Sparkodon Surge', requiredHits: 50 },
    emoji: '🐕',
    color: '#eab308',
  },
  {
    id: 'voltex',
    name: 'Voltex',
    type: 'electric',
    rarity: 'rare',
    stats: { hp: 90, attack: 75, defense: 50, speed: 72 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
      { name: 'Trueno', type: 'electric', damage: 30, accuracy: 80 },
    ],
    evolution: { name: 'Voltex Storm', requiredHits: 75 },
    emoji: '🔋',
    color: '#eab308',
  },
  {
    id: 'plasmarion',
    name: 'Plasmarion',
    type: 'electric',
    rarity: 'epic',
    stats: { hp: 100, attack: 85, defense: 55, speed: 78 },
    abilities: [
      { name: 'Rayo', type: 'electric', damage: 20, accuracy: 90 },
      { name: 'Chispa', type: 'electric', damage: 15, accuracy: 95 },
      { name: 'Trueno', type: 'electric', damage: 30, accuracy: 80 },
      { name: 'Tormenta', type: 'electric', damage: 45, accuracy: 70 },
    ],
    evolution: { name: 'Plasmarion Eternal', requiredHits: 100 },
    emoji: '⚡',
    color: '#eab308',
  },
];

/* ── Helper getters ─────────────────────────────────────────── */

/** Ordered list of all monster types (display order). */
export const MONSTER_TYPES: MonsterType[] = [
  'fire', 'water', 'psychic', 'plant', 'dragon', 'electric',
];

/** Tab label + emoji pairs for the collection screen. */
export const TYPE_TAB_INFO: { type: MonsterType | 'all'; label: string; emoji: string }[] = [
  { type: 'all', label: 'Todos', emoji: '🃏' },
  { type: 'fire', label: 'Fuego', emoji: '🔥' },
  { type: 'water', label: 'Agua', emoji: '💧' },
  { type: 'psychic', label: 'Psíquico', emoji: '🔮' },
  { type: 'plant', label: 'Planta', emoji: '🌿' },
  { type: 'dragon', label: 'Dragón', emoji: '🐉' },
  { type: 'electric', label: 'Eléctrico', emoji: '⚡' },
];

/** Returns all monsters of a given type. */
export function getMonstersByType(type: MonsterType): Monster[] {
  return MONSTERS.filter(m => m.type === type);
}

/** Returns all monsters. */
export function getAllMonsters(): Monster[] {
  return MONSTERS;
}

/** Returns a monster by its id. */
export function getMonsterById(id: string): Monster | undefined {
  return MONSTERS.find(m => m.id === id);
}
