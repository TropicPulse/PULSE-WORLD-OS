// ============================================================================
// FILE: /organs/immune/PulseMeshImmuneSystem-v24-IMMORTAL++.js
// PULSE OS — v24-IMMORTAL++
// MESH IMMUNE SYSTEM COMMANDER — “THE IMMUNE COMMANDER”
// Deterministic • Declarative • Zero Drift • Pure Logic • Presence/Band-Aware
// Bluetooth-Aware • Advantage-Aware • Mesh-Pressure-Aware
// ============================================================================
//
// ROLE (v24-IMMORTAL++):
//   • Receives diagnostic snapshots (Halo, Echo, Field, SDN).
//   • Performs deterministic triage (no pressure thresholds).
//   • Emits declarative repair directives for:
//        - GPUHealer (GPU immune response)
//        - RouteResponder (router immune response)
//        - Identity (self-repair directives)
//        - Mesh (pathway diagnostics)
//   • Never heals directly — only commands healers.
//   • Fully offline-capable (OFFLINE_MODE).
//   • Presence-aware, binary-aware, dual-band-ready, bluetooth-aware.
//   • Zero randomness, zero timestamps, zero mutation.
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

export function createPulseMeshImmuneSystem({
  PulseImmunity,
  GPUHealer,
  RouteResponder,
  OFFLINE_MODE = false,
  log,
  warn,
  error
}) {

  // ---------------------------------------------------------------------------
  // META — v24-IMMORTAL++ identity
  // ---------------------------------------------------------------------------
  const meta = {
    layer: "PulseMeshImmuneSystem",
    role: "IMMUNE_COMMANDER",
    version: "24-IMMORTAL++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      localAware: true,
      internetAware: true,

      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true,
      flowAware: true,
      driftAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,

      // v24++
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true
    },
    immunityEngine: PulseImmunity?.meta || null
  };


  // ---------------------------------------------------------------------------
  // ISSUE ENRICHMENT (v24-IMMORTAL++)
  // Deterministic enrichment with mode/band + lineage + bluetooth hints.
  // ---------------------------------------------------------------------------
  function enrichIssue(issue, context = {}) {
    const base = issue || {};

    const enriched = {
      ...base,
      binaryMode: !!context.binaryMode,
      dualMode: !!context.dualMode,
      presenceBand: context.presenceBand || base.presenceBand || "symbolic",

      lineageDepth: typeof base.lineageDepth === "number"
        ? base.lineageDepth
        : null,
      meshNodeId: base.meshNodeId ?? null,
      factoringDepth: base.factoringDepth ?? null,

      severity: normalizeSeverity(base.severity),

      tags: Array.isArray(base.tags) ? base.tags.slice() : []
    };

    // v24++ bluetooth metadata (purely descriptive)
    const bt = base.bluetooth || context.bluetooth || {};
    if (bt.proximity != null || bt.linkQuality != null || bt.events != null) {
      enriched.bluetooth = {
        proximity: bt.proximity ?? null,
        linkQuality: bt.linkQuality ?? null,
        events: bt.events ?? 0
      };

      if (!enriched.tags.includes("bluetooth-aware")) {
        enriched.tags.push("bluetooth-aware");
      }
    }

    return enriched;
  }

  function normalizeSeverity(sev) {
    if (sev == null) return 1;
    if (typeof sev !== "number" || Number.isNaN(sev)) return 1;
    if (sev < 0) return 0;
    if (sev > 10) return 10;
    return sev;
  }


  // ---------------------------------------------------------------------------
  // HEALER REGISTRY (unchanged semantics, v24 meta)
  // ---------------------------------------------------------------------------
  const HEALER_REGISTRY = [
    {
      name: "GPUHealer",
      match: /gpu|render|advisor|auto_opt/i,
      handler: (issue) => ({
        ok: true,
        type: "gpu_repair_directive",
        target: "PulseGPU",
        action: "repair",
        details: {
          driftType: issue.driftType ?? "unspecified",
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          lineageDepth: issue.lineageDepth ?? null,
          bluetooth: issue.bluetooth || null
        },
        result: GPUHealer?.repair
          ? GPUHealer.repair(issue)
          : null,
        issue
      })
    },
    {
      name: "RouteResponder",
      match: /route|network|timeout|stall|down/i,
      handler: (issue) => {
        if (OFFLINE_MODE) {
          return {
            ok: false,
            skipped: true,
            reason: "offline-mode",
            issue
          };
        }
        return {
          ok: true,
          type: "routing_repair_directive",
          target: "PulseRouter",
          action: "route_repair",
          details: {
            driftType: issue.driftType ?? "unspecified",
            severity: issue.severity ?? 1,
            note: issue.message ?? null,
            presenceBand: issue.presenceBand ?? null,
            lineageDepth: issue.lineageDepth ?? null,
            bluetooth: issue.bluetooth || null
          },
          result: RouteResponder
            ? RouteResponder(issue)
            : null,
          issue
        };
      }
    },
    {
      name: "IdentityDirective",
      match: /identity|auth|token|session/i,
      handler: (issue) => ({
        ok: true,
        type: "identity_repair_directive",
        target: "PulseIdentity",
        action: "self_repair",
        details: {
          driftType: issue.driftType ?? "unspecified",
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          bluetooth: issue.bluetooth || null
        },
        issue
      })
    },
    {
      name: "MeshDirective",
      match: /mesh|pathway|factoring|missing_node|stall/i,
      handler: (issue) => ({
        ok: true,
        type: "mesh_repair_directive",
        target: "PulseMesh",
        action: "analyze_pathway",
        details: {
          driftType: issue.driftType ?? "unspecified",
          factoringDepth: issue.factoringDepth ?? null,
          meshNodeId: issue.meshNodeId ?? null,
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          bluetooth: issue.bluetooth || null
        },
        issue
      })
    }
  ];


  // ---------------------------------------------------------------------------
  // TRIAGE (v24-IMMORTAL++)
  // Deterministic ordering — now also tags bluetooth-heavy issues, but no thresholds.
// ---------------------------------------------------------------------------
  function triage(analysis) {
    const { issues } = analysis;

    return issues.slice().sort((a, b) => {
      const sa = a.severity || 1;
      const sb = b.severity || 1;

      if (sb !== sa) return sb - sa;

      const aMsg = a.message || "";
      const bMsg = b.message || "";

      const aIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(aMsg);
      const bIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(bMsg);

      if (aIsMesh && !bIsMesh) return -1;
      if (!aIsMesh && bIsMesh) return 1;

      // v24++: bluetooth-heavy issues get slight priority, but still deterministic
      const aBt = a.bluetooth && (a.bluetooth.events || 0) > 0;
      const bBt = b.bluetooth && (b.bluetooth.events || 0) > 0;

      if (aBt && !bBt) return -1;
      if (!aBt && bBt) return 1;

      return 0;
    });
  }


  // ---------------------------------------------------------------------------
  // DISPATCH (v24-IMMORTAL++)
  // Declarative — no direct healing.
// ---------------------------------------------------------------------------
  async function dispatch(issue) {
    const msg = issue.message || "";

    for (const healer of HEALER_REGISTRY) {
      if (healer.match.test(msg)) {
        const res = healer.handler(issue);
        log && log("[PulseMeshImmuneSystem-v24] Dispatch", {
          healer: healer.name,
          issueMessage: msg,
          severity: issue.severity,
          presenceBand: issue.presenceBand,
          bluetooth: issue.bluetooth || null
        });
        return res;
      }
    }

    warn && warn("[PulseMeshImmuneSystem-v24] No healer found for issue", {
      message: msg,
      severity: issue.severity
    });

    return {
      ok: false,
      message: "No healer found for issue",
      issue
    };
  }


  // ---------------------------------------------------------------------------
  // COMMAND CYCLE (v24-IMMORTAL++)
  // Pure triage + directive emission.
// ---------------------------------------------------------------------------
  async function command(diagSnapshot, context = {}) {
    const analysis = PulseImmunity.analyze(diagSnapshot, {
      binaryMode: context.binaryMode,
      dualMode: context.dualMode,
      presenceBand: context.presenceBand,
      bluetooth: context.bluetooth || null
    });

    const enrichedIssues = (analysis.issues || []).map((issue) =>
      enrichIssue(issue, context)
    );

    const orderedIssues = triage({ ...analysis, issues: enrichedIssues });

    const results = [];

    for (const issue of orderedIssues) {
      const res = await dispatch(issue);
      results.push({ issue, result: res });
    }

    return {
      commander: "PulseMeshImmuneSystem",
      mode: OFFLINE_MODE ? "offline" : "online",
      binaryMode: !!context.binaryMode,
      dualMode: !!context.dualMode,
      presenceBand: context.presenceBand || "symbolic",
      bluetooth: context.bluetooth || null,
      meta,
      analysis: {
        ...analysis,
        issues: enrichedIssues
      },
      orderedIssues,
      results
    };
  }


  // ---------------------------------------------------------------------------
  // PUBLIC INTERFACE
  // ---------------------------------------------------------------------------
  return {
    meta,
    triage,
    dispatch,
    command
  };
}
