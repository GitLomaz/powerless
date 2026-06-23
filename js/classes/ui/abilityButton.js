class AbilityButton extends Phaser.GameObjects.Container {
  constructor(ability, x, y) {
    super(scene, x, y);
    switch (ability) {
      case "resupply":
        this.image = scene.add.image(0, 0, "ability-resupply");
        break;
      case "orbitalStrike":
        this.image = scene.add.image(0, 0, "ability-strike");
        break;
    }
    this.add(this.image);
    this.setDepth(1000);
    this.image.setScrollFactor(0);
    this.image.setInteractive()
    this.image.on("pointerdown", () => {
      switch (ability) {
        case "resupply":
          if (scene.player.supplyCooldown <= 0 || true) {
            scene.player.supplyCooldown = gameState.upgrades.abilities.resupply.cooldown;
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
          }
          break;
        case "orbitalStrike":
          if (scene.player.orbitalCooldown <= 0 || true) {
            scene.time.addEvent({
              delay: 150,
              repeat: gameState.upgrades.abilities.orbitalStrike.quantity - 1,
              callback: () => {
                const enemies = scene.enemies;
                if (enemies.length === 0) {
                    return;
                }
                const enemy = Phaser.Utils.Array.GetRandom(enemies);
                new OrbitalStrike(enemy.x, enemy.y);
              }
            });
          }
          break;
      }
    });
    scene.add.existing(this);

    
  }
}
