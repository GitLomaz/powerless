class Player extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, GAME_WIDTH * 1.5, GAME_HEIGHT * 1.5);

    this.circle = scene.add.circle(0, 0, 16, 0xffff00);
    this.add(this.circle);
    this.setDepth(3);
    this.circle.setDepth(3);

    scene.cameras.main.startFollow(this);
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    scene.add.existing(this);

    this.speed = 0.25;

    this.dirX = 1;
    this.dirY = 0;

    this.feet = [
      this.createFoot( 24, -24),
      this.createFoot( 24,  24),
      this.createFoot(-24, -24),
      this.createFoot(-24,  24)
    ];

    this.legs = [
      scene.add.line(0, 0, 0, 0, 0, 0, 0x000000).setOrigin(0).setDepth(1),
      scene.add.line(0, 0, 0, 0, 0, 0, 0x000000).setOrigin(0).setDepth(1),
      scene.add.line(0, 0, 0, 0, 0, 0, 0x000000).setOrigin(0).setDepth(1),
      scene.add.line(0, 0, 0, 0, 0, 0, 0x000000).setOrigin(0).setDepth(1),
    ]

    this.stepGroup = 0;
    this.stepLocked = false;

    this.energy = 15000
    this.powerbar = new Powerbar(Math.floor(this.energy / 7500));
  }

  createFoot(offsetX, offsetY) {
    const foot = scene.add.circle(
      this.x + offsetX,
      this.y + offsetY,
      6,
      0xff0000
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

  tick(delta) {

    this.energy -= delta;
    if (this.energy < 0) {
      return;
    }
    this.powerbar.setPower(this.energy / 15000);

    this.legs.forEach((leg, i) => {
      const foot = this.feet[i];
      leg.setTo(this.x, this.y, foot.x, foot.y);
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

      this.x += dx * this.speed * delta;
      this.y += dy * this.speed * delta;
    }

    this.updateFeet(delta);

    if (scene.input.activePointer.isDown) {
      if (!this.lastShot || Date.now() - this.lastShot > 200) {
        new Bullet();
        this.lastShot = Date.now();
      }
    }
  }

  updateFeet(delta) {
    const STEP_DISTANCE = 40;
    const STEP_SPEED = 0.01;

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

      foot.t += delta * STEP_SPEED;
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

    this.x = Phaser.Math.Linear(this.x, cx, 0.1);
    this.y = Phaser.Math.Linear(this.y, cy, 0.1);
  }
}