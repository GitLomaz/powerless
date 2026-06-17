// TO APPLY AN UPGRADE CALL UPGRADES[X].applyUpgrade(y)
// Example: `UPGRADES[1].applyUpgrade(2)` -- sets upgrade ID 1 to level 3 (zero indexed)

const UPGRADES = [
  { 
    id: 0,
    name: "Deploy",
    description: "Start the battle and deploy your turret.",
    levels: [
      {cost: 0, effect: true}
    ],
    applyUpgrade: () => {
      // Unlock deploy button
    },
    grid: {
      x: 0,
      y: 0,
      icon: "deployIcon",
      size: "large"
    }
  },
  { 
    id: 1,
    name: "Main Cannon - Projectile Speed",
    cost: 5,
    description: "Start the battle and deploy your turret.",
    prerequisite: 0,
    levels: [
      {cost: 5, effect: 500},
      {cost: 15, effect: 600},
      {cost: 40, effect: 700}
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.turretBulletSpeed = UPGRADES[1].levels[level].effect
    },
    grid: {
      x: 10,
      y: 0,
      icon: "projectileSpeedIcon",
      size: "medium"
    }
  }
]