/**
 * @module game.config
 * @description Game-wide constants for Monsters World.
 */

/** Logical width of the game canvas (portrait 9:16). */
export const GAME_WIDTH: number = 1080;

/** Logical height of the game canvas (portrait 9:16). */
export const GAME_HEIGHT: number = 1920;

/** Shared colour palette. */
export const COLORS = {
  /** Deep background */
  bg: '#1e1e2e',
  /** Accent orange */
  orange: '#f59e0b',
  /** Accent purple */
  purple: '#8b5cf6',
  /** Accent blue */
  blue: '#4a9eed',
  /** Accent green */
  green: '#22c55e',
  /** Neutral grey */
  grey: '#a0a0a0',
} as const;
