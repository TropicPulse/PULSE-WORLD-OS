/* global log, warn, error */
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-X/PulseWorldFirebaseGenome.js
// ============================================================================
//  PULSE-WORLD GENOME ORGAN — PulseWorldFirebaseGenome (v17 IMMORTAL)
//  World-layer deterministic service organ
//  Provides: Firestore, Storage, Admin SDK + namespaced helpers + health
//  Placement: PULSE-WORLD / PULSE-X
//  Role: WORLD_DATA_GENOME
//  Notes: Sensitive config comes from env or founder placeholders
// ============================================================================

/*
GENOME_META = {
  identity: "PulseWorldFirebaseGenome",
  version: "v17-IMMORTAL-GENOME",
  layer: "world_layer",
  role: "world_data_genome",
  lineage: "PulseOS-v14 → v16-IMMORTAL → v17-IMMORTAL",

  evo: {
    deterministic: true,
    driftProof: true,
    zeroMutation: true,
    zeroExternalMutation: true,
    worldLayerOrgan: true,
    founderAligned: true,
    presenceAware: true,
    bandAware: true,
    proxyAware: true,
    safeInit: true,
    singleInstance: true,
    coldStartSafe: true,
    healthAware: true,
    namespaceAware: true
  },

  placement: {
    requiredFolder: "PULSE-WORLD",
    requiredSubsystem: "world_engine",
    naturalLanguageHook: [
      "world connection",
      "world engine",
      "backend connection",
      "backend engine",
      "firebase genome",
      "world data",
      "world memory"
    ]
  },

  notifications: {
    onMisplacement: "adaptive",
    adminEmail: [
      "fordfamilydistribution@gmail.com",
      "aldwynfox101@gmail.com",
      "sales@tropicpulse.bz"
    ],
    adminSMS: "+15096077261",
    adminMessenger: [
      "+15096077261",
      "aldwynfox101@gmail.com"
    ]
  }
}
*/

// ============================================================================
//  IMPORTS — SAFE (NO SENSITIVE VALUES)
// ============================================================================
import admin from "firebase-admin";

// ============================================================================
//  FIREBASE CONFIG — ENV-FIRST, FALLBACK TO FOUNDER PLACEHOLDERS
// ============================================================================
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "FOUNDER_INSERT_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "FOUNDER_INSERT_AUTH_DOMAIN",
  projectId: process.env.FIREBASE_PROJECT_ID || "FOUNDER_INSERT_PROJECT_ID",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "FOUNDER_INSERT_STORAGE_BUCKET",
  messagingSenderId: process.env.FIREBASE_SENDER_ID || "FOUNDER_INSERT_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "FOUNDER_INSERT_APP_ID"
};

// Minimal sanity check (non-fatal in dev, loud in prod)
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
//  NAMESPACE HELPERS — SYSTEM vs USER vs WORLD
// ============================================================================

/**
 * System collections (internal, non-user-facing)
 * e.g. Logs, TrustFabric, WorldState, Regioning, RewardsEngine
 */
function systemCollection(name) {
  return db.collection(`__SYSTEM__/${name}/v1`);
}

/**
 * World collections (shared across tenants / regions)
 */
function worldCollection(name) {
  return db.collection(`WORLD/${name}`);
}

/**
 * User collections (scoped by userId)
 */
function userCollection(userId, name) {
  if (!userId) throw new Error("userId required for userCollection");
  return db.collection(`USERS/${userId}/${name}`);
}

/**
 * Region collections (scoped by region code)
 */
function regionCollection(regionCode, name) {
  if (!regionCode) throw new Error("regionCode required for regionCollection");
  return db.collection(`REGIONS/${regionCode}/${name}`);
}

// ============================================================================
//  HEALTH + SNAPSHOT HELPERS
// ============================================================================

/**
 * Lightweight health check for the data genome.
 * Does NOT throw on failure; returns a structured status.
 */
async function checkWorldDataHealth() {
  try {
    const pingRef = systemCollection("Health").doc("world-data");
    const now = admin.firestore.FieldValue.serverTimestamp();

    await pingRef.set(
      {
        lastCheckAt: now,
        nodeEnv: process.env.NODE_ENV || "unknown",
        projectId: firebaseConfig.projectId || null
      },
      { merge: true }
    );

    return { ok: true, projectId: firebaseConfig.projectId || null };
  } catch (err) {
    warn?.("⚠️ [PulseWorldFirebaseGenome] Health check failed:", err?.message || err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Append-only world snapshot (for organism/world state, trust, etc.)
 */
async function appendWorldSnapshot(kind, payload = {}) {
  try {
    const col = systemCollection("WorldSnapshots");
    const now = admin.firestore.FieldValue.serverTimestamp();

    await col.add({
      kind: kind || "generic",
      payload,
      createdAt: now
    });

    return true;
  } catch (err) {
    warn?.("⚠️ [PulseWorldFirebaseGenome] appendWorldSnapshot failed:", err?.message || err);
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

  // Health + snapshots
  checkWorldDataHealth,
  appendWorldSnapshot,

  meta: Object.freeze({
    layer: "world_layer",
    role: "world_data_genome",
    version: "v17-IMMORTAL",
    deterministic: true,
    driftProof: true,
    zeroMutation: true
  })
});

// Pass-through exports for world cortex / helpers
export {
  admin,
  db,
  storage,
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,
  checkWorldDataHealth,
  appendWorldSnapshot
};
