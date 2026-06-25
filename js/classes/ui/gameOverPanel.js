class GameOverPanel extends Phaser.GameObjects.Container {
  constructor(stats) {
    super(scene, 0, 0);
    
    // Update global stats
    updateGlobalStats(stats);
    
    // Mark player as dead to prevent actions
    scene.player.isDead = true;
    
    // Create semi-transparent overlay that blocks all clicks
    this.overlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH * 2, GAME_HEIGHT * 2, 0x000000, 0.7)
      .setScrollFactor(0)
      .setDepth(999)
      .setInteractive()
      .on('pointerdown', (pointer) => {
        pointer.event.stopPropagation();
      });

    // Main panel
    const panelWidth = 500;
    const panelHeight = 400;
    const panelX = GAME_WIDTH / 2;
    const panelY = GAME_HEIGHT / 2;
    this.currentTint = [0xa7c4e2, 0x4d60c6]; // Purple/blue tint

    this.r3 = scene.add.rectangle(panelX, panelY, panelWidth - 4, panelHeight - 4, 0x1a1a1a)
      .setScrollFactor(0).setDepth(1000);
    this.r2 = scene.add.rectangle(panelX, panelY, panelWidth - 4, panelHeight - 4)
      .setScrollFactor(0).setDepth(1000);
    this.r1 = scene.add.rectangle(panelX, panelY, panelWidth - 4, panelHeight - 4)
      .setScrollFactor(0).setDepth(1000);
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);

    // Title
    this.title = scene.add.text(panelX, panelY - 150, 'BATTLE OVER', {
      align: 'center',
      fontFamily: 'Consolas',
      fontSize: '36px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setAlpha(0);

    // Format time (convert milliseconds to minutes:seconds)
    const totalSeconds = Math.floor(stats.time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Stats
    const statsY = -60;
    const statsSpacing = 40;

    this.killsText = scene.add.text(panelX, panelY + statsY, `Total Kills: ${stats.kills}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setAlpha(0);

    this.creditsText = scene.add.text(panelX, panelY + statsY + statsSpacing, `Credits Gained: ${formatNumber(stats.credits)}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#FFD700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setAlpha(0);

    this.timeText = scene.add.text(panelX, panelY + statsY + statsSpacing * 2, `Time Survived: ${timeString}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001).setAlpha(0);

    // Store button data for delayed creation
    this.button1Data = { text: 'RETURN TO ORBIT', x: panelX, y: panelY + 100, callback: () => {
      scene.sounds['click'].play();
      saveGame(); // Save before returning to orbit
      scene.scene.start('orbitScene', { creditsGained: stats.credits });
    }};

    this.button2Data = { text: 'BATTLE AGAIN', x: panelX, y: panelY + 160, callback: () => {
      scene.sounds['click'].play();
      scene.scene.restart();
    }};

    // Animate items appearing one at a time
    scene.time.delayedCall(200, () => {
      scene.tweens.add({ targets: this.title, alpha: 1, duration: 200 });
    });

    scene.time.delayedCall(400, () => {
      scene.tweens.add({ targets: this.killsText, alpha: 1, duration: 200 });
    });

    scene.time.delayedCall(600, () => {
      scene.tweens.add({ targets: this.creditsText, alpha: 1, duration: 200 });
    });

    scene.time.delayedCall(800, () => {
      scene.tweens.add({ targets: this.timeText, alpha: 1, duration: 200 });
    });

    scene.time.delayedCall(1000, () => {
      this.button1 = this.createButton(this.button1Data.text, this.button1Data.x, this.button1Data.y, this.button1Data.callback);
    });

    scene.time.delayedCall(1200, () => {
      this.button2 = this.createButton(this.button2Data.text, this.button2Data.x, this.button2Data.y, this.button2Data.callback);
    });
  }

  createButton(text, x, y, callback) {
    const buttonWidth = 400;
    const buttonHeight = 50;
    const buttonTint = [0xd2e269, 0x56a135]; // Green tint

    const br3 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4, 0x1a1a1a)
      .setScrollFactor(0).setDepth(1001).setAlpha(0);
    const br2 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4)
      .setScrollFactor(0).setDepth(1001).setAlpha(0);
    const br1 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4)
      .setScrollFactor(0).setDepth(1001).setAlpha(0);
    br1.setStrokeStyle(1, buttonTint[0]);
    br2.setStrokeStyle(3, buttonTint[1]);
    br3.setStrokeStyle(5, buttonTint[1], 0.35);

    const buttonText = scene.add.text(x, y, text, {
      align: 'center',
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1002).setAlpha(0);

    // Fade in button elements
    scene.tweens.add({ targets: [br3, br2, br1, buttonText], alpha: 1, duration: 200 });

    // Make the button interactive
    br1.setInteractive()
      .on('pointerdown', (pointer) => {
        pointer.event.stopPropagation();
        callback();
      })
      .on('pointerover', () => {
        br1.setStrokeStyle(1, 0xffffff);
        br2.setStrokeStyle(3, 0xffffff);
      })
      .on('pointerout', () => {
        br1.setStrokeStyle(1, buttonTint[0]);
        br2.setStrokeStyle(3, buttonTint[1]);
      });
  }
}
