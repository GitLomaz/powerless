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

    const pointer = scene.input.activePointer;
    const worldPoint = scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
    );

    this.velocity = new Phaser.Math.Vector2(worldPoint.x - this.x, worldPoint.y - this.y).normalize().scale(this.speed);
    this.body.setVelocity(this.velocity.x, this.velocity.y);

    scene.time.delayedCall(gameState.upgrades.weapons.cannon.range, () => {
      this.destroy();
    });
  }
}
