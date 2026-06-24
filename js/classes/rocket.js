class Rocket extends Phaser.GameObjects.Container {
  constructor(source, target, friendly = true, damage) {
    super(scene, source.x, source.y);

    this.target = target;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.metaType = "rocket";

    this.sprite = scene.add.sprite(0, 0, friendly ? "rocket" : "enemyRocket");
    this.sprite.play(friendly ? "rocket" : "enemyRocket");
    this.sprite.setScale(1.5);
    this.add(this.sprite);

    if (friendly) {
      scene.bulletGroup.add(this);
      this.speed = 250;
      this.maxSpeed = 600;
      this.acceleration = 350;
      this.turnRate = 3.5; // radians/sec
      this.damage = gameState.upgrades.weapons.rocket.damage;
    } else {
      scene.enemyBulletGroup.add(this);
      this.speed = 50;
      this.maxSpeed = 120;
      this.acceleration = 20;
      this.turnRate = 2; // radians/sec
      this.damage = damage;
    }
    scene.bullets.push(this);

    this.body.setCircle(4, -4, -4);
    this.cooldown = 500;
    const launchAngle = scene.player.barrel.rotation;
    this.rotation = launchAngle;

    const spread = Phaser.Math.DegToRad(
      Phaser.Math.FloatBetween(-5, 5)
    );

    const angle = launchAngle + spread;

    this.body.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );
  }

  tick(delta) {
    if (!this.active) return;
    if (!this.target || !this.target.active) return;

    const dt = Math.min(delta, 33) / 1000;

    this.cooldown -= delta;

    const currentAngle = this.body.velocity.angle();

    const desiredAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    if (this.cooldown > 0) {
      this.rotation = currentAngle;
      return;
    }

    let diff = Phaser.Math.Angle.Wrap(desiredAngle - currentAngle);

    const maxTurn = this.turnRate * dt;
    diff = Phaser.Math.Clamp(diff, -maxTurn, maxTurn);

    const newAngle = currentAngle + diff;

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

  explode(duration = 350) {
    scene.sounds["explosion"].play();
    const explosion = scene.add.circle(
      this.x,
      this.y,
      1,
      0xffaa00,
      0.4
    );

    const hitEnemies = new Set();

    scene.tweens.add({
      targets: explosion,
      radius: gameState.upgrades.weapons.rocket.splash,
      alpha: 0,
      duration,
      ease: "Quad.Out",

      onUpdate: () => {
        const radius = explosion.radius;
        const radiusSq = radius * radius;

        for (const enemy of scene.enemies) {
          if (!enemy.active || hitEnemies.has(enemy)) continue;

          const dx = enemy.x - this.x;
          const dy = enemy.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            enemy.takeDamage(gameState.upgrades.weapons.rocket.damage, explosion.x, explosion.y);
            hitEnemies.add(enemy);
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