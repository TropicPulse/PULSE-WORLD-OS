/**
 * PulseOmniHosting-v16-Immortal-GPU+-CI.js
 * PULSE-FINALITY / PULSE-OMNIHOSTING
 *
 * ROLE:
 *   The universal hosting mesh for Pulse OS.
 *   Determines where an organism can run, replicate, or move.
 *   Provides deterministic failover and multi-instance placement.
 *
 *   v16-IMMORTAL-GPU+-CI:
 *     - GPU-aware, CI-aware, binary-delta-aware hosting physics
 *     - Host scoring + tiering (immortal/prime/standard/edge/cold)
 *     - Symbolic continuance band + CI surface hints
 *     - Symbolic binary-delta hints (no binary inspection)
 *     - Artery metrics for placement/failover load (pure compute)
 *
 * NEVER:
 *   - Never embed host-specific business logic.
 *   - Never use randomness.
 *   - Never mutate host descriptors.
 *   - Never call networks or filesystems.
 *
 * ALWAYS:
 *   - Always use PulseSchema as truth.
 *   - Always evaluate hosts deterministically.
 *   - Always produce reversible placement plans.
 *   - Always keep GPU/CI/binary-delta awareness symbolic only.
 *   - 16-Immortal+: expose presence/fallback/chunk/cache/prewarm/CI/continuance hints as symbolic fields only.
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseOmniHosting",
  version: "v16-Immortal-GPU+-CI",
  layer: "hosting",
  role: "omni_hosting_engine",
  lineage: "PulseOS-v14 → PulseOmniHosting-v12.3-Presence-Evo+ → v16-Immortal-GPU+-CI",

  evo: {
    hostingEngine: true,
    capabilityMatrix: true,
    placementPlanner: true,
    failoverPlanner: true,
    hostEligibility: true,
    hostTrendModeling: true,
    hostScoring: true,
    hostTiering: true,

    gpuAware: true,
    ciAware: true,
    binaryDeltaAware: true,
    continuanceAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseContinuance",
      "PulseSchema"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyOmniHosting"
    ]
  }
}
*/

// -------------------------
// META EXPORT
// -------------------------

export const PulseOmniHostingMeta = Object.freeze({
  layer: "PulseOmniHosting",
  role: "OMNIHOSTING_PHYSICS_ORGAN",
  version: "16-Immortal-GPU+-CI",
  identity: "PulseOmniHosting-v16-Immortal-GPU+-CI",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    hostAgnostic: true,
    multiInstanceReady: true,
    zeroBackend: true,
    zeroNetwork: true,
    reversiblePlacement: true,
    noRandomness: true,

    presenceAware: true,
    advantageAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,

    gpuAware: true,
    ciAware: true,
    continuanceAware: true,
    binaryDeltaAware: true,

    hostScoring: true,
    hostTiering: true,
    arteryMetrics: true,

    epoch: "16-Immortal-GPU+-CI"
  })
});

// -------------------------
// Host Descriptor
// -------------------------

export class HostDescriptor {
  constructor({
    name,
    type,
    region,
    capabilities = {},
    meta = {}
  }) {
    this.name = name;
    this.type = type;
    this.region = region;

    // v16: extended capability surface (still pure booleans)
    this.capabilities = {
      read: !!capabilities.read,
      write: !!capabilities.write,
      binary: !!capabilities.binary,
      compute: !!capabilities.compute,
      storage: !!capabilities.storage,

      // GPU / CI / AI / burst / premium flags are symbolic only
      gpu: !!capabilities.gpu,
      ci: !!capabilities.ci,           // compute-intelligence ready
      ai: !!capabilities.ai,           // generic AI-friendly host
      burst: !!capabilities.burst,     // burstable capacity
      premium: !!capabilities.premium  // higher SLA / cost tier
    };

    // meta is untouched, purely symbolic
    this.meta = meta;
  }
}

// -------------------------
// Capability Matrix
// -------------------------

export function buildCapabilityMatrix(hosts = []) {
  const matrix = {};

  for (const host of hosts) {
    matrix[host.name] = {
      type: host.type,
      region: host.region,
      capabilities: { ...host.capabilities },
      // v16: derived scoring + tiering (symbolic only)
      score: computeHostScore(host),
      tier: bucketHostTier(computeHostScore(host))
    };
  }

  return matrix;
}

// -------------------------
// Internal helpers (v16 scoring + hints)
// -------------------------

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeHostScore(host) {
  const c = host.capabilities || {};
  let score = 0;

  if (c.read) score += 0.05;
  if (c.write) score += 0.05;
  if (c.storage) score += 0.1;
  if (c.binary) score += 0.15;
  if (c.compute) score += 0.2;
  if (c.gpu) score += 0.2;
  if (c.ci) score += 0.15;
  if (c.ai) score += 0.05;
  if (c.burst) score += 0.03;
  if (c.premium) score += 0.02;

  return clamp01(score);
}

function bucketHostTier(score) {
  if (score >= 0.9) return "immortal";
  if (score >= 0.75) return "prime";
  if (score >= 0.5) return "standard";
  if (score > 0) return "edge";
  return "cold";
}

function computeFallbackBandLevelForPlacement(eligibleCount, minInstances) {
  if (eligibleCount === 0) return 3;
  if (eligibleCount <= minInstances) return 2;
  if (eligibleCount <= minInstances + 1) return 1;
  return 0;
}

function buildPlacementChunkHint(eligibleCount) {
  const max = 10;
  const ratio = Math.max(0, Math.min(1, eligibleCount / max));
  return { chunkAggression: 1 - ratio };
}

function buildPlacementCacheHint(eligibleCount) {
  let priority = "normal";
  if (eligibleCount <= 1) priority = "critical";
  else if (eligibleCount <= 2) priority = "high";
  else if (eligibleCount <= 4) priority = "medium";

  return {
    keepHot: eligibleCount <= 4,
    priority
  };
}

function buildPlacementPrewarmHint(eligibleCount) {
  if (eligibleCount <= 1) {
    return { shouldPrewarm: true, reason: "scarce_eligible_hosts" };
  }
  if (eligibleCount <= 3) {
    return { shouldPrewarm: true, reason: "limited_eligible_hosts" };
  }
  return { shouldPrewarm: false, reason: "sufficient_eligible_hosts" };
}

function computeFallbackBandLevelForFailover(targetCount) {
  if (targetCount === 0) return 3;
  if (targetCount === 1) return 2;
  if (targetCount === 2) return 1;
  return 0;
}

function buildFailoverChunkHint(targetCount) {
  const max = 10;
  const ratio = Math.max(0, Math.min(1, targetCount / max));
  return { chunkAggression: 1 - ratio };
}

function buildFailoverCacheHint(targetCount) {
  let priority = "normal";
  if (targetCount === 0) priority = "critical";
  else if (targetCount === 1) priority = "high";
  else if (targetCount === 2) priority = "medium";

  return {
    keepHot: targetCount <= 2,
    priority
  };
}

function buildFailoverPrewarmHint(targetCount) {
  if (targetCount === 0) {
    return { shouldPrewarm: true, reason: "no_failover_targets" };
  }
  if (targetCount === 1) {
    return { shouldPrewarm: true, reason: "single_failover_target" };
  }
  return { shouldPrewarm: false, reason: "multiple_failover_targets" };
}

// v16: continuance + CI + binary-delta symbolic hint builders

function bucketContinuanceBand(globalRisk = 0) {
  if (globalRisk >= 0.8) return 3;
  if (globalRisk >= 0.6) return 2;
  if (globalRisk >= 0.4) return 1;
  return 0;
}

function buildContinuanceHint(continuanceRiskReport) {
  if (!continuanceRiskReport) {
    return {
      globalRisk: 0,
      band: 0,
      notes: ["no_continuance_risk_report"]
    };
  }

  const globalRisk = clamp01(continuanceRiskReport.globalRisk ?? 0);
  const band = bucketContinuanceBand(globalRisk);

  return {
    globalRisk,
    band,
    notes: Array.isArray(continuanceRiskReport.notes)
      ? continuanceRiskReport.notes.slice()
      : []
  };
}

function buildCIHint(ciSurface) {
  if (!ciSurface) {
    return {
      ciActive: false,
      ciMode: "none",
      ciScore: 0
    };
  }

  return {
    ciActive: true,
    ciMode: ciSurface.mode || "unknown",
    ciScore: clamp01(ciSurface.ciScore ?? 1)
  };
}

function buildBinaryDeltaHint(binaryDeltaPacket) {
  if (!binaryDeltaPacket || !binaryDeltaPacket.delta) {
    return {
      deltaPresent: false,
      addedBits: 0,
      removedBits: 0,
      unchangedBits: 0
    };
  }

  const d = binaryDeltaPacket.delta;
  return {
    deltaPresent: true,
    addedBits: d.addedCount ?? 0,
    removedBits: d.removedCount ?? 0,
    unchangedBits: d.unchangedCount ?? 0
  };
}

function buildArteryMetrics({
  hostsCount,
  eligibleCount,
  minInstances,
  context = "placement"
}) {
  const total = Math.max(1, hostsCount);
  const eligibleRatio = clamp01(eligibleCount / total);
  const load = clamp01(eligibleCount / 1024);
  const pressure = clamp01(minInstances / Math.max(1, eligibleCount || 1));

  const loadBucket =
    load >= 0.9 ? "saturated" :
    load >= 0.7 ? "high" :
    load >= 0.4 ? "medium" :
    load > 0 ? "low" : "idle";

  const pressureBucket =
    pressure >= 0.9 ? "overload" :
    pressure >= 0.7 ? "high" :
    pressure >= 0.4 ? "medium" :
    pressure > 0 ? "low" : "none";

  return {
    context,
    hostsCount,
    eligibleCount,
    eligibleRatio,
    minInstances,
    load,
    loadBucket,
    pressure,
    pressureBucket
  };
}

// -------------------------
// Placement Logic
// -------------------------

/**
 * evaluateHostForSchema
 *
 * v16: still pure physics, but aware of optional schema meta:
 *   pulseSchema.meta?.requiresGPU
 *   pulseSchema.meta?.requiresCI
 *   pulseSchema.meta?.requiresBinary
 *   pulseSchema.meta?.requiresCompute
 */
export function evaluateHostForSchema(host, pulseSchema) {
  const fields = pulseSchema?.fields || {};
  const meta = pulseSchema?.meta || {};

  const requiresBinary =
    meta.requiresBinary === true ||
    Object.values(fields).some((f) => f.type === "binary");

  if (requiresBinary && !host.capabilities.binary) {
    return false;
  }

  const requiresCompute =
    meta.requiresCompute === true ||
    Object.values(fields).some(
      (f) => f.type === "object" || f.type === "array"
    );

  if (requiresCompute && !host.capabilities.compute) {
    return false;
  }

  const requiresGPU = meta.requiresGPU === true;
  if (requiresGPU && !host.capabilities.gpu) {
    return false;
  }

  const requiresCI = meta.requiresCI === true;
  if (requiresCI && !host.capabilities.ci) {
    return false;
  }

  return true;
}

/**
 * buildPlacementPlan
 *
 * v16 signature:
 *   buildPlacementPlan(hosts, pulseSchema, minInstances = 1, options = {})
 *
 * options (all symbolic, no physics mutation):
 *   - presenceContext
 *   - advantageContext
 *   - continuanceRiskReport (ContinuanceRiskReport)
 *   - ciSurface (compute-intelligence surface)
 *   - binaryDeltaPacket (aiBinaryDelta packet)
 */
export function buildPlacementPlan(
  hosts,
  pulseSchema,
  minInstances = 1,
  {
    presenceContext = {},
    advantageContext = {},
    continuanceRiskReport = null,
    ciSurface = null,
    binaryDeltaPacket = null
  } = {}
) {
  const eligible = hosts.filter((h) =>
    evaluateHostForSchema(h, pulseSchema)
  );

  // deterministic ordering
  eligible.sort((a, b) => a.name.localeCompare(b.name));

  const selected = eligible.slice(0, minInstances);

  const eligibleNames = eligible.map((h) => h.name);
  const selectedNames = selected.map((h) => h.name);

  const fallbackBandLevel = computeFallbackBandLevelForPlacement(
    eligibleNames.length,
    minInstances
  );
  const chunkHint = buildPlacementChunkHint(eligibleNames.length);
  const cacheHint = buildPlacementCacheHint(eligibleNames.length);
  const prewarmHint = buildPlacementPrewarmHint(eligibleNames.length);

  const continuanceHint = buildContinuanceHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  const artery = buildArteryMetrics({
    hostsCount: hosts.length,
    eligibleCount: eligibleNames.length,
    minInstances,
    context: "placement"
  });

  // v16: host scores + tiers snapshot (symbolic)
  const hostScores = {};
  const hostTiers = {};
  for (const h of hosts) {
    const score = computeHostScore(h);
    hostScores[h.name] = score;
    hostTiers[h.name] = bucketHostTier(score);
  }

  return {
    selectedHosts: selectedNames,
    eligibleHosts: eligibleNames,
    minInstances,
    schemaVersion: pulseSchema.version,

    // 12.3-Presence-Evo+ symbolic hints
    fallbackBandLevel,
    chunkHint,
    cacheHint,
    prewarmHint,

    // v16-Immortal-GPU+-CI symbolic surfaces
    presenceField: {
      band: presenceContext.band || "pulseband",
      deviceId: presenceContext.deviceId || null,
      hydraNodeId: presenceContext.hydraNodeId || null,
      route: presenceContext.route || "/"
    },
    advantageField: {
      advantageScore: advantageContext.advantageScore ?? 1.0,
      cascadeLevel: advantageContext.cascadeLevel ?? 0,
      timeSavedMs: advantageContext.timeSavedMs ?? 0
    },
    continuanceHint,
    ciHint,
    binaryDeltaHint,
    artery,

    hostScores,
    hostTiers
  };
}

// -------------------------
// Failover Logic
// -------------------------

/**
 * buildFailoverPlan
 *
 * v16 signature:
 *   buildFailoverPlan(hosts, pulseSchema, failedHostName, options = {})
 *
 * options:
 *   - presenceContext
 *   - advantageContext
 *   - continuanceRiskReport
 *   - ciSurface
 *   - binaryDeltaPacket
 */
export function buildFailoverPlan(
  hosts,
  pulseSchema,
  failedHostName,
  {
    presenceContext = {},
    advantageContext = {},
    continuanceRiskReport = null,
    ciSurface = null,
    binaryDeltaPacket = null
  } = {}
) {
  const remaining = hosts.filter((h) => h.name !== failedHostName);

  const eligible = remaining.filter((h) =>
    evaluateHostForSchema(h, pulseSchema)
  );

  eligible.sort((a, b) => a.name.localeCompare(b.name));

  const failoverTargets = eligible.map((h) => h.name);

  const fallbackBandLevel = computeFallbackBandLevelForFailover(
    failoverTargets.length
  );
  const chunkHint = buildFailoverChunkHint(failoverTargets.length);
  const cacheHint = buildFailoverCacheHint(failoverTargets.length);
  const prewarmHint = buildFailoverPrewarmHint(failoverTargets.length);

  const continuanceHint = buildContinuanceHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  const artery = buildArteryMetrics({
    hostsCount: hosts.length,
    eligibleCount: failoverTargets.length,
    minInstances: 1,
    context: "failover"
  });

  const hostScores = {};
  const hostTiers = {};
  for (const h of hosts) {
    const score = computeHostScore(h);
    hostScores[h.name] = score;
    hostTiers[h.name] = bucketHostTier(score);
  }

  return {
    failedHost: failedHostName,
    failoverTargets,
    schemaVersion: pulseSchema.version,

    // 12.3-Presence-Evo+ symbolic hints
    fallbackBandLevel,
    chunkHint,
    cacheHint,
    prewarmHint,

    // v16-Immortal-GPU+-CI symbolic surfaces
    presenceField: {
      band: presenceContext.band || "pulseband",
      deviceId: presenceContext.deviceId || null,
      hydraNodeId: presenceContext.hydraNodeId || null,
      route: presenceContext.route || "/"
    },
    advantageField: {
      advantageScore: advantageContext.advantageScore ?? 1.0,
      cascadeLevel: advantageContext.cascadeLevel ?? 0,
      timeSavedMs: advantageContext.timeSavedMs ?? 0
    },
    continuanceHint,
    ciHint,
    binaryDeltaHint,
    artery,

    hostScores,
    hostTiers
  };
}

// -------------------------
// Exported API
// -------------------------

const PulseOmniHostingAPI = {
  Meta: PulseOmniHostingMeta,
  HostDescriptor,
  buildCapabilityMatrix,
  evaluateHostForSchema,
  buildPlacementPlan,
  buildFailoverPlan
};

export default PulseOmniHostingAPI;
