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
    this.height = 160;

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

    this.title = scene.add.text(0, -40, upgrade.id + ' ' + upgrade.name, { fontFamily: 'Consolas', fontSize: "18px", fill: "#fff", wordWrap: { width: 200 }}).setOrigin(0.5);
    this.description = scene.add.text(0, 20, upgrade.description, { fontFamily: 'Consolas', fontSize: "16px", fill: "#fff", wordWrap: { width: 200 } }).setOrigin(0.5);
    this.add(this.title);
    this.add(this.description);

    scene.add.existing(this);
  }
}