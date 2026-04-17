// ============================================================================
// PulseIdentity.js
// Universal identity loader + backend healer + logout handler
// OS‑v5 Debugging Upgrade: Layer + Role + Purpose + Color Logs
// ============================================================================

// ------------------------------------------------------------
// ⭐ OS‑v5 CONTEXT MAP
// ------------------------------------------------------------
const ID_CONTEXT = {
  layer: "A2‑Layer",
  role: "IDENTITY_LOADER",
  purpose: "Load, validate, repair identity + sync server time",
  context: "Frontend identity state + backend healing"
};

// ------------------------------------------------------------
// INTERNAL STATE
// ------------------------------------------------------------
let _identity = null;
let _token    = null;
let _loading  = false;

// ------------------------------------------------------------
// TIME SYNC (server → client offset)
// ------------------------------------------------------------
let __serverTimeOffset = 0;

function setServerNow(serverNowMs) {
  __serverTimeOffset = serverNowMs - Date.now();
}

function setServerOffset(offsetMs) {
  __serverTimeOffset = offsetMs;
}

function nowMs() {
  return Date.now() + __serverTimeOffset;
}

// ------------------------------------------------------------
// HELPERS (color‑coded logs)
// ------------------------------------------------------------
function markInfo(msg) {
  console.log(`%c[IDENTITY] ${msg}`, "color:#03A9F4; font-weight:bold;");
}

function markGood(msg) {
  console.log(`%c[IDENTITY] ${msg}`, "color:#4CAF50; font-weight:bold;");
}

function markWarn(msg) {
  console.log(`%c[IDENTITY] ${msg}`, "color:#FFC107; font-weight:bold;");
}

function markBad(msg) {
  console.log(`%c[IDENTITY] ${msg}`, "color:#FF5252; font-weight:bold;");
}

function loadLocal() {
  markInfo("LOCAL LOAD → reading tp_identity_v4 + tp_token_v4");

  try {
    _identity = JSON.parse(localStorage.getItem("tp_identity_v4") || "{}");
  } catch {
    _identity = null;
  }

  _token = localStorage.getItem("tp_token_v4") || null;
}

function saveLocal(identity, token) {
  markGood("LOCAL SAVE → identity + token");

  if (identity) {
    localStorage.setItem("tp_identity_v4", JSON.stringify(identity));
  }
  if (token) {
    localStorage.setItem("tp_token_v4", token);
  }
}

// ------------------------------------------------------------
// LOGOUT HANDLING
// ------------------------------------------------------------
function flagLogout(reason) {
  markBad(`LOGOUT FLAGGED → ${reason}`);
  localStorage.setItem("tp_logout_flag", reason);
}

function clearLocal() {
  markWarn("LOCAL CLEAR → identity + token removed");

  localStorage.removeItem("tp_identity_v4");
  localStorage.removeItem("tp_token_v4");
  localStorage.removeItem("tp_device_token_v4");
  localStorage.removeItem("tp_last_active_v4");
}

// ------------------------------------------------------------
// BACKEND CALLS (self‑describing)
// ------------------------------------------------------------
async function backend(type, payload = {}) {
  markInfo(`BACKEND CALL → ${type}`);

  const res = await fetch("/.netlify/functions/endpoint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload })
  });

  return await res.json();
}

// ============================================================================
// MAIN IDENTITY LOADER (UPDATED WITH OS‑v5 CONTEXT + COLOR LOGS)
// ============================================================================
export async function identity() {
  // Prevent double-loading
  if (_loading) {
    return new Promise(resolve => {
      const check = setInterval(() => {
        if (!_loading) {
          clearInterval(check);
          resolve(_identity);
        }
      }, 20);
    });
  }

  _loading = true;
  markInfo("🟦 IDENTITY START");

  // 1. Load local state
  loadLocal();

  // ⭐ 1A. Apply saved time offset
  if (_identity && typeof _identity.timeOffsetMs === "number") {
    markInfo(`TIME OFFSET (saved) → ${_identity.timeOffsetMs}ms`);
    setServerOffset(_identity.timeOffsetMs);
  }

  // 2. Missing identity or token → backend repair
  if (!_identity || !_identity.uid || !_token) {
    markWarn("IDENTITY MISSING → backend repair");

    const repaired = await backend("repairIdentity", {
      uid: _identity?.uid || null,
      token: _token || null
    });

    if (!repaired || !repaired.identity) {
      markBad("BACKEND REPAIR FAILED → logout");
      flagLogout("identity_unrepairable");
      clearLocal();
      _loading = false;
      return null;
    }

    // ⭐ TIME SYNC
    if (repaired.serverNow) {
      const offset = repaired.serverNow - Date.now();
      markInfo(`TIME SYNC (repair) → offset ${offset}ms`);
      setServerOffset(offset);
      repaired.identity.timeOffsetMs = offset;
    }

    _identity = repaired.identity;
    _token    = repaired.token || _token;

    saveLocal(_identity, _token);
    markGood("IDENTITY REPAIRED");
    _loading = false;
    return _identity;
  }

  // 3. Validate identity with backend
  markInfo("VALIDATING IDENTITY");

  const check = await backend("validateIdentity", {
    uid: _identity.uid,
    token: _token
  });

  if (check.hardLogout) {
    markBad("BACKEND DANGER → HARD LOGOUT");
    flagLogout("backend_danger");
    clearLocal();
    _loading = false;
    return null;
  }

  // ⭐ TIME SYNC
  if (check.serverNow) {
    const offset = check.serverNow - Date.now();
    markInfo(`TIME SYNC (validate) → offset ${offset}ms`);
    setServerOffset(offset);

    _identity.timeOffsetMs = offset;
    saveLocal(_identity, _token);
  }

  // 4. Backend may return updated identity or token
  if (check.identity) {
    markGood("IDENTITY UPDATED (backend)");
    _identity = check.identity;
    saveLocal(_identity, _token);
  }

  if (check.newJwtToken) {
    markGood("TOKEN UPDATED (backend)");
    _token = check.newJwtToken;
    saveLocal(_identity, _token);
  }

  // 5. Update last active
  localStorage.setItem("tp_last_active_v4", nowMs());
  markGood("LAST ACTIVE UPDATED");

  _loading = false;
  markGood("🟩 IDENTITY COMPLETE");
  return _identity;
}
