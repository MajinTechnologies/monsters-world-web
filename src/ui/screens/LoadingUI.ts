/**
 * LoadingUI — pantalla de carga con barra animada.
 * La barra se llena en ~2.8s via CSS animation.
 * Cuando termina, ejecuta el callback onComplete.
 */

export class LoadingUI {
  private screen: HTMLElement;
  private onComplete: () => void;

  constructor(onComplete: () => void) {
    this.screen = document.getElementById('screen-loading')!;
    this.onComplete = onComplete;
  }

  show(): void {
    this.screen.classList.remove('hidden');
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }

  start(): void {
    this.show();
    setTimeout(() => {
      this.hide();
      this.onComplete();
    }, 3000);
  }
}
