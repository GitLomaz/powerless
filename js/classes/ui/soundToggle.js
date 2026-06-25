class SoundToggle extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    // Use provided x, y or default to top-right corner
    const posX = x !== undefined ? x : GAME_WIDTH - 90;
    const posY = y !== undefined ? y : 40;
    super(scene, posX, posY);
    this.scene = scene;
    this.width = 160;
    this.height = 50;

    // Color schemes
    this.onTint = [0xd2e269, 0x56a135];   // Green (matching Deploy button)
    this.offTint = [0xf58989, 0xaa4444];  // Red

    this.currentTint = muteAll ? this.offTint : this.onTint;

    // Layered rectangles for border effect (matching Deploy button style)
    this.r3 = scene.add.rectangle(
      0,
      0,
      this.width - 4,
      this.height - 4,
      0x1a1a1a,
    );
    this.r2 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
    
    this.add(this.r3);
    this.add(this.r2);
    this.add(this.r1);
    this.setDepth(5);

    this.text = scene.add.text(0, 0, muteAll ? "SOUND: OFF" : "SOUND: ON", {
      align: 'center',
      fontFamily: "Consolas",
      fontSize: "18px",
      fill: "#fff",
    }).setOrigin(0.5);
    this.add(this.text);

    // Fixed to screen (not affected by camera scroll)
    this.setScrollFactor(0);
    
    this.setInteractive();
    this.on("pointerdown", (pointer) => {
      // Prevent click from propagating to camera drag
      pointer.event.stopPropagation();
      
      muteAll = !muteAll;
      game.sound.mute = muteAll;
      
      // Update tint
      this.currentTint = muteAll ? this.offTint : this.onTint;
      this.r1.setStrokeStyle(1, this.currentTint[0]);
      this.r2.setStrokeStyle(3, this.currentTint[1]);
      this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
      
      this.text.setText(muteAll ? "SOUND: OFF" : "SOUND: ON");
      localStorage.setItem('muteAll', muteAll);
      scene.sound.play('click');
    });
    scene.add.existing(this);
  }
}
