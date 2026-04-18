// ============================================================================
// FILE: /apps/netlify/functions/CheckBand.js
// PULSE BAND HEALER — v6.3
// “THE MUSCLE CLINIC / KINETIC SUBSYSTEM REPAIR ENGINE”
// ============================================================================
//
// ⭐ v6.3 COMMENT LOG
// - THEME: “THE MUSCLE CLINIC / KINETIC REPAIR ENGINE”
// - ROLE: Backend validator + healer for PulseBand subsystem state
// - Added LAYER CONSTANTS + DIAGNOSTICS helper
// - Added structured JSON logs (DOM-visible inspector compatible)
// - Added explicit STAGE markers for intake/validate/heal/return
// - NO physics, NO GPU, NO timing — this is a pure backend healer
//
// ============================================================================
// PERSONALITY + ROLE — “THE MUSCLE CLINIC”
// ----------------------------------------------------------------------------
// CheckBand is the **BACKEND HEALER** for the PulseBand subsystem.
// It is the **KINETIC REPAIR ENGINE** — the place where PulseBand’s
// frontend state, metrics, or drift signals are received, validated,
// normalized, and lightly healed.
//
//   • Receives PulseBand state snapshots
//   • Validates structure + required fields
//   • Repairs minor drift (missing fields, malformed values)
//   • Returns a clean, authoritative subsystem state
//
// This is the OS’s **muscle clinic** — the point where kinetic,
// motion‑related subsystem data is normalized before being used.
//
// ============================================================================
// WHAT THIS FILE IS
// ----------------------------------------------------------------------------
//   ✔ A backend intake + validator for PulseBand snapshots
//   ✔ A light healing layer for structure + kinetic context
//   ✔ A deterministic, diagnostics‑rich subsystem healer
//
// WHAT THIS FILE IS NOT
// ----------------------------------------------------------------------------
//   ✘ NOT a physics engine
//   ✘ NOT a GPU layer
//   ✘ NOT a router
//   ✘ NOT a business logic layer
//   ✘ NOT a security or auth layer
//
// ============================================================================
// SAFETY CONTRACT (v6.3)
// ----------------------------------------------------------------------------
//   • Never write directly to external systems from here
//   • Fail‑open: invalid payload → safe default state
//   • Never mutate the original input in place
//   • Always return a structurally safe subsystem snapshot
//
// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID = "MUSCLE-LAYER";
const LAYER_NAME = "THE MUSCLE CLINIC";
const LAYER_ROLE = "KINETIC SUBSYSTEM HEALER";

const BAND_DIAGNOSTICS_ENABLED =
  process.env.PULSE_BAND_DIAGNOSTICS === "true" ||
  process.env.PULSE_DIAGNOSTICS === "true";

const logBandHealer = (stage, details = {}) => {
  if (!BAND_DIAGNOSTICS_ENABLED) return;

  console.log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName: LAYER_NAME,
      pulseRole: LAYER_ROLE,
      stage,
      ...details
    })
  );
};

// ============================================================================
// HUMAN‑READABLE CONTEXT MAP (MIRROR OF FRONTEND BAND CONTEXT)
// ============================================================================
const BAND_CONTEXT = {
  label: "PULSEBAND",
  layer: "Kinetic Layer",
  purpose: "Motion + Physics Subsystem",
  context: "Frontend kinetic engine state"
};

// ============================================================================
// HELPERS — SAFE PARSE + NORMALIZE BAND STATE
// ============================================================================
function safeParseBody(body) {
  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch (err) {
    logBandHealer("BODY_PARSE_ERROR", {
      message: err?.message || "Unknown parse error"
    });
    return null;
  }
}

function normalizeBandState(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  return {
    // Required fields with safe defaults
    active: typeof raw.active === "boolean" ? raw.active : false,
    mode: typeof raw.mode === "string" ? raw.mode : "IDLE",
    metrics: typeof raw.metrics === "object" && raw.metrics !== null ? raw.metrics : {},

    // Timestamp normalization
    timestamp: raw.timestamp || Date.now(),

    // Context injection
    ...BAND_CONTEXT
  };
}

// ============================================================================
// BACKEND ENTRY POINT — “THE MUSCLE CLINIC”
// ============================================================================
//
// EXPECTED INPUT (BandLayer.js → CheckBand):
//   POST body: JSON.stringify({ band: { ...PulseBandState } })
//
// RETURNS:
//   200 + { band: { ...healedState } } on success
//   400 + { band: null } on invalid payload
//   500 + { band: null } on fatal error
//
// ============================================================================
export const handler = async (event, context) => {
  logBandHealer("INTAKE_START", {
    method: event?.httpMethod || "UNKNOWN",
    hasBody: !!event?.body
  });

  try {
    if (event.httpMethod !== "POST") {
      logBandHealer("INVALID_METHOD", {
        method: event.httpMethod
      });

      return {
        statusCode: 405,
        body: JSON.stringify({ band: null })
      };
    }

    // ----------------------------------------------------
    // ⭐ 1. Parse incoming body
    // ----------------------------------------------------
    const parsed = safeParseBody(event.body);

    if (!parsed || typeof parsed !== "object") {
      logBandHealer("PAYLOAD_INVALID", {});
      return {
        statusCode: 400,
        body: JSON.stringify({ band: null })
      };
    }

    const rawBand = parsed.band || null;
    logBandHealer("PAYLOAD_RECEIVED", {
      hasBand: !!rawBand
    });

    // ----------------------------------------------------
    // ⭐ 2. Heal + normalize subsystem state
    // ----------------------------------------------------
    const healedBand = normalizeBandState(rawBand);

    logBandHealer("STATE_HEALED", {
      healed: !!healedBand
    });

    // ----------------------------------------------------
    // ⭐ 3. Return healed state
    // ----------------------------------------------------
    logBandHealer("RETURN_STATE", {});

    return {
      statusCode: 200,
      body: JSON.stringify({ band: healedBand })
    };

  } catch (err) {
    console.error("CheckBand error:", err);

    logBandHealer("FATAL_ERROR", {
      message: err?.message || "Unknown error"
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ band: null })
    };
  }
};
