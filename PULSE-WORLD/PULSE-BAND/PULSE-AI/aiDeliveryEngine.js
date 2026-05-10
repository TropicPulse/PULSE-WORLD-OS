// ============================================================================
//  PULSE OS v14‑IMMORTAL — DELIVERY ENGINE
//  Delivery Organ • Clarity Engine • Drift‑Proof Formatting
//  PURE DELIVERY. ZERO MUTATION OF MEANING. ZERO RANDOMNESS.
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const DeliveryEngineMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ─────────────────────────────────────────────────────────────
// PACKET EMITTER — deterministic, delivery-scoped
// ─────────────────────────────────────────────────────────────
function emitDeliveryPacket(type, payload) {
  return Object.freeze({
    meta: DeliveryEngineMeta,
    packetType: `delivery-${type}`,
    timestamp: Date.now(),
    epoch: DeliveryEngineMeta.evo.epoch,
    layer: DeliveryEngineMeta.layer,
    role: DeliveryEngineMeta.role,
    identity: DeliveryEngineMeta.identity,
    ...payload
  });
}

// ─────────────────────────────────────────────────────────────
// CORE DELIVERY ORGAN — v14‑IMMORTAL
// ─────────────────────────────────────────────────────────────
export const aiDeliveryEngine = {
  meta: DeliveryEngineMeta,

  // CORE DELIVERY LOGIC (meaning‑preserving cleanup)
  deliver(text) {
    if (!text || typeof text !== "string") {
      return "";
    }

    let output = text;

    // Remove excessive whitespace (but keep single spaces)
    output = output.replace(/\s+/g, " ");

    // Fix double punctuation
    output = output.replace(/\. \./g, ".");

    // Remove accidental trailing commas or periods (collapse runs)
    output = output.replace(/[,\.]+$/, (match) => match[0]);

    // Trim edges
    output = output.trim();

    return output;
  },

  // ADVANCED DELIVERY — STRUCTURE CLEANUP (line‑level)
  structure(text) {
    if (!text || typeof text !== "string") return "";

    return text
      .replace(/\n\s*\n\s*\n/g, "\n\n") // collapse triple+ newlines
      .replace(/–/g, "-")              // normalize en-dash
      .replace(/—/g, "-")              // normalize em-dash
      .trim();
  },

  // FINAL DELIVERY PIPELINE — idempotent, drift‑proof
  finalize(text) {
    const delivered = this.deliver(text);
    const structured = this.structure(delivered);

    return structured;
  }
};

// ─────────────────────────────────────────────────────────────
// DELIVERY ENGINE PREWARM — v14‑IMMORTAL
// ─────────────────────────────────────────────────────────────
export function prewarmDeliveryEngine() {
  try {
    const warmText = `
      This   is   a   prewarm   test.  .
      
      
      With --- dashes — and em-dashes.
    `;

    aiDeliveryEngine.deliver(warmText);
    aiDeliveryEngine.structure(warmText);
    aiDeliveryEngine.finalize(warmText);

    return emitDeliveryPacket("prewarm", {
      message: "Delivery engine prewarmed and formatting pathways aligned."
    });
  } catch (err) {
    console.error("[DeliveryEngine Prewarm] Failed:", err);
    return emitDeliveryPacket("prewarm-error", {
      error: String(err),
      message: "Delivery engine prewarm failed."
    });
  }
}

export default aiDeliveryEngine;

// ─────────────────────────────────────────────────────────────
// BOOT PREWARM + DUAL‑MODE EXPORTS
// ─────────────────────────────────────────────────────────────
prewarmDeliveryEngine();

if (typeof module !== "undefined") {
  module.exports = {
    DeliveryEngineMeta,
    aiDeliveryEngine,
    prewarmDeliveryEngine,
    default: aiDeliveryEngine
  };
}
