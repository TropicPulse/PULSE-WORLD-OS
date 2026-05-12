// ============================================================================
// FILE: PulseHalo-v24-IMMORTAL++.js
// PULSE HALO — AWARENESS RING
// System-wide Awareness Ring • Mesh + Presence + Advantage Telemetry
// Metadata-only • Zero Compute (no heavy logic) • Zero Payload Access
// Presence-aware • Binary-aware • Advantage-cascade-aware • Bluetooth-aware
// ============================================================================
//
// IDENTITY — THE HALO FIELD (v24-IMMORTAL++):
//  -----------------------------------------
//  • Organism-wide awareness ring around all impulses and mesh activity.
//  • Counts, classifies, and summarizes behavior — never touches payloads.
//  • Dual-mode aware: symbolic / binary / dual-mode impulses.
//  • Presence-band aware: symbolic / binary / dual presence bands.
//  • Advantage-field aware: factored paths, binary preference, advantage events.
//  • Bluetooth-presence aware: proximity tiers, link quality, transport.
//  • Feeds dashboards, AI views, and health indicators (stability, drift).
//  • Fully deterministic: same sequence of counter calls → same HaloState.
//  • Zero randomness, zero timestamps, zero async, zero network, zero FS.
//
// SAFETY CONTRACT (v24-IMMORTAL++):
//  --------------------------------
//  • No randomness
//  • No timestamps
//  • No payload access (metadata-only counters)
//  • No async
//  • No network, no filesystem, no env access
//  • Fail-open: missing fields → safe defaults
//  • Deterministic: same counter calls → same HaloState
//  • Presence-aware and band-aware only via metadata
//  • Bluetooth-aware only via metadata (no device control)
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  FACTORY — ALL DEPENDENCIES INJECTED BY THE CNS BRAIN
//  (Awareness Ring MUST HAVE ZERO RUNTIME IMPORTS BEYOND IDENTITY META)
// ============================================================================
export function createPulseHalo({ log, warn, error } = {}) {

  // -----------------------------------------------------------
  // INTERNAL STATE (metadata-only counters)
  //   • No payloads, no identities, only aggregate counts.
  // -----------------------------------------------------------
  const HaloState = {
    impulses_total: 0,
    impulses_completed: 0,

    // dual-mode awareness (symbolic vs binary vs dual)
    impulses_symbolic: 0,
    impulses_binary: 0,
    impulses_dual_mode: 0,

    reflex_drops: 0,
    immune_quarantines: 0,

    aura_loops: 0,
    aura_syncs: 0,

    hormone_boosts: 0,
    hormone_damps: 0,

    memory_writes: 0,

    mesh_hops: 0,

    flow_throttles: 0,

    // factoring awareness
    factoring_collapse_events: 0,
    factoring_bias_high: 0,
    factored_path_uses: 0,

    // presence / band awareness (metadata-only)
    presence_symbolic: 0,
    presence_binary: 0,
    presence_dual: 0,

    // advantage-field awareness (metadata-only)
    advantage_events: 0,
    advantage_binary_pref: 0,
    advantage_factored_paths: 0,

    // bluetooth presence awareness (metadata-only)
    bluetooth_events_total: 0,
    bluetooth_near: 0,
    bluetooth_mid: 0,
    bluetooth_far: 0,
    bluetooth_unknown: 0,
    bluetooth_link_quality_sum: 0,
    bluetooth_link_quality_samples: 0,
    bluetooth_ble: 0,
    bluetooth_wifi: 0,
    bluetooth_wired: 0,
    bluetooth_transport_unknown: 0,

    meta: {
      layer: "PulseHalo",
      role: "AWARENESS_RING",
      version: "24-IMMORTAL++",
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,
        localAware: true,
        internetAware: true,

        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,

        unifiedAdvantageField: true,
        futureEvolutionReady: true,
        signalFactoringAware: true,

        zeroCompute: true,           // no heavy compute, only ratios/heuristics
        zeroMutation: true,          // never mutates external objects
        zeroRoutingInfluence: true,  // awareness-only, no routing decisions

        // binary + presence awareness
        binaryAware: true,
        binaryMeshReady: true,
        binaryOSReady: true,
        presenceAware: true,
        bandAware: true,

        // bluetooth + proximity awareness
        bluetoothPresenceAware: true,
        bluetoothTransportAware: true,
        proximityTierAware: true
      }
    }
  };

  // -----------------------------------------------------------
  // BLUETOOTH PRESENCE CLASSIFICATION (metadata-only)
// -----------------------------------------------------------
  function classifyBluetoothPresence(bluetoothPresence) {
    if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

    HaloState.bluetooth_events_total++;

    const proximity = bluetoothPresence.proximityTier || "unknown";
    if (proximity === "near") {
      HaloState.bluetooth_near++;
    } else if (proximity === "mid") {
      HaloState.bluetooth_mid++;
    } else if (proximity === "far") {
      HaloState.bluetooth_far++;
    } else {
      HaloState.bluetooth_unknown++;
    }

    const transport = bluetoothPresence.transport || "unknown";
    if (transport === "ble") {
      HaloState.bluetooth_ble++;
    } else if (transport === "wifi") {
      HaloState.bluetooth_wifi++;
    } else if (transport === "wired") {
      HaloState.bluetooth_wired++;
    } else {
      HaloState.bluetooth_transport_unknown++;
    }

    const qRaw = Number(bluetoothPresence.linkQuality);
    if (Number.isFinite(qRaw)) {
      const q = clamp01(qRaw);
      HaloState.bluetooth_link_quality_sum += q;
      HaloState.bluetooth_link_quality_samples++;
    }
  }

  function clamp01(v) {
    if (v <= 0) return 0;
    if (v >= 1) return 1;
    return v;
  }

  // -----------------------------------------------------------
  // COUNTER HOOKS (called by other organs)
  //  (metadata-only, no payload access)
  // -----------------------------------------------------------
  const PulseHaloCounters = {
    // Called when an impulse starts its journey.
    // mode: "symbolic" | "binary" | "dual"
    // band: "symbolic" | "binary" | "dual"
    // presenceTag: arbitrary string (not stored, only used for band stats)
    // bluetoothPresence: {
    //   deviceId?: string,
    //   linkQuality?: number (0..1),
    //   proximityTier?: "near" | "mid" | "far" | "unknown",
    //   transport?: "ble" | "wifi" | "wired" | "unknown"
    // }
    impulseStarted({ mode, band, presenceTag, bluetoothPresence } = {}) {
      HaloState.impulses_total++;
      classifyMode(mode);
      classifyBand(band);
      trackPresenceTag(presenceTag);
      classifyBluetoothPresence(bluetoothPresence);
    },

    // Called when an impulse completes successfully.
    impulseCompleted() {
      HaloState.impulses_completed++;
    },

    // Safety-related events.
    reflexDropped() {
      HaloState.reflex_drops++;
    },
    immuneQuarantined() {
      HaloState.immune_quarantines++;
    },

    // Aura-related events.
    auraLooped() {
      HaloState.aura_loops++;
    },
    auraSyncTagged() {
      HaloState.aura_syncs++;
    },

    // Hormone modulation events.
    hormoneBoost() {
      HaloState.hormone_boosts++;
    },
    hormoneDamp() {
      HaloState.hormone_damps++;
    },

    // Memory events.
    memoryWrite() {
      HaloState.memory_writes++;
    },

    // Mesh traversal events.
    meshHops(count = 1) {
      HaloState.mesh_hops += count;
    },

    // Flow throttling events.
    impulseThrottled() {
      HaloState.flow_throttles++;
    },

    // Factoring events.
    factoringCollapsedManyToOne() {
      HaloState.factoring_collapse_events++;
    },
    factoringBiasHigh() {
      HaloState.factoring_bias_high++;
    },
    factoredPathUsed() {
      HaloState.factored_path_uses++;
      HaloState.advantage_factored_paths++;
      HaloState.advantage_events++;
    },

    // Advantage-field hooks (metadata-only).
    advantageBinaryPreferred() {
      HaloState.advantage_binary_pref++;
      HaloState.advantage_events++;
    }
  };

  // -----------------------------------------------------------
  // MODE CLASSIFICATION (symbolic vs binary vs dual)
  // -----------------------------------------------------------
  function classifyMode(mode) {
    if (!mode) return;
    if (mode === "binary") {
      HaloState.impulses_binary++;
    } else if (mode === "symbolic") {
      HaloState.impulses_symbolic++;
    } else if (mode === "dual") {
      HaloState.impulses_dual_mode++;
    }
  }

  // -----------------------------------------------------------
  // BAND / PRESENCE CLASSIFICATION (metadata-only)
  // -----------------------------------------------------------
  function classifyBand(band) {
    if (!band) return;
    if (band === "binary") {
      HaloState.presence_binary++;
    } else if (band === "symbolic") {
      HaloState.presence_symbolic++;
    } else if (band === "dual") {
      HaloState.presence_dual++;
    }
  }

  function trackPresenceTag(_presenceTag) {
    // Intentionally no storage of tag values — only counts via band.
    // Keeps Halo strictly metadata-aggregate, no identity registry.
  }

  // -----------------------------------------------------------
  // SNAPSHOT (read-only)
  // -----------------------------------------------------------
  function snapshot() {
    // Shallow clone; safe for dashboards + AI views.
    return {
      ...HaloState,
      meta: {
        ...HaloState.meta,
        evo: { ...HaloState.meta.evo }
      }
    };
  }

  // -----------------------------------------------------------
  // STATUS (dashboard view)
  // -----------------------------------------------------------
  function status() {
    const s = snapshot();

    const bluetooth_avg_link_quality =
      s.bluetooth_link_quality_samples > 0
        ? s.bluetooth_link_quality_sum / s.bluetooth_link_quality_samples
        : 0;

    return {
      meta: s.meta,

      impulses: {
        total: s.impulses_total,
        completed: s.impulses_completed,
        completion_rate: ratio(s.impulses_completed, s.impulses_total),

        symbolic: s.impulses_symbolic,
        binary: s.impulses_binary,
        dual_mode: s.impulses_dual_mode,

        symbolic_ratio: ratio(s.impulses_symbolic, s.impulses_total),
        binary_ratio: ratio(s.impulses_binary, s.impulses_total),
        dual_mode_ratio: ratio(s.impulses_dual_mode, s.impulses_total)
      },

      safety: {
        reflex_drops: s.reflex_drops,
        immune_quarantines: s.immune_quarantines,
        anomaly_rate: ratio(
          s.reflex_drops + s.immune_quarantines,
          s.impulses_total
        )
      },

      aura: {
        loops: s.aura_loops,
        syncs: s.aura_syncs
      },

      hormones: {
        boosts: s.hormone_boosts,
        damps: s.hormone_damps,
        modulation_events: s.hormone_boosts + s.hormone_damps
      },

      memory: {
        writes: s.memory_writes
      },

      mesh: {
        hops: s.mesh_hops,
        avg_hops: ratio(
          s.mesh_hops,
          s.impulses_completed || s.impulses_total
        )
      },

      flow: {
        throttles: s.flow_throttles,
        throttle_rate: ratio(
          s.flow_throttles,
          s.impulses_total
        )
      },

      factoring: {
        collapse_events: s.factoring_collapse_events,
        bias_high_events: s.factoring_bias_high,
        factored_path_uses: s.factored_path_uses,
        collapse_rate: ratio(
          s.factoring_collapse_events,
          s.impulses_total
        )
      },

      presence: {
        symbolic: s.presence_symbolic,
        binary: s.presence_binary,
        dual: s.presence_dual,
        symbolic_ratio: ratio(s.presence_symbolic, s.impulses_total),
        binary_ratio: ratio(s.presence_binary, s.impulses_total),
        dual_ratio: ratio(s.presence_dual, s.impulses_total)
      },

      advantage: {
        events: s.advantage_events,
        binary_preference_events: s.advantage_binary_pref,
        factored_path_advantage_events: s.advantage_factored_paths
      },

      bluetooth: {
        events_total: s.bluetooth_events_total,
        near: s.bluetooth_near,
        mid: s.bluetooth_mid,
        far: s.bluetooth_far,
        unknown: s.bluetooth_unknown,
        ble: s.bluetooth_ble,
        wifi: s.bluetooth_wifi,
        wired: s.bluetooth_wired,
        transport_unknown: s.bluetooth_transport_unknown,
        avg_link_quality: bluetooth_avg_link_quality
      },

      health: {
        stability: stability(s),
        drift_risk: drift(s)
      }
    };
  }

  // -----------------------------------------------------------
  // BACKEND_AI_VIEW (same as status, AI-facing)
  // -----------------------------------------------------------
  function statusForBackendAI() {
    return status();
  }

  // -----------------------------------------------------------
  // INTERNAL HELPERS (metadata-only heuristics)
  // -----------------------------------------------------------
  function ratio(n, d) {
    return d ? n / d : 0;
  }

  // Stability: 1 - anomaly density (clamped to [0,1]).
  function stability(s) {
    const anomalies =
      s.reflex_drops + s.immune_quarantines + s.aura_loops;
    const volume = s.impulses_total || 1;
    const r = anomalies / volume;
    return Math.max(0, 1 - Math.min(1, r));
  }

  // Drift: loop density minus sync protection (clamped to [0,1]).
  function drift(s) {
    const loops = s.aura_loops || 0;
    const syncs = s.aura_syncs || 0;
    const volume = s.impulses_total || 1;

    const base = loops / volume;
    const sync_protect = Math.min(0.5, syncs / volume);

    return Math.max(0, Math.min(1, base - sync_protect));
  }

  // -----------------------------------------------------------
  // PUBLIC INTERFACE
  // -----------------------------------------------------------
  return {
    counters: PulseHaloCounters,
    snapshot,
    status,
    statusForBackendAI,
    meta: HaloState.meta
  };
}
