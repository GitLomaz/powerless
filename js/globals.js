const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
let scene;

const gameState = {
  credits: 0,
  upgrades: {
    // working
    turretFireRate: 1000,
    turretRange: 2000,
    spawns: {
      footman: 10,
      boss: 0
    },
    player: {
      magnet: 200,
      speed: 150,
      energy: 15000,
      stomp: false // Can kill enemies without taking damage
    },

    // do nothing
    turretDamage: 0,
    batteryCapacity: 0,
    batteryRecharge: 0,
  },
}

