// ============================================================================
//  PULSE OS — PulseWorldFightFlightResponse v20‑IMMORTAL‑PORTAL‑REFLEX
//  DUAL‑v20 ADRENAL REFLEX LOOP — “ACT NOW” + AI CONSOLE
//  White/Silver Organ • Reflex • Renewal • Non‑Interference
//  PURE REFLEX. ZERO COGNITION. ZERO NETWORK. ZERO BACKEND.
//  NO TIMERS. NO AUTONOMY. CNS / PORTAL‑TRIGGERED ONLY.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
//  HELPERS — deterministic hash (metadata only)
// ============================================================================
function simpleHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `act${h}`;
}

function buildActNowSignatureFromPacket(packet = {}) {
  const profileId = packet.profile?.id || packet.profile?.chunkProfile || "unknown-profile";
  const laneCount = packet.profile?.lanes || packet.lanes || 1;
  const chunkCount = Array.isArray(packet.chunks) ? packet.chunks.length : 0;
  const payloadHash = packet.payloadHash || simpleHash(JSON.stringify(packet.chunks || []));
  const reason = packet.reason || "compiler_chunk_update";
  const source = packet.source || "PulseWorld";

  return Object.freeze({
    profileId,
    laneCount,
    chunkCount,
    payloadHash,
    reason,
    source
  });
}

// ============================================================================
//  NARRATIVE BUILDER — AI Console v20 message fabric
// ============================================================================
function buildNarrative({ packet, signature, event }) {
  const route = packet?.route || "unknown";
  const intent = packet?.intent || "compile";
  const profileId = signature?.profileId || "unknown-profile";
  const chunkCount = signature?.chunkCount ?? 0;

  const summary =
    `Pulse: Evolving route "${route}" for intent "${intent}" ` +
    `(profile: ${profileId}, chunks: ${chunkCount}).`;

  const integrityHint =
    event?.analysis?.integrityStatus ||
    event?.analysis?.status ||
    "unknown";

  const healingHint =
    event?.report?.healingPlan?.kind ||
    event?.report?.renewalKind ||
    "frontend_hot_swap";

  return Object.freeze({
    summary,
    integrityHint,
    healingHint,
    route,
    intent,
    profileId,
    chunkCount
  });
}

// ============================================================================
//  FACTORY — Dual v20 Reflex Organ (ACTNow + AI Console)
// ============================================================================
export function createPulseWorldFightFlightResponseV20({
  PulseImmunity,
  PulseSurgeonGeneral,
  PulseAIConsole // v20 console organ
} = {}) {
  if (!PulseImmunity || !PulseSurgeonGeneral) {
    throw new Error("FightFlight v20: PulseImmunity and PulseSurgeonGeneral are required.");
  }
  if (!PulseAIConsole) {
    throw new Error("FightFlight v20: PulseAIConsole-v20 is required.");
  }

  // ------------------------------------------------------------------------
  // AI CONSOLE ANNOUNCEMENT (metadata only, deterministic)
  // ------------------------------------------------------------------------
  function announceToAIConsole(narrative) {
    try {
      const line = narrative?.summary || "Pulse: Evolution event triggered.";
      // Deterministic, single-line console message
      PulseAIConsole.onSystemNarration(line, {
        route: narrative.route,
        intent: narrative.intent,
        profileId: narrative.profileId,
        chunkCount: narrative.chunkCount,
        integrityHint: narrative.integrityHint,
        healingHint: narrative.healingHint
      });
    } catch {
      // Reflex must never throw because of console
    }
  }

  // ------------------------------------------------------------------------
  // CORE REFLEX — PURE, ZERO COGNITION
  // ------------------------------------------------------------------------
  function reflex(snapshot, { modeKind = "dual", triggerKind = "generic" } = {}) {
    if (!snapshot) return null;

    const analysis = PulseImmunity.analyze(snapshot);
    const report   = PulseSurgeonGeneral.command(analysis);

    return {
      ...ACTNOW_CONTEXT_V20,
      modeKind,
      triggerKind,
      kind: "AdrenalReflexEvent",
      analysis,
      report
    };
  }

  // ------------------------------------------------------------------------
  // ACTNOW PACKET REFLEX — WITH AI CONSOLE NARRATIVE
  // ------------------------------------------------------------------------
  function fromActNowPacket(packet, {
    modeKind = "dual",
    triggerKind = "actnow_packet",
    organismState = null,
    dualBandContext = null
  } = {}) {
    if (!packet) return null;

    const signature = buildActNowSignatureFromPacket(packet);

    const snapshot = Object.freeze({
      kind: "ActNowPacketSnapshot",
      actNowPacket: {
        profile: packet.profile || null,
        chunks: Array.isArray(packet.chunks) ? packet.chunks : [],
        payloadHash: signature.payloadHash,
        reason: signature.reason,
        source: signature.source
      },
      dualBandContext,
      organismState,
      signature
    });

    const event = reflex(snapshot, { modeKind, triggerKind });

    const diagnostics = {
      ok: true,
      profileId: signature.profileId,
      laneCount: signature.laneCount,
      chunkCount: signature.chunkCount
    };

    const healingState = {
      renewalSuggested: true,
      renewalKind: "frontend_hot_swap",
      renewalBand: "symbolic",
      renewalProfile: signature.profileId
    };

    const narrative = buildNarrative({ packet, signature, event });

    // AI Console v20: pre‑evolution narrative drop
    announceToAIConsole(narrative);

    return {
      event,
      diagnostics,
      signature,
      healingState,
      narrative
    };
  }

  return {
    meta: PulseWorldFightFlightResponseMetaV20,
    context: ACTNOW_CONTEXT_V20,

    reflex,
    fromActNowPacket
  };
}
