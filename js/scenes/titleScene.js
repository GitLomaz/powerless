let titleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function titleScene() {
    Phaser.Scene.call(this, { key: "titleScene" });
  },

  preload: function () {
    scene = this;
    
    // Load essential assets
    this.load.audio("click", "audio/click.ogg");
    this.load.audio("music", "audio/music.ogg");
    
    // Load mech assets for background animation
    this.load.image("sheet2", "images/sheet2.png");
    this.load.image("mech-foot", "images/mech/foot.png");
    this.load.image("mech-body", "images/mech/body.png");
    this.load.image("mech-leg", "images/mech/leg.png");
    this.load.image("mech-barrel", "images/mech/barrel.png");
    this.load.image("mech-footprint", "images/mech/footprint.png");

    // Create loading bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(GAME_WIDTH / 2 - 160, GAME_HEIGHT / 2 - 25, 320, 50);

    const loadingText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 'LOADING...', {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xd2e269, 1);
      progressBar.fillRect(GAME_WIDTH / 2 - 150, GAME_HEIGHT / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
  },

  create: function () {
    game.sound.mute = muteAll;

    // Start music if not already playing
    if (!music) {
      music = this.sound.add("music", { loop: true, volume: 0.5 });
    }
    if (!music.isPlaying) {
      music.play();
    }

    // Tiled background
    this.bg = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "sheet2");
    this.bg.setOrigin(0, 0);
    this.bg.setAlpha(0.8); // Slightly transparent to not overwhelm

    // Create wandering mech
    this.backgroundMech = new BackgroundMech(this);

    // Title
    const title = this.add.text(GAME_WIDTH / 2, 150, 'MECHANATOR 5000', {
      fontFamily: 'Consolas',
      fontSize: '72px',
      fill: '#d2e269',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(GAME_WIDTH / 2, 220, 'A Mech Assault Game', {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#aaaaaa'
    }).setOrigin(0.5);

    // Check if save exists
    const hasSave = localStorage.getItem('powerlessSave') !== null;

    // New Game Button
    this.createButton(GAME_WIDTH / 2, 320, 'NEW GAME', () => {
      // Reset to fresh game state
      gameState = JSON.parse(JSON.stringify(gameStateTemplate));
      saveGame();
      this.sound.play('click');
      this.scene.start('orbitScene');
    }, true);

    // Continue Button
    this.createButton(GAME_WIDTH / 2, 400, 'CONTINUE', () => {
      loadGame();
      this.sound.play('click');
      this.scene.start('orbitScene');
    }, hasSave);

    // Stats Button
    this.createButton(GAME_WIDTH / 2, 480, 'STATS', () => {
      this.sound.play('click');
      this.showStats();
    }, true);

    // Credits Button
    this.createButton(GAME_WIDTH / 2, 560, 'CREDITS', () => {
      this.sound.play('click');
      this.showCredits();
    }, true);

    // Sound Toggle
    new SoundToggle(this, GAME_WIDTH / 2, 680);

    // Version text
    this.add.text(GAME_WIDTH - 10, GAME_HEIGHT - 10, 'v1.0', {
      fontFamily: 'Consolas',
      fontSize: '16px',
      fill: '#555555'
    }).setOrigin(1);
  },

  update: function(time, delta) {
    // Update background mech
    if (this.backgroundMech) {
      this.backgroundMech.update(time, delta);
    }
  },

  createButton: function(x, y, text, callback, enabled) {
    const container = this.add.container(x, y);
    const width = 300;
    const height = 50;

    const tint = enabled ? [0xd2e269, 0x56a135] : [0x444444, 0x222222];
    
    // Layered rectangles for border effect
    const r3 = this.add.rectangle(0, 0, width - 4, height - 4, 0x1a1a1a);
    const r2 = this.add.rectangle(0, 0, width - 4, height - 4);
    const r1 = this.add.rectangle(0, 0, width - 4, height - 4);
    r1.setStrokeStyle(1, tint[0]);
    r2.setStrokeStyle(3, tint[1]);
    r3.setStrokeStyle(5, tint[1], 0.35);
    
    container.add(r3);
    container.add(r2);
    container.add(r1);

    const buttonText = this.add.text(0, 0, text, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: enabled ? '#ffffff' : '#666666'
    }).setOrigin(0.5);
    container.add(buttonText);
    container.setDepth(1000);

    if (enabled) {
      container.setInteractive(
        new Phaser.Geom.Rectangle(-width/2, -height/2, width, height),
        Phaser.Geom.Rectangle.Contains
      );
      
      container.on('pointerover', () => {
        r1.setStrokeStyle(1, 0xffffff);
        r2.setStrokeStyle(3, tint[0]);
      });

      container.on('pointerout', () => {
        r1.setStrokeStyle(1, tint[0]);
        r2.setStrokeStyle(3, tint[1]);
      });

      container.on('pointerdown', callback);
    }

    return container;
  },

  showCredits: function() {
    // Dim background
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Credits panel
    const panel = this.add.graphics();
    panel.fillStyle(0x1a1a2e, 1);
    panel.fillRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 200, 600, 400);
    panel.lineStyle(3, 0xd2e269);
    panel.strokeRect(GAME_WIDTH / 2 - 300, GAME_HEIGHT / 2 - 200, 600, 400);

    // Credits text
    const creditsText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 
      'Programming & Design:\n' +
      '@LomazGames\n' +
      '@igglepud\n' +
      'Art & Assets:\n' +
      'Warlock349\n' +
      'SFX:\n' +
      '@logan_matuska\n\n' +
      'Made with Phaser 3 (4?!)\n' +
      'Thanks for playing!',
      {
        fontFamily: 'Consolas',
        fontSize: '20px',
        fill: '#ffffff',
        align: 'center',
        lineSpacing: 8
      }
    ).setOrigin(0.5);

    // Close button
    const closeBtn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 150, 'CLOSE', () => {
      this.sound.play('click');
      overlay.destroy();
      panel.destroy();
      creditsText.destroy();
      closeBtn.destroy();
    }, true);
  },

  showStats: function() {
    // Load stats
    const stats = loadGlobalStats();

    // Dim background
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    overlay.setDepth(2000);

    // Stats panel
    const panel = this.add.graphics();
    panel.fillStyle(0x1a1a2e, 1);
    panel.fillRect(GAME_WIDTH / 2 - 350, GAME_HEIGHT / 2 - 250, 700, 500);
    panel.lineStyle(3, 0xd2e269);
    panel.strokeRect(GAME_WIDTH / 2 - 350, GAME_HEIGHT / 2 - 250, 700, 500);
    panel.setDepth(2001);

    // Title
    const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 200, 'GLOBAL STATISTICS', {
      fontFamily: 'Consolas',
      fontSize: '32px',
      fill: '#d2e269',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    title.setDepth(2002);

    // Stats text
    const statsText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2,
      `Total Battles: ${formatNumber(stats.totalRuns)}\n` +
      `Total Kills: ${formatNumber(stats.totalKills)}\n` +
      `Total Time on Planet: ${formatTime(stats.totalTimeOnPlanet)}\n` +
      `Total Credits Earned: ${formatNumber(stats.totalCreditsEarned)}\n` +
      `Best Survival Time: ${formatTime(stats.bestSurvivalTime)}\n` +
      `Highest Kills (Single Run): ${formatNumber(stats.highestKills)}`,
      {
        fontFamily: 'Consolas',
        fontSize: '20px',
        fill: '#ffffff',
        align: 'center',
        lineSpacing: 8
      }
    ).setOrigin(0.5);
    statsText.setDepth(2002);

    // Close button
    const closeBtn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 200, 'CLOSE', () => {
      this.sound.play('click');
      overlay.destroy();
      panel.destroy();
      title.destroy();
      statsText.destroy();
      closeBtn.destroy();
    }, true);
    closeBtn.setDepth(2002);
  }
});
