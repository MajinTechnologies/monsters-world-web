/**
 * @module BattleScene
 * @description Battle scene with Slingshot mechanics (Angry Birds style).
 * Top-view arena with walls, a player ball, and a static enemy.
 */

import Phaser from 'phaser';

export class BattleScene extends Phaser.Scene {
  private player: Phaser.Physics.Matter.Image | null = null;
  private enemyBody: MatterJS.BodyType | null = null;
  private dragOrigin = { x: 540, y: 1500 };
  private isDragging = false;
  private canDrag = true;
  private directionLine: Phaser.GameObjects.Graphics | null = null;
  private launchTime = 0;

  // Enemy stats
  private enemyHp = 100;

  constructor() {
    super({ key: 'BattleScene' });
  }

  create(): void {
    // --- Background ---
    this.cameras.main.setBackgroundColor('#1e1e2e');

    // --- Arena walls (static) ---
    this.matter.world.setBounds(0, 0, 1080, 1920);

    // --- Arena border ---
    const border = this.add.graphics();
    border.lineStyle(5, 0xffffff, 0.6);
    border.strokeRoundedRect(0, 0, 1080, 1920, 45);

    // --- Player ball (purple, dynamic) ---
    const playerCircle = this.add.circle(540, 1500, 30, 0x8b5cf6);
    this.player = this.matter.add.gameObject(playerCircle, {
      restitution: 0.9,
      friction: 0.001,
      frictionAir: 0.005,
      density: 0.001,
    }) as unknown as Phaser.Physics.Matter.Image;
    playerCircle.setInteractive();
    this.player.setFixedRotation();

    // --- Direction line graphics ---
    this.directionLine = this.add.graphics();

    // --- Enemy (fire-red, static) ---
    const enemyCircle = this.add.circle(540, 400, 40, 0xef4444);
    const enemyObj = this.matter.add.gameObject(enemyCircle, {
      isStatic: true,
      restitution: 0.9,
    });
    this.enemyBody = enemyObj.body as MatterJS.BodyType;

    // --- Collision detection ---
    this.matter.world.on('collisionstart', (event: any) => {
      for (const pair of event.pairs) {
        const a = pair.bodyA;
        const b = pair.bodyB;
        const playerBody = this.player?.body as MatterJS.BodyType;
        if ((a === playerBody || b === playerBody) && (a === this.enemyBody || b === this.enemyBody)) {
          this.onPlayerHitEnemy();
        }
      }
    });

    // --- Input events ---
    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerup', this.onPointerUp, this);

    // --- Back button (temporary) ---
    const backText = this.add.text(540, 1850, '← Volver', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#f59e0b',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();

    backText.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });
  }

  update(): void {
    if (!this.player) return;

    const body = this.player.body as MatterJS.BodyType;
    if (body) {
      const velocity = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);

      // Ball stopped → freeze it and allow drag again
      if (!this.isDragging && velocity < 0.3) {
        this.matter.body.setVelocity(body, { x: 0, y: 0 });
        this.canDrag = true;
      } else if (velocity >= 0.3) {
        this.canDrag = false;

        // Gradual braking after 1.2s from launch
        if (!this.isDragging && this.launchTime > 0) {
          const elapsed = performance.now() - this.launchTime;
          if (elapsed >= 1200) {
            const bv = body.velocity;
            this.matter.body.setVelocity(body, {
              x: bv.x * 0.97,
              y: bv.y * 0.97,
            });
          }
        }
      }
    }
  }

  private onPointerDown(pointer: Phaser.Input.Pointer): void {
    if (!this.player || !this.canDrag) return;

    const dist = Phaser.Math.Distance.Between(
      pointer.x, pointer.y,
      this.player.x, this.player.y
    );

    // Allow drag within 150px radius
    if (dist < 150) {
      this.isDragging = true;

      // Save ball position as slingshot origin
      this.dragOrigin.x = this.player.x;
      this.dragOrigin.y = this.player.y;

      // Stop velocity and make static
      const body = this.player.body as MatterJS.BodyType;
      this.matter.body.setVelocity(body, { x: 0, y: 0 });
      this.matter.body.setStatic(body, true);
    }
  }

  private onPointerMove(pointer: Phaser.Input.Pointer): void {
    if (!this.isDragging || !this.player || !this.directionLine) return;

    // Slingshot: ball stays at dragOrigin, line shows launch trajectory
    this.directionLine.clear();
    this.directionLine.lineStyle(3, 0xffffff, 0.5);

    // Direction: from pointer toward ball position (launch direction)
    const dirX = this.dragOrigin.x - pointer.x;
    const dirY = this.dragOrigin.y - pointer.y;
    const dist = Math.sqrt(dirX * dirX + dirY * dirY);

    if (dist < 10) return;

    const normX = dirX / dist;
    const normY = dirY / dist;

    // Line length = drag distance (clamped)
    const lineLength = Math.min(dist, 400);

    // Start from edge of ball, slightly offset
    const ballRadius = 30;
    const startX = this.dragOrigin.x + normX * (ballRadius + 6);
    const startY = this.dragOrigin.y + normY * (ballRadius + 6);
    const endX = startX + normX * lineLength;
    const endY = startY + normY * lineLength;

    // Draw dotted line
    const segmentLength = 15;
    const segments = Math.floor(lineLength / segmentLength);

    for (let i = 0; i < segments; i += 2) {
      const t1 = i / segments;
      const t2 = Math.min((i + 1) / segments, 1);
      const x1 = Phaser.Math.Linear(startX, endX, t1);
      const y1 = Phaser.Math.Linear(startY, endY, t1);
      const x2 = Phaser.Math.Linear(startX, endX, t2);
      const y2 = Phaser.Math.Linear(startY, endY, t2);
      this.directionLine.lineBetween(x1, y1, x2, y2);
    }
  }

  private onPointerUp(_pointer: Phaser.Input.Pointer): void {
    if (!this.isDragging || !this.player) return;
    this.isDragging = false;

    // Enable physics
    const body = this.player.body as MatterJS.BodyType;
    this.matter.body.setStatic(body, false);

    // Calculate launch: from pointer toward ball (opposite of drag)
    const dirX = this.dragOrigin.x - _pointer.x;
    const dirY = this.dragOrigin.y - _pointer.y;
    const dist = Math.sqrt(dirX * dirX + dirY * dirY);

    if (dist > 10) {
      const normX = dirX / dist;
      const normY = dirY / dist;

      // Velocity proportional to drag distance
      const maxVelocity = 25;
      const velocityMagnitude = Math.min(dist * 0.15, maxVelocity);

      if (velocityMagnitude > 0) {
        this.matter.body.setVelocity(body, {
          x: normX * velocityMagnitude,
          y: normY * velocityMagnitude,
        });
        this.launchTime = performance.now();
      }
    }

    // Hide direction line
    if (this.directionLine) {
      this.directionLine.clear();
    }
  }

  private onPlayerHitEnemy(): void {
    // Get player velocity for damage calculation
    const body = this.player?.body as MatterJS.BodyType;
    if (!body) return;

    const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);

    // Only deal damage if moving fast enough
    if (speed < 3) return;

    // Damage = speed (capped)
    const damage = Math.min(Math.floor(speed), 30);
    this.enemyHp = Math.max(0, this.enemyHp - damage);

    // Flash enemy red
    const enemyObj = this.enemyBody?.gameObject as Phaser.GameObjects.Arc;
    if (enemyObj) {
      enemyObj.setFillStyle(0xffffff);
      this.time.delayedCall(100, () => {
        if (this.enemyHp > 0) {
          enemyObj.setFillStyle(0xef4444);
        } else {
          enemyObj.setFillStyle(0x555555);
        }
      });
    }

    // Show damage number
    if (this.player) {
      const dmgText = this.add.text(this.player.x, this.player.y - 40, `-${damage}`, {
        fontSize: '28px',
        color: '#ef4444',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      this.tweens.add({
        targets: dmgText,
        y: dmgText.y - 60,
        alpha: 0,
        duration: 800,
        ease: 'Power2',
        onComplete: () => dmgText.destroy(),
      });
    }
  }
}
