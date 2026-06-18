class T2 extends Enemy {
  constructor() {
    super();
    this.circle = scene.add.circle(0, 0, 12, 0x0000ff);
    this.add(this.circle);
    this.speed = 20;
    this.mode = "wander";
    this.body.setCircle(12, -12, -12);
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
    }
    if (Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y) < 400) {
      this.mode = "fire";
      console.log('fire')
    }
  }
}
