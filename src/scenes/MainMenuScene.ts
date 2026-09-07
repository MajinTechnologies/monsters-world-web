/**
 * MainMenuScene — escena principal de Phaser.
 * Inicializa MenuUI y muestra Loading → Home.
 * El canvas de Phaser queda como fondo; la UI se renderiza en HTML sobre él.
 */

import Phaser from 'phaser';
import { MenuUI } from '../ui/MenuUI';

export class MainMenuScene extends Phaser.Scene {
  private menuUI!: MenuUI;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create(): void {
    this.menuUI = new MenuUI('ui-inner');
    this.menuUI.init(() => {
      this.menuUI.startLoading();
    });
  }
}
