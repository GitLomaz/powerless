// example: LEVELS[1] = 2; applyUpgrades();

function applyUpgrades() {
  LEVELS.forEach((level, id) => {
    if (level > 0 && UPGRADES[id] && UPGRADES[id].applyUpgrade) {
      UPGRADES[id].applyUpgrade(level);
    }
  })
}

const LEVELS = [0, 0]

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
    description: "Start the battle and deploy your turret.",
    prerequisite: 0,
    levels: [
      {cost: 5, effect: 500},
      {cost: 15, effect: 600},
      {cost: 40, effect: 700}
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.speed = UPGRADES[1].levels[level].effect
    },
    grid: {
      x: 1,
      y: 0,
      icon: "projectileSpeedIcon",
      size: "medium"
    }
  },
  ,
  { 
    id: 2,
    name: "Main Cannon - Damage",
    description: "Increase the damage of the main cannon.",
    prerequisite: 1,
    levels: [
      {cost: 5, effect: 2},
      {cost: 15, effect: 3},
      {cost: 40, effect: 4}
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.damage = UPGRADES[2].levels[level].effect
    },
    grid: {
      x: 2,
      y: 0,
      icon: "damageIcon",
      size: "medium"
    }
  },
    {
    id: 3,
    name: "Main Cannon - Range",
    description: "Increase the range of the main cannon.",
    prerequisite: 2,
    levels: [
      {cost: 5, effect: 100},
      {cost: 15, effect: 150},
      {cost: 40, effect: 200}
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.range = UPGRADES[3].levels[level].effect
    },
    grid: {
      x: 3,
      y: 0,
      icon: "rangeIcon",
      size: "medium"



    }
  },    {
    id: 4,
    name: "Main Cannon - Fire Rate",
    description: "Increase the fire rate of the main cannon.",
    prerequisite: 2,
    levels: [
      {cost: 5, effect: 1.0},
      {cost: 15, effect: 0.8},
      {cost: 40, effect: 0.6}
    ],
    applyUpgrade: (level) => {
      gameState.upgrades.weapons.cannon.fireRate = UPGRADES[4].levels[level].effect
    },
    grid: {
      x: 2,
      y: 1,
      icon: "fireRateIcon",
      size: "medium"
    }
  },
  {
id:5,
name: "Mini Gun Weapon",
description: "Unlock the mini gun weapon.",
prerequisite: 1,
levels: [
  {cost: 10, effect: true}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.miniGun.unlocked = UPGRADES[5].levels[level].effect
},
grid: {
  x: 1,
  y: 1,
  icon: "miniGunIcon",
  size: "medium"

  }
  },
  {
id:6,
name: "Mini Gun - Damage",
description: "Increase the damage of the mini gun.",
prerequisite: 5,
levels: [
  {cost: 5, effect: 1},
  {cost: 15, effect: 2},
  {cost: 40, effect: 3}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.miniGun.damage = UPGRADES[6].levels[level].effect
},
grid: {
  x: 1,
  y: 2,
  icon: "miniGunDamageIcon",
  size: "medium"

  }
},
{
id:7,
name: "Mini Gun - Fire Rate",
description: "Increase the fire rate of the mini gun.",
prerequisite: 6,
levels: [
  {cost: 5, effect: 0.5},
  {cost: 15, effect: 0.4},
  {cost: 40, effect: 0.3}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.miniGun.fireRate = UPGRADES[7].levels[level].effect
},
grid: {
  x: 1,
  y: 3,
  icon: "miniGunFireRateIcon",
  size: "medium"
  }
   
  

},
{
id:8,
name: "Mini Gun - Range",
description: "Increase the range of the mini gun.",
prerequisite: 5,
levels: [
  {cost: 5, effect: 50},
  {cost: 15, effect: 75},
  {cost: 40, effect: 100}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.miniGun.range = UPGRADES[8].levels[level].effect
},
grid: {
  x: 2,
  y: 2,
  icon: "miniGunRangeIcon",
  size: "medium"
  }

},

{
id:9,
name: "Missiles",
description: "Unlock the missile weapon.",
prerequisite: 1,
levels: [
  {cost: 20, effect: true}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.missiles.unlocked = UPGRADES[9].levels[level].effect
},
grid: {
  x: 1,
  y: -1,
  icon: "missileIcon",
  size: "medium"  
  }


},
{id:10,
name: "Missiles - Damage",
description: "Increase the damage of missiles.",
prerequisite: 9,
levels: [
  {cost: 5, effect: 5},
  {cost: 15, effect: 10},
  {cost: 40, effect: 15}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.missiles.damage = UPGRADES[10].levels[level].effect
},
grid: {
  x: 2,
  y: -1,
  icon: "missileDamageIcon",
  size: "medium"  
  }


},
{id:11,
name: "Missiles - Fire Rate",
description: "Increase the fire rate of missiles.",
prerequisite: 9,
levels: [
  {cost: 5, effect: 0.5},
  {cost: 15, effect: 0.4},
  {cost: 40, effect: 0.3}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.missiles.fireRate = UPGRADES[11].levels[level].effect
},
grid: {
  x: 3,
  y: -1,
  icon: "missileFireRateIcon",
  size: "medium"  
  }
},
//add missile splash damage at 2 -2 with a prequisite of 9
{
id:12,
name: "Missiles - Splash Damage",
description: "Unlock splash damage for missiles.",
prerequisite: 9,
levels: [
  {cost: 10, effect: 5},
  {cost: 30, effect: 10},
  {cost: 80, effect: 15}
],
applyUpgrade: (level) => {
  gameState.upgrades.weapons.missiles.splashDamage = UPGRADES[12].levels[level].effect
}
},
{
id:13,
name :"Battery Capacity",
description: "Increase the battery capacity of your vehicle.",
prerequisite: 0,
levels: [
  {cost: 5, effect: 30},
  {cost: 15, effect: 60},
  {cost: 40, effect: 90}
],
applyUpgrade: (level) => {
  gameState.upgrades.battery.capacity = UPGRADES[13].levels[level].effect
},
grid: {
  x: 0,
  y: 1,
  icon: "batteryCapacityIcon",
  size: "medium"  
  }


},
{id:14,

name: "Movement Speed",
description: "Increase the movement speed of your vehicle.",
prerequisite: 13,
levels: [
  {cost: 5, effect: 1.1},
  {cost: 15, effect: 1.2},
  {cost: 40, effect: 1.3}
],
applyUpgrade: (level) => {
  gameState.upgrades.movement.speed = UPGRADES[14].levels[level].effect
},
grid: {
  x: -1,
  y: 1,
  icon: "movementSpeedIcon",
  size: "medium"
}
},
{id:15,
name: "Battery Degradation",
description: "Increase the energy efficiency of the vehicle.",
prerequisite: 13,
levels: [
  {cost: 5, effect: 1},
  {cost: 15, effect: 2},
  {cost: 40, effect: 3}
],
applyUpgrade: (level) => {
  gameState.upgrades.energy.regeneration = UPGRADES[15].levels[level].effect
},
grid: {
  x: -2,
  y: 1,
  icon: "energyRegenerationIcon",
  size: "medium"
}
},
{id:16,
  name: "Magnet Pickup Range",
  description: "Increase the range at which you can pick up credits.",
  prerequisite: 13,
  levels: [
    {cost: 5, effect: 50},
    {cost: 15, effect: 100},
    {cost: 40, effect: 150}
  ],
  applyUpgrade: (level) => {
    gameState.upgrades.magnet.range = UPGRADES[16].levels[level].effect
  },
  grid: {
    x: 0,
    y: 2,
    icon: "magnetRangeIcon",
    size: "medium"
  }
},
{id:17,
  name: "Proximity Shield",
  description:"Improved shield reduces energy consumption when blocking a hit.",
  prerequisite: 13,
  levels: [
    {cost: 10, effect: 1},
    {cost: 30, effect: 2},
    {cost: 80, effect: 3}
  ],
  applyUpgrade: (level) => {
    gameState.upgrades.shield.proximity = UPGRADES[17].levels[level].effect
  },
  grid: {
    x: -1,
    y: 2,
    icon: "proximityShieldIcon",
    size: "medium"
  }
}
]