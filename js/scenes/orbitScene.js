/* ------------------------------------------------------------------ */
/*                       orbitScene (upgrade grid)                     */
/* ------------------------------------------------------------------ */

let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, { key: "orbitScene" });
  },

  preload: function () {
    scene = this;
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
