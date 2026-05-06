/* ============================================================================
   PulseWorldEmailAlert-v17.js — IMMORTAL EMAIL ALERT ORGAN
   ----------------------------------------------------------------------------
   PURPOSE:
     • Provide a universal, future-proof email alert interface.
     • All alerts route to PulseOSShortTermMemory.sendDynamicEmail().
     • No templates are touched.
     • No backend logic is duplicated.
     • All future alert types are scaffolded and commented out.
   ============================================================================ */

import { PulseOSShortTermMemory } from "../PULSE-OS/PulseOSShortTermMemory.js";

/* ============================================================================
   CORE INTERNAL SENDER
   ============================================================================ */
async function _send(emailType, payload = {}) {
  try {
    if (!PulseOSShortTermMemory?.sendDynamicEmail) {
      console.warn("[EmailAlert] sendDynamicEmail missing");
      return false;
    }

    await PulseOSShortTermMemory.sendDynamicEmail({
      email: payload.email || "FordFamilyDelivery@gmail.com",
      emailType,
      payload
    });

    return true;
  } catch (err) {
    console.error("[EmailAlert] FAILED:", err);
    return false;
  }
}

/* ============================================================================
   PRIMARY ALERTS (ACTIVE)
   ============================================================================ */

export async function sendErrorAlert(message, meta = {}) {
  return _send("systemError", {
    ...meta,
    message,
    severity: "error"
  });
}

export async function sendCriticalAlert(message, meta = {}) {
  return _send("systemCritical", {
    ...meta,
    message,
    severity: "critical"
  });
}

export async function sendFallbackAlert(payload = {}) {
  return _send("systemFallback", {
    ...payload,
    severity: "fallback"
  });
}

export async function sendCustomAlert(emailType, payload = {}) {
  return _send(emailType, payload);
}

/* ============================================================================
   FUTURE ALERT TYPES (COMMENTED OUT)
   ============================================================================ */
/*

export async function sendLaneAlert(message, meta = {}) {
  return _send("laneAlert", { ...meta, message });
}

export async function sendEngineAlert(message, meta = {}) {
  return _send("engineAlert", { ...meta, message });
}

export async function sendPageAlert(message, meta = {}) {
  return _send("pageAlert", { ...meta, message });
}

export async function sendHeartbeatAlert(message, meta = {}) {
  return _send("heartbeatAlert", { ...meta, message });
}

export async function sendChunkerAlert(message, meta = {}) {
  return _send("chunkerAlert", { ...meta, message });
}

export async function sendSecurityAlert(message, meta = {}) {
  return _send("securityAlert", { ...meta, message });
}

export async function sendAdminAlert(message, meta = {}) {
  return _send("adminAlert", { ...meta, message });
}

export async function sendUserAlert(message, meta = {}) {
  return _send("userAlert", { ...meta, message });
}

export async function sendDevAlert(message, meta = {}) {
  return _send("devAlert", { ...meta, message });
}

export async function sendDebugAlert(message, meta = {}) {
  return _send("debugAlert", { ...meta, message });
}

export async function sendPerformanceAlert(message, meta = {}) {
  return _send("performanceAlert", { ...meta, message });
}

export async function sendMemoryAlert(message, meta = {}) {
  return _send("memoryAlert", { ...meta, message });
}

export async function sendNetworkAlert(message, meta = {}) {
  return _send("networkAlert", { ...meta, message });
}

export async function sendOfflineAlert(message, meta = {}) {
  return _send("offlineAlert", { ...meta, message });
}

export async function sendRecoveryAlert(message, meta = {}) {
  return _send("recoveryAlert", { ...meta, message });
}

export async function sendUpgradeAlert(message, meta = {}) {
  return _send("upgradeAlert", { ...meta, message });
}

export async function sendWorldAlert(message, meta = {}) {
  return _send("worldAlert", { ...meta, message });
}

*/

/* ============================================================================
   EXPORT DEFAULT
   ============================================================================ */
export const PulseWorldEmailAlert = {
  sendErrorAlert,
  sendCriticalAlert,
  sendFallbackAlert,
  sendCustomAlert
  // Future alerts are commented above
};

export default PulseWorldEmailAlert;
