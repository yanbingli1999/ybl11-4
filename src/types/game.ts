export type TileType =
  | 'floor'
  | 'wall'
  | 'entrance'
  | 'exit'
  | 'stone'
  | 'pressurePlate'
  | 'door'
  | 'trap'
  | 'relic'
  | 'torch'
  | 'chest';

export type RelicCategory =
  | 'jade'
  | 'bronze'
  | 'gold'
  | 'ceramic'
  | 'scroll'
  | 'stone'
  | 'weapon'
  | 'crystal';

export const CATEGORY_NAMES: Record<RelicCategory, string> = {
  jade: '玉器',
  bronze: '青铜器',
  gold: '金器',
  ceramic: '陶瓷',
  scroll: '文书',
  stone: '石雕',
  weapon: '兵器',
  crystal: '水晶',
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  type: TileType;
  visible: boolean;
  lit: boolean;
  explored: boolean;
  activated?: boolean;
  doorId?: string;
  trapType?: string;
  relicId?: string;
  torchFuel?: number;
}

export interface Mechanism {
  id: string;
  type: 'pressurePlate' | 'lever';
  position: Position;
  linkedDoorId: string;
  activated: boolean;
}

export interface DoorInstance {
  position: Position;
  doorId: string;
}

export interface TrapInstance {
  id: string;
  type: string;
  position: Position;
  triggered: boolean;
  visible: boolean;
}

export interface RelicInstance {
  id: string;
  relicId: string;
  position: Position;
  collected: boolean;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  category: RelicCategory;
  weight: number;
  value: number;
  isGenuine: boolean;
  curseLevel: number;
  icon: string;
  appraisalDifficulty: number;
}

export interface Trap {
  id: string;
  name: string;
  damage: number;
  effect: string;
  visibleByDefault: boolean;
}

export interface PlayerState {
  position: Position;
  stamina: number;
  maxStamina: number;
  weight: number;
  maxWeight: number;
  brightness: number;
  maxBrightness: number;
  curse: number;
  maxCurse: number;
  gold: number;
  inventory: InventoryItem[];
  depth: number;
  torchesRemaining: number;
}

export interface InventoryItem {
  id: string;
  relicId: string;
  name: string;
  category: RelicCategory;
  weight: number;
  value: number;
  isGenuine: boolean | null;
  curseLevel: number;
  icon: string;
  appraised: boolean;
}

export interface GameState {
  player: PlayerState;
  room: RoomState;
  status: 'exploring' | 'escaping' | 'victory' | 'defeat';
  turn: number;
  message: string;
  escapeValue: number;
}

export interface RoomTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: TileType[][];
  mechanisms: Mechanism[];
  doors: DoorInstance[];
  traps: TrapInstance[];
  relics: RelicInstance[];
  torches: Position[];
}

export interface RoomState {
  templateId: string;
  width: number;
  height: number;
  tiles: Tile[][];
  mechanisms: Mechanism[];
  doors: DoorInstance[];
  traps: TrapInstance[];
  relics: RelicInstance[];
  torches: { position: Position; fuel: number }[];
  entrance: Position;
  exit: Position;
}

export interface ExpeditionRecord {
  id: string;
  date: string;
  depth: number;
  goldEarned: number;
  relicsCollected: number;
  survived: boolean;
  causeOfDeath?: string;
}

export interface CategoryResonance {
  category: RelicCategory;
  count: number;
  multiplier: number;
}

export interface ResonanceEffect {
  categoryResonances: CategoryResonance[];
  totalMultiplier: number;
  jadeCurseActive: boolean;
  jadeCursePerTurn: number;
  fakeInterference: number;
  fakeCount: number;
  genuineCount: number;
}
