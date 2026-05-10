/* ============================================================================
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
FILE: /pulse-translator/PulseTranslatorRNAOutput-v24.js
LAYER: THE RNA OUTPUT TRANSLATOR (Pulse → Firestore) — v24 IMMORTAL EVO+++
===============================================================================
*/
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
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
import {
  PulseToFirestore,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

const RNA_OUTPUT_SCHEMA_VERSION = "v4";

/* ============================================================================
   ROLE BLOCK — v24 IMMORTAL
=============================================================================== */
export const RNAOutputRole = {
  type: "Organ",
  subsystem: "PulseTranslator",
  layer: "RNAOutput",
  version: "24.0-IMMORTAL-Evo+++",
  identity: "PulseTranslator.RNAOutput",

  evo: {
    deterministic: true,
    pureCompute: true,
    driftProof: true,
    firestoreOutput: true,
    genomeDriven: true,
    nullableEnvelopeAware: true,
    enumContractAware: true,
    currencyScaleAware: true,
    percentModeAware: true,
    bandContractAware: true,
    indexHintAware: true,
    jsonFallbackAware: true
  },

  schemaVersion: RNA_OUTPUT_SCHEMA_VERSION
};

/* ============================================================================
   translatePulseFieldToFirestore(field, value)
   Converts a PulseField + value → Firestore‑safe value.
   v24 IMMORTAL EVO+++:
     • band/presence/harmonics/shifter
     • region/tenant/partition/index hints
     • binary/pulse/pulse_binary
     • currency/percent/enum
     • nullable wrapper (envelope‑aware)
     • stricter enum/currency/percent normalization
=============================================================================== */
export function translatePulseFieldToFirestore(field, value) {
  validatePulseField(field);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER (envelope‑aware, zero‑drift)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.NULLABLE) {
    if (value === null || value === undefined) {
      return null;
    }

    const innerType = field.innerType || PulseFieldTypes.JSON;
    return translatePulseFieldToFirestore(
      { type: innerType },
      value
    );
  }

  // --------------------------------------------------------------------------
  // ENUM → string (respect enum contract if present)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.ENUM) {
    const raw = value ?? "";
    const str = String(raw);

    if (Array.isArray(field.enumValues) && field.enumValues.length > 0) {
      if (field.enumValues.includes(str)) {
        return str;
      }
      // fallback: first enum value (deterministic)
      return String(field.enumValues[0]);
    }

    return str;
  }

  // --------------------------------------------------------------------------
  // CURRENCY → number (fixed scale, finite, clamped)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.CURRENCY) {
    const num = Number(value);
    if (!isFinite(num)) return 0;

    const scale = typeof field.scale === "number" ? field.scale : 2;
    const scaled = Number(num.toFixed(scale));

    // optional soft clamp to avoid absurd magnitudes
    const maxAbs = typeof field.maxAbs === "number" ? field.maxAbs : 1e12;
    const clamped =
      scaled > maxAbs ? maxAbs :
      scaled < -maxAbs ? -maxAbs :
      scaled;

    return clamped;
  }

  // --------------------------------------------------------------------------
  // PERCENT → number (0–100 or normalized 0–1, clamped)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.PERCENT) {
    const num = Number(value);
    if (!isFinite(num)) return 0;

    if (field.normalized) {
      const n = Math.max(0, Math.min(1, num));
      return n;
    }

    const p = Math.max(0, Math.min(100, num));
    return p;
  }

  // --------------------------------------------------------------------------
  // BINARY / PULSE_BINARY → Firestore bytes (base64 string allowed)
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.BINARY ||
    field.type === PulseFieldTypes.PULSE_BINARY
  ) {
    if (value == null) return null;

    if (value instanceof Uint8Array) return value;
    if (typeof value === "string") return value; // base64 allowed

    return null;
  }

  // --------------------------------------------------------------------------
  // PULSE / PRESENCE / HARMONICS / SHIFTER → map (zero‑mutation)
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.PULSE ||
    field.type === PulseFieldTypes.PRESENCE ||
    field.type === PulseFieldTypes.HARMONICS ||
    field.type === PulseFieldTypes.PULSE_SHIFTER
  ) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  // --------------------------------------------------------------------------
  // BAND → string (optionally strict)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BAND) {
    const raw = value ?? "";
    const str = String(raw);

    if (field.strictBand) {
      if (str === "symbolic" || str === "binary" || str === "dual") {
        return str;
      }
      return "symbolic";
    }

    return str;
  }

  // --------------------------------------------------------------------------
  // REGION / TENANT / PARTITION / INDEX_HINT → string/map
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.REGION_CODE) {
    return normalizeRegionCode(value);
  }

  if (field.type === PulseFieldTypes.TENANT_ID) {
    return normalizeTenantId(value);
  }

  if (field.type === PulseFieldTypes.PARTITION_KEY) {
    return normalizePartitionKey(value);
  }

  if (field.type === PulseFieldTypes.INDEX_HINT) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  // --------------------------------------------------------------------------
  // BASE TYPE MAPPING (Genome → Firestore)
  // --------------------------------------------------------------------------
  const fsType = PulseToFirestore[field.type] || "string";

  switch (fsType) {
    case "string": {
      if (value == null) return "";
      return String(value);
    }

    case "number": {
      const num = Number(value);
      return isFinite(num) ? num : 0;
    }

    case "boolean": {
      return Boolean(value);
    }

    case "timestamp": {
      if (value instanceof Date) return value;
      if (typeof value === "number" && isFinite(value)) return new Date(value);
      if (typeof value === "string") {
        const d = new Date(value);
        return isNaN(d.getTime()) ? new Date(0) : d;
      }
      return new Date(0);
    }

    case "array": {
      if (!Array.isArray(value)) return [];
      // zero‑mutation: shallow copy
      return value.slice();
    }

    case "map": {
      if (value && typeof value === "object") {
        return shallowCloneObject(value);
      }
      return {};
    }

    case "bytes": {
      return value ?? null;
    }

    default:
      return value;
  }
}

/* ============================================================================
   translatePulseSchemaToFirestore(schemaObject, dataObject)
   Converts a PulseField schema + data → Firestore document.
   v24: deterministic, zero‑mutation, schemaVersion tagged.
=============================================================================== */
export function translatePulseSchemaToFirestore(
  schemaObject = {},
  dataObject = {}
) {
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
export function generateFirestoreWritePayload(
  schemaObject = {},
  dataObject = {}
) {
  return translatePulseSchemaToFirestore(schemaObject, dataObject);
}

/* ============================================================================
   IMMORTAL HELPERS — PURE, ZERO‑IO, ZERO‑DRIFT
=============================================================================== */

function shallowCloneObject(obj) {
  if (!obj || typeof obj !== "object") return {};
  const out = {};
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}

function normalizeRegionCode(value) {
  const raw = value == null ? "" : String(value);
  const up = raw.toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  return up.slice(0, 16);
}

function normalizeTenantId(value) {
  const raw = value == null ? "" : String(value);
  const trimmed = raw.trim();
  if (trimmed.length > 128) {
    return trimmed.slice(0, 128);
  }
  return trimmed;
}

function normalizePartitionKey(value) {
  const raw = value == null ? "" : String(value);
  const norm = raw.startsWith("partition:")
    ? raw
    : `partition:${raw}`;
  return norm.slice(0, 256);
}
