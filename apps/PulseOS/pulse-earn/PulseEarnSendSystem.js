// ============================================================================
//  PulseEarnSendSystem-v11-Evo.js
//  Earn Nervous System Conductor (v11-Evo GOVERNED)
//  Deterministic Single‑Pass Earn → Pulse → Send (No async, No loops)
//  v11: Diagnostics + Signatures + Pattern Surface + Continuance Fallback
// ============================================================================
//
//  SAFETY CONTRACT (v11-Evo):
//  --------------------------
//  • No async.
//  • No network.
//  • No GPU.
//  • No miner.
//  • No compute.
//  • Zero randomness.
//  • Zero timestamps.
//  • Zero mutation outside instance.
// ============================================================================

import { createEarn, evolveEarn } from "./PulseEarn-v11-Evo.js";
import { PulseEarnContinuancePulse } from "./PulseEarnContinuancePulse-v11-Evo.js";


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
//  GOVERNOR — Earn Loop Guard (v11-Evo)
// ============================================================================
function isEarnReentryImpulse(impulse) {
  if (!impulse || !impulse.payload) return false;

  const earn = impulse.payload.earn;
  if (!earn) return false;

  if (earn.role?.identity === "PulseEarn-v11-Evo") return true;
  if (earn.__earnEnvelope === true) return true;

  return false;
}

function tagImpulseAsEarnSent(impulse, pulseCompatibleEarn) {
  const basePayload = impulse.payload || {};

  return {
    ...impulse,
    payload: {
      ...basePayload,
      earn: {
        ...(pulseCompatibleEarn || {}),
        __earnEnvelope: true
      },
      __earnSent: true
    }
  };
}


// ============================================================================
//  INTERNAL: Try Earn v11 (deterministic)
// ============================================================================
function tryEarnV11(impulse) {
  try {
    const baseEarn = createEarn({
      jobId: impulse.tickId,
      pattern:
        impulse.intent ||
        impulse.payload?.pattern ||
        "UNKNOWN_EARN_PATTERN",
      payload: impulse.payload || {},
      priority: impulse.payload?.priority || "normal",
      returnTo: impulse.payload?.returnTo || null,
      parentLineage: impulse.payload?.parentLineage || null,
      pageId: impulse.payload?.pageId || "NO_PAGE"
    });

    const evolved =
      typeof evolveEarn === "function"
        ? evolveEarn(baseEarn, {
            source: "PulseEarnSendSystem-v11",
            intent: impulse.intent,
            lineage: impulse.payload?.parentLineage || null
          })
        : baseEarn;

    return { ok: true, earn: evolved || baseEarn };
  } catch (err) {
    return { ok: false, error: err };
  }
}


// ============================================================================
//  INTERNAL: Build Earn v1 fallback via ContinuancePulse (v11-Evo)
// ============================================================================
function buildEarnV1Continuance(impulse) {
  const cont = PulseEarnContinuancePulse.build(impulse);
  return cont.earn;
}


// ============================================================================
//  INTERNAL: Wrap Earn organism into Pulse-compatible shape (v11-Evo)
// ============================================================================
function wrapEarnForPulse(earn) {
  return {
    PulseRole: earn.EarnRole,
    jobId: earn.jobId,
    pattern: earn.pattern,
    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    pageId: earn.pageId,
    meta: {
      ...(earn.meta || {}),
      origin: "Earn",
      earnVersion: earn.EarnRole?.version || "unknown",
      earnIdentity: earn.EarnRole?.identity || "Earn",
      earnEnvelope: true
    },

    earn: {
      role: earn.EarnRole,
      pattern: earn.pattern,
      lineage: earn.lineage,
      meta: earn.meta,
      __earnEnvelope: true
    }
  };
}


// ============================================================================
//  FACTORY — SDN‑aware PulseEarnSendSystem (v11-Evo GOVERNED)
// ============================================================================
export function createPulseEarnSendSystem({
  sendSystem,
  sdn = null,
  log = console.log
}) {

  function emitSDN(event, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(event, payload);
    } catch (err) {
      log && log("[PulseEarnSendSystem-v11-Evo] SDN emit failed (non‑fatal)", { event, err });
    }
  }

  return {
    // Deterministic Single‑Pass Earn → Pulse → Send
    send(impulse) {
      emitSDN("earnSend:begin", {
        tickId: impulse.tickId,
        intent: impulse.intent
      });

      // ================================================================
      // 0. GOVERNOR — block Earn re-entry
      // ================================================================
      if (isEarnReentryImpulse(impulse)) {
        const blocked = {
          ok: false,
          blocked: true,
          reason: "earn_reentry_blocked",
          impulse,
          note: "Earn → Send → Earn loop prevented."
        };
        emitSDN("earnSend:blocked", blocked);
        return blocked;
      }

      // ================================================================
      // 1. Try Earn v11
      // ================================================================
      const v11 = tryEarnV11(impulse);

      let earn = null;
      let usedFallback = false;

      if (v11.ok) {
        earn = v11.earn;
        emitSDN("earnSend:earn-v11", {
          tickId: impulse.tickId,
          pattern: earn.pattern,
          lineageDepth: earn.lineage.length
        });
      } else {
        // ================================================================
        // 2. Fallback to Earn v1 via ContinuancePulse
        // ================================================================
        earn = buildEarnV1Continuance(impulse);
        usedFallback = true;
        emitSDN("earnSend:earn-v1-fallback", {
          tickId: impulse.tickId,
          error: String(v11.error),
          pattern: earn.pattern
        });
      }

      // ================================================================
      // 3. Wrap Earn organism for Pulse
      // ================================================================
      const pulseCompatibleEarn = wrapEarnForPulse(earn);

      emitSDN("earnSend:wrapped", {
        tickId: impulse.tickId,
        earnIdentity: earn.EarnRole.identity,
        pulseCompatibleEarn
      });

      // ================================================================
      // 4. Tag impulse as Earn → Pulse (single-pass)
      // ================================================================
      const governedImpulse = tagImpulseAsEarnSent(
        impulse,
        pulseCompatibleEarn
      );

      const earnSendSignature = computeHash(
        earn.pattern +
        "::" +
        earn.lineage.length +
        "::" +
        (usedFallback ? "fallback" : "primary")
      );

      // ================================================================
      // 5. Delegate to PulseSendSystem (deterministic)
      // ================================================================
      const result = sendSystem.send(governedImpulse);

      const out = {
        ok: true,
        earn,
        pulseCompatibleEarn,
        result,
        fallback: usedFallback,
        earnSendSignature
      };

      emitSDN("earnSend:complete", out);
      return out;
    }
  };
}
