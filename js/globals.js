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

// Global Stats System
const globalStatsTemplate = {
  totalRuns: 0,
  totalKills: 0,
  totalTimeOnPlanet: 0, // milliseconds
  totalCreditsEarned: 0,
  bestSurvivalTime: 0,
  highestKills: 0
};

let globalStats = null;

function loadGlobalStats() {
  try {
    const savedStats = localStorage.getItem('powerlessGlobalStats');
    if (savedStats) {
      globalStats = JSON.parse(savedStats);
      console.log('Global stats loaded from localStorage');
    } else {
      globalStats = JSON.parse(JSON.stringify(globalStatsTemplate));
      // Try to fetch from server if no local data
      fetchStatsFromServer();
    }
  } catch (e) {
    console.error('Failed to load global stats:', e);
    globalStats = JSON.parse(JSON.stringify(globalStatsTemplate));
  }
  return globalStats;
}

function saveGlobalStats() {
  try {
    localStorage.setItem('powerlessGlobalStats', JSON.stringify(globalStats));
    console.log('Global stats saved');
    // Also submit to server
    submitStats();
  } catch (e) {
    console.error('Failed to save global stats:', e);
  }
}

function submitStats() {
  if (!globalStats) return;
  
  const statsData = {
    totalRuns: Math.floor(globalStats.totalRuns),
    totalKills: Math.floor(globalStats.totalKills),
    totalTimeOnPlanet: Math.floor(globalStats.totalTimeOnPlanet),
    totalCreditsEarned: Math.floor(globalStats.totalCreditsEarned),
    bestSurvivalTime: Math.floor(globalStats.bestSurvivalTime),
    highestKills: Math.floor(globalStats.highestKills)
  };

  // Submit to API endpoint
  fetch('https://scores.lomazgames.com/statistic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      game: 'powerless',
      data: JSON.stringify(statsData)
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Stats submitted successfully:', data);
  })
  .catch(error => {
    console.log('Stats submission failed (offline or error):', error);
    // Fail silently - stats are still saved locally
  });
}

function fetchStatsFromServer() {
  fetch('https://scores.lomazgames.com/statistic?game=powerless')
    .then(response => response.json())
    .then(data => {
      if (data.success && data.record && data.record.data) {
        const serverStats = data.record.data.data || {};
        console.log('Loaded stats from server:', serverStats);
        
        // Update local stats with server data
        globalStats.totalRuns = Number(serverStats.totalRuns) || 0;
        globalStats.totalKills = Number(serverStats.totalKills) || 0;
        globalStats.totalTimeOnPlanet = Number(serverStats.totalTimeOnPlanet) || 0;
        globalStats.totalCreditsEarned = Number(serverStats.totalCreditsEarned) || 0;
        globalStats.bestSurvivalTime = Number(serverStats.bestSurvivalTime) || 0;
        globalStats.highestKills = Number(serverStats.highestKills) || 0;
        
        // Save to localStorage
        localStorage.setItem('powerlessGlobalStats', JSON.stringify(globalStats));
      }
    })
    .catch(error => {
      console.log('No existing stats found on server (or error fetching):', error);
      // Continue with local stats
    });
}

function updateGlobalStats(runStats) {
  if (!globalStats) loadGlobalStats();
  
  globalStats.totalRuns++;
  globalStats.totalKills += runStats.kills;
  globalStats.totalTimeOnPlanet += runStats.time;
  globalStats.totalCreditsEarned += runStats.credits;
  
  if (runStats.time > globalStats.bestSurvivalTime) {
    globalStats.bestSurvivalTime = runStats.time;
  }
  
  if (runStats.kills > globalStats.highestKills) {
    globalStats.highestKills = runStats.kills;
  }
  
  saveGlobalStats();
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// Initialize stats on load
loadGlobalStats();