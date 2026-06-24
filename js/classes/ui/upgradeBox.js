class UpgradeBox extends Phaser.GameObjects.Container {
  constructor(upgrade, i) {
    super(scene, upgrade.grid.x * 130 + 600, upgrade.grid.y * 130 + 400);
    this.index = i;
    this.upgrade = upgrade;
    this.tints = [
      [0x000000, 0x1a1a1a],
      [0xfffcc9, 0xe1ad26], // YELLOW, LOCKED
      [0xa7c4e2, 0x4d60c6], // PURPLE, UNLOCKED
      [0x75dceb, 0x3387ba], // BLUE, UPGRADED
      [0xd2e269, 0x56a135], // GREEN, DONE
    ];    
    // this.tints = [
    //   [0xe279b4, 0xa13567],
    //   [0xffa878, 0x9f2a31],
    //   [0xfffcc9, 0xe1ad26], // YELLOW, LOCKED
    //   [0xfffab0, 0xffa13d],
    //   [0xd2e269, 0x56a135], // GREEN, DONE
    //   [0x75dceb, 0x3387ba], // BLUE, UPGRADED
    //   [0xa7c4e2, 0x4d60c6], // PURPLE, UNLOCKED
    //   [0xd3a7ff, 0x7d309c],
    // ];

    this.state = 0
    // 0 - Locked, hidden
    // 1 - Locked, visible (prereq is unlocked, but zero)
    // 2 - unlocked, visible (prereq is > 0)
    // 3 - unlocked, visible (this has levels, but is not maxed)
    // 4 - unlocked, visible (this is max level)

    this.currentTint = this.tints[0];

    this.width = 70;
    this.height = 70;

    if (upgrade.grid.size === "large") {
     this.width = 70 * 2;
    this.height = 70 * 2;     
    }

    this.r3 = scene.add.rectangle(
      0,
      0,
      this.width - 4,
      this.height - 4,
      this.currentTint[1],
    ).setRotation(Math.PI / 4);
    this.r2 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4).setRotation(Math.PI / 4);
    this.r1 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4).setRotation(Math.PI / 4);
    this.add(this.r3);
    this.add(this.r2);
    this.add(this.r1);
    this.setDepth(5);

    this.icon = scene.add.image(0, 0, "question")
    this.iconBg = scene.add.tileSprite(0, 0, 32, 45, "shimmer");

    scene.tweens.add({
      targets: this.iconBg,
      tilePositionY: 28,
      duration: 1000,
      repeat: -1
    });

    this.add(this.iconBg);
    this.add(this.icon);

    // prerequisite lines
    this.prereq = UPGRADEBOXES[upgrade.prerequisite];
    if (this.prereq) {
      this.drawLines();
    }
    
    scene.add.existing(this);
    UPGRADEBOXES[i] = this;
    this.update();

    this.setInteractive();
    this.on("pointerdown", () => {
      if (this.state < 2) return;
      scene.sounds["click"].play();
      if (LEVELS[this.index] !== this.upgrade.levels.length)
      LEVELS[this.index]++;
      UPGRADEBOXES.forEach((box) => {
        box.update();
      });
      applyUpgrades();
      new Tooltip(this.upgrade, this.currentTint);
      applyUpgrades();
    }).on("pointerover", () => {
      if (this.state < 2) return;
      new Tooltip(this.upgrade, this.currentTint);
    }).on("pointerout", () => {
      if (tooltip) {
        tooltip.destroy();
        tooltip = null;
      }
    });
  }

  update() {
    if (this.prereq) {
      this.prereq.update();
    }
    this.icon.setTexture('upgrade_' + this.upgrade.grid.icon);
    this.iconBg.setAlpha(0)

    if (!this.prereq || LEVELS[this.index] === this.upgrade.levels.length) {
      this.state = 4;
    } else if (LEVELS[this.index] !== this.upgrade.levels.length && LEVELS[this.index] > 0) {
      this.state = 3;
    } else if (LEVELS[this.prereq.index] > 0) {
      this.state = 2;
    } else if (this.prereq.state === 2) {
      this.state = 1;
      this.icon.setTexture("question");
      this.iconBg.setAlpha(1)
    } else {
      this.state = 0;
    }

    if (this.state === 0) {
      this.setAlpha(0);
      this.clearLines();
    } else {
      this.setAlpha(1);
      this.drawLines();
    }
    
    this.currentTint = this.tints[this.state];
    this.setTint();
  }

  drawLines() {
    if (!this.prereq) return;
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(0);
    this.graphics.lineStyle(2, 0xff0000, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(this.prereq.x, this.prereq.y);
    this.graphics.lineTo(this.x, this.y);
    this.graphics.strokePath();
  }

  clearLines() {
    if (this.graphics) {
      this.graphics.clear();
    }
  }

  setTint() {
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
  }
}
