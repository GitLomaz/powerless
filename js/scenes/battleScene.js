let battleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function battleScene() {
    Phaser.Scene.call(this, {
      key: "battleScene",
    });
  },

  

  preload: function () {
    scene = this;
    this.load.audio("click", "audio/click.ogg");
    this.load.audio("cannon", "audio/cannon.ogg");
    this.load.audio("crash", "audio/crash.ogg");
    this.load.audio("explosion", "audio/explosion.ogg");
    this.load.audio("minigun","audio/minigun.ogg")
    this.load.audio("credit-1","audio/credit-1.ogg")
    this.load.audio("credit-2","audio/credit-2.ogg")
    this.load.audio("credit-3","audio/credit-3.ogg")
    this.load.audio("discharge","audio/discharge.ogg")
    this.load.audio("incoming","audio/incoming.ogg")
    this.load.audio("recharge","audio/recharge.ogg")

    this.load.image("sheet2", "images/sheet2.png");
    this.load.image("mech-foot", "images/mech/foot.png");
    this.load.image("mech-body", "images/mech/body.png");
    this.load.image("mech-leg", "images/mech/leg.png");
    this.load.image("mech-barrel", "images/mech/barrel.png");
    this.load.image("mech-footprint", "images/mech/footprint.png");
    this.load.image("boss-foot", "images/boss/foot.png");
    this.load.image("boss-body", "images/boss/body.png");
    this.load.image("boss-leg", "images/boss/leg.png");
    this.load.image("boss-shell", "images/boss/bullet.png");
    this.load.image("boss-bigboy", "images/boss/bigboy.png");
    this.load.image("boss-footprint", "images/boss/footprint.png");
    this.load.image("mortar-target", "images/boss/mortar-target.png");
    this.load.image("mortar-crosshairs", "images/boss/mortar-crosshairs.png");
    this.load.image("mini-foot", "images/mini/foot.png");
    this.load.image("mini-body", "images/mini/body.png");
    this.load.image("mini-leg", "images/mini/leg.png");
    this.load.image("mini-barrel", "images/mini/barrel.png");
    this.load.image("mech-shell", "images/mech/shell.png");
    this.load.image("bullet", "images/mech/bullet.png");
    this.load.image("enemyBullet", "images/mech/enemyBullet.png");
    this.load.image("aura", "images/aura.png");
    this.load.image("target", "images/target.png");
    this.load.image("ability-resupply", "images/ability-resupply.png");
    this.load.image("ability-strike", "images/ability-strike.png");
    this.load.image("ability-energyBurst", "images/ability-burst.png");
    this.load.image("enemy-jeep", "images/enemies/jeep.png");
    this.load.image("enemy-truck", "images/enemies/explosiveTruck.png");
    this.load.image("enemy-jeep-tread", "images/enemies/jeepTracks.png");
    this.load.image("enemy-tank-body", "images/enemies/tankBody.png");
    this.load.image("enemy-tank-barrel", "images/enemies/tankBarrel.png");
    this.load.image("enemy-tank-tread", "images/enemies/tankTracks.png");
    this.load.spritesheet("resupply", "images/resupply.png", { frameWidth: 60, frameHeight: 72 });
    this.load.spritesheet("powerbar", "images/powerBar.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("powerbarBoss", "images/powerBarBoss.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("rocket", "images/mech/rocket.png", { frameWidth: 24, frameHeight: 12 });
    this.load.spritesheet("enemyRocket", "images/mech/enemyRocket.png", { frameWidth: 24, frameHeight: 12 });
    this.load.spritesheet("bossRocket", "images/boss/rocket.png", { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet("mech-barrel-anim", "images/mech/barrel2.png", { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet("boss-barrel-anim", "images/boss/barrel.png", { frameWidth: 288, frameHeight: 288 });
    this.load.tilemapTiledJSON("map2", "json/map2.json");
  },

  create: function () {
    this.sounds = [];
    this.sounds["click"] = this.sound.add("click");
    this.sounds["cannon"] = this.sound.add("cannon").setVolume(.7);
    this.sounds["crash"] = this.sound.add("crash").setVolume(0.4);
    this.sounds["explosion"] = this.sound.add("explosion").setVolume(0.4);
    this.sounds["minigun"] = this.sound.add("minigun").setVolume(0.3);
    this.sounds["credit-1"] = this.sound.add("credit-1").setVolume(0.3);
    this.sounds["credit-2"] = this.sound.add("credit-2").setVolume(0.3);
    this.sounds["credit-3"] = this.sound.add("credit-3").setVolume(0.3);
    this.sounds["discharge"] = this.sound.add("discharge").setVolume(0.3);
    this.sounds["incoming"] = this.sound.add("incoming").setVolume(0.3);
    this.sounds["recharge"] = this.sound.add("recharge").setVolume(0.3);
    game.sound.mute = muteAll;

    applyUpgrades();
    this.anims.create({
      key: "rocket",
      frames: this.anims.generateFrameNumbers("rocket", { start: 0, end: 5 }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: "mech-barrel-anim",
      frames: this.anims.generateFrameNumbers("mech-barrel-anim", { start: 0, end: 5 }),
      frameRate: 16,
    });
    this.anims.create({
      key: "boss-barrel-anim",
      frames: this.anims.generateFrameNumbers("boss-barrel-anim", { start: 0, end: 5 }),
      frameRate: 16,
    });
    this.anims.create({
      key: "enemyRocket",
      frames: this.anims.generateFrameNumbers("enemyRocket", { start: 0, end: 5 }),
      frameRate: 16,
      repeat: -1,
    });

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
    this.enemyBulletGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.creditGroup = this.physics.add.group();
    this.resupplyGroup = this.physics.add.group();

    this.player = new Player();
    
    // FPS counter and debug info
    this.fpsText = this.add.text(GAME_WIDTH * 20, 20, "FPS: 60", { 
      font: "16px Arial", 
      fill: "#00ff00" 
    }).setOrigin(1, 0).setDepth(10).setScrollFactor(0);
    
    this.debugText = this.add.text(GAME_WIDTH * 20, 45, "", { 
      font: "14px Arial", 
      fill: "#ffff00" 
    }).setOrigin(1, 0).setDepth(10).setScrollFactor(0);
    
    this.physics.add.overlap(this.bulletGroup, this.enemyGroup, function (bullet, enemy) {
      const damage = bullet.damage;
      if (!bullet.damage) {
        damage = 25;
        console.log('something doesnt have damage')
      }
      enemy.takeDamage(damage, bullet.x, bullet.y);
      if (bullet.metaType === "rocket") {
        bullet.explode();
        return
      } 
      bullet.destroy();
    });

    this.physics.add.overlap(this.player, this.enemyGroup, function (player, enemy) {
      if (!player.active) return;
      if (enemy.tier === 5) {
        player.energy = -100000;
      } else {
        if (gameState.upgrades.abilities.stomp < enemy.tier) {
          player.energy -= enemy.healthMax * 20;
        } else {
          player.energy -= enemy.healthMax * 5;
        }
        enemy.die(player.x, player.y);
      }
    });

    this.physics.add.overlap(this.player, this.enemyBulletGroup, function (player, bullet) {
      if (!player.active) return;
      if (bullet.metaType === "rocket" || bullet.metaType === "bossRocket") {
        bullet.explode();
      }
      let damage = bullet.damage || 1500
      bullet.destroy();
      player.energy -= damage;
    });

    this.physics.add.overlap(this.bulletGroup, this.enemyBulletGroup, function (bullet, enemyBullet) {
      if (enemyBullet.metaType === "rocket" || enemyBullet.metaType === "bossRocket") {
        bullet.destroy();
        enemyBullet.explode();
        enemyBullet.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.creditGroup, function (player, credit) {
      if (!player.active) return;
      credit.collect();
    });


    this.physics.add.overlap(this.player, this.resupplyGroup, function (player, resupply) {
      if (resupply.falling) return;
      player.energy += resupply.value;
      if (player.energy > gameState.upgrades.player.energy) {
        player.energy = gameState.upgrades.player.energy;
      }
      scene.sounds["recharge"].play();
      resupply.shadow.destroy();
      resupply.destroy();
    });

    this.enemies = [];    
    this.bullets = [];    
    this.credits = [];
    for (let i = 0; i < gameState.upgrades.spawns.tier1.units; i++) {
      this.enemies.push(new T1());
    }
    for (let i = 0; i < gameState.upgrades.spawns.tier2.units; i++) {
      this.enemies.push(new T2(false));
    }
    for (let i = 0; i < gameState.upgrades.spawns.tier3.units; i++) {
      this.enemies.push(new T3(false));
    }
    for (let i = 0; i < gameState.upgrades.spawns.tier4.units; i++) {
      this.enemies.push(new T4(false));
    }

    if (gameState.upgrades.spawns.boss) {
      this.enemies.push(new Boss(1200, 1000));
    }
  },

  update: function (time, delta) {
    // Update FPS counter
    const fps = Math.round(1000 / delta);
    this.fpsText.setText(`FPS: ${fps}`);
    
    // Update debug info
    const tweenCount = this.tweens.getTweens().length;
    const objectCount = this.children.list.length;
    this.debugText.setText(
      `Tweens: ${tweenCount}\n` +
      `Objects: ${objectCount}\n` +
      `Bullets: ${this.bullets.length}\n` +
      `Enemies: ${this.enemies.length}`
    );
    
    this.player.tick(time, delta);
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
