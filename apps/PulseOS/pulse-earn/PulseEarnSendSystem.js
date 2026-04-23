// ============================================================================
//  PulseEarnSendSystem.js — Earn Nervous System Conductor (v10.4 GOVERNED)
//  Deterministic Single‑Pass Earn → Pulse → Send (No async, No loops)
// ============================================================================
//
//  ROLE (v10.4):
//    • Accept an Impulse (from Earn worker / UI / system).
//    • Try to build Earn v2 (deterministic organism).
//    • If Earn v2 fails → fallback to Earn v1 (legacy pulse-style).
//    • Wrap Earn organism into Pulse-compatible payload (tagged, single-use).
//    • Delegate routing/mesh/send to PulseSendSystem ONCE per Earn lifecycle.
//    • Enforce loop‑theory: no Earn → Send → Earn re-entry.
//
//  SAFETY (v10.4):
//    • No async.
//    • No network.
//    • No GPU.
//    • No miner.
//    • No compute.
//    • Pure internal orchestration + loop governor.
//    • Deterministic only.
// ============================================================================
// ============================================================================
//  PulseEarnSendSystem.js — Earn Nervous System Conductor (v10.4 GOVERNED)
//  Deterministic Single‑Pass Earn → Pulse → Send (No async, No loops)
//  NOW WITH: ContinuancePulse fallback (Earn v1 survival mode)
// ============================================================================
// ============================================================================
//  PulseEarnSendSystem.js — Earn Nervous System Conductor (v10.4 GOVERNED)
//  Deterministic Single‑Pass Earn → Pulse → Send (No async, No loops)
//  NOW WITH: ContinuancePulse fallback + SDN‑aware orchestration
// ============================================================================

import { createEarn, evolveEarn } from "./PulseEarn.js";
import { PulseEarnContinuancePulse } from "./PulseEarnContinuancePulse.js";

// NOTE:
//  • PulseSendSystem is injected, not imported.
//  • SDN is injected, not imported.


// ============================================================================
//  INTERNAL: Earn Loop Guard / Governor (v10.4)
// ============================================================================
function isEarnReentryImpulse(impulse) {
  if (!impulse || !impulse.payload) return false;

  const earn = impulse.payload.earn;
  if (!earn) return false;

  // v2 identity
  if (earn.EarnRole?.identity === "Earn-v2") return true;

  // v1-style wrapper
  if (earn.EarnRole?.kind === "Earn") return true;
  if (earn.role?.identity === "Earn-v2") return true;
  if (earn.kind === "Earn") return true;

  // explicit guard flag
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
//  INTERNAL: Try to build Earn v2 safely (deterministic)
// ============================================================================
function tryEarnV2(impulse) {
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
      parentLineage: impulse.payload?.parentLineage || null
    });

    const evolved =
      typeof evolveEarn === "function"
        ? evolveEarn(baseEarn, {
            source: "PulseEarnSendSystem",
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
//  INTERNAL: Build Earn v1 fallback via ContinuancePulse (v10.4)
// ============================================================================
function buildEarnV1Continuance(impulse) {
  const cont = PulseEarnContinuancePulse.build(impulse);
  return cont.earn; // Earn v1 organism
}


// ============================================================================
//  INTERNAL: Wrap Earn organism into Pulse-compatible shape (v10.4)
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
    meta: {
      ...(earn.meta || {}),
      origin: "Earn",
      earnVersion: earn.EarnRole?.version || "unknown",
      earnIdentity: earn.EarnRole?.identity || earn.EarnRole?.kind || "Earn",
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
//  FACTORY — SDN‑aware PulseEarnSendSystem (v10.4 GOVERNED)
// ============================================================================
export function createPulseEarnSendSystem({
  sendSystem,   // required: PulseSendSystem instance (already wired with SDN)
  sdn = null,   // optional: SDN instance
  log = console.log
}) {
  function emitSDN(event, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(event, payload);
    } catch (err) {
      log && log("[PulseEarnSendSystem] SDN emit failed (non‑fatal)", { event, err });
    }
  }

  return {
    // Deterministic Single‑Pass Earn → Pulse → Send
    send(impulse) {
      emitSDN("earnSend:begin", { impulse });

      // 0. GOVERNOR: block Earn re-entry / loops
      if (isEarnReentryImpulse(impulse)) {
        const blocked = {
          ok: false,
          blocked: true,
          reason: "earn_reentry_blocked",
          impulse,
          note:
            "Impulse already carries an Earn envelope; Earn → Send → Earn loop prevented."
        };
        emitSDN("earnSend:blocked", blocked);
        return blocked;
      }

      // 1. Try Earn v2
      const v2 = tryEarnV2(impulse);

      let earn = null;
      let usedFallback = false;

      if (v2.ok) {
        earn = v2.earn;
        emitSDN("earnSend:earn-v2", { impulse, earn });
      } else {
        // 2. Fallback to Earn v1 via ContinuancePulse
        earn = buildEarnV1Continuance(impulse);
        usedFallback = true;
        emitSDN("earnSend:earn-v1-fallback", {
          impulse,
          error: String(v2.error),
          earn
        });
      }

      // 3. Wrap Earn organism for Pulse
      const pulseCompatibleEarn = wrapEarnForPulse(earn);
      emitSDN("earnSend:wrapped", { impulse, earn, pulseCompatibleEarn });

      // 4. Tag impulse as having passed through Earn → Pulse ONCE
      const governedImpulse = tagImpulseAsEarnSent(
        impulse,
        pulseCompatibleEarn
      );

      // 5. Delegate EVERYTHING to PulseSendSystem (deterministic)
      const result = sendSystem.send(governedImpulse);

      const out = {
        ok: true,
        earn,
        pulseCompatibleEarn,
        result,
        fallback: usedFallback
      };

      emitSDN("earnSend:complete", out);
      return out;
    }
  };
}
