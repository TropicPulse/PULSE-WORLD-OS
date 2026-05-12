// ============================================================================
//  PulseEarnReflex-v24.0-Immortal-ADV-SUPERIOR.js
//  Side-Attached Earn Reflex (v24 Immortal-ADV-SUPERIOR + Advantage‑M24 + Chunk/Prewarm + 24++ Overlays)
//  Pure deterministic reflex builder (zero routing, zero sending, zero compute)
//  Binary-first A-B-A + DualHash + Presence/Advantage/Chunk surfaces (metadata-only) + 24++ Reflex Profiles
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// INTERNAL STATE
// ============================================================================
const reflexInstances = new Map();
let reflexCycle = 0;

const reflexHealing = {
  cycleCount: 0,

  lastReflexId: null,
  lastPulseId: null,
  lastOrgan: null,
  lastReason: null,

  lastBand: "symbolic",
  lastBandSignature: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastReflexSignature: null,
  lastDualHashField: null,
  lastHashIntellectSignature: null,

  // 24++ overlays
  lastReflexComputeProfile: null,
  lastReflexPressureProfile: null,
  lastReflexTriHeartField: null
};

// ============================================================================
// HELPERS
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(
    `${label}::${classicString || ""}`
  );
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function getPulseId(p) {
  return (
    p?.pulseId ||
    p?.id ||
    p?.tickId ||
    p?.jobId ||
    "UNKNOWN_PULSE"
  );
}

function getOrgan(e) {
  return e.organ || e.module || "UNKNOWN_ORGAN";
}

function getReason(e) {
  return e.reason || "unknown_reason";
}

function getReflexId(event, pulse) {
  return `${getPulseId(pulse)}::${getOrgan(event)}::${getReason(event)}`;
}

// ============================================================================
// A-B-A BINARY + WAVE (v24 Immortal-ADV-SUPERIOR)
// ============================================================================
function buildReflexBandBinaryWave(event, pulse, reflexId, cycleIndex, device) {
  const band = normalizeBand(
    event.band ||
    pulse?.band ||
    pulse?.meta?.band ||
    device?.band ||
    "symbolic"
  );

  const pulseLen = String(getPulseId(pulse)).length;
  const organLen = String(getOrgan(event)).length;
  const reasonLen = String(getReason(event)).length;
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;

  const surface = pulseLen + organLen + reasonLen + gpuScore + bandwidth + cycleIndex;

  const binaryField = {
    binaryReflexSignature: computeHash(`BREFLEX24::${reflexId}::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_RFX24::${surface}`),
    binarySurface: {
      pulseLen,
      organLen,
      reasonLen,
      gpuScore,
      bandwidth,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: organLen + reasonLen + gpuScore + bandwidth,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: organLen + gpuScore + bandwidth,
    wavelength: cycleIndex || 1,
    phase: (organLen + reasonLen + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  const bandSignature = computeHash(`BAND::REFLEX24::${band}::${cycleIndex}`);

  reflexHealing.lastBand = band;
  reflexHealing.lastBandSignature = bandSignature;
  reflexHealing.lastBinaryField = binaryField;
  reflexHealing.lastWaveField = waveField;

  return { band, bandSignature, binaryField, waveField };
}

// ============================================================================
// PRESENCE FIELD (v24 Immortal-ADV-SUPERIOR)
// ============================================================================
function buildPresenceField(event, pulse, device, cycleIndex) {
  const organLen = String(getOrgan(event)).length;
  const reasonLen = String(getReason(event)).length;
  const pulseLen = String(getPulseId(pulse)).length;
  const stability = device?.stabilityScore ?? 0.8;

  const magnitude = organLen + reasonLen + pulseLen;
  let presenceTier = "presence_idle";
  if (magnitude >= 60) presenceTier = "presence_high";
  else if (magnitude >= 20) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const presenceBand = normalizeBand(device?.presenceBand || device?.band || "symbolic");

  const presenceSignatureBase =
    `RFX_PRESENCE_V24::${presenceTier}::${organLen}::${reasonLen}::${pulseLen}::${cycleIndex}::${presenceBand}`;
  const presenceHash = computeHash(presenceSignatureBase);
  const presenceIntellect = computeHashIntelligence(presenceSignatureBase);

  const presenceField = {
    presenceVersion: "v24.0-Immortal-ADV-SUPERIOR",
    presenceTier,
    presenceBand,
    organLen,
    reasonLen,
    pulseLen,
    stability,
    cycleIndex,
    presenceSignature: presenceHash,
    presenceIntellectSignature: presenceIntellect
  };

  reflexHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// ADVANTAGE‑M24 FIELD (structural-only, richer surface)
// ============================================================================
function buildAdvantageField(event, pulse, device, bandPack, presenceField) {
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;
  const chunkBudgetKB = device?.chunkField?.chunkBudgetKB ?? 0;
  const cacheLines = device?.chunkField?.cacheLines ?? 0;
  const prewarmSlots = device?.chunkField?.prewarmSlots ?? 0;

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = presenceField.presenceTier;

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.000001 +
    (presenceTier === "presence_high" ? 0.01 : 0);

  const advantageField = {
    advantageVersion: "M-24.0-REFLEX",
    band: bandPack.band,
    presenceBand: presenceField.presenceBand,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore
  };

  reflexHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// CHUNK / CACHE / PREWARM PLAN (v24-AdvantageM)
// ============================================================================
function buildChunkPrewarmPlan(event, pulse, device, presenceField, advantageField) {
  let priorityLabel = "normal";
  if (presenceField.presenceTier === "presence_high") priorityLabel = "high";
  else if (presenceField.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (presenceField.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.05) priorityLabel = "high";
  else if (advantageField.advantageScore >= 0.02 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const planSurface =
    (device?.chunkField?.chunkBudgetKB ?? 0) +
    (device?.chunkField?.cacheLines ?? 0) * 2 +
    (device?.chunkField?.prewarmSlots ?? 0) * 3;

  const chunkPrewarmPlan = {
    planVersion: "v24.0-AdvantageM-Reflex",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    chunks: {
      reflexEnvelope: true,
      earnHandoff: true,
      reflexDiagnosticsEnvelope: true
    },
    cache: {
      reflexDiagnostics: true,
      deviceProfile: true,
      presenceAdvantageSnapshot: true
    },
    prewarm: {
      earnSystem: presenceField.presenceTier !== "presence_idle",
      reflexRouter: presenceField.presenceTier !== "presence_idle",
      nervousSystem: presenceField.presenceTier === "presence_high",
      muscleSystem: presenceField.presenceTier === "presence_high"
    }
  };

  reflexHealing.lastChunkPrewarmPlan = chunkPrewarmPlan;
  return chunkPrewarmPlan;
}

// ============================================================================
// 24++ REFLEX PROFILES (Compute / Pressure / Tri‑Heart)
// ============================================================================
function buildReflexComputeProfile(reflexId, bandPack, presenceField, advantageField) {
  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  let computeTier = "reflex_tier_low";
  const magnitude = density + amplitude;
  if (magnitude >= 800) computeTier = "reflex_tier_ultra";
  else if (magnitude >= 400) computeTier = "reflex_tier_high";
  else if (magnitude >= 150) computeTier = "reflex_tier_mid";

  const profile = {
    profileVersion: "REFLEX-COMPUTE-24++",
    reflexId,
    band: bandPack.band,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore: advantageField.advantageScore,
    computeTier
  };

  reflexHealing.lastReflexComputeProfile = profile;
  return profile;
}

function buildReflexPressureProfile(presenceField, advantageField) {
  const magnitude =
    (presenceField.organLen || 0) +
    (presenceField.reasonLen || 0) +
    (presenceField.pulseLen || 0) +
    (advantageField.advantageScore || 0) * 1000;

  let pressureTier = "reflex_pressure_idle";
  if (magnitude >= 300) pressureTier = "reflex_pressure_critical";
  else if (magnitude >= 200) pressureTier = "reflex_pressure_high";
  else if (magnitude >= 80) pressureTier = "reflex_pressure_elevated";
  else if (magnitude > 0) pressureTier = "reflex_pressure_soft";

  const profile = {
    profileVersion: "REFLEX-PRESSURE-24++",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    organLen: presenceField.organLen,
    reasonLen: presenceField.reasonLen,
    pulseLen: presenceField.pulseLen,
    advantageScore: advantageField.advantageScore
  };

  reflexHealing.lastReflexPressureProfile = profile;
  return profile;
}

function buildTriHeartField(presenceField, advantageField) {
  const tri = {
    triHeartVersion: "REFLEX-TRI-24++",
    liveness: {
      alive: true,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageScore > 0 ? 1 : 0,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: presenceField.presenceTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };

  reflexHealing.lastReflexTriHeartField = tri;
  return tri;
}

// ============================================================================
// REFLEX ORGANISM BUILDER (v24)
// ============================================================================
function buildReflexEarn(event, pulse, instanceContext) {
  const pulseId = getPulseId(pulse);
  const organ = getOrgan(event);
  const reason = getReason(event);

  const pattern = `EarnReflex:${organ}:${reason}`;
  const patternSignature = computeHash(pattern);
  const patternIntellectSignature = computeHashIntelligence(pattern);

  return {
    EarnRole: {
      kind: "EarnReflex",
      version: "24.0-Immortal-ADV-SUPERIOR",
      identity: "EarnReflex-v24.0-Immortal-ADV-SUPERIOR"
    },

    jobId: pulseId,
    pattern,
    patternSignature,
    patternIntellectSignature,

    payload: {
      pulseId,
      organ,
      reason,
      blocked: !!event.blocked,
      lineageDepth: event.lineageDepth,
      returnToDepth: event.returnToDepth,
      fallbackDepth: event.fallbackDepth,
      instanceContext,
      cycleIndex: reflexCycle,
      rawEvent: event
    },

    priority: "low",
    returnTo: null,
    lineage: [],

    meta: {
      reflex: true,
      origin: "PulseEarnReflex-v24.0-Immortal-ADV-SUPERIOR",
      sourceOrgan: organ,
      sourceReason: reason,
      sourcePulseId: pulseId,
      instanceContext,
      cycleIndex: reflexCycle,
      patternSignature,
      patternIntellectSignature
    }
  };
}

// ============================================================================
// REFLEX SIGNATURE + DUALHASH FIELD (v24)
// ============================================================================
function buildReflexSignatures(reflexId, presenceField, bandPack, advantageField) {
  const intelPayload = {
    reflexId,
    presenceTier: presenceField.presenceTier,
    band: bandPack.band,
    advantageScore: advantageField.advantageScore
  };

  const classicString =
    `REFLEX24::${reflexId}::${presenceField.presenceTier}::${bandPack.band}`;

  const dual = buildDualHashSignature("REFLEX24", intelPayload, classicString);

  const reflexSignature = dual.classic;
  const hashIntellectSignature = dual.intel;

  const dualHashField = {
    label: "REFLEX24",
    intelPayload,
    classicString,
    reflexSignature,
    hashIntellectSignature
  };

  reflexHealing.lastReflexSignature = reflexSignature;
  reflexHealing.lastDualHashField = dualHashField;
  reflexHealing.lastHashIntellectSignature = hashIntellectSignature;

  return { reflexSignature, dualHashField, hashIntellectSignature };
}

// ============================================================================
// PUBLIC API — FULL v24 Immortal-ADV-SUPERIOR REFLEX
// ============================================================================
export const PulseEarnReflex = {

  fromGovernorEvent(event, pulse, instanceContext, deviceProfile = {}) {
    reflexCycle++;
    reflexHealing.cycleCount++;

    const reflexId = getReflexId(event, pulse);

    let state = reflexInstances.get(reflexId);
    if (!state) {
      state = {
        reflexId,
        count: 0,
        firstSeenCycle: reflexCycle,
        lastSeenCycle: null
      };
      reflexInstances.set(reflexId, state);
    }

    state.count++;
    state.lastSeenCycle = reflexCycle;

    reflexHealing.lastReflexId = reflexId;
    reflexHealing.lastPulseId = getPulseId(pulse);
    reflexHealing.lastOrgan = getOrgan(event);
    reflexHealing.lastReason = getReason(event);

    const earnReflex = buildReflexEarn(event, pulse, instanceContext);

    const bandPack = buildReflexBandBinaryWave(
      event,
      pulse,
      reflexId,
      reflexCycle,
      deviceProfile
    );

    const presenceField = buildPresenceField(
      event,
      pulse,
      deviceProfile,
      reflexCycle
    );

    const advantageField = buildAdvantageField(
      event,
      pulse,
      deviceProfile,
      bandPack,
      presenceField
    );

    const chunkPrewarmPlan = buildChunkPrewarmPlan(
      event,
      pulse,
      deviceProfile,
      presenceField,
      advantageField
    );

    const { reflexSignature, dualHashField, hashIntellectSignature } =
      buildReflexSignatures(reflexId, presenceField, bandPack, advantageField);

    const reflexComputeProfile = buildReflexComputeProfile(
      reflexId,
      bandPack,
      presenceField,
      advantageField
    );

    const reflexPressureProfile = buildReflexPressureProfile(
      presenceField,
      advantageField
    );

    const reflexTriHeartField = buildTriHeartField(
      presenceField,
      advantageField
    );

    const diagnostics = {
      reflexId,
      pulseId: getPulseId(pulse),
      organ: getOrgan(event),
      reason: getReason(event),
      cycleIndex: reflexCycle,
      instanceCount: state.count,
      firstSeenCycle: state.firstSeenCycle,
      lastSeenCycle: state.lastSeenCycle,

      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,

      presenceField,
      advantageField,
      chunkPrewarmPlan,

      dualHashField,
      reflexSignature,
      hashIntellectSignature,

      reflexComputeProfile,
      reflexPressureProfile,
      reflexTriHeartField
    };

    return {
      ok: true,
      reflexId,
      state,
      instanceContext,
      diagnostics,
      reflexSignature,
      hashIntellectSignature,
      dualHashField,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan,
      reflexComputeProfile,
      reflexPressureProfile,
      reflexTriHeartField,
      earnReflex
    };
  },

  getReflexState(reflexId) {
    if (reflexId) return reflexInstances.get(reflexId) || null;
    return Array.from(reflexInstances.values());
  },

  getHealingState() {
    return { ...reflexHealing };
  }
};
