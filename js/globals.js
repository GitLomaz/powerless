const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
let scene;



const gameState = {
  credits: 1000000,
  upgrades: {
    // working
    turretFireRate: 1000,
    turretRange: 2000,
    turretBulletSpeed: 400,
    minigun: {
      enabled: true,
      damage: 1,
      fireRate: 500,
      range: 300,
    },
    spawns: {
      footman: 2,
      boss: 0
    },
    player: {
      magnet: 200,
      speed: 150,
      energy: 1500000,
      stomp: false // Can kill enemies without taking damage
    },

    // do nothing
    turretDamage: 0,
    batteryCapacity: 0,
    batteryRecharge: 0,
  },
}

