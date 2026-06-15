class Enemy extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, Random.between(0, scene.map.widthInPixels), Random.between(0, scene.map.heightInPixels));
    this.circle = scene.add.circle(0, 0, 12, 0xff0000);
    this.add(this.circle);
    scene.add.existing(this);
    this.speed = .02;
    this.mode = "wander";
  }

  tick(delta) {
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
        this.x += (dx / len) * this.speed * delta;
        this.y += (dy / len) * this.speed * delta;
      }
    }
  }
}
