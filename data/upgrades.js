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
      icon: "deploy",
      size: "medium",
    },
  },
  {
    id: 1,
    name: "Main Cannon:\r\nProjectile Speed",
    description: "Start the battle and deploy your turret.",
    prerequisite: 0,
    levels: [
      { cost: 5, effect: 500 },
      { cost: 15, effect: 600 },
      { cost: 40, effect: 700 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.speed =
        UPGRADES[1].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.cannon.speed;
    },
    grid: {
      x: 1,
      y: 0,
      icon: "cannonSpeed",
      size: "medium",
    },
  },
  {
    id: 2,
    name: "Main Cannon:\r\nDamage",
    description: "Increase the damage of the main cannon.",
    prerequisite: 1,
    levels: [
      { cost: 5, effect: 35 },
      { cost: 15, effect: 50 },
      { cost: 40, effect: 75 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.damage =
        UPGRADES[2].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.cannon.damage;
    },
    grid: {
      x: 2,
      y: 0,
      icon: "cannonDamage",
      size: "medium",
    },
  },
  { // REMOVED!
    id: 3,
    name: "Main Cannon:\r\nRange",
    description: "Increase the range of the main cannon.",
    // prerequisite: 0,
    levels: [
      { cost: 5, effect: 100 },
      { cost: 15, effect: 150 },
      { cost: 40, effect: 200 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.range =
        UPGRADES[3].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.cannon.range;
    },
    grid: {
      x: 300,
      y: 0,
      icon: "rangeIcon",
      size: "medium",
    },
  },
  {
    id: 4,
    name: "Main Cannon:\r\nReload Time",
    description: "Decrease the reload time of the main cannon.",
    prerequisite: 2,
    levels: [
      { cost: 5, effect: 900},
      { cost: 15, effect: 800 },
      { cost: 40, effect: 650 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.fireRate =
        UPGRADES[4].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.cannon.fireRate;
    },
    grid: {
      x: 2,
      y: 1,
      icon: "cannonReload",
      size: "medium",
    },
  },
  {
    id: 5,
    name: "Minigun",
    description: "Unlock the minigun weapon.",
    prerequisite: 1,
    levels: [{ cost: 10, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.minigun.enabled =
        UPGRADES[5].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.minigun.enabled;
    },
    grid: {
      x: 1,
      y: 1,
      icon: "minigun",
      size: "medium",
    },
  },
  {
    id: 6,
    name: "Minigun:\r\nDamage",
    description: "Increase the damage of the minigun.",
    prerequisite: 5,
    levels: [
      { cost: 5, effect: 7 },
      { cost: 15, effect: 10 },
      { cost: 40, effect: 15 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.minigun.damage =
        UPGRADES[6].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.minigun.damage;
    },
    grid: {
      x: 1,
      y: 2,
      icon: "minigunDamage",
      size: "medium",
    },
  },
  {
    id: 7,
    name: "Minigun:\r\nReload Time",
    description: "Decrease the reload time of the minigun.",
    prerequisite: 6,
    levels: [
      { cost: 5, effect: 350 },
      { cost: 15, effect: 300 },
      { cost: 40, effect: 250 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.minigun.fireRate =
        UPGRADES[7].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.minigun.fireRate;
    },
    grid: {
      x: 1,
      y: 3,
      icon: "minigunReload",
      size: "medium",
    },
  },
  {
    id: 8,
    name: "Minigun:\r\nRange",
    description: "Increase the targeting range of the minigun.",
    prerequisite: 5,
    levels: [
      { cost: 5, effect: 400 },
      { cost: 15, effect: 550 },
      { cost: 40, effect: 700 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.minigun.range =
        UPGRADES[8].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.minigun.range;
    },
    grid: {
      x: 2,
      y: 2,
      icon: "minigunRange",
      size: "medium",
    },
  },
  {
    id: 9,
    name: "Rocket Launcher",
    description: "Unlock the rocket launcher weapon.",
    prerequisite: 1,
    levels: [{ cost: 20, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.enabled =
        UPGRADES[9].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.enabled;
    },
    grid: {
      x: 1,
      y: -1,
      icon: "rocket",
      size: "medium",
    },
  },
  {
    id: 10,
    name: "Rocket Launcher:\r\nDamage",
    description: "Increase the damage of rockets.",
    prerequisite: 9,
    levels: [
      { cost: 5, effect: 150 },
      { cost: 15, effect: 250 },
      { cost: 40, effect: 400 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.damage =
        UPGRADES[10].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.damage;
    },
    grid: {
      x: 2,
      y: -1,
      icon: "rocketdamage",
      size: "medium",
    },
  },
  {
    id: 11,
    name: "Rocket Launcher:\r\nFire Rate",
    description: "Increase the fire rate of rockets.",
    prerequisite: 10,
    levels: [
      { cost: 5, effect: 0.5 },
      { cost: 15, effect: 0.4 },
      { cost: 40, effect: 0.3 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.fireRate =
        UPGRADES[11].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.fireRate;
    },
    grid: {
      x: 3,
      y: -1,
      icon: "rocketFireRateIcon",
      size: "medium",
    },
  },
  {
    id: 12,
    name: "Rocket Launcher:\r\nSplash Damage",
    description: "Unlock splash damage for rockets.",
    prerequisite: 10,
    levels: [
      { cost: 10, effect: 5 },
      { cost: 30, effect: 10 },
      { cost: 80, effect: 15 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.splashDamage =
        UPGRADES[12].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.splashDamage;
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
      gameState.upgrades.battery.capacity = UPGRADES[13].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.battery.capacity;
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
      gameState.upgrades.movement.speed = UPGRADES[14].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.movement.speed;
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
        UPGRADES[15].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.energy.regeneration;
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
      gameState.upgrades.magnet.range = UPGRADES[16].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.magnet.range;
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
      gameState.upgrades.shield.proximity = UPGRADES[17].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.shield.proximity;
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
      gameState.upgrades.filler.upgrade = UPGRADES[18].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.filler.upgrade;
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
      gameState.upgrades.filler.upgrade = UPGRADES[19].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.filler.upgrade;
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
      gameState.upgrades.stomp.unlocked = UPGRADES[20].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.stomp.unlocked;
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
      gameState.upgrades.stomp.damage = UPGRADES[21].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.stomp.damage;
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
      gameState.upgrades.stomp.range = UPGRADES[22].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.stomp.range;
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
      gameState.upgrades.stomp.damage = UPGRADES[23].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.stomp.damage;
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
      gameState.upgrades.ability.cooldown = UPGRADES[24].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.ability.cooldown;
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
        UPGRADES[25].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.orbitalSupport.unlocked;
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
        UPGRADES[26].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.orbitalSupport.quantity;
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
        UPGRADES[27].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.orbitalSupport.damage;
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
        UPGRADES[28].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.powerResupply.unlocked;
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
        UPGRADES[29].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.powerResupply.cooldown;
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
        UPGRADES[30].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.powerResupply.quantity;
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
        UPGRADES[31].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.energyBurst.unlocked;
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
        UPGRADES[32].levels[level - 1].effect;
    }
    ,getCurrentValue: () => {
      return gameState.upgrades.energyBurst.damage;
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
        UPGRADES[33].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.energyBurst.aoe;
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
        UPGRADES[34].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawnIncrease.quantity;
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
        UPGRADES[40].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.currencyDropRate;
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
        UPGRADES[41].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.doubleDrop;
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
        UPGRADES[42].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.doubleDrop;
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
        UPGRADES[34].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawnIncrease.quantity;
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
        UPGRADES[41].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.doubleDrop;
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
        UPGRADES[42].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.doubleDrop;
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
        UPGRADES[42].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.doubleDrop;
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
        UPGRADES[34].levels[level - 1].effect;
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
        UPGRADES[41].levels[level - 1].effect;
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
        UPGRADES[42].levels[level - 1].effect;
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
        UPGRADES[42].levels[level - 1].effect;
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
        UPGRADES[34].levels[level - 1].effect;
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
        UPGRADES[41].levels[level - 1].effect;
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
        UPGRADES[42].levels[level - 1].effect;
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
        UPGRADES[42].levels[level - 1].effect;
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
        UPGRADES[34].levels[level - 1].effect;
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
  gameState = JSON.parse(JSON.stringify(gameStateTemplate));
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