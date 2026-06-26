class ResupplyPack extends Phaser.GameObjects.Container {
  constructor(x, y, value) {
    super(scene, x, y);
    this.value = value;
    this.sprite = scene.add.sprite(0, 0, "resupply");
    this.falling = true
    this.setDepth(500);
    this.add(this.sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.shadow = scene.add.ellipse(this.x, this.y + 530, 40, 10, 0x000000);
    this.shadow.setAlpha(0.1);
    this.body.setSize(
        48,
        48
    );
    this.body.setOffset(
        -24,
        0
    );
    scene.resupplyGroup.add(this);
    // Falling animation
    scene.tweens.add({
        targets: this,
        y: this.y + 500,
        duration: 5000,
        onComplete: () => {
            this.sprite.setFrame(1);
            this.wiggle.stop();
            this.falling = false;
        }
    });

    scene.tweens.add({
        targets: this.shadow,
        alpha: .6,
        duration: 5000
    });

    // Wiggle while falling
    this.wiggle = scene.tweens.add({
        targets: [this.sprite],
        x: "10",
        yoyo: true,
        repeat: -1,
        duration: 500
    });
  }
}