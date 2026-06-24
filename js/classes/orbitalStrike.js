class OrbitalStrike {
  constructor(x, y) {
    this.target = scene.add.image(x, y, "target");
    this.target.setDepth(400);
    scene.add.existing(this.target);
    this.tween = scene.tweens.add({
      targets: this.target,
      rotation: 2 * Math.PI,  
      loop: -1,
      duration: 1000,
    });
    this.projectile = scene.add.sprite(x - 3000, y - 3000, "rocket");
    scene.add.existing(this.projectile);
    this.projectile.play("rocket");
    this.projectile.setDepth(500);
    this.projectile.setScale(2);
    this.projectile.setRotation(Math.atan2(y - this.projectile.y, x - this.projectile.x));
    this.projectileTween = scene.tweens.add({
      targets: this.projectile,
      x: x,
      y: y,
      duration: 3000,
      onComplete: () => {
        this.projectile.destroy();
        this.target.destroy();
        this.explode(x, y);
      }
    });
  }
  explode(x, y) {
    scene.sounds["explosion"].play();
    const damage = gameState.upgrades.abilities.orbitalStrike.damage;
    const duration = 350
    const explosion = scene.add.circle(
      x,
      y,
      1,
      0xffaa00,
      0.4
    );

    scene.add.existing(explosion);
    const hitEnemies = new Set();

    scene.tweens.add({
      targets: explosion,
      radius: 150,
      alpha: 0,
      duration,
      ease: "Quad.Out",
      onUpdate: () => {
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
