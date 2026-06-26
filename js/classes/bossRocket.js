class BossRocket extends Phaser.GameObjects.Container {
  constructor(source, target, angleOffset = 0) {
    super(scene, source.x, source.y);
    this.target = target;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.enemyBulletGroup.add(this);
    scene.bullets.push(this);

    this.metaType = "bossRocket";
    this.damage = 60000;

    // Visual setup
    this.sprite = scene.add.sprite(0, 0, "bossRocket");
    this.sprite.play("bossRocket");
    this.sprite.setScale(1.5);
    this.add(this.sprite);

    // Physics setup
    this.body.setCircle(4, -4, -4);

    // Movement properties - slow curving
    this.speed = 250;
    this.maxSpeed = 350;
    this.acceleration = 80;
    this.turnRate = 0.4; // Slow turning for dramatic curving
    this.cooldown = 500; // Initial delay before homing

    // Launch at turret angle + offset (for side launches)
    const baseAngle = source.barrel ? source.barrel.rotation : (source.rotation || 0);
    const launchAngle = baseAngle + angleOffset;
    this.rotation = launchAngle;

    const spread = Phaser.Math.DegToRad(Phaser.Math.FloatBetween(-3, 3));
    const angle = launchAngle + spread;

    this.body.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );

    // Auto-destroy after 12 seconds
    scene.time.delayedCall(12000, () => {
      if (this.active) {
        this.destroy();
      }
    });
  }

  tick(delta) {
    if (!this.active || !this.target || !this.target.active) return;

    const dt = Math.min(delta, 33) / 1000;
    this.cooldown -= delta;

    const currentAngle = this.body.velocity.angle();
    const desiredAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    // Wait for cooldown before homing
    if (this.cooldown > 0) {
      this.rotation = currentAngle;
      return;
    }

    // Slowly curve toward target
    let diff = Phaser.Math.Angle.Wrap(desiredAngle - currentAngle);
    const maxTurn = this.turnRate * dt;
    diff = Phaser.Math.Clamp(diff, -maxTurn, maxTurn);

    const newAngle = currentAngle + diff;

    // Gradually accelerate
    this.speed = Math.min(
      this.speed + this.acceleration * dt,
      this.maxSpeed
    );

    this.body.setVelocity(
      Math.cos(newAngle) * this.speed,
      Math.sin(newAngle) * this.speed
    );

    this.rotation = newAngle;
  }

  destroy() {
    const index = scene.bullets.indexOf(this);
    if (index > -1) scene.bullets.splice(index, 1);
    super.destroy();
  }

  explode(duration = 500) {
    scene.sounds["explosion"].play();
    
    const explosion = scene.add.circle(
      this.x,
      this.y,
      1,
      0xff3300,
      0.5
    );

    const splashRadius = 80; // Boss rocket explosion radius
    const hitTargets = new Set();

    scene.tweens.add({
      targets: explosion,
      radius: splashRadius,
      alpha: 0,
      duration,
      ease: "Quad.Out",

      onUpdate: () => {
        const radius = explosion.radius;
        const radiusSq = radius * radius;

        // Damage player if in range
        if (scene.player && scene.player.active && !hitTargets.has(scene.player)) {
          const dx = scene.player.x - this.x;
          const dy = scene.player.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            scene.player.energy -= this.damage;
            hitTargets.add(scene.player);
          }
        }
      },

      onComplete: () => {
        explosion.destroy();
      }
    });

    this.destroy();
  }
}