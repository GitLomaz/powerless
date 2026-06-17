// Every Game Object gets its component methods via mixins.
// Just call them directly on any game object:
const sprite = this.add.sprite(400, 300, 'hero');

sprite.setAlpha(0.5);                          // Alpha
sprite.setBlendMode(Phaser.BlendModes.ADD);    // BlendMode
sprite.setDepth(10);                           // Depth
sprite.setFlip(true, false);                   // Flip
sprite.setOrigin(0, 0);                        // Origin
sprite.setScrollFactor(0);                     // ScrollFactor (HUD)
sprite.setDisplaySize(64, 64);                 // Size
sprite.setTexture('hero', 'walk-1');           // Texture
sprite.setTint(0xff0000);                      // Tint
sprite.setPosition(100, 200);                  // Transform
sprite.setVisible(false);                      // Visible
sprite.setScale(2);                            // Transform
sprite.setAngle(45);                           // Transform

// Per-corner alpha (WebGL only)
sprite.setAlpha(1, 0.5, 0.5, 1);

// Crop a texture region
sprite.setCrop(0, 0, 32, 32);

// Enable WebGL filters (post-processing)
sprite.enableFilters();
sprite.filters.internal.addBlur(1, 2, 2, 1);

// Lighting (WebGL only, v4 feature)
sprite.setLighting(true);

//tools and utilities
// Create 20 sprites and batch-position them in a grid
const sprites = [];
for (let i = 0; i < 20; i++) {
    sprites.push(this.add.sprite(0, 0, 'gem'));
}

// Arrange into a 5x4 grid
Phaser.Actions.GridAlign(sprites, {
    width: 5,
    height: 4,
    cellWidth: 64,
    cellHeight: 64,
    x: 100,
    y: 100
});

// Fade alpha from 0 to 1 across all sprites
Phaser.Actions.Spread(sprites, 'alpha', 0, 1);

// Offset each sprite's x by 10, with a step of 2 per item
Phaser.Actions.IncX(sprites, 10, 2);

// Works with Groups too
const group = this.add.group({ key: 'star', repeat: 11 });
Phaser.Actions.PlaceOnCircle(group.getChildren(), new Phaser.Geom.Circle(400, 300, 200));