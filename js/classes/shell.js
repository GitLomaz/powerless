class Shell extends Phaser.GameObjects.Container {
  constructor() {
    const barrel = scene.player.barrel;
    const barrelLength = 32;
    const spawnX = scene.player.x + Math.cos(barrel.rotation) * barrelLength;
    const spawnY = scene.player.y + Math.sin(barrel.rotation) * barrelLength;
    super(scene, spawnX, spawnY);
    this.image = scene.add.image(0, 0, "mech-shell");
    this.image.setRotation(barrel.rotation);
    this.add(this.image);
    scene.add.existing(this);
    this.speed = gameState.upgrades.weapons.cannon.speed;
    this.damage = gameState.upgrades.weapons.cannon.damage;
    scene.bulletGroup.add(this);
    this.body.setCircle(6, -6, -6);

    // Travel along the barrel's angle (not toward the mouse)
    const velAngle = barrel.rotation;
    const vx = Math.cos(velAngle) * this.speed;
    const vy = Math.sin(velAngle) * this.speed;
    this.body.setVelocity(vx, vy);

    scene.time.delayedCall(gameState.upgrades.weapons.cannon.range, () => {
      this.destroy();
    });
  }
}
