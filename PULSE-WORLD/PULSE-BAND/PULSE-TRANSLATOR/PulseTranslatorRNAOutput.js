/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.RNAOutput",
  version: "v14-IMMORTAL",
  layer: "pulse_translator",
  role: "rna_output_translator",
  lineage: "RNAOutput-v11.0 → v12.4 → v14-IMMORTAL",

  evo: {
    rnaOutput: true,
    genomeDriven: true,
    firestoreOutput: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

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

ROLE (v14+):
  THE RNA OUTPUT TRANSLATOR — Genome‑driven Pulse → Firestore translator.
  • Converts PulseField definitions + values → Firestore‑safe payloads.
  • Converts PulseField schemas → Firestore document objects.
  • Uses PulseSpecsDNAGenome v14+ as the authoritative DNA.
  • Deterministic, drift‑proof, pure, read‑only.

PURPOSE (v14+):
  • Provide Firestore‑safe, deterministic output values.
  • Guarantee genome‑aligned typing and schema consistency.
  • Serve as the RNA output layer of the Pulse OS organism.

CONTRACT:
  • PURE FUNCTION — no IO, no network, no Firestore execution.
  • READ‑ONLY — no mutation of input.
  • NO eval(), NO Function(), NO dynamic imports.
  • Deterministic output only.

SAFETY:
  • v14+ upgrade is PURE + GENOME‑DRIVEN.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import {
  PulseToFirestore,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome.js";

// ============================================================================
// translatePulseFieldToFirestore(field, value)
// Converts a PulseField + value → Firestore‑safe value.
// ============================================================================
export function translatePulseFieldToFirestore(field, value) {
  validatePulseField(field);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.NULLABLE) {
    if (value === null || value === undefined) {
      return { isNull: true, value: null };
    }

    return {
      isNull: false,
      value: translatePulseFieldToFirestore(
        { type: field.innerType || PulseFieldTypes.JSON },
        value
      )
    };
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
      // Deterministic timestamp conversion
      if (value instanceof Date) return value;
      if (typeof value === "number") return new Date(value);
      if (typeof value === "string") return new Date(value);
      // Deterministic fallback: Unix epoch
      return new Date(0);

    case "array":
      return Array.isArray(value) ? value : [];

    case "map":
      return typeof value === "object" && value !== null ? value : {};

    default:
      return value;
  }
}

// ============================================================================
// translatePulseSchemaToFirestore(schemaObject, dataObject)
// Converts a PulseField schema + data → Firestore document.
// ============================================================================
export function translatePulseSchemaToFirestore(schemaObject = {}, dataObject = {}) {
  const out = {};

  for (const [key, field] of Object.entries(schemaObject)) {
    const value = dataObject[key];
    out[key] = translatePulseFieldToFirestore(field, value);
  }

  return out;
}

// ============================================================================
// generateFirestoreWritePayload(schemaObject, dataObject)
// Produces a Firestore‑ready payload for setDoc/updateDoc.
// ============================================================================
export function generateFirestoreWritePayload(schemaObject = {}, dataObject = {}) {
  return translatePulseSchemaToFirestore(schemaObject, dataObject);
}

// ============================================================================
// Helpers
// ============================================================================
function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
