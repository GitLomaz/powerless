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

  takeDamage(amount, impactX, impactY) {
    this.health -= amount;
    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000, 1);
    this.healthBar.fillRect(-25, -40, 50 * (this.health / this.healthMax), 5);
    if (this.health <= 0) {
      this.die(impactX, impactY);
    }
  }

  die(impactX, impactY) {
    new Credit(this.x, this.y, impactX, impactY);
    this.destroy();
  }

  destroy() {
    const index = scene.enemies.indexOf(this);
    if (index > -1) {
      scene.enemies.splice(index, 1);
    }
    super.destroy();
  }
}
