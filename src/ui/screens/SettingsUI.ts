/**
 * SettingsUI — pantalla de configuración.
 * 4 secciones: Audio, Controles, Cuenta, Créditos.
 * Cada toggle funciona como switch visual on/off.
 */

export class SettingsUI {
  private screen: HTMLElement;
  private settings: Record<string, boolean> = {
    sound: true,
    music: true,
    vibration: true,
  };

  constructor() {
    this.screen = document.getElementById('screen-settings')!;
    this.initToggles();
  }

  private initToggles(): void {
    const toggles = this.screen.querySelectorAll('.toggle-track');
    toggles.forEach(track => {
      track.addEventListener('click', () => {
        const key = (track as HTMLElement).dataset.key;
        if (key && key in this.settings) {
          this.settings[key] = !this.settings[key];
          track.classList.toggle('active', this.settings[key]);
        }
      });
    });
  }

  show(): void {
    this.screen.classList.remove('hidden');
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }

  getSettings(): Record<string, boolean> {
    return { ...this.settings };
  }
}
