// ============================================================================
// FILE: /apps/PulseOS/Scanner/PulseBehaviorScanner-v12.3-EVO.js
// PULSE OS — v12.3‑EVO
// ENVIRONMENT BEHAVIOR ORGAN — PRESENCE-AWARE, DUAL-BAND, NODEADMIN‑EVO
// ============================================================================
// ROLE (12.3‑EVO):
//   - Decide HOW to scan based on environment (body/home/town/kitchen/crab/...).
//   - Multi-phase scanning: coarse → medium → deep → presence.
//   - Dual-band: pulse (environment) + binary (precision).
//   - Presence-aware: void/spike/shadow/echo detection.
//   - NodeAdmin‑EVO-aware: sentinel harmonics, phase drift, energy coupling.
//   - HeatMap‑EVO-aware: presence templates + environment templates.
//   - AdminInspector‑12.3-aware: presence flags, harmonic drift, wave collapse.
//   - Environment-first with presence override.
// ============================================================================

export function createPulseBehaviorScanner({
  pulse,
  waveScanner,
  loopScanner,
  nodeAdmin,
  heatMap,
  adminInspector,
  trace = false
} = {}) {

  if (!pulse || !waveScanner || !loopScanner || !nodeAdmin || !heatMap) {
    throw new Error("[PulseBehaviorScanner‑12.3] missing required organs");
  }

  // ---------------------------------------------------------------------------
  // ENVIRONMENT PROFILES (12.3‑EVO)
  // ---------------------------------------------------------------------------
  const profiles = {
    body:    { envType:"body",    loopScale:0.40, passes:10, pulse:"slow",   wave:"deep",  node:"scan",   presence:"sensitive" },
    home:    { envType:"home",    loopScale:0.60, passes:8,  pulse:"normal", wave:"deep",  node:"scan",   presence:"normal"    },
    town:    { envType:"town",    loopScale:1.00, passes:7,  pulse:"fast",   wave:"multi", node:"boost",  presence:"wide"      },
    kitchen: { envType:"kitchen", loopScale:0.50, passes:9,  pulse:"slow",   wave:"deep",  node:"scan",   presence:"normal"    },
    crab:    { envType:"crab",    loopScale:0.50, passes:11, pulse:"slow",   wave:"deep",  node:"scan",   presence:"sensitive" }
  };

  function getProfile(envType) {
    return profiles[envType] || profiles.body;
  }

  // ---------------------------------------------------------------------------
  // CORE: RUN A SCAN SESSION (12.3‑EVO)
  // ---------------------------------------------------------------------------
  function runScan({ envType, grid, presenceHistory, harmonics }) {
    const profile = getProfile(envType);

    const H = grid.length;
    const W = grid[0].length;

    // environment-first loop scaling
    const loopMax = Math.floor(Math.max(H, W) * profile.loopScale) || 1;

    // configure NodeAdmin‑EVO baseline
    nodeAdmin.setMode(profile.node);

    const loopHistory = [];
    const waveHistory = [];
    const spinSnapshots = [];
    const presenceSnapshots = [];

    let lastWave = { phase:0, amplitude:0 };
    let lastBits = [];

    // PHASED SCANNING (12.3‑EVO)
    for (let pass = 0; pass < profile.passes; pass++) {
      const phase = getPhase(pass, profile.passes);

      // pulse mode (dual-band)
      const pulseMode = selectPulseMode(profile.pulse, phase);
      const bits = nextPulse(pulse, pulseMode);
      lastBits = bits;

      // wave mode
      const waveMode = selectWaveMode(profile.wave, phase);
      const wave = nextWave(waveScanner, waveMode, bits);
      lastWave = wave;
      waveHistory.push({ phase:wave.phase, amplitude:wave.amplitude });

      // NodeAdmin‑EVO sentinel update
      const sentinels = nodeAdmin.updateSentinels(loopMax);
      const s = sentinels[pass % sentinels.length];

      // loop index
      const loopIndex = loopScanner.nextIndex(bits, loopMax, s.phase);
      loopHistory.push(loopIndex);

      // apply loop sweep
      applyLoopSweep(grid, loopIndex, envType, phase);

      // apply wave contrast
      applyWaveToGrid(grid, wave, phase);

      // presence injection (12.3‑EVO)
      applyPresenceToGrid(grid, presenceHistory, profile.presence, phase);

      // snapshot for multi-spin + presence analysis
      spinSnapshots.push(snapshotGrid(grid));
      presenceSnapshots.push(snapshotPresence(grid));
    }

    // build environment heatmap (12.3‑EVO)
    const heat = heatMap.buildEnvironmentHeatMap({
      grid,
      envType,
      presenceSnapshots
    });

    // summarize
    const summary = summarizeGrid(grid);

    // inspector flags (12.3‑EVO)
    let flags = [];
    if (adminInspector) {
      flags = adminInspector.inspectAll({
        body: envType==="body" ? grid : emptyLike(grid),
        home: envType==="home" ? grid : emptyLike(grid),
        town: envType==="town" ? grid : emptyLike(grid),
        node: envType==="node" ? grid : emptyLike(grid),
        bits:lastBits,
        spins:spinSnapshots,
        loopHistory,
        waveHistory,
        nodeEnergy: averageSentinelEnergy(nodeAdmin, loopMax),
        harmonics,
        presenceHistory
      });
    }

    // NodeAdmin‑EVO advice
    let advice = null;
    if (nodeAdmin.analyzeAndAdvise) {
      advice = nodeAdmin.analyzeAndAdvise({
        envType,
        summary,
        flags,
        presenceSnapshots,
        harmonics
      });
      if (advice?.suggestedMode) nodeAdmin.setMode(advice.suggestedMode);
    }

    if (trace) {
      console.log("[PulseBehaviorScanner‑12.3‑EVO] runScan", {
        envType,
        summary,
        flagsCount: flags.length,
        advice
      });
    }

    return {
      envType,
      grid,
      heat,
      lastWave,
      summary,
      loopHistory,
      waveHistory,
      flags,
      advice,
      presenceSnapshots
    };
  }

  // ---------------------------------------------------------------------------
  // PHASE LOGIC (12.3‑EVO)
  // ---------------------------------------------------------------------------
  function getPhase(pass, total) {
    const r = pass / Math.max(1, total - 1);
    if (r < 0.25) return "coarse";
    if (r < 0.50) return "medium";
    if (r < 0.75) return "deep";
    return "presence";
  }

  // ---------------------------------------------------------------------------
  // PRESENCE APPLICATION (12.3‑EVO)
  // ---------------------------------------------------------------------------
  function applyPresenceToGrid(grid, history, sensitivity, phase) {
    if (!history || !history.length) return;

    const last = history[history.length - 1];
    const factor = phase==="presence" ? 0.45 : 0.15;

    for (let y=0; y<grid.length; y++) {
      for (let x=0; x<grid[0].length; x++) {
        const cell = grid[y][x];
        const p = last[y]?.[x] ?? 0;
        cell.presence = clamp((cell.presence ?? 0)*(1-factor) + p*factor, 0, 1);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // HELPERS (unchanged + presence additions)
  // ---------------------------------------------------------------------------
  function snapshotPresence(grid) {
    return grid.map(row => row.map(c => c.presence ?? 0));
  }

  return { runScan };
}
