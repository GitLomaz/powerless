class ZoomButtons {
  constructor() {
    const buttonSize = 50;
    const spacing = 10;
    const bottomMargin = 20;
    const leftMargin = 20;
    
    // Create zoom out button (-)
    this.zoomOutButton = new ZoomButton(
      leftMargin + buttonSize/2, 
      GAME_HEIGHT - bottomMargin - buttonSize/2,
      buttonSize,
      '-',
      '32px',
      () => {
        scene.currentZoomIndex = Math.min(scene.currentZoomIndex + 1, scene.zoomLevels.length - 1);
        scene.applyZoom();
      }
    );
    
    // Create zoom in button (+)
    this.zoomInButton = new ZoomButton(
      leftMargin + buttonSize + spacing + buttonSize/2,
      GAME_HEIGHT - bottomMargin - buttonSize/2,
      buttonSize,
      '+',
      '28px',
      () => {
        scene.currentZoomIndex = Math.max(scene.currentZoomIndex - 1, 0);
        scene.applyZoom();
      }
    );
  }
}

class ZoomButton extends Phaser.GameObjects.Container {
  constructor(x, y, size, text, fontSize, onClick) {
    super(scene, x, y);
    this.width = size;
    this.height = size;
    this.onClick = onClick;

    const tint = [0xd2e269, 0x56a135];

    this.r3 = scene.add.rectangle(
      0,
      0,
      this.width - 4,
      this.height - 4,
      0x1a1a1a,
    );
    this.r2 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1.setStrokeStyle(1, tint[0]);
    this.r2.setStrokeStyle(3, tint[1]);
    this.r3.setStrokeStyle(5, tint[1], 0.35);
    
    this.add(this.r3);
    this.add(this.r2);
    this.add(this.r1);
    this.setDepth(100);

    this.buttonText = scene.add.text(0, 0, text, {
      align: 'center',
      fontFamily: "Consolas",
      fontSize: fontSize,
      fill: "#fff",
    }).setOrigin(0.5);
    this.add(this.buttonText);

    this.setScrollFactor(0);
    this.setInteractive();
    
    this.on("pointerover", () => {
      this.r1.setStrokeStyle(1, 0xffffff);
      this.r2.setStrokeStyle(3, tint[0]);
    });

    this.on("pointerout", () => {
      this.r1.setStrokeStyle(1, tint[0]);
      this.r2.setStrokeStyle(3, tint[1]);
    });

    this.on("pointerdown", (pointer) => {
      pointer.event.stopPropagation();
      scene.sound.play('click');
      this.onClick();
    });
    
    scene.add.existing(this);
  }
}
