class AbilityButton extends Phaser.GameObjects.Container {
  constructor(ability, x, y) {
    super(scene, x, y);
    this.goodTint = [0xd2e269, 0x56a135];
    this.badTint = [0xfffcc9, 0xe1ad26];

    this.width = 56;
    this.height = 56;

    this.currentTint = this.goodTint;
    this
    this.r3 = scene.add.circle(
      0,
      0,
      this.width / 2 + 2,
      0x1a1a1a,
    )
    this.r2 = scene.add.circle(0, 0, this.width / 2 + 2);
    this.r1 = scene.add.circle(0, 0, this.width / 2 + 2);
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
    
    // Create cooldown overlay graphic
    this.cooldownOverlay = scene.add.graphics();
    this.cooldownOverlay.setDepth(1001);
    this.add(this.cooldownOverlay);
    
    this.setDepth(1000);
    this.setScrollFactor(0);
    this.setInteractive()
    
    
   .on('pointerover', () => { scene.player.activatingAbility = true; })
   .on('pointerout', () => { scene.player.activatingAbility = false; });

    this.on("pointerdown", (pointer) => {
      if (!this.ready || !scene.player.active) {
        return;
      }
      // Prevent cannon from firing when clicking UI
      scene.sounds["click"].play();
      scene.player.lastUIClick = scene.time.now;
      const cooldownReduction = -gameState.upgrades.player.cooldownReduction || 0;
      switch (ability) {
        case "resupply":
          scene.player.supplyCooldown = gameState.upgrades.abilities.resupply.cooldown - cooldownReduction;
          scene.player.supplyMaxCooldown = scene.player.supplyCooldown;
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
          scene.player.strikeMaxCooldown = scene.player.strikeCooldown;
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
          scene.player.burstMaxCooldown = scene.player.burstCooldown;
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
    
    // Clear cooldown overlay when ready
    if (ready) {
      this.cooldownOverlay.clear();
    }
  }
  
  updateCooldown(current, max) {
    if (current <= 0 || max <= 0) {
      this.cooldownOverlay.clear();
      return;
    }
    
    // Calculate progress (0 = just started cooldown, 1 = ready)
    const progress = 1 - (current / max);
    
    // Clear previous drawing
    this.cooldownOverlay.clear();
    
    if (progress >= 1) {
      return;
    }
    
    // Draw a dark semi-transparent overlay using a pie/wedge approach
    this.cooldownOverlay.fillStyle(0x000000, 0.7);
    this.cooldownOverlay.beginPath();
    
    // Start from top center (12 o'clock = -90 degrees = -PI/2)
    // Go clockwise by subtracting the angle
    const startAngle = -Math.PI / 2; // Top
    const sweepAngle = (1 - progress) * Math.PI * 2; // How much is left to unwind
    const endAngle = startAngle - sweepAngle; // Subtract to go clockwise
    
    // Draw from center
    this.cooldownOverlay.moveTo(0, 0);
    
    // Use the smaller dimension to keep circle within button bounds
    const radius = Math.min(this.width, this.height) / 2;
    this.cooldownOverlay.arc(0, 0, radius, startAngle, endAngle, true);
    
    // Close back to center
    this.cooldownOverlay.lineTo(0, 0);
    this.cooldownOverlay.closePath();
    this.cooldownOverlay.fillPath();
  }
}
