class T2 extends Enemy {
  constructor() {
    super();
    this.tankBody = scene.add.image(0, 0, "enemy-tank-body");
    this.tankBarrel = scene.add.image(0, 0, "enemy-tank-barrel");
    this.add(this.tankBody);
    this.add(this.tankBarrel);
    this.speed = 60;
    this.body.setCircle(32, -32, -32);
    this.canShoot = true;
    this.tier = 2
    this.value = Random.between(8,18)
    this.damage = 100
    this.checkPromotion();
    this.distanceTrveled = 0;
  }

  tick(delta) {
    this.mode = Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y) < 400 ? "fire" : "wander";
    const dt = delta / 1000;
    if (this.mode === "wander") {
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

      const targetAngle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y
      );

      const turnSpeed = .3;

      this.tankBody.rotation = Phaser.Math.Angle.RotateTo(
        this.tankBody.rotation,
        targetAngle,
        turnSpeed * dt
      );
      this.tankBarrel.rotation = this.tankBody.rotation;

      this.distanceTrveled += this.speed * dt;

      // Move forward in current facing direction
      this.x += Math.cos(this.tankBody.rotation) * this.speed * dt;
      this.y += Math.sin(this.tankBody.rotation) * this.speed * dt;
      if (this.distanceTrveled > 20) { 
        const footprint = scene.add.image(
          this.x,
          this.y,
          "enemy-tank-tread"
        )
        footprint.setDepth(0)
        footprint.setRotation(this.tankBody.rotation);
        footprint.setAlpha(.3);
        scene.tweens.add({
          targets: footprint,
          alpha: 0,
          duration: 4000,
          onComplete: () => footprint.destroy()
        });
        this.distanceTrveled = 0;
      }
    } else if (this.mode === "fire") {
      this.tankBarrel.rotation = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        scene.player.x,
        scene.player.y
      );
      this.fireCooldown -= delta;
      if (this.canShoot) {
        new Bullet(this, scene.player, false, this.damage);
        this.canShoot = false;
        let cooldown = Phaser.Math.Between(0,2000);
        this.scene.time.delayedCall(cooldown, () => {
          this.canShoot = true;
        });
      }
    }
    // Calculate distance once using squared distance (avoids expensive sqrt)
    const dx = scene.player.x - this.x;
    const dy = scene.player.y - this.y;
    const distSq = dx * dx + dy * dy;
    
    if (distSq < 300 * 300) {
      this.mode = "fire";
    } else if (distSq < 800 * 800) {
      this.mode = "chase";
    } else {
      this.mode = "wander";
    }
  }
}
