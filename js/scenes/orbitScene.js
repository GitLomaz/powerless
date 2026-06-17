/* ------------------------------------------------------------------ */
/*                       orbitScene (upgrade grid)                     */
/* ------------------------------------------------------------------ */

let orbitScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function orbitScene() {
    Phaser.Scene.call(this, { key: "orbitScene" });
  },

  preload: function () {
    scene = this;
  },

  create: function () {
    // Dark background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a2e, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Title + credits row
    this.add
      .text(GAME_WIDTH / 2, 38, "UPGRADES", {
        fontSize: "36px",
        fontFamily: "monospace",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Credits display
    this.creditsText = this.add
      .text(GAME_WIDTH / 2, 78, "", {
        fontSize: "22px",
        fontFamily: "monospace",
        color: "#ffd700",
      })
      .setOrigin(0.5);
    this.updateCreditsText();

    // Subscribe credits text to scene events (auto-cleans on destroy)
    this.events.on('upgrade-bought', () => this.updateCreditsText());

    // Shared UPGRADES singleton – persists across scene switches
    if (!game.upgrades) game.upgrades = new UPGRADES();
    const upgrades = game.upgrades;

    // Stats we expose in the grid (mapped from upgrades.js keys, title-cased for display)
    const displayNames = [
      "Health",
      "Damage",
      "Speed",
      "Duration",
      "Fire Rate",
      "AoE",
      "Piercing",
      "Critical Chance",
      "Critical Damage",
      "Armor",
      "Projectiles",
      "Pickup Range",
    ];

    // Build panels into a grid using for-loop incrementing/rolling x,y
    const cellW = 280,
      cellH = 130;
    const gapX = 20,
      gapY = 20;
    const marginX = 40,
      marginY = 135;
    const cols = Math.ceil((GAME_WIDTH - 2 * marginX) / (cellW + gapX));

    let x = marginX,
      y = marginY;

    const panels = [];
    for (let i = 0; i < displayNames.length; i++) {
      if (i > 0 && i % cols === 0) {
        x = marginX;
        y += cellH + gapY;
      }
      panels.push(
        new UpgradePanel(this, x, y, displayNames[i].toLowerCase(), upgrades),
      );
      x += cellW + gapX;
    }

    // Initialize all panel values on first paint
    panels.forEach((p) => p.refresh());
  },

  updateCreditsText: function () {
    if (this.creditsText) {
      this.creditsText.setText(`Credits: ${gameState.credits.toLocaleString()}`);
    }
  },
});
