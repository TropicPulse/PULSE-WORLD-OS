// ============================================================================
// FILE: /PULSE-OS/PulseOSCortex-v24-IMMORTAL-Spine++.js
// PULSE OS — v24-SPINE-DUALBAND-Presence++
// “THE CORTEX ORGAN — HIGH‑LEVEL COGNITION + ORGAN SUPERVISOR (v24++)”
// ============================================================================
//
// ROLE (v24-SPINE-DUALBAND-Presence++):
// -------------------------------------
// • Receives PulseOSBrain (CNS) directly
// • Reads intent, IQ, OrganismMap from Brain
// • Reads Evolution from Brain.evolution (optional, non-blocking)
// • Initializes Nervous System + Organs (delegated to CNS Brain)
// • Maintains OS-level conscious state (symbolic-primary)
// • Reports lineage + drift to Evolution (band-tagged, optional)
// • Pure frontend, deterministic, zero timing, zero backend
// • Continuance-aware (never halts organism)
// • Dual-band aware (symbolic | binary | dual) — tagging only
// • Binary-aware but NEVER executes binary logic
// • Symbolic-primary: Cortex always thinks in symbolic mode
// • Presence-aware + mesh-aware + chunk/prewarm-aware (metadata-only)
// • Advantage-aware (device/route tiers via IQ metadata, if present)
// • World-layer aware (can surface world/expansion hints via IQ, if present)
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  BOOT SURFACE — v24++
// ============================================================================
export function bootCortex({ Brain, ...options } = {}) {
  if (!Brain) {
    throw new Error("PulseOSCortex v24++: Missing CNS Brain injection.");
  }

  const cortex = createPulseOSCortex({ Brain });
  return cortex.boot(options);
}

// ============================================================================
//  FACTORY — Cortex receives the CNS Brain directly (v24++)
// ============================================================================
export function createPulseOSCortex({ Brain }) {
  if (!Brain) {
    throw new Error("PulseOSCortex v24++: Missing CNS Brain injection.");
  }

  // ⭐ The ONLY correct way Cortex sees Evolution
  const Evolution = Brain.evolution || null;

  function normalizeBand(band) {
    return band === "binary" || band === "symbolic" || band === "dual"
      ? band
      : "dual";
  }

  // v24++: advantage + world hints from IQ, if present
  function computeAdvantageProfile() {
    const iq = Brain.PulseIQMap || {};
    const advantage = iq.advantage || {};
    const device = advantage.device || {};
    const network = advantage.network || {};
    const gpu = advantage.gpu || {};
    const routes = advantage.routes || {};

    return {
      deviceTier: device.tier || "unknown",
      networkTier: network.tier || "unknown",
      gpuTier: gpu.tier || "unknown",
      routeTiers: routes,
      raw: advantage
    };
  }

  function computePresenceDescriptors() {
    if (Brain.BrainIntel?.getPresenceDescriptors) {
      return Brain.BrainIntel.getPresenceDescriptors();
    }

    const iq = Brain.PulseIQMap || {};
    const organism = Brain.PulseOrganismMap || {};

    const presenceConfig = iq.presenceConfig || {};
    const meshConfig = iq.meshPresenceConfig || {};

    return {
      presenceField: {
        enabled: !!presenceConfig.enabled,
        bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
        routes: presenceConfig.routes || []
      },
      meshPresence: {
        enabled: !!meshConfig.enabled,
        topology: meshConfig.topology || "none",
        routes: meshConfig.routes || []
      },
      organismSnapshot: {
        organs: Object.keys(organism || {})
      }
    };
  }

  function computeChunkingProfiles() {
    if (Brain.BrainIntel?.getChunkingProfiles) {
      return Brain.BrainIntel.getChunkingProfiles();
    }

    const iq = Brain.PulseIQMap || {};
    const profiles = iq.chunkingProfiles || {};

    return {
      defaultProfile: profiles.default || null,
      routeProfiles: profiles.routes || {},
      gpuProfiles: profiles.gpu || {}
    };
  }

  const CortexState = {
    booted: false,
    routeName: "main",
    hasIdentity: false,

    IntentMap: Brain.intent || null,
    IQMap: Brain.PulseIQMap || {},
    OrganismMap: Brain.PulseOrganismMap || {},

    understanding: Brain.understanding || null,

    band: "dual",
    symbolicPrimary: true,
    binaryAware: true,

    lastScan: null,

    presenceDescriptors: computePresenceDescriptors(),
    chunkingProfiles: computeChunkingProfiles(),
    advantageProfile: computeAdvantageProfile()
  };

  // ========================================================================
  //  BOOT — v24++
  // ========================================================================
  function bootCortexFn({ band = "dual" } = {}) {
    const normBand = normalizeBand(band);
    CortexState.band = normBand;

    if (!CortexState.booted) {
      CortexState.booted = true;
    }

    CortexState.presenceDescriptors = computePresenceDescriptors();
    CortexState.chunkingProfiles = computeChunkingProfiles();
    CortexState.advantageProfile = computeAdvantageProfile();

    Evolution?.recordLineage?.("cortex-boot-v24++", { band: normBand });
    Evolution?.scanDrift?.(Brain, { band: normBand });

    Brain.log?.("[Cortex v24-IMMORTAL-SPINE++] Boot complete", {
      CortexState
    });

    return CortexState;
  }

  // ========================================================================
  //  UPDATE — v24++
  // ========================================================================
  function updateCortex(ctx = {}, { band = "dual" } = {}) {
    const normBand = normalizeBand(band);
    CortexState.band = normBand;

    CortexState.routeName = ctx.routeName ?? CortexState.routeName;
    CortexState.hasIdentity = ctx.hasIdentity ?? CortexState.hasIdentity;

    CortexState.presenceDescriptors = computePresenceDescriptors();
    CortexState.chunkingProfiles = computeChunkingProfiles();
    CortexState.advantageProfile = computeAdvantageProfile();

    Evolution?.recordLineage?.("cortex-update-v24++", {
      band: normBand,
      routeName: CortexState.routeName,
      hasIdentity: CortexState.hasIdentity
    });

    return CortexState;
  }

  // ========================================================================
  //  FILE SCANNING — v24++ (symbolic-only, metadata)
// ========================================================================
  function scanFile(filePath) {
    const scanner =
      Brain.understanding?.fileScanner ||
      Brain.understanding?.PulseFileScanner ||
      Brain.understanding?.scanner ||
      null;

    if (!scanner || typeof scanner.scanFile !== "function") {
      Brain.warn?.(
        "⚠️ [Cortex v24++] scanFile requested but no scanner organ available.",
        { filePath }
      );
      return {
        ok: false,
        error: "SCANNER_NOT_AVAILABLE",
        filePath
      };
    }

    const result = scanner.scanFile(filePath);

    CortexState.lastScan = {
      filePath,
      result
    };

    Evolution?.recordLineage?.("cortex-scan-file-v24++", { filePath });
    Evolution?.scanDrift?.(Brain, { band: CortexState.band });

    return result;
  }

  // ========================================================================
  //  PUBLIC API — v24++
  // ========================================================================
  const cortexAPI = {
    boot: bootCortexFn,
    update: updateCortex,
    state: CortexState,
    isReady: () => CortexState.booted,

    scanFile,

    initializeNervousSystem() {},
    initializeOrgans() {}
  };

  return cortexAPI;
}
