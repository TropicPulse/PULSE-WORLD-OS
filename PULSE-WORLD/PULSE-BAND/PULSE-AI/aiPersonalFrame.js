// ==========// ============================================================================
//  PULSE OS v16‑IMMORTAL‑EVO — PERSONAL FRAME ORGAN
//  User Preferences • Tone • Abstraction • Verbosity • Persona Routing
//  PURE READ-ONLY TO BINARY. GUARDED WRITES TO PERSONAL MEMORY LANES.
//  DUALBAND • PRESENCE-AWARE • OVERMIND-PRIME-AWARE • DETERMINISTIC
// =========================================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PersonalFrameMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
//  PACKET EMITTER — deterministic, personal-frame-scoped
// ============================================================================
function emitPersonalFramePacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: PersonalFrameMeta,
    packetType: `personal-frame-${type}`,
    packetId: `personal-frame-${type}-${now}`,
    timestamp: now,
    epoch: PersonalFrameMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — IMMORTAL‑EVO
// ============================================================================
export function prewarmPersonalFrame({ trace = false, context = {} } = {}) {
  const packet = emitPersonalFramePacket("prewarm", {
    message: "PersonalFrame prewarmed and personal artery aligned.",
    context: {
      presenceTier: context.presenceTier || "idle",
      band: context.band || "symbolic"
    }
  });

  if (trace && typeof console !== "undefined") {
    console.log("[PersonalFrame] prewarm", packet);
  }
  return packet;
}

// ============================================================================
//  PERSONAL FRAME ORGAN — v16‑IMMORTAL‑EVO
// ============================================================================
export class AiPersonalFrame {
  constructor({ memoryAPI, defaultProfile = {} } = {}) {
    this.memoryAPI = memoryAPI || null;

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
        emitPersonalFramePacket("snapshot", Object.freeze({
          tone: this.personalArtery.lastTone,
          abstraction: this.personalArtery.lastAbstraction,
          verbosity: this.personalArtery.lastVerbosity,
          presenceTier: this.personalArtery.lastPresenceTier,
          band: this.personalArtery.lastBand,
          ...extra
        }))
    };
  }

  // --------------------------------------------------------------------------
  //  LOAD PROFILE — lineage-aware, deterministic
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

    emitPersonalFramePacket("load-profile", {
      userId,
      tone: profile.tone,
      abstraction: profile.abstraction,
      verbosity: profile.verbosity
    });

    return profile;
  }

  // --------------------------------------------------------------------------
  //  UPDATE PROFILE — guarded write
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

    emitPersonalFramePacket("update-profile", {
      userId,
      tone: next.tone,
      abstraction: next.abstraction,
      verbosity: next.verbosity
    });

    return Object.freeze(next);
  }

  // --------------------------------------------------------------------------
  //  SHAPE OUTPUT — Tone Engine v5 + Abstraction Governor v4 + Verbosity v4
  // --------------------------------------------------------------------------
  async shapeOutput({ context, text }) {
    const profile = await this.loadProfile(context);
    const presenceTier = context?.presenceTier || "idle";
    const band = context?.band || "symbolic";

    let result = String(text || "");

    // Verbosity v4
    if (profile.verbosity === "terse" && result.length > 600) {
      result = result.slice(0, 600) + " …";
    }

    if (profile.verbosity === "detailed") {
      result += "\n\nIf you'd like a shorter version, I can condense it.";
    }

    // Tone Engine v5 (presence-aware)
    if (profile.tone === "warm") {
      result = presenceTier === "critical"
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

    // Abstraction v4
    if (profile.abstraction === "low") {
      result = this._simplify(result);
    }

    if (profile.abstraction === "high") {
      result = this._expand(result);
    }

    this.personalArtery.lastPresenceTier = presenceTier;
    this.personalArtery.lastBand = band;

    emitPersonalFramePacket("shape-output", {
      userId: context?.userId || null,
      tone: profile.tone,
      abstraction: profile.abstraction,
      verbosity: profile.verbosity,
      presenceTier,
      band
    });

    return { text: result, profile };
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
//  PUBLIC API — Create Personal Frame Organ
// ============================================================================
export function createPersonalFrameOrgan(config = {}) {
  const core = new AiPersonalFrame(config);

  return Object.freeze({
    meta: PersonalFrameMeta,
    async loadProfile(context) { return core.loadProfile(context); },
    async updateProfile(context, patch) { return core.updateProfile(context, patch); },
    async shapeOutput(payload) { return core.shapeOutput(payload); },
    arterySnapshot(extra) { return core.personalArtery.snapshot(extra); }
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    PersonalFrameMeta,
    AiPersonalFrame,
    createPersonalFrameOrgan,
    prewarmPersonalFrame
  };
}
