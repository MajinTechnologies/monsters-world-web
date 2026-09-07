/**
 * main.ts — Entry point for Monsters World Web.
 * Creates the Phaser 3 game with a 1080x1920 canvas and launches MainMenuScene.
 */

import Phaser from 'phaser';
import './styles.css';
import { MainMenuScene } from './scenes/MainMenuScene';
import { BattleScene } from './scenes/BattleScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1080,
  height: 1920,
  backgroundColor: '#1e1e2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [MainMenuScene, BattleScene],
};

new Phaser.Game(config);
