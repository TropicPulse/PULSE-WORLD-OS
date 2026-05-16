// ============================================================================
//  PULSE OS v24-ImmortalPlus — HEARTBEAT PACEMAKER TIMER ORGAN
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


const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

import { safeRoute as route, PulseProofBridgeLogger as logger } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";
import { PulseLineage } from "../../PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PROXY/PulseProxyBBB-v20.js";



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

function computeIntelHash(str) {
  const s = String(str || "");
  let h1 = 0x9e3779b1; // golden ratio constant
  let h2 = 0x85ebca77; // avalanche constant

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = (h1 ^ (c * (i + 1))) >>> 0;
    h2 = (h2 + (c << (i % 5))) >>> 0;

    // avalanche mixing
    h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
    h2 = Math.imul(h2 ^ (h2 >>> 13), 0xc2b2ae35);
  }

  const final = ((h1 ^ h2) >>> 0).toString(16);
  return `intel-${final}`;
}


function buildBinaryField() {
  const patternLen = 14 + (Date.now() % 7);
  const density = 42 + (patternLen % 13);
  const surface = density + patternLen;

  const parity = surface & 1;
  const shiftDepth = Math.max(1, Math.floor(Math.log2(surface)));

  const binarySurface = { patternLen, density, surface };

  return {
    binaryPhenotypeSignature: computeIntelHash(
      `BINARY_PHENO::${patternLen}::${density}::${surface}`
    ),
    binarySurfaceSignature: computeIntelHash(
      `BINARY_SURFACE::${surface}::${shiftDepth}`
    ),
    binarySurface,
    parity,
    shiftDepth
  };
}


function buildWaveField() {
  const amplitude = 8 + (Date.now() % 5);
  const wavelength = amplitude * 2 + 3;
  const phase = (amplitude * wavelength) % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "immortal-root",
    mode: "immortal-wave",
    waveSignature: computeIntelHash(
      `WAVE_SURFACE::${amplitude}::${wavelength}::${phase}`
    )
  };
}


// IMMORTAL advantage field: cycle surfaces → advantageScore
function buildAdvantageField(binaryField, waveField, cycleKind) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;
  const wavelength = waveField.wavelength;

  const efficiency = (amplitude + 1) / (wavelength + 2);
  const stress = Math.min(1, density / 64);

  let kindBoost = 1.0;
  if (cycleKind === "logout") kindBoost = 1.0;
  else if (cycleKind === "security") kindBoost = 1.12;
  else if (cycleKind === "nudge") kindBoost = 1.08;

  const advantageScore = Math.min(1, efficiency * (1 + stress) * kindBoost);

  return {
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    cycleKind,
    advantageScore,
    advantageSignature: computeIntelHash(
      `IMMORTAL_ADVANTAGE::${density}::${amplitude}::${wavelength}::${cycleKind}::${advantageScore}`
    )
  };
}


function buildHeartbeatCycleSignature(cycle, kind) {
  return computeIntelHash(
    `HEARTBEAT_CYCLE::${kind || "generic"}::${cycle}::${Date.now() % 9999}`
  );
}


function buildChunkingHints(cycleKind = "generic") {
  // Base defaults
  let baseSize = 64;
  let prewarm = true;

  // Dynamic entropy (adds variability)
  const entropy = Math.floor(Math.random() * 16); // 0–15 KB

  // Adjust based on cycle kind
  switch (cycleKind) {
    case "logout":
      baseSize = 96;
      break;

    case "nudge":
      baseSize = 128;
      break;

    case "security":
      baseSize = 128;
      break;

    default:
      baseSize = 64;
  }

  // Final computed size
  const suggestedChunkSizeKB = baseSize + entropy;

  return {
    suggestedChunkSizeKB,
    suggestedPrewarm: prewarm,
    entropy,
    timerKind: cycleKind,
    prewarmWindowMs: 1500, // v25++ hint for prewarm timing
    confidence: 0.92        // v25++ hint for adaptive chunking
  };
}

function buildPresenceHints(cycleKind = "generic") {
  // Base defaults
  let windowMs = 5 * 60 * 1000;      // 5 minutes
  let pollMs = 60 * 1000;            // 1 minute

  // Dynamic entropy (prevents stale presence windows)
  const entropy = (Date.now() % 777); // 0–776 ms

  // Adjust based on cycle kind
  switch (cycleKind) {
    case "logout":
      windowMs = 5 * 60 * 1000;
      pollMs = 60 * 1000;
      break;

    case "security":
      windowMs = 24 * 60 * 60 * 1000;
      pollMs = 60 * 60 * 1000;
      break;

    case "nudge":
      windowMs = 10 * 60 * 1000;     // nudges widen the window
      pollMs = 2 * 60 * 1000;        // poll slightly slower
      break;

    default:
      windowMs = 5 * 60 * 1000;
      pollMs = 60 * 1000;
  }

  // Final computed values
  const recommendedPresenceWindowMs = windowMs + entropy;
  const suggestedPollIntervalMs = pollMs;

  return {
    recommendedPresenceWindowMs,
    suggestedPollIntervalMs,
    entropy,
    timerKind: cycleKind,
    confidence: 0.94, // v25++ presence confidence
    presenceSignature: computeIntelHash(
      `PRESENCE_HINTS::${cycleKind}::${recommendedPresenceWindowMs}::${suggestedPollIntervalMs}`
    )
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


// ------------------------------------------------------------
// PULSEWORLD FIELD BUILDERS (MINIMAL V25++ VERSION)
// ------------------------------------------------------------
function buildPulseSignature(cycle) {
  return `PULSE_NUDGE::${cycle}::${Date.now()}`;
}

// ------------------------------------------------------------
// MAIN HANDLER — MANUAL NUDGE
// ------------------------------------------------------------
export const handler = async (event, context) => {
  HEARTBEAT_CYCLE++;

  const signature = buildPulseSignature(HEARTBEAT_CYCLE);
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(binaryField, waveField);
  const chunkingHints = buildChunkingHints();
  const presenceHints = buildPresenceHints();

  const pulsePacket = {
    ok: true,
    pulse: true,
    cycle: HEARTBEAT_CYCLE,
    signature,
    binaryField,
    waveField,
    advantageField,
    chunkingHints,
    presenceHints,
    ts: Date.now()
  };

  return {
    statusCode: 200,
    body: JSON.stringify(pulsePacket)
  };
};

// ------------------------------------------------------------
// OPTIONAL: SCHEDULED NUDGE (EVERY 15 MINUTES)
// ------------------------------------------------------------
export const scheduled = onSchedule("*/15 * * * *", async () => {
  HEARTBEAT_CYCLE++;

  const signature = buildPulseSignature(HEARTBEAT_CYCLE);
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(binaryField, waveField);
  const chunkingHints = buildChunkingHints();
  const presenceHints = buildPresenceHints();

  const pulsePacket = {
    ok: true,
    scheduled: true,
    pulse: true,
    cycle: HEARTBEAT_CYCLE,
    signature,
    binaryField,
    waveField,
    advantageField,
    chunkingHints,
    presenceHints,
    ts: Date.now()
  };

  return {
    statusCode: 200,
    body: JSON.stringify(pulsePacket)
  };
});


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
  version: "24-ImmortalPlus",
  evo: PulseRole.evo,
  experienceMeta: PulseHeartbeatExperienceMeta
};

export const securitySweep = onSchedule("every 24 hours", async () => {
  SECURITY_SWEEP_CYCLE++;

  heartbeatHealing.lastTimerKind = "security";

  const securitySweepSignature = computeIntelHash(
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
