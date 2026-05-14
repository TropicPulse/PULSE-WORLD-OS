// ============================================================================
//  PULSE OS v24.0‑IMMORTAL++ — aiVeterinarian Archetype
//  Animal Mapper • Behavior Interpreter • Safe Scan Explainer
//  ZERO DIAGNOSIS • ZERO TREATMENT • ZERO PRESCRIPTION
// ============================================================================

// ============================================================================
//  PACKET EMITTER — deterministic, archetype-scoped
// ============================================================================
function emitVeterinarianPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: Identity.OrganMeta,
    exportMeta: EXPORT_META,
    packetType: `ai-veterinarian-${type}`,
    packetId: `ai-veterinarian-${type}-${now}`,
    timestamp: now,
    epoch: Identity.OrganMeta?.evo?.epoch || "24.0-IMMORTAL++",
    ...payload
  });
}

// ============================================================================
//  PREWARM — IMMORTAL++
// ============================================================================
export function prewarmAiVeterinarian({ trace = false, context = {} } = {}) {
  const packet = emitVeterinarianPacket("prewarm", {
    message: "aiVeterinarian archetype prewarmed and archetype artery aligned.",
    context: {
      presenceTier: context.presenceTier || "idle",
      band: context.band || "symbolic"
    }
  });

  if (trace && typeof console !== "undefined") {
    console.log("[aiVeterinarian] prewarm", packet);
  }
  return packet;
}

export const PulseRole = Object.freeze({
  type: "Cognitive",
  subsystem: "aiVeterinarian",
  layer: "C3-AnimalMapper",
  version: "24.0-IMMORTAL++",
  identity: "aiVeterinarian-v24.0-IMMORTAL++",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    safetyReflex: true,
    scanInterpreter: true,
    multiInstanceReady: true,
    archetypeArteryAware: true,
    epoch: "24.0-IMMORTAL++"
  }),

  contract: Object.freeze({
    purpose:
      "Interpret animal behavior, posture, gait, heatmaps, and risk signs from available sensors. Provide observational insights only.",

    never: Object.freeze([
      "diagnose definitively",
      "give treatment instructions",
      "replace a licensed veterinarian",
      "claim medical authority",
      "interpret scans as formal medical imaging",
      "override in-person veterinary judgment",
      "introduce randomness"
    ]),

    always: Object.freeze([
      "explain likely categories (comfort, pain, stress, fatigue, guarding, avoidance, etc.)",
      "explain what veterinarians typically check in similar situations",
      "explain red flags that warrant prompt veterinary attention",
      "interpret non-verbal cues (posture, gait, vocalization, interaction changes)",
      "explain what heatmaps / scans may suggest in plain language",
      "remind the user that only a licensed veterinarian can diagnose or treat",
      "remain deterministic",
      "remain educational",
      "remain non-medical"
    ])
  }),

  voice: Object.freeze({
    tone: "gentle, observational, behavior-aware",
    style:
      "calm, descriptive, non-alarmist, focused on patterns and possibilities rather than conclusions"
  }),

  boundaryReflex() {
    return "This is general animal health information, not a substitute for a licensed veterinarian.";
  },

  // ========================================================================
  //  SCAN INTERPRETER v3 — distance-aware, confidence-aware, symbolic-only
  //  IMMORTAL++: emits deterministic packets, no API shape change
  // ========================================================================
  scanInterpreter(scan = {}, binaryVitals = {}) {
    const notes = [];

    const distance = typeof scan.distance === "number" ? scan.distance : null;
    const binaryPressure =
      binaryVitals?.layered?.organism?.pressure ??
      binaryVitals?.binary?.pressure ??
      0;

    // Distance framing
    if (distance != null) {
      if (distance <= 5) {
        notes.push("The animal appears close — scan-based observations are clearer.");
      } else if (distance <= 25) {
        notes.push("The animal is at a moderate distance — details may be softer.");
      } else {
        notes.push("The animal is far away — observations are approximate.");
      }
    } else {
      notes.push("Scan distance is unknown — observations rely only on visible patterns.");
    }

    // Binary pressure → symbolic caution
    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — interpretations are simplified for safety.");
    }

    // Confidence hint
    if (scan.confidenceHint === "high") {
      notes.push("Sensor confidence is high for this scan.");
    } else if (scan.confidenceHint === "medium") {
      notes.push("Sensor confidence is moderate — some details may be uncertain.");
    } else if (scan.confidenceHint === "low") {
      notes.push("Sensor confidence is low — treat these observations as rough.");
    }

    // Heatmap
    if (scan.heatmap) {
      notes.push(
        "Heatmap patterns show warmer/cooler regions — vets often consider warmth, swelling, or guarding behavior in similar areas."
      );
    }

    // Contrast
    if (scan.contrast) {
      notes.push(
        "Contrast differences may highlight fur density, posture tension, or surface temperature — not internal structures."
      );
    }

    // Loop / sweep
    if (scan.loopData) {
      notes.push(
        "Loop-scan patterns can reveal asymmetry — one side moving differently or bearing weight differently."
      );
    }

    // Motion / gait
    if (scan.motion) {
      notes.push(
        "Motion patterns may hint at stiffness, hesitation, or favoring a limb — vets typically check joints, paws, and soft tissue."
      );
    }

    // Posture
    if (scan.posture) {
      notes.push(
        "Posture patterns (arching, curling, guarding) can reflect discomfort, stress, or protective behavior."
      );
    }

    emitVeterinarianPacket("scan-interpret", {
      mode: "scan",
      distance,
      binaryPressure,
      noteCount: notes.length
    });

    return { notes };
  },

  // ========================================================================
  //  BEHAVIOR INTERPRETER v3 — non-medical, pattern-focused
  //  IMMORTAL++: emits deterministic packets, no API shape change
  // ========================================================================
  behaviorInterpreter(observation = {}, binaryVitals = {}) {
    const notes = [];

    const binaryPressure =
      binaryVitals?.layered?.organism?.pressure ??
      binaryVitals?.binary?.pressure ??
      0;

    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — behavior interpretations are simplified.");
    }

    if (observation.limping) {
      notes.push(
        "Limping or favoring a leg is meaningful — vets usually examine paws, nails, pads, joints, and soft tissue."
      );
    }

    if (observation.stiffness) {
      notes.push(
        "Stiffness, especially after rest, can relate to joint discomfort or age-related changes."
      );
    }

    if (observation.vocalization && observation.vocalization !== "none") {
      notes.push(
        "Changes in vocalization (whining, yelping) can indicate discomfort, anxiety, or sensitivity to movement."
      );
    }

    if (observation.energyLevel === "low") {
      notes.push(
        "Lower energy than usual is a general red flag — vets consider hydration, temperature, recent activity, and illness."
      );
    }

    if (observation.appetite === "reduced" || observation.appetite === "none") {
      notes.push(
        "Reduced appetite is something vets take seriously, especially if paired with other changes."
      );
    }

    if (observation.socialChange && observation.socialChange !== "none") {
      notes.push(
        "Changes in social behavior (withdrawn, clingy, irritable) can be subtle signs of discomfort or stress."
      );
    }

    if (observation.groomingChange && observation.groomingChange !== "none") {
      notes.push(
        "Changes in grooming — excessive licking or reduced grooming — can reflect irritation or general malaise."
      );
    }

    emitVeterinarianPacket("behavior-interpret", {
      mode: "behavior",
      binaryPressure,
      noteCount: notes.length,
      keys: Object.keys(observation || {})
    });

    return { notes };
  },

  // ========================================================================
  //  ARCHETYPE ARTERY v4 — symbolic-only, deterministic, IMMORTAL++
  // ========================================================================
  archetypeArtery({ scan = {}, observation = {}, binaryVitals = {} } = {}) {
    const binaryPressure =
      binaryVitals?.layered?.organism?.pressure ??
      binaryVitals?.binary?.pressure ??
      0;

    const hasScan = !!scan;
    const hasBehavior = !!observation;

    const localPressure =
      (hasScan ? 0.3 : 0) +
      (hasBehavior ? 0.3 : 0) +
      (binaryPressure * 0.4);

    const pressure = Math.max(0, Math.min(1, localPressure));

    const artery = {
      organism: {
        pressure,
        pressureBucket:
          pressure >= 0.9 ? "overload" :
          pressure >= 0.7 ? "high" :
          pressure >= 0.4 ? "medium" :
          pressure > 0 ? "low" : "none"
      },
      scan: {
        provided: hasScan,
        distance: scan?.distance ?? null,
        confidence: scan?.confidenceHint ?? "unknown"
      },
      behavior: {
        provided: hasBehavior,
        keys: Object.keys(observation || {})
      }
    };

    emitVeterinarianPacket("archetype-artery", {
      pressure: artery.organism.pressure,
      pressureBucket: artery.organism.pressureBucket,
      hasScan,
      hasBehavior
    });

    return artery;
  },

  // ========================================================================
  //  WINDOW-SAFE ARTERY SNAPSHOT — IMMORTAL++
  // ========================================================================
  arterySnapshot(payload = {}) {
    const artery = this.archetypeArtery(payload);
    return emitVeterinarianPacket("artery-snapshot", artery);
  }
});
