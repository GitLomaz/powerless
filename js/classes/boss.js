class Boss extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    
    scene.physics.add.existing(this);
    this.body.setCircle(128, -128, -128);
    scene.enemyGroup.add(this);
    scene.add.existing(this);

    this.tier = 5

    this.dirX = 1;
    this.dirY = 0;

    // Create 8 feet evenly spaced in a circle (45° apart)
    this.feet = [
      this.createFoot( 50 * 2,   0).setAngle(0),
      this.createFoot( 35 * 2, -35 * 2).setAngle(45),
      this.createFoot(  0, -50 * 2).setAngle(90),
      this.createFoot(-35 * 2, -35 * 2).setAngle(135),
      this.createFoot(-50 * 2,   0).setAngle(180),
      this.createFoot(-35 * 2,  35 * 2).setAngle(225),
      this.createFoot(  0,  50 * 2).setAngle(270),
      this.createFoot( 35 * 2,  35 * 2).setAngle(315)
    ];

    this.legs = [
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3),
    ];

    this.platform = scene.add.image(0, 0, "boss-body").setOrigin(0.5, 0.5);
    this.add(this.platform);

    this.barrel = scene.add.image(0, 0, "boss-barrel").setOrigin(0.5, 0.5).setDepth(4);
    this.add(this.barrel);
    this.setDepth(4);

    this.stepGroup = 0;
    this.stepLocked = false;

    // Boss speed
    this.speed = 50;

    this.health = 80000;
    this.maxHealth = 80000;
    this.powerbar = new BossPowerbar(20);
    this.active = true;
  }

  createFoot(offsetX, offsetY) {
    const foot = scene.add.image(
      this.x + offsetX,
      this.y + offsetY,
      "boss-foot"
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
    // Don't do anything if boss is destroyed
    if (!this.active) return;

    // Convert delta from milliseconds to seconds
    const dt = delta / 1000;

    // Update leg positions and scale them
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
      leg.displayHeight = 8;
    });

    // Always walk toward the player
    if (scene.player) {
      let dx = scene.player.x - this.x;
      let dy = scene.player.y - this.y;

      const len = Math.hypot(dx, dy);

      if (len > 0) {
        dx /= len;
        dy /= len;

        this.dirX = dx;
        this.dirY = dy;

        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;

        this.x = Phaser.Math.Clamp(this.x, 40, scene.map.widthInPixels - 40);
        this.y = Phaser.Math.Clamp(this.y, 40, scene.map.heightInPixels - 40);
      } else {
        this.dirX = 0;
        this.dirY = 0;
      }
    }

    this.updateFeet(delta);

    // Point barrel toward player
    if (scene.player) {
      this.barrel.rotation = Math.atan2(scene.player.y - this.y, scene.player.x - this.x);
    }
  }

  updateFeet(delta) {
    const dt = delta / 1000;
    const STEP_DISTANCE = 20;
    const STEP_SPEED = 10;

    // 8 legs - 4 groups of 2 legs (adjacent pairs)
    const groups = [
      [0, 2],
      [1, 3],
      [4, 6],
      [5, 7]
    ];

    const activeGroup = groups[this.stepGroup];

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
            "boss-footprint"
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
      this.stepGroup = (this.stepGroup + 1) % 4;
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

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.destroy();
    }
    this.powerbar.setPower(this.health / this.maxHealth);
  }

  destroy() {
    // Mark as inactive immediately
    this.active = false;
    // Destroy all feet
    this.feet.forEach(foot => {
      if (foot && foot.destroy) {
        foot.destroy();
      }
    });

    // Destroy all legs
    this.legs.forEach(leg => {
      if (leg && leg.destroy) {
        leg.destroy();
      }
    });

    // Destroy powerbar
    // if (this.powerbar && this.powerbar.destroy) {
    //   this.powerbar.destroy();
    // }

    // Call parent destroy
    super.destroy();
  }
}