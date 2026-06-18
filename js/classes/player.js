class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH * 1.5, GAME_HEIGHT * 1.5);

    this.energy = gameState.upgrades.player.energy

    scene.physics.add.existing(this);
    this.body.setCircle(48, -48, -48);

    scene.cameras.main.startFollow(this);
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    scene.add.existing(this);

    this.creditsGained = 0;
    this.creditsGainedText = scene.add.text(20, 20, "Credits: 0", { font: "16px Arial", fill: "#2412c8" }).setOrigin(0).setDepth(4).setScrollFactor(0);

    this.lastShot = 0;


    this.dirX = 1;
    this.dirY = 0;

    this.feet = [
      this.createFoot( 36, -36).setAngle(-45 + 180),
      this.createFoot( 36,  36).setAngle(-45 - 90),
      this.createFoot(-36, -36).setAngle(45),
      this.createFoot(-36,  36).setAngle(-45)
    ];

    this.legs = [
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
    ];

    this.platform = scene.add.image(0, 0, "mech-body").setOrigin(0.5, 0.5);
    this.add(this.platform);

    this.barrel = scene.add.image(0, 0, "mech-barrel").setOrigin(0.5, 0.5).setDepth(4);
    this.add(this.barrel);
    this.setDepth(4);

    this.stepGroup = 0;
    this.stepLocked = false;

    
    this.powerbar = new Powerbar(Math.floor(gameState.upgrades.player.energy / 7500));
  }

  gainCredits(amount) {
    gameState.credits += amount;
    this.creditsGained += amount;
    this.creditsGainedText.setText(`Credits: ${this.creditsGained}`);
  }

  createFoot(offsetX, offsetY) {
    const foot = scene.add.image(
      this.x + offsetX,
      this.y + offsetY,
      "mech-foot"
    );

    foot.setDepth(2);

    foot.homeOffsetX = offsetX;
    foot.homeOffsetY = offsetY;

    foot.x = this.x + offsetX;
    foot.y = this.y + offsetY;

    foot.stepping = false;
    foot.t = 0;

    return foot;
  }

  tick(delta) {
    // Convert delta from milliseconds to seconds
    const dt = delta / 1000;

    this.energy -= delta;
    if (this.energy < 0) {
      return;
    }
    this.powerbar.setPower(this.energy / gameState.upgrades.player.energy);

    this.legs.forEach((leg, i) => {
      const foot = this.feet[i];

      const dx = foot.x - this.x;
      const dy = foot.y - this.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // Position at the start point
      leg.setPosition(this.x, this.y);

      // Rotate toward the foot
      leg.rotation = Math.atan2(dy, dx);

      // Stretch to match the distance
      leg.displayWidth = distance;
    });

    const cursors = scene.cursors;
    const wasd = scene.wasd;

    let dx = 0;
    let dy = 0;

    if (cursors.left.isDown || wasd.left.isDown) dx--;
    if (cursors.right.isDown || wasd.right.isDown) dx++;
    if (cursors.up.isDown || wasd.up.isDown) dy--;
    if (cursors.down.isDown || wasd.down.isDown) dy++;

    const len = Math.hypot(dx, dy);

    if (len > 0) {
      dx /= len;
      dy /= len;

      this.dirX = dx;
      this.dirY = dy;

      this.x += dx * gameState.upgrades.player.speed * dt;
      this.y += dy * gameState.upgrades.player.speed * dt;

      this.x = Phaser.Math.Clamp(this.x, 40, scene.map.widthInPixels - 40);
      this.y = Phaser.Math.Clamp(this.y, 40, scene.map.heightInPixels - 40);
    }

    this.updateFeet(delta);

    this.barrel.rotation = Math.atan2(scene.input.activePointer.worldY - this.y, scene.input.activePointer.worldX - this.x);
    if (scene.input.activePointer.isDown) {
      if (!this.lastShot || Date.now() - this.lastShot > gameState.upgrades.turretFireRate) {
        new Bullet();
        this.lastShot = Date.now();
      }
    }

    if (gameState.upgrades.minigun.enabled) {
      // Find nearest enemy within range
      let nearestEnemy = null;
      let nearestDist = Infinity;
      for (const enemy of scene.enemies) {
        const dist = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
        if (dist < nearestDist && dist < gameState.upgrades.minigun.range) {
          nearestDist = dist;
          nearestEnemy = enemy;
        }
      }
      // console.log(nearestEnemy.x, nearestEnemy.y);
      if ((!this.minigunLastShot || Date.now() - this.minigunLastShot > gameState.upgrades.minigun.fireRate) && nearestEnemy) {
        new MiniBullet(nearestEnemy);
        this.minigunLastShot = Date.now();
      }
    }

    if (gameState.upgrades.rocket.enabled) {
      // Find nearest enemy within range
      let nearestEnemy = null;
      let nearestDist = Infinity;
      for (const enemy of scene.enemies) {
        const dist = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
        if (dist < nearestDist && dist < gameState.upgrades.rocket.range) {
          nearestDist = dist;
          nearestEnemy = enemy;
        }
      }
      // console.log(nearestEnemy.x, nearestEnemy.y);
      if ((!this.rocketLastShot || Date.now() - this.rocketLastShot > gameState.upgrades.rocket.fireRate) && nearestEnemy) {
        new Rocket(nearestEnemy);
        this.rocketLastShot = Date.now();
      }
    }
  }

  updateFeet(delta) {
    const dt = delta / 1000;
    const STEP_DISTANCE = 40;
    const STEP_SPEED = 10;

    const groupA = [0, 3];
    const groupB = [1, 2];

    const activeGroup = this.stepGroup === 0 ? groupA : groupB;

    // If no foot is currently animating, we are allowed to start a new step cycle
    const anyStepping = this.feet.some(f => f.stepping);

    if (!anyStepping && !this.stepLocked) {
      let started = false;

      for (const i of activeGroup) {
        const foot = this.feet[i];

        const targetX = this.x + foot.homeOffsetX + this.dirX * 20;
        const targetY = this.y + foot.homeOffsetY + this.dirY * 20;

        const dist = Phaser.Math.Distance.Between(
          foot.x, foot.y,
          targetX, targetY
        );

        if (dist > STEP_DISTANCE) {
          const footprint = scene.add.image(
            foot.x,
            foot.y,
            "mech-footprint"
          )
          footprint.setDepth(1)
          footprint.setRotation(foot.rotation);
          footprint.setAlpha(.3);
          scene.tweens.add({
            targets: footprint,
            alpha: 0,
            duration: 10000,
            onComplete: () => footprint.destroy()
          });
          foot.stepping = true;
          foot.t = 0;

          foot.startX = foot.x;
          foot.startY = foot.y;

          foot.endX = targetX;
          foot.endY = targetY;

          started = true;
        }
      }

      // lock ONLY if we actually started a step
      if (started) {
        this.stepLocked = true;
      }
    }

    // Animate feet
    for (const foot of this.feet) {
      if (!foot.stepping) continue;

      foot.t += dt * STEP_SPEED;
      const t = Math.min(foot.t, 1);

      const lift = Math.sin(t * Math.PI) * 10;

      foot.x = Phaser.Math.Linear(foot.startX, foot.endX, t);
      foot.y = Phaser.Math.Linear(foot.startY, foot.endY, t) - lift;

      if (t >= 1) {
        foot.stepping = false;
      }
    }

    // When ALL feet finish, unlock and switch group
    if (this.stepLocked && !this.feet.some(f => f.stepping)) {
      this.stepGroup = 1 - this.stepGroup;
      this.stepLocked = false;
    }

    // Calculate center of mass, move body towards it
    let cx = 0;
    let cy = 0;
    let count = 0;

    for (const foot of this.feet) {
      if (foot.stepping) continue;

      cx += foot.x;
      cy += foot.y;
      count++;
    }

    if (count === 0) return;

    cx /= count;
    cy /= count;

    // Make body interpolation frame-rate independent
    const lerpFactor = 1 - Math.pow(0.01, dt);
    this.x = Phaser.Math.Linear(this.x, cx, lerpFactor);
    this.y = Phaser.Math.Linear(this.y, cy, lerpFactor);
  }
}