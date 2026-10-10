/**
 * SettingsStore — persists player settings (audio volume, vibration) in localStorage.
 *
 * Keys:
 *  - "monsters-world-settings" : JSON { sound, music, vibration }
 *
 * sound/music are volume levels 0-100 (0 = muted, 100 = max).
 * Same persistence pattern as PlayerCollection (try/catch + JSON.parse).
 */

export interface GameSettings {
  /** Volumen de efectos de sonido, 0-100. */
  sound: number;
  /** Volumen de música, 0-100. */
  music: number;
  /** Vibrar en eventos del juego. */
  vibration: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  sound: 100,
  music: 100,
  vibration: true,
};

export const STORAGE_KEY_SETTINGS = 'monsters-world-settings';

/** Redondea y acota un volumen al rango 0-100. Valores no numéricos -> 0. */
export function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export class SettingsStore {
  private settings: GameSettings;

  constructor() {
    this.settings = this.load();
  }

  /** Copia del estado actual. */
  getSettings(): GameSettings {
    return { ...this.settings };
  }

  /** Setea y persiste el volumen de un canal (sound | music). */
  setVolume(key: 'sound' | 'music', value: number): void {
    this.settings[key] = clampVolume(value);
    this.save();
  }

  /** Setea y persiste la vibración. */
  setVibration(enabled: boolean): void {
    this.settings.vibration = enabled;
    this.save();
  }

  private load(): GameSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        return this.sanitize(parsed);
      }
    } catch { /* ignore */ }
    return { ...DEFAULT_SETTINGS };
  }

  /** Fusiona lo parseado con los defaults, descartando campos inválidos. */
  private sanitize(parsed: unknown): GameSettings {
    const s = { ...DEFAULT_SETTINGS };
    if (parsed && typeof parsed === 'object') {
      const p = parsed as Partial<GameSettings>;
      if (typeof p.sound === 'number') s.sound = clampVolume(p.sound);
      if (typeof p.music === 'number') s.music = clampVolume(p.music);
      if (typeof p.vibration === 'boolean') s.vibration = p.vibration;
    }
    return s;
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(this.settings));
  }
}