// ============================================================================
//  PULSE OS v7.4 — LOGGING CORTEX
//  Unified Logging • Subsystem Identity • Zero Drift
//  This file centralizes ALL logging behavior across PulseOS.
// ============================================================================

import { PulseColors, PulseRoles, PulseVersion } from "./PulseIdentity.js";

// ============================================================================
//  INTERNAL — Format a subsystem log prefix
// ============================================================================
function formatPrefix(subsystem) {
  const role = PulseRoles[subsystem] || "SUBSYSTEM";
  const version = PulseVersion[subsystem] || "7.x";
  return `${role} v${version}`;
}

// ============================================================================
//  CORE LOGGING FUNCTIONS
// ============================================================================

// Standard log
export function log(subsystem, message, ...rest) {
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  console.log(
    `%c${prefix} — ${message}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );
}

// Warning
export function warn(subsystem, message, ...rest) {
  const prefix = formatPrefix(subsystem);
  console.warn(
    `%c${prefix} [WARN] — ${message}`,
    "color:#FACC15; font-weight:bold;",
    ...rest
  );
}

// Error
export function error(subsystem, message, ...rest) {
  const prefix = formatPrefix(subsystem);
  console.error(
    `%c${prefix} [ERROR] — ${message}`,
    "color:#F87171; font-weight:bold;",
    ...rest
  );
}

// Critical (red + bold + grouped)
export function critical(subsystem, message, ...rest) {
  const prefix = formatPrefix(subsystem);
  console.groupCollapsed(
    `%c${prefix} [CRITICAL] — ${message}`,
    "color:#DC2626; font-weight:bold; font-size:14px;"
  );
  console.error(
    `%c${message}`,
    "color:#DC2626; font-weight:bold;",
    ...rest
  );
  console.groupEnd();
}

// Group start
export function group(subsystem, label) {
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  console.groupCollapsed(
    `%c${prefix} — ${label}`,
    `color:${color}; font-weight:bold;`
  );
}

// Group end
export function groupEnd() {
  console.groupEnd();
}

// ============================================================================
//  TELEMETRY PACKET FORMATTER (Optional for PulseTelemetry.js)
// ============================================================================
export function makeTelemetryPacket(subsystem, event, data = {}) {
  return {
    ts: Date.now(),
    subsystem,
    version: PulseVersion[subsystem] || "7.x",
    role: PulseRoles[subsystem] || "SUBSYSTEM",
    event,
    data
  };
}
