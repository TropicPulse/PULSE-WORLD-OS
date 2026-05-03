/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.RNAIntake",
  version: "v14-IMMORTAL",
  layer: "pulse_translator",
  role: "rna_intake_translator",
  lineage: "RNAIntake-v11.0 → v12.4 → v14-IMMORTAL",

  evo: {
    rnaIntake: true,
    genomeDriven: true,
    firestoreIntake: true,
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
FILE: /pulse-translator/PulseTranslatorRNAIntake.js
LAYER: THE RNA INTAKE TRANSLATOR (Firestore → Pulse)
===============================================================================

ROLE (v14+):
  THE RNA INTAKE TRANSLATOR — Genome‑driven Firestore → Pulse translator.
  • Converts Firestore runtime values → canonical PulseField types.
  • Converts Firestore document snapshots → PulseField schema maps.
  • Uses PulseSpecsDNAGenome v14+ as the authoritative DNA.
  • Deterministic, drift‑proof, pure, read‑only.

PURPOSE (v14+):
  • Provide the organism with stable, canonical PulseField structures.
  • Ensure all Firestore values are normalized into PulseField types.
  • Guarantee genome‑aligned typing and schema consistency.
  • Serve as the RNA intake layer of the Pulse OS organism.

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
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome.js";

// ============================================================================
// inferPulseTypeFromFirestore(value)
// Genome‑driven type inference for Firestore runtime values.
// ============================================================================
export function inferPulseTypeFromFirestore(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.NULLABLE;
  }

  const t = typeof value;

  if (t === "string") return PulseFieldTypes.STRING;
  if (t === "number") return PulseFieldTypes.NUMBER;
  if (t === "boolean") return PulseFieldTypes.BOOLEAN;

  // Firestore Timestamp
  if (value && value.toDate && typeof value.toDate === "function") {
    return PulseFieldTypes.TIMESTAMP;
  }

  if (Array.isArray(value)) return PulseFieldTypes.ARRAY;
  if (t === "object") return PulseFieldTypes.OBJECT;

  return PulseFieldTypes.JSON;
}

// ============================================================================
// translateFirestoreField(fieldName, value)
// Converts a Firestore field → canonical PulseField object.
// ============================================================================
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
    field.innerType = PulseFieldTypes.JSON; // safe fallback
  }

  validatePulseField(field);
  return field;
}

// ============================================================================
// translateFirestoreDocument(docData)
// Converts a plain Firestore JS object → PulseField schema map.
// ============================================================================
export function translateFirestoreDocument(docData = {}) {
  const out = {};

  for (const [key, value] of Object.entries(docData)) {
    out[key] = translateFirestoreField(key, value);
  }

  return out;
}

// ============================================================================
// translateFirestoreSnapshot(snapshot)
// Accepts a Firestore DocumentSnapshot (read‑only).
// ============================================================================
export function translateFirestoreSnapshot(snapshot) {
  if (!snapshot || typeof snapshot.data !== "function") {
    throw new Error("PulseTranslatorRNAIntake-v14: invalid snapshot");
  }

  const data = snapshot.data() || {};
  return translateFirestoreDocument(data);
}

// ============================================================================
// Helpers
// ============================================================================
function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
