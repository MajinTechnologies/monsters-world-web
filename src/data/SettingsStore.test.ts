import { describe, it, expect, beforeEach } from 'vitest';
import { SettingsStore, DEFAULT_SETTINGS, STORAGE_KEY_SETTINGS, clampVolume } from './SettingsStore';

describe('SettingsStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to sound/music 100 and vibration true', () => {
    expect(new SettingsStore().getSettings()).toEqual({ sound: 100, music: 100, vibration: true });
    expect(DEFAULT_SETTINGS).toEqual({ sound: 100, music: 100, vibration: true });
  });

  it('persists volume changes to localStorage', () => {
    const store = new SettingsStore();
    store.setVolume('sound', 40);
    store.setVolume('music', 0);
    expect(localStorage.getItem(STORAGE_KEY_SETTINGS)).toBe(
      JSON.stringify({ sound: 40, music: 0, vibration: true }),
    );
  });

  it('persists vibration changes', () => {
    const store = new SettingsStore();
    store.setVibration(false);
    expect(store.getSettings().vibration).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY_SETTINGS)).toContain('"vibration":false');
  });

  it('loads persisted settings on construction (roundtrip)', () => {
    localStorage.setItem(
      STORAGE_KEY_SETTINGS,
      JSON.stringify({ sound: 25, music: 75, vibration: false }),
    );
    expect(new SettingsStore().getSettings()).toEqual({ sound: 25, music: 75, vibration: false });
  });

  it('falls back to defaults on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, '{not valid json');
    expect(new SettingsStore().getSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('falls back per-field on partial/malformed objects', () => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({ sound: 'loud', music: 200 }));
    const store = new SettingsStore();
    expect(store.getSettings().sound).toBe(100); // non-number -> default
    expect(store.getSettings().music).toBe(100); // out of range -> clamped to 100
    expect(store.getSettings().vibration).toBe(true);
  });

  it('clamps volume values to 0-100', () => {
    expect(clampVolume(-10)).toBe(0);
    expect(clampVolume(250)).toBe(100);
    expect(clampVolume(55.4)).toBe(55);
    expect(clampVolume(Number.NaN)).toBe(0);
  });
});