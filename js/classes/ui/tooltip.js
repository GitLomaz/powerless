class Tooltip extends Phaser.GameObjects.Container {
  constructor(upgrade, tints) {
    super(scene, upgrade.grid.x * 130 + 600, upgrade.grid.y * 130 + 525);
    if (tooltip) {
      tooltip.destroy();
    }
    tooltip = this;
    this.upgrade = upgrade;
    this.tints = tints;
    this.currentTint = tints;
    this.width = 220;
    this.height = 200;

    this.r3 = scene.add.rectangle(
      0,
      0,
      this.width - 4,
      this.height - 4,
      0x1a1a1a,
    )
    this.r2 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1 = scene.add.rectangle(0, 0, this.width - 4, this.height - 4);
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
    this.add(this.r3);
    this.add(this.r2);
    this.add(this.r1);
    this.setDepth(5);

    // upgradable text
    if (LEVELS[upgrade.id] !== upgrade.levels.length) {
      const cost = upgrade.levels[LEVELS[upgrade.id]].cost;      
      this.cost = scene.add.text(100, 90, cost + 'c', { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff" }).setOrigin(1);
      this.add(this.cost);
    }

    if (LEVELS[upgrade.id] !== upgrade.levels.length && upgrade.levels.length > 1) {
      let increaseString = formatNumber(upgrade.getCurrentValue()) + " -> " + formatNumber(upgrade.levels[LEVELS[upgrade.id]].effect);
      if (upgrade.percent) {
        increaseString = (upgrade.getCurrentValue() * 100) + "% -> " + (upgrade.levels[LEVELS[upgrade.id]].effect * 100) + "%";
      } else if (upgrade.seconds) {
        increaseString = (upgrade.getCurrentValue() / 1000) + "s -> " + (upgrade.levels[LEVELS[upgrade.id]].effect / 1000) + "s";
      }
      //const increaseString = formatNumber(upgrade.getCurrentValue()) + " -> " + formatNumber(upgrade.levels[LEVELS[upgrade.id]].effect);
      const inscrease = scene.add.text(0, 30, increaseString, { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff", wordWrap: { width: 200 } }).setOrigin(0.5, 0);
      this.add(inscrease);
    } else if (upgrade.levels.length > 1) {
      let increaseString = formatNumber(upgrade.getCurrentValue());
      if (upgrade.percent) {
        increaseString = (upgrade.getCurrentValue() * 100) + "%";
      } else if (upgrade.seconds) {
        increaseString = (upgrade.getCurrentValue() / 1000) + "s";
      }
      const inscrease = scene.add.text(0, 30, increaseString, { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff", wordWrap: { width: 200 } }).setOrigin(0.5, 0);
      this.add(inscrease);
    }

    const level = scene.add.text(-100, 90, 'Level ' + (LEVELS[upgrade.id]) + '/' + upgrade.levels.length, { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff" }).setOrigin(0, 1);
    this.add(level);
    this.title = scene.add.text(0, -70, upgrade.name, { align: 'center', fontFamily: 'Consolas', fontSize: "18px", fill: "#fff", wordWrap: { width: 200 }}).setOrigin(0.5);
    this.description = scene.add.text(0, -10, upgrade.description, { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff", wordWrap: { width: 200 } }).setOrigin(0.5);
    this.add(this.title);
    this.add(this.description);

    scene.add.existing(this);
  }
}