class T1 extends Enemy {
  constructor() {
    super();
    this.sprite = scene.add.sprite(0, 0, "enemy-jeep");
    this.sprite.setScale(0.7);
    this.add(this.sprite);
    this.speed = Random.between(25, 70);
    this.mode = "wander";
    this.body.setCircle(24, -24, -24);
    this.tier = 1
    this.damage = 0
    this.value = Random.between(2,5)
    this.checkPromotion();

    this.target = new Phaser.Math.Vector2(
      Random.between(0, scene.map.widthInPixels),
      Random.between(0, scene.map.heightInPixels)
    );
    this.sprite.rotation = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    this.distanceTrveled = 0;
  }

  tick(delta) {
    const dt = delta / 1000;
    if (!this.target) {
      this.target = new Phaser.Math.Vector2(
        Random.between(0, scene.map.widthInPixels),
        Random.between(0, scene.map.heightInPixels)
      );
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const len = Math.hypot(dx, dy);

    if (len < 4) {
      this.target = null;
      return;
    }

    // Desired heading
    const targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    // Turn speed (radians per second)
    const turnSpeed = .3;

    // Smoothly rotate toward target
    this.sprite.rotation = Phaser.Math.Angle.RotateTo(
      this.sprite.rotation,
      targetAngle,
      turnSpeed * dt
    );

    this.distanceTrveled += this.speed * dt;

    // Move forward in current facing direction
    this.x += Math.cos(this.sprite.rotation) * this.speed * dt;
    this.y += Math.sin(this.sprite.rotation) * this.speed * dt;
    if (this.distanceTrveled > 10) { 
      const footprint = scene.add.image(
        this.x,
        this.y,
        "enemy-jeep-tread"
      )
      footprint.setDepth(0)
      footprint.setRotation(this.sprite.rotation);
      footprint.setAlpha(.3);
      scene.tweens.add({
        targets: footprint,
        alpha: 0,
        duration: 2000,
        onComplete: () => footprint.destroy()
      });
      this.distanceTrveled = 0;
    }
  }
}
