/**
 * @module BattleScene
 * @description Battle scene with Slingshot mechanics (Angry Birds style).
 * Top-view arena with walls, a player ball, and a static enemy.
 */

import Phaser from 'phaser';
import type { CampaignConfig, LevelConfig } from '../data/campaigns';
import { getLevelConfig } from '../data/campaigns';

type AimHit =
  | { kind: 'wall'; t: number; nx: number; ny: number; x: number; y: number }
  | { kind: 'obstacle'; t: number; nx: number; ny: number; x: number; y: number };

export class BattleScene extends Phaser.Scene {
  private player: Phaser.Physics.Matter.Image | null = null;
  private enemyBody: MatterJS.BodyType | null = null;
  private dragOrigin = { x: 540, y: 1500 };
  private isDragging = false;
  private canDrag = true;
  private directionLine: Phaser.GameObjects.Graphics | null = null;
  private obstacleGraphics: Phaser.GameObjects.Graphics | null = null;

  // Level context
  private campaign?: CampaignConfig;
  private level?: LevelConfig;

  // Enemy stats
  private enemyHp = 100;

  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data?: { campaign?: CampaignConfig; level?: LevelConfig }): void {
    this.campaign = data?.campaign;
    this.level = data?.level ?? getLevelConfig('demo', 'nivel-vacio');
    this.enemyHp = 100;
    this.isDragging = false;
    this.canDrag = true;
  }

  private returnToLevelSelect(): void {
    // Navigation decision: after exit/victory, return to level selector
    this.scene.start('MainMenuScene', {
      returnToLevelSelect: true,
      campaignId: this.campaign?.id ?? 'demo',
    });
  }

  create(): void {
    // --- Background ---
    this.cameras.main.setBackgroundColor('#1e1e2e');

    // --- Arena walls (static) ---
    this.matter.world.setBounds(60, 110, 960, 1700);

    // --- Arena border ---
    const border = this.add.graphics();
    border.lineStyle(5, 0xffffff, 0.6);
    border.strokeRoundedRect(60, 110, 960, 1700, 40);

    // --- Obstacles (pinball layout, static physics + visuals) ---
    this.obstacleGraphics = this.add.graphics();
    this.spawnObstacles();

    // --- Player ball (purple, dynamic) ---
    const playerCircle = this.add.circle(540, 1610, 36, 0x8b5cf6);
    this.player = this.matter.add.gameObject(playerCircle, {
      restitution: 0.9,
      friction: 0.001,
      frictionAir: 0.02,
      density: 0.001,
    }) as unknown as Phaser.Physics.Matter.Image;
    playerCircle.setInteractive();
    this.player.setFixedRotation();

    // --- Direction line graphics ---
    this.directionLine = this.add.graphics();

    // --- Enemy (fire-red, static) ---
    const enemyCircle = this.add.circle(540, 260, 48, 0xef4444);
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
    this.input.on('pointerupoutside', this.onPointerUp, this);

    // --- Exit button (X) outside arena ---
    const exitX = this.add.text(1025, 55, 'X', {
      fontSize: '56px',
      color: '#ffffff',
    }).setInteractive({ useHandCursor: true });

    const battleModal = document.getElementById('battle-exit-modal');
    if (!battleModal) console.error('battle-exit-modal not found');
    const btnContinue = document.getElementById('battle-exit-continue');
    const btnAbandon = document.getElementById('battle-exit-abandon');

    exitX.on('pointerdown', () => {
      battleModal?.classList.remove('hidden');
    });
    btnContinue?.addEventListener('click', () => {
      battleModal?.classList.add('hidden');
    });
    btnAbandon?.addEventListener('click', () => {
      battleModal?.classList.add('hidden');
      this.returnToLevelSelect();
    });
  }

  update(): void {
    if (!this.player) return;

    const body = this.player.body as MatterJS.BodyType;
    if (body) {
      const velocity = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);

      // Ball stopped ' freeze it and allow drag again
      if (!this.isDragging && velocity < 0.3) {
        this.matter.body.setVelocity(body, { x: 0, y: 0 });
        this.canDrag = true;
      } else if (velocity >= 0.3) {
        this.canDrag = false;
      }
    }
  }

  private onPointerDown(pointer: Phaser.Input.Pointer): void {
    if (!this.player || !this.canDrag) return;

    const dist = Phaser.Math.Distance.Between(
      pointer.x, pointer.y,
      this.player.x, this.player.y
    );

    // Allow drag within 180px radius
    if (dist < 180) {
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

  private spawnObstacles(): void {
    const obstacles = this.level?.obstacles ?? [];
    if (!this.obstacleGraphics) return;
    this.obstacleGraphics.clear();
    this.obstacleGraphics.lineStyle(3, 0x22d3ee, 0.9);
    this.obstacleGraphics.fillStyle(0x0891b2, 0.35);

    for (const obs of obstacles) {
      if (obs.kind === 'circle') {
        this.obstacleGraphics.fillCircle(obs.x, obs.y, obs.radius);
        this.obstacleGraphics.strokeCircle(obs.x, obs.y, obs.radius);
        this.matter.add.circle(obs.x, obs.y, obs.radius, { isStatic: true, restitution: 0.95 });
      } else {
        const angleRad = Phaser.Math.DegToRad(obs.angleDeg ?? 0);
        // Visual (approx via rotated polygon)
        const hw = obs.width / 2;
        const hh = obs.height / 2;
        const corners = [
          { x: -hw, y: -hh },
          { x: hw, y: -hh },
          { x: hw, y: hh },
          { x: -hw, y: hh },
        ].map((p) => {
          const rx = p.x * Math.cos(angleRad) - p.y * Math.sin(angleRad);
          const ry = p.x * Math.sin(angleRad) + p.y * Math.cos(angleRad);
          return new Phaser.Geom.Point(obs.x + rx, obs.y + ry);
        });
        this.obstacleGraphics.fillPoints(corners, true);
        this.obstacleGraphics.strokePoints(corners, true);
        this.matter.add.rectangle(obs.x, obs.y, obs.width, obs.height, {
          isStatic: true,
          restitution: 0.95,
          angle: angleRad,
        });
      }
    }
  }

  private rayCircleHit(
    px: number, py: number, dx: number, dy: number, r: number, maxT: number, cx: number, cy: number, cr: number
  ): { t: number; nx: number; ny: number; x: number; y: number } | null {
    const R = r + cr;
    const ox = px - cx;
    const oy = py - cy;
    const b = 2 * (ox * dx + oy * dy);
    const c = ox * ox + oy * oy - R * R;
    const disc = b * b - 4 * c;
    if (disc < 0) return null;
    const sqrt = Math.sqrt(disc);
    const t1 = (-b - sqrt) / 2;
    const t2 = (-b + sqrt) / 2;
    const t = t1 > 0.001 ? t1 : t2 > 0.001 ? t2 : -1;
    if (t <= 0.001 || t >= maxT) return null;
    const x = px + dx * t;
    const y = py + dy * t;
    const nx = (x - cx) / R;
    const ny = (y - cy) / R;
    return { t, nx, ny, x, y };
  }

  private rayRectHit(
    px: number, py: number, dx: number, dy: number, r: number, maxT: number,
    cx: number, cy: number, hw: number, hh: number, angleRad: number
  ): { t: number; nx: number; ny: number; x: number; y: number } | null {
    // Transform ray into rect local space (unrotate by -angle around center)
    const cos = Math.cos(-angleRad);
    const sin = Math.sin(-angleRad);
    const lpx = (px - cx) * cos - (py - cy) * sin;
    const lpy = (px - cx) * sin + (py - cy) * cos;
    const ldx = dx * cos - dy * sin;
    const ldy = dx * sin + dy * cos;

    const minX = -hw - r;
    const maxX = hw + r;
    const minY = -hh - r;
    const maxY = hh + r;

    let tMin = -Infinity;
    let tMax = Infinity;
    let hitNx = 0;
    let hitNy = 0;

    if (Math.abs(ldx) < 1e-6) {
      if (lpx < minX || lpx > maxX) return null;
    } else {
      const inv = 1 / ldx;
      let t1 = (minX - lpx) * inv;
      let t2 = (maxX - lpx) * inv;
      let n1x = -1, n1y = 0, n2x = 1, n2y = 0;
      if (t1 > t2) { [t1, t2] = [t2, t1]; [n1x, n2x] = [n2x, n1x]; [n1y, n2y] = [n2y, n1y]; }
      if (t1 > tMin) { tMin = t1; hitNx = n1x; hitNy = n1y; }
      tMax = Math.min(tMax, t2);
      if (tMin > tMax) return null;
    }

    if (Math.abs(ldy) < 1e-6) {
      if (lpy < minY || lpy > maxY) return null;
    } else {
      const inv = 1 / ldy;
      let t1 = (minY - lpy) * inv;
      let t2 = (maxY - lpy) * inv;
      let n1x = 0, n1y = -1, n2x = 0, n2y = 1;
      if (t1 > t2) { [t1, t2] = [t2, t1]; [n1x, n2x] = [n2x, n1x]; [n1y, n2y] = [n2y, n1y]; }
      if (t1 > tMin) { tMin = t1; hitNx = n1x; hitNy = n1y; }
      tMax = Math.min(tMax, t2);
      if (tMin > tMax) return null;
    }

    const t = tMin > 0.001 ? tMin : tMax > 0.001 ? tMax : -1;
    if (t <= 0.001 || t >= maxT) return null;

    // Hit point in world space
    const hx = px + dx * t;
    const hy = py + dy * t;
    // Rotate normal back to world space
    const wcos = Math.cos(angleRad);
    const wsin = Math.sin(angleRad);
    const nx = hitNx * wcos - hitNy * wsin;
    const ny = hitNx * wsin + hitNy * wcos;
    return { t, nx, ny, x: hx, y: hy };
  }

  private getAimHit(
    posX: number, posY: number, nx: number, ny: number, remaining: number,
    left: number, right: number, top: number, bottom: number, ballRadius: number
  ): AimHit | null {
    let best: AimHit | null = null;

    const consider = (hit: AimHit | null) => {
      if (hit && hit.t < (best?.t ?? Number.POSITIVE_INFINITY)) best = hit;
    };

    // Walls
    if (nx < 0) consider({ kind: 'wall', t: (left + ballRadius - posX) / nx, nx: 1, ny: 0, x: 0, y: 0 });
    if (nx > 0) consider({ kind: 'wall', t: (right - ballRadius - posX) / nx, nx: -1, ny: 0, x: 0, y: 0 });
    if (ny < 0) consider({ kind: 'wall', t: (top + ballRadius - posY) / ny, nx: 0, ny: 1, x: 0, y: 0 });
    if (ny > 0) consider({ kind: 'wall', t: (bottom - ballRadius - posY) / ny, nx: 0, ny: -1, x: 0, y: 0 });
    // Filter invalid wall hits and fill x/y
    if (best && (best as AimHit).kind === 'wall') {
      if ((best as AimHit).t <= 0.001 || (best as AimHit).t >= remaining - 0.01) {
        best = null;
      } else {
        (best as AimHit).x = posX + nx * (best as AimHit).t;
        (best as AimHit).y = posY + ny * (best as AimHit).t;
      }
    }

    // Obstacles (Fase 2 prediction)
    for (const obs of this.level?.obstacles ?? []) {
      if (obs.kind === 'circle') {
        const h = this.rayCircleHit(posX, posY, nx, ny, ballRadius, remaining - 0.01, obs.x, obs.y, obs.radius);
        if (h) consider({ kind: 'obstacle', ...h });
      } else {
        const angleRad = Phaser.Math.DegToRad(obs.angleDeg ?? 0);
        const h = this.rayRectHit(posX, posY, nx, ny, ballRadius, remaining - 0.01, obs.x, obs.y, obs.width / 2, obs.height / 2, angleRad);
        if (h) consider({ kind: 'obstacle', ...h });
      }
    }

    const finalBest = best as AimHit | null;
    return finalBest && finalBest.t > 0.001 && finalBest.t < remaining - 0.01 ? finalBest : null;
  }
  private drawDottedSegment(x1: number, y1: number, x2: number, y2: number, segmentLength: number): void {
    if (!this.directionLine) return;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    const segments = Math.floor(len / segmentLength);
    for (let i = 0; i < segments; i += 2) {
      const t1 = i / segments;
      const t2 = Math.min((i + 1) / segments, 1);
      const sx1 = Phaser.Math.Linear(x1, x2, t1);
      const sy1 = Phaser.Math.Linear(y1, y2, t1);
      const sx2 = Phaser.Math.Linear(x1, x2, t2);
      const sy2 = Phaser.Math.Linear(y1, y2, t2);
      this.directionLine.lineBetween(sx1, sy1, sx2, sy2);
    }
  }

  private onPointerMove(pointer: Phaser.Input.Pointer): void {
    if (!this.isDragging || !this.player || !this.directionLine) return;

    // Slingshot: ball stays at dragOrigin, line shows launch trajectory with wall/obstacle bounces
    this.directionLine.clear();
    this.directionLine.lineStyle(3, 0xffffff, 0.5);

    // Direction: from pointer toward ball position (launch direction)
    const dirX = this.dragOrigin.x - pointer.x;
    const dirY = this.dragOrigin.y - pointer.y;
    const dist = Math.sqrt(dirX * dirX + dirY * dirY);

    if (dist < 10) return;

    let nx = dirX / dist;
    let ny = dirY / dist;

    // Line length = drag distance (clamped)
    const lineLength = Math.min(dist, 400);

    // Start from edge of ball
    const ballRadius = 36;
    let posX = this.dragOrigin.x + nx * (ballRadius + 6);
    let posY = this.dragOrigin.y + ny * (ballRadius + 6);

    // Arena bounds (matching world bounds)
    const left = 60;
    const right = 60 + 960;
    const top = 110;
    const bottom = 110 + 1700;

    let remaining = lineLength;
    let bounces = 0;
    const maxBounces = 2; // allow prediction over pinball obstacles
    const segmentLength = 15;

    while (remaining > 1 && bounces <= maxBounces) {
      const hit = this.getAimHit(posX, posY, nx, ny, remaining, left, right, top, bottom, ballRadius);

      if (hit) {
        this.drawDottedSegment(posX, posY, hit.x, hit.y, segmentLength);

        // Reflect direction across hit normal
        const dot = nx * hit.nx + ny * hit.ny;
        nx = nx - 2 * dot * hit.nx;
        ny = ny - 2 * dot * hit.ny;
        const nlen = Math.sqrt(nx * nx + ny * ny) || 1;
        nx /= nlen;
        ny /= nlen;

        // Nudge forward slightly to avoid re-hit
        posX = hit.x + nx * 0.5;
        posY = hit.y + ny * 0.5;
        remaining -= hit.t;
        bounces++;
        continue;
      }

      const endX = posX + nx * remaining;
      const endY = posY + ny * remaining;
      this.drawDottedSegment(posX, posY, endX, endY, segmentLength);
      break;
    }
  }

  private onPointerUp(pointer: Phaser.Input.Pointer): void {
    if (!this.isDragging || !this.player) return;
    this.isDragging = false;

    // Enable physics
    const body = this.player.body as MatterJS.BodyType;
    this.matter.body.setStatic(body, false);

    // Calculate launch: from pointer toward ball (opposite of drag)
    const dirX = this.dragOrigin.x - pointer.x;
    const dirY = this.dragOrigin.y - pointer.y;
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

    // Damage proportional to speed
    const damage = Math.max(1, Math.floor(speed));
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
          this.showVictory();
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

  private showVictory(): void {
    const modal = document.getElementById('battle-victory-modal');
    const btnReplay = document.getElementById('battle-victory-replay');
    const btnExit = document.getElementById('battle-victory-exit');

    if (!modal) return;
    modal.classList.remove('hidden');

    btnReplay?.addEventListener('click', () => {
      modal.classList.add('hidden');
      this.scene.restart();
    }, { once: true });

    btnExit?.addEventListener('click', () => {
      modal.classList.add('hidden');
      this.returnToLevelSelect();
    }, { once: true });
  }
}
