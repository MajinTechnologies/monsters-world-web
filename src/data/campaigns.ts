/**
 * Campaign and level definitions for "Eventos de la historia".
 * Centralizes names/ids/config to avoid hardcoding in UI/scenes.
 */

export type ObstacleShape =
  | { kind: 'circle'; x: number; y: number; radius: number }
  | { kind: 'rect'; x: number; y: number; width: number; height: number; angleDeg?: number };

export interface LevelConfig {
  id: string;
  name: string;
  /** Pinball-style obstacles (static). Empty for Nivel Vacío. */
  obstacles: ObstacleShape[];
}

export interface CampaignConfig {
  id: string;
  name: string;
  locked: boolean;
  levels: LevelConfig[];
}

// Arena bounds (must match BattleScene): x=60, y=110, w=960, h=1700
export const DEMO_PINBALL_OBSTACLES: ObstacleShape[] = [
  // Bumpers (top/mid)
  { kind: 'circle', x: 300, y: 520, radius: 42 },
  { kind: 'circle', x: 540, y: 420, radius: 46 },
  { kind: 'circle', x: 780, y: 520, radius: 42 },
  // Mid lane guides
  { kind: 'circle', x: 260, y: 820, radius: 34 },
  { kind: 'circle', x: 820, y: 820, radius: 34 },
  // Flipper-like angled guards (lower)
  { kind: 'rect', x: 330, y: 1180, width: 220, height: 26, angleDeg: 28 },
  { kind: 'rect', x: 750, y: 1180, width: 220, height: 26, angleDeg: -28 },
  // Center kicker
  { kind: 'circle', x: 540, y: 980, radius: 38 },
];

export const CAMPAIGNS: CampaignConfig[] = [
  {
    id: 'demo',
    name: 'Demo',
    locked: false,
    levels: [
      {
        id: 'nivel-vacio',
        name: 'Nivel Vacío',
        obstacles: [],
      },
      {
        id: 'nivel-obstaculos',
        name: 'Nivel con Obstáculos',
        obstacles: DEMO_PINBALL_OBSTACLES,
      },
    ],
  },
  {
    id: 'historia-principal',
    name: 'Historia principal',
    locked: true,
    levels: [],
  },
];

export function getCampaignById(id: string): CampaignConfig | undefined {
  return CAMPAIGNS.find((c) => c.id === id);
}

export function getLevelConfig(campaignId: string, levelId: string): LevelConfig | undefined {
  return getCampaignById(campaignId)?.levels.find((l) => l.id === levelId);
}
