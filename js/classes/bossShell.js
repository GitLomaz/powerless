class BossShell extends Phaser.GameObjects.Container {
  constructor(origin, target) {
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x);
    const offsetX = Math.cos(angle) * 80;
    const offsetY = Math.sin(angle) * 80;
    super(scene, origin.x + offsetX, origin.y + offsetY);
    this.image = scene.add.image(0, 0, "boss-shell")
    this.setRotation(Math.atan2(target.y - this.y, target.x - this.x));
    this.add(this.image);
    this.setScale(3);
    this.metaType = "bullet";
    scene.add.existing(this);

    this.speed = 600;
    this.damage = 15000;
    scene.enemyBulletGroup.add(this);

    this.body.setCircle(2, -2, -2);
    this.velocity = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);
    scene.time.delayedCall(3000, () => {
      this.destroy();
    });
  }
}
