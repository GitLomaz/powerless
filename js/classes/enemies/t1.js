class T1 extends Enemy {
  constructor() {
    super();
    this.circle = scene.add.circle(0, 0, 12, 0xff0000);
    this.add(this.circle);
    this.speed = 20;
    this.mode = "wander";
    this.body.setCircle(12, -12, -12);
    this.tier = 1
    this.damage = 0
    this.value = Random.between(2,5)
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
    }
  }
}
