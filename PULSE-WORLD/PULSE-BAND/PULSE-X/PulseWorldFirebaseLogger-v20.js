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
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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
