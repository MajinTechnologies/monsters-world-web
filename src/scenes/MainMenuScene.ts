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
    // Show UI in case we're coming back from battle
    const uiInner = document.getElementById('ui-inner');
    if (uiInner) uiInner.classList.remove('hidden');
    const tabBar = document.getElementById('tab-bar');
    if (tabBar) tabBar.classList.remove('hidden');

    this.menuUI = new MenuUI('ui-inner', () => this.startBattle());
    this.menuUI.init(() => {
      this.menuUI.startLoading();
    });
  }

  private startBattle(): void {
    this.menuUI.hideUI();
    this.scene.start('BattleScene');
  }

  showMenu(): void {
    this.menuUI.showUI();
  }
}
