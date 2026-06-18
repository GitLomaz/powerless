class Bullet extends Phaser.GameObjects.Container {
  constructor(origin, target, friendly = true) {
    super(scene, origin.x, origin.y);
    this.image = scene.add.image(0, 0, "bullet");
    this.image.setTint(friendly ? 0x00ff00 : 0xff0000);
    this.setRotation(Math.atan2(target.y - this.y, target.x - this.x));
    this.add(this.image);
    scene.add.existing(this);
    if (friendly) {
      this.speed = gameState.upgrades.weapons.minigun.fireRate;
      this.damage = gameState.upgrades.weapons.minigun.damage;
      this.range = gameState.upgrades.weapons.minigun.range;
      scene.bulletGroup.add(this);
    } else {
      this.speed = 200;
      this.damage = 10;
      this.range = 2000;
      scene.enemyBulletGroup.add(this);
    }

    this.body.setCircle(2, -2, -2);
    this.velocity = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);
    scene.time.delayedCall(this.range, () => {
      this.destroy();
    });
  }
}
