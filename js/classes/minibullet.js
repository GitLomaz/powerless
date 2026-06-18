class MiniBullet extends Phaser.GameObjects.Container {
  constructor(target) {
    super(scene, scene.player.x, scene.player.y);
    this.circle = scene.add.circle(0, 0, 2, 0x000000);
    this.add(this.circle);
    scene.add.existing(this);
    this.speed = gameState.upgrades.weapons.minigun.fireRate;
    this.damage = gameState.upgrades.weapons.minigun.damage;
    this.range = gameState.upgrades.weapons.minigun.range;
    scene.bulletGroup.add(this);
    this.body.setCircle(2, -2, -2);
    this.velocity = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);

    scene.time.delayedCall(this.range, () => {
      this.destroy();
    });
  }
}
