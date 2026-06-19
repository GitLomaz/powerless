let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  // scene: [battleScene, orbitScene],
  scene: [orbitScene, battleScene],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
};

let game = new Phaser.Game(config);