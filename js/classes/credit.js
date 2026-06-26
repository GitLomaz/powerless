class Credit extends Phaser.GameObjects.Container {
  constructor(denom, x, y, impactX, impactY) {
    super(scene, x, y);
    const size = Math.log10(denom) * 2 + 4;
    this.edge = scene.add.circle(0, 0, size, 0xAA6C39);
    this.circle = scene.add.circle(0, 0, size - 2, 0xFFD700);
    this.value = denom;
    this.add(this.edge);
    this.add(this.circle);
    scene.add.existing(this);
    scene.credits.push(this);
    scene.creditGroup.add(this);
    this.body.setCircle(size, -size, -size);
    this.speed = -100;
    const angleOffset = Phaser.Math.DegToRad(Random.between(-20, 20));

    this.velocity = new Phaser.Math.Vector2(
        impactX - this.x,
        impactY - this.y
    ).normalize().rotate(angleOffset).scale(Random.between(this.speed * 0.5, this.speed * 2));this.body.setVelocity(this.velocity.x, this.velocity.y);
    this.body.setDrag(80);
    this.life = 0
  }

  tick(delta) {
    if (!this.body) return;
    this.life += delta;
    if (this.life > 500) {
      let dist = Phaser.Math.Distance.Between(
        scene.player.x,
        scene.player.y,
        this.x,
        this.y
      );
      if (dist < gameState.upgrades.player.magnet) {
        scene.physics.moveToObject(this, scene.player, 300);
      }
    }
    if (this.life > 10000) {
      scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          this.destroy();
        },
      });
    }
  }

  collect() {
    this.destroy();
    scene.player.gainCredits(this.value);
  }
}
