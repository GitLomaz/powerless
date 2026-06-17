/* ------------------------------------------------------------------ */
/*  UpgradePanel – standalone panel (no container)                     */
/*               background rect, text labels, hover & click handlers  */
/*               positioned absolutely by the OrbitScene caller        */
/* ------------------------------------------------------------------ */
class UpgradePanel {
  constructor(scene, x, y, statName, upgradeSystem) {
    this.statName = statName;
    this._system = upgradeSystem;
    this.scene = scene;

    // Listen for purchase-complete event emitted by any other panel.
    this.scene.events.on('upgrade-bought', () => this.refresh());

    const bg = scene.add.rectangle(x, y, 280, 130, 0x334455);
    bg.setOrigin(0).setAlpha(0.9);
    bg.setStrokeStyle(2, 0x667788, 0.6);
    bg.setInteractive();

    // Human-friendly label (title-cased)
    const labelX = x + 16, labelY = y + 14;
    scene.add.text(labelX, labelY, statName.charAt(0).toUpperCase() + statName.slice(1), {
      fontSize: '16px', fontFamily: 'monospace', color: '#aaaaaa'
    });

    // Level / Value / Cost (tweened via refresh())
    this.levelText = scene.add.text(labelX, labelY + 32, 'Lv 1', {
      fontSize: '24px', fontFamily: 'monospace', color: '#ffffff', fontStyle: 'bold'
    });
    this.valueText = scene.add.text(labelX, labelY + 58, 'Val ---', {
      fontSize: '16px', fontFamily: 'monospace', color: '#8fbc8f'
    });
    this.costText = scene.add.text(labelX, labelY + 82, 'Cost ---', {
      fontSize: '18px', fontFamily: 'monospace', color: '#cccccc'
    });

    // Hover in/out — darken on over, restore on out
    bg.on('pointerover', () => {
      bg.setFillStyle(0x1e2a36, 1);
      bg.setStrokeStyle(2, 0x4a5a6a, 0.8);
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x334455, 1);
      bg.setStrokeStyle(2, 0x667788, 0.6);
    });

    // Click – attempt upgrade through centralized system
    bg.addListener('pointerdown', () => this._onUpgrade());
  }

  /* ---- data accessors ---- */
  get stats() { return this._system.stats[this.statName]; }
  get cost()  { return this._system.cost(this.statName); }

  /* ---- click handler: buy through centralized UPGRADES system ---- */
  _onUpgrade() {
    const s = this._system.stats[this.statName];
    if (!s) return;
    const cost = this._system.cost(this.statName);
    if (gameState.credits < cost) return;       // not enough — nothing to update

    gameState.credits -= cost;
    s.level++;
    this._system._syncToGameState(this.statName, s.level);

    // Notify all registered listeners to refresh.
    this.scene.events.emit('upgrade-bought');
  }

  /* ---- public refresh – called periodically from scene ---- */
  refresh() {
    const s = this.stats; if (!s) return;
    this.levelText.setText(`Lv ${Math.max(1, s.level)}`);

    let val = s.value + s.step * (s.level - 1);
    let label;
    if (this.statName === 'criticalChance') {
      label = `${val.toFixed(0)}%`;
    } else if (this.statName === 'fireRate') {
      label = `${val.toFixed(2)}s`;
    } else {
      label = Number.isFinite(val) ? String(+val.toFixed(1)) : '--';
    }
    this.valueText.setText(`Val ${label}`);

    this.costText.setText(`Cost ${this.cost}`);
  }
}
