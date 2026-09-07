/**
 * PlayerCollection — manages the player's monster collection and coins.
 * Persists data in localStorage.
 *
 * Keys:
 *  - "monsters-world-collection" : string[] of monster IDs
 *  - "monsters-world-coins"      : number
 */

import { MONSTERS as ALL_MONSTERS, Monster, Rarity } from './monsters';

const STORAGE_KEY_COLLECTION = 'monsters-world-collection';
const STORAGE_KEY_COINS = 'monsters-world-coins';

const DEFAULT_COINS = 1250;
const GACHA_COST = 100;

/** Rarity → base probability (percent). */
const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
};

const RARITY_ORDER: Rarity[] = ['common', 'rare', 'epic', 'legendary'];

export interface GachaResult {
  monster: Monster;
  isNew: boolean;
}

export class PlayerCollection {
  private collectionIds: Set<string>;
  private coins: number;

  /** Callbacks registered by the UI to react to changes. */
  private onCoinsChange: ((coins: number) => void)[] = [];
  private onCollectionChange: (() => void)[] = [];

  constructor() {
    this.collectionIds = this.loadCollection();
    this.coins = this.loadCoins();
  }

  // ────────── Persistence helpers ──────────

  private loadCollection(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COLLECTION);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        return new Set(arr);
      }
    } catch { /* ignore */ }
    return new Set<string>();
  }

  private saveCollection(): void {
    const arr = Array.from(this.collectionIds);
    localStorage.setItem(STORAGE_KEY_COLLECTION, JSON.stringify(arr));
  }

  private loadCoins(): number {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COINS);
      if (raw !== null) {
        const n = parseInt(raw, 10);
        if (!isNaN(n)) return n;
      }
    } catch { /* ignore */ }
    return DEFAULT_COINS;
  }

  private saveCoins(): void {
    localStorage.setItem(STORAGE_KEY_COINS, String(this.coins));
  }

  // ────────── Public API ──────────

  /** Get all captured monster IDs. */
  getCapturedIds(): string[] {
    return Array.from(this.collectionIds);
  }

  /** Get full Monster objects for captured ones. */
  getCapturedMonsters(): Monster[] {
    return ALL_MONSTERS.filter(m => this.collectionIds.has(m.id));
  }

  /** Check if a specific monster is captured. */
  hasMonster(id: string): boolean {
    return this.collectionIds.has(id);
  }

  /** Total captured count. */
  getCapturedCount(): number {
    return this.collectionIds.size;
  }

  /** Total monsters available. */
  getTotalCount(): number {
    return ALL_MONSTERS.length;
  }

  /** Get current coins. */
  getCoins(): number {
    return this.coins;
  }

  /** Add coins (for purchases, rewards, etc.). */
  addCoins(amount: number): void {
    this.coins += amount;
    this.saveCoins();
    this.notifyCoinsChange();
  }

  /** Spend coins. Returns false if insufficient. */
  spendCoins(amount: number): boolean {
    if (this.coins < amount) return false;
    this.coins -= amount;
    this.saveCoins();
    this.notifyCoinsChange();
    return true;
  }

  /** Can the player afford a gacha pull? */
  canPull(): boolean {
    return this.coins >= GACHA_COST;
  }

  /**
   * Perform a gacha pull.
   * Returns null if the player can't afford it or all monsters are collected.
   */
  pull(): GachaResult | null {
    if (!this.canPull()) return null;

    // Check if all monsters are collected
    if (this.collectionIds.size >= ALL_MONSTERS.length) return null;

    // Spend coins
    this.spendCoins(GACHA_COST);

    // Roll rarity
    const rarity = this.rollRarity();

    // Get available monsters of that rarity
    const available = ALL_MONSTERS.filter(
      m => m.rarity === rarity && !this.collectionIds.has(m.id)
    );

    // If all of that rarity are collected, try the next rarity up
    let chosen: Monster;
    if (available.length > 0) {
      chosen = available[Math.floor(Math.random() * available.length)];
    } else {
      // Fallback: pick from any rarity with available monsters
      const fallback = ALL_MONSTERS.filter(m => !this.collectionIds.has(m.id));
      chosen = fallback[Math.floor(Math.random() * fallback.length)];
    }

    const isNew = !this.collectionIds.has(chosen.id);
    this.collectionIds.add(chosen.id);
    this.saveCollection();
    this.notifyCollectionChange();

    return { monster: chosen, isNew };
  }

  /**
   * Roll a rarity based on adjusted probabilities.
   * If a rarity has no available monsters, its weight is redistributed.
   */
  private rollRarity(): Rarity {
    const weights: Record<Rarity, number> = { ...RARITY_WEIGHTS };

    // Adjust weights: if a rarity is fully collected, redistribute
    for (const r of RARITY_ORDER) {
      const available = ALL_MONSTERS.filter(m => m.rarity === r && !this.collectionIds.has(m.id));
      if (available.length === 0) {
        const w = weights[r];
        weights[r] = 0;
        // Distribute proportionally to remaining rarities
        const remaining = RARITY_ORDER.filter(r2 => weights[r2] > 0);
        const totalRemaining = remaining.reduce((s, r2) => s + weights[r2], 0);
        if (totalRemaining > 0) {
          for (const r2 of remaining) {
            weights[r2] += (w * weights[r2]) / totalRemaining;
          }
        }
      }
    }

    const total = Object.values(weights).reduce((s, w) => s + w, 0);
    let roll = Math.random() * total;

    for (const r of RARITY_ORDER) {
      roll -= weights[r];
      if (roll <= 0) return r;
    }

    return 'common'; // fallback
  }

  // ────────── Event listeners ──────────

  onCoinsUpdated(cb: (coins: number) => void): void {
    this.onCoinsChange.push(cb);
  }

  onCollectionUpdated(cb: () => void): void {
    this.onCollectionChange.push(cb);
  }

  private notifyCoinsChange(): void {
    for (const cb of this.onCoinsChange) cb(this.coins);
  }

  private notifyCollectionChange(): void {
    for (const cb of this.onCollectionChange) cb();
  }
}

/** Singleton instance */
export const playerCollection = new PlayerCollection();
