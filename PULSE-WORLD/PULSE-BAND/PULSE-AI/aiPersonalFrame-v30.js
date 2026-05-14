// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — PERSONAL FRAME ORGAN
//  User Preferences • Tone • Abstraction • Verbosity • Persona Routing
//  PURE READ-ONLY TO BINARY. GUARDED WRITES TO PERSONAL MEMORY LANES.
//  DUALBAND • TRUST-AWARE • ARTERY-AWARE • WINDOW-SAFE • DETERMINISTIC
//  META‑STRIPPED • IDENTITY‑PRESERVING • PULSE‑BINARY READY.
// ============================================================================


// ============================================================================
//  PACKET EMITTER — v30 deterministic, personal-frame-scoped (no PersonalFrameMeta)
// ============================================================================
function emitPersonalFramePacket(type, payload = {}) {
  return Object.freeze({
    packetType: `personal-frame-${type}`,
    timestamp: 0,
    layer: "personal-frame",
    role: "preferences",
    ...payload
  });
}

// Optional: PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "personal-frame"}::${safePayload.userId || ""}`;
  const docId = `pf-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`PERSONAL_FRAME_LOGS/${docId}`, safePayload);
}

// ============================================================================
//  ARTERY SNAPSHOT — v30 IMMORTAL++ (meta stripped, identity preserved)
// ============================================================================
function buildPersonalArterySnapshot({ context = {}, profile = {} } = {}) {
  return Object.freeze({
    type: "personal-frame-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    ownerMode: context.userIsOwner === true,
    tone: profile.tone,
    abstraction: profile.abstraction,
    verbosity: profile.verbosity,
    presenceTier: context.presenceTier || "idle",
    band: context.band || "symbolic"
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL++
// ============================================================================
export function prewarmPersonalFrame({
  trace = false,
  context = {},
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const artery = buildPersonalArterySnapshot({
    context,
    profile: {
      tone: "neutral",
      abstraction: "medium",
      verbosity: "normal"
    }
  });

  const packet = emitPersonalFramePacket("prewarm", {
    message: "PersonalFrame prewarmed and personal artery aligned.",
    artery
  });

  trustFabric?.recordPersonalFramePrewarm?.({ artery });
  juryFrame?.recordEvidence?.("personal-frame-prewarm", packet);
  writePulseBinaryLog(pulseBinaryAdapter, "prewarm", packet);

  if (trace) console.log("[PersonalFrame v30] prewarm", packet);
  return packet;
}

// ============================================================================
//  PERSONAL FRAME ORGAN — v30‑IMMORTAL++
// ============================================================================
export class AiPersonalFrame {
  constructor({ memoryAPI, defaultProfile = {}, pulseBinaryAdapter = null } = {}) {
    this.memoryAPI = memoryAPI || null;
    this.pulseBinaryAdapter = pulseBinaryAdapter || null;

    this.defaultProfile = Object.freeze({
      tone: "neutral",
      abstraction: "medium",
      verbosity: "normal",
      safetyMode: "standard",
      personaBias: null,
      ...defaultProfile
    });

    this.personalArtery = {
      lastTone: this.defaultProfile.tone,
      lastAbstraction: this.defaultProfile.abstraction,
      lastVerbosity: this.defaultProfile.verbosity,
      lastPresenceTier: "idle",
      lastBand: "symbolic",

      snapshot: (extra = {}) =>
        emitPersonalFramePacket(
          "snapshot",
          Object.freeze({
            tone: this.personalArtery.lastTone,
            abstraction: this.personalArtery.lastAbstraction,
            verbosity: this.personalArtery.lastVerbosity,
            presenceTier: this.personalArtery.lastPresenceTier,
            band: this.personalArtery.lastBand,
            ...extra
          })
        )
    };
  }

  // --------------------------------------------------------------------------
  //  LOAD PROFILE — lineage-aware, deterministic, trust-aware
  // --------------------------------------------------------------------------
  async loadProfile(context) {
    const userId = context?.userId || null;
    if (!userId || !this.memoryAPI?.getPersonalProfile) {
      return this.defaultProfile;
    }

    const stored = await this.memoryAPI.getPersonalProfile(userId);
    const profile = Object.freeze({
      ...this.defaultProfile,
      ...(stored || {})
    });

    this.personalArtery.lastTone = profile.tone;
    this.personalArtery.lastAbstraction = profile.abstraction;
    this.personalArtery.lastVerbosity = profile.verbosity;

    const packet = emitPersonalFramePacket("load-profile", {
      userId,
      profile
    });

    writePulseBinaryLog(this.pulseBinaryAdapter, "load-profile", packet);
    return profile;
  }

  // --------------------------------------------------------------------------
  //  UPDATE PROFILE — guarded write, IMMORTAL++ safe
  // --------------------------------------------------------------------------
  async updateProfile(context, patch = {}) {
    const userId = context?.userId || null;
    if (!userId || !this.memoryAPI?.setPersonalProfile) return null;

    const current = await this.loadProfile(context);
    const next = { ...current, ...patch };

    await this.memoryAPI.setPersonalProfile(userId, next);

    this.personalArtery.lastTone = next.tone;
    this.personalArtery.lastAbstraction = next.abstraction;
    this.personalArtery.lastVerbosity = next.verbosity;

    const packet = emitPersonalFramePacket("update-profile", {
      userId,
      profile: next
    });

    writePulseBinaryLog(this.pulseBinaryAdapter, "update-profile", packet);
    return Object.freeze(next);
  }

  // --------------------------------------------------------------------------
  //  SHAPE OUTPUT — Tone Engine v6 + Abstraction Governor v5 + Verbosity v5
  // --------------------------------------------------------------------------
  async shapeOutput({ context, text }) {
    const profile = await this.loadProfile(context);
    const presenceTier = context?.presenceTier || "idle";
    const band = context?.band || "symbolic";

    let result = String(text || "");

    // Verbosity v5
    if (profile.verbosity === "terse" && result.length > 600) {
      result = result.slice(0, 600) + " …";
    }

    if (profile.verbosity === "detailed") {
      result += "\n\nIf you'd like a shorter version, I can condense it.";
    }

    // Tone Engine v6 (presence-aware)
    if (profile.tone === "warm") {
      result =
        presenceTier === "critical"
          ? `Let’s keep this steady — ${result}`
          : `Alright — ${result}`;
    }

    if (profile.tone === "direct") {
      result = result.replace(/(?:\.\s*)?$/, ".");
    }

    if (profile.tone === "formal") {
      result = result.replace(/\bhey\b/gi, "Greetings");
    }

    if (profile.tone === "playful" && presenceTier !== "critical") {
      result += " 😄";
    }

    // Abstraction v5
    if (profile.abstraction === "low") {
      result = this._simplify(result);
    }

    if (profile.abstraction === "high") {
      result = this._expand(result);
    }

    this.personalArtery.lastPresenceTier = presenceTier;
    this.personalArtery.lastBand = band;

    const artery = buildPersonalArterySnapshot({ context, profile });

    const packet = emitPersonalFramePacket("shape-output", {
      userId: context?.userId || null,
      profile,
      presenceTier,
      band,
      artery
    });

    writePulseBinaryLog(this.pulseBinaryAdapter, "shape-output", packet);

    return { text: result, profile, artery };
  }

  // --------------------------------------------------------------------------
  //  INTERNAL HELPERS — deterministic simplify/expand
  // --------------------------------------------------------------------------
  _simplify(text) {
    return text
      .replace(/however,/gi, "but")
      .replace(/therefore,/gi, "so")
      .replace(/in summary/gi, "basically")
      .trim();
  }

  _expand(text) {
    return (
      text +
      "\n\nTo expand further: this can be broken down into principles, context, and practical implications."
    );
  }
}

// ============================================================================
//  PUBLIC API — Create Personal Frame Organ (v30)
// ============================================================================
export function createPersonalFrameOrgan(config = {}) {
  const core = new AiPersonalFrame(config);

  return Object.freeze({
    descriptor: Object.freeze({
      kind: "PersonalFrameOrgan",
      version: "v30",
      role: "preferences"
    }),
    async loadProfile(context) {
      return core.loadProfile(context);
    },
    async updateProfile(context, patch) {
      return core.updateProfile(context, patch);
    },
    async shapeOutput(payload) {
      return core.shapeOutput(payload);
    },
    arterySnapshot(extra) {
      return core.personalArtery.snapshot(extra);
    }
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    AiPersonalFrame,
    createPersonalFrameOrgan,
    prewarmPersonalFrame
  };
}
