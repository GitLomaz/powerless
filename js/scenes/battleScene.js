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
    this.load.spritesheet("powerbar", "images/powerBar.png", { frameWidth: 32, frameHeight: 32 });
    this.load.tilemapTiledJSON("map", "json/map.json");
  },

  create: function () {
    // this.scene.start("orbitScene");
    this.map = this.make.tilemap({ key: "map", tileWidth: 48, tileHeight: 48 });
    this.tileset = this.map.addTilesetImage("sheet", "sheet");
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.createLayer(1, this.tileset, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.bulletGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.creditGroup = this.physics.add.group();

    this.player = new Player();

    this.physics.add.collider(this.bulletGroup, this.enemyGroup, function (bullet, enemy) {
      bullet.destroy();
      enemy.die(bullet.x, bullet.y);
    });


    this.physics.add.collider(this.player, this.enemyGroup, function (player, enemy) {
      enemy.die(player.x, player.y);
      if (!gameState.upgrades.player.stomp) {
        player.energy -= 2000;
      }
    });

    this.physics.add.overlap(this.player, this.creditGroup, function (player, credit) {
      credit.collect();
    });

    this.enemies = [];
    this.credits = [];
    for (let i = 0; i < gameState.upgrades.spawns.footman; i++) {
      this.enemies.push(new Footman());
    }

  },

  update: function (time, delta) {
    this.player.tick(delta);
    for (const enemy of this.enemies) {
      enemy.tick(delta);
    }
    for (const credit of this.credits) {
      credit.tick(delta);
    }
  },
});
