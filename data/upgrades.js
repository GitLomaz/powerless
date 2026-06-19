const LEVELS = [];
const UPGRADEBOXES = [];
const UPGRADES = [
  {
    id: 0,
    name: "Deploy",
    description: "Start the battle and deploy your turret.",
    levels: [{ cost: 0, effect: true }],
    grid: {
      x: 0,
      y: 0,
      icon: "deployIcon",
      size: "medium",
    },
  },
  {
    id: 1,
    name: "Main Cannon - Projectile Speed",
    description: "Start the battle and deploy your turret.",
    prerequisite: 0,
    levels: [
      { cost: 5, effect: 500 },
      { cost: 15, effect: 600 },
      { cost: 40, effect: 700 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.speed =
        UPGRADES[1].levels[level].effect;
    },
    grid: {
      x: 1,
      y: 0,
      icon: "projectileSpeedIcon",
      size: "medium",
    },
  },
  {
    id: 2,
    name: "Main Cannon - Damage",
    description: "Increase the damage of the main cannon.",
    prerequisite: 1,
    levels: [
      { cost: 5, effect: 2 },
      { cost: 15, effect: 3 },
      { cost: 40, effect: 4 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.damage =
        UPGRADES[2].levels[level].effect;
    },
    grid: {
      x: 2,
      y: 0,
      icon: "damage",
      size: "medium",
    },
  },
  {
    id: 3,
    name: "Main Cannon - Range",
    description: "Increase the range of the main cannon.",
    prerequisite: 2,
    levels: [
      { cost: 5, effect: 100 },
      { cost: 15, effect: 150 },
      { cost: 40, effect: 200 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.range =
        UPGRADES[3].levels[level].effect;
    },
    grid: {
      x: 3,
      y: 0,
      icon: "rangeIcon",
      size: "medium",
    },
  },
  {
    id: 4,
    name: "Main Cannon - Fire Rate",
    description: "Increase the fire rate of the main cannon.",
    prerequisite: 2,
    levels: [
      { cost: 5, effect: 1.0 },
      { cost: 15, effect: 0.8 },
      { cost: 40, effect: 0.6 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.fireRate =
        UPGRADES[4].levels[level].effect;
    },
    grid: {
      x: 2,
      y: 1,
      icon: "fireRateIcon",
      size: "medium",
    },
  },
  {
    id: 5,
    name: "Mini Gun Weapon",
    description: "Unlock the mini gun weapon.",
    prerequisite: 1,
    levels: [{ cost: 10, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.miniGun.unlocked =
        UPGRADES[5].levels[level].effect;
    },
    grid: {
      x: 1,
      y: 1,
      icon: "miniGunIcon",
      size: "medium",
    },
  },
  {
    id: 6,
    name: "Mini Gun - Damage",
    description: "Increase the damage of the mini gun.",
    prerequisite: 5,
    levels: [
      { cost: 5, effect: 1 },
      { cost: 15, effect: 2 },
      { cost: 40, effect: 3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.miniGun.damage =
        UPGRADES[6].levels[level].effect;
    },
    grid: {
      x: 1,
      y: 2,
      icon: "miniGundamage",
      size: "medium",
    },
  },
  {
    id: 7,
    name: "Mini Gun - Fire Rate",
    description: "Increase the fire rate of the mini gun.",
    prerequisite: 6,
    levels: [
      { cost: 5, effect: 0.5 },
      { cost: 15, effect: 0.4 },
      { cost: 40, effect: 0.3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.miniGun.fireRate =
        UPGRADES[7].levels[level].effect;
    },
    grid: {
      x: 1,
      y: 3,
      icon: "miniGunFireRateIcon",
      size: "medium",
    },
  },
  {
    id: 8,
    name: "Mini Gun - Range",
    description: "Increase the range of the mini gun.",
    prerequisite: 5,
    levels: [
      { cost: 5, effect: 50 },
      { cost: 15, effect: 75 },
      { cost: 40, effect: 100 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.miniGun.range =
        UPGRADES[8].levels[level].effect;
    },
    grid: {
      x: 2,
      y: 2,
      icon: "miniGunRangeIcon",
      size: "medium",
    },
  },

  {
    id: 9,
    name: "Missiles",
    description: "Unlock the missile weapon.",
    prerequisite: 1,
    levels: [{ cost: 20, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.missiles.unlocked =
        UPGRADES[9].levels[level].effect;
    },
    grid: {
      x: 1,
      y: -1,
      icon: "missileIcon",
      size: "medium",
    },
  },
  {
    id: 10,
    name: "Missiles - Damage",
    description: "Increase the damage of missiles.",
    prerequisite: 9,
    levels: [
      { cost: 5, effect: 5 },
      { cost: 15, effect: 10 },
      { cost: 40, effect: 15 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.missiles.damage =
        UPGRADES[10].levels[level].effect;
    },
    grid: {
      x: 2,
      y: -1,
      icon: "missiledamage",
      size: "medium",
    },
  },
  {
    id: 11,
    name: "Missiles - Fire Rate",
    description: "Increase the fire rate of missiles.",
    prerequisite: 10,
    levels: [
      { cost: 5, effect: 0.5 },
      { cost: 15, effect: 0.4 },
      { cost: 40, effect: 0.3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.missiles.fireRate =
        UPGRADES[11].levels[level].effect;
    },
    grid: {
      x: 3,
      y: -1,
      icon: "missileFireRateIcon",
      size: "medium",
    },
  },
  {
    id: 12,
    name: "Missiles - Splash Damage",
    description: "Unlock splash damage for missiles.",
    prerequisite: 10,
    levels: [
      { cost: 10, effect: 5 },
      { cost: 30, effect: 10 },
      { cost: 80, effect: 15 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.missiles.splashDamage =
        UPGRADES[12].levels[level].effect;
    },
    grid: {
      x: 2,
      y: -2,
      icon: "batteryCapacityIcon",
      size: "medium",
    },
  },
  {
    id: 13,
    name: "Battery Capacity",
    description: "Increase the battery capacity of your vehicle.",
    prerequisite: 0,
    levels: [
      { cost: 5, effect: 30 },
      { cost: 15, effect: 60 },
      { cost: 40, effect: 90 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.battery.capacity = UPGRADES[13].levels[level].effect;
    },
    grid: {
      x: 0,
      y: 1,
      icon: "batteryCapacityIcon",
      size: "medium",
    },
  },
  {
    id: 14,

    name: "Movement Speed",
    description: "Increase the movement speed of your vehicle.",
    prerequisite: 13,
    levels: [
      { cost: 5, effect: 1.1 },
      { cost: 15, effect: 1.2 },
      { cost: 40, effect: 1.3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.movement.speed = UPGRADES[14].levels[level].effect;
    },
    grid: {
      x: -1,
      y: 1,
      icon: "movementSpeedIcon",
      size: "medium",
    },
  },
  {
    id: 15,
    name: "Battery Degradation",
    description: "Increase the energy efficiency of the vehicle.",
    prerequisite: 14,
    levels: [
      { cost: 5, effect: 1 },
      { cost: 15, effect: 2 },
      { cost: 40, effect: 3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.energy.regeneration =
        UPGRADES[15].levels[level].effect;
    },
    grid: {
      x: -2,
      y: 1,
      icon: "energyRegenerationIcon",
      size: "medium",
    },
  },
  {
    id: 16,
    name: "Magnet Pickup Range",
    description: "Increase the range at which you can pick up credits.",
    prerequisite: 13,
    levels: [
      { cost: 5, effect: 50 },
      { cost: 15, effect: 100 },
      { cost: 40, effect: 150 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.magnet.range = UPGRADES[16].levels[level].effect;
    },
    grid: {
      x: 0,
      y: 2,
      icon: "magnetRangeIcon",
      size: "medium",
    },
  },
  {
    id: 17,
    name: "Proximity Shield",
    description:
      "Improved shield reduces energy consumption when blocking a hit.",
    prerequisite: 13,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 30, effect: 2 },
      { cost: 80, effect: 3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.shield.proximity = UPGRADES[17].levels[level].effect;
    },
    grid: {
      x: -1,
      y: 2,
      icon: "proximityShieldIcon",
      size: "medium",
    },
  },
  {
    id: 18,
    name: "Filler Upgrade",
    description: "A filler upgrade for demonstration purposes.",
    prerequisite: 17,
    levels: [{ cost: 5, effect: 1 }],
    applyUpgrade: (level) => {
      gameState.upgrades.filler.upgrade = UPGRADES[18].levels[level].effect;
    },
    grid: {
      x: -1,
      y: 3,
      icon: "fillerIcon",
      size: "medium",
    },
  },
  {
    id: 19,
    name: "Filler Upgrade 2",
    description: "Another filler upgrade for demonstration purposes.",
    prerequisite: 17,
    levels: [{ cost: 5, effect: 1 }],
    applyUpgrade: (level) => {
      gameState.upgrades.filler.upgrade = UPGRADES[19].levels[level].effect;
    },
    grid: {
      x: -2,
      y: 2,
      icon: "fillerIcon",
      size: "medium",
    },
  },
  {
    id: 20,
    name: "Stomp",
    description:
      "Unlock the stomp ability, allowing you to crush nearby enemies.",
    prerequisite: 0,
    levels: [{ cost: 20, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.stomp.unlocked = UPGRADES[20].levels[level].effect;
    },
    grid: {
      x: -1,
      y: 0,
      icon: "stompIcon",
      size: "medium",
    },
  },
  {
    id: 21,
    name: "Stomp - Damage",
    description: "Increase the damage of the stomp ability.",
    prerequisite: 20,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.stomp.damage = UPGRADES[21].levels[level].effect;
    },
    grid: {
      x: -2,
      y: 0,
      icon: "stompdamage",
      size: "medium",
    },
  },
  {
    id: 22,
    name: "Stomp - Range",
    description: "Increase the range of the stomp ability.",
    prerequisite: 21,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.stomp.range = UPGRADES[22].levels[level].effect;
    },
    grid: {
      x: -3,
      y: 0,
      icon: "stompRangeIcon",
      size: "medium",
    },
  },
  {
    id: 23,
    name: "Stomp 4",
    description: "A filler upgrade for the stomp ability.",
    prerequisite: 22,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.stomp.damage = UPGRADES[23].levels[level].effect;
    },
    grid: {
      x: -4,
      y: 0,
      icon: "stompdamage",
      size: "medium",
    },
  },
  {
    id: 24,
    name: "Ability Cooldown",
    description: "Reduce the cooldown of all abilities.",
    prerequisite: 22,
    levels: [
      { cost: 30, effect: 0.9 },
      { cost: 80, effect: 0.8 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.ability.cooldown = UPGRADES[24].levels[level].effect;
    },
    grid: {
      x: -3,
      y: 1,
      icon: "abilityCooldownIcon",
      size: "medium",
    },
  },
  {
    id: 25,
    name: "Orbital Support",
    description: "Unlock orbital support, calling in a powerful strike from above.",
    prerequisite: 23,
    levels: [{ cost: 50, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.orbitalSupport.unlocked =
        UPGRADES[25].levels[level].effect;
    },
    grid: {
      x: -5,
      y: 0,
      icon: "orbitalSupportIcon",
      size: "medium",
    },
    
  },
  {

    id: 26,
    name: "Orbital Support Quantity",
    description: "Increase the number of orbital strikes you can call in.",
    prerequisite: 25,
    levels: [
      { cost: 30, effect: 1 },
      { cost: 80, effect: 2 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.orbitalSupport.quantity =
        UPGRADES[26].levels[level].effect;
    },
    grid: {
      x: -6,
      y: 0,
      icon: "orbitalSupportQuantityIcon",
      size: "medium",
    },

  },


  {
    id: 27,
    name: "Orbital Support Damage",
    description: "Increase the damage of orbital strikes.",
    prerequisite: 25,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],  
    applyUpgrade: (level) => {
      gameState.upgrades.orbitalSupport.damage =
        UPGRADES[27].levels[level].effect;
    },
    grid: {
      x: -5,
      y:-1,
      icon: "orbitalSupportdamage",
      size: "medium",
    },
  },
  {
    id: 28,
    name: "Power Resupply",
    description: "Unlock the power resupply ability, allowing you to instantly refill your battery.",
    prerequisite: 22,
    levels: [{ cost: 50, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.powerResupply.unlocked =
        UPGRADES[28].levels[level].effect;
    },
    grid: {
      x: -3,
      y: -1,
      icon: "powerResupplyIcon",
      size: "medium",
    },

  },
  {
    id: 29,
    name: "Power Resupply Efficiency",
    description: "Reduce the cooldown of the power resupply ability.",
    prerequisite: 28,
    levels: [
      { cost: 30, effect: 0.9 },
      { cost: 80, effect: 0.8 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.powerResupply.cooldown =
        UPGRADES[29].levels[level].effect;
    },
    grid: {
      x: -4,
      y: -1,
      icon: "powerResupplyEfficiencyIcon",
      size: "medium",
    },

  },
  {
    id: 30,
    name: "Power Resupply Quantity",
    description: "Increase the number of times you can use power resupply.",
    prerequisite: 28,
    levels: [
      { cost: 30, effect: 1 },
      { cost: 80, effect: 2 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.powerResupply.quantity =
        UPGRADES[30].levels[level].effect;
    },
    grid: {
      x: -3,
      y: -2,
      icon: "powerResupplyQuantityIcon",
      size: "medium",
    },


  },{
    id: 31,
    name: "Energy Burst",
    description: "Unlock the energy burst ability, allowing you to release a burst of energy that damages nearby enemies.",
    prerequisite: 23,
    levels: [{ cost: 50, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.energyBurst.unlocked =
        UPGRADES[31].levels[level].effect;
    },
    grid: {
      x: -4,
      y: 1,
      icon: "energyBurstIcon",
      size: "medium",
    },


  },
  {
    id: 32,
    name: "Energy Burst Damage",
    description: "Increase the damage of the energy burst ability.",
    prerequisite: 31,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.energyBurst.damage =
        UPGRADES[32].levels[level].effect;
    }
    ,
    grid: {
      x: -5,
      y: 1,
      icon: "energyBurstdamage",
      size: "medium",
    },
  },
  {
    id: 33,
    name: "Energy Burst AoE",
    description: "Increase the area of effect of the energy burst ability.",
    prerequisite: 31,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.energyBurst.aoe =
        UPGRADES[33].levels[level].effect;
    },
    grid: {
      x: -4,
      y: 2,
      icon: "energyBurstAoEIcon",
      size: "medium",
    },
  },
  { 
    id: 34,
    name: "Tier 1: Spawn Increase",
    description: "[Needed]",
    prerequisite: 0,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 25, effect: 2 },
      { cost: 50, effect: 3 },
      { cost: 100, effect: 4 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawnIncrease.quantity =
        UPGRADES[34].levels[level].effect;
    },
    grid: {
      x: 0,
      y: -1,
      icon: "spawnIncreaseIcon",
      size: "medium",
    },
  },
  {
    id: 35,
    name: "Currency Drop Rate",
    description: "Increase the rate at which enemies drop currency.",
    prerequisite: 34,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.currencyDropRate =
        UPGRADES[40].levels[level].effect;
    },
    grid: {
      x: -1,
      y: -1,
      icon: "currencyDropRateIcon",
      size: "medium",
    },
  },
  {
    id: 36,
    name: "Tier 1: Double Drop",
    description: "Increase the chance for enemies to drop double the resources.",
    prerequisite: 35,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[41].levels[level].effect;
    },
    grid: {
      x: -2,
      y: -1,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 37,
    name: "Tier 1: Promotion Rate",
    description: "[NEEDED]",
    prerequisite: 34,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: -1,
      y: -2,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  { 
    id: 38,
    name: "Tier 2: Spawn Increase",
    description: "[Needed]",
    prerequisite: 34,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 25, effect: 2 },
      { cost: 50, effect: 3 },
      { cost: 100, effect: 4 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawnIncrease.quantity =
        UPGRADES[34].levels[level].effect;
    },
    grid: {
      x: 0,
      y: -2,
      icon: "spawnIncreaseIcon",
      size: "medium",
    },
  },
  {
    id: 39,
    name: "Tier 2: Double Drop",
    description: "Increase the chance for enemies to drop double the resources.",
    prerequisite: 38,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[41].levels[level].effect;
    },
    grid: {
      x: 0,
      y: -3,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 40,
    name: "Tier 2: Promotion Rate",
    description: "[NEEDED]",
    prerequisite: 38,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: 1,
      y: -3,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 41,
    name: "Tier 2: Explosion",
    description: "[NEEDED]",
    prerequisite: 38,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: 1,
      y: -2,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  { 
    id: 42,
    name: "Tier 3: Spawn Increase",
    description: "[Needed]",
    prerequisite: 38,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 25, effect: 2 },
      { cost: 50, effect: 3 },
      { cost: 100, effect: 4 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawnIncrease.quantity =
        UPGRADES[34].levels[level].effect;
    },
    grid: {
      x: -1,
      y: -3,
      icon: "spawnIncreaseIcon",
      size: "medium",
    },
  },
  {
    id: 43,
    name: "Tier 3: Double Drop",
    description: "Increase the chance for enemies to drop double the resources.",
    prerequisite: 42,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[41].levels[level].effect;
    },
    grid: {
      x: 0,
      y: -4,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 44,
    name: "Tier 3: Promotion Rate",
    description: "[NEEDED]",
    prerequisite: 42,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: -1,
      y: -4,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 45,
    name: "Tier 3: Explosion",
    description: "[NEEDED]",
    prerequisite: 42,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: -2,
      y: -3,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  { 
    id: 46,
    name: "Tier 4: Spawn Increase",
    description: "[Needed]",
    prerequisite: 42,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 25, effect: 2 },
      { cost: 50, effect: 3 },
      { cost: 100, effect: 4 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawnIncrease.quantity =
        UPGRADES[34].levels[level].effect;
    },
    grid: {
      x: -2,
      y: -4,
      icon: "spawnIncreaseIcon",
      size: "medium",
    },
  },
  {
    id: 47,
    name: "Tier 4: Double Drop",
    description: "Increase the chance for enemies to drop double the resources.",
    prerequisite: 46,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[41].levels[level].effect;
    },
    grid: {
      x: -3,
      y: -3,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 48,
    name: "Tier 4: Promotion Rate",
    description: "[NEEDED]",
    prerequisite: 46,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: -3,
      y: -4,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  {
    id: 49,
    name: "Tier 4: Explosion",
    description: "[NEEDED]",
    prerequisite: 46,
    levels: [
      { cost: 30, effect: 1.2 },
      { cost: 80, effect: 1.5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.doubleDrop =
        UPGRADES[42].levels[level].effect;
    },
    grid: {
      x: -3,
      y: -5,
      icon: "doubleDropIcon",
      size: "medium",
    },
  },
  { 
    id: 50,
    name: "BOSS",
    description: "[Needed]",
    prerequisite: 46,
    levels: [
      { cost: 10, effect: 1 },
      { cost: 25, effect: 2 },
      { cost: 50, effect: 3 },
      { cost: 100, effect: 4 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawnIncrease.quantity =
        UPGRADES[34].levels[level].effect;
    },
    grid: {
      x: 0,
      y: -6,
      icon: "spawnIncreaseIcon",
      size: "large",
    },
  },
]

function applyUpgrades() {
  LEVELS.forEach((level, id) => {
    if (level > 0 && UPGRADES[id] && UPGRADES[id].applyUpgrade) {
      UPGRADES[id].applyUpgrade(level);
    }
  });
}

for (let i = 0; i < UPGRADES.length; i++) {
  LEVELS[i] = 0;
}
LEVELS[0] = 1;