class Bullet extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, scene.player.x, scene.player.y);
    this.circle = scene.add.circle(0, 0, 6, 0x000000);
    this.add(this.circle);
    scene.add.existing(this);
    this.speed = gameState.upgrades.turretBulletSpeed;
    scene.bulletGroup.add(this);
    this.body.setCircle(6, -6, -6);

    const pointer = scene.input.activePointer;

    const worldPoint = scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
    );

    this.velocity = new Phaser.Math.Vector2(worldPoint.x - this.x, worldPoint.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);

    scene.time.delayedCall(gameState.upgrades.turretRange, () => {
      this.destroy();
    });
  }
}
