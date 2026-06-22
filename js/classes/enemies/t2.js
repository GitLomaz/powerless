class T2 extends Enemy {
  constructor() {
    super();
    this.circle = scene.add.circle(0, 0, 12, 0x0000ff);
    this.add(this.circle);
    this.speed = 80;
    this.mode = "wander";
    this.body.setCircle(12, -12, -12);
    this.canShoot = false;
    this.tier = 2
    this.value = Random.between(8,18)
    this.damage = 100
    this.checkPromotion();
  }

  tick(delta) {
    const dt = delta / 1000;
    if (this.mode === "wander") {
      if (!this.target) {
        this.target = new Phaser.Math.Vector2(Random.between(0, scene.map.widthInPixels), Random.between(0, scene.map.heightInPixels));
      }
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const len = Math.hypot(dx, dy);
      if (len < 4) {
        this.target = null;
      } else {
        this.x += (dx / len) * this.speed * dt;
        this.y += (dy / len) * this.speed * dt;
      }
    } else if (this.mode === "chase") {
      const dx = scene.player.x - this.x;
      const dy = scene.player.y - this.y;
      const len = Math.hypot(dx, dy);
      if (len > 4) {
        this.x += (dx / len) * this.speed * dt;
        this.y += (dy / len) * this.speed * dt;
      }
    } else if (this.mode === "fire") {
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
