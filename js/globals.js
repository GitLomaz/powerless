const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
let scene;

const gamestate = {
  credits: 0,
  upgrades: {
    unitSpawn: 0,
    turretDamage: 0,
    turretFireRate: 0,
    batteryCapacity: 0,
    batteryRecharge: 0,
    spawnBoss: false,
  },
}

