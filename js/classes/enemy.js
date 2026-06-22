class Enemy extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, Random.between(GAME_WIDTH - 200, GAME_WIDTH * 2 + 200), Random.between(GAME_HEIGHT - 200, GAME_HEIGHT * 2 + 200));
    scene.add.existing(this);
    scene.enemyGroup.add(this);
    this.healthMax = 100;
    this.health = 100;
    this.healthBar = scene.add.graphics();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(-25, -40, 50, 5);
    this.add(this.healthBar);
  }

  checkPromotion() {
    if (Random.xInY(gameState.upgrades.spawns['tier' + this.tier].promotion * 100, 100)) {
      this.promoted = true;
      this.speed = this.speed * 1.5
      this.damage = this.damage * 2
      this.health = this.health * 2
      this.healthMax = this.healthMax * 2
      this.aura = scene.add.image(0, 0, "aura");
      scene.tweens.add({
        targets: this.aura,
        rotation: 2 * Math.PI,
        duration: 1000,
        repeat: -1
      });
      this.add(this.aura);
    }
  }

  takeDamage(amount, impactX, impactY) {
    this.health -= amount;
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(-25, -40, 50 * (this.health / this.healthMax), 5);
    if (this.health <= 0) {
      const healthMax = this.healthMax
      this.die(impactX, impactY);
      this.explode(gameState.upgrades.spawns['tier' + this.tier].explosion, healthMax);
    }
  }

  explode(radius, damage) {
    if (!radius || radius <= 0) return;
    const duration = 350
    // Capture coordinates before destroying
    const explosionX = this.x;
    const explosionY = this.y;
    const explosion = scene.add.circle(
      explosionX,
      explosionY,
      1,
      0xffaa00,
      0.4
    );
    const hitEnemies = new Set();
    scene.tweens.add({
      targets: explosion,
      radius: radius,
      alpha: 0,
      duration,
      ease: "Quad.Out",

      onUpdate: () => {
        const radius = explosion.radius;
        const radiusSq = radius * radius;

        for (const enemy of scene.enemies) {
          if (!enemy.active || hitEnemies.has(enemy)) continue;

          const dx = enemy.x - explosionX;
          const dy = enemy.y - explosionY;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            console.log(damage / 4)
            enemy.takeDamage(damage / 4, explosion.x, explosion.y);
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

  die(impactX, impactY) {
    if (gameState.upgrades.player.energyLeech.enabled) {
      const energyGained = gameState.upgrades.player.energyLeech.amount;
      if (Random.xInY(gameState.upgrades.player.energyLeech.chance * 10, 10)) {
        scene.player.energy += energyGained;
        if (scene.player.energy > gameState.upgrades.player.energy) {
          scene.player.energy = gameState.upgrades.player.energy;
        }
        scene.player.createLeechLine(this);
      }
    }

    this.payout(impactX, impactY);
    this.destroy();
    setTimeout(() => {
      switch (this.tier) {
        case 1:
          scene.enemies.push(new T1());
          break;
        case 2:
          scene.enemies.push(new T2());
          break;
        case 3:
          scene.enemies.push(new T3());
          break;
        case 4:
          scene.enemies.push(new T4());
          break;
      }
    }, 4000);
  }

  payout(impactX, impactY) {
    // return;
    const DENOMS = [10000, 1000, 100, 25, 50, 10, 5, 1];
    this.value = this.value * gameState.upgrades.player.dropRate;
    if (Random.xInY(gameState.upgrades.spawns['tier' + this.tier].doubleDrop * 100, 100)) {
      this.value = this.value * 2
    }
    for (const denom of DENOMS) {
        let spawns = Math.floor(this.value / denom);
        if (spawns > 0) {
          for (let i = 0; i < spawns; i++) {
            new Credit(denom, this.x, this.y, impactX, impactY);
          }
        }
        this.value %= denom;
    }
  }

  destroy() {
    const index = scene.enemies.indexOf(this);
    if (index > -1) {
      scene.enemies.splice(index, 1);
    }
    super.destroy();
  }
}
