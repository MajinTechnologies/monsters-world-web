/**
 * StatusBar — gestiona las visualizaciones de monedas y stamina.
 * Actualiza todos los status-bars presentes en el DOM.
 */

export class StatusBar {
  private coinEls: HTMLElement[] = [];
  private staminaEls: HTMLElement[] = [];

  constructor() {
    this.refresh();
  }

  /** Re-scan the DOM for status bar elements (call after HTML injection). */
  refresh(): void {
    this.coinEls = Array.from(document.querySelectorAll('[id^="coin-count"]'));
    this.staminaEls = Array.from(document.querySelectorAll('[id^="stamina-count"]'));
  }

  /** Update all coin displays. */
  updateCoins(amount: number): void {
    const formatted = amount.toLocaleString('es-ES');
    this.coinEls.forEach(el => { el.textContent = formatted; });
  }

  /** Update all stamina displays (current / max). */
  updateStamina(current: number, max: number): void {
    const text = `${current}/${max}`;
    this.staminaEls.forEach(el => { el.textContent = text; });
  }
}
