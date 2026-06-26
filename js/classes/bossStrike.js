class BossStrike {
  constructor(boss) {
    const x = scene.player.x
    const y = scene.player.y
    this.boss = boss
    this.target = scene.add.image(x, y, "mortar-target");
    this.target.setDepth(400);
    this.target.setScale(2)
    scene.add.existing(this.target);
    this.tween = scene.tweens.add({
      targets: this.target,
      rotation: 2 * Math.PI,  
      loop: -1,
      duration: 1000,
    });
    this.crosshairs = scene.add.image(x, y, "mortar-crosshairs");
    this.crosshairs.setScale(0.2);
    this.crosshairs.setDepth(400);
    scene.add.existing(this.crosshairs);
    this.tween2 = scene.tweens.add({
      targets: this.crosshairs,
      rotation: -(2 * Math.PI),
      scale: 2,  
      loop: -1,
      duration: 5000,
    });

    this.projectile = scene.add.sprite(x - 300, y - 3000, "boss-bigboy");
    scene.add.existing(this.projectile);
    this.projectile.setDepth(500);
    this.projectile.setRotation(Math.atan2(y - this.projectile.y, x - this.projectile.x));
    scene.sounds["incoming"].play();
    this.projectileTween = scene.tweens.add({
      targets: this.projectile,
      x: x,
      y: y,
      duration: 5000,
      onComplete: () => {
        this.projectile.destroy();
        this.target.destroy();
        this.crosshairs.destroy();
        this.explode(x, y);
      }
    });
  }
  explode(x, y) {
    scene.sounds["explosion"].play();
    const crater = scene.add.image(x, y, "crater");
    crater.setDepth(300);
    crater.setAlpha(0.5);
    scene.tweens.add({
      targets: crater,
      alpha: 0,
      duration: 5000,
      onComplete: () => {
        crater.destroy();
      }
    });
    const damage = 30000;
    const duration = 700
    const explosion = scene.add.circle(
      x,
      y,
      1,
      0xffaa00,
      0.8
    );

    scene.add.existing(explosion);
    const hitEnemies = new Set();
    hitEnemies.add(this.boss);
    scene.tweens.add({
      targets: explosion,
      radius: 300,
      alpha: 0,
      duration,
      ease: "Quad.Out",
      onUpdate: () => {
        // check if hit player
        if (scene.player && scene.player.active && !hitEnemies.has(scene.player)) {
          const dx = scene.player.x - x;
          const dy = scene.player.y - y;
          const distSq = dx * dx + dy * dy;
          const radius = explosion.radius;
          const radiusSq = radius * radius;

          if (distSq <= radiusSq) {
            scene.player.energy -= damage;
            hitEnemies.add(scene.player);
          }
        }

        const radius = explosion.radius;
        const radiusSq = radius * radius;

        for (const enemy of scene.enemies) {
          if (!enemy.active || hitEnemies.has(enemy)) continue;

          const dx = enemy.x - x;
          const dy = enemy.y - y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            enemy.takeDamage(damage, x, y);
            hitEnemies.add(enemy);
          }
        }
      },

      onComplete: () => {
        explosion.destroy();
      }
    });
  }
}
