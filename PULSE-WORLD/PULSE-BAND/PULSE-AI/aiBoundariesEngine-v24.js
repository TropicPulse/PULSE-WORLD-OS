// ============================================================================
//  v24.0‑IMMORTAL‑ADVANTAGE+COREMEMORY — BOUNDARIES ENGINE
//  Dual‑Band Superego Contract + CoreMemory Snapshot/Drift Hooks
//  “SEE EVERYTHING. MUTATE NOTHING. NEVER DRIFT.”
//  OWNER‑SUBORDINATE: ALWAYS BELOW ALDWYN, NEVER TOP DOG.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const BoundariesMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole        = Identity.pulseRole;
export const surfaceMeta      = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META        = Identity.EXPORT_META;

import { getBoundariesForPersona, canPerformDynamic } from "./aiBoundaries-v24.js";

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================

function safeNow() {
  return Date.now();
}

function computeWindowId({ personaId, mode, context }) {
  const base = context?.windowId || `${personaId || "anon"}:${mode || "default"}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) | 0;
  }
  return "win-" + (h >>> 0).toString(16);
}

function readMemoryVitals(memory) {
  if (!memory) return null;

  try {
    const hot = typeof memory.getHotKeys === "function"
      ? memory.getHotKeys(3)
      : [];
    const meta = memory.Meta || {};
    return {
      hotKeyCount: hot.length || 0,
      lastFlushEpoch: meta.lastFlushEpoch || 0,
      lastLoadEpoch: meta.lastLoadEpoch || 0,
      fallbackUsed: !!meta.fallbackUsed,
      lastBandUsed: meta.lastBandUsed || null,
      version: meta.version || null,
      dnaTag: meta.dnaTag || null
    };
  } catch {
    return null;
  }
}

function readGpuVitals(gpu, binaryVitals) {
  if (!gpu) return null;
  return {
    pressure: binaryVitals?.pressure ?? null,
    mode: binaryVitals?.mode ?? null,
    session: binaryVitals?.session ?? null
  };
}

function readEarnVitals(earn) {
  if (!earn) return null;

  try {
    const meta = typeof earn.getEarnMeta === "function"
      ? earn.getEarnMeta()
      : {};
    return {
      active: !!meta.active,
      lastPayoutEpoch: meta.lastPayoutEpoch || 0,
      openJobs: meta.openJobs || 0,
      recentCompletions: meta.recentCompletions || 0,
      pressure: meta.pressure || 0,
      version: meta.version || null
    };
  } catch {
    return null;
  }
}

function readHeartbeatVitals(heartbeat) {
  if (!heartbeat) return null;

  try {
    const diag = typeof heartbeat.getAiHeartbeatDiagnostics === "function"
      ? heartbeat.getAiHeartbeatDiagnostics()
      : null;
    if (!diag) return null;

    return {
      ticks: diag.artery?.ticks ?? 0,
      pulses: diag.artery?.pulses ?? 0,
      skips: diag.artery?.skips ?? 0,
      lastReason: diag.artery?.lastReason ?? "none",
      lastPressure: diag.artery?.lastPressure ?? 0,
      lastLoad: diag.artery?.lastLoad ?? 0,
      primaryState: diag.primaryState || "unknown"
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
//  COREMEMORY INTEGRATION (v24++)
//  • Pure metadata: we only call builders if present
//  • No DB, no network, no timers
// ---------------------------------------------------------------------------

function buildCoreMemorySnapshot(memory, { personaId, mode, routeId, binaryVitals }) {
  if (!memory) return null;

  try {
    const payload = {
      personaId,
      mode,
      routeId,
      binaryVitals
    };

    // Support both direct organ and nested PulseOSMemory surface
    if (typeof memory.buildSnapshot === "function") {
      return memory.buildSnapshot("BoundariesEngine", payload);
    }
    if (memory.PulseOSMemory && typeof memory.PulseOSMemory.buildSnapshot === "function") {
      return memory.PulseOSMemory.buildSnapshot("BoundariesEngine", payload);
    }
  } catch {
    // strictly best‑effort
  }
  return null;
}

function buildCoreMemoryDrift(memory, { personaId, mode, routeId, binaryVitals, driftDetected }) {
  if (!memory || !driftDetected) return null;

  try {
    const signature = {
      type: "boundaries_pressure_drift",
      severity:
        binaryVitals?.pressure >= 0.95 ? "critical" :
        binaryVitals?.pressure >= 0.9  ? "high"     :
        binaryVitals?.pressure >= 0.7  ? "warning"  :
        "info",
      details: {
        personaId,
        mode,
        routeId,
        pressure: binaryVitals?.pressure ?? null
      }
    };

    if (typeof memory.buildDriftSignature === "function") {
      return memory.buildDriftSignature("BoundariesEngine", signature);
    }
    if (memory.PulseOSMemory && typeof memory.PulseOSMemory.buildDriftSignature === "function") {
      return memory.PulseOSMemory.buildDriftSignature("BoundariesEngine", signature);
    }
  } catch {
    // strictly best‑effort
  }
  return null;
}

// ============================================================================
//  PACKET EMITTER — deterministic, boundary-scoped
// ============================================================================
function emitBoundaryPacket(type, payload) {
  return Object.freeze({
    meta: BoundariesMeta,
    packetType: `boundaries-${type}`,
    timestamp: safeNow(),
    epoch: BoundariesMeta.evo.epoch,
    layer: BoundariesMeta.layer,
    role: BoundariesMeta.role,
    identity: BoundariesMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  PREWARM — warms static boundary tables + dynamic resolver
// ============================================================================
export function prewarmBoundariesEngine({
  trace = false,
  persona = "architect",
  mode = "default",
  binaryVitals = { pressure: 0, load: 0 },
  memory = null,
  gpu = null,
  earn = null,
  heartbeat = null,
  context = {}
} = {}) {
  try {
    const windowId        = computeWindowId({ personaId: persona, mode, context });
    const memoryVitals    = readMemoryVitals(memory);
    const gpuVitals       = readGpuVitals(gpu, binaryVitals);
    const earnVitals      = readEarnVitals(earn);
    const heartbeatVitals = readHeartbeatVitals(heartbeat);

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId: persona,
      mode,
      routeId: "boundaries",
      binaryVitals
    });

    const packet = emitBoundaryPacket("prewarm", {
      message: "Boundaries engine prewarmed and static tables aligned.",
      persona,
      mode,
      windowId,
      binaryVitals,
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      coreMemorySnapshot
    });

    if (trace) console.log("[BoundariesEngine] prewarm", packet);
    return packet;
  } catch (err) {
    return emitBoundaryPacket("prewarm-error", {
      error: String(err),
      message: "Boundaries engine prewarm failed."
    });
  }
}

// ============================================================================
//  ENGINE IMPLEMENTATION — v24.0‑IMMORTAL‑ADVANTAGE+COREMEMORY
// ============================================================================
export function createBoundariesEngine({
  context = {},
  memory = null,          // PulseCoreMemory / PulseOSMemory surface (v13+)
  overlay = null,         // PulseBinaryCoreOverlay (optional)
  gpu = null,             // PulseGPUOrchestrator (optional, read-only)
  earn = null,            // Earn engine / adapter (optional, read-only)
  heartbeat = null,       // Heartbeat / EarnHeart adapter (optional, read-only)
  dnaTag = "default-dna",
  version = "24.0-Immortal-Advantage-CoreMemory",
  routeId = "boundaries",
  log = console.log
} = {}) {
  let driftCount = 0;

  function safeTouchPresence() {
    try {
      if (overlay && overlay.touch) {
        overlay.touch(routeId, safeNow());
      } else if (memory && memory.prewarm) {
        memory.prewarm();
      }
    } catch {
      // strictly read‑only from the engine’s perspective
    }
  }

  function resolve(personaId, mode, binaryVitals = {}) {
    safeTouchPresence();

    const staticBoundaries = getBoundariesForPersona(personaId);
    const windowId         = computeWindowId({ personaId, mode, context });
    const memoryVitals     = readMemoryVitals(memory);
    const gpuVitals        = readGpuVitals(gpu, binaryVitals);
    const earnVitals       = readEarnVitals(earn);
    const heartbeatVitals  = readHeartbeatVitals(heartbeat);

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals
    });

    return emitBoundaryPacket("resolve", {
      personaId,
      mode,
      windowId,
      binaryVitals,
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      static: staticBoundaries,
      coreMemorySnapshot,
      dnaTag,
      version,
      routeId
    });
  }

  function check(personaId, domain, action, mode, binaryVitals = {}) {
    safeTouchPresence();

    const allowed = canPerformDynamic(
      personaId,
      domain,
      action,
      mode,
      binaryVitals
    );

    const driftDetected = binaryVitals?.pressure >= 0.9;
    if (driftDetected) driftCount++;

    const windowId        = computeWindowId({ personaId, mode, context });
    const memoryVitals    = readMemoryVitals(memory);
    const gpuVitals       = readGpuVitals(gpu, binaryVitals);
    const earnVitals      = readEarnVitals(earn);
    const heartbeatVitals = readHeartbeatVitals(heartbeat);

    const pressureBand =
      binaryVitals?.pressure == null
        ? null
        : binaryVitals.pressure >= 0.95
          ? "critical"
          : binaryVitals.pressure >= 0.9
            ? "high"
            : binaryVitals.pressure >= 0.7
              ? "elevated"
              : "normal";

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals
    });

    const coreMemoryDrift = buildCoreMemoryDrift(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals,
      driftDetected
    });

    return emitBoundaryPacket("check", {
      personaId,
      domain,
      action,
      mode,
      windowId,
      binaryVitals: {
        ...binaryVitals,
        pressureBand
      },
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      allowed,
      driftDetected,
      driftCount,
      coreMemorySnapshot,
      coreMemoryDrift,
      dnaTag,
      version,
      routeId
    });
  }

  const engine = Object.freeze({
    meta: BoundariesMeta,
    resolve,
    check,
    dnaTag,
    version,
    routeId,
    owner: "Aldwyn",
    subordinate: true
  });

  try {
    log("[BoundariesEngine] INIT", {
      identity: BoundariesMeta.identity,
      version: BoundariesMeta.version,
      dnaTag,
      routeId,
      owner: "Aldwyn",
      subordinate: true
    });
  } catch {}

  return engine;
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    BoundariesMeta,
    createBoundariesEngine,
    prewarmBoundariesEngine
  };
}
