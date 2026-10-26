/**
 * VersusScene - Pantalla de presentación Jugador vs Boss antes de la batalla
 */

import Phaser from 'phaser';

export class VersusScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Rectangle;
  private loadingBarWidth = 0;
  private readonly barMaxWidth = 600;

  constructor() {
    super({ key: 'VersusScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1e1e2e');

    // Boss - Cuadrante superior izquierda
    this.add.circle(250, 450, 48, 0xef4444);
    this.add.text(250, 320, 'BOSS', {
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#ef4444',
    }).setOrigin(0.5);

    // VS - Centro
    this.add.text(540, 960, 'VS', {
      fontSize: '120px',
      fontStyle: 'bold',
      color: '#f59e0b',
    }).setOrigin(0.5);

    // Jugador - Abajo
    this.add.circle(540, 1500, 36, 0x8b5cf6);
    this.add.text(540, 1650, 'JUGADOR', {
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#8b5cf6',
    }).setOrigin(0.5);

    // Barra de carga - Debajo del VS
    const barY = 1120;
    const barBg = this.add.rectangle(540, barY, this.barMaxWidth, 20, 0x333333);
    barBg.setOrigin(0.5);

    this.loadingBar = this.add.rectangle(540 - this.barMaxWidth / 2, barY, 0, 20, 0xf59e0b);
    this.loadingBar.setOrigin(0, 0.5);

    // Animación de carga
    this.tweens.add({
      targets: this,
      loadingBarWidth: this.barMaxWidth,
      duration: 2000,
      ease: 'Power2',
      onUpdate: () => {
        this.loadingBar.width = this.loadingBarWidth;
      },
      onComplete: () => {
        this.scene.start('BattleScene');
      },
    });
  }
}
