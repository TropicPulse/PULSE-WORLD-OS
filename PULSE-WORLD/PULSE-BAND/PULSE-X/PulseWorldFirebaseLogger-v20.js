// FILE: PULSE-WORLD/PULSE-X/PulseWorldFirebaseLogger-v20-IMMORTAL.js
// ============================================================================
//  PULSE-WORLD FIREBASE LOGGER — v20 IMMORTAL
//  ROLE:
//    • Universal logging entrypoint for all Pulse‑World layers
//    • Accepts logs from: Pulse-Core, Pulse-X, Pulse-Scheduler, Pulse-Runtime,
//      Pulse-Overmind, PulseRouter, PulseTouch, BinarySubstrate, and external organs
//    • Wraps logs into IMMORTAL envelopes and forwards to Firebase Adapter
//    • Guarantees deterministic, drift-proof, zero-mutation logging
//    • Supports symbolic logs, binary logs, dual-band logs, and hybrid envelopes
//    • Adds world-layer metadata, region/host identity, pulseTouch, advantage,
//      chunkProfile, page, presence, and intellHash when applicable
// ============================================================================

/*
LOGGER_META = {
  identity: "PulseWorldFirebaseLogger",
  version: "v20-IMMORTAL",
  layer: "world_layer",
  role: "world_log_router",
  lineage: "v14 → v16 → v17 → v20 IMMORTAL",

  evo: {
    deterministic: true,
    driftProof: true,
    zeroMutation: true,
    zeroExternalMutation: true,

    dualBand: true,
    binaryAware: true,
    presenceAware: true,
    pulseTouchAware: true,
    advantageAware: true,
    chunkAware: true,
    pageAware: true,
    trustAware: true,
    identityAware: true,

    regionAware: true,
    hostAware: true,
    schedulerAware: true,
    runtimeV20Aware: true,

    intellHashAware: true,
    cacheAware: true,
    prewarmAware: true,
    worldSnapshotAware: true
  },

  contract: {
    input: [
      "level",
      "message",
      "meta",
      "pulseTouch",
      "band",
      "binaryPayload",
      "originOrgan",
      "originInstance",
      "regionId",
      "hostName"
    ],
    output: [
      "FirebaseAdapterEnvelope",
      "WorldSnapshot (critical only)"
    ]
  }
}
*/

import { handler as FirebaseAdapterHandler } from "./PulseWorldFirebaseAdapter-v20.js";

// ============================================================================
//  INTERNAL PURE HELPERS
// ============================================================================

function safeJson(v) {
  try { return JSON.parse(JSON.stringify(v || {})); }
  catch { return {}; }
}

function normalizeLevel(level) {
  const lv = String(level || "").toLowerCase();
  if (["critical","error","warn","info","debug"].includes(lv)) return lv;
  return "info";
}

function buildImmortalEnvelope(body) {
  const level = normalizeLevel(body.level);
  const message = String(body.message || "");
  const meta = safeJson(body.meta);

  return {
    level,
    message,
    meta,

    // IMMORTAL metadata
    band: body.band || "symbolic",
    pulseTouch: safeJson(body.pulseTouch || {}),

    originOrgan: body.originOrgan || "unknown",
    originInstance: body.originInstance || null,

    regionId: body.regionId || body.pulseTouch?.regionId || "unknown",
    hostName: body.hostName || body.pulseTouch?.hostName || "unknown",

    binaryPayload: body.binaryPayload || null
  };
}

// ============================================================================
//  PUBLIC LOGGER HANDLER — IMMORTAL
// ============================================================================

export async function handler(req, res) {
  try {
    const body = await req.json();
    const envelope = buildImmortalEnvelope(body);

    // Forward to Firebase Adapter (IMMORTAL)
    const adapterResponse = await FirebaseAdapterHandler({
      body: JSON.stringify(envelope)
    });

    return new Response(
      JSON.stringify({ ok: true, adapterResponse }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500 }
    );
  }
}

// ============================================================================
//  EXPORT DEFAULT
// ============================================================================
export default { handler };
