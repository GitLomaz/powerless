class Credit extends Phaser.GameObjects.Container {
  constructor(x, y, impactX, impactY) {
    super(scene, x, y);
    this.circle = scene.add.circle(0, 0, 6, 0xFFD700);
    this.add(this.circle);
    scene.add.existing(this);
    scene.credits.push(this);
    scene.creditGroup.add(this);
    this.body.setCircle(6, -6, -6);
    this.speed = -100;
    this.velocity = new Phaser.Math.Vector2(impactX - this.x, impactY - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);
    this.body.setDrag(80);
  }

  tick(delta) {
    if (!this.body) return;
    let dist = Phaser.Math.Distance.Between(
      scene.player.x,
      scene.player.y,
      this.x,
      this.y
    );
    if (dist < scene.player.magnet) {
      scene.physics.moveToObject(this, scene.player, 300);
    }
  }
}
