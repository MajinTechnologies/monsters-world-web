/**
 * SettingsUI — pantalla de configuración.
 * 4 secciones: Audio, Controles, Cuenta, Créditos.
 * Audio usa sliders de volumen (0-100) persistidos en localStorage (SettingsStore);
 * Controles conserva el toggle de vibración.
 */

import { GameSettings, SettingsStore } from '../../data/SettingsStore';

const VOLUME_KEYS = ['sound', 'music'] as const;

export class SettingsUI {
  private screen: HTMLElement;
  private store: SettingsStore;

  constructor(store?: SettingsStore) {
    this.screen = document.getElementById('screen-settings')!;
    this.store = store ?? new SettingsStore();
    this.applySettings();
    this.initSliders();
    this.initVibrationToggle();
  }

  /** Vuelca el estado persistido en sliders, labels y toggle. */
  private applySettings(): void {
    const settings = this.store.getSettings();
    for (const key of VOLUME_KEYS) {
      const slider = this.screen.querySelector<HTMLInputElement>(`#slider-${key}`);
      const valueLabel = this.screen.querySelector<HTMLElement>(`#slider-${key}-value`);
      if (slider) slider.value = String(settings[key]);
      if (valueLabel) valueLabel.textContent = String(settings[key]);
    }
    const vibration = this.screen.querySelector<HTMLElement>('#toggle-vibration');
    vibration?.classList.toggle('active', settings.vibration);
  }

  private initSliders(): void {
    for (const key of VOLUME_KEYS) {
      const slider = this.screen.querySelector<HTMLInputElement>(`#slider-${key}`);
      if (!slider) continue;
      slider.addEventListener('input', () => {
        this.store.setVolume(key, parseInt(slider.value, 10));
        const valueLabel = this.screen.querySelector<HTMLElement>(`#slider-${key}-value`);
        if (valueLabel) {
          valueLabel.textContent = String(this.store.getSettings()[key]);
        }
      });
    }
  }

  private initVibrationToggle(): void {
    const toggle = this.screen.querySelector<HTMLElement>('#toggle-vibration');
    toggle?.addEventListener('click', () => {
      const enabled = !this.store.getSettings().vibration;
      this.store.setVibration(enabled);
      toggle.classList.toggle('active', enabled);
    });
  }

  show(): void {
    this.screen.classList.remove('hidden');
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }

  getSettings(): GameSettings {
    return this.store.getSettings();
  }
}