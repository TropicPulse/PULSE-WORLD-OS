// FILE: tropic-pulse-functions/apps/pulse-translator/pulseToFirestore.js
// VERSION: 7.3
//
// ------------------------------------------------------
// 📘 PAGE INDEX — Source of Truth for This File
// ------------------------------------------------------
//
// ROLE:
//   PulseToFirestore — deterministic, read‑only translator that converts
//   PulseField definitions and PulseField schemas into Firestore‑safe
//   document structures.
//
// PURPOSE:
//   • Convert PulseField objects → Firestore value types
//   • Convert PulseField schemas → Firestore document payloads
//   • Provide a stable, AI‑readable + human‑readable translation layer
//   • Enable backend AI to generate Firestore writes safely
//
// OUTPUT:
//   • Firestore‑safe values
//   • Firestore document objects
//   • Deterministic translation results
//
// RESPONSIBILITIES:
//   • Map PulseField types → Firestore types
//   • Normalize field names
//   • Validate PulseField definitions
//   • Produce deterministic Firestore payloads
//
// SAFETY RULES (CRITICAL):
//   • READ‑ONLY — no Firestore writes
//   • NO eval(), NO Function(), NO dynamic imports
//   • NO executing Firestore code
//   • NO network calls
//   • Deterministic translation only
//
// ------------------------------------------------------
// Pulse → Firestore Translator (v7.3)
// ------------------------------------------------------

import {
  PulseToFirestore,
  PulseFieldTypes,
  validatePulseField,
} from "../pulse-specs/pulseFields.js";

/**
 * translatePulseFieldToFirestore(field, value)
 * Converts a PulseField + value into a Firestore‑safe value.
 * v7.3: supports:
 *   • nullable wrapper
 *   • enum (string)
 *   • currency (number)
 *   • percent (number)
 *   • deterministic timestamp handling
 */
export function translatePulseFieldToFirestore(field, value) {
  validatePulseField(field);

  // v7.3: explicit null wrapper
  if (field.type === PulseFieldTypes.NULLABLE) {
    if (value === null || value === undefined) {
      return { isNull: true, value: null };
    }
    return {
      isNull: false,
      value: translatePulseFieldToFirestore(
        { type: field.innerType || PulseFieldTypes.JSON },
        value
      ),
    };
  }

  // v7.3: enum → string
  if (field.type === PulseFieldTypes.ENUM) {
    return String(value ?? "");
  }

  // v7.3: currency → number (fixed scale)
  if (field.type === PulseFieldTypes.CURRENCY) {
    const num = Number(value);
    return isNaN(num) ? 0 : Number(num.toFixed(field.scale ?? 2));
  }

  // v7.3: percent → number (0–100 or normalized)
  if (field.type === PulseFieldTypes.PERCENT) {
    const num = Number(value);
    if (isNaN(num)) return 0;
    return field.normalized ? Math.max(0, Math.min(1, num)) : Math.max(0, Math.min(100, num));
  }

  const fsType = PulseToFirestore[field.type] || "string";

  switch (fsType) {
    case "string":
      return value != null ? String(value) : "";

    case "number":
      return Number(value) || 0;

    case "boolean":
      return Boolean(value);

    case "timestamp":
      // v7.3: deterministic timestamp conversion
      if (value instanceof Date) return value;
      if (typeof value === "number") return new Date(value);
      if (typeof value === "string") return new Date(value);
      return new Date();

    case "array":
      return Array.isArray(value) ? value : [];

    case "map":
      return typeof value === "object" && value !== null ? value : {};

    default:
      return value;
  }
}

/**
 * translatePulseSchemaToFirestore(schemaObject, dataObject)
 * Converts a PulseField schema + data into a Firestore document.
 */
export function translatePulseSchemaToFirestore(schemaObject = {}, dataObject = {}) {
  const out = {};

  for (const [key, field] of Object.entries(schemaObject)) {
    const value = dataObject[key];
    out[key] = translatePulseFieldToFirestore(field, value);
  }

  return out;
}

/**
 * generateFirestoreWritePayload(schemaObject, dataObject)
 * Produces a Firestore‑ready payload for setDoc/updateDoc.
 */
export function generateFirestoreWritePayload(schemaObject = {}, dataObject = {}) {
  return translatePulseSchemaToFirestore(schemaObject, dataObject);
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
