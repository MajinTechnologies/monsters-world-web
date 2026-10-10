import { describe, it, expect, beforeEach } from 'vitest';
import { MENU_HTML } from '../menuHtml';
import { SettingsUI } from './SettingsUI';
import { STORAGE_KEY_SETTINGS } from '../../data/SettingsStore';

function setup(): SettingsUI {
  document.body.innerHTML = MENU_HTML;
  return new SettingsUI();
}

describe('SettingsUI', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('replaces audio toggles with two range sliders defaulting to 100', () => {
    setup();
    expect(document.getElementById('toggle-sound')).toBeNull();
    expect(document.getElementById('toggle-music')).toBeNull();

    const sound = document.getElementById('slider-sound') as HTMLInputElement;
    const music = document.getElementById('slider-music') as HTMLInputElement;
    expect(sound).not.toBeNull();
    expect(music).not.toBeNull();
    expect(sound.type).toBe('range');
    expect(music.type).toBe('range');
    expect(sound.min).toBe('0');
    expect(sound.max).toBe('100');
    expect(sound.value).toBe('100');
    expect(music.value).toBe('100');
  });

  it('keeps the vibration toggle intact', () => {
    setup();
    const vibration = document.getElementById('toggle-vibration');
    expect(vibration).not.toBeNull();
    expect(vibration?.classList.contains('active')).toBe(true);
  });

  it('updates the store and the value label when a slider moves', () => {
    setup();
    const sound = document.getElementById('slider-sound') as HTMLInputElement;
    sound.value = '30';
    sound.dispatchEvent(new Event('input', { bubbles: true }));

    const label = document.getElementById('slider-sound-value');
    expect(label?.textContent).toBe('30');
    expect(localStorage.getItem(STORAGE_KEY_SETTINGS)).toContain('"sound":30');
  });

  it('loads persisted values into sliders and labels', () => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({ sound: 20, music: 80, vibration: true }));
    setup();
    expect((document.getElementById('slider-sound') as HTMLInputElement).value).toBe('20');
    expect((document.getElementById('slider-music') as HTMLInputElement).value).toBe('80');
    expect(document.getElementById('slider-sound-value')?.textContent).toBe('20');
    expect(document.getElementById('slider-music-value')?.textContent).toBe('80');
  });

  it('exposes current settings via getSettings', () => {
    const ui = setup();
    expect(ui.getSettings()).toEqual({ sound: 100, music: 100, vibration: true });
    (document.getElementById('slider-music') as HTMLInputElement).value = '0';
    (document.getElementById('slider-music') as HTMLInputElement).dispatchEvent(
      new Event('input', { bubbles: true }),
    );
    expect(ui.getSettings()).toEqual({ sound: 100, music: 0, vibration: true });
  });
});