/**
 * ============================================================================
 *  PULSE-WORLD : PULSE-EXPANSION-BEACON-PRESENCE-v25-Civilization++.js
 *  ORGAN TYPE: Expansion / Beacon Presence Synthesizer
 *  VERSION: v25-Civilization++
 * ============================================================================
 *
 *  ROLE:
 *    BeaconPresence is the symbolic "town caller" organ.
 *    It takes a PulseMesh snapshot and synthesizes a high-level
 *    PRESENCE BEACON for PulseWorld:
 *
 *      - town / region presence
 *      - civilization tier
 *      - mesh pressure band
 *      - cost band
 *      - invite / caution / overload signals
 *      - persona / trust / tier hints
 *
 *    It does NOT:
 *      - route
 *      - send
 *      - execute
 *      - perform network or filesystem operations
 *      - depend on real time or randomness
 *
 *  CONTRACT:
 *    - Pure symbolic, deterministic, drift-proof.
 *    - Input: PulseMesh snapshot (v25-Civilization++).
 *    - Output: beaconPresence signal object.
 *    - No side effects, no mutation of input.
 */

export const BeaconPresenceMeta = Object.freeze({
  organId: "PulseExpansionBeaconPresence-v25-Civilization++",
  role: "EXPANSION_BEACON_PRESENCE",
  version: "v25-Civilization++",
  layer: "Expansion",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,

    meshAware: true,
    worldMeshAware: true,
    presenceAware: true,
    advantageAware: true,
    costAware: true,
    civilizationAware: true
  })
});

/**
 * Compute a simple band from a numeric index [0..100].
 */
function bandFromIndex(index) {
  if (index == null || Number.isNaN(index)) return "unknown";
  if (index < 20) return "low";
  if (index < 50) return "medium";
  if (index < 80) return "high";
  return "critical";
}

/**
 * Compute a cost band from meshCostIndex.
 */
function costBandFromIndex(index) {
  if (index == null || Number.isNaN(index)) return "unknown";
  if (index < 20) return "cheap";
  if (index < 50) return "moderate";
  if (index < 80) return "expensive";
  return "prohibitive";
}

/**
 * Decide invite / caution / overload mode based on pressure + cost.
 */
function computeBeaconMode({ pressureBand, costBand }) {
  if (pressureBand === "critical") return "overload";
  if (pressureBand === "high" && (costBand === "expensive" || costBand === "prohibitive")) {
    return "caution";
  }
  if (pressureBand === "low" && (costBand === "cheap" || costBand === "moderate")) {
    return "invite";
  }
  return "neutral";
}

/**
 * Decide a symbolic "townType" from civilizationTier + meshStrength.
 */
function computeTownType({ civilizationTier, meshStrength }) {
  const civ = civilizationTier || "void";
  const strength = meshStrength || "unknown";

  if (civ === "void") return "wilderness";
  if (civ === "outpost") return strength === "strong" ? "fortified-outpost" : "outpost";
  if (civ === "village") return strength === "strong" ? "village-hub" : "village";
  if (civ === "town") return strength === "strong" ? "trade-town" : "town";
  if (civ === "city") return strength === "strong" ? "capital-city" : "city";
  if (civ === "metropolis") return "mega-city";
  return "unknown";
}

/**
 * Decide a symbolic "beaconStrength" from meshStrength + pressureBand.
 */
function computeBeaconStrength({ meshStrength, pressureBand }) {
  if (meshStrength === "strong" && (pressureBand === "low" || pressureBand === "medium")) {
    return "high";
  }
  if (meshStrength === "stable" && pressureBand !== "critical") {
    return "medium";
  }
  if (meshStrength === "weak") {
    return "low";
  }
  return "unknown";
}

/**
 * Decide a trust hint from presenceField + advantageField.
 */
function computeTrustHint({ presenceField, advantageField }) {
  const trusted = presenceField?.trusted || "unknown";
  const identityTier = presenceField?.identityTier || "anon";
  const advantageScore = advantageField?.advantageScore ?? 0;

  let trustBand = "unknown";
  if (trusted === "true" || trusted === true) trustBand = "trusted";
  else if (trusted === "false" || trusted === false) trustBand = "untrusted";
  else trustBand = "neutral";

  let advantageHint = "neutral";
  if (advantageScore >= 80) advantageHint = "high";
  else if (advantageScore >= 40) advantageHint = "medium";
  else if (advantageScore > 0) advantageHint = "low";

  return Object.freeze({
    trustBand,
    identityTier,
    advantageHint
  });
}

/**
 * Factory — Beacon Presence v25-Civilization++
 *
 * Accepts a snapshot provider so this organ stays pure and symbolic.
 */
export function createBeaconPresence({ getMeshSnapshot, trace = false } = {}) {
  if (typeof getMeshSnapshot !== "function") {
    throw new Error("[BeaconPresence v25] getMeshSnapshot must be a function.");
  }

  const log = (...args) => trace && console.log("[BeaconPresence v25]", ...args);

  // Prewarm is symbolic only.
  function prewarm() {
    log("Prewarm: BeaconPresence v25++ symbolic prewarm.");
    return {
      ok: true,
      meta: {
        organId: BeaconPresenceMeta.organId,
        version: BeaconPresenceMeta.version,
        prewarmKind: "beacon-presence-v25-civilization"
      }
    };
  }

  /**
   * Core: buildBeaconPresenceSignal
   *
   * Reads the PulseMesh snapshot and synthesizes a high-level beaconPresence.
   */
  function buildBeaconPresenceSignal() {
    const snap = getMeshSnapshot();
    if (!snap || typeof snap !== "object") {
      return Object.freeze({
        ok: false,
        reason: "no-snapshot",
        beaconPresence: null
      });
    }

    const densityHealth = snap.densityHealth || {};
    const metrics = densityHealth.metrics || {};
    const presenceField = snap.presenceField || null;
    const advantageField = snap.advantageField || null;
    const worldMesh = snap.worldMesh || null;
    const costLane = snap.cost || null;
    const timeline = snap.timeline || null;

    const meshStrength = metrics.meshStrength || "unknown";
    const meshPressureIndex = metrics.meshPressureIndex ?? null;
    const pressureBand = bandFromIndex(meshPressureIndex);

    const meshCostIndex = costLane?.meshCostIndex ?? null;
    const costBand = costBandFromIndex(meshCostIndex);

    const civilizationTier = worldMesh?.civilizationTier || "void";

    const beaconMode = computeBeaconMode({ pressureBand, costBand });
    const townType = computeTownType({ civilizationTier, meshStrength });
    const beaconStrength = computeBeaconStrength({ meshStrength, pressureBand });
    const trustHint = computeTrustHint({ presenceField, advantageField });

    const beaconPresence = Object.freeze({
      organId: BeaconPresenceMeta.organId,
      version: BeaconPresenceMeta.version,

      regionID: snap.identity?.regionID || worldMesh?.regionID || null,
      meshID: snap.identity?.meshID || null,

      // world / civilization
      civilizationTier,
      townType,

      // mesh state
      meshStrength,
      meshPressureIndex,
      pressureBand,

      // cost state
      meshCostIndex,
      costBand,

      // beacon state
      beaconStrength,
      beaconMode, // invite / neutral / caution / overload

      // trust / persona hints
      trustBand: trustHint.trustBand,
      identityTier: trustHint.identityTier,
      advantageHint: trustHint.advantageHint,

      // presence hints
      bandPresence: presenceField?.bandPresence || "unknown",
      devicePresence: presenceField?.devicePresence || "unknown",
      bluetoothPresence: presenceField?.bluetoothPresence || "off",
      persona: presenceField?.persona || "neutral",
      touchMode: presenceField?.touchMode || "unknown",
      touchPage: presenceField?.touchPage || "unknown",

      // timeline (symbolic only)
      timeline: timeline
        ? {
            symbolicEpoch: timeline.symbolicEpoch,
            revision: timeline.revision,
            revisionReason: timeline.revisionReason
          }
        : null
    });

    return Object.freeze({
      ok: true,
      beaconPresence
    });
  }

  /**
   * Snapshot for this organ itself (meta + last computed beacon).
   * This organ is stateless; we just recompute on demand.
   */
  function getSnapshot() {
    const result = buildBeaconPresenceSignal();
    return Object.freeze({
      organId: BeaconPresenceMeta.organId,
      version: BeaconPresenceMeta.version,
      meta: BeaconPresenceMeta,
      lastBeaconPresence: result.beaconPresence,
      ok: result.ok
    });
  }

  return Object.freeze({
    meta: BeaconPresenceMeta,

    // guarantees
    guarantees: BeaconPresenceMeta.guarantees,

    // core
    buildBeaconPresenceSignal,

    // prewarm
    prewarm,

    // introspection
    getSnapshot
  });
}

export default createBeaconPresence;
