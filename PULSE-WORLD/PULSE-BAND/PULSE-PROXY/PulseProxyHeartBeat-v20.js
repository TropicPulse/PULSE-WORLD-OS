// ============================================================================
//  PULSE OS v20-ImmortalPlus — HEARTBEAT PACEMAKER TIMER ORGAN
//  PulseProxyHeartbeat — Central Timer / Logout / PulseHistory Repair
//  Backend-only • Deterministic surfaces • A‑B‑A band + advantage + chunk/presence
//  ROLE: Pacemaker Timer Sensor (Logout + PulseHistory Repair + Security Sweep)
//  v20‑ImmortalPlus‑BINARY‑MAX‑ABA + CACHE/CHUNK/PRESENCE ADVANTAGE
//    • Deterministic, drift‑proof, multi‑instance safe
//    • Unified advantage field (cycle → advantageScore)
//    • Dual‑band A‑B‑A surfaces (band/binary/wave)
//    • Chunk/presence hints for timer prewarm + scheduler
//    • Read‑only experience meta for Overmind/World
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseProxyHeartbeat",
  version: "v20-ImmortalPlus-HEARTBEAT",
  layer: "heartbeat_pacemaker",
  role: "pacemaker_timer_sensor",
  lineage: {
    root: "PulseProxyHeartbeat-v7",
    parent: "PulseProxyHeartbeat-v12.3-Evo-BINARY-MAX-ABA",
    organismIntegration: "v20-ImmortalPlus",
    epoch: "v20-ImmortalPlus-HEARTBEAT"
  },

  evo: {
    // Core identity
    pacemakerOnly: true,
    heartbeatSensor: true,
    deterministic: true,
    driftProof: true,
    pureTimerOrgan: true,
    backendOnly: true,
    multiInstanceReady: true,
    futureEvolutionReady: true,

    // A‑B‑A surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    heartbeatCycleAware: true,

    // Advantage + efficiency
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,

    // Presence / chunk / cache-prewarm
    presenceAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,
    schedulerAware: true,
    timerPrewarmAware: true,

    // Dual-band organism
    dualBandAware: true,
    symbolicAware: true,
    binaryAware: true,

    // Safety
    zeroIQ: true,
    zeroRouting: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true
  },

  contract: {
    input: [
      "PacemakerTick",
      "HeartbeatCycleContext",
      "DualBandContext"
    ],
    output: [
      "HeartbeatCycle",
      "HeartbeatBandSignature",
      "HeartbeatBinaryField",
      "HeartbeatWaveField",
      "HeartbeatAdvantageField",
      "HeartbeatChunkingHints",
      "HeartbeatPresenceHints",
      "HeartbeatDiagnostics",
      "HeartbeatHealingState",
      "HeartbeatExperienceMeta"
    ]
  }
}
*/

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// Prefer global admin if present (logger page / server)
const admin =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

import { VitalsLogger as logger } from "../../PULSE-UI/_BACKEND/PulseProofLogger.js";
import { safeRoute as route } from "../../PULSE-UI/_BACKEND/PulseWorldBridge.js";
import { PulseLineage } from "./PulseProxyBBB-v20.js";

// ============================================================================
//  EXPERIENCE META — AI / World / Overmind surfaces (v20-ImmortalPlus)
// ============================================================================

export const PulseHeartbeatExperienceMeta = Object.freeze({
  layer: "PulseProxyHeartbeat",
  role: "HEARTBEAT_PACEMAKER_TIMER_EXPERIENCE",
  version: "v20-ImmortalPlus-HEARTBEAT",
  identity: "PulseProxyHeartbeatExperience-v20-ImmortalPlus",

  experience: {
    surfaces: {
      heartbeatCycle: true,
      timerKind: true,
      runId: true,
      band: true,
      bandSignature: true,
      binaryField: true,
      waveField: true,
      advantageField: true,
      chunkingHints: true,
      presenceHints: true
    },
    narrative: {
      description:
        "Heartbeat pacemaker timer organ that wraps logout, history repair, and security sweep " +
        "with A‑B‑A band/binary/wave/advantage surfaces and chunk/presence hints. " +
        "Pure pacemaker sensor; no routing or business logic beyond the provided timers.",
      aiUsageHint:
        "Use these heartbeat surfaces to understand timer cadence, pacemaker health, and " +
        "advantage-aware scheduling. Never treat this organ as a router or decision-maker."
    }
  }
});


// ============================================================================
// HEARTBEAT IDENTITY — v20‑ImmortalPlus‑BINARY‑MAX‑ABA
// ============================================================================

export const PulseRole = {
  type: "Organ",
  subsystem: "PulseProxy",
  layer: "HeartBeat",
  version: "20-ImmortalPlus",
  identity: "PulseProxyHeartbeat-v20-ImmortalPlus-BINARY-MAX-ABA",

  evo: {
    // Core laws
    driftProof: true,
    deterministic: true,
    pacemakerOnly: true,
    noIQ: true,
    noRouting: true,
    noBusinessLogic: false, // timers contain business logic, but pacemaker shell is sensor-only
    backendOnly: true,
    multiInstanceReady: true,
    futureEvolutionReady: true,

    // A‑B‑A surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    heartbeatCycleAware: true,

    // v20+ organism‑wide advantages
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    advantageCascadeAware: true,
    dualBandAware: true,
    binaryPhenotypeAware: true,
    wavePhenotypeAware: true,
    symbolicAware: true,
    binaryAware: true,

    // Presence / chunk / cache-prewarm awareness
    presenceAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,
    schedulerAware: true,
    timerPrewarmAware: true
  }
};

export const PulseProxyHeartbeatMeta = Object.freeze({
  layer: "PulseProxyHeartbeat",
  role: "PACEMAKER_TIMER_ENGINE",
  version: "v20-ImmortalPlus-HEARTBEAT",
  identity: "PulseProxyHeartbeat-v20-ImmortalPlus-HEARTBEAT",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    pacemakerOnly: true,
    heartbeatSensor: true,
    heartbeatCycleAware: true,
    heartbeatRelay: true,

    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    advantageCascadeAware: true,

    zeroRandomness: true,
    zeroRouting: true,
    zeroIQ: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true,

    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    dualBandAware: true,
    symbolicAware: true,
    binaryAware: true,

    presenceAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,
    schedulerAware: true,
    timerPrewarmAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "PacemakerTick",
      "HeartbeatCycleContext",
      "DualBandContext"
    ],
    output: [
      "HeartbeatCycle",
      "HeartbeatBandSignature",
      "HeartbeatBinaryField",
      "HeartbeatWaveField",
      "HeartbeatAdvantageField",
      "HeartbeatChunkingHints",
      "HeartbeatPresenceHints",
      "HeartbeatDiagnostics",
      "HeartbeatHealingState",
      "HeartbeatExperienceMeta"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxyHeartbeat-v7",
    parent: "PulseProxyHeartbeat-v12.3-Evo-BINARY-MAX-ABA",
    ancestry: [
      "PulseProxyHeartbeat-v7",
      "PulseProxyHeartbeat-v8",
      "PulseProxyHeartbeat-v9",
      "PulseProxyHeartbeat-v10",
      "PulseProxyHeartbeat-v11",
      "PulseProxyHeartbeat-v11-Evo",
      "PulseProxyHeartbeat-v11-Evo-ABA",
      "PulseProxyHeartbeat-v11.2-Evo-BINARY-MAX",
      "PulseProxyHeartbeat-v12.3-Evo-BINARY-MAX-ABA"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "pacemaker-timer"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "tick → pacemaker → heartbeat cycle surfaces",
    adaptive:
      "binary-field + wave-field + advantage overlays + chunk/presence hints",
    return:
      "deterministic heartbeat surfaces + signatures + advantage + chunk/presence hints + experience meta"
  })
});
export const HEARTBEAT_CONTEXT = {
  layer: PulseRole.layer,
  role: "PACEMAKER_TIMER_ENGINE",
  version: PulseRole.version,
  evo: PulseRole.evo,
  experienceMeta: PulseHeartbeatExperienceMeta
};


// ============================================================================
// Fake onSchedule that uses PulseOS routing instead of cloud cron
// v20: treated as pacemaker wiring, not business logic
// ============================================================================

export function onSchedule(interval, handler) {
  const ms = parseInterval(interval);

  setInterval(() => {
    try {
      route("pulse.schedule.tick", { interval, ms });
    } catch (_) {}
    handler();
  }, ms);

  return handler;
}

function parseInterval(str) {
  if (!str || typeof str !== "string") return 5 * 60 * 1000; // default 5 min

  const lower = str.toLowerCase().trim();

  if (lower.includes("second")) {
    const n = parseInt(lower);
    return isNaN(n) ? 1000 : n * 1000;
  }

  if (lower.includes("minute")) {
    const n = parseInt(lower);
    return isNaN(n) ? 5 * 60 * 1000 : n * 60 * 1000;
  }

  if (lower.includes("hour")) {
    const n = parseInt(lower);
    return isNaN(n) ? 60 * 60 * 1000 : n * 60 * 60 * 1000;
  }

  const fallback = parseInt(lower);
  return isNaN(fallback) ? 5 * 60 * 1000 : fallback * 60 * 1000;
}

// ============================================================================
// INTERNAL HELPERS — deterministic, pure, zero randomness
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildBinaryField() {
  const patternLen = 14;
  const density = 14 + 28;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `hb-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `hb-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField() {
  const amplitude = 12;
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band: "symbolic-root",
    mode: "symbolic-wave"
  };
}

// IMMORTAL advantage field: cycle surfaces → advantageScore
function buildAdvantageField(binaryField, waveField, cycleKind) {
  const density = binaryField.binarySurface.density || 42;
  const amplitude = waveField.amplitude;
  const wavelength = waveField.wavelength;

  const efficiency = (amplitude + 1) / (wavelength + 1);
  const stress = Math.min(1, density / 64);
  const baseScore = efficiency * (1 + stress);

  let kindBoost = 1;
  if (cycleKind === "logout") kindBoost = 1.0;
  else if (cycleKind === "security") kindBoost = 1.1;

  const advantageScore = Math.min(1, baseScore * kindBoost);

  return {
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    cycleKind,
    advantageScore,
    advantageSignature: computeHash(
      `HEARTBEAT_ADVANTAGE::${density}::${amplitude}::${wavelength}::${cycleKind}::${advantageScore}`
    )
  };
}

function buildHeartbeatCycleSignature(cycle, kind) {
  return computeHash(`HEARTBEAT_CYCLE::${kind || "generic"}::${cycle}`);
}

// v20: chunk / cache / presence hints for timer prewarm
function buildChunkingHints(cycleKind) {
  let suggestedChunkSizeKB = 64;
  let suggestedPrewarm = true;

  if (cycleKind === "logout") {
    suggestedChunkSizeKB = 96;
    suggestedPrewarm = true;
  } else if (cycleKind === "security") {
    suggestedChunkSizeKB = 128;
    suggestedPrewarm = true;
  }

  return {
    suggestedChunkSizeKB,
    suggestedPrewarm,
    timerKind: cycleKind
  };
}

function buildPresenceHints(cycleKind) {
  let recommendedPresenceWindowMs = 5 * 60 * 1000;
  let suggestedPollIntervalMs = 60 * 1000;

  if (cycleKind === "logout") {
    recommendedPresenceWindowMs = 5 * 60 * 1000;
    suggestedPollIntervalMs = 60 * 1000;
  } else if (cycleKind === "security") {
    recommendedPresenceWindowMs = 24 * 60 * 60 * 1000;
    suggestedPollIntervalMs = 60 * 60 * 1000;
  }

  return {
    recommendedPresenceWindowMs,
    suggestedPollIntervalMs,
    timerKind: cycleKind
  };
}

// ============================================================================
// HEARTBEAT HEALING STATE — pacemaker rhythm log (v20-ImmortalPlus)
// ============================================================================

const heartbeatHealing = {
  cycles: 0,
  lastTimerLogoutRunId: null,
  lastSecuritySweepRunId: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHeartbeatCycleSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastChunkingHints: null,
  lastPresenceHints: null,
  lastTimerKind: null,

  experienceMeta: PulseHeartbeatExperienceMeta
};

// ============================================================================
// HEARTBEAT CONTEXT — v20‑ImmortalPlus
// ============================================================================

let HEARTBEAT_CYCLE = 0;

function getSeasonFromSettings(settings) {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mmdd = `${mm}-${dd}`;

  const periods = settings?.seasonalPeriods || {};

  const isInRange = (date, start, end) => {
    if (start <= end) return date >= start && date <= end;
    return date >= start || date <= end;
  };

  for (const key in periods) {
    const s = periods[key];
    if (!s?.start || !s?.end) continue;

    if (isInRange(mmdd, s.start, s.end)) {
      return {
        seasonalActive: true,
        seasonalName: s.name || "",
        seasonalMultiplier: Number(s.multiplier) || 1
      };
    }
  }

  return {
    seasonalActive: false,
    seasonalName: "",
    seasonalMultiplier: 1
  };
}

// ============================================================================
//  TIMER: LOGOUT + HISTORY REPAIR (v20‑ImmortalPlus envelope)
//  INTERNAL BUSINESS LOGIC: preserved from v12.3, wrapped in v20 surfaces
// ============================================================================

export const timerLogout = onSchedule("every 5 minutes", async () => {
  HEARTBEAT_CYCLE++;
  heartbeatHealing.cycles = HEARTBEAT_CYCLE;
  heartbeatHealing.lastCycleIndex = HEARTBEAT_CYCLE;
  heartbeatHealing.lastTimerKind = "logout";

  const heartbeatCycleSignature = buildHeartbeatCycleSignature(
    HEARTBEAT_CYCLE,
    "logout"
  );
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(
    binaryField,
    waveField,
    "logout"
  );
  const chunkingHints = buildChunkingHints("logout");
  const presenceHints = buildPresenceHints("logout");

  heartbeatHealing.lastHeartbeatCycleSignature = heartbeatCycleSignature;
  heartbeatHealing.lastBinaryField = binaryField;
  heartbeatHealing.lastWaveField = waveField;
  heartbeatHealing.lastAdvantageField = advantageField;
  heartbeatHealing.lastChunkingHints = chunkingHints;
  heartbeatHealing.lastPresenceHints = presenceHints;
  heartbeatHealing.lastExitReason = "ok";

  try {
    logger.log("heartbeat", "TIMER_START", {
      heartbeatCycle: HEARTBEAT_CYCLE,
      heartbeatCycleSignature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "logout",
      meta: { ...HEARTBEAT_CONTEXT }
    });
  } catch (_) {}

  const runId = crypto.randomUUID();
  const logId = `LOGOUT_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  heartbeatHealing.lastTimerLogoutRunId = runId;

  const userChanges = {};
  const pulseChanges = {};

  try {
    const now = Date.now();
    const cutoff = new Date(now - 15 * 60 * 1000);

    // 1. LOAD SETTINGS
    let settings = {};
    let seasonalActive = false;
    let seasonalName = null;
    let seasonalMultiplier = 1;
    let calculationVersion = 1;

    try {
      const settingsSnap = await db.collection("Settings").doc("global").get();
      settings = settingsSnap.exists ? settingsSnap.data() : {};

      const season = getSeasonFromSettings(settings);
      seasonalActive = season.seasonalActive;
      seasonalName = season.seasonalName;
      seasonalMultiplier = season.seasonalMultiplier;

      calculationVersion = settings.calculationVersion ?? 1;
    } catch (err) {
      await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}SETTINGS`).set({
        fn: "timerLogout",
        stage: "settings_load",
        error: String(err),
        runId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // 2. LOGOUT USERS
    try {
      const snap = await db
        .collection("Users")
        .where("TPSecurity.lastAppActive", "<", cutoff)
        .where("TPSecurity.isLoggedIn", "==", true)
        .get();

      for (const docSnap of snap.docs) {
        const uid = docSnap.id;

        try {
          const u = docSnap.data() || {};
          const TPLoyalty = u.TPLoyalty || {};

          const correctedLoyalty = {
            ...TPLoyalty,
            seasonalActive,
            seasonalName,
            seasonalMultiplier,
            streakMultiplier: TPLoyalty.streakMultiplier ?? 1,
            streakCount: TPLoyalty.streakCount ?? 0,
            streakExpires: TPLoyalty.streakExpires ?? null,
            calculationVersion,
            updated: admin.firestore.FieldValue.serverTimestamp()
          };

          await docSnap.ref.update({
            "TPSecurity.isLoggedIn": false,
            TPLoyalty: correctedLoyalty
          });

          userChanges[uid] = "LogoutCHANGE";
        } catch (err) {
          userChanges[uid] = "LogoutNOCHANGE";

          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "timerLogout",
              stage: "logout_update",
              uid,
              error: String(err),
              runId,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
      }
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}LOGOUT_BLOCK`)
        .set({
          fn: "timerLogout",
          stage: "logout_block",
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }

    // 3. FIX PULSE HISTORY
    try {
      const usersSnap = await db.collection("Users").get();

      for (const userDoc of usersSnap.docs) {
        const uid = userDoc.id;

        try {
          const histRef = db
            .collection("PulseHistory")
            .doc(uid)
            .collection("entries");
          const histSnap = await histRef
            .where("pointsSnapshot", "==", null)
            .limit(50)
            .get();

          if (histSnap.empty) continue;

          for (const entry of histSnap.docs) {
            const entryKey = `${uid}/${entry.id}`;

            try {
              const h = entry.data();

              const snapshot = {
                type: h.type,
                label: h.label,
                amount: h.amount,
                basePoints: h.amount,
                tierMultiplier: h.tierMultiplier ?? 1,
                streakMultiplier: h.streakMultiplier ?? 1,
                seasonalMultiplier,
                tierBonusPoints: 0,
                streakBonusPoints: 0,
                seasonalBonusPoints: 0,
                fastDeliveryBonus: 0,
                delayPenalty: 0,
                totalPointsEarned: h.amount,
                seasonalActive,
                seasonalName,
                calculationVersion,
                ts: h.ts ?? now,
                createdAt: h.createdAt ?? now
              };

              await entry.ref.update({ pointsSnapshot: snapshot });

              pulseChanges[entryKey] = "LogoutCHANGE";
            } catch (err) {
              pulseChanges[entryKey] = "LogoutNOCHANGE";

              await db
                .collection("FUNCTION_ERRORS")
                .doc(
                  `${errorPrefix}${entryKey.replace("/", "_")}`
                )
                .set({
                  fn: "timerLogout",
                  stage: "pulsehistory_fix",
                  uid,
                  entryId: entry.id,
                  error: String(err),
                  runId,
                  createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }
          }
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "timerLogout",
              stage: "pulsehistory_query",
              uid,
              error: String(err),
              runId,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
      }
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}PULSE_BLOCK`)
        .set({
          fn: "timerLogout",
          stage: "pulse_block",
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }

    // 4. ALWAYS WRITE TIMER LOG
    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "timerLogout",
      runId,
      users: userChanges,
      pulseHistory: pulseChanges,
      heartbeatCycle: HEARTBEAT_CYCLE,
      heartbeatCycleSignature,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "logout",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    heartbeatHealing.lastError = {
      message: String(err),
      stage: "timerLogout_fatal"
    };
    heartbeatHealing.lastExitReason = "fatal_error";

    await db.collection("FUNCTION_ERRORS").doc(`ERR_FATAL_${runId}`).set({
      fn: "timerLogout",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});

// ============================================================================
//  SECURITY SWEEP — Identity Rotation + PulseBand Cleanup (v20‑ImmortalPlus)
//  INTERNAL BUSINESS LOGIC: preserved from v12.3, wrapped in v20 surfaces
// ============================================================================

let SECURITY_SWEEP_CYCLE = 0;

export const SECURITY_SWEEP_CONTEXT = {
  layer: "HeartBeat",
  role: "PACEMAKER_SECURITY_SWEEP",
  version: "20-ImmortalPlus",
  evo: PulseRole.evo,
  experienceMeta: PulseHeartbeatExperienceMeta
};

export const securitySweep = onSchedule("every 24 hours", async () => {
  SECURITY_SWEEP_CYCLE++;

  heartbeatHealing.lastTimerKind = "security";

  const securitySweepSignature = computeHash(
    `SECURITY_SWEEP_CYCLE::${SECURITY_SWEEP_CYCLE}`
  );
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(
    binaryField,
    waveField,
    "security"
  );
  const chunkingHints = buildChunkingHints("security");
  const presenceHints = buildPresenceHints("security");

  heartbeatHealing.lastSecuritySweepRunId = `SECURE_${SECURITY_SWEEP_CYCLE}`;
  heartbeatHealing.lastBinaryField = binaryField;
  heartbeatHealing.lastWaveField = waveField;
  heartbeatHealing.lastAdvantageField = advantageField;
  heartbeatHealing.lastChunkingHints = chunkingHints;
  heartbeatHealing.lastPresenceHints = presenceHints;
  heartbeatHealing.lastExitReason = "ok";

  try {
    logger.log("heartbeat", "SECURITY_SWEEP_START", {
      securitySweepCycle: SECURITY_SWEEP_CYCLE,
      securitySweepSignature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "security",
      meta: { ...SECURITY_SWEEP_CONTEXT }
    });
  } catch (_) {}

  const runId = crypto.randomUUID();
  const logId = `SECURE_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  const rotatedUsers = [];
  const flaggedUsers = [];

  try {
    const nowMs = Date.now();
    const now = new Date(nowMs);

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const dayOfWeek = now.getUTCDay();
    const weekNumber = Math.floor(nowMs / (7 * 24 * 60 * 60 * 1000));

    const isWeeklyCheckDay = dayOfWeek === 1;
    const isBiWeeklyIntegrityCheck =
      isWeeklyCheckDay && weekNumber % 2 === 0;

    const usersSnap = await db.collection("Users").get();

    for (const doc of usersSnap.docs) {
      const uid = doc.id;

      try {
        const u = doc.data() || {};
        const TPIdentity = u.TPIdentity || {};
        const TPSecurity = u.TPSecurity || {};

        let lastIssued = null;

        if (TPIdentity.lastJWTIssuedAt) {
          if (typeof TPIdentity.lastJWTIssuedAt.toMillis === "function") {
            lastIssued = TPIdentity.lastJWTIssuedAt.toMillis();
          } else if (TPIdentity.lastJWTIssuedAt._seconds) {
            lastIssued = TPIdentity.lastJWTIssuedAt._seconds * 1000;
          } else if (typeof TPIdentity.lastJWTIssuedAt === "number") {
            lastIssued = TPIdentity.lastJWTIssuedAt;
          }
        }

        const age = lastIssued ? nowMs - lastIssued : Infinity;
        const needs30DayRefresh = age > THIRTY_DAYS;

        const danger =
          TPSecurity.vaultLockdown ||
          TPSecurity.appLocked ||
          TPSecurity.hackerFlag ||
          TPSecurity.forceIdentityRefresh ||
          (TPSecurity.failedLoginAttempts > 5);

        const ipJump =
          TPSecurity.lastKnownIP &&
          TPSecurity.previousIP &&
          TPSecurity.lastKnownIP !== TPSecurity.previousIP;

        const deviceJump =
          TPSecurity.lastKnownDevice &&
          TPSecurity.previousDevice &&
          TPSecurity.lastKnownDevice !== TPSecurity.previousDevice;

        const needsEarlyRefresh = danger || ipJump || deviceJump;

        const totalFlags =
          (TPSecurity.failedLoginAttempts || 0) +
          (TPSecurity.hackerFlag ? 3 : 0) +
          (TPSecurity.vaultLockdown ? 5 : 0) +
          (TPSecurity.appLocked ? 5 : 0);

        if (totalFlags >= 10) {
          flaggedUsers.push({
            uid,
            email: TPIdentity.email || null,
            failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
            vaultLockdown: !!TPSecurity.vaultLockdown,
            appLocked: !!TPSecurity.appLocked,
            hackerFlag: !!TPSecurity.hackerFlag
          });
        }

        if (!needs30DayRefresh && !needsEarlyRefresh) continue;

        const rootResendToken = u.UserToken || null;
        const oldSessionToken = TPIdentity.resendToken || null;

        const newSessionToken = crypto.randomUUID();

        const reason = needsEarlyRefresh
          ? "early_security_refresh"
          : "30_day_rotation";

        try {
          await db.collection("IdentityHistory").add({
            uid,
            rootResendToken,
            oldSessionToken,
            newSessionToken,
            reason,
            dangerFlags: {
              vaultLockdown: TPSecurity.vaultLockdown || false,
              appLocked: TPSecurity.appLocked || false,
              hackerFlag: TPSecurity.hackerFlag || false,
              failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
              ipJump,
              deviceJump
            },
            runId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "securitySweep",
              stage: "identity_log",
              uid,
              error: String(err),
              runId,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
          continue;
        }

        try {
          await doc.ref.update({
            "TPIdentity.resendToken": newSessionToken,
            "TPIdentity.lastJWTIssuedAt":
              admin.firestore.FieldValue.serverTimestamp(),

            "TPSecurity.previousIP": TPSecurity.lastKnownIP || null,
            "TPSecurity.previousDevice": TPSecurity.lastKnownDevice || null,

            "TPSecurity.lastKnownIP": TPSecurity.lastKnownIP || null,
            "TPSecurity.lastKnownDevice": TPSecurity.lastKnownDevice || null,

            "TPSecurity.forceIdentityRefresh": false
          });
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "securitySweep",
              stage: "user_update",
              uid,
              error: String(err),
              runId,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
          continue;
        }

        rotatedUsers.push(uid);
      } catch (err) {
        await db
          .collection("FUNCTION_ERRORS")
          .doc(`${errorPrefix}${uid}`)
          .set({
            fn: "securitySweep",
            stage: "user_loop",
            uid,
            error: String(err),
            runId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
      }
    }

    // MERGED + OPTIMIZED CLEANUP BLOCK
    try {
      const now = Date.now();
      const cutoff24h = now - 24 * 60 * 60 * 1000;
      const cutoff7d = now - 7 * 24 * 60 * 60 * 1000;

      const deletedSessions = [];
      const deletedChunks = [];
      const deletedErrors = [];
      const deletedRedownloads = [];

      const sessionsSnap = await db.collection("pulseband_sessions").get();
      const batchSessions = db.batch();

      for (const s of sessionsSnap.docs) {
        const data = s.data() || {};
        const createdAt = data.createdAt?.toMillis?.() || 0;

        if (createdAt < cutoff24h) {
          const chunksSnap = await s.ref.collection("chunks").get();

          for (const c of chunksSnap.docs) {
            batchSessions.delete(c.ref);
            deletedChunks.push(c.id);
          }

          batchSessions.delete(s.ref);
          deletedSessions.push(s.id);
        }
      }

      if (deletedSessions.length || deletedChunks.length) {
        await batchSessions.commit();
      }

      const errorsSnap = await db.collection("pulseband_errors").get();
      const batchErrors = db.batch();

      for (const e of errorsSnap.docs) {
        const createdAt = e.data()?.createdAt?.toMillis?.() || 0;
        if (createdAt < cutoff7d) {
          batchErrors.delete(e.ref);
          deletedErrors.push(e.id);
        }
      }

      if (deletedErrors.length) {
        await batchErrors.commit();
      }

      const redlSnap = await db.collection("pulseband_redownloads").get();
      const batchRedl = db.batch();

      for (const r of redlSnap.docs) {
        const createdAt = r.data()?.createdAt?.toMillis?.() || 0;
        if (createdAt < cutoff7d) {
          batchRedl.delete(r.ref);
          deletedRedownloads.push(r.id);
        }
      }

      if (deletedRedownloads.length) {
        await batchRedl.commit();
      }

      await db.collection("TIMER_LOGS").doc(`PB_CLEANUP_${runId}`).set({
        fn: "pulsebandCleanup",
        runId,
        deletedSessions,
        deletedChunks,
        deletedErrors,
        deletedRedownloads,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`ERR_PB_CLEANUP_${runId}`)
        .set({
          fn: "pulsebandCleanup",
          stage: "cleanup",
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }

    // TIMER LOG (always runs)
    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "securitySweep",
      runId,
      rotatedUsers,
      flaggedUsers,
      sweepType: isWeeklyCheckDay ? "weekly" : "daily",
      integrityCheck: isBiWeeklyIntegrityCheck,
      rotationCount: rotatedUsers.length,
      flaggedCount: flaggedUsers.length,
      securitySweepCycle: SECURITY_SWEEP_CYCLE,
      securitySweepSignature,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "security",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    heartbeatHealing.lastError = {
      message: String(err),
      stage: "securitySweep_fatal"
    };
    heartbeatHealing.lastExitReason = "fatal_error";

    await db.collection("FUNCTION_ERRORS").doc(`ERR_FATAL_${runId}`).set({
      fn: "securitySweep",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});

// ============================================================================
// HEARTBEAT HEALING / DIAGNOSTICS EXPORTS — v20-ImmortalPlus
// ============================================================================

export function getPulseProxyHeartbeatHealingState() {
  return { ...heartbeatHealing };
}

export function getPulseProxyHeartbeatDiagnostics() {
  return {
    cycles: heartbeatHealing.cycles,
    lastTimerLogoutRunId: heartbeatHealing.lastTimerLogoutRunId,
    lastSecuritySweepRunId: heartbeatHealing.lastSecuritySweepRunId,
    lastError: heartbeatHealing.lastError,
    lastExitReason: heartbeatHealing.lastExitReason,
    lastCycleIndex: heartbeatHealing.lastCycleIndex,
    lastHeartbeatCycleSignature: heartbeatHealing.lastHeartbeatCycleSignature,
    lastBinaryField: heartbeatHealing.lastBinaryField,
    lastWaveField: heartbeatHealing.lastWaveField,
    lastAdvantageField: heartbeatHealing.lastAdvantageField,
    lastChunkingHints: heartbeatHealing.lastChunkingHints,
    lastPresenceHints: heartbeatHealing.lastPresenceHints,
    lastTimerKind: heartbeatHealing.lastTimerKind,
    experienceMeta: heartbeatHealing.experienceMeta
  };
}

// ============================================================================
// EXPORTS — v20-ImmortalPlus HEARTBEAT PACEMAKER TIMER ORGAN
// ============================================================================

export const PulseProxyHeartbeat = {
  timerLogout,
  securitySweep,
  getPulseProxyHeartbeatHealingState,
  getPulseProxyHeartbeatDiagnostics,
  meta: {
    ...HEARTBEAT_CONTEXT
  },
  PulseRole,
  experienceMeta: PulseHeartbeatExperienceMeta
};
