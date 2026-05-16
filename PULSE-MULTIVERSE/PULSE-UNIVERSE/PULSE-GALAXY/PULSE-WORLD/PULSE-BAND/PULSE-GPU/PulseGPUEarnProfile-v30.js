// ============================================================================
// FILE: /PULSE-GPU/PulseGPUEarnProfile-v30-IMMORTAL-INTEL-OMEGA.js
// PULSE OS — v30 IMMORTAL-INTEL-OMEGA
// PULSE‑GPU EARN PROFILE — GPU BUDGETING FOR EARN + GAME LOOPS + EVOLUTION
// ============================================================================
//
// ROLE:
//   Determines how much GPU budget Earn Mode is allowed to use,
//   and how GPU behaves when a game-like loop is active — now with:
//     • GPU mode awareness (idle / warmup / active / burst / recovery)
//     • Binary-indexed budget surfaces
//     • Evolution-aware trust/risk shaping
//     • Dual-hash INTEL signatures for profile + budget
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
//     • gpuMode
//     • gpuEvolutionTier
//     • gpuEvolutionScore
//     • binaryBudgetIndex
//     • budgetSignatureIntel
//     • budgetSignatureClassic
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
// INTEL HASH HELPERS — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

// ============================================================================
// NUMERIC + MODE HELPERS
// ============================================================================

function toNumber(value, fallback) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(value, min, max) {
  const v = toNumber(value, min);
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

function clamp01(v) {
  return clamp(v, 0, 1);
}

function normalizeGpuMode(mode) {
  const m = String(mode || "idle").toLowerCase();
  if (m === "warmup") return "warmup";
  if (m === "active") return "active";
  if (m === "burst") return "burst";
  if (m === "recovery") return "recovery";
  return "idle";
}

// ============================================================================
// GPU EVOLUTION SURFACE — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================
//
// Uses only local hints (skin/security/thermal/battery) to shape a
// synthetic evolution surface — no hardware probing, no IO.
//
function computeGpuEvolutionSurface({ skin, security, thermal, battery, earnMode, gameMode }) {
  const gpuHints = skin && skin.gpuHints ? skin.gpuHints : {};
  const stabilityHint = toNumber(gpuHints.stabilityScore, 0.8);
  const bandwidthHint = toNumber(gpuHints.bandwidthMbps, 100);
  const capacityHint = toNumber(gpuHints.capacityScore, 1.0); // 0..2 synthetic

  const trust = security && security.trust ? security.trust : "unknown";
  const risk = security && security.risk ? security.risk : "unknown";

  let gpuMode = "idle";
  if (gameMode && earnMode) gpuMode = "burst";
  else if (gameMode) gpuMode = "active";
  else if (earnMode) gpuMode = "warmup";

  if (thermal === "critical" || battery === "critical") {
    gpuMode = "recovery";
  }

  const trustBoost =
    trust === "trusted" && (risk === "low" || risk === "unknown") ? 0.15 :
    risk === "high" || risk === "critical" ? -0.15 :
    0;

  const thermalPenalty =
    thermal === "critical" ? -0.3 :
    thermal === "high" ? -0.15 :
    0;

  const batteryPenalty =
    battery === "critical" ? -0.3 :
    battery === "low" ? -0.1 :
    0;

  const modeBase =
    gpuMode === "burst" ? 0.25 :
    gpuMode === "active" ? 0.18 :
    gpuMode === "warmup" ? 0.1 :
    gpuMode === "recovery" ? -0.1 :
    0;

  let raw =
    0.3 * clamp01(stabilityHint) +
    0.25 * clamp01(bandwidthHint / 300) +
    0.25 * clamp01(capacityHint / 2) +
    trustBoost +
    thermalPenalty +
    batteryPenalty +
    modeBase;

  const gpuEvolutionScore = clamp01(raw);

  const gpuEvolutionTier =
    gpuEvolutionScore >= 0.92 ? 4 :
    gpuEvolutionScore >= 0.75 ? 3 :
    gpuEvolutionScore >= 0.50 ? 2 :
    gpuEvolutionScore >= 0.25 ? 1 :
    0;

  const intelPayload = {
    gpuMode,
    gpuEvolutionScore,
    gpuEvolutionTier,
    stabilityHint,
    bandwidthHint,
    capacityHint,
    trust,
    risk,
    thermal,
    battery,
    earnMode: !!earnMode,
    gameMode: !!gameMode
  };

  const classicString =
    `GPU_EVOLVE_V30::mode:${gpuMode}` +
    `::score:${gpuEvolutionScore.toFixed(6)}` +
    `::tier:${gpuEvolutionTier}` +
    `::thermal:${thermal}` +
    `::battery:${battery}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_EARN_EVOLUTION_V30",
    intelPayload,
    classicString
  );

  return {
    gpuMode,
    gpuEvolutionScore,
    gpuEvolutionTier,
    evolutionSignatureIntel: sig.intel,
    evolutionSignatureClassic: sig.classic
  };
}

// ============================================================================
// BINARY BUDGET INDEX — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================
//
// Encodes the budget decision into a binary-like surface for other
// IMMORTAL layers to read (metadata only).
//
function buildBinaryBudgetIndex({
  gpuBudgetTier,
  earnModeGpuShare,
  gameModeGpuShare,
  thermalGuard,
  batteryGuard,
  schedulingPolicy,
  conflictPolicy,
  trustRiskBias,
  gpuMode,
  gpuEvolutionTier,
  gpuEvolutionScore
}) {
  const tierRank =
    gpuBudgetTier === "high" ? 3 :
    gpuBudgetTier === "medium" ? 2 :
    gpuBudgetTier === "low" ? 1 :
    0;

  const thermalRank =
    thermalGuard === "full" ? 2 :
    thermalGuard === "safe" ? 1 :
    0;

  const batteryRank =
    batteryGuard === "full" ? 2 :
    batteryGuard === "safe" ? 1 :
    0;

  const conflictRank =
    conflictPolicy === "game_wins" ? 2 :
    conflictPolicy === "earn_wins" ? 1 :
    0;

  const trustRank =
    trustRiskBias === "positive" ? 2 :
    trustRiskBias === "negative" ? 0 :
    1;

  const modeRank =
    gpuMode === "burst" ? 3 :
    gpuMode === "active" ? 2 :
    gpuMode === "warmup" ? 1 :
    gpuMode === "recovery" ? -1 :
    0;

  const surface =
    tierRank * 11 +
    thermalRank * 7 +
    batteryRank * 5 +
    conflictRank * 3 +
    trustRank * 2 +
    modeRank +
    Math.round(gpuEvolutionScore * 10);

  const binaryBudgetIndex = {
    gpuBudgetTier,
    tierRank,
    earnModeGpuShare,
    gameModeGpuShare,
    thermalGuard,
    batteryGuard,
    schedulingPolicy,
    conflictPolicy,
    trustRiskBias,
    gpuMode,
    gpuEvolutionTier,
    gpuEvolutionScore,
    surface,
    parity: surface % 2 === 0 ? 0 : 1,
    density:
      tierRank +
      thermalRank +
      batteryRank +
      conflictRank +
      trustRank +
      (gpuEvolutionTier || 0)
  };

  const classicString =
    `GPU_BUDGET_BIN_V30::tier:${gpuBudgetTier}` +
    `::earn:${earnModeGpuShare}` +
    `::game:${gameModeGpuShare}` +
    `::mode:${gpuMode}` +
    `::evoTier:${gpuEvolutionTier}` +
    `::surf:${surface}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_EARN_BUDGET_V30",
    binaryBudgetIndex,
    classicString
  );

  return {
    binaryBudgetIndex,
    budgetSignatureIntel: sig.intel,
    budgetSignatureClassic: sig.classic
  };
}

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL-INTEL-OMEGA
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
  // 1) TRUST/RISK BIAS (v30 refined)
  // ------------------------------------------------------------
  let trustRiskBias = "neutral";

  if (trust === "trusted" && (risk === "low" || risk === "unknown")) {
    trustRiskBias = "positive";
  } else if (risk === "high" || risk === "critical") {
    trustRiskBias = "negative";
  }

  // ------------------------------------------------------------
  // 2) GPU EVOLUTION SURFACE (mode + evolution tier)
  // ------------------------------------------------------------
  const evolution = computeGpuEvolutionSurface({
    skin,
    security,
    thermal,
    battery,
    earnMode,
    gameMode
  });

  const gpuMode = evolution.gpuMode;
  const gpuEvolutionTier = evolution.gpuEvolutionTier;
  const gpuEvolutionScore = evolution.gpuEvolutionScore;

  // ------------------------------------------------------------
  // 3) GPU BUDGET TIER (global, evolution-aware)
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

  // evolution-aware nudge: strong evolution tier can lift medium → high
  if (gpuBudgetTier === "medium" && gpuEvolutionTier >= 3) {
    gpuBudgetTier = "high";
  }

  // ------------------------------------------------------------
  // 4) EARN vs GAME GPU SHARE (v30 evolution-aware)
// ------------------------------------------------------------
  let earnModeGpuShare = 0;
  let gameModeGpuShare = 0;

  if (gameMode && earnMode) {
    // Conflict: game loops must win for latency reasons
    const baseEarn = gpuBudgetTier === "high" ? 25 : 10;
    const baseGame = gpuBudgetTier === "high" ? 75 : 90;

    const evoBoost = gpuEvolutionTier >= 3 ? 5 : gpuEvolutionTier >= 2 ? 2 : 0;
    earnModeGpuShare = baseEarn + evoBoost;
    gameModeGpuShare = Math.max(0, baseGame - evoBoost);
  } else if (gameMode) {
    const baseGame = gpuBudgetTier === "high" ? 100 : 80;
    const evoBoost = gpuEvolutionTier >= 3 ? 5 : 0;
    earnModeGpuShare = 0;
    gameModeGpuShare = Math.min(100, baseGame + evoBoost);
  } else if (earnMode) {
    let baseEarn =
      gpuBudgetTier === "high"
        ? 70
        : gpuBudgetTier === "medium"
        ? 50
        : gpuBudgetTier === "low"
        ? 25
        : 0;

    const evoBoost =
      gpuEvolutionTier >= 4 ? 10 :
      gpuEvolutionTier >= 3 ? 5 :
      gpuEvolutionTier >= 2 ? 2 :
      0;

    earnModeGpuShare = Math.min(100, baseEarn + evoBoost);
    gameModeGpuShare = 0;
  }

  // ------------------------------------------------------------
  // 5) CONFLICT POLICY
  // ------------------------------------------------------------
  let conflictPolicy = "balanced";

  if (gameMode && earnMode) {
    conflictPolicy = "game_wins"; // latency-critical
  } else if (earnMode) {
    conflictPolicy = "earn_wins";
  }

  // ------------------------------------------------------------
  // 6) SCHEDULING POLICY
  // ------------------------------------------------------------
  let schedulingPolicy = "fair";

  if (gameMode) schedulingPolicy = "game_priority";
  if (earnMode && !gameMode) schedulingPolicy = "earn_priority";

  // ------------------------------------------------------------
  // 7) THERMAL + BATTERY GUARDS
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

  // ------------------------------------------------------------
  // 8) BINARY BUDGET INDEX + INTEL SIGNATURES
  // ------------------------------------------------------------
  const {
    binaryBudgetIndex,
    budgetSignatureIntel,
    budgetSignatureClassic
  } = buildBinaryBudgetIndex({
    gpuBudgetTier,
    earnModeGpuShare,
    gameModeGpuShare,
    thermalGuard,
    batteryGuard,
    schedulingPolicy,
    conflictPolicy,
    trustRiskBias,
    gpuMode,
    gpuEvolutionTier,
    gpuEvolutionScore
  });

  // ------------------------------------------------------------
  // 9) FINAL PROFILE (v30 IMMORTAL-INTEL-OMEGA)
// ------------------------------------------------------------
  return {
    gpuBudgetTier,
    earnModeGpuShare,
    gameModeGpuShare,
    conflictPolicy,
    schedulingPolicy,
    thermalGuard,
    batteryGuard,
    trustRiskBias,

    gpuMode,
    gpuEvolutionTier,
    gpuEvolutionScore,
    evolutionSignatureIntel: evolution.evolutionSignatureIntel,
    evolutionSignatureClassic: evolution.evolutionSignatureClassic,

    binaryBudgetIndex,
    budgetSignatureIntel,
    budgetSignatureClassic
  };
}
