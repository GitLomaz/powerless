class Rocket extends Phaser.GameObjects.Container {
  constructor(target) {
    super(scene, scene.player.x, scene.player.y);

    this.target = target;

    this.circle = scene.add.circle(0, 0, 4, 0xff6600);
    this.add(this.circle);

    scene.add.existing(this);
    scene.bulletGroup.add(this);
    scene.bullets.push(this);

    this.body.setCircle(4, -4, -4);

    this.damage = gameState.upgrades.rocket.damage;

    // tuning
    this.speed = 150;
    this.maxSpeed = 400;
    this.acceleration = 250;
    this.turnRate = 2.5; // radians/sec

    // launch toward target
    this.velocity = new Phaser.Math.Vector2(
      scene.input.activePointer.worldX - this.x,
      scene.input.activePointer.worldY - this.y
    )
      .normalize()
      .scale(this.speed);

    this.body.setVelocity(
      this.velocity.x,
      this.velocity.y
    );

    // scene.time.delayedCall(
    //   gameState.upgrades.rocket.range,
    //   () => {
    //     if (this.active) this.destroy();
    //   }
    // );
  }

  tick(delta) {
    const dt = delta / 1000;

    if (!this.target || !this.target.active) {
      return;
    }

    // direction to target
    const desiredAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    // current flight direction
    const currentAngle = this.velocity.angle();

    // rotate gradually toward target
    const newAngle = Phaser.Math.Angle.RotateTo(
      currentAngle,
      desiredAngle,
      this.turnRate * dt
    );

    // accelerate
    this.speed = Math.min(
      this.speed + this.acceleration * dt,
      this.maxSpeed
    );

    // update velocity
    this.velocity.setToPolar(
      newAngle,
      this.speed
    );

    this.body.setVelocity(
      this.velocity.x,
      this.velocity.y
    );

    // point rocket where it's flying
    this.rotation = newAngle;
  }

  destroy() {
    const index = scene.bullets.indexOf(this);
    if (index > -1) {
      scene.bullets.splice(index, 1);
    }
    super.destroy();
  }
}