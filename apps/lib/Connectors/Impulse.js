// ============================================================================
// FILE: /apps/lib/Connectors/Impulse.js
// LAYER: THE IMPULSE (Adaptive Traveler + Pattern Carrier)
// ============================================================================
//
// ROLE:
//   THE IMPULSE — The adaptive traveling signal of Pulse OS
//   • Fired by PulseBand (Nervous System)
//   • Moves through each layer sequentially
//   • Each layer attaches identity + state + delta
//   • Factors its energy (1/0, 1/2) per hop
//   • Adapts urgency based on environmental conditions (pattern-inspired)
//   • Returns to PulseBand with full organism snapshot
//
// CONTRACT:
//   • Pure traveler — no imports from PulseNet, PulseUpdate, PulseClient
//   • No business logic — pattern only
//   • Deterministic, drift-proof, organism-safe
//
// SAFETY:
//   • v6.3 upgrade is COMMENTAL + DIAGNOSTIC ONLY — NO LOGIC CHANGES
//   • All behavior remains identical to pre‑v6.3 impulse routing
// ============================================================================

// ============================================================================
// IMPULSE CONSTANTS
// ============================================================================
const IMPULSE_LAYER_ID = "IMPULSE-LAYER";
const IMPULSE_LAYER_NAME = "THE IMPULSE";
const IMPULSE_LAYER_ROLE = "Adaptive Traveler + Pattern Carrier";

const IMPULSE_DIAGNOSTICS_ENABLED =
  window?.PULSE_IMPULSE_DIAGNOSTICS === true ||
  window?.PULSE_DIAGNOSTICS === true;

const impulseLog = (stage, details = {}) => {
  if (!IMPULSE_DIAGNOSTICS_ENABLED) return;

  console.log(
    JSON.stringify({
      impulseLayer: IMPULSE_LAYER_ID,
      impulseName: IMPULSE_LAYER_NAME,
      impulseRole: IMPULSE_LAYER_ROLE,
      stage,
      ...details
    })
  );
};

impulseLog("IMPULSE_INIT", {});

// ============================================================================
// IMPULSE ENGINE
// ============================================================================
export const Impulse = {
  // --------------------------------------------------------------------------
  // Create a new impulse
  // --------------------------------------------------------------------------
  create(intent, payload = {}) {
    const tickId = Date.now() + "-" + Math.random().toString(36).slice(2);

    const impulse = {
      tickId,
      intent,
      payload,
      path: [],
      energy: 1,        // starts at full energy
      factor: 1,        // factoring multiplier
      urgency: 0,       // adaptive urgency (pattern-inspired)
      signature: "1010101" // forward genome
    };

    impulseLog("IMPULSE_CREATE", { tickId, intent });

    return impulse;
  },

  // --------------------------------------------------------------------------
  // Adaptive urgency (pattern-inspired environmental response)
  // --------------------------------------------------------------------------
  computeUrgency(layerState) {
    // This is NOT biological — it's a software pattern:
    // urgency increases when conditions degrade.
    let u = 0;

    if (layerState?.health === "Weak") u += 0.3;
    if (layerState?.health === "Critical") u += 0.6;
    if (layerState?.latency > 150) u += 0.2;
    if (layerState?.stability < 50) u += 0.3;

    return Math.min(1, u);
  },

  // --------------------------------------------------------------------------
  // Apply factoring (1/0, 1/2 pattern) + urgency modulation
  // --------------------------------------------------------------------------
  factorImpulse(impulse) {
    // Base factoring
    impulse.factor *= 0.5;
    impulse.energy *= impulse.factor;

    // Urgency slightly boosts retained energy (safe, bounded)
    if (impulse.urgency > 0) {
      impulse.energy += impulse.urgency * 0.1;
    }

    impulseLog("IMPULSE_FACTOR", {
      tickId: impulse.tickId,
      factor: impulse.factor,
      energy: impulse.energy,
      urgency: impulse.urgency
    });

    return impulse;
  },

  // --------------------------------------------------------------------------
  // Layer attaches identity + state + delta
  // --------------------------------------------------------------------------
  annotate(impulse, layerIdentity, layerState, delta) {
    impulse.urgency = this.computeUrgency(layerState);

    impulse.path.push({
      ...layerIdentity,
      state: layerState,
      delta,
      urgency: impulse.urgency,
      timestamp: Date.now()
    });

    impulseLog("IMPULSE_ANNOTATE", {
      tickId: impulse.tickId,
      layer: layerIdentity.id,
      urgency: impulse.urgency
    });

    return impulse;
  },

  // --------------------------------------------------------------------------
  // Return impulse to PulseBand
  // --------------------------------------------------------------------------
  returnToPulseBand(impulse) {
    impulse.signature = "1001101010101010101"; // return genome

    impulseLog("IMPULSE_RETURN", {
      tickId: impulse.tickId,
      hops: impulse.path.length
    });

    if (window?.PulseBand?.receiveImpulseReturn) {
      window.PulseBand.receiveImpulseReturn(impulse);
    }
  }
};
