// ============================================================================
//  PulseEarnReflexRouter-v16.0-Immortal-ADV.js
//  Reflex → Earn Synapse (v16 Immortal-ADV + Advantage‑M16 + Chunk/Prewarm)
//  Deterministic, Zero-Async, Zero-Routing, Zero-Sending
//  Pure Reflex → Earn Handoff with DualBand + DualHash + Presence surfaces
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnReflexRouter",
  version: "v16-Immortal-ADV",
  layer: "earn_reflex",
  role: "earn_reflex_router",
  lineage: "PulseEarnReflexRouter-v11 → v12.3 → v13 → v14-Immortal → v16-Immortal-ADV",

  evo: {
    reflexRouter: true,
    fastRouting: true,
    bypassLogic: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    dualHash: true,
    hashIntellectField: true,
    presenceAdvantageChunkUnified: true
  },

  contract: {
    always: [
      "PulseEarnReflex",
      "PulseEarnNervousSystem",
      "PulseEarnReceptorMkt"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseRole = {
  type: "Synapse",
  subsystem: "PulseEarnReflexRouter",
  layer: "B1-ReflexToEarn",
  version: "16.0-Immortal-ADV",
  identity: "PulseEarnReflexRouter-v16.0-Immortal-ADV",

  evo: {
    driftProof: true,
    deterministicField: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    reflexSynapse: true,
    reflexHandoffOnly: true,
    reflexDeterministic: true,
    reflexBandAware: true,
    reflexABASurface: true,
    reflexPresenceAware: true,
    reflexAdvantageAware: true,
    reflexChunkAware: true,

    dualHash: true,
    hashIntellectField: true,

    zeroTiming: true,
    zeroState: false,
    zeroMutation: true,
    zeroCompute: true,
    zeroRouting: true,
    zeroSending: true,
    zeroAsync: true,
    zeroRandomness: true,

    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    bandNormalizationAware: true,

    environmentAgnostic: true,
    multiInstanceReady: true
  }
};

export const PulseEarnReflexRouterMeta = Object.freeze({
  layer: "PulseEarnReflexRouter",
  role: "EARN_REFLEX_ROUTER_ORGAN",
  version: "v16.0-Immortal-ADV",
  identity: "PulseEarnReflexRouter-v16.0-Immortal-ADV",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureReflexSynapse: true,

    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    healingMetadataAware: true,

    dualHashAware: true,
    hashIntellectAware: true,

    zeroRouting: true,
    zeroSending: true,
    zeroCompute: true,
    zeroAsync: true,
    zeroUserCode: true,
    zeroMutation: true,
    zeroTiming: true,

    worldLensAware: false,
    multiInstanceReady: true,
    environmentAgnostic: true
  }),

  contract: Object.freeze({
    input: [
      "EarnReflexOrganism",
      "ReflexSliceContext",
      "DualBandContext",
      "DevicePhenotypePresence"
    ],
    output: [
      "ReflexRouterHandoff",
      "ReflexRouterDiagnostics",
      "ReflexRouterSignatures",
      "ReflexRouterHealingState",
      "ReflexRouterPresenceField",
      "ReflexRouterAdvantageField",
      "ReflexRouterChunkPrewarmPlan",
      "ReflexRouterBandBinaryWave",
      "ReflexRouterDualHashField"
    ]
  })
});

// ============================================================================
// INTERNAL STATE
// ============================================================================
const routedReflexes = new Map();
let reflexRouteCycle = 0;

const routerHealing = {
  cycleCount: 0,

  lastReflexId: null,
  lastPattern: null,
  lastLineageDepth: null,

  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastRouterSignature: null,
  lastDualHashField: null,
  lastHashIntellectSignature: null
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

function getOrCreateReflexRouteState(reflexId) {
  let state = routedReflexes.get(reflexId);
  if (!state) {
    state = {
      reflexId,
      count: 0,
      firstSeenCycle: reflexRouteCycle,
      lastSeenCycle: null
    };
    routedReflexes.set(reflexId, state);
  }
  return state;
}

function getReflexIdFromEarnReflex(earnReflex) {
  if (earnReflex?.meta?.reflexId) return earnReflex.meta.reflexId;
  const pulseId = earnReflex?.meta?.sourcePulseId || earnReflex?.payload?.pulseId || earnReflex?.jobId || "UNKNOWN_PULSE";
  const organ = earnReflex?.meta?.sourceOrgan || "UNKNOWN_ORGAN";
  const reason = earnReflex?.meta?.sourceReason || "unknown_reason";
  return `${pulseId}::${organ}::${reason}`;
}

// ============================================================================
// A‑B‑A BINARY + WAVE (v16 Immortal-ADV)
// ============================================================================
function buildRouteBandBinaryWave(earnReflex, reflexId, cycleIndex, device) {
  const pattern = earnReflex?.pattern || "NO_PATTERN";
  const band = normalizeBand(
    earnReflex?.meta?.band ||
    earnReflex?.band ||
    device?.band ||
    "symbolic"
  );

  const patternLen = pattern.length;
  const lineageDepth = earnReflex?.lineage?.length || 0;
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;

  const surface = patternLen + lineageDepth + gpuScore + bandwidth + cycleIndex;

  const binaryField = {
    binaryReflexSignature: computeHash(`BREFLEX_ROUTE16::${reflexId}::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_RFX_ROUTE16::${surface}`),
    binarySurface: {
      patternLen,
      lineageDepth,
      gpuScore,
      bandwidth,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: patternLen + lineageDepth + gpuScore + bandwidth,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: patternLen + gpuScore + bandwidth,
    wavelength: cycleIndex || 1,
    phase: (patternLen + lineageDepth + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  const bandSignature = computeHash(`BAND::REFLEX_ROUTER16::${band}::${cycleIndex}`);

  routerHealing.lastBand = band;
  routerHealing.lastBandSignature = bandSignature;
  routerHealing.lastBinaryField = binaryField;
  routerHealing.lastWaveField = waveField;

  return { band, bandSignature, binaryField, waveField };
}

// ============================================================================
// PRESENCE FIELD (v16 Immortal-ADV)
// ============================================================================
function buildPresenceField(earnReflex, device, cycleIndex) {
  const patternLen = (earnReflex?.pattern || "").length;
  const lineageDepth = earnReflex?.lineage?.length || 0;
  const stability = device?.stabilityScore ?? 0.8;

  const magnitude = patternLen + lineageDepth;
  let presenceTier = "presence_idle";
  if (magnitude >= 100) presenceTier = "presence_high";
  else if (magnitude >= 30) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const presenceBand = normalizeBand(device?.presenceBand || device?.band || "symbolic");

  const base =
    `RFX_ROUTER_PRESENCE_V16::${presenceTier}::${patternLen}::${lineageDepth}::${cycleIndex}::${presenceBand}`;
  const presenceSignature = computeHash(base);
  const presenceIntellectSignature = computeHashIntelligence(base);

  const presenceField = {
    presenceVersion: "v16.0-Immortal-ADV",
    presenceTier,
    presenceBand,
    patternLen,
    lineageDepth,
    stability,
    cycleIndex,
    presenceSignature,
    presenceIntellectSignature
  };

  routerHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// ADVANTAGE‑M16 FIELD (structural-only, richer surface)
// ============================================================================
function buildAdvantageField(earnReflex, device, bandPack, presenceField) {
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
    advantageVersion: "M-16.0-REFLEX-ROUTER",
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

  routerHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// CHUNK / CACHE / PREWARM PLAN (v16-AdvantageM)
// ============================================================================
function buildChunkPrewarmPlan(earnReflex, device, presenceField, advantageField) {
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
    planVersion: "v16.0-AdvantageM-ReflexRouter",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    chunks: {
      reflexEnvelope: true,
      earnHandoff: true,
      routerDiagnosticsEnvelope: true
    },
    cache: {
      reflexRouterDiagnostics: true,
      deviceProfile: true,
      presenceAdvantageSnapshot: true
    },
    prewarm: {
      nervousSystem: presenceField.presenceTier !== "presence_idle",
      receptorLayer: presenceField.presenceTier !== "presence_idle",
      earnSystem: presenceField.presenceTier === "presence_high"
    }
  };

  routerHealing.lastChunkPrewarmPlan = chunkPrewarmPlan;
  return chunkPrewarmPlan;
}

// ============================================================================
// DIAGNOSTICS (v16, with dualhash-aware fields)
// ============================================================================
function buildReflexDiagnostics(earnReflex, reflexId, state, bandPack, presenceField) {
  const pattern = earnReflex?.pattern || "NO_PATTERN";
  const lineageDepth = earnReflex?.lineage?.length || 0;

  return {
    reflexId,
    pattern,
    lineageDepth,
    cycleIndex: reflexRouteCycle,
    instanceCount: state.count,
    firstSeenCycle: state.firstSeenCycle,
    lastSeenCycle: state.lastSeenCycle,

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    reflexHash: computeHash(reflexId),
    cycleHash: computeHash(String(reflexRouteCycle)),

    band: bandPack.band,
    bandSignature: bandPack.bandSignature,
    binaryField: bandPack.binaryField,
    waveField: bandPack.waveField,

    presenceField
  };
}

// ============================================================================
// ROUTER SIGNATURE + DUALHASH FIELD
// ============================================================================
function buildRouterSignatures(reflexId, diagnostics, presenceField, bandPack, advantageField) {
  const base =
    `${reflexId}::${diagnostics.pattern}::${diagnostics.cycleIndex}` +
    `::${bandPack.band}::${presenceField.presenceTier}::${advantageField.advantageScore}`;
  const dual = buildDualHashSignature("REFLEX_ROUTER16", base);

  const routerSignature = dual.primary;
  const hashIntellectSignature = dual.intellect;

  const dualHashField = {
    label: "REFLEX_ROUTER16",
    basePayload: base,
    primarySignature: dual.primary,
    intellectSignature: dual.intellect,
    buildDualHashSignaturenature: dual.buildDualHashSignaturenature
  };

  routerHealing.lastRouterSignature = routerSignature;
  routerHealing.lastDualHashField = dualHashField;
  routerHealing.lastHashIntellectSignature = hashIntellectSignature;

  return { routerSignature, dualHashField, hashIntellectSignature };
}

// ============================================================================
// PUBLIC API — v16 Immortal-ADV Reflex Router
// ============================================================================
export const PulseEarnReflexRouter = {

  // Pure handoff builder: no routing/sending, just a deterministic envelope
  route(earnReflex, reflexSliceContext = {}, deviceProfile = {}) {
    reflexRouteCycle++;
    routerHealing.cycleCount++;

    if (!earnReflex || !earnReflex.meta?.reflex) {
      return {
        ok: false,
        reason: "invalid_reflex",
        reflex: earnReflex
      };
    }

    const reflexId = getReflexIdFromEarnReflex(earnReflex);
    const state = getOrCreateReflexRouteState(reflexId);
    state.count++;
    state.lastSeenCycle = reflexRouteCycle;

    routerHealing.lastReflexId = reflexId;
    routerHealing.lastPattern = earnReflex.pattern || null;
    routerHealing.lastLineageDepth = earnReflex.lineage?.length || 0;

    const bandPack = buildRouteBandBinaryWave(
      earnReflex,
      reflexId,
      reflexRouteCycle,
      deviceProfile
    );

    const presenceField = buildPresenceField(
      earnReflex,
      deviceProfile,
      reflexRouteCycle
    );

    const advantageField = buildAdvantageField(
      earnReflex,
      deviceProfile,
      bandPack,
      presenceField
    );

    const chunkPrewarmPlan = buildChunkPrewarmPlan(
      earnReflex,
      deviceProfile,
      presenceField,
      advantageField
    );

    const diagnostics = buildReflexDiagnostics(
      earnReflex,
      reflexId,
      state,
      bandPack,
      presenceField
    );

    const { routerSignature, dualHashField, hashIntellectSignature } =
      buildRouterSignatures(reflexId, diagnostics, presenceField, bandPack, advantageField);

    const handoff = {
      kind: "ReflexRouterHandoff",
      version: "16.0-Immortal-ADV",
      identity: "PulseEarnReflexRouter-v16.0-Immortal-ADV",
      reflexId,
      pattern: earnReflex.pattern,
      jobId: earnReflex.jobId,
      payload: earnReflex.payload,
      meta: {
        fromReflex: true,
        originReflexIdentity: earnReflex?.EarnRole?.identity,
        routerSignature,
        hashIntellectSignature,
        band: bandPack.band,
        bandSignature: bandPack.bandSignature,
        reflexSliceContext,
        cycleIndex: reflexRouteCycle
      }
    };

    return {
      ok: true,
      reflexId,
      handoff,
      diagnostics,
      routerSignature,
      hashIntellectSignature,
      dualHashField,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan
    };
  },

  getRoutedState(reflexId) {
    if (reflexId) return routedReflexes.get(reflexId) || null;
    return Array.from(routedReflexes.values());
  },

  getHealingState() {
    return { ...routerHealing };
  }
};
