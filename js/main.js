let config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "wrapper",
  scene: [ battleScene, orbitScene],
};

let game = new Phaser.Game(config);