// ============================================================================
// FILE: tropic-pulse-functions/PULSE-UNIVERSE/PULSE-EARN/PulseEarnMktEmbassyLedger-v24-IMMORTAL-INTEL++.js
// LAYER: THE EMBASSY LEDGER (v24‑IMMORTAL‑INTEL++)
// Marketplace Registry + Identity Verifier + Diplomatic Roster
// + Presence/Advantage/Chunk/Prewarm + DualHash Intel Signatures + GPU/Band Profile
// ============================================================================
//
// ROLE (v24‑IMMORTAL‑INTEL++):
//   The Embassy Ledger is the authoritative registry of all Pulse‑Earn marketplace
//   representatives. It validates identity, ensures deterministic readiness,
//   and emits unified v24 presence/advantage/chunk-prewarm surfaces for each adapter,
//   with dual-hash (classic + intel) signatures and GPU/band capability profiling.
//
// CONTRACT (v24‑IMMORTAL‑INTEL++):
//   • PURE REGISTRY — no async, no randomness, no timestamps.
//   • Deterministic validation + readiness surfaces only.
//   • Unified Earn v24 presence model (mesh/castle/region + adapter profile).
//   • DualHash intel signatures for adapters, roster, cycles, presence, advantage, chunk.
//   • Public API unchanged: marketplaces[], getHealingState().
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ---------------------------------------------------------------------------
// Imports — Deterministic Marketplace Representatives (v24 stack compatible)
// ---------------------------------------------------------------------------
// NOTE: these are expected to be v24‑IMMORTAL‑INTEL++ (or compatible) organs.
import { PulseEarnMktAmbassador } from "./PulseEarnMktAmbassador-v24.js"; // Akash
import { PulseEarnMktBroker } from "./PulseEarnMktBroker-v24.js";         // RunPod
import { PulseEarnMktForager } from "./PulseEarnMktForager-v24.js";       // Salad
import { PulseEarnMktCourier } from "./PulseEarnMktCourier-v24.js";       // Spheron
import { PulseEarnMktAuctioneer } from "./PulseEarnMktAuctioneer-v24.js"; // Vast

// ---------------------------------------------------------------------------
// DualHash Helpers — Classic + Intel (v24‑IMMORTAL‑INTEL++)
// ---------------------------------------------------------------------------
function computeClassicHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeIntelHash(payload) {
  const s = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function dualSig(label, intelPayload, classicString) {
  return {
    intel: computeIntelHash({ label, intelPayload, classicString }),
    classic: computeClassicHash(`${label}::${classicString}`)
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ---------------------------------------------------------------------------
// Adapter Capability Profiling (GPU/Band awareness, deterministic)
// ---------------------------------------------------------------------------
function inferAdapterProfile(adapter) {
  const id = adapter?.id || "";
  const name = adapter?.name || "";

  const lowerId = id.toLowerCase();
  const lowerName = name.toLowerCase();

  const gpuCapable =
    lowerId.includes("runpod") ||
    lowerId.includes("vast") ||
    lowerId.includes("akash") ||
    lowerId.includes("spheron") ||
    lowerId.includes("salad") ||
    lowerName.includes("gpu") ||
    lowerName.includes("compute");

  // symbolic default, but allow adapter to expose a preferred band
  const preferredBand =
    normalizeBand(adapter?.defaultBand || adapter?.band || "symbolic");

  const marketplaceKind =
    lowerId.includes("runpod") ? "runpod" :
    lowerId.includes("vast") ? "vast" :
    lowerId.includes("akash") ? "akash" :
    lowerId.includes("spheron") ? "spheron" :
    lowerId.includes("salad") ? "salad" :
    "generic";

  return {
    gpuCapable,
    preferredBand,
    marketplaceKind
  };
}

// ---------------------------------------------------------------------------
// Classic Signatures (backwards compatible)
// ---------------------------------------------------------------------------
function buildAdapterSignatureClassic(name) {
  return computeClassicHash(`ADAPTER::${name}`);
}

function buildRosterSignatureClassic(list) {
  return computeClassicHash(`ROSTER::${list.join("|")}`);
}

function buildCycleSignatureClassic(cycle) {
  return computeClassicHash(`EMBASSY_CYCLE::${cycle}`);
}

// ---------------------------------------------------------------------------
// Unified Earn v24 Presence Tier
// ---------------------------------------------------------------------------
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ---------------------------------------------------------------------------
// Unified v24 Presence Field for Adapters (with DualHash + GPU profile)
// ---------------------------------------------------------------------------
function buildAdapterPresenceField(name, adapter, cycleIndex, globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const idLen = (adapter?.id || "").length;
  const roleLen = (adapter?.name || "").length;

  const profile = inferAdapterProfile(adapter);

  const internalComposite =
    idLen * 0.001 +
    roleLen * 0.001 +
    cycleIndex * 0.0001 +
    (profile.gpuCapable ? 0.01 : 0);

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "embassyAdapterPresence",
    version: "v24-IMMORTAL-INTEL++",
    adapterName: name,
    adapterId: adapter?.id || null,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    roleLen,
    cycleIndex,
    gpuCapable: profile.gpuCapable,
    preferredBand: profile.preferredBand,
    marketplaceKind: profile.marketplaceKind
  };

  const classicString =
    `EMBASSY_PRESENCE::${name}::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = dualSig("EMBASSY_ADAPTER_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL++",
    presenceTier,

    adapterName: name,
    adapterId: adapter?.id || null,

    bandPresence: ghP.bandPresence || profile.preferredBand || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "embassy",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "embassy-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "embassy-region",
    castleId: castle.castleId || "embassy-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    idLen,
    roleLen,
    cycleIndex,

    gpuCapable: profile.gpuCapable,
    preferredBand: profile.preferredBand,
    marketplaceKind: profile.marketplaceKind,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ---------------------------------------------------------------------------
// Unified v24 Advantage‑C for Adapters (with DualHash + GPU/Band)
// ---------------------------------------------------------------------------
function buildAdapterAdvantageField(name, adapter, band, cycleIndex, presenceField, globalHints = {}) {
  const hasPing = typeof adapter?.ping === "function";
  const hasFetch = typeof adapter?.fetchJobs === "function";
  const hasSubmit = typeof adapter?.submitResult === "function";

  const methodScore = (hasPing ? 1 : 0) + (hasFetch ? 1 : 0) + (hasSubmit ? 1 : 0);

  const profile = inferAdapterProfile(adapter);
  const bandNorm = normalizeBand(band || profile.preferredBand || "symbolic");

  const bandScore = bandNorm === "binary" ? 2 : 1;
  const gpuScore = profile.gpuCapable ? 2 : 0;

  const baseScore =
    methodScore * 0.01 +
    bandScore * 0.007 +
    gpuScore * 0.01 +
    cycleIndex * 0.0001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "embassyAdapterAdvantage",
    version: "C-24.0",
    adapterName: name,
    adapterId: adapter?.id || null,
    band: bandNorm,
    methodScore,
    bandScore,
    gpuScore,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    presenceTier: presenceField.presenceTier,
    gpuCapable: profile.gpuCapable,
    marketplaceKind: profile.marketplaceKind
  };

  const classicString =
    `EMBASSY_ADVANTAGE::${name}::${presenceField.presenceTier}::${advantageTier}`;

  const sig = dualSig("EMBASSY_ADAPTER_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    adapterName: name,
    adapterId: adapter?.id || null,
    band: bandNorm,
    methodScore,
    bandScore,
    gpuScore,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    gpuCapable: profile.gpuCapable,
    marketplaceKind: profile.marketplaceKind,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ---------------------------------------------------------------------------
// Unified v24 Chunk/Prewarm Plan for Adapters (with DualHash + GPU/Band)
// ---------------------------------------------------------------------------
function buildAdapterChunkPrewarmPlan(name, adapter, presenceField, advantageField) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const gpuBoost = advantageField.gpuCapable ? 1 : 0;

  const priority = basePriority + advantageBoost + gpuBoost;

  const intelPayload = {
    kind: "embassyAdapterChunkPlan",
    version: "v24-Embassy-AdvantageC",
    adapterName: name,
    adapterId: adapter?.id || null,
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    gpuCapable: advantageField.gpuCapable,
    marketplaceKind: advantageField.marketplaceKind
  };

  const classicString =
    `EMBASSY_CHUNK_PLAN::${name}::${presenceField.presenceTier}::${priority}`;

  const sig = dualSig("EMBASSY_ADAPTER_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v24-Embassy-AdvantageC",
    adapterName: name,
    adapterId: adapter?.id || null,
    priority,
    band: presenceField.presenceTier,
    chunks: {
      adapterEnvelope: true,
      adapterCapabilities: true,
      adapterBandMetadata: true,
      adapterGpuProfile: true
    },
    cache: {
      rosterEntry: true,
      adapterPresence: true,
      adapterAdvantage: true,
      adapterGpuAffinity: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      foragerLayer: true,
      lymphNodes: true,
      brokerLayer: true,
      ambassadorLayer: true,
      auctioneerLayer: true,
      courierLayer: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ---------------------------------------------------------------------------
// Healing Metadata — v24‑IMMORTAL‑INTEL++
// ---------------------------------------------------------------------------
const embassyHealing = {
  version: "v24-IMMORTAL-INTEL++",

  adaptersLoaded: [],
  missingAdapters: [],
  invalidAdapters: [],
  cycleCount: 0,
  lastCycleIndex: null,

  lastAdapterSignatureClassic: null,
  lastAdapterSignatureIntel: null,
  lastRosterSignatureClassic: null,
  lastRosterSignatureIntel: null,
  lastCycleSignatureClassic: null,
  lastCycleSignatureIntel: null,

  adapterPresence: {},
  adapterAdvantage: {},
  adapterChunkPlan: {}
};

let embassyCycle = 0;

// ---------------------------------------------------------------------------
// Adapter Validation (Unified v24 Presence + DualHash + GPU profile)
// ---------------------------------------------------------------------------
function validateAdapter(name, adapter, globalHints = {}) {
  embassyCycle++;
  embassyHealing.cycleCount++;
  embassyHealing.lastCycleIndex = embassyCycle;

  const cycleSig = dualSig(
    "EMBASSY_CYCLE",
    { cycleIndex: embassyCycle, adapterName: name },
    `EMBASSY_CYCLE::${embassyCycle}::${name}`
  );
  embassyHealing.lastCycleSignatureClassic = cycleSig.classic;
  embassyHealing.lastCycleSignatureIntel = cycleSig.intel;

  if (!adapter) {
    embassyHealing.missingAdapters.push(name);
    return false;
  }

  const required = ["ping", "fetchJobs", "submitResult"];
  const missing = required.filter(fn => typeof adapter[fn] !== "function");

  if (missing.length > 0) {
    embassyHealing.invalidAdapters.push({ adapter: name, missingMethods: missing });
    return false;
  }

  embassyHealing.adaptersLoaded.push(name);

  const adapterSigClassic = buildAdapterSignatureClassic(name);
  const adapterSigIntel = computeIntelHash({
    label: "EMBASSY_ADAPTER",
    name,
    id: adapter?.id || null,
    version: adapter?.version || null
  });

  embassyHealing.lastAdapterSignatureClassic = adapterSigClassic;
  embassyHealing.lastAdapterSignatureIntel = adapterSigIntel;

  const profile = inferAdapterProfile(adapter);
  const band = normalizeBand(adapter.bandSignature || profile.preferredBand || "symbolic");

  const presenceField = buildAdapterPresenceField(name, adapter, embassyCycle, globalHints);
  const advantageField = buildAdapterAdvantageField(
    name,
    adapter,
    band,
    embassyCycle,
    presenceField,
    globalHints
  );
  const chunkPlan = buildAdapterChunkPrewarmPlan(name, adapter, presenceField, advantageField);

  embassyHealing.adapterPresence[name] = presenceField;
  embassyHealing.adapterAdvantage[name] = advantageField;
  embassyHealing.adapterChunkPlan[name] = chunkPlan;

  return true;
}

// ---------------------------------------------------------------------------
// Validate All Marketplace Representatives (v24 stack)
// ---------------------------------------------------------------------------
validateAdapter("PulseEarnMktAmbassador",  PulseEarnMktAmbassador);
validateAdapter("PulseEarnMktBroker",      PulseEarnMktBroker);
validateAdapter("PulseEarnMktForager",     PulseEarnMktForager);
validateAdapter("PulseEarnMktCourier",     PulseEarnMktCourier);
validateAdapter("PulseEarnMktAuctioneer",  PulseEarnMktAuctioneer);

// ---------------------------------------------------------------------------
/** Deterministic Marketplace Roster (unchanged external shape) */
// ---------------------------------------------------------------------------
const marketplaces = [
  PulseEarnMktAmbassador,
  PulseEarnMktBroker,
  PulseEarnMktForager,
  PulseEarnMktCourier,
  PulseEarnMktAuctioneer
];

const rosterIds = marketplaces.map(m => m.id || "unknown");

const rosterSigClassic = buildRosterSignatureClassic(rosterIds);
const rosterSigIntel = computeIntelHash({
  label: "EMBASSY_ROSTER",
  ids: rosterIds,
  version: "v24-IMMORTAL-INTEL++"
});

embassyHealing.lastRosterSignatureClassic = rosterSigClassic;
embassyHealing.lastRosterSignatureIntel = rosterSigIntel;

// ---------------------------------------------------------------------------
// Healing State Accessor
// ---------------------------------------------------------------------------
function getPulseEarnMktEmbassyHealingState() {
  return { ...embassyHealing };
}

// ---------------------------------------------------------------------------
// Exported API (unchanged external shape)
// ---------------------------------------------------------------------------
export const PulseEarnMktEmbassyLedger = {
  marketplaces,
  getHealingState: getPulseEarnMktEmbassyHealingState
};
