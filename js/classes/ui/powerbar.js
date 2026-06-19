class Powerbar extends Phaser.GameObjects.Container {
  constructor(frames = 20) {
    const FRAMEWIDTH = 32;
    super(scene, GAME_WIDTH / 2, FRAMEWIDTH); // Middle should be 640

    this.bg = scene.add.rectangle(-FRAMEWIDTH / 2 + 8, -FRAMEWIDTH / 2, frames * FRAMEWIDTH + FRAMEWIDTH * 2 - 8, FRAMEWIDTH, 0x000000);
    this.bg.setOrigin(0).setAlpha(0.5);
    this.add(this.bg);

    this.rectangle = scene.add.rectangle(-FRAMEWIDTH / 2 + 8, -FRAMEWIDTH / 2, frames * FRAMEWIDTH + FRAMEWIDTH * 2 - 8, FRAMEWIDTH, 0x0000DD);
    this.rectangle.setOrigin(0);
    this.add(this.rectangle);

    let xPos = 640 - (frames * FRAMEWIDTH) / 2 - FRAMEWIDTH / 2;
    console.log(xPos);
    this.x = xPos;
    this.setScrollFactor(0);
    let tileX = FRAMEWIDTH;
    this.add(scene.add.sprite(0, 0, "powerbar").setFrame(0));
    for (let i = 0; i < frames; i++) {
      this.add(scene.add.sprite(tileX, 0, "powerbar").setFrame(1));
      tileX += FRAMEWIDTH;
    }
    this.add(scene.add.sprite(tileX, 0, "powerbar").setFrame(2));
    this.add(scene.add.sprite(tileX / 2, 0, "powerbar").setFrame(3));


    scene.add.existing(this);
  }

  setPower(power) {
    this.rectangle.setScale(power, 1);
  }
}
