// ============================================================================
//  FILE: PulseSend-v24-IMMORTAL-ORGANISM.js — PulseSend Organism v24++
//  Evolutionary Transport Organ • Pattern + Lineage + Shape • SDN + Mesh-Aware
//  12.3: Fallback / Movement / Route / Pathway / Return surfaces
//        + cacheChunkSurface + prewarmSurface + presenceSurface
//  16.0: IMMORTAL-INTEL (pulseIntelligence)
//  20.0: Mesh Signal Factoring awareness (meshFactoringSurface passthrough)
//  24++: Binary-first band, dual-band presence, advantage + factoring fabric,
//        burst modes (bluetoothBurst / powerBurst) + techSurface v2
//        + deterministic IMMORTAL meta surfaces across the chain.
// ============================================================================
//
//  SAFETY CONTRACT (v24-IMMORTAL-ORGANISM):
//  ----------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external IO.
//  • Pure deterministic transport chain.
//  • Zero mutation outside instance.
//  • Metadata-only intelligence + factoring surfaces.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// --- Evolution Engines ------------------------------------------------------
// v24++: binary-first shifter (SymPulse v16-IMMORTAL-INTEL upgraded usage)
import {
  createSymPulseV2 as PulseV2SymShifter
} from "../PULSE-SHIFTER/PulseShifterEvolutionaryPulse-v24.js";

// keep v3 / legacy stack for compatibility
import { createPulseV3 as PulseV3UnifiedOrganism }  from "./PulseSendV3UnifiedOrganism-v24.js";
import { createPulseV2 as PulseV2EvolutionEngine }  from "./PulseSendV2EvolutionEngine-v24.js";

// --- Impulse Layer ----------------------------------------------------------
import { createPulseSendImpulse as PulseSendImpulse } from "./PulseSendImpulse-v24.js";

// --- Legacy Pulse Layer -----------------------------------------------------
import { createLegacyPulse as PulseSendLegacyPulse } from "./PulseSendLegacyPulse-v24.js";

// --- Adapter Layer ----------------------------------------------------------
import { adaptPulseSendPacket as PulseSendAdapter } from "./PulseSendAdapter-v24.js";

// --- Engine Layer -----------------------------------------------------------
import { PulseSendMover as PulseSendEngine } from "./PulseSendEngine-v24.js";

// --- Return Layer -----------------------------------------------------------
import { createPulseSendReturn as PulseSendReturn } from "./PulseSendReturn-v24.js";

// --- System Layer (Final Conductor) ----------------------------------------
import { createPulseSendSystem as PulseSendSystem } from "./PulseSendSystem.js";

// --- Mesh Factoring (awareness only, optional) -----------------------------
import {
  applyMeshSignalFactoring
} from "../PULSE-MESH/PulseMeshSignalFactoring-v24.js";

// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================
function computeHash(str) {
  const s = String(str || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

// ============================================================================
//  DUAL HASH — v24 IMMORTAL (symbolic/binary, backed by computeHash)
// ============================================================================
function computeDualHash(label, payload) {
  const raw = label + "::" + stableStringify(payload || {});
  const primary = computeHash(raw);
  const secondary = computeHash(primary + "::" + label);
  return { primary, secondary };
}

function buildFallbackSurface(type, error) {
  const shape = {
    fallbackType: type,
    errorMessage: error ? String(error) : null
  };
  const dual = computeDualHash("FALLBACK_SURFACE", shape);
  return {
    ...shape,
    fallbackDualHashPrimary: dual.primary,
    fallbackDualHashSecondary: dual.secondary
  };
}

function buildSendDiagnostics({ jobId, pattern, mode, pulseType, bandMode }) {
  const shape = {
    jobId,
    patternLength: (pattern || "").length,
    mode,
    pulseType,
    bandMode: bandMode || "binary"
  };
  const patternHash = computeHash(pattern || "");
  const modeHash = computeHash(mode || "normal");
  const bandHash = computeHash(bandMode || "binary");
  const dual = computeDualHash("SEND_DIAGNOSTICS", shape);
  return {
    ...shape,
    patternHash,
    modeHash,
    bandHash,
    diagnosticsDualHashPrimary: dual.primary,
    diagnosticsDualHashSecondary: dual.secondary
  };
}

function buildMovementSurface(movement) {
  if (!movement || !movement.packet) {
    const shape = {
      hasPacket: false,
      movementSignature: "NO_PACKET"
    };
    const dual = computeDualHash("MOVEMENT_SURFACE", shape);
    return {
      ...shape,
      movementDualHashPrimary: dual.primary,
      movementDualHashSecondary: dual.secondary
    };
  }

  const raw = JSON.stringify(movement.packet);
  const shape = {
    hasPacket: true,
    movementSignature: computeHash(raw)
  };
  const dual = computeDualHash("MOVEMENT_SURFACE", shape);
  return {
    ...shape,
    movementDualHashPrimary: dual.primary,
    movementDualHashSecondary: dual.secondary
  };
}

function buildRouteSurface(targetOrgan) {
  const raw = JSON.stringify(targetOrgan || {});
  const shape = {
    targetOrgan,
    routeSignature: computeHash(raw)
  };
  const dual = computeDualHash("ROUTE_SURFACE", shape);
  return {
    ...shape,
    routeDualHashPrimary: dual.primary,
    routeDualHashSecondary: dual.secondary
  };
}

function buildPathwaySurface(pathway) {
  const raw = JSON.stringify(pathway || {});
  const shape = {
    pathway,
    pathwaySignature: computeHash(raw)
  };
  const dual = computeDualHash("PATHWAY_SURFACE", shape);
  return {
    ...shape,
    pathwayDualHashPrimary: dual.primary,
    pathwayDualHashSecondary: dual.secondary
  };
}

function buildReturnSurface(result) {
  const ok = result && result.ok !== false;
  const raw = JSON.stringify(result || {});
  const shape = {
    ok,
    returnSignature: computeHash(raw)
  };
  const dual = computeDualHash("RETURN_SURFACE", shape);
  return {
    ...shape,
    returnDualHashPrimary: dual.primary,
    returnDualHashSecondary: dual.secondary
  };
}

// ============================================================================
//  Pulse Intelligence v24++ (logic-only, IMMORTAL-safe)
//  • binary-first band
//  • advantage + presence + factoring aware
//  • ready for meshFactoring + GPU advantage
// ============================================================================
function computePulseIntelligenceV24({
  advantageField = {},
  presenceField = {},
  factoringSignal,
  band,
  meshFactoringProfile = null
}) {
  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier  = Number(advantageField.advantageTier  || 0);

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.85 :
    presenceTier === "elevated" ? 0.7 :
    presenceTier === "soft"     ? 0.5 :
    presenceTier === "low"      ? 0.35 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const meshPressure = meshFactoringProfile
    ? Number(meshFactoringProfile.pressure || 0)
    : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 5 +
      presenceWeight * 0.3 +
      factoring * 0.2 +
      meshPressure * 0.2,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.55 +
      (bandIsBinary ? 0.25 : 0.1) +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    meshPressure
  };
}

// ============================================================================
//  12.3+ surfaces — cacheChunk / prewarm / presence (v24 dual-hash upgrade)
//  + burst modes (bluetoothBurst / powerBurst) derived from priority + mode
// ============================================================================
function deriveBurstMode({ priority, mode }) {
  const p = priority || "normal";
  const m = mode || "normal";

  if (p === "critical" || p === "high") {
    if (m === "realtime" || m === "reflex") return "bluetoothBurst";
    return "powerBurst";
  }
  if (p === "normal" && (m === "realtime" || m === "reflex")) {
    return "lightBurst";
  }
  return "none";
}

function buildCacheChunkSurface({ jobId, pattern, targetOrgan, pathway, mode, pulseType, bandMode }) {
  const shape = {
    jobId: jobId || "NO_JOB",
    pattern: pattern || "",
    targetOrgan: targetOrgan || null,
    pathway: pathway || null,
    mode: mode || "normal",
    pulseType: pulseType || "UNKNOWN",
    bandMode: bandMode || "binary"
  };

  const serialized = stableStringify(shape);
  const cacheChunkKey = "psend-cache::" + computeHash(serialized);

  const dual = computeDualHash("CACHE_CHUNK_SURFACE", {
    cacheChunkKey,
    shape
  });

  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    cacheChunkDualHashPrimary: dual.primary,
    cacheChunkDualHashSecondary: dual.secondary,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ priority, mode, pathway }) {
  const safePriority = priority || "normal";
  const safeMode = mode || "normal";
  const hasPathway = !!pathway;

  let level = "none";
  if (safePriority === "high" || safePriority === "critical") {
    level = "aggressive";
  } else if (safePriority === "normal" && hasPathway) {
    level = "medium";
  } else if (safePriority === "low" && hasPathway) {
    level = "light";
  }

  const burstMode = deriveBurstMode({ priority: safePriority, mode: safeMode });

  const shape = {
    priority: safePriority,
    mode: safeMode,
    hasPathway,
    level,
    burstMode
  };

  const raw = stableStringify(shape);
  const prewarmKey = "psend-prewarm::" + computeHash(raw);

  const dual = computeDualHash("PREWARM_SURFACE", {
    prewarmKey,
    shape
  });

  return {
    level,
    burstMode,
    prewarmKey,
    prewarmShape: shape,
    prewarmDualHashPrimary: dual.primary,
    prewarmDualHashSecondary: dual.secondary
  };
}

function buildPresenceSurface({ pattern, pathway, bandMode }) {
  const safePattern = pattern || "";
  const hasPathway = !!pathway;

  let scope = "local";
  if (hasPathway && safePattern.includes("/global")) {
    scope = "global";
  } else if (hasPathway && safePattern.includes("/page")) {
    scope = "page";
  }

  const shape = {
    pattern: safePattern,
    hasPathway,
    scope,
    bandMode: bandMode || "binary"
  };

  const raw = stableStringify(shape);
  const presenceKey = "psend-presence::" + computeHash(raw);

  const dual = computeDualHash("PRESENCE_SURFACE", {
    presenceKey,
    shape
  });

  return {
    scope,
    presenceKey,
    presenceShape: shape,
    presenceDualHashPrimary: dual.primary,
    presenceDualHashSecondary: dual.secondary
  };
}

// ============================================================================
//  TECH SURFACE v2 — USE ALL IMPORTS + expose band/burst + meshFactoring
// ============================================================================
function buildTechSurfaceV2({
  jobId,
  pattern,
  payload,
  priority,
  returnTo,
  mode,
  bandMode,
  meshFactoringProfile
}) {
  const v2sym = PulseV2SymShifter
    ? PulseV2SymShifter({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode,
        bandMode: bandMode || "binary"
      })
    : null;

  const v2 = PulseV2EvolutionEngine?.createPulseV2
    ? PulseV2EvolutionEngine.createPulseV2({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const v3 = PulseV3UnifiedOrganism?.createPulseV3
    ? PulseV3UnifiedOrganism.createPulseV3({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const impulse = PulseSendImpulse?.createImpulse
    ? PulseSendImpulse.createImpulse({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const legacy = PulseSendLegacyPulse?.createLegacyPulse
    ? PulseSendLegacyPulse.createLegacyPulse({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const adapter = PulseSendAdapter?.adapt
    ? PulseSendAdapter.adapt({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const engine = PulseSendEngine?.engine
    ? PulseSendEngine.engine({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const ret = PulseSendReturn?.ret
    ? PulseSendReturn.ret({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const system = PulseSendSystem?.conduct
    ? PulseSendSystem.conduct({ jobId, pattern, payload, priority, returnTo, mode })
    : null;

  const shape = {
    v2sym,
    v2,
    v3,
    impulse,
    legacy,
    adapter,
    engine,
    ret,
    system,
    bandMode: bandMode || "binary",
    meshFactoringProfile
  };

  const dual = computeDualHash("TECH_SURFACE_V2", shape);

  return {
    ...shape,
    techDualHashPrimary: dual.primary,
    techDualHashSecondary: dual.secondary
  };
}

// ============================================================================
//  FACTORY — Build the Full PulseSend v24++ IMMORTAL-ORGANISM
// ============================================================================
export function createPulseSend({
  createPulseV3,
  createPulseV2,
  createPulseV1,
  pulseRouter,
  pulseMesh,
  createPulseSendMover,
  createPulseSendImpulse,
  createPulseSendReturn,
  log,
  sdn
}) {
  const mover = createPulseSendMover({ pulseMesh, log });
  const impulse = createPulseSendImpulse({ mover, log });
  const returnArc = createPulseSendReturn({ impulse, pulseRouter, pulseMesh, log });

  function emitSDN(source, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(source, payload);
    } catch (e) {
      log && log("[PulseSend-v24] SDN emit failed (non-fatal)", { source, error: e });
    }
  }

  // ========================================================================
  //  PUBLIC API — send()  (binary-first, dual-band aware, 24++ surfaces)
  // ========================================================================
  function send({
    jobId,
    pattern,
    payload = {},
    priority = "normal",
    returnTo = null,
    mode = "normal",
    // v24++ band/presence hints (optional)
    bandMode = "binary",
    presenceField = null,
    advantageField = null
  }) {

    let pulse = null;
    let pulseType = null;
    let fallbackSurface = null;

    emitSDN("send:begin", {
      jobId,
      pattern,
      priority,
      returnTo,
      mode,
      bandMode
    });

    // ⭐ Tier 0 — binary-first SymShifter v2 (if wired)
    try {
      if (createPulseV2 && typeof createPulseV2 === "function") {
        // allow host to override, but default to SymPulseV2 if available
        pulse = PulseV2SymShifter
          ? PulseV2SymShifter({
              jobId,
              pattern,
              payload,
              priority,
              returnTo,
              mode,
              bandMode
            })
          : createPulseV2({
              jobId,
              pattern,
              payload,
              priority,
              returnTo,
              mode
            });
        pulseType = "Pulse-v2-SymShifter-binary-first";
      }
    } catch (errSym) {
      fallbackSurface = buildFallbackSurface("v2sym→v3", errSym);
      emitSDN("send:pulse-fallback", {
        jobId,
        pattern,
        from: "v2sym",
        to: "v3",
        error: String(errSym)
      });
      pulse = null;
      pulseType = null;
    }

    // ⭐ Tier 1 — Pulse v3
    if (!pulse) {
      try {
        pulse = createPulseV3({ jobId, pattern, payload, priority, returnTo, mode });
        pulseType = "Pulse-v3";
      } catch (errV3) {
        fallbackSurface = buildFallbackSurface("v3→v2", errV3);
        emitSDN("send:pulse-fallback", {
          jobId,
          pattern,
          from: "v3",
          to: "v2",
          error: String(errV3)
        });
      }
    }

    // ⭐ Tier 2 — Pulse v2 (classic)
    if (!pulse) {
      try {
        pulse = createPulseV2({ jobId, pattern, payload, priority, returnTo, mode });
        pulseType = "Pulse-v2";
      } catch (errV2) {
        fallbackSurface = buildFallbackSurface("v2→v1", errV2);
        emitSDN("send:pulse-fallback", {
          jobId,
          pattern,
          from: "v2",
          to: "v1",
          error: String(errV2)
        });
      }
    }

    // ⭐ Tier 3 — Pulse v1
    if (!pulse) {
      pulse = createPulseV1({ jobId, pattern, payload, priority, returnTo, mode });
      pulseType = "Pulse-v1";
      fallbackSurface = buildFallbackSurface("none→v1", "v3/v2 creation failed");
      emitSDN("send:pulse-fallback", { jobId, pattern, from: "none", to: "v1" });
    }

    // v24++: enforce bandMode / presence on pulse surface if missing
    const effectiveBand = pulse.bandMode || bandMode || "binary";
    pulse.bandMode = effectiveBand;
    pulse.band = effectiveBand;

    if (presenceField && !pulse.presenceField) {
      pulse.presenceField = presenceField;
    }
    if (advantageField && !pulse.advantageField) {
      pulse.advantageField = advantageField;
    }

    emitSDN("send:pulse-created", {
      jobId,
      pattern,
      mode,
      pulseType,
      bandMode: effectiveBand
    });

    // ⭐ Optional mesh signal factoring (metadata-only)
    let meshFactoringProfile = null;
    try {
      if (applyMeshSignalFactoring && pulseMesh) {
        const factoringImpulse = {
          id: jobId || pattern || "psend",
          band: effectiveBand,
          presenceField: pulse.presenceField || {},
          advantageField: pulse.advantageField || {},
          flags: {
            aura_factoring_bias: 0,
            mesh_factor_depth: 0,
            mesh_factor_bias: 0
          }
        };
        applyMeshSignalFactoring(factoringImpulse, {
          band: effectiveBand,
          presenceField: pulse.presenceField || {},
          advantageField: pulse.advantageField || {},
          deviceProfile: pulseMesh.deviceProfile || {}
        });
        meshFactoringProfile = factoringImpulse.flags.mesh_factoring_profile || null;
      }
    } catch (e) {
      // factoring is advisory only
      log && log("[PulseSend-v24] mesh factoring advisory failed", { error: e });
    }

    // ⭐ Route
    const targetOrgan = pulseRouter.route(pulse);
    const routeSurface = buildRouteSurface(targetOrgan);

    // ⭐ Pathway
    const pathway = pulseMesh.pathwayFor(targetOrgan, mode);
    const pathwaySurface = buildPathwaySurface(pathway);

    emitSDN("send:routed", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      bandMode: effectiveBand
    });

    // ⭐ Movement
    const movement = impulse.fire({ pulse, targetOrgan, pathway, mode });
    const movementSurface = buildMovementSurface(movement);

    emitSDN("send:movement", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      movementMeta: movementSurface
    });

    // ⭐ Return Arc
    const result = returnArc.handle(movement.packet, mode);
    const returnSurface = buildReturnSurface(result);

    emitSDN("send:return", {
      jobId,
      pattern,
      mode,
      pulseType,
      resultMeta: returnSurface
    });

    // ⭐ Memory
    pulseRouter.remember(
      pulse,
      targetOrgan,
      "success",
      pulse.healthScore || 1
    );

    emitSDN("send:complete", {
      jobId,
      pattern,
      targetOrgan,
      mode,
      pulseType,
      bandMode: effectiveBand
    });

    // ⭐ 12.3 surfaces — cacheChunk / prewarm / presence (v24 dual-hash + burst)
    const cacheChunkSurface = buildCacheChunkSurface({
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      bandMode: effectiveBand
    });

    const prewarmSurface = buildPrewarmSurface({
      priority,
      mode,
      pathway
    });

    const presenceSurface = buildPresenceSurface({
      pattern,
      pathway,
      bandMode: effectiveBand
    });

    // ⭐ TECH SURFACE v2 (uses ALL imports + band + meshFactoring)
    const techSurface = buildTechSurfaceV2({
      jobId,
      pattern,
      payload,
      priority,
      returnTo,
      mode,
      bandMode: effectiveBand,
      meshFactoringProfile
    });

    // ⭐ INTELLIGENCE v24++ (IMMORTAL-ORGANISM)
    const pulseIntelligence = computePulseIntelligenceV24({
      advantageField: pulse.advantageField || {},
      presenceField: pulse.presenceField || {},
      factoringSignal: pulse.factoringSignal || null,
      band: effectiveBand,
      meshFactoringProfile
    });

    const pulseIntelligenceDualHash = computeDualHash(
      "PULSE_INTELLIGENCE_V24",
      pulseIntelligence
    );

    // ⭐ GLOBAL SEND DUAL-HASH (binary-first)
    const sendSignaturePayload = {
      jobId,
      pattern,
      mode,
      pulseType,
      targetOrgan,
      pathway,
      priority,
      returnTo,
      bandMode: effectiveBand
    };

    const sendDualHash = computeDualHash("PULSE_SEND_V24", sendSignaturePayload);

    // ⭐ Return full telemetry
    return {
      PulseRole,
      movement,
      result,
      mode,
      pulseType,
      bandMode: effectiveBand,

      // ⭐ top-level intelligence
      pulseIntelligence,
      pulseIntelligenceDualHash,

      // ⭐ global send dual-hash
      sendDualHashPrimary: sendDualHash.primary,
      sendDualHashSecondary: sendDualHash.secondary,

      fallbackSurface,
      routeSurface,
      pathwaySurface,
      movementSurface,
      returnSurface,

      cacheChunkSurface,
      prewarmSurface,
      presenceSurface,

      techSurface,

      diagnostics: {
        ...buildSendDiagnostics({
          jobId,
          pattern,
          mode,
          pulseType,
          bandMode: effectiveBand
        }),

        // ⭐ mirrored intelligence + signature + dual-hash
        pulseIntelligence,
        pulseIntelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
        pulseIntelligenceDualHashPrimary: pulseIntelligenceDualHash.primary,
        pulseIntelligenceDualHashSecondary: pulseIntelligenceDualHash.secondary,

        sendDualHashPrimary: sendDualHash.primary,
        sendDualHashSecondary: sendDualHash.secondary
      }
    };
  }

  return {
    PulseRole,
    send
  };
}

// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSend (v24++ IMMORTAL-ORGANISM)
// ============================================================================
export const PulseSend = {
  PulseRole,

  send(...args) {
    throw new Error(
      "[PulseSend-v24] PulseSend.send() was called before initialization. " +
      "Use createPulseSend(...) to wire dependencies."
    );
  }
};
