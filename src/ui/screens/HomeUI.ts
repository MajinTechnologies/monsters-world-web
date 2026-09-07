/**
 * HomeUI — pantalla principal (Jugar).
 * Avatar placeholder + 3 botones: Campaña, Online, Mundial.
 */

export class HomeUI {
  private screen: HTMLElement;

  constructor() {
    this.screen = document.getElementById('screen-home')!;
  }

  show(): void {
    this.screen.classList.remove('hidden');
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }
}
