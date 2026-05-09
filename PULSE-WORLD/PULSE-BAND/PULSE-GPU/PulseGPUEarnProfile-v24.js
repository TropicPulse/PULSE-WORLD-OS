// ============================================================================
// FILE: /PULSE-GPU/PulseGPUEarnProfile-v24.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑GPU EARN PROFILE — GPU BUDGETING FOR EARN + GAME LOOPS
// ============================================================================
//
// ROLE:
//   Determines how much GPU budget Earn Mode is allowed to use,
//   and how GPU behaves when a game-like loop is active.
//
//   Outputs a deterministic EarnGPUProfile:
//
//     • gpuBudgetTier
//     • earnModeGpuShare
//     • gameModeGpuShare
//     • thermalGuard
//     • batteryGuard
//     • schedulingPolicy
//     • conflictPolicy (game vs earn)
//     • trustRiskBias
//
// CONTRACT:
//   • deterministic
//   • zero PII
//   • no tracking
//   • no identity inference
//   • no network
//   • drift-proof
//
// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulseGPUEarnProfile = {
  id: "pulsegpu.earn_profile",
  kind: "advantage_cortex",
  version: "v24-IMMORTAL++",
  role: "gpu_earn_budget_engine",
  surfaces: {
    band: ["gpu", "earn", "budget"],
    wave: ["throughput", "efficiency", "fairness"],
    binary: ["game_present", "game_absent"],
    presence: ["earn_gpu_state"],
    advantage: [
      "gpu_budget_tier",
      "earn_gpu_share",
      "game_gpu_share",
      "thermal_guard",
      "battery_guard",
      "conflict_policy",
      "scheduling_policy"
    ],
    speed: "instant_compute"
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulseGPUEarnProfile = {
  id: "organ.pulsegpu.earn_profile",
  organism: "PulseOS",
  layer: "advantage.gpu",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    zeroPII: true,
    zeroTracking: true,
    gpuAware: true,
    earnAware: true,
    gameAware: true,
    trustAware: true,
    riskAware: true,
    thermalAware: true,
    batteryAware: true,
    pulseStreamAware: true,
    fastLaneAware: true
  },
  lineage: {
    family: "pulsegpu_earn",
    generation: 1,
    osVersion: "v24",
    history: [
      "GPU Earn Profile v24 (IMMORTAL++ Budget Engine)"
    ]
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulseGPUEarnProfile = {
  inputs: {
    skin: "Pulse‑Touch skinState",
    security: "Pulse‑Touch security decision",
    earnMode: "boolean",
    gameMode: "boolean",
    thermal: "low | medium | high | critical",
    battery: "high | medium | low | critical"
  },
  outputs: {
    gpuBudgetTier: "none | low | medium | high | max",
    earnModeGpuShare: "0–100",
    gameModeGpuShare: "0–100",
    conflictPolicy: "game_wins | earn_wins | balanced",
    schedulingPolicy: "fair | game_priority | earn_priority",
    thermalGuard: "throttle | safe | full",
    batteryGuard: "throttle | safe | full",
    trustRiskBias: "positive | neutral | negative"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================

export function computeGPUEarnProfile({
  skin = {},
  security = {},
  earnMode = false,
  gameMode = false,
  thermal = "low",
  battery = "high"
} = {}) {
  const trust = security.trust || "unknown";
  const risk = security.risk || "unknown";

  // ------------------------------------------------------------
  // 1) TRUST/RISK BIAS
  // ------------------------------------------------------------
  let trustRiskBias = "neutral";

  if (trust === "trusted" && (risk === "low" || risk === "unknown")) {
    trustRiskBias = "positive";
  } else if (risk === "high" || risk === "critical") {
    trustRiskBias = "negative";
  }

  // ------------------------------------------------------------
  // 2) GPU BUDGET TIER (global)
  // ------------------------------------------------------------
  let gpuBudgetTier = "medium";

  if (thermal === "critical" || battery === "critical") {
    gpuBudgetTier = "none";
  } else if (thermal === "high" || battery === "low") {
    gpuBudgetTier = "low";
  } else if (trustRiskBias === "positive") {
    gpuBudgetTier = "high";
  } else if (trustRiskBias === "negative") {
    gpuBudgetTier = "low";
  }

  // ------------------------------------------------------------
  // 3) EARN vs GAME GPU SHARE
  // ------------------------------------------------------------
  let earnModeGpuShare = 0;
  let gameModeGpuShare = 0;

  if (gameMode && earnMode) {
    // Conflict: game loops must win for latency reasons
    earnModeGpuShare = gpuBudgetTier === "high" ? 25 : 10;
    gameModeGpuShare = gpuBudgetTier === "high" ? 75 : 90;
  } else if (gameMode) {
    earnModeGpuShare = 0;
    gameModeGpuShare = gpuBudgetTier === "high" ? 100 : 80;
  } else if (earnMode) {
    earnModeGpuShare =
      gpuBudgetTier === "high"
        ? 70
        : gpuBudgetTier === "medium"
        ? 50
        : gpuBudgetTier === "low"
        ? 25
        : 0;
    gameModeGpuShare = 0;
  }

  // ------------------------------------------------------------
  // 4) CONFLICT POLICY
  // ------------------------------------------------------------
  let conflictPolicy = "balanced";

  if (gameMode && earnMode) {
    conflictPolicy = "game_wins"; // latency-critical
  } else if (earnMode) {
    conflictPolicy = "earn_wins";
  }

  // ------------------------------------------------------------
  // 5) SCHEDULING POLICY
  // ------------------------------------------------------------
  let schedulingPolicy = "fair";

  if (gameMode) schedulingPolicy = "game_priority";
  if (earnMode && !gameMode) schedulingPolicy = "earn_priority";

  // ------------------------------------------------------------
  // 6) THERMAL + BATTERY GUARDS
  // ------------------------------------------------------------
  const thermalGuard =
    thermal === "critical"
      ? "throttle"
      : thermal === "high"
      ? "safe"
      : "full";

  const batteryGuard =
    battery === "critical"
      ? "throttle"
      : battery === "low"
      ? "safe"
      : "full";

  return {
    gpuBudgetTier,
    earnModeGpuShare,
    gameModeGpuShare,
    conflictPolicy,
    schedulingPolicy,
    thermalGuard,
    batteryGuard,
    trustRiskBias
  };
}
