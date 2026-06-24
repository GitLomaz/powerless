class AbilityButton extends Phaser.GameObjects.Container {
  constructor(ability, x, y) {
    super(scene, x, y);
    this.goodTint = [0xd2e269, 0x56a135];
    this.badTint = [0xfffcc9, 0xe1ad26];

    this.width = 80;
    this.height = 80;

    this.currentTint = this.goodTint;
    this
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
    this.ready = true;

    switch (ability) {
      case "resupply":
        this.image = scene.add.image(0, 0, "ability-resupply");
        break;
      case "orbitalStrike":
        this.image = scene.add.image(0, 0, "ability-strike");
        break;
      case "energyBurst":
        this.image = scene.add.image(0, 0, "ability-energyBurst");
        break;
    }
    this.add(this.image);
    this.setDepth(1000);
    this.setScrollFactor(0);
    this.setInteractive()
    this.on("pointerdown", (pointer) => {
      if (!this.ready) {
        return;
      }
      // Prevent cannon from firing when clicking UI
      scene.sounds["click"].play();
      scene.player.lastUIClick = scene.time.now;
      const cooldownReduction = gameState.upgrades.player.cooldownReduction || 0;
      switch (ability) {
        case "resupply":
          scene.player.supplyCooldown = gameState.upgrades.abilities.resupply.cooldown - cooldownReduction;
          for (let i = 0; i < gameState.upgrades.abilities.resupply.packs; i++) {
            const cam = scene.cameras.main;

            const x = Phaser.Math.Between(
                Math.floor(cam.worldView.left),
                Math.floor(cam.worldView.right)
            );

            const y = Phaser.Math.Between(
                Math.floor(cam.worldView.top),
                Math.floor(cam.worldView.bottom)
            );

            new ResupplyPack(
              x,
              y - 600,
              gameState.upgrades.abilities.resupply.value
            );
          }
          break;
        case "orbitalStrike":
          scene.player.strikeCooldown = gameState.upgrades.abilities.orbitalStrike.cooldown - cooldownReduction;
          scene.time.addEvent({
            delay: 150,
            repeat: gameState.upgrades.abilities.orbitalStrike.projectiles - 1,
            callback: () => {
              const enemies = scene.enemies;
              if (enemies.length === 0) {
                  return;
              }
              const enemy = Phaser.Utils.Array.GetRandom(enemies);
              new OrbitalStrike(enemy.x, enemy.y);
            }
          });
          break;
        case "energyBurst":
          scene.player.burstCooldown = gameState.upgrades.abilities.energyBurst.cooldown - cooldownReduction;
          scene.player.burst();
          break;
      }
      this.setReady(false);
    });
    scene.add.existing(this);
  }

  setReady(ready) {
    this.ready = ready;
    this.currentTint = ready ? this.goodTint : this.badTint;
    this.r1.setStrokeStyle(1, this.currentTint[0]);
    this.r2.setStrokeStyle(3, this.currentTint[1]);
    this.r3.setStrokeStyle(5, this.currentTint[1], 0.35);
  }
}
