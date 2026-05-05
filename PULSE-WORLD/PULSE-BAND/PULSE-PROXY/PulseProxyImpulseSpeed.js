// ============================================================================
// FILE: /PULSE-PROXY/PulseProxyImpulseSpeed.js
// PULSE OS v16.3‑IMMORTAL — IMPULSE SPEED GOVERNOR
// “SPEED GOVERNOR / ENVELOPE ENGINE / ADVANTAGE‑AWARE SPEED POLICY”
// Pure Backend Organ • Deterministic • Drift‑Proof • No Network
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseProxyImpulseSpeed",
  version: "v16.3-Immortal-SpeedGovernor",
  layer: "speed_governor",
  role: "impulse_speed_policy_engine",

  lineage: {
    root: "PulseProxy-v11",
    parent: "PulseProxyImpulseSpeed-v15",
    organismIntegration: "v16-Immortal"
  },

  evo: {
    deterministic: true,
    driftProof: true,
    immortalReady: true,
    backendOnly: true,
    multiInstanceReady: true,

    speedAware: true,
    speedEnvelopeAware: true,
    speedCascadeAware: true,
    advantageAware: true,
    experienceAware: true,
    healingAware: true,

    bandAware: true,
    presenceAware: true,
    proxySpineAware: true,
    outerAgentAware: true,
    impulseAware: true,

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
      "AdvantageField",
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
      "PulseWorldCore"
    ]
  },

  experience: {
    description:
      "Determines safe impulse speed based on advantage, drift, load, presence, and " +
      "outer/inner/proxy speed cascades. Prevents over-speed collapse while allowing " +
      "100×–300× operation and controlled 1000× bursts.",
    aiUsageHint:
      "Use SpeedPolicy to decide when to quicken, extend, or stabilize impulses."
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
// SPEED GOVERNOR — CORE LOGIC
// ============================================================================
export function computeSpeedPolicy({
  impulseSpeed = null,
  innerSpeed = null,
  outerSpeed = null,
  proxySpeed = null,
  advantage = null,
  experience = null,
  healing = null
} = {}) {

  // Extract safe numeric values
  const i = impulseSpeed?.speedScore ?? 0;
  const n = innerSpeed?.speedScore ?? 0;
  const o = outerSpeed?.speedScore ?? 0;
  const p = proxySpeed?.speedScore ?? 0;

  const a = advantage?.advantageScore ?? 0;
  const load = experience?.load ?? "normal";
  const drift = healing?.drift ?? 0;

  // Combine speed signals
  const combinedSpeed = (i + n + o + p) / (i || n || o || p ? 4 : 1);

  // Base multiplier from combined speed
  let multiplier = 1 + combinedSpeed * 200; // up to ~200×

  // Advantage boosts
  if (a > 0.7) multiplier *= 1.5; // +50%
  if (a > 0.85) multiplier *= 1.3; // +30%

  // Load penalties
  if (load === "heavy") multiplier *= 0.4;
  if (load === "moderate") multiplier *= 0.7;

  // Drift penalties
  if (drift > 0.3) multiplier *= 0.6;
  if (drift > 0.6) multiplier *= 0.3;

  // Clamp to safe envelope
  const safeMultiplier = clamp(multiplier, 1, 1000);

  // Determine band
  let speedBand = "normal";
  if (safeMultiplier < 20) speedBand = "elevated";
  else if (safeMultiplier < 100) speedBand = "high";
  else if (safeMultiplier < 300) speedBand = "very-high";
  else speedBand = "burst";

  // Envelope classification
  let envelope = "safe";
  if (drift > 0.6 || load === "heavy") envelope = "restricted";
  if (drift > 0.8) envelope = "unsafe";

  const diagnostics = {
    impulseSpeed: i,
    innerSpeed: n,
    outerSpeed: o,
    proxySpeed: p,
    advantage: a,
    load,
    drift,
    combinedSpeed,
    rawMultiplier: multiplier
  };

  const healingState = {
    lastSpeedBand: speedBand,
    lastEnvelope: envelope,
    lastMultiplier: safeMultiplier,
    drift,
    load
  };

  return {
    allowed: envelope !== "unsafe",
    speedMultiplier: safeMultiplier,
    speedBand,
    envelope,
    diagnostics,
    healingState,
    signature: computeHash(
      `SPEED_POLICY::${safeMultiplier}::${speedBand}::${envelope}`
    )
  };
}
