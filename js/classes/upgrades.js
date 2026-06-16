class UPGRADES {
  constructor() {
    // level | cost & scale   | base value | per-tier increment
    this.stats = {
      health: { level: 1, cost: 10, scale: 1.5, value: 100, step: 50 },
      damage: { level: 1, cost: 12, scale: 1.6, value: 10, step: 8 },
      speed: { level: 1, cost: 8, scale: 1.4, value: 3, step: 0.4 },
      duration: { level: 1, cost: 15, scale: 1.7, value: 50, step: 10 },
      fireRate: { level: 1, cost: 20, scale: 1.8, value: 1, step: -0.08 },
      aoe: { level: 1, cost: 25, scale: 1.9, value: 20, step: 12 },
      piercing: { level: 1, cost: 30, scale: 2.0, value: 1, step: 1 },
      criticalChance: { level: 1, cost: 20, scale: 1.7, value: 0, step: 5 },
      criticalDamage: { level: 1, cost: 25, scale: 1.8, value: 1, step: 0.2 },
      armor: { level: 1, cost: 18, scale: 1.6, value: 0, step: 3 },
    };
  }

  // Get the current value of any stat.
  get(name) {
    let stat = this.stats[name];
    return +(stat.value + stat.step * (stat.level - 1)).toFixed(2);
  }

  // Buy a tier of any stat. cost is your gold budget. 
  levelUp(gold, name) {
   let stat = this.stats[name];
   

    let cost = (stat.cost * Math.pow(stat.scale, stat.level - 1)).toFixed(0);
    if (gold < cost) return false;

    gold -= cost;
    stat.level++;
    
  }
}
