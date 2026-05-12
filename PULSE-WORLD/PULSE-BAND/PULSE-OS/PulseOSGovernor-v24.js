// ============================================================================
//  PulseOSGovernor-v24-IMMORTAL-SPINE++.js
//  Global Loop, Re-entry & Multi-Instance Governor (v24-IMMORTAL-SPINE++)
//  - No routing
//  - No sending
//  - Pure guards + dynamic multi-instance slicing context
//  - Optional EarnReflex hook (global.PulseEarnReflex)
//  - Optional ReflexRouter hook (global.PulseEarnReflexRouter)
//  - Dual-band aware (symbolic + binary pulses)
//  - Presence-aware (metadata only)
//  - Chunk/prewarm/advantage-aware (metadata only)
//  - IMMORTAL, drift-proof, determinism-first
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA (v24++)
export const GOVERNOR_CONTEXT_V24 = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// Internal governor state (IMMORTAL, process-local only)
const activeOrgans = new Set();
const activeModules = new Set();
const pulseVisits = new Map();
const instanceRegistry = new Map();

// v24++: slightly more generous but still safe
const MAX_LINEAGE_DEPTH = 24;
const MAX_RETURN_TO_DEPTH = 12;
const MAX_FALLBACK_DEPTH = 2;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getPulseId(pulseOrImpulse) {
  return (
    pulseOrImpulse?.pulseId ||
    pulseOrImpulse?.id ||
    pulseOrImpulse?.tickId ||
    pulseOrImpulse?.jobId ||
    "UNKNOWN_PULSE"
  );
}

function getLineageDepth(pulseOrImpulse) {
  const lineage = pulseOrImpulse?.lineage || pulseOrImpulse?.parentLineage || [];
  return Array.isArray(lineage) ? lineage.length : 0;
}

function getReturnToDepth(pulseOrImpulse) {
  const rt = pulseOrImpulse?.returnTo;
  if (!rt) return 0;
  if (Array.isArray(rt)) return rt.length;
  return 1;
}

function getFallbackDepth(pulseOrImpulse) {
  const fb = pulseOrImpulse?.fallback || pulseOrImpulse?.fallbackDepth;
  if (!fb) return 0;
  if (typeof fb === "number") return fb;
  return 1;
}

function getInstanceKey(organName, pulseOrImpulse) {
  const pulseId = getPulseId(pulseOrImpulse);
  return `${organName}::${pulseId}`;
}

function classifyBand(pulseOrImpulse) {
  const band = pulseOrImpulse?.band || pulseOrImpulse?.mode || null;
  if (band === "binary" || band === "bit" || band === "BAND_BINARY") return "binary";
  if (band === "symbolic" || band === "SYMBOLIC") return "symbolic";
  return "dual";
}

// v24++: advantage + presence metadata (pure tagging)
function buildGovernorMeta(pulseOrImpulse, instanceContext) {
  const advantage = pulseOrImpulse?.advantage || {};
  const presence = pulseOrImpulse?.presence || {};
  const routeName = pulseOrImpulse?.routeName || null;

  return {
    routeName,
    advantageTier: advantage.tier || "unknown",
    deviceTier: advantage.deviceTier || "unknown",
    networkTier: advantage.networkTier || "unknown",
    gpuTier: advantage.gpuTier || "unknown",
    presenceCritical: !!presence.critical,
    presenceFieldRequested: !!presence.field,
    meshPresenceRequested: !!presence.mesh,
    instanceIndex: instanceContext.instanceIndex,
    totalInstances: instanceContext.totalInstances
  };
}

// ---------------------------------------------------------------------------
//  OPTIONAL: Emit EarnReflex + Route it if router is present
// ---------------------------------------------------------------------------
async function maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext) {
  try {
    if (typeof window === "undefined") return;

    const reflex = global.PulseEarnReflex;
    if (!reflex || typeof reflex.fromGovernorEvent !== "function") return;

    const { earnReflex } = await reflex.fromGovernorEvent(
      event,
      pulseOrImpulse,
      instanceContext
    );

    const router = global.PulseEarnReflexRouter;
    const earn = global.Pulse?.Earn;

    if (router && typeof router.route === "function" && earn) {
      router.route(earnReflex, earn);
    }
  } catch {
    // fail-open: governor must never break
  }
}

// ---------------------------------------------------------------------------
//  Organ-level guard — v24++
// ---------------------------------------------------------------------------
export async function withOrganGuard(organName, pulseOrImpulse, fn) {
  const pulseId = getPulseId(pulseOrImpulse);
  const instanceKey = getInstanceKey(organName, pulseOrImpulse);
  const band = classifyBand(pulseOrImpulse);

  let state = instanceRegistry.get(instanceKey);
  if (!state) {
    state = { count: 0 };
    instanceRegistry.set(instanceKey, state);
  }
  state.count += 1;

  const instanceIndex = state.count - 1;
  const totalInstances = state.count;
  const instanceContext = {
    ...GOVERNOR_CONTEXT_V24,
    band,
    organ: organName,
    pulseId,
    instanceKey,
    instanceIndex,
    totalInstances
  };

  const governorMeta = buildGovernorMeta(pulseOrImpulse, instanceContext);

  function buildEvent(reason, extra = {}) {
    return {
      ok: false,
      blocked: true,
      reason,
      ...GOVERNOR_CONTEXT_V24,
      band,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      ...extra
    };
  }

  // 1. Organ re-entry
  if (activeOrgans.has(organName)) {
    const event = buildEvent("organ_reentry");
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 2. Per-pulse revisit
  let visits = pulseVisits.get(pulseId);
  if (!visits) {
    visits = new Set();
    pulseVisits.set(pulseId, visits);
  } else if (visits.has(organName)) {
    const event = buildEvent("organ_already_visited_for_pulse");
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 3. Depth guards
  const lineageDepth = getLineageDepth(pulseOrImpulse);
  if (lineageDepth > MAX_LINEAGE_DEPTH) {
    const event = buildEvent("lineage_depth_exceeded", { lineageDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  const returnToDepth = getReturnToDepth(pulseOrImpulse);
  if (returnToDepth > MAX_RETURN_TO_DEPTH) {
    const event = buildEvent("return_to_depth_exceeded", { returnToDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  const fallbackDepth = getFallbackDepth(pulseOrImpulse);
  if (fallbackDepth > MAX_FALLBACK_DEPTH) {
    const event = buildEvent("fallback_depth_exceeded", { fallbackDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 4. Mark active + visited
  activeOrgans.add(organName);
  visits.add(organName);

  try {
    const result = await fn(instanceContext);
    return {
      ok: true,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      band,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      result
    };
  } catch (error) {
    return {
      ok: false,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      band,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      error
    };
  } finally {
    activeOrgans.delete(organName);
  }
}

// ---------------------------------------------------------------------------
//–  Module init guard — v24++
// ---------------------------------------------------------------------------
export async function withModuleInitGuard(moduleName, fn) {
  if (activeModules.has(moduleName)) {
    return {
      ok: false,
      blocked: true,
      reason: "module_init_reentry",
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName
    };
  }

  activeModules.add(moduleName);
  try {
    const result = await fn();
    return {
      ok: true,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName,
      result
    };
  } catch (error) {
    return {
      ok: false,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName,
      error
    };
  } finally {
    activeModules.delete(moduleName);
  }
}
