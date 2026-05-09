// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-PRESENCE-ORACLE.js
//  ORGAN: PulseTouchPresenceOracle (v24 IMMORTAL++)
//  ROLE: Presence Intensity / Stability / Oracle Hints
// ============================================================================

export const AI_EXPERIENCE_META_PulsePresenceOracle = {
  id: "pulsetouch.presence_oracle",
  kind: "outer_sense",
  version: "v24-IMMORTAL++",
  role: "presence_oracle",
  surfaces: {
    band: ["presence", "intensity", "stability"],
    wave: ["quiet", "stabilizing"],
    presence: ["presence_state"],
    speed: "async_parallel"
  }
};

export const ORGAN_META_PulsePresenceOracle = {
  id: "organ.pulsetouch.presence_oracle",
  organism: "PulseTouch",
  layer: "outer_sense.presence",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    presenceAware: true,
    presenceIntensityAware: true,
    regionClusterAware: true
  }
};

export const ORGAN_CONTRACT_PulsePresenceOracle = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    history: "Optional presence history"
  },
  outputs: {
    presenceIntensity: "low | medium | high",
    stability: "stable | unstable",
    oracleHints: "Hints for Warmup / Security / Advantage"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulsePresenceOracle = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

export function PulsePresenceOracle() {
  function evaluate(pulseTouch, history = []) {
    const presence = pulseTouch?.presence || "unknown";

    let presenceIntensity = "low";
    if (presence === "active") presenceIntensity = "high";
    else if (presence === "idle") presenceIntensity = "medium";

    const stability = history.length > 3 ? "stable" : "unstable";

    const oracleHints = {
      warmupBias:
        presenceIntensity === "high" ? "full" :
        presenceIntensity === "medium" ? "safe" : "minimal",

      securityBias:
        stability === "unstable" ? "cautious" : "normal"
    };

    return { presenceIntensity, stability, oracleHints };
  }

  return {
    meta: ORGAN_META_PulsePresenceOracle,
    contract: ORGAN_CONTRACT_PulsePresenceOracle,
    overlays: IMMORTAL_OVERLAYS_PulsePresenceOracle,
    evaluate
  };
}
