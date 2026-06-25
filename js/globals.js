const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const DEBUG = false;
let scene;
let tooltip;
let muteAll = localStorage.getItem('muteAll') === 'true' || false;
let music = false;

const gameStateTemplate  = {
  credits: 0,
  upgrades: {
    weapons: {
      minigun: {
        enabled: false,
        damage: 5,
        fireRate: 400,
        range: 300,
      },
      rocket: {
        enabled: false,
        double: false,
        damage: 50,
        fireRate: 3500,
        splash: 50,
        speed: 200,
      },
      cannon: {
        damage: 30,
        fireRate: 1000,
        range: 2000,
        speed: 400,
        autoFire: false,
      }
    },
    spawns: {
      tier1: {
        units: 10,
        promotion: 0,
        doubleDrop: 0
      },
      tier2: {
        units: 0,
        promotion: 0,
        doubleDrop: 0,
        explosion: 0
      },
      tier3: {
        units: 0,
        promotion: 0,
        doubleDrop: 0,
        explosion: 0
      },
      tier4: {
        units: 0,
        promotion: 0,
        doubleDrop: 0,
        explosion: 0
      },
      boss: false
    },
    player: {
      magnet: 200,
      speed: 150,
      energy: 15000,
      cooldownReduction: 0,
      energyLoss: 1,
      dropRate: 1,
      energyLeech: {
        enabled: false,
        chance: .1,
        amount: 1000
      }
    },
    abilities: {
      stomp: 0,
      resupply: {
        packs: 1,
        value: 10000,
        cooldown: 30000,
        currentCooldown: 0,
        enabled: false
      },
      energyBurst: {
        range: 200,
        damage: 200,
        cooldown: 10000,
        currentCooldown: 0,
        enabled: false
      },
      orbitalStrike: {
        damage: 300,
        projectiles: 8,
        cooldown: 30000,
        currentCooldown: 0,
        enabled: false
      }
    },
  },
}

function formatNumber(num) {
    return num.toLocaleString();
}

let gameState = JSON.parse(JSON.stringify(gameStateTemplate));

// Save/Load Functions
function saveGame() {
  try {
    localStorage.setItem('powerlessSave', JSON.stringify(gameState));
    console.log('Game saved successfully');
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

function loadGame() {
  try {
    const savedData = localStorage.getItem('powerlessSave');
    if (savedData) {
      gameState = JSON.parse(savedData);
      console.log('Game loaded successfully');
      return true;
    }
  } catch (e) {
    console.error('Failed to load game:', e);
  }
  return false;
}

function deleteSave() {
  localStorage.removeItem('powerlessSave');
  console.log('Save deleted');
}