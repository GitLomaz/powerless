let battleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function battleScene() {
    Phaser.Scene.call(this, {
      key: "battleScene",
    });
  },

  preload: function () {
    scene = this;
    this.load.image("sheet", "images/sheet.png");
    this.load.spritesheet("powerbar", "images/powerbar.png", { frameWidth: 32, frameHeight: 32 });
    this.load.tilemapTiledJSON("map", "json/map.json");
  },

  create: function () {
    this.map = this.make.tilemap({ key: "map", tileWidth: 48, tileHeight: 48 });
    this.tileset = this.map.addTilesetImage("sheet", "sheet");
    this.layer = this.map.createStaticLayer(0, this.tileset, 0, 0);
    this.layer = this.map.createStaticLayer(1, this.tileset, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.bulletGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();

    this.physics.add.collider(this.bulletGroup, this.enemyGroup, function (bullet, enemy) {
      bullet.destroy();
      enemy.destroy();
    });

    this.enemies = [];
    for (let i = 0; i < 125; i++) {
      this.enemies.push(new Footman());
    }

    this.player = new Player();
  },

  update: function (time, delta) {
    this.player.tick(delta);
    for (const enemy of this.enemies) {
      enemy.tick(delta);
    }
  },
});
