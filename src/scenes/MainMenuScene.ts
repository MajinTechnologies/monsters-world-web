/**
 * MainMenuScene — escena principal de Phaser.
 * Inicializa MenuUI y muestra Loading → Home.
 * El canvas de Phaser queda como fondo; la UI se renderiza en HTML sobre él.
 */

import Phaser from 'phaser';
import { MenuUI } from '../ui/MenuUI';
import type { CampaignConfig, LevelConfig } from '../data/campaigns';

export class MainMenuScene extends Phaser.Scene {
  private menuUI!: MenuUI;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create(data?: { returnToLevelSelect?: boolean; campaignId?: string }): void {
    // Show UI in case we're coming back from battle
    const uiInner = document.getElementById('ui-inner');
    if (uiInner) uiInner.classList.remove('hidden');
    const tabBar = document.getElementById('tab-bar');
    if (tabBar) tabBar.classList.remove('hidden');

    this.menuUI = new MenuUI('ui-inner', (campaign, level) => this.startBattle(campaign, level));
    const returnToLevelSelect = !!data?.returnToLevelSelect;
    const campaignId = data?.campaignId ?? 'demo';
    this.menuUI.init(() => {
      if (returnToLevelSelect) {
        // Skip loading animation when returning from battle; go straight to level select
        this.menuUI.showLevelSelect(campaignId);
      } else {
        this.menuUI.startLoading();
      }
    });
  }

  private startBattle(campaign: CampaignConfig, level: LevelConfig): void {
    this.menuUI.hideUI();
    this.scene.start('VersusScene', { campaign, level });
  }

  showMenu(): void {
    this.menuUI.showUI();
  }
}
