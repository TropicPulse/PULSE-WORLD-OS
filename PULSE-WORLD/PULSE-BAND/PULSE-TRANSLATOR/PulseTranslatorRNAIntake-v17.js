/* ============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.RNAIntake",
  version: "v17-IMMORTAL",
  layer: "pulse_translator",
  role: "rna_intake_translator",
  lineage: "RNAIntake-v11 → v12.4 → v14-Immortal → v17-IMMORTAL",

  evo: {
    rnaIntake: true,
    genomeDriven: true,
    firestoreIntake: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    harmonicsAware: true,
    shifterAware: true,
    regionAware: true,
    tenantAware: true,
    partitionAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroFirestoreExecution: true
  },

  contract: {
    always: [
      "PulseSpecs.DNAGenome",
      "PulseTranslator.RNAOutput",
      "PulseTranslator.SkeletalIntake"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
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
FILE: /pulse-translator/PulseTranslatorRNAIntake-v17.js
LAYER: THE RNA INTAKE TRANSLATOR (Firestore → Pulse)
===============================================================================
*/

import {
  PulseFieldTypes,
  PulseFieldRules,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

/* ============================================================================
   inferPulseTypeFromFirestore(value)
   Genome‑driven type inference for Firestore runtime values.
   v17 IMMORTAL: now aware of:
     • presence/harmonics/shifter
     • binary/pulse/band
     • region/tenant/partition/index hints
=============================================================================== */
export function inferPulseTypeFromFirestore(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.NULLABLE;
  }

  // Firestore Timestamp
  if (value && value.toDate && typeof value.toDate === "function") {
    return PulseFieldTypes.TIMESTAMP;
  }

  // Firestore Bytes
  if (value && value.toUint8Array && typeof value.toUint8Array === "function") {
    return PulseFieldTypes.BINARY;
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

  if (Array.isArray(value)) return PulseFieldTypes.ARRAY;

  if (t === "object") {
    // IMMORTAL: presence/harmonics/shifter detection
    if (looksLikePresence(value)) return PulseFieldTypes.PRESENCE;
    if (looksLikeHarmonics(value)) return PulseFieldTypes.HARMONICS;
    if (looksLikeShifter(value)) return PulseFieldTypes.PULSE_SHIFTER;
    if (looksLikeIndexHint(value)) return PulseFieldTypes.INDEX_HINT;
    return PulseFieldTypes.OBJECT;
  }

  return PulseFieldTypes.JSON;
}

/* ============================================================================
   translateFirestoreField(fieldName, value)
   Converts a Firestore field → canonical PulseField object.
=============================================================================== */
export function translateFirestoreField(fieldName, value) {
  const pulseType = inferPulseTypeFromFirestore(value);

  const field = {
    name: normalizeFieldName(fieldName),
    type: pulseType,
    source: "firestore",
    originalValueType: typeof value,
    nullable: value === null || value === undefined
  };

  // Nullable wrapper
  if (field.nullable && field.type !== PulseFieldTypes.NULLABLE) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = PulseFieldTypes.JSON;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateFirestoreDocument(docData)
   Converts a plain Firestore JS object → PulseField schema map.
=============================================================================== */
export function translateFirestoreDocument(docData = {}) {
  const out = {};

  for (const [key, value] of Object.entries(docData)) {
    out[key] = translateFirestoreField(key, value);
  }

  return out;
}

/* ============================================================================
   translateFirestoreSnapshot(snapshot)
   Accepts a Firestore DocumentSnapshot (read‑only).
=============================================================================== */
export function translateFirestoreSnapshot(snapshot) {
  if (!snapshot || typeof snapshot.data !== "function") {
    throw new Error("PulseTranslatorRNAIntake-v17: invalid snapshot");
  }

  const data = snapshot.data() || {};
  return translateFirestoreDocument(data);
}

/* ============================================================================
   IMMORTAL HELPERS — PURE, ZERO‑IO, ZERO‑DRIFT
=============================================================================== */

function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

// IMMORTAL band/presence/harmonics/shifter detectors (schema-only)
function looksLikeBand(v) {
  return typeof v === "string" &&
    (v === "symbolic" || v === "binary" || v === "dual");
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
