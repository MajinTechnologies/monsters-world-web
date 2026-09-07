/**
 * @module PreloadScene
 * @description Asset loading scene — displays a progress bar while loading.
 */

import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // Placeholder — load sprites, audio, etc. here.
  }

  create(): void {
    console.log('PreloadScene loaded');

    this.scene.start('MainMenuScene');
  }
}
