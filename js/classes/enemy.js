class Enemy extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, Random.between(GAME_WIDTH - 200, GAME_WIDTH * 2 + 200), Random.between(GAME_HEIGHT - 200, GAME_HEIGHT * 2 + 200));
    scene.add.existing(this);
    scene.enemyGroup.add(this);
  }

  die(impactX, impactY) {
    new Credit(this.x, this.y, impactX, impactY);
    this.destroy();
  }
}
