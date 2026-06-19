let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, { key: "orbitScene" });
  },

  preload: function () {
    scene = this;
    this.load.image("question", "images/upgrades/question.png");
    this.load.image("shimmer", "images/upgrades/questionBG.png");

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
  },
});
