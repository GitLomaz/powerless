class Bullet extends Phaser.GameObjects.Container {
  constructor(origin, target, friendly = true) {
    super(scene, origin.x, origin.y);
    this.image = scene.add.image(0, 0, friendly ? "bullet" : "enemyBullet")
    this.setRotation(Math.atan2(target.y - this.y, target.x - this.x));
    this.add(this.image);
    this.metaType = "bullet";
    scene.add.existing(this);
    if (friendly) {
      this.speed = gameState.upgrades.weapons.minigun.fireRate;
      this.damage = gameState.upgrades.weapons.minigun.damage;
      scene.bulletGroup.add(this);
    } else {
      this.speed = 200;
      this.damage = 10;
      scene.enemyBulletGroup.add(this);
    }

    this.body.setCircle(2, -2, -2);
    this.velocity = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);
    // scene.time.delayedCall(this.range, () => {
    //   this.destroy();
    // });
  }
}
