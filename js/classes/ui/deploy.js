class Deploy extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH / 2, GAME_HEIGHT - 40);
    this.width = 400;
    this.height = 50;

    this.currentTint = [0xd2e269, 0x56a135];
    this.r3 = scene.add.rectangle(
      0,
      0,
      this.width - 4,
      this.height - 4,
      0x1a1a1a,
    )
    this.r2 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
    this.add(this.r3);
    this.add(this.r2);
    this.add(this.r1);
    this.setDepth(5);

    this.title = scene.add.text(0, 0, 'DEPLOY TO PLANET', { align: 'center', fontFamily: 'Consolas', fontSize: "32px", fill: "#fff"}).setOrigin(0.5);
    this.add(this.title);

    this.setScrollFactor(0);
    this.setInteractive();
    this.on('pointerdown', (pointer) => {
      // Consume the click event to prevent it from firing cannon on scene start
      pointer.event.stopPropagation();
      scene.sound.play('click');
      scene.scene.start('battleScene');
    });
    scene.add.existing(this);
  }
}