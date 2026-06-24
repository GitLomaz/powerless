class T3 extends Enemy {
  constructor() {
    super();
    
    // Set up physics body (much smaller than boss)
    this.body.setCircle(32, -32, -32);
    scene.enemyGroup.add(this);
    
    this.tier = 3;
    this.health = 250
    this.healthMax = 250
    this.value = Random.between(10, 18);
    this.damage = 120;
    
    // Movement properties
    this.speed = 50;
    this.mode = "wander";
    this.dirX = 1;
    this.dirY = 0;
    this.target = null;
    this.facingAngle = 0; // Track body orientation
    
    // Fire properties
    this.fireCooldown = Random.between(0, 10000);
    
    // Create 2 feet - simple left/right positioning
    this.feet = [
      this.createFoot(-1),  // Left foot
      this.createFoot(1)    // Right foot
    ];
    
    // Create 2 legs
    this.legs = [
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3).setScale(0.4),
      scene.add.image(0, 0, "boss-leg").setOrigin(0, 0.5).setDepth(3).setScale(0.4)
    ];
    
    // Body and barrel (scaled down)
    this.platform = scene.add.image(0, 0, "boss-body").setOrigin(0.5, 0.5).setScale(0.25);
    this.add(this.platform);
    
    this.barrel = scene.add.image(0, 0, "boss-barrel").setOrigin(0.5, 0.5).setDepth(4).setScale(0.25);
    this.add(this.barrel);
    this.setDepth(4);
    
    // Leg animation properties
    this.stepGroup = 0;
    this.stepLocked = false;
    
    this.checkPromotion();
  }
  
  createFoot(side) {
    const foot = scene.add.image(this.x, this.y, "boss-foot");
    
    foot.setDepth(2);
    foot.setScale(0.4);
    
    foot.side = side; // -1 for left, 1 for right
    foot.stepping = false;
    foot.t = 0;
    
    return foot;
  }

  tick(delta) {
    const dt = delta / 1000;
    
    // State machine behavior
    if (this.mode === "wander") {
      if (!this.target) {
        this.target = new Phaser.Math.Vector2(
          Random.between(0, scene.map.widthInPixels), 
          Random.between(0, scene.map.heightInPixels)
        );
      }
      
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const len = Math.hypot(dx, dy);
      
      if (len < 4) {
        this.target = null;
        this.dirX = 0;
        this.dirY = 0;
      } else {
        this.dirX = dx / len;
        this.dirY = dy / len;
        this.x += this.dirX * this.speed * dt;
        this.y += this.dirY * this.speed * dt;
      }
    } else if (this.mode === "chase") {
      const dx = scene.player.x - this.x;
      const dy = scene.player.y - this.y;
      const len = Math.hypot(dx, dy);
      
      if (len > 4) {
        this.dirX = dx / len;
        this.dirY = dy / len;
        this.x += this.dirX * this.speed * dt;
        this.y += this.dirY * this.speed * dt;
      }
    } else if (this.mode === "fire") {
      // Don't move when firing
      this.dirX = 0;
      this.dirY = 0;
      
      this.fireCooldown -= delta;
      if (this.fireCooldown <= 0) {
        new Rocket(this, scene.player, false, this.damage);
        this.fireCooldown = 10000;
      }
    }
    
    // Update facing angle based on movement direction
    if (this.dirX !== 0 || this.dirY !== 0) {
      this.facingAngle = Math.atan2(this.dirY, this.dirX);
    }
    
    // Clamp position to map bounds
    this.x = Phaser.Math.Clamp(this.x, 40, scene.map.widthInPixels - 40);
    this.y = Phaser.Math.Clamp(this.y, 40, scene.map.heightInPixels - 40);
    
    // Update feet animation
    this.updateFeet(delta);
    
    // Update leg positions after feet are positioned
    this.legs.forEach((leg, i) => {
      const foot = this.feet[i];
      
      const dx = foot.x - this.x;
      const dy = foot.y - this.y;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      leg.setPosition(this.x, this.y);
      leg.rotation = Math.atan2(dy, dx);
      leg.displayWidth = distance;
      leg.displayHeight = 3;
    });
    
    // Point barrel toward player
    if (scene.player) {
      this.barrel.rotation = Math.atan2(
        scene.player.y - this.y, 
        scene.player.x - this.x
      );
    }
    
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y);
    
    if (distanceToPlayer < 400) {
      this.mode = "fire";
    } else if (distanceToPlayer < 1000) {
      this.mode = "chase";
    } else {
      this.mode = "wander";
    }
  }
  
  updateFeet(delta) {
    const dt = delta / 1000;
    const STEP_DISTANCE = 30;
    const STEP_SPEED = 6;
    const FOOT_SPACING = 8; // Small left/right offset from center
    const BACK_OFFSET = -15; // Position feet slightly behind body center
    
    // Calculate perpendicular angle (90 degrees to facing)
    const perpAngle = this.facingAngle + Math.PI / 2;
    
    // 2 legs - alternate between left (0) and right (1)
    const anyStepping = this.feet.some(f => f.stepping);
    
    if (!anyStepping && !this.stepLocked) {
      const footIndex = this.stepGroup % 2;
      const foot = this.feet[footIndex];
      
      // Calculate home position: behind body center with small left/right offset
      // Position along facing direction (behind)
      const backX = this.x + Math.cos(this.facingAngle) * BACK_OFFSET;
      const backY = this.y + Math.sin(this.facingAngle) * BACK_OFFSET;
      // Add small perpendicular offset for left/right
      const homeX = backX + Math.cos(perpAngle) * FOOT_SPACING * foot.side;
      const homeY = backY + Math.sin(perpAngle) * FOOT_SPACING * foot.side;
      
      // Target position is home position, unless we're moving
      let targetX = homeX;
      let targetY = homeY;
      
      // If moving, step forward in the facing direction
      if (this.dirX !== 0 || this.dirY !== 0) {
        const strideDistance = 40;
        targetX = homeX + Math.cos(this.facingAngle) * strideDistance;
        targetY = homeY + Math.sin(this.facingAngle) * strideDistance;
      }
      
      const dist = Phaser.Math.Distance.Between(
        foot.x, foot.y,
        targetX, targetY
      );
      
      if (dist > STEP_DISTANCE) {
        // Create footprint
        const footprint = scene.add.image(foot.x, foot.y, "boss-footprint");
        footprint.setDepth(1);
        footprint.setScale(0.4);
        footprint.setRotation(foot.rotation);
        footprint.setAlpha(0.3);
        scene.tweens.add({
          targets: footprint,
          alpha: 0,
          duration: 8000,
          onComplete: () => footprint.destroy()
        });
        
        foot.stepping = true;
        foot.t = 0;
        foot.startX = foot.x;
        foot.startY = foot.y;
        foot.endX = targetX;
        foot.endY = targetY;
        
        this.stepLocked = true;
      }
    }
    
    // Animate stepping feet
    for (const foot of this.feet) {
      if (!foot.stepping) {
        // If not stepping, slowly move foot toward home position
        const perpAngle = this.facingAngle + Math.PI / 2;
        const backX = this.x + Math.cos(this.facingAngle) * BACK_OFFSET;
        const backY = this.y + Math.sin(this.facingAngle) * BACK_OFFSET;
        const homeX = backX + Math.cos(perpAngle) * FOOT_SPACING * foot.side;
        const homeY = backY + Math.sin(perpAngle) * FOOT_SPACING * foot.side;
        
        const lerpFactor = 1 - Math.pow(0.01, dt);
        foot.x = Phaser.Math.Linear(foot.x, homeX, lerpFactor);
        foot.y = Phaser.Math.Linear(foot.y, homeY, lerpFactor);
        continue;
      }
      
      foot.t += dt * STEP_SPEED;
      const t = Math.min(foot.t, 1);
      
      const lift = Math.sin(t * Math.PI) * 8;
      
      foot.x = Phaser.Math.Linear(foot.startX, foot.endX, t);
      foot.y = Phaser.Math.Linear(foot.startY, foot.endY, t) - lift;
      
      if (t >= 1) {
        foot.stepping = false;
      }
    }
    
    // When foot finishes, unlock and switch to next foot
    if (this.stepLocked && !this.feet.some(f => f.stepping)) {
      this.stepGroup = (this.stepGroup + 1) % 2;
      this.stepLocked = false;
    }
    
    // Don't move body based on feet - body is driven by movement logic in tick()
  }
  
  destroy() {
    // Destroy feet
    this.feet.forEach(foot => {
      if (foot && foot.destroy) {
        foot.destroy();
      }
    });
    
    // Destroy legs
    this.legs.forEach(leg => {
      if (leg && leg.destroy) {
        leg.destroy();
      }
    });
    
    super.destroy();
  }
}
