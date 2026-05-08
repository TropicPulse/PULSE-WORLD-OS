/* ============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.RNAOutput",
  version: "v17-IMMORTAL",
  layer: "pulse_translator",
  role: "rna_output_translator",
  lineage: "RNAOutput-v11 → v12.4 → v14-Immortal → v17-IMMORTAL",

  evo: {
    rnaOutput: true,
    genomeDriven: true,
    firestoreOutput: true,
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
      "PulseTranslator.RNAIntake",
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
  organ: "PulseTranslator.RNAOutput",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseDataObject"
  ],

  produces: [
    "FirestoreSafeValue",
    "FirestoreDocumentPayload"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  firestore: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorRNAOutput.js
LAYER: THE RNA OUTPUT TRANSLATOR (Pulse → Firestore)
===============================================================================
*/

import {
  PulseToFirestore,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v17.js";

/* ============================================================================
   translatePulseFieldToFirestore(field, value)
   Converts a PulseField + value → Firestore‑safe value.
   v17 IMMORTAL: supports:
     • band/presence/harmonics/shifter
     • region/tenant/partition/index hints
     • binary/pulse/pulse_binary
     • currency/percent/enum
     • nullable wrapper
=============================================================================== */
export function translatePulseFieldToFirestore(field, value) {
  validatePulseField(field);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.NULLABLE) {
    if (value === null || value === undefined) {
      return null;
    }

    return translatePulseFieldToFirestore(
      { type: field.innerType || PulseFieldTypes.JSON },
      value
    );
  }

  // --------------------------------------------------------------------------
  // ENUM → string
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.ENUM) {
    return String(value ?? "");
  }

  // --------------------------------------------------------------------------
  // CURRENCY → number (fixed scale)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.CURRENCY) {
    const num = Number(value);
    return isNaN(num)
      ? 0
      : Number(num.toFixed(field.scale ?? 2));
  }

  // --------------------------------------------------------------------------
  // PERCENT → number (0–100 or normalized)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.PERCENT) {
    const num = Number(value);
    if (isNaN(num)) return 0;

    return field.normalized
      ? Math.max(0, Math.min(1, num))
      : Math.max(0, Math.min(100, num));
  }

  // --------------------------------------------------------------------------
  // BINARY / PULSE_BINARY → Firestore bytes (base64 string allowed)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BINARY ||
      field.type === PulseFieldTypes.PULSE_BINARY) {
    if (!value) return null;

    if (value instanceof Uint8Array) return value;
    if (typeof value === "string") return value; // base64 allowed

    return null;
  }

  // --------------------------------------------------------------------------
  // PULSE / PRESENCE / HARMONICS / SHIFTER → map
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.PULSE ||
    field.type === PulseFieldTypes.PRESENCE ||
    field.type === PulseFieldTypes.HARMONICS ||
    field.type === PulseFieldTypes.PULSE_SHIFTER
  ) {
    return typeof value === "object" && value !== null ? value : {};
  }

  // --------------------------------------------------------------------------
  // BAND → string
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BAND) {
    return String(value ?? "");
  }

  // --------------------------------------------------------------------------
  // REGION / TENANT / PARTITION / INDEX_HINT → string/map
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.REGION_CODE) {
    return String(value ?? "");
  }

  if (field.type === PulseFieldTypes.TENANT_ID) {
    return String(value ?? "");
  }

  if (field.type === PulseFieldTypes.PARTITION_KEY) {
    return String(value ?? "");
  }

  if (field.type === PulseFieldTypes.INDEX_HINT) {
    return typeof value === "object" && value !== null ? value : {};
  }

  // --------------------------------------------------------------------------
  // BASE TYPE MAPPING (Genome → Firestore)
  // --------------------------------------------------------------------------
  const fsType = PulseToFirestore[field.type] || "string";

  switch (fsType) {
    case "string":
      return value != null ? String(value) : "";

    case "number":
      return Number(value) || 0;

    case "boolean":
      return Boolean(value);

    case "timestamp":
      if (value instanceof Date) return value;
      if (typeof value === "number") return new Date(value);
      if (typeof value === "string") return new Date(value);
      return new Date(0);

    case "array":
      return Array.isArray(value) ? value : [];

    case "map":
      return typeof value === "object" && value !== null ? value : {};

    case "bytes":
      return value ?? null;

    default:
      return value;
  }
}

/* ============================================================================
   translatePulseSchemaToFirestore(schemaObject, dataObject)
   Converts a PulseField schema + data → Firestore document.
=============================================================================== */
export function translatePulseSchemaToFirestore(schemaObject = {}, dataObject = {}) {
  const out = {};

  for (const [key, field] of Object.entries(schemaObject)) {
    const value = dataObject[key];
    out[key] = translatePulseFieldToFirestore(field, value);
  }

  return out;
}

/* ============================================================================
   generateFirestoreWritePayload(schemaObject, dataObject)
   Produces a Firestore‑ready payload for setDoc/updateDoc.
=============================================================================== */
export function generateFirestoreWritePayload(schemaObject = {}, dataObject = {}) {
  return translatePulseSchemaToFirestore(schemaObject, dataObject);
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
