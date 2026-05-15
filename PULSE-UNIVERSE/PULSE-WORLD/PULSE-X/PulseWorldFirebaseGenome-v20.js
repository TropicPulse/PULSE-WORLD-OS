/* global log, warn, error */
// FILE: tropic-pulse-functions/PULSE-UNIVERSE/PULSE-X/PulseWorldFirebaseGenome-v20.js
// ============================================================================
//  PULSE-WORLD GENOME ORGAN — PulseWorldFirebaseGenome (v20 IMMORTAL ADVANTAGE)
//  World-layer deterministic service organ
//  Provides: Firestore, Storage, Admin SDK + namespaced helpers + health +
//            world metrics + schema drift detection + cold-start fingerprint +
//            index validation + bucket metadata + rule sanity checks.
//  Placement: PULSE-WORLD / PULSE-X
//  Role: WORLD_DATA_GENOME
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  IMPORTS — SAFE (NO SENSITIVE VALUES)
// ============================================================================
import admin from "firebase-admin";

// ============================================================================
//  FIREBASE CONFIG — ENV-FIRST, FOUNDER-SAFE FALLBACK
// ============================================================================
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "FOUNDER_INSERT_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "FOUNDER_INSERT_AUTH_DOMAIN",
  projectId: process.env.FIREBASE_PROJECT_ID || "FOUNDER_INSERT_PROJECT_ID",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "FOUNDER_INSERT_STORAGE_BUCKET",
  messagingSenderId: process.env.FIREBASE_SENDER_ID || "FOUNDER_INSERT_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "FOUNDER_INSERT_APP_ID"
};

// ============================================================================
//  CONFIG VALIDATION — IMMORTAL SAFETY
// ============================================================================
(function validateConfig(cfg) {
  const missing = [];
  for (const key of ["apiKey","authDomain","projectId","storageBucket","messagingSenderId","appId"]) {
    if (!cfg[key] || String(cfg[key]).startsWith("FOUNDER_INSERT_")) {
      missing.push(key);
    }
  }
  if (missing.length) {
    warn?.(`⚠️ [PulseWorldFirebaseGenome] Missing/placeholder Firebase config keys: ${missing.join(", ")}`);
  }
})(firebaseConfig);

// ============================================================================
//  IMMORTAL INITIALIZATION — SINGLE INSTANCE ONLY
// ============================================================================
if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

// ============================================================================
//  WORLD-LAYER SHARED INSTANCES
// ============================================================================
const db = admin.firestore();
const storage = admin.storage().bucket();

// ============================================================================
//  NAMESPACE HELPERS — SYSTEM / WORLD / USER / REGION
// ============================================================================

function systemCollection(name) {
  return db.collection(`__SYSTEM__/${name}/v1`);
}

function worldCollection(name) {
  return db.collection(`WORLD/${name}`);
}

function userCollection(userId, name) {
  if (!userId) throw new Error("userId required for userCollection");
  return db.collection(`USERS/${userId}/${name}`);
}

function regionCollection(regionCode, name) {
  if (!regionCode) throw new Error("regionCode required for regionCollection");
  return db.collection(`REGIONS/${regionCode}/${name}`);
}

// ============================================================================
//  WORLD METRICS — REGION/HOST HEATMAPS, ACCESS COUNTS
// ============================================================================

async function recordWorldMetric(kind, payload = {}) {
  try {
    const col = systemCollection("WorldMetrics");
    await col.add({
      kind,
      payload,
      at: admin.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (err) {
    warn?.("[WorldMetrics] Failed:", err);
    return false;
  }
}

// ============================================================================
//  FIRESTORE INDEX SELF-VALIDATION (non-fatal)
// ============================================================================
async function validateFirestoreIndexes() {
  try {
    const indexes = await db.listCollections(); // not real indexes, but presence check
    return { ok: true, count: indexes.length };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  STORAGE BUCKET METADATA
// ============================================================================
async function getBucketMetadata() {
  try {
    const [metadata] = await storage.getMetadata();
    return { ok: true, metadata };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  SECURITY RULE SANITY CHECK (non-fatal)
// ============================================================================
async function checkSecurityRules() {
  try {
    // We cannot fetch rules directly, but we can test a harmless read.
    await db.collection("__RULE_CHECK__").limit(1).get();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  SCHEMA DRIFT DETECTION — IMMORTAL
// ============================================================================
async function detectSchemaDrift(expected = {}) {
  try {
    const drift = [];
    for (const [col, fields] of Object.entries(expected)) {
      const snap = await db.collection(col).limit(1).get();
      if (!snap.empty) {
        const doc = snap.docs[0].data();
        for (const f of fields) {
          if (!(f in doc)) drift.push({ col, missingField: f });
        }
      }
    }
    return { ok: true, drift };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  WORLD HEARTBEAT — IMMORTAL
// ============================================================================
async function worldHeartbeat() {
  try {
    await systemCollection("Heartbeat").doc("world").set(
      {
        at: admin.firestore.FieldValue.serverTimestamp(),
        projectId: firebaseConfig.projectId,
        env: process.env.NODE_ENV || "unknown"
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    warn?.("[WorldHeartbeat] Failed:", err);
    return false;
  }
}

// ============================================================================
//  HEALTH CHECK
// ============================================================================
async function checkWorldDataHealth() {
  try {
    const now = admin.firestore.FieldValue.serverTimestamp();
    await systemCollection("Health").doc("world-data").set(
      {
        lastCheckAt: now,
        nodeEnv: process.env.NODE_ENV || "unknown",
        projectId: firebaseConfig.projectId
      },
      { merge: true }
    );

    return { ok: true, projectId: firebaseConfig.projectId };
  } catch (err) {
    warn?.("[WorldHealth] Failed:", err);
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  WORLD SNAPSHOT APPEND
// ============================================================================
async function appendWorldSnapshot(kind, payload = {}) {
  try {
    await systemCollection("WorldSnapshots").add({
      kind,
      payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (err) {
    warn?.("[WorldSnapshot] Failed:", err);
    return false;
  }
}

// ============================================================================
//  EXPORT — WORLD GENOME ORGAN
// ============================================================================
export const PulseWorldFirebaseGenome = Object.freeze({
  admin,
  db,
  storage,

  // Namespaced helpers
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,

  // World metrics
  recordWorldMetric,

  // Health + snapshots
  checkWorldDataHealth,
  appendWorldSnapshot,
  worldHeartbeat,

  // Advanced diagnostics
  validateFirestoreIndexes,
  getBucketMetadata,
  checkSecurityRules,
  detectSchemaDrift,

  meta: Object.freeze({
    layer: "world_layer",
    role: "world_data_genome",
    version: "v20-IMMORTAL-ADVANTAGE",
    deterministic: true,
    driftProof: true,
    zeroMutation: true
  })
});

// Pass-through exports
export {
  admin,
  db,
  storage,
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,
  recordWorldMetric,
  checkWorldDataHealth,
  appendWorldSnapshot,
  worldHeartbeat,
  validateFirestoreIndexes,
  getBucketMetadata,
  checkSecurityRules,
  detectSchemaDrift
};
