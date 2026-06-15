class Bullet extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, scene.player.x, scene.player.y);
    this.circle = scene.add.circle(0, 0, 6, 0x000000);
    this.add(this.circle);
    scene.add.existing(this);
    this.speed = 400;
    scene.bulletGroup.add(this);
    this.body.setCircle(6, -6, -6);
    this.velocity = new Phaser.Math.Vector2(scene.input.activePointer.worldX - this.x, scene.input.activePointer.worldY - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);
  }

  tick(delta) {
    
  }
}
