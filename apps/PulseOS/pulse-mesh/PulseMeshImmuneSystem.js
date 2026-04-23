// ============================================================================
// FILE: /apps/organs/immune/PulseMeshImmuneSystem.js
// PULSE OS — v10.4
// MESH IMMUNE SYSTEM COMMANDER — “THE IMMUNE COMMANDER”
// Deterministic • Declarative • Zero Drift • Pure Logic
// ============================================================================
//
// ROLE (v10.4):
//   • Receives diagnostic snapshots (Halo, Echo, Field, SDN).
//   • Performs deterministic triage (no pressure thresholds).
//   • Emits declarative repair directives for:
//        - GPUHealer (GPU immune response)
//        - RouteResponder (router immune response)
//        - Identity (self-repair directives)
//        - Mesh (pathway diagnostics)
//   • Never heals directly — only commands healers.
//   • Fully offline-capable (OFFLINE_MODE).
//   • Zero randomness, zero timestamps, zero mutation.
// ============================================================================

export function createPulseMeshImmuneSystem({
  PulseImmunity,        // v10.4 analysis engine
  GPUHealer,            // updated GPU immune organ
  RouteResponder,       // updated router immune organ
  OFFLINE_MODE = false,
  log,
  warn,
  error
}) {

  // ---------------------------------------------------------------------------
  // META — v10.4 identity
  // ---------------------------------------------------------------------------
  const meta = {
    layer: "PulseMeshImmuneSystem",
    role: "IMMUNE_COMMANDER",
    version: "10.4",
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
      deterministicField: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true
    }
  };

  // ---------------------------------------------------------------------------
  // HEALER REGISTRY (v10.4)
  // Pure declarative directives — no direct mutation.
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
          severity: issue.severity ?? "info",
          note: issue.message ?? null
        },
        result: GPUHealer.repair(issue),
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
            severity: issue.severity ?? "info",
            note: issue.message ?? null
          },
          result: RouteResponder(issue),
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
          severity: issue.severity ?? "info",
          note: issue.message ?? null
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
          severity: issue.severity ?? "info",
          note: issue.message ?? null
        },
        issue
      })
    }
  ];

  // ---------------------------------------------------------------------------
  // TRIAGE (v10.4)
  // Deterministic ordering — no pressure thresholds.
  // ---------------------------------------------------------------------------
  function triage(analysis) {
    const { issues } = analysis;

    return issues.slice().sort((a, b) => {
      const sa = a.severity || 1;
      const sb = b.severity || 1;

      // Higher severity first
      if (sb !== sa) return sb - sa;

      // Mesh issues always prioritized secondarily
      const aIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(a.message || "");
      const bIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(b.message || "");

      if (aIsMesh && !bIsMesh) return -1;
      if (!aIsMesh && bIsMesh) return 1;

      return 0;
    });
  }

  // ---------------------------------------------------------------------------
  // DISPATCH (v10.4)
  // Declarative — no direct healing.
  // ---------------------------------------------------------------------------
  async function dispatch(issue) {
    const msg = issue.message || "";

    for (const healer of HEALER_REGISTRY) {
      if (healer.match.test(msg)) {
        return healer.handler(issue);
      }
    }

    return {
      ok: false,
      message: "No healer found for issue",
      issue
    };
  }

  // ---------------------------------------------------------------------------
  // COMMAND CYCLE (v10.4)
  // Pure triage + directive emission.
  // ---------------------------------------------------------------------------
  async function command(diagSnapshot) {
    const analysis = PulseImmunity.analyze(diagSnapshot);

    const orderedIssues = triage(analysis);

    const results = [];

    for (const issue of orderedIssues) {
      const res = await dispatch(issue);
      results.push({ issue, result: res });
    }

    return {
      commander: "PulseMeshImmuneSystem",
      mode: OFFLINE_MODE ? "offline" : "online",
      meta,
      analysis,
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
