/**
 * @module BootScene
 * @description Initial boot scene — loads minimal assets and transitions to Preload.
 */

import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Minimal boot — no assets required yet.
  }

  create(): void {
    console.log('BootScene loaded');

    this.scene.start('PreloadScene');
  }
}
