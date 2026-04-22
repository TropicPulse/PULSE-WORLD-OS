// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktEmbassyLedger.js
// LAYER: THE EMBASSY LEDGER
// (Marketplace Registry + Identity Verifier + Diplomatic Roster)
// PULSE EARN — v9.x
// ============================================================================
//
// ROLE (v9.x):
//   THE EMBASSY LEDGER — The official registry of all Pulse‑Earn marketplace
//   representatives. Maintains a deterministic roster of foreign marketplace
//   agents (Broker, Forager, Auctioneer).
//
// PURPOSE (v9.x):
//   • Provide Earn Engine with a clean, stable list of marketplace receptors
//   • Validate adapter identity + required capabilities
//   • Maintain healing metadata for adapter integrity
//   • Serve as the diplomatic ledger of all external compute markets
//
// CONTRACT (unchanged):
//   • PURE REGISTRY — no AI layers, no translation, no memory model
//   • READ‑ONLY except for healing metadata
//   • NO eval(), NO Function(), NO dynamic imports
//   • Deterministic validation only
//
// SAFETY (unchanged):
//   • v9.x upgrade is COMMENTAL / IDENTITY ONLY — NO LOGIC CHANGES
// ============================================================================


// ---------------------------------------------------------------------------
// Imports — Marketplace Representatives (Organism‑Aligned)
// ---------------------------------------------------------------------------
// import { PulseEarnMktAmbassador } from "./PulseEarnMktAmbassador.js"; // Akash — Ambassador (removed)
import { RunPodAdapter } from "./PulseEarnMktBroker.js";           // RunUp — Broker
import { PulseEarnMktForager } from "./PulseEarnMktForager.js";         // Salad — Forager
// import { SpheronAdapter } from "./PulseEarnMktCourier.js";            // Spheron — Courier (removed)
import { PulseEarnMktAuctioneer } from "./PulseEarnMktAuctioneer.js";   // Vast — Auctioneer


// ---------------------------------------------------------------------------
// Healing Metadata — Embassy Ledger Integrity Log
// ---------------------------------------------------------------------------
const embassyHealing = {
  adaptersLoaded: [],
  missingAdapters: [],
  invalidAdapters: [],
  cycleCount: 0,
};


// ---------------------------------------------------------------------------
// Adapter Validation — Diplomatic Credential Check
// ---------------------------------------------------------------------------
function validateAdapter(name, adapter) {
  embassyHealing.cycleCount++;

  if (!adapter) {
    embassyHealing.missingAdapters.push(name);
    return false;
  }

  const required = ["ping", "fetchJobs", "submitResult"];
  const missing = required.filter(fn => typeof adapter[fn] !== "function");

  if (missing.length > 0) {
    embassyHealing.invalidAdapters.push({
      adapter: name,
      missingMethods: missing,
    });
    return false;
  }

  embassyHealing.adaptersLoaded.push(name);
  return true;
}


// ---------------------------------------------------------------------------
// Validate All Marketplace Representatives (v9.x‑correct)
// ---------------------------------------------------------------------------
validateAdapter("PulseEarnMktAuctioneer", PulseEarnMktAuctioneer); // Vast
validateAdapter("PulseEarnMktBroker",     RunPodAdapter);     // RunUp
validateAdapter("PulseEarnMktForager",    PulseEarnMktForager);    // Salad


// ---------------------------------------------------------------------------
// Deterministic Marketplace Roster (v9.x‑correct)
// ---------------------------------------------------------------------------
const marketplaces = [
  PulseEarnMktAuctioneer,   // Vast — Auctioneer
  RunPodAdapter,       // RunUp — Broker
  PulseEarnMktForager,      // Salad — Forager
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
