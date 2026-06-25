// Background Mech - simplified wandering mech for title screen
class BackgroundMech extends Phaser.GameObjects.Container {
  constructor(scene) {
    const startX = 200 + Math.random() * (GAME_WIDTH - 400);
    const startY = 200 + Math.random() * (GAME_HEIGHT - 400);
    super(scene, startX, startY);

    this.scene = scene;
    this.speed = 200;
    
    // Waypoint system
    this.currentWaypoint = null;
    this.waypointReachedDistance = 50;
    this.pickNewWaypoint();

    this.stepGroup = 0;
    this.stepLocked = false;

    // Create feet
    this.feet = [
      this.createFoot(28, -28, -45 + 180),
      this.createFoot(28, 28, -45 - 90),
      this.createFoot(-28, -28, 45),
      this.createFoot(-28, 28, -45),
    ];

    // Create legs
    this.legs = [
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(0).setAlpha(0.8),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(0).setAlpha(0.8),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(0).setAlpha(0.8),
      scene.add.image(0, 0, "mech-leg").setOrigin(0, 0.5).setDepth(0).setAlpha(0.8),
    ];

    // Body
    this.platform = scene.add.image(0, 0, "mech-body").setOrigin(0.5, 0.5).setAlpha(0.8);
    this.add(this.platform);

    // Barrel
    this.barrel = scene.add.image(0, 0, "mech-barrel").setOrigin(0.5, 0.5).setDepth(1).setAlpha(0.8);
    this.add(this.barrel);
    this.setDepth(2);
    // this.setAlpha(0.8);

    scene.add.existing(this);
  }

  pickNewWaypoint() {
    // Pick a random point inside the screen with margins
    const margin = 100;
    this.currentWaypoint = {
      x: margin + Math.random() * (GAME_WIDTH - margin * 2),
      y: margin + Math.random() * (GAME_HEIGHT - margin * 2)
    };
  }

  createFoot(offsetX, offsetY, angle) {
    const foot = this.scene.add.image(
      this.x + offsetX,
      this.y + offsetY,
      "mech-foot"
    );

    foot.setDepth(0);
    foot.setAlpha(0.8);
    foot.setAngle(angle);

    foot.homeOffsetX = offsetX;
    foot.homeOffsetY = offsetY;

    foot.x = this.x + offsetX;
    foot.y = this.y + offsetY;

    foot.stepping = false;
    foot.t = 0;

    return foot;
  }

  update(time, delta) {
    const dt = delta / 1000;

    // Calculate direction to waypoint
    const dx = this.currentWaypoint.x - this.x;
    const dy = this.currentWaypoint.y - this.y;
    const distToWaypoint = Math.hypot(dx, dy);

    // Check if we've reached the waypoint
    if (distToWaypoint < this.waypointReachedDistance) {
      this.pickNewWaypoint();
      return; // Wait a frame before moving to new waypoint
    }

    // Normalize direction
    this.dirX = dx / distToWaypoint;
    this.dirY = dy / distToWaypoint;

    // Move towards waypoint
    this.x += this.dirX * this.speed * dt;
    this.y += this.dirY * this.speed * dt;

    // Update feet
    this.updateFeet(delta);

    // Update legs
    this.legs.forEach((leg, i) => {
      const foot = this.feet[i];
      const dx = foot.x - this.x;
      const dy = foot.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      leg.setPosition(this.x, this.y);
      leg.rotation = Math.atan2(dy, dx);
      leg.displayWidth = distance;
    });

    // Barrel points in movement direction
    this.barrel.rotation = Math.atan2(this.dirY, this.dirX);
  }

  updateFeet(delta) {
    const dt = delta / 1000;
    const STEP_DISTANCE = 40;
    const STEP_SPEED = 10;

    const groupA = [0, 3];
    const groupB = [1, 2];

    const activeGroup = this.stepGroup === 0 ? groupA : groupB;

    const anyStepping = this.feet.some((f) => f.stepping);

    if (!anyStepping && !this.stepLocked) {
      let started = false;

      for (const i of activeGroup) {
        const foot = this.feet[i];

        const targetX = this.x + foot.homeOffsetX + this.dirX * 20;
        const targetY = this.y + foot.homeOffsetY + this.dirY * 20;

        const dist = Phaser.Math.Distance.Between(
          foot.x,
          foot.y,
          targetX,
          targetY
        );

        if (dist > STEP_DISTANCE) {
          // Create faint footprint
          const footprint = this.scene.add.image(foot.x, foot.y, "mech-footprint");
          footprint.setDepth(1);
          footprint.setRotation(foot.rotation);
          footprint.setAlpha(0.3);
          this.scene.tweens.add({
            targets: footprint,
            alpha: 0,
            duration: 5000,
            onComplete: () => footprint.destroy(),
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
    if (this.stepLocked && !this.feet.some((f) => f.stepping)) {
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

    const lerpFactor = 1 - Math.pow(0.01, dt);
    this.x = Phaser.Math.Linear(this.x, cx, lerpFactor);
    this.y = Phaser.Math.Linear(this.y, cy, lerpFactor);
  }
}
