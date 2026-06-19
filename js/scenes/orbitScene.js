let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, { key: "orbitScene" });
  },

  preload: function () {
    scene = this;
    this.load.image("question", "images/questionSmall.png");
    this.load.image("shimmer", "images/questionBG.png");

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
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    UPGRADES.forEach((upgrade, i) => {
      new UpgradeBox(upgrade, i);
    });
    UPGRADEBOXES.forEach((box) => {
      box.update();
    });
  },
});
