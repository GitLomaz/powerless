const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
let scene;
let tooltip;



const gameState = {
  credits: 1000000,
  upgrades: {
    weapons: {
      minigun: {
        enabled: false,
        damage: 1,
        fireRate: 500,
        range: 300,
      },
      rocket: {
        enabled: false,
        double: false,
        damage: 1,
        fireRate: 3500,
        splash: 200,
        speed: 200,
      },
      cannon: {
        damage: 1,
        fireRate: 1000,
        range: 2000,
        speed: 400,
      }
    },
    spawns: {
      tier1: {
        units: 0,
        promotion: 0,
        doubleDrop: 0
      },
      tier2: {
        units: 5,
        promotion: 0,
        doubleDrop: 0
      },
      tier3: {
        units: 5,
        promotion: 0,
        doubleDrop: 0
      },
      tier4: {
        units: 10,
        promotion: 0,
        doubleDrop: 0
      },
    },
    player: {
      magnet: 200,
      speed: 150,
      energy: 15000,
      energyLoss: 1,
      proximityShield: {
        health: 0,
        regen: 0
      }
    },
    abilities: {
      stomp: 0,
      resupply: {
        packs: 0,
        value: 10000,
        cooldown: 15000
      },
      energyBurst: {
        range: 0,
        damage: 0,
        cooldown: 15000
      },
      orbitalStrike: {
        damage: 0,
        projeciles: 0,
        cooldown: 15000
      }
    },
  },
}