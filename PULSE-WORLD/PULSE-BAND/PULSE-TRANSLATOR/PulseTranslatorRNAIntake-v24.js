/*
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
===============================================================================
EXPORT_META = {
  organ: "PulseTranslator.RNAIntake",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "FirestoreRuntimeValue",
    "FirestoreDocumentSnapshot"
  ],

  produces: [
    "PulseField",
    "PulseFieldSchemaMap"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  firestore: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorRNAIntake-v24.js
LAYER: THE RNA INTAKE TRANSLATOR (Firestore → Pulse)
SCHEMA: RNA_INTAKE_SCHEMA_VERSION = "v4"
===============================================================================
*/
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

const RNA_INTAKE_SCHEMA_VERSION = "v4";

import {
  PulseFieldTypes,
  PulseFieldRules,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

// ---------------------------------------------------------------------------
// ROLE BLOCK — IMMORTAL RNA INTAKE ROLE (pure, zero‑IO)
// ---------------------------------------------------------------------------
export const RNAIntakeRole = {
  type: "Organ",
  subsystem: "PulseTranslator",
  layer: "RNAIntake",
  version: "24.0-IMMORTAL-Evo+++",
  identity: "PulseTranslator.RNAIntake",

  evo: {
    deterministic: true,
    pureCompute: true,
    driftProof: true,
    schemaVersioned: true,
    genomeDriven: true,
    firestoreIntake: true,
    arrayShapeAware: true,
    nestedObjectAware: true,
    advantageAware: true
  },

  schemaVersion: RNA_INTAKE_SCHEMA_VERSION
};

/* ============================================================================
   inferPulseTypeFromFirestore(value)
   Genome‑driven type inference for Firestore runtime values.
   v24 IMMORTAL-Evo+++:
     • presence/harmonics/shifter
     • binary/pulse/band
     • region/tenant/partition/index hints
     • GeoPoint / DocumentReference
     • array shape + nested object awareness (schema only, no recursion explosion)
=============================================================================== */
export function inferPulseTypeFromFirestore(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.NULLABLE;
  }

  // Firestore Timestamp
  if (value && typeof value.toDate === "function") {
    return PulseFieldTypes.TIMESTAMP;
  }

  // Firestore Bytes
  if (value && typeof value.toUint8Array === "function") {
    return PulseFieldTypes.BINARY;
  }

  // Firestore GeoPoint (duck-typed)
  if (looksLikeGeoPoint(value)) {
    return PulseFieldTypes.GEOPOINT ?? PulseFieldTypes.OBJECT;
  }

  // Firestore DocumentReference (duck-typed)
  if (looksLikeDocumentRef(value)) {
    return PulseFieldTypes.DOCUMENT_REF ?? PulseFieldTypes.STRING;
  }

  const t = typeof value;

  if (t === "string") {
    // IMMORTAL band/presence/harmonics detection (schema-only)
    if (looksLikeBand(value)) return PulseFieldTypes.BAND;
    if (looksLikeRegion(value)) return PulseFieldTypes.REGION_CODE;
    if (looksLikeTenant(value)) return PulseFieldTypes.TENANT_ID;
    if (looksLikePartition(value)) return PulseFieldTypes.PARTITION_KEY;
    return PulseFieldTypes.STRING;
  }

  if (t === "number") return PulseFieldTypes.NUMBER;
  if (t === "boolean") return PulseFieldTypes.BOOLEAN;

  if (Array.isArray(value)) {
    // v24: array shape awareness (but still schema-only, no deep recursion)
    return PulseFieldTypes.ARRAY;
  }

  if (t === "object") {
    // IMMORTAL: presence/harmonics/shifter/index detection
    if (looksLikePresence(value)) return PulseFieldTypes.PRESENCE;
    if (looksLikeHarmonics(value)) return PulseFieldTypes.HARMONICS;
    if (looksLikeShifter(value)) return PulseFieldTypes.PULSE_SHIFTER;
    if (looksLikeIndexHint(value)) return PulseFieldTypes.INDEX_HINT;

    // generic nested object
    return PulseFieldTypes.OBJECT;
  }

  return PulseFieldTypes.JSON;
}

/* ============================================================================
   translateFirestoreField(fieldName, value)
   Converts a Firestore field → canonical PulseField object.
   v24: adds schemaVersion + ruleHints (if available) + arrayShapeHint.
=============================================================================== */
export function translateFirestoreField(fieldName, value) {
  const pulseType = inferPulseTypeFromFirestore(value);

  const nullable = value === null || value === undefined;
  const originalValueType = typeof value;

  const field = {
    schemaVersion: RNA_INTAKE_SCHEMA_VERSION,
    name: normalizeFieldName(fieldName),
    type: pulseType,
    source: "firestore",
    originalValueType,
    nullable
  };

  // Nullable wrapper
  if (nullable && field.type !== PulseFieldTypes.NULLABLE) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = inferInnerTypeForNullable(value);
  }

  // v24: array shape hint (schema-only, shallow)
  if (Array.isArray(value)) {
    field.arrayShapeHint = inferArrayShapeHint(value);
  }

  // v24: rule hints from genome rules (if present)
  if (PulseFieldRules && typeof PulseFieldRules.inferRuleHints === "function") {
    field.ruleHints = PulseFieldRules.inferRuleHints(field) || null;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateFirestoreDocument(docData)
   Converts a plain Firestore JS object → PulseField schema map.
   v24: attaches schemaVersion + role identity on the map envelope.
=============================================================================== */
export function translateFirestoreDocument(docData = {}) {
  const out = {};

  for (const [key, value] of Object.entries(docData)) {
    out[key] = translateFirestoreField(key, value);
  }

  return {
    schemaVersion: RNA_INTAKE_SCHEMA_VERSION,
    role: RNAIntakeRole.identity,
    fields: out
  };
}

/* ============================================================================
   translateFirestoreSnapshot(snapshot)
   Accepts a Firestore DocumentSnapshot (read‑only).
=============================================================================== */
export function translateFirestoreSnapshot(snapshot) {
  if (!snapshot || typeof snapshot.data !== "function") {
    throw new Error("PulseTranslatorRNAIntake-v24: invalid snapshot");
  }

  const data = snapshot.data() || {};
  return translateFirestoreDocument(data);
}

/* ============================================================================
   IMMORTAL HELPERS — PURE, ZERO‑IO, ZERO‑DRIFT
=============================================================================== */

function normalizeFieldName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}

function inferInnerTypeForNullable(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.JSON;
  }
  // reuse inference but avoid NULLABLE again
  const t = inferPulseTypeFromFirestore(value);
  return t === PulseFieldTypes.NULLABLE ? PulseFieldTypes.JSON : t;
}

// v24: shallow array shape hint (no recursion explosion)
function inferArrayShapeHint(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { kind: "empty", innerType: null };
  }

  const sample = arr[0];
  const innerType = inferPulseTypeFromFirestore(sample);
  return {
    kind: "homogeneous",
    innerType
  };
}

// IMMORTAL band/presence/harmonics/shifter detectors (schema-only)
function looksLikeBand(v) {
  return (
    typeof v === "string" &&
    (v === "symbolic" || v === "binary" || v === "dual")
  );
}

function looksLikeRegion(v) {
  return typeof v === "string" && /^[A-Z0-9_-]{1,16}$/.test(v);
}

function looksLikeTenant(v) {
  return typeof v === "string" && v.length <= 128 && v.includes("@tenant");
}

function looksLikePartition(v) {
  return typeof v === "string" && v.startsWith("partition:");
}

function looksLikePresence(obj) {
  return obj && typeof obj === "object" && obj.__presence === true;
}

function looksLikeHarmonics(obj) {
  return obj && typeof obj === "object" && obj.__harmonics === true;
}

function looksLikeShifter(obj) {
  return obj && typeof obj === "object" && obj.__shifter === true;
}

function looksLikeIndexHint(obj) {
  return obj && typeof obj === "object" && obj.__indexHint === true;
}

// Firestore GeoPoint duck-typing
function looksLikeGeoPoint(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.latitude === "number" &&
    typeof v.longitude === "number"
  );
}

// Firestore DocumentReference duck-typing
function looksLikeDocumentRef(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.path === "string" &&
    typeof v.id === "string"
  );
}
