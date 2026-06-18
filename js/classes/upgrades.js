class UPGRADES {
  constructor() {
    // level | cost & scale   | base value | per-tier increment
    this.stats = {
      health:            { level: 1, baseCost: 10,  scale: 1.5, value: 100,  step: 50 },
      damage:            { level: 1, baseCost: 12,  scale: 1.6, value: 10,   step: 8 },
      speed:             { level: 1, baseCost: 8,   scale: 1.4, value: 3,    step: 0.4 },
      duration:          { level: 1, baseCost: 15,  scale: 1.7, value: 50,   step: 10 },
      fireRate:          { level: 1, baseCost: 20,  scale: 1.8, value: 1,    step: -0.08 },
      aoe:               { level: 1, baseCost: 25,  scale: 1.9, value: 20,   step: 12 },
      piercing:          { level: 1, baseCost: 30,  scale: 2.0, value: 1,    step: 1 },
      criticalChance:    { level: 1, baseCost: 20,  scale: 1.7, value: 0,    step: 5 },
      criticalDamage:    { level: 1, baseCost: 25,  scale: 1.8, value: 1,    step: 0.2 },
      armor:             { level: 1, baseCost: 18,  scale: 1.6, value: 0,    step: 3 },
      projectiles:       { level: 1, baseCost: 22,  scale: 1.7, value: 1,    step: 1 },
      pickupRange:       { level: 1, baseCost: 15,  scale: 1.5, value: 50,   step: 10 },
    };
  }

  /* ---- static credits accessor (single source of truth) ---- */
  static getCredits()      { return gameState.credits; }
  static setCredits(val)   { gameState.credits = val; }

  // Current value of any stat at its current level.
  get(name) {
    const s = this.stats[name];
    if (!s) return undefined;
    return +(s.value + s.step * (s.level - 1)).toFixed(2);
  }

  // Cost to buy the next tier of a stat.
  cost(name) {
    const s = this.stats[name];
    if (!s) return Infinity;
    return +((s.baseCost * Math.pow(s.scale, s.level - 1)).toFixed(0));
  }

  // DEPRICATED?!
  // Push upgrade changes back into gameState so scenes read live values.
  _syncToGameState(name, level) {
    switch (name) {
      case 'fireRate':
        gameState.upgrades.weapons.cannon.fireRate = Math.max(100, 1000 - (level - 1) * ~~this.get('fireRate'));
        break;
      case 'speed':
        gameState.upgrades.player.speed = this.get('speed');
        break;
    }
  }
}
