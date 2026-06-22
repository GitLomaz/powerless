class AbilityButton extends Phaser.GameObjects.Container {
  constructor(ability, x, y) {
    super(scene, x, y);
    switch (ability) {
      case "resupply":
        this.image = scene.add.image(0, 0, "ability-resupply");
        break;
    }
    this.add(this.image);
    this.setDepth(1000);
    this.image.setScrollFactor(0);
    this.image.setInteractive()
    this.image.on("pointerdown", () => {
      switch (ability) {
        case "resupply":
          console.log('boop?!')
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
      }
    });
    scene.add.existing(this);

    
  }
}
