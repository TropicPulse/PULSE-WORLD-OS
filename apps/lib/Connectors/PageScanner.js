// ============================================================================
// FILE: /apps/lib/Connectors/PageScanner.js
// LAYER: A2‑LAYER (PAGE‑LEVEL SCANNER / PASS‑THROUGH)
// ============================================================================

import { route } from "./router.js";   // ⭐ FIXED: no getHook

let healingInProgress = false;

// ------------------------------------------------------------
// ⭐ GLOBAL ERROR INTERCEPTOR (A → A2)
// ------------------------------------------------------------
window.addEventListener("error", async (event) => {
  if (healingInProgress) return;

  const msg = event.message || "";
  const parsed = parseMissingField(msg);
  if (!parsed) return;

  const { table, field } = parsed;

  healingInProgress = true;

  console.warn("[PageScanner] Missing:", `${table}.${field}`);

  try {
    // ⭐ SEND LOG + HEALING REQUEST TO ROUTER (A2 → B)
    await route("fetchField", {
      table,
      field,
      message: msg,
      page: window.location.pathname
    });

  } catch (err) {
    console.error("[PageScanner] Router fetch failed:", err);
  }

  healingInProgress = false;

  event.preventDefault();
}, true);

// ------------------------------------------------------------
// ⭐ PARSER: Extract Firestore table + field from JS error
// ------------------------------------------------------------
function parseMissingField(message) {
  let match = message.match(/reading '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/([^ ]+) is not defined/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/property '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  return null;
}
// ============================================================================
