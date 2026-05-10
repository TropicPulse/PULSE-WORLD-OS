/* global log, error */
// ============================================================================
// FILE: /PULSE-PROXY/RouteDownAlert-v24.js
// PULSE OS — v24.0-IMMORTAL-ADVANTAGE++
// IMMUNE ALERT NODE / ROUTE FAILURE SENTINEL / AUTO-EMAIL
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";
import { PulseWorldEmailAlert } from "../PULSE-X/PulseWorldEmailAlert-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// META EXPORTS
export const RouteDownAlertMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMMUNE ORGAN FACTORY — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function createRouteDownAlertOrgan() {

  const VERSION = "24.0-IMMORTAL-ADVANTAGE++";
  const ORGAN_ID = "RouteDownAlert-v24-ImmortalAdvantage";

  // SAFE HELPERS
  function safeParse(event) {
    try { return JSON.parse(event?.body || "{}"); }
    catch { return {}; }
  }

  function safeString(v, fallback) {
    return typeof v === "string" && v.trim().length > 0 ? v : fallback;
  }

  function safeContext(raw) {
    if (!raw || typeof raw !== "object") return {};
    return {
      binaryMode: safeString(raw.binaryMode, "unknown"),
      pipelineId: safeString(raw.pipelineId, ""),
      sceneType: safeString(raw.sceneType, ""),
      workloadClass: safeString(raw.workloadClass, "")
    };
  }

  function safeBand(v) {
    return safeString(v, "symbolic");
  }

  function safePresenceTag(v) {
    return safeString(v, "RouteDownAlert");
  }

  // IMMUNE ARTERY
  function bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  function bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  }

  function bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  function computeImmuneArtery({ severity = 0.6, context = {} }) {
    const workload =
      context.workloadClass === "critical" ? 1 :
      context.workloadClass === "high"     ? 0.8 :
      context.workloadClass === "medium"   ? 0.5 :
      context.workloadClass === "low"      ? 0.3 :
      0.4;

    const pressure = Math.max(0, Math.min(1, severity * 0.7 + workload * 0.3));
    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    return Object.freeze({
      severity,
      workloadClass: context.workloadClass,
      throughput,
      throughputBucket: bucketLevel(throughput),
      pressure,
      pressureBucket: bucketPressure(pressure),
      cost,
      costBucket: bucketCost(cost),
      budget,
      budgetBucket: bucketLevel(budget)
    });
  }

  // ========================================================================
  // AUTO EMAIL — uses PulseWorldEmailAlert-v24 DIRECTLY
  // ========================================================================
  async function sendEmail(payload, artery) {

    // choose severity level
    const severity = payload.severity >= 0.8
      ? "critical"
      : "error";

    const emailPayload = {
      title: `ROUTE FAILURE: ${payload.routeId}`,
      message: `Route failure detected.\n\nError: ${payload.error}\nRoute: ${payload.routeId}\nBand: ${payload.band}`,
      routeId: payload.routeId,
      error: payload.error,
      band: payload.band,
      presenceTag: payload.presenceTag,
      context: payload.context,
      artery,
      organ: ORGAN_ID,
      version: VERSION,
      epoch: RouteDownAlertMeta.evo.epoch
    };

    try {
      if (severity === "critical") {
        await PulseWorldEmailAlert.sendCriticalAlert(emailPayload);
      } else {
        await PulseWorldEmailAlert.sendErrorAlert(emailPayload);
      }
    } catch (err) {
      error?.("🟥 EMAIL SEND FAILURE (RouteDownAlert-v24):", err);
    }
  }

  // ========================================================================
  // HANDLER — v24 IMMORTAL ADVANTAGE++
// ========================================================================
  const handler = async (event) => {
    try {
      const raw = safeParse(event);

      const payload = {
        error: safeString(raw.error, "Unknown error"),
        type: safeString(raw.type, "Unknown route"),
        routeId: safeString(raw.routeId, "unknown"),
        context: safeContext(raw.context),
        band: safeBand(raw.__band),
        presenceTag: safePresenceTag(raw.__presence),
        severity: typeof raw.severity === "number"
          ? Math.max(0, Math.min(1, raw.severity))
          : 0.6
      };

      const artery = computeImmuneArtery(payload);

      log?.("🧬 IMMUNE ALERT (v24-IMMORTAL-ADVANTAGE++) — ROUTE FAILURE", {
        meta: RouteDownAlertMeta,
        organId: ORGAN_ID,
        version: VERSION,
        ...payload,
        artery
      });

      await sendEmail(payload, artery);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          message: "RouteDownAlert received",
          ...payload,
          artery,
          organ: ORGAN_ID,
          version: VERSION,
          epoch: RouteDownAlertMeta.evo.epoch
        })
      };

    } catch (err) {
      error?.("🟥 IMMUNE ALERT NODE ERROR (v24-IMMORTAL-ADVANTAGE++):", err);

      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: "RouteDownAlert internal error",
          organ: ORGAN_ID,
          version: VERSION,
          epoch: RouteDownAlertMeta.evo.epoch
        })
      };
    }
  };

  return Object.freeze({
    meta: { organId: ORGAN_ID, version: VERSION, kernel: RouteDownAlertMeta },
    handler
  });
}

// ============================================================================
// SINGLETON HANDLER EXPORT
// ============================================================================
const _organSingleton = createRouteDownAlertOrgan();
export const handler = _organSingleton.handler;

export default {
  createRouteDownAlertOrgan,
  handler
};
