class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH * 1.5, GAME_HEIGHT * 1.5);

    this.circle = scene.add.circle(0, 0, 16, 0xffff00);
    this.add(this.circle);
    scene.cameras.main.setBounds(
      0,
      0,
      scene.map.widthInPixels,
      scene.map.heightInPixels
    );
    scene.cameras.main.startFollow(this);
    scene.add.existing(this);

    this.speed = 2;
  }

  tick(time) {
    const cursors = scene.cursors;
    const wasd = scene.wasd;
    let dx = 0;
    let dy = 0;

    if (cursors.left.isDown || wasd.left.isDown) dx--;
    if (cursors.right.isDown || wasd.right.isDown) dx++;
    if (cursors.up.isDown || wasd.up.isDown) dy--;
    if (cursors.down.isDown || wasd.down.isDown) dy++;

    const len = Math.hypot(dx, dy);

    if (len > 0) {
      dx /= len;
      dy /= len;
    }

    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }
}
