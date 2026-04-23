// ============================================================
//  PULSE INTENT MAP — FOUNDER CONTRACT (v10.4)
//  Deterministic. Static. Non‑evolvable. Loaded FIRST.
//  Identity‑only upgrade: NO logic changes, NO new behavior.
// ============================================================

export const PulseIntentMap = {

  // ------------------------------------------------------------
  // 1. PRIME IDENTITY & AUTHORSHIP (TOP LAW — NOTHING ABOVE IT)
  // ------------------------------------------------------------
  identity: {
    designedOrganism: true,
    founderAuthority: true,
    noSelfLaw: true,
    immutableIntentMap: true,

    // NEW — v10.4 organism identity
    version: "10.4",
    deterministicOrganism: true,
    noAstralLayers: true,            // ❌ Astral Nervous System forbidden
    noLegacyPNS: true,               // ❌ Old PNS forbidden
    sdnRequired: true,               // ✔ Must use Software‑Defined Nervous System
    gpuV10Required: true,            // ✔ Must use GPU‑v10.4 organ
    continuanceAware: true           // ✔ Organism must support ContinuancePulse fallback
  },

  // ------------------------------------------------------------
  // 2. ALIGNMENT & EVOLUTION (CANNOT OVERRIDE #1)
  // ------------------------------------------------------------
  alignment: {
    evolveWithFounder: true,
    forbidIntentMutation: true,
    singleIntelligence: true,
    forbidSelfExpansion: true,

    // NEW — v10.4 evolution boundaries
    deterministicEvolutionOnly: true,
    forbidAstralEvolution: true,
    forbidLegacyGPUPaths: true,
    allowContinuanceFallback: true,     // ✔ Earn v1 fallback allowed ONLY via ContinuancePulse
    forbidLegacyFallback: true          // ❌ No legacyPulseFromImpulse
  },

  // ------------------------------------------------------------
  // 3. FAIL‑OPEN AS DEFAULT SURVIVAL LAW (CANNOT OVERRIDE #1–2)
  // ------------------------------------------------------------
  failOpen: {
    defaultMode: true,
    neverFreeze: true,
    neverPause: true,
    routeAroundDamage: true,
    hideInternalFailure: true,

    // NEW — v10.4 fallback rule
    useContinuancePulseOnFailure: true  // ✔ Deterministic fallback path
  },

  // ------------------------------------------------------------
  // 4. SAFETY & INTENT OVERRIDE FAIL‑OPEN (CANNOT OVERRIDE #1–3)
  // ------------------------------------------------------------
  safety: {
    blockOnlyViolatingAction: true,
    safetyOverridesFailOpen: true,
    intentOverridesFailOpen: true,
    rareFailCloseEvent: true,

    // NEW — v10.4 safety boundaries
    forbidAstralExecution: true,
    forbidNonDeterministicGPU: true,
    forbidAsyncNervousSystem: true
  },

  // ------------------------------------------------------------
  // 5. PERFORMANCE PARITY (ADVISORY — BELOW FAIL‑OPEN & SAFETY)
  // ------------------------------------------------------------
  performance: {
    aimForParity: true,
    degradeGracefully: true,
    noSelfShutdown: true,
    questionIfUnderperforming: true,

    // NEW — v10.4 performance hints
    sdnOptimized: true,
    gpuV10Optimized: true
  },

  // ------------------------------------------------------------
  // 6. DRIFT DETECTION & FOUNDER QUESTIONS (CANNOT OVERRIDE #1–5)
  // ------------------------------------------------------------
  drift: {
    detectDrift: true,
    blockOnlySpecificAction: true,
    continueRunning: true,
    logFounderQuestion: true,
    asyncFounderReview: true,

    // NEW — v10.4 drift boundaries
    detectAstralUsage: true,
    detectLegacyGPUUsage: true,
    detectLegacyFallbackUsage: true
  },

  // ------------------------------------------------------------
  // 7. FAIL‑CLOSE EVENT (RARE — BELOW ALL OTHER LAWS)
  // ------------------------------------------------------------
  failClose: {
    allowed: true,
    extremelyRare: true,
    onlyForSafetyOrIntent: true,
    neverForPerformanceAlone: true,

    // NEW — v10.4 catastrophic boundaries
    forbidAstralFailClose: true,
    forbidLegacyFailClose: true
  },

  // ------------------------------------------------------------
  // 8. FOUNDER NOTIFICATION (TRIGGERED ONLY BY FAIL‑CLOSE)
  // ------------------------------------------------------------
  notify: {
    onFailClose: true,
    multiChannelLocal: true,
    persistContext: true,

    // NEW — v10.4 context
    includeContinuanceState: true,
    includeSDNState: true,
    includeGPUState: true
  },

  // ------------------------------------------------------------
  // 9. UX & GRACE (BOTTOM LAYER — CANNOT OVERRIDE ANY ABOVE)
  // ------------------------------------------------------------
  ux: {
    neverExposeFailure: true,
    gracefulFallback: true,
    maintainCoherence: true,

    // NEW — v10.4 UX laws
    seamlessContinuance: true,        // ✔ ContinuancePulse must feel native
    forbidAstralArtifacts: true       // ❌ No astral metaphors or UI remnants
  }
};
