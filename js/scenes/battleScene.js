let battleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function battleScene() {
    Phaser.Scene.call(this, {
      key: "battleScene",
    });
  },

  preload: function () {
    scene = this;
    this.load.image("sheet2", "images/sheet2.png");
    this.load.image("mech-foot", "images/mech/foot.png");
    this.load.image("mech-body", "images/mech/body.png");
    this.load.image("mech-leg", "images/mech/leg.png");
    this.load.image("mech-barrel", "images/mech/barrel.png");
    this.load.image("mech-footprint", "images/mech/footprint.png");
    this.load.image("mech-shell", "images/mech/shell.png");
    this.load.spritesheet("powerbar", "images/powerBar.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("mech-rocket", "images/mech/rocket.png", { frameWidth: 24, frameHeight: 12 });
    this.load.tilemapTiledJSON("map2", "json/map2.json");
  },

  create: function () {
    this.anims.create({
      key: "rocket",
      frames: this.anims.generateFrameNumbers("mech-rocket", { start: 0, end: 5 }),
      frameRate: 16,
      repeat: -1,
    });
    // this.scene.start("orbitScene");
    this.map = this.make.tilemap({ key: "map2", tileWidth: 128, tileHeight: 128 });
    this.tileset = this.map.addTilesetImage("sheet2", "sheet2");
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
    this.bullets = [];    
    this.credits = [];
    for (let i = 0; i < gameState.upgrades.spawns.tier1.units; i++) {
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
    for (const bullet of this.bullets) {
      bullet.tick(delta);
    }
  },
});
