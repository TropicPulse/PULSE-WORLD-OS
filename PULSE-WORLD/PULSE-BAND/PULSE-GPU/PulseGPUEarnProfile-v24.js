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
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const ORGAN_CONTRACT_PulseGPUEarnProfile = Identity.OrganMeta.contract;
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
