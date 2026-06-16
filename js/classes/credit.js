class Credit extends Phaser.GameObjects.Container {
  constructor(x, y, impactX, impactY, value = 1) {
    super(scene, x, y);
    this.circle = scene.add.circle(0, 0, 6, 0xFFD700);
    this.value = value;
    this.add(this.circle);
    scene.add.existing(this);
    scene.credits.push(this);
    scene.creditGroup.add(this);
    this.body.setCircle(6, -6, -6);
    this.speed = -100;
    this.velocity = new Phaser.Math.Vector2(impactX - this.x, impactY - this.y).normalize().scale(Random.between(this.speed * 0.5, this.speed * 2));
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

  collect() {
    this.destroy();
    scene.player.gainCredits(this.value);
  }
}
