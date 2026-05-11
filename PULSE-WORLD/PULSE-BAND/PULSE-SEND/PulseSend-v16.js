// ============================================================================
//  PulseSend-v16-Immortal-ORGANISM.js — PulseSend Organism v16 (Symbolic)
//  Evolutionary Transport Organ • Pattern + Lineage + Shape • SDN-Aware
//  12.3: Fallback / Movement / Route / Pathway / Return surfaces
//        + cacheChunkSurface + prewarmSurface + presenceSurface
//  14.4: IMMORTAL-INTEL (pulseIntelligence)
//  16.0: IMMORTAL-ORGANISM meta + dual-hash + full intelligence fabric
// ============================================================================
//
//  SAFETY CONTRACT (v16-Immortal-ORGANISM):
//  ----------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external IO.
//  • Pure deterministic transport chain.
//  • Zero mutation outside instance.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// --- Evolution Engines ------------------------------------------------------
import {createPulseV2 as PulseV2EvolutionEngine }  from "./PulseSendV2EvolutionEngine-v16.js";
import {createPulseV3 as PulseV3UnifiedOrganism }  from "./PulseSendV3UnifiedOrganism-v16.js";

// --- Impulse Layer ----------------------------------------------------------
import {createPulseSendImpulse as PulseSendImpulse }        from "./PulseSendImpulse-v16.js";

// --- Legacy Pulse Layer -----------------------------------------------------
import {createLegacyPulse as PulseSendLegacyPulse }    from "./PulseSendLegacyPulse-v16.js";

// --- Adapter Layer ----------------------------------------------------------
import {adaptPulseSendPacket as PulseSendAdapter }        from "./PulseSendAdapter.js";

// --- Engine Layer -----------------------------------------------------------
import {PulseSendMover as PulseSendEngine }         from "./PulseSendEngine.js";

// --- Return Layer -----------------------------------------------------------
import {createPulseSendReturn as PulseSendReturn }         from "./PulseSendReturn.js";

// --- System Layer (Final Conductor) ----------------------------------------
import {createPulseSendSystem as PulseSendSystem }         from "./PulseSendSystem.js";


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
//  DUAL HASH — v16 IMMORTAL (symbolic-only, backed by computeHash)
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

function buildSendDiagnostics({ jobId, pattern, mode, pulseType }) {
  const shape = {
    jobId,
    patternLength: (pattern || "").length,
    mode,
    pulseType
  };
  const patternHash = computeHash(pattern || "");
  const modeHash = computeHash(mode || "normal");
  const dual = computeDualHash("SEND_DIAGNOSTICS", shape);
  return {
    ...shape,
    patternHash,
    modeHash,
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
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe, v16 extension)
// ============================================================================
function computePulseIntelligence({ advantageField, presenceField, factoringSignal, band }) {
  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier  = Number(advantageField.advantageTier  || 0);

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    presenceTier === "low"      ? 0.3 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 5 +
      presenceWeight * 0.3 +
      factoring * 0.2,
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
      solvednessScore * 0.6 +
      (bandIsBinary ? 0.2 : 0) +
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
    advantageTier
  };
}


// ============================================================================
//  12.3+ surfaces — cacheChunk / prewarm / presence (v16 dual-hash upgrade)
// ============================================================================
function buildCacheChunkSurface({ jobId, pattern, targetOrgan, pathway, mode, pulseType }) {
  const shape = {
    jobId: jobId || "NO_JOB",
    pattern: pattern || "",
    targetOrgan: targetOrgan || null,
    pathway: pathway || null,
    mode: mode || "normal",
    pulseType: pulseType || "UNKNOWN"
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

  const shape = {
    priority: safePriority,
    mode: safeMode,
    hasPathway,
    level
  };

  const raw = stableStringify(shape);
  const prewarmKey = "psend-prewarm::" + computeHash(raw);

  const dual = computeDualHash("PREWARM_SURFACE", {
    prewarmKey,
    shape
  });

  return {
    level,
    prewarmKey,
    prewarmShape: shape,
    prewarmDualHashPrimary: dual.primary,
    prewarmDualHashSecondary: dual.secondary
  };
}

function buildPresenceSurface({ pattern, pathway }) {
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
    scope
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
// ⭐ NEW: TECH SURFACE — USE ALL IMPORTS
// ============================================================================
function buildTechSurface({ jobId, pattern, payload, priority, returnTo, mode }) {

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
    v2,
    v3,
    impulse,
    legacy,
    adapter,
    engine,
    ret,
    system
  };

  const dual = computeDualHash("TECH_SURFACE", shape);

  return {
    ...shape,
    techDualHashPrimary: dual.primary,
    techDualHashSecondary: dual.secondary
  };
}

// ============================================================================
//  FACTORY — Build the Full PulseSend v16 IMMORTAL-ORGANISM
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
      log && log("[PulseSend-v16] SDN emit failed (non-fatal)", { source, error: e });
    }
  }

  // ========================================================================
  //  PUBLIC API — send()
  // ========================================================================
  function send({
    jobId,
    pattern,
    payload = {},
    priority = "normal",
    returnTo = null,
    mode = "normal"
  }) {

    let pulse = null;
    let pulseType = null;
    let fallbackSurface = null;

    emitSDN("send:begin", { jobId, pattern, priority, returnTo, mode });

    // ⭐ Tier 1 — Pulse v3
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

    // ⭐ Tier 2 — Pulse v2
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

    emitSDN("send:pulse-created", { jobId, pattern, mode, pulseType });

    // ⭐ Route
    const targetOrgan = pulseRouter.route(pulse);
    const routeSurface = buildRouteSurface(targetOrgan);

    // ⭐ Pathway
    const pathway = pulseMesh.pathwayFor(targetOrgan, mode);
    const pathwaySurface = buildPathwaySurface(pathway);

    emitSDN("send:routed", { jobId, pattern, targetOrgan, pathway, mode, pulseType });

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
    pulseRouter.remember(pulse, targetOrgan, "success", pulse.healthScore || 1);

    emitSDN("send:complete", { jobId, pattern, targetOrgan, mode, pulseType });

    // ⭐ 12.3 surfaces — cacheChunk / prewarm / presence (v16 dual-hash)
    const cacheChunkSurface = buildCacheChunkSurface({
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType
    });

    const prewarmSurface = buildPrewarmSurface({
      priority,
      mode,
      pathway
    });

    const presenceSurface = buildPresenceSurface({
      pattern,
      pathway
    });

    // ⭐ NEW: TECH SURFACE (uses ALL imports)
    const techSurface = buildTechSurface({
      jobId,
      pattern,
      payload,
      priority,
      returnTo,
      mode
    });

    // ⭐ INTELLIGENCE (v16 IMMORTAL-ORGANISM)
    const pulseIntelligence = computePulseIntelligence({
      advantageField: pulse.advantageField || {},
      presenceField: pulse.presenceField || {},
      factoringSignal: pulse.factoringSignal || null,
      band: pulse.band || "symbolic"
    });

    const pulseIntelligenceDualHash = computeDualHash(
      "PULSE_INTELLIGENCE",
      pulseIntelligence
    );

    // ⭐ GLOBAL SEND DUAL-HASH (mirrors BinarySend-style global signature)
    const sendSignaturePayload = {
      jobId,
      pattern,
      mode,
      pulseType,
      targetOrgan,
      pathway,
      priority,
      returnTo
    };

    const sendDualHash = computeDualHash("PULSE_SEND_V16", sendSignaturePayload);

    // ⭐ Return full telemetry
    return {
      PulseRole,
      movement,
      result,
      mode,
      pulseType,

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
          pulseType
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
//  ORGAN EXPORT — ⭐ PulseSend (v16 IMMORTAL-ORGANISM)
// ============================================================================
export const PulseSend = {
  PulseRole,

  send(...args) {
    throw new Error(
      "[PulseSend-v16] PulseSend.send() was called before initialization. " +
      "Use createPulseSend(...) to wire dependencies."
    );
  }
};
