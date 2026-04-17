// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/RouterMemory.js
// LAYER: B‑LAYER (MEMORY BUFFER FOR LOGGING + HEALING)
//
// PURPOSE:
// • Store logs from router.js before Timer.js flushes them.
// • Dedupe repeated logs.
// • Preserve lineage + timestamps.
// • Provide safe access for router.js + Timer.js.
// • NEVER write to Firebase directly.
// ============================================================================

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP
// ------------------------------------------------------------
const MEMORY_CONTEXT = {
  label: "MEMORY",
  layer: "B‑Layer",
  purpose: "Log Buffer + Healing Support",
  context: "Stores logs before Timer.js flush"
};

export const RouterMemory = {
  _logs: [],
  _maxLogs: 500, // optional safety cap

  // ------------------------------------------------------------
  // ⭐ PUSH A NEW LOG ENTRY (router.js → RouterMemory)
  // ------------------------------------------------------------
  push(entry) {
    if (!entry || typeof entry !== "object") return;

    // Attach memory context
    entry = {
      ...entry,
      ...MEMORY_CONTEXT
    };

    // Basic dedupe: prevent identical consecutive logs
    const last = this._logs[this._logs.length - 1];
    if (last &&
        last.eventType === entry.eventType &&
        JSON.stringify(last.data) === JSON.stringify(entry.data)) {

      console.warn(
        "%c🟨 MEMORY DEDUPE → Skipped duplicate log",
        "color:#FFC107; font-weight:bold;"
      );
      return;
    }

    // Add entry
    this._logs.push(entry);

    // Optional: enforce max size
    if (this._logs.length > this._maxLogs) {
      this._logs.shift(); // remove oldest
    }

    console.log(
      `%c🟦 MEMORY PUSH → ${entry.eventType} (total: ${this._logs.length})`,
      "color:#03A9F4; font-weight:bold;"
    );
  },

  // ------------------------------------------------------------
  // ⭐ GET ALL LOGS (Timer.js → RouterMemory)
  // ------------------------------------------------------------
  getAll() {
    console.log(
      `%c🟩 MEMORY READ → ${this._logs.length} logs`,
      "color:#4CAF50; font-weight:bold;"
    );
    return [...this._logs];
  },

  // ------------------------------------------------------------
  // ⭐ CLEAR LOGS AFTER FLUSH (Timer.js → RouterMemory)
  // ------------------------------------------------------------
  clear() {
    console.log(
      `%c🟥 MEMORY CLEAR → ${this._logs.length} logs removed`,
      "color:#FF5252; font-weight:bold;"
    );
    this._logs = [];
  },

  // ------------------------------------------------------------
  // ⭐ CHECK IF MEMORY HAS ANY LOGS
  // ------------------------------------------------------------
  hasLogs() {
    return this._logs.length > 0;
  }
};
