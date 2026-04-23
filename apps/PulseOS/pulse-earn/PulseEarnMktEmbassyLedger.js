// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktEmbassyLedger.js
// LAYER: THE EMBASSY LEDGER (v10.4)
// (Marketplace Registry + Identity Verifier + Diplomatic Roster)
// ============================================================================
//
// ROLE (v10.4):
//   THE EMBASSY LEDGER — The official registry of all Pulse‑Earn marketplace
//   representatives. Maintains a deterministic roster of foreign marketplace
//   agents (Ambassador, Broker, Forager, Courier, Auctioneer).
//
// CONTRACT (v10.4):
//   • PURE REGISTRY — no AI layers, no translation, no memory model.
//   • NO async, NO timestamps, NO nondeterminism.
//   • Deterministic validation only.
// ============================================================================


// ---------------------------------------------------------------------------
// Imports — Deterministic Marketplace Representatives
// ---------------------------------------------------------------------------
import { PulseEarnMktAmbassador } from "./PulseEarnMktAmbassador.js";   // Akash
import { RunPodAdapter } from "./RunPodAdapter.js";                     // RunPod
import { PulseEarnMktForager } from "./PulseEarnMktForager.js";         // Salad
import { PulseEarnMktCourier } from "./PulseEarnMktCourier.js";         // Spheron
import { PulseEarnMktAuctioneer } from "./PulseEarnMktAuctioneer.js";   // Vast


// ---------------------------------------------------------------------------
// Healing Metadata — Embassy Ledger Integrity Log (deterministic)
// ---------------------------------------------------------------------------
const embassyHealing = {
  adaptersLoaded: [],
  missingAdapters: [],
  invalidAdapters: [],
  cycleCount: 0,
  lastCycleIndex: null
};

// Deterministic cycle counter
let embassyCycle = 0;


// ---------------------------------------------------------------------------
// Adapter Validation — Diplomatic Credential Check
// ---------------------------------------------------------------------------
function validateAdapter(name, adapter) {
  embassyCycle++;
  embassyHealing.cycleCount++;
  embassyHealing.lastCycleIndex = embassyCycle;

  if (!adapter) {
    embassyHealing.missingAdapters.push(name);
    return false;
  }

  const required = ["ping", "fetchJobs", "submitResult"];
  const missing = required.filter(fn => typeof adapter[fn] !== "function");

  if (missing.length > 0) {
    embassyHealing.invalidAdapters.push({
      adapter: name,
      missingMethods: missing
    });
    return false;
  }

  embassyHealing.adaptersLoaded.push(name);
  return true;
}


// ---------------------------------------------------------------------------
// Validate All Marketplace Representatives (v10.4‑correct)
// ---------------------------------------------------------------------------
validateAdapter("PulseEarnMktAmbassador",  PulseEarnMktAmbassador);  // Akash
validateAdapter("RunPodAdapter",          RunPodAdapter);           // RunPod
validateAdapter("PulseEarnMktForager",    PulseEarnMktForager);     // Salad
validateAdapter("PulseEarnMktCourier",    PulseEarnMktCourier);     // Spheron
validateAdapter("PulseEarnMktAuctioneer", PulseEarnMktAuctioneer);  // Vast


// ---------------------------------------------------------------------------
// Deterministic Marketplace Roster (v10.4‑correct)
// ---------------------------------------------------------------------------
const marketplaces = [
  PulseEarnMktAmbassador,   // Akash — Ambassador
  RunPodAdapter,            // RunPod — Broker
  PulseEarnMktForager,      // Salad — Forager
  PulseEarnMktCourier,      // Spheron — Courier
  PulseEarnMktAuctioneer    // Vast — Auctioneer
];


// ---------------------------------------------------------------------------
// Healing State Accessor
// ---------------------------------------------------------------------------
function getPulseEarnMktEmbassyHealingState() {
  return { ...embassyHealing };
}


// ============================================================================
// Exported API — EMBASSY LEDGER (Diplomatic Roster)
// ============================================================================
export const PulseEarnMktEmbassyLedger = {
  marketplaces,
  getHealingState: getPulseEarnMktEmbassyHealingState
};
