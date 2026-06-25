let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, { key: "orbitScene" });
  },

  preload: function () {
    scene = this;
    this.load.image("question", "images/upgrades/question.png");
    this.load.image("shimmer", "images/upgrades/questionBG.png");
    this.load.audio("click", "audio/click.ogg");
    this.load.audio("music", "audio/music.ogg");

    const icons = []
    UPGRADES.forEach((upgrade) => {
      icons.push(upgrade.grid.icon);
    });

    [...new Set(icons)].forEach((icon) => {
      console.log('loading ' + icon)
      this.load.image('upgrade_' + icon, 'images/upgrades/' + icon + '.png');
    });
  },

  create: function () {

    game.sound.mute = muteAll;

    if (!music) {
      music = this.sound.add("music", { loop: true, volume: 0.5 });
    }
    if (!music.isPlaying) {
      music.play();
    }

    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a2e, 1);
    bg.fillRect(-2000, -2000, 6000, 6000)

    UPGRADES.forEach((upgrade, i) => {
      new UpgradeBox(upgrade, i);
    });
    UPGRADEBOXES.forEach((box) => {
      box.update();
    });

    // Camera drag
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let camStartX = 0;
    let camStartY = 0;

    this.input.on('pointerdown', (pointer) => {
      isDragging = true;
      dragStartX = pointer.x;
      dragStartY = pointer.y;
      camStartX = this.cameras.main.scrollX;
      camStartY = this.cameras.main.scrollY;
    });

    this.input.on('pointerup', () => {
      isDragging = false;
    });

    this.input.on('pointermove', (pointer) => {
      if (!isDragging) return;

      this.cameras.main.scrollX = camStartX - (pointer.x - dragStartX);
      this.cameras.main.scrollY = camStartY - (pointer.y - dragStartY);
    });

    new Deploy();
    new SoundToggle(this);
    
    // Credits display
    this.creditsText = this.add.text(20, 20, `Credits: ${formatNumber(gameState.credits)}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#FFD700',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0, 0).setScrollFactor(0).setDepth(100);

    // Menu button
    this.createMenuButton();
  },

  createMenuButton: function() {
    const container = this.add.container(GAME_WIDTH - 90, 100);
    const width = 160;
    const height = 50;
    const tint = [0xd2e269, 0x56a135];
    
    const r3 = this.add.rectangle(0, 0, width - 4, height - 4, 0x1a1a1a);
    const r2 = this.add.rectangle(0, 0, width - 4, height - 4);
    const r1 = this.add.rectangle(0, 0, width - 4, height - 4);
    r1.setStrokeStyle(1, tint[0]);
    r2.setStrokeStyle(3, tint[1]);
    r3.setStrokeStyle(5, tint[1], 0.35);
    
    container.add(r3);
    container.add(r2);
    container.add(r1);

    const buttonText = this.add.text(0, 0, 'MENU', {
      fontFamily: 'Consolas',
      fontSize: '18px',
      fill: '#ffffff'
    }).setOrigin(0.5);
    container.add(buttonText);

    container.setScrollFactor(0).setDepth(100);
    container.setInteractive(
      new Phaser.Geom.Rectangle(-width/2, -height/2, width, height),
      Phaser.Geom.Rectangle.Contains
    );
    
    container.on('pointerover', () => {
      r1.setStrokeStyle(1, 0xffffff);
      r2.setStrokeStyle(3, tint[0]);
    });

    container.on('pointerout', () => {
      r1.setStrokeStyle(1, tint[0]);
      r2.setStrokeStyle(3, tint[1]);
    });

    container.on('pointerdown', (pointer) => {
      pointer.event.stopPropagation();
      this.sound.play('click');
      saveGame(); // Save before returning to menu
      this.scene.start('titleScene');
    });
  }
});
