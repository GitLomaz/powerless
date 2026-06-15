let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, {
      key: "orbitScene",
    });
  },

  preload: function () {
    scene = this.scene;
  },

  create: function () {
  },

  update: function (time) {
  },
});
