/**
 * @module GameScene
 * @description Core gameplay scene — pinball + monster collection.
 */

import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // Placeholder — load gameplay assets.
  }

  create(): void {
    console.log('GameScene loaded');

    // Placeholder — set up pinball table, monsters, HUD, etc.
  }
}
