class T4 extends Enemy {
  constructor() {
    super();
    this.circle = scene.add.circle(0, 0, 12, 0x00FFff);
    this.add(this.circle);
    this.speed = 80;
    this.mode = "wander";
    this.body.setCircle(12, -12, -12);
    this.fireCooldown = Random.between(0, 10000);
    this.tier = 4
    this.value = Random.between(80,200)
    this.damage = 2000
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
      if (this.fireCooldown <= 0) {
        new Rocket(this, scene.player, false);
        this.fireCooldown = 10000;
      }
    }
    if (Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y) < 800) {
      this.mode = "fire";
    } else if (Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y) < 1300) {
      this.mode = "chase";
    } else {
      this.mode = "wander";
    }
  }
}
