/**
 * ShopUI — pantalla de tienda con 4 paquetes.
 * Monedas (purple), Stamina (green), Skin Avatar (orange), Mega Pack (blue).
 */

export class ShopUI {
  private screen: HTMLElement;

  constructor() {
    this.screen = document.getElementById('screen-shop')!;
  }

  show(): void {
    this.screen.classList.remove('hidden');
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }
}
