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

export const RouterMemory = {
  _logs: [],

  // ------------------------------------------------------------
  // ⭐ PUSH A NEW LOG ENTRY (router.js → RouterMemory)
  // ------------------------------------------------------------
  push(entry) {
    if (!entry || typeof entry !== "object") return;

    // Basic dedupe: prevent identical consecutive logs
    const last = this._logs[this._logs.length - 1];
    if (last &&
        last.eventType === entry.eventType &&
        JSON.stringify(last.data) === JSON.stringify(entry.data)) {
      return; // skip duplicate
    }

    this._logs.push(entry);
  },

  // ------------------------------------------------------------
  // ⭐ GET ALL LOGS (Timer.js → RouterMemory)
  // ------------------------------------------------------------
  getAll() {
    return [...this._logs];
  },

  // ------------------------------------------------------------
  // ⭐ CLEAR LOGS AFTER FLUSH (Timer.js → RouterMemory)
  // ------------------------------------------------------------
  clear() {
    this._logs = [];
  },

  // ------------------------------------------------------------
  // ⭐ CHECK IF MEMORY HAS ANY LOGS
  // ------------------------------------------------------------
  hasLogs() {
    return this._logs.length > 0;
  }
};
