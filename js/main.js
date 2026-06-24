let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  scene: [orbitScene, battleScene],
  roundPixels: true,
   scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};

let game = new Phaser.Game(config);
