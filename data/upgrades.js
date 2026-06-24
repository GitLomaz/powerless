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
      { cost: 80, effect: 800 },
      { cost: 150, effect: 900 },
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
      { cost: 30, effect: 35 },
      { cost: 80, effect: 50 },
      { cost: 200, effect: 75 },
      { cost: 400, effect: 100 },
      { cost: 700, effect: 130 },
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
  { // REMOVED
    id: 3,
    name: "Rocket Launcher:\r\nDouble Rockets",
    description: "Fires two rockets at once instead of one.",
    // prerequisite: 11,
    levels: [
      { cost: 5, effect: true },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.double =
        UPGRADES[3].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.double;
    },
    grid: {
      x: 3000,
      y: -2,
      icon: "rocketDouble",
      size: "medium",
    },
  },
  {
    id: 4,
    name: "Main Cannon:\r\nReload Time",
    description: "Decrease the reload time of the main cannon.",
    seconds: true,
    prerequisite: 2,
    levels: [
      { cost: 100, effect: 900},
      { cost: 250, effect: 800 },
      { cost: 500, effect: 650 },
      { cost: 900, effect: 550 },
      { cost: 1500, effect: 450 },
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
    levels: [{ cost: 25, effect: true }],
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
      { cost: 30, effect: 7 },
      { cost: 80, effect: 10 },
      { cost: 200, effect: 15 },
      { cost: 400, effect: 20 },
      { cost: 700, effect: 28 },
      { cost: 1200, effect: 35 },
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
    seconds: true,
    prerequisite: 6,
    levels: [
      { cost: 100, effect: 350 },
      { cost: 250, effect: 300 },
      { cost: 500, effect: 250 },
      { cost: 900, effect: 200 },
      { cost: 1500, effect: 150 },
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
      { cost: 30, effect: 400 },
      { cost: 80, effect: 550 },
      { cost: 200, effect: 700 },
      { cost: 400, effect: 850 },
      { cost: 700, effect: 1000 },
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
    levels: [{ cost: 50, effect: true }],
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
      { cost: 40, effect: 100 },
      { cost: 100, effect: 150 },
      { cost: 250, effect: 200 },
      { cost: 500, effect: 400 },
      { cost: 900, effect: 650 },
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
      icon: "rocketDamage",
      size: "medium",
    },
  },
  {
    id: 11,
    name: "Rocket Launcher:\r\nReload Time",
    description: "Decrease the reload time of rockets.",
    seconds: true,
    prerequisite: 10,
    levels: [
      { cost: 120, effect: 3000 },
      { cost: 300, effect: 2500 },
      { cost: 600, effect: 2000 },
      { cost: 1100, effect: 1600 },
      { cost: 1800, effect: 1200 },
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
      icon: "rocketReload",
      size: "medium",
    },
  },
  {
    id: 12,
    name: "Rocket Launcher:\r\nSplash Range",
    description: "Increases splash AOE for rockets.",
    prerequisite: 10,
    levels: [
      { cost: 120, effect: 50 },
      { cost: 300, effect: 75 },
      { cost: 600, effect: 150 },
      { cost: 1100, effect: 200 },
      { cost: 1800, effect: 250 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.splash =
        UPGRADES[12].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.splash;
    },
    grid: {
      x: 2,
      y: -2,
      icon: "rocketSplash",
      size: "medium",
    },
  },
  {
    id: 13,
    name: "Battery Capacity",
    description: "Increase the battery capacity of your vehicle.",
    prerequisite: 0,
    levels: [
      { cost: 10, effect: 25000 },
      { cost: 30, effect: 50000 },
      { cost: 80, effect: 90000 },
      { cost: 180, effect: 140000 },
      { cost: 350, effect: 200000 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.energy = UPGRADES[13].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.energy;
    },
    grid: {
      x: 0,
      y: 1,
      icon: "batteryCapacity",
      size: "medium",
    },
  },
  {
    id: 14,
    name: "Movement Speed",
    description: "Increase the movement speed of your vehicle.",
    prerequisite: 13,
    levels: [
      { cost: 30, effect: 175 },
      { cost: 80, effect: 225 },
      { cost: 200, effect: 300 },
      { cost: 400, effect: 400 },
      { cost: 700, effect: 525 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.speed = UPGRADES[14].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.speed;
    },
    grid: {
      x: -1,
      y: 1,
      icon: "movementSpeed",
      size: "medium",
    },
  },
  {
    id: 15,
    name: "Battery Degradation",
    description: "Decrease the energy loss of the vehicle.",
    prerequisite: 14,
    percent: true,
    levels: [
      { cost: 100, effect: .95 },
      { cost: 250, effect: .9 },
      { cost: 500, effect: .85 },
      { cost: 900, effect: .8 },
      { cost: 1500, effect: .75 },
      { cost: 2500, effect: .7 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.energyLoss =
        UPGRADES[15].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.energyLoss;
    },
    grid: {
      x: -2,
      y: 1,
      icon: "energyLoss",
      size: "medium",
    },
  },
  {
    id: 16,
    name: "Magnet Pickup Range",
    description: "Increase the range at which you can pick up credits.",
    prerequisite: 13,
    levels: [
      { cost: 30, effect: 300 },
      { cost: 80, effect: 400 },
      { cost: 200, effect: 500 },
      { cost: 400, effect: 600 },
      { cost: 700, effect: 750 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.magnet = UPGRADES[16].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.magnet;
    },
    grid: {
      x: 0,
      y: 2,
      icon: "magnetRange",
      size: "medium",
    },
  },
  {
    id: 17,
    name: "Energy Leech",
    description:
      "10% chance to gain some energy back when destroying an enemy",
    prerequisite: 13,
    levels: [
      { cost: 40, effect: 1 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.energyLeech.enabled = true
    },
    getCurrentValue: () => {
    },
    grid: {
      x: -1,
      y: 2,
      icon: "energyLeech",
      size: "medium",
    },
  },
  {
    id: 18,
    name: "Leech Chance",
    description: "Increases the chance Energy Leech will trigger",
    percent: true,
    prerequisite: 17,
    levels: [
      { cost: 100, effect: .2 },
      { cost: 250, effect: .3 },
      { cost: 500, effect: .4 },
      { cost: 900, effect: .5 },
      { cost: 1500, effect: .6 },
      { cost: 2500, effect: .7 },
      { cost: 4000, effect: .8 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.energyLeech.chance = UPGRADES[18].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.energyLeech.chance;
    },
    grid: {
      x: -1,
      y: 3,
      icon: "leechChance",
      size: "medium",
    },
  },
  {
    id: 19,
    name: "Leech Power",
    description: "Increases the amount of energy leeched",
    prerequisite: 17,
    levels: [
      { cost: 100, effect: 1200 },
      { cost: 250, effect: 1400 },
      { cost: 500, effect: 1600 },
      { cost: 900, effect: 1800 },
      { cost: 1500, effect: 2000 },
      { cost: 2500, effect: 2500 },
      { cost: 4000, effect: 3000 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.energyLeech.amount = UPGRADES[19].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.energyLeech.amount;
    },
    grid: {
      x: -2,
      y: 2,
      icon: "leechPower",
      size: "medium",
    },
  },
  {
    id: 20,
    name: "Stomp",
    description:
      "Unlock the stomp ability, allowing you to crush Tier I enemies while taking greatly reduced damage.",
    prerequisite: 0,
    levels: [{ cost: 100, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.stomp = 1;
    },
    getCurrentValue: () => {
    },
    grid: {
      x: -1,
      y: 0,
      icon: "stompI",
      size: "medium",
    },
  },
  {
    id: 21,
    name: "Stomp II",
    description: "Allows Stomp to crush Tier II enemies while taking greatly reduced damage.",
    prerequisite: 20,
    levels: [
      { cost: 400, effect: 1.2 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.stomp = 2;
    },
    getCurrentValue: () => {
    },
    grid: {
      x: -2,
      y: 0,
      icon: "stompII",
      size: "medium",
    },
  },
  {
    id: 22,
    name: "Stomp III",
    description: "Allows Stomp to crush Tier III enemies while taking greatly reduced damage.",
    prerequisite: 21,
    levels: [
      { cost: 1200, effect: 1.2 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.stomp = 3;
    },
    getCurrentValue: () => {
    },
    grid: {
      x: -3,
      y: 0,
      icon: "stompIII",
      size: "medium",
    },
  },
  {
    id: 23,
    name: "Stomp IV",
    description: "Allows Stomp to crush Tier IV enemies while taking greatly reduced damage.",
    prerequisite: 22,
    levels: [
      { cost: 2000, effect: 1.2 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.stomp = 4;
    },
    getCurrentValue: () => {
    },
    grid: {
      x: -4,
      y: 0,
      icon: "stompIV",
      size: "medium",
    },
  },
  {
    id: 24,
    name: "Ability Cooldown",
    description: "Reduce the cooldown of all abilities.",
    seconds: true,
    prerequisite: 22,
    levels: [
      { cost: 600, effect: -1000 },
      { cost: 1300, effect: -2000 },
      { cost: 2200, effect: -3000 },
      { cost: 3500, effect: -4000 },
      { cost: 5000, effect: -5000 },
      { cost: 7000, effect: -6000 },
      { cost: 10000, effect: -7000 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.cooldownReduction = UPGRADES[24].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.cooldownReduction;
    },
    grid: {
      x: -3,
      y: 1,
      icon: "abilityCooldown",
      size: "medium",
    },
  },
  {
    id: 25,
    name: "Orbital Strike",
    description: "Unlock orbital strike, calling in a powerful strike from above.",
    prerequisite: 23,
    levels: [{ cost: 3000, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.orbitalStrike.enabled = true
    },
    grid: {
      x: -5,
      y: 0,
      icon: "orbitalStrike",
      size: "medium",
    },
    
  },
  {
    id: 26,
    name: "Orbital Strike Quantity",
    description: "Increase the number of orbital strikes per call.",
    prerequisite: 25,
    levels: [
      { cost: 10000, effect: 10 },
      { cost: 18000, effect: 12 },
      { cost: 28000, effect: 14 },
      { cost: 40000, effect: 16 },
      { cost: 55000, effect: 18 },
      { cost: 75000, effect: 20 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.orbitalStrike.projectiles = UPGRADES[26].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.abilities.orbitalStrike.projectiles;
    },
    grid: {
      x: -6,
      y: 0,
      icon: "orbitalStrikeQuantity",
      size: "medium",
    },

  },
  {
    id: 27,
    name: "Orbital Strike Damage",
    description: "Increase the damage of orbital strikes.",
    prerequisite: 25,
    levels: [
      { cost: 10000, effect: 400 },
      { cost: 18000, effect: 500 },
      { cost: 28000, effect: 600 },
      { cost: 40000, effect: 700 },
      { cost: 55000, effect: 800 },
      { cost: 75000, effect: 900 },
      { cost: 100000, effect: 1000 },
    ],  
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.orbitalStrike.damage =
        UPGRADES[27].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.abilities.orbitalStrike.damage;
    },
    grid: {
      x: -5,
      y:-1,
      icon: "orbitalStrikeDamage",
      size: "medium",
    },
  },
  {
    id: 28,
    name: "Power Resupply",
    description: "Unlock the power resupply ability, allowing request an energy resupply package from orbit.",
    prerequisite: 22,
    levels: [{ cost: 3000, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.resupply.enabled = true
    },
    grid: {
      x: -3,
      y: -1,
      icon: "resupply",
      size: "medium",
    },

  },
  {
    id: 29,
    name: "Power Resupply Efficiency",
    description: "Reduce the cooldown of the power resupply ability.",
    seconds: true,
    prerequisite: 28,
    levels: [
      { cost: 10000, effect: 28000 },
      { cost: 18000, effect: 26000 },
      { cost: 28000, effect: 24000 },
      { cost: 40000, effect: 22000 },
      { cost: 55000, effect: 20000 },
      { cost: 75000, effect: 18000 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.resupply.cooldown =
        UPGRADES[29].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.abilities.resupply.cooldown;
    },
    grid: {
      x: -4,
      y: -1,
      icon: "resupplyCooldown",
      size: "medium",
    },

  },
  {
    id: 30,
    name: "Power Resupply Additional Packs",
    description: "Increase the number of packs received.",
    prerequisite: 28,
    levels: [
      { cost: 10000, effect: 2 },
      { cost: 18000, effect: 3 },
      { cost: 28000, effect: 4 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.resupply.packs =
        UPGRADES[30].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.abilities.resupply.packs;
    },
    grid: {
      x: -3,
      y: -2,
      icon: "resupplyPacks",
      size: "medium",
    },


  },
  {
    id: 31,
    name: "Energy Burst",
    description: "Unlock the energy burst ability, allowing you to release a burst of energy that damages nearby enemies.",
    prerequisite: 23,
    levels: [{ cost: 3000, effect: true }],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.energyBurst.enabled = true
    },
    grid: {
      x: -4,
      y: 1,
      icon: "energyBurst",
      size: "medium",
    },
  },
  {
    id: 32,
    name: "Energy Burst Damage",
    description: "Increase the damage of the energy burst ability.",
    prerequisite: 31,
    levels: [
      { cost: 10000, effect: 300 },
      { cost: 18000, effect: 500 },
      { cost: 28000, effect: 750 },
      { cost: 40000, effect: 1000 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.energyBurst.damage =
        UPGRADES[32].levels[level - 1].effect;
    }
    ,getCurrentValue: () => {
      return gameState.upgrades.abilities.energyBurst.damage;
    }
    ,
    grid: {
      x: -5,
      y: 1,
      icon: "energyBurstDamage",
      size: "medium",
    },
  },
  {
    id: 33,
    name: "Energy Burst Range",
    description: "Increase the area of effect of the energy burst ability.",
    prerequisite: 31,
    levels: [
      { cost: 10000, effect: 250 },
      { cost: 18000, effect: 400 },
      { cost: 28000, effect: 600 },
      { cost: 40000, effect: 850 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.abilities.energyBurst.range =
        UPGRADES[33].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.abilities.energyBurst.range;
    },
    grid: {
      x: -4,
      y: 2,
      icon: "energyBurstRange",
      size: "medium",
    },
  },
  { 
    id: 34,
    name: "Tier I: Spawn Increase",
    description: "Increase the number of Tier I enemies.",
    prerequisite: 0,
    levels: [
      { cost: 20, effect: 25 },
      { cost: 60, effect: 30 },
      { cost: 150, effect: 40 },
      { cost: 300, effect: 50 },
      { cost: 600, effect: 60 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier1.units =
        UPGRADES[34].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier1.units;
    },
    grid: {
      x: 0,
      y: -1,
      icon: "tierISpawn",
      size: "medium",
    },
  },
  {
    id: 35,
    name: "Credits Drop Increase",
    description: "Increase the rate at which enemies drop credits.",
    percent: true,
    prerequisite: 34,
    levels: [
      { cost: 50, effect: 1.2 },
      { cost: 150, effect: 1.5 },
      { cost: 350, effect: 2 },
      { cost: 700, effect: 3 },
      { cost: 1200, effect: 4 },
      { cost: 2000, effect: 5 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.player.dropRate =
        UPGRADES[35].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.player.dropRate;
    },
    grid: {
      x: -1,
      y: -1,
      icon: "creditsDrop",
      size: "medium",
    },
  },
  {
    id: 36,
    name: "Tier I: Double Drop",
    description: "Increase the chance for Tier I enemies to drop double credits.",
    percent: true,
    prerequisite: 35,
    levels: [
      { cost: 150, effect: .1 },
      { cost: 350, effect: .2 },
      { cost: 700, effect: .35 },
      { cost: 1200, effect: .5 },
      { cost: 2000, effect: .65 },
      { cost: 3000, effect: .8 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier1.doubleDrop =
        UPGRADES[36].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier1.doubleDrop;
    },
    grid: {
      x: -2,
      y: -1,
      icon: "tierIDouble",
      size: "medium",
    },
  },
  {
    id: 37,
    name: "Tier I: Promotion Rate",
    description: "Increase the chance for Tier I enemies to be promoted.",
    percent: true,
    prerequisite: 34,
    levels: [
      { cost: 50, effect: .05 },
      { cost: 150, effect: .15 },
      { cost: 350, effect: .25 },
      { cost: 700, effect: .35 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier1.promotion =
        UPGRADES[37].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier1.promotion;
    },
    grid: {
      x: -1,
      y: -2,
      icon: "tierIPromotion",
      size: "medium",
    },
  },
  { 
    id: 38,
    name: "Tier II: Spawn Increase",
    description: "Increase the number of Tier II enemies.",
    prerequisite: 34,
    levels: [
      { cost: 80, effect: 5 },
      { cost: 200, effect: 10 },
      { cost: 400, effect: 20 },
      { cost: 700, effect: 40 },
      { cost: 1200, effect: 50 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier2.units =
        UPGRADES[38].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier2.units;
    },
    grid: {
      x: 0,
      y: -2,
      icon: "tierIISpawn",
      size: "medium",
    },
  },
  {
    id: 39,
    name: "Tier II: Double Drop",
    description: "Increase the chance for Tier II enemies to drop double credits.",
    percent: true,
    prerequisite: 38,
    levels: [
      { cost: 200, effect: .1 },
      { cost: 450, effect: .2 },
      { cost: 850, effect: .35 },
      { cost: 1500, effect: .5 },
      { cost: 2500, effect: .65 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier2.doubleDrop =
        UPGRADES[39].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier2.doubleDrop;
    },
    grid: {
      x: 0,
      y: -3,
      icon: "tierIIDouble",
      size: "medium",
    },
  },
  {
    id: 40,
    name: "Tier II: Promotion Rate",
    description: "Increase the chance for Tier II enemies to be promoted.",
    percent: true,
    prerequisite: 38,
    levels: [
      { cost: 200, effect: .05 },
      { cost: 450, effect: .15 },
      { cost: 850, effect: .25 },
      { cost: 1500, effect: .35 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier2.promotion =
        UPGRADES[40].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier2.promotion;
    },
    grid: {
      x: 1,
      y: -3,
      icon: "tierIIPromotion",
      size: "medium",
    },
  },
  {
    id: 41,
    name: "Tier II: Explosion",
    description: "When destroyed, Tier II enemies explode, damaging nearby enemies in radius.",
    prerequisite: 38,
    levels: [
      { cost: 200, effect: 50 },
      { cost: 450, effect: 75 },
      { cost: 850, effect: 100 },
      { cost: 1500, effect: 125 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier2.explosion =
        UPGRADES[41].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier2.explosion;
    },
    grid: {
      x: 1,
      y: -2,
      icon: "tierIIExplosion",
      size: "medium",
    },
  },
  { 
    id: 42,
    name: "Tier III: Spawn Increase",
    description: "Increase the number of Tier III enemies.",
    prerequisite: 38,
    levels: [
      { cost: 250, effect: 5 },
      { cost: 600, effect: 10 },
      { cost: 1200, effect: 20 },
      { cost: 2200, effect: 30 },
      { cost: 3500, effect: 40 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier3.units =
        UPGRADES[42].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier3.units
    },
    grid: {
      x: -1,
      y: -3,
      icon: "tierIIISpawn",
      size: "medium",
    },
  },
  {
    id: 43,
    name: "Tier III: Double Drop",
    description: "Increase the chance for Tier III enemies to drop double credits.",
    percent: true,
    prerequisite: 42,
    levels: [
      { cost: 800, effect: .1 },
      { cost: 1700, effect: .2 },
      { cost: 3000, effect: .35 },
      { cost: 5000, effect: .5 },
      { cost: 7500, effect: .65 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier3.doubleDrop =
        UPGRADES[43].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier3.doubleDrop;
    },
    grid: {
      x: 0,
      y: -4,
      icon: "tierIIIDouble",
      size: "medium",
    },
  },
  {
    id: 44,
    name: "Tier III: Promotion Rate",
    description: "Increase the chance for Tier III enemies to be promoted.",
    percent: true,
    prerequisite: 42,
    levels: [
      { cost: 800, effect: .05 },
      { cost: 1700, effect: .15 },
      { cost: 3000, effect: .25 },
      { cost: 5000, effect: .35 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier3.promotion =
        UPGRADES[44].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier3.promotion;
    },
    grid: {
      x: -1,
      y: -4,
      icon: "tierIIIPromotion",
      size: "medium",
    },
  },
  {
    id: 45,
    name: "Tier III: Explosion",
    description: "When destroyed, Tier III enemies explode, damaging nearby enemies in radius.",
    prerequisite: 42,
    levels: [
      { cost: 800, effect: 50 },
      { cost: 1700, effect: 75 },
      { cost: 3000, effect: 100 },
      { cost: 5000, effect: 125 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier3.explosion =
        UPGRADES[45].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier3.explosion;
    },
    grid: {
      x: -2,
      y: -3,
      icon: "tierIIIExplosion",
      size: "medium",
    },
  },
  { 
    id: 46,
    name: "Tier IV: Spawn Increase",
    description: "Increase the number of Tier IV enemies.",
    prerequisite: 42,
    levels: [
      { cost: 600, effect: 3 },
      { cost: 1300, effect: 8 },
      { cost: 2500, effect: 15 },
      { cost: 4500, effect: 25 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier4.units =
        UPGRADES[46].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier4.units
    },
    grid: {
      x: -2,
      y: -4,
      icon: "tierIVSpawn",
      size: "medium",
    },
  },
  {
    id: 47,
    name: "Tier IV: Double Drop",
    description: "Increase the chance for Tier IV enemies to drop double credits.",
    percent: true,
    prerequisite: 46,
    levels: [
      { cost: 3000, effect: .1 },
      { cost: 6000, effect: .2 },
      { cost: 10000, effect: .35 },
      { cost: 16000, effect: .5 },
      { cost: 25000, effect: .65 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier4.doubleDrop =
        UPGRADES[47].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier4.doubleDrop;
    },
    grid: {
      x: -3,
      y: -3,
      icon: "tierIVDouble",
      size: "medium",
    },
  },
  {
    id: 48,
    name: "Tier IV: Promotion Rate",
    description: "Increase the chance for Tier IV enemies to be promoted.",
    percent: true,
    prerequisite: 46,
    levels: [
      { cost: 3000, effect: .05 },
      { cost: 6000, effect: .15 },
      { cost: 10000, effect: .25 },
      { cost: 16000, effect: .35 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier4.promotion =
        UPGRADES[48].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier4.promotion;
    },
    grid: {
      x: -3,
      y: -4,
      icon: "tierIVPromotion",
      size: "medium",
    },
  },
  {
    id: 49,
    name: "Tier IV: Explosion",
    description: "When destroyed, Tier IV enemies explode, damaging nearby enemies in radius.",
    prerequisite: 46,
    levels: [
      { cost: 3000, effect: 50 },
      { cost: 6000, effect: 75 },
      { cost: 10000, effect: 100 },
      { cost: 16000, effect: 125 },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.tier4.explosion =
        UPGRADES[49].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.spawns.tier4.explosion;
    },
    grid: {
      x: -3,
      y: -5,
      icon: "tierIVExplosion",
      size: "medium",
    },
  },
  { 
    id: 50,
    name: "BOSS",
    description: "The final big baddie, do you have what it takes to take him down?!",
    prerequisite: 46,
    levels: [
      { cost: 100000, effect: 1 }
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.spawns.boss = true
    },
    grid: {
      x: 0,
      y: -6,
      icon: "bossSpawn",
      size: "large",
    },
  },  
  {
    id: 51,
    name: "Rocket Launcher:\r\nDouble Rockets",
    description: "Fires two rockets at once instead of one.",
    prerequisite: 11,
    levels: [
      { cost: 2500, effect: true },
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.rocket.double =
        UPGRADES[51].levels[level - 1].effect;
    },
    getCurrentValue: () => {
      return gameState.upgrades.weapons.rocket.double;
    },
    grid: {
      x: 3,
      y: -2,
      icon: "rocketDouble",
      size: "medium",
    },
  },
]

function applyUpgrades() {
  const savedCredits = gameState.credits;
  gameState = JSON.parse(JSON.stringify(gameStateTemplate));
  gameState.credits = savedCredits;
  LEVELS.forEach((level, id) => {
    if (level > 0 && UPGRADES[id] && UPGRADES[id].applyUpgrade) {
      UPGRADES[id].applyUpgrade(level);
    }
  });
}

function maxAllUpgrades() {
  for (let i = 0; i < UPGRADES.length; i++) {
    const upgrade = UPGRADES[i];
    if (upgrade && upgrade.levels) {
      LEVELS[i] = upgrade.levels.length;
    }
  }
}

for (let i = 0; i < UPGRADES.length; i++) {
  LEVELS[i] = 0;
}
LEVELS[0] = 1;
// maxAllUpgrades()