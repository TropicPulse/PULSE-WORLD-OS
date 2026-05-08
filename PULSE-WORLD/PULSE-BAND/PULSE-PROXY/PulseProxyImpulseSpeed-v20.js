// ============================================================================
// FILE: /PULSE-PROXY/PulseProxyImpulseSpeed.js
// PULSE OS v20‑IMMORTAL++ — IMPULSE SPEED GOVERNOR
// “ADVANTAGE‑AWARE SPEED POLICY ENGINE / DRIFT‑ENVELOPE GOVERNOR / BURST SAFETY”
// Pure Backend Organ • Deterministic • Drift‑Proof • Zero Network • Zero IO
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseProxyImpulseSpeed",
  version: "v20-ImmortalPlus-SpeedGovernor",
  layer: "speed_governor",
  role: "impulse_speed_policy_engine",

  lineage: {
    root: "PulseProxy-v11",
    parent: "PulseProxyImpulseSpeed-v16.3",
    organismIntegration: "v20-ImmortalPlus",
    worldIntegration: "PulseWorld-v21-Immortal",
    spinalIntegration: "PulseOSSpinalCord-v20-ImmortalPlus"
  },

  evo: {
    deterministic: true,
    driftProof: true,
    immortalReady: true,
    backendOnly: true,
    multiInstanceReady: true,

    // Speed cascades
    speedAware: true,
    speedEnvelopeAware: true,
    speedCascadeAware: true,
    impulseAware: true,
    innerAgentAware: true,
    outerAgentAware: true,
    proxySpineAware: true,
    worldSpeedAware: true,

    // Advantage + presence
    advantageAware: true,
    advantageCascadeAware: true,
    unifiedAdvantageField: true,
    presenceAware: true,
    bandAware: true,
    worldLensAware: true,

    // Healing + drift
    healingAware: true,
    driftEnvelopeAware: true,
    loadEnvelopeAware: true,

    // IMMORTAL guarantees
    zeroRandomness: true,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true
  },

  contract: {
    input: [
      "ImpulseSpeedField",
      "InnerAgentSpeedField",
      "OuterAgentSpeedField",
      "ProxySpineSpeedField",
      "WorldSpeedField",
      "AdvantageField",
      "PresenceField",
      "ExperienceField",
      "HealingState"
    ],
    output: [
      "SpeedPolicy",
      "SpeedEnvelope",
      "SpeedMultiplier",
      "SpeedBand",
      "SpeedDiagnostics",
      "SpeedHealingState"
    ],
    consumers: [
      "PulseOSImpulseEngine",
      "PulseProxyInnerAgent",
      "PulseProxySpine",
      "PulseProxyOuterAgent",
      "PulseWorldCore",
      "PulseNetSpeedGovernor"
    ]
  }
};
*/

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ============================================================================
// v20‑IMMORTAL++ SPEED GOVERNOR — CORE LOGIC
// ============================================================================
export function computeSpeedPolicy({
  impulseSpeed = null,
  innerSpeed = null,
  outerSpeed = null,
  proxySpeed = null,
  worldSpeed = null,

  advantage = null,
  presence = null,
  experience = null,
  healing = null
} = {}) {

  // Extract safe numeric values
  const i = impulseSpeed?.speedScore ?? 0;
  const n = innerSpeed?.speedScore ?? 0;
  const o = outerSpeed?.speedScore ?? 0;
  const p = proxySpeed?.speedScore ?? 0;
  const w = worldSpeed?.speedScore ?? 0;

  const a = advantage?.advantageScore ?? 0;
  const presenceTier = presence?.tier ?? "normal";

  const load = experience?.load ?? "normal";
  const drift = healing?.drift ?? 0;

  // --------------------------------------------------------------------------
  // v20: Multi‑vector speed cascade fusion
  // --------------------------------------------------------------------------
  const cascadeCount = [i, n, o, p, w].filter(v => v > 0).length || 1;
  const combinedSpeed = (i + n + o + p + w) / cascadeCount;

  // --------------------------------------------------------------------------
  // Base multiplier from combined speed
  // --------------------------------------------------------------------------
  let multiplier = 1 + combinedSpeed * 200; // up to ~200×

  // --------------------------------------------------------------------------
  // v20: Advantage cascade shaping
  // --------------------------------------------------------------------------
  if (a > 0.70) multiplier *= 1.40;   // +40%
  if (a > 0.85) multiplier *= 1.25;   // +25%
  if (a > 0.95) multiplier *= 1.15;   // +15%

  // --------------------------------------------------------------------------
  // v20: Presence tier shaping
  // --------------------------------------------------------------------------
  if (presenceTier === "low") multiplier *= 0.85;
  if (presenceTier === "critical") multiplier *= 0.60;

  // --------------------------------------------------------------------------
  // Load penalties
  // --------------------------------------------------------------------------
  if (load === "moderate") multiplier *= 0.70;
  if (load === "heavy") multiplier *= 0.40;

  // --------------------------------------------------------------------------
  // Drift penalties (IMMORTAL safety)
  // --------------------------------------------------------------------------
  if (drift > 0.30) multiplier *= 0.60;
  if (drift > 0.60) multiplier *= 0.30;
  if (drift > 0.80) multiplier *= 0.10;

  // --------------------------------------------------------------------------
  // IMMORTAL envelope clamp
  // --------------------------------------------------------------------------
  const safeMultiplier = clamp(multiplier, 1, 1000);

  // --------------------------------------------------------------------------
  // Speed band classification
  // --------------------------------------------------------------------------
  let speedBand = "normal";
  if (safeMultiplier < 20) speedBand = "elevated";
  else if (safeMultiplier < 100) speedBand = "high";
  else if (safeMultiplier < 300) speedBand = "very-high";
  else speedBand = "burst";

  // --------------------------------------------------------------------------
  // Envelope classification (IMMORTAL safety)
  // --------------------------------------------------------------------------
  let envelope = "safe";

  if (load === "heavy" || drift > 0.60) envelope = "restricted";
  if (drift > 0.80) envelope = "unsafe";

  // --------------------------------------------------------------------------
  // Diagnostics
  // --------------------------------------------------------------------------
  const diagnostics = {
    impulseSpeed: i,
    innerSpeed: n,
    outerSpeed: o,
    proxySpeed: p,
    worldSpeed: w,

    advantage: a,
    presenceTier,
    load,
    drift,

    combinedSpeed,
    rawMultiplier: multiplier
  };

  // --------------------------------------------------------------------------
  // Healing state
  // --------------------------------------------------------------------------
  const healingState = {
    lastSpeedBand: speedBand,
    lastEnvelope: envelope,
    lastMultiplier: safeMultiplier,
    drift,
    load,
    presenceTier
  };

  // --------------------------------------------------------------------------
  // Final IMMORTAL policy
  // --------------------------------------------------------------------------
  return {
    allowed: envelope !== "unsafe",
    speedMultiplier: safeMultiplier,
    speedBand,
    envelope,
    diagnostics,
    healingState,
    signature: computeHash(
      `SPEED_POLICY::${safeMultiplier}::${speedBand}::${envelope}::${presenceTier}::${a}`
    )
  };
}
