class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH * 1.5, GAME_HEIGHT * 1.5);

    this.energy = gameState.upgrades.player.energy

    this.cannonCanShoot=true;
    this.rocketCanShoot=true;

    scene.physics.add.existing(this);
    this.body.setCircle(48, -48, -48);

    scene.cameras.main.startFollow(this);
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    scene.add.existing(this);

    this.creditsGained = 0;
    this.creditsGainedText = scene.add.text(20, 20, "Credits: 0", { font: "16px Arial", fill: "#2412c8" }).setOrigin(0).setDepth(4).setScrollFactor(0);

    this.lastShot = 0;


    this.dirX = 1;
    this.dirY = 0;

    this.feet = [
      this.createFoot( 28, -28).setAngle(-45 + 180),
      this.createFoot( 28,  28).setAngle(-45 - 90),
      this.createFoot(-28, -28).setAngle(45),
      this.createFoot(-28,  28).setAngle(-45)
    ];

    this.legs = [
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(3),
    ];

    this.platform = scene.add.image(0, 0, "mech-body").setOrigin(0.5, 0.5);
    this.add(this.platform);

    this.barrel = scene.add.image(0, 0, "mech-barrel").setOrigin(0.5, 0.5).setDepth(4);
    this.add(this.barrel);
    this.setDepth(4);

    this.stepGroup = 0;
    this.stepLocked = false;

    
    this.powerbar = new Powerbar(Math.floor(gameState.upgrades.player.energy / 7500));

    //add mini gun if we have it
      if (gameState.upgrades.weapons.minigun.enabled) {
    
     this.minigun = this.scene.time.addEvent({
        delay: gameState.upgrades.weapons.minigun.fireRate,
        callback: () => {
          const nearestEnemy = this.findEnemies(gameState.upgrades.weapons.minigun.range, 0)[0];
          if(this.energy>0){
          if (nearestEnemy) {
            new Bullet(this, nearestEnemy, true);
          }
        }},
        callbackScope: this,
        repeat:-1
      });
    }

    this.supplyCooldown = 0;
    this.strikeCooldown = 0;
    this.burstCooldown = 0;

    let posX = 60
    if (gameState.upgrades.abilities.resupply.enabled) {
      new AbilityButton("resupply", posX, GAME_HEIGHT - 60);
      posX += 100
    }
    if (gameState.upgrades.abilities.orbitalStrike.enabled) {
      new AbilityButton("orbitalStrike", posX, GAME_HEIGHT - 60);
      posX += 100
    }
    if (gameState.upgrades.abilities.energyBurst.enabled) {
      new AbilityButton("energyBurst", posX, GAME_HEIGHT - 60);
      posX += 100
    }
  }

  gainCredits(amount) {
    gameState.credits += amount;
    this.creditsGained += amount;
    this.creditsGainedText.setText(`Credits: ${this.creditsGained}`);
  }

  createFoot(offsetX, offsetY) {
    const foot = scene.add.image(
      this.x + offsetX,
      this.y + offsetY,
      "mech-foot"
    );

    foot.setDepth(2);

    foot.homeOffsetX = offsetX;
    foot.homeOffsetY = offsetY;

    foot.x = this.x + offsetX;
    foot.y = this.y + offsetY;

    foot.stepping = false;
    foot.t = 0;

    return foot;
  }

  createLeechLine(target) {
    const graphics = scene.add.graphics();
    graphics.setDepth(1);

    const lineData = {
        width: 4,
        alpha: 1
    };

    const redraw = () => {
      graphics.clear();
      graphics.lineStyle(
      lineData.width,
      0x0000ff,
      lineData.alpha
      );

      graphics.beginPath();
      graphics.moveTo(target.x, target.y);
      graphics.lineTo(this.x, this.y);
      graphics.strokePath();
    };

    redraw();
    scene.tweens.add({
      targets: lineData,
      width: 0,
      alpha: 0,
      duration: 400,
      ease: 'Quad.easeOut',
      onUpdate: redraw,
      onComplete: () => graphics.destroy()
    });
  }

  burst(duration = 350) {
    this.energy -= 1500;
    const explosion = scene.add.circle(
      this.x,
      this.y,
      1,
      0x000099,
      0.4
    );

    const hitEnemies = new Set();
    scene.tweens.add({
      targets: explosion,
      radius: gameState.upgrades.abilities.energyBurst.range,
      alpha: 0,
      duration,
      ease: "Quad.Out",

      onUpdate: () => {
        const radius = explosion.radius;
        const radiusSq = radius * radius;

        for (const enemy of scene.enemies) {
          if (!enemy.active || hitEnemies.has(enemy)) continue;

          const dx = enemy.x - this.x;
          const dy = enemy.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            enemy.takeDamage(gameState.upgrades.abilities.energyBurst.damage, explosion.x, explosion.y);
            hitEnemies.add(enemy);
          }
        }
      },

      onComplete: () => {
        explosion.destroy();
      }
    });
  }

  tick(delta) {
    // Convert delta from milliseconds to seconds
    const dt = delta / 1000;

    this.energy -= delta * gameState.upgrades.player.energyLoss;
    if (this.energy < 0) {
      this.returnToOrbit();
    }
    this.powerbar.setPower(this.energy / gameState.upgrades.player.energy);

    this.legs.forEach((leg, i) => {
      const foot = this.feet[i];

      const dx = foot.x - this.x;
      const dy = foot.y - this.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // Position at the start point
      leg.setPosition(this.x, this.y);

      // Rotate toward the foot
      leg.rotation = Math.atan2(dy, dx);

      // Stretch to match the distance
      leg.displayWidth = distance;
    });

    const cursors = scene.cursors;
    const wasd = scene.wasd;

    let dx = 0;
    let dy = 0;

    if (cursors.left.isDown || wasd.left.isDown) dx--;
    if (cursors.right.isDown || wasd.right.isDown) dx++;
    if (cursors.up.isDown || wasd.up.isDown) dy--;
    if (cursors.down.isDown || wasd.down.isDown) dy++;

    const len = Math.hypot(dx, dy);

    if (len > 0) {
      dx /= len;
      dy /= len;

      this.dirX = dx;
      this.dirY = dy;

      this.x += dx * gameState.upgrades.player.speed * dt;
      this.y += dy * gameState.upgrades.player.speed * dt;

      this.x = Phaser.Math.Clamp(this.x, 40, scene.map.widthInPixels - 40);
      this.y = Phaser.Math.Clamp(this.y, 40, scene.map.heightInPixels - 40);
    }

    this.updateFeet(delta);

    const pointer = scene.input.activePointer;

    const worldPoint = scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
    );

    this.barrel.rotation = Math.atan2(worldPoint.y - this.y, worldPoint.x - this.x);
    if (scene.input.activePointer.isDown) {
      if(this.cannonCanShoot){
      if (!this.lastShot || Date.now() - this.lastShot > gameState.upgrades.weapons.cannon.fireRate) {
        new Shell();
        this.cannonCanShoot=false;
        scene.time.delayedCall(gameState.upgrades.weapons.cannon.fireRate, () => {
          this.cannonCanShoot=true;
        });
      }
    }}

  

    if (gameState.upgrades.weapons.rocket.enabled) {
      if(this.rocketCanShoot){
      const enemies = this.findEnemies(1500)
      const nearestEnemy = enemies[0];
   
        new Rocket(this, nearestEnemy, true);
        if (gameState.upgrades.weapons.rocket.double) {
          const secondNearestEnemy = enemies[1];
          if (secondNearestEnemy) {
            new Rocket(this, secondNearestEnemy, true);
          }
        }
        this.rocketCanShoot=false;
        scene.time.delayedCall(gameState.upgrades.weapons.rocket.fireRate, () => {
          this.rocketCanShoot=true;
        });
      
    }}
  }

  findNearestEnemy(maxRange = 1500, minRange = 300) {
    let nearestEnemy = null;
    let nearestDist = Infinity;
    for (const enemy of scene.enemies) {
      if (!enemy.active) continue;
      const dist = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
      if (dist < nearestDist && dist < maxRange && dist > minRange) {
        nearestDist = dist;
        nearestEnemy = enemy;
      }
    }
    return nearestEnemy;
  }

  findEnemies(maxRange = 1500, minRange = 300) {
    return scene.enemies
      .filter(enemy => enemy.active)
      .map(enemy => ({
        enemy,
        dist: Phaser.Math.Distance.Between(
          this.x,
          this.y,
          enemy.x,
          enemy.y
        )
      }))
      .filter(({ dist }) => dist < maxRange && dist > minRange)
      .sort((a, b) => a.dist - b.dist)
      .map(({ enemy }) => enemy);
}

  updateFeet(delta) {
    const dt = delta / 1000;
    const STEP_DISTANCE = 40;
    const STEP_SPEED = 10;

    const groupA = [0, 3];
    const groupB = [1, 2];

    const activeGroup = this.stepGroup === 0 ? groupA : groupB;

    // If no foot is currently animating, we are allowed to start a new step cycle
    const anyStepping = this.feet.some(f => f.stepping);

    if (!anyStepping && !this.stepLocked) {
      let started = false;

      for (const i of activeGroup) {
        const foot = this.feet[i];

        const targetX = this.x + foot.homeOffsetX + this.dirX * 20;
        const targetY = this.y + foot.homeOffsetY + this.dirY * 20;

        const dist = Phaser.Math.Distance.Between(
          foot.x, foot.y,
          targetX, targetY
        );

        if (dist > STEP_DISTANCE) {
          console.log('spawning foot!')
          const footprint = scene.add.image(
            foot.x,
            foot.y,
            "mech-footprint"
          )
          footprint.setDepth(1)
          footprint.setRotation(foot.rotation);
          footprint.setAlpha(.3);
          scene.tweens.add({
            targets: footprint,
            alpha: 0,
            duration: 10000,
            onComplete: () => footprint.destroy()
          });
          foot.stepping = true;
          foot.t = 0;

          foot.startX = foot.x;
          foot.startY = foot.y;

          foot.endX = targetX;
          foot.endY = targetY;

          started = true;
        }
      }

      // lock ONLY if we actually started a step
      if (started) {
        this.stepLocked = true;
      }
    }

    // Animate feet
    for (const foot of this.feet) {
      if (!foot.stepping) continue;

      foot.t += dt * STEP_SPEED;
      const t = Math.min(foot.t, 1);

      const lift = Math.sin(t * Math.PI) * 10;

      foot.x = Phaser.Math.Linear(foot.startX, foot.endX, t);
      foot.y = Phaser.Math.Linear(foot.startY, foot.endY, t) - lift;

      if (t >= 1) {
        foot.stepping = false;
      }
    }

    // When ALL feet finish, unlock and switch group
    if (this.stepLocked && !this.feet.some(f => f.stepping)) {
      this.stepGroup = 1 - this.stepGroup;
      this.stepLocked = false;
    }

    // Calculate center of mass, move body towards it
    let cx = 0;
    let cy = 0;
    let count = 0;

    for (const foot of this.feet) {
      if (foot.stepping) continue;

      cx += foot.x;
      cy += foot.y;
      count++;
    }

    if (count === 0) return;

    cx /= count;
    cy /= count;

    // Make body interpolation frame-rate independent
    const lerpFactor = 1 - Math.pow(0.01, dt);
    this.x = Phaser.Math.Linear(this.x, cx, lerpFactor);
    this.y = Phaser.Math.Linear(this.y, cy, lerpFactor);
  }

  returnToOrbit() {
  gameState.credits += this.creditsGained;
    this.scene.scene.start("orbitScene", { creditsGained: this.creditsGained });
}
}