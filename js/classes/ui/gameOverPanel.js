class GameOverPanel extends Phaser.GameObjects.Container {
  constructor(stats) {
    super(scene, 0, 0);
    
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
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

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
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    this.creditsText = scene.add.text(panelX, panelY + statsY + statsSpacing, `Credits Gained: ${formatNumber(stats.credits)}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#FFD700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    this.timeText = scene.add.text(panelX, panelY + statsY + statsSpacing * 2, `Time Survived: ${timeString}`, {
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    // Buttons
    this.createButton('RETURN TO ORBIT', panelX, panelY + 100, () => {
      scene.sounds['click'].play();
      saveGame(); // Save before returning to orbit
      scene.scene.start('orbitScene', { creditsGained: stats.credits });
    });

    this.createButton('BATTLE AGAIN', panelX, panelY + 160, () => {
      scene.sounds['click'].play();
      scene.scene.restart();
    });
  }

  createButton(text, x, y, callback) {
    const buttonWidth = 400;
    const buttonHeight = 50;
    const buttonTint = [0xd2e269, 0x56a135]; // Green tint

    const br3 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4, 0x1a1a1a)
      .setScrollFactor(0).setDepth(1001);
    const br2 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4)
      .setScrollFactor(0).setDepth(1001);
    const br1 = scene.add.rectangle(x, y, buttonWidth - 4, buttonHeight - 4)
      .setScrollFactor(0).setDepth(1001);
    br1.setStrokeStyle(1, buttonTint[0]);
    br2.setStrokeStyle(3, buttonTint[1]);
    br3.setStrokeStyle(5, buttonTint[1], 0.35);

    const buttonText = scene.add.text(x, y, text, {
      align: 'center',
      fontFamily: 'Consolas',
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);

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
