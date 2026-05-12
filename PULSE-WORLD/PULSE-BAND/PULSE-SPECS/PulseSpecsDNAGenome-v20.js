// ============================================================================
// FILE: /specs/PulseSpecsDNAGenome-v20-IMMORTAL.js
// [pulse:specs] PULSE_SPECS_DNA_GENOME v20-IMMORTAL
// OS Data Genome • Canonical Field Language • Deterministic Translation Spec
// PURE SPEC — NO IO • NO NETWORK • NO AI • NO RUNTIME
// ============================================================================
//
// IDENTITY — THE OS DNA GENOME (v20-IMMORTAL):
// -------------------------------------------
// • Immutable genetic blueprint of Pulse OS (v10.4 → v20 IMMORTAL).
// • Canonical PulseField language for all v12+ subsystems.
// • Source of truth for SQL ↔ Pulse ↔ Firestore ↔ WorldDataProvider mappings.
// • Validation rulebook for translators + healers + shifter engines.
// • Schema cortex foundation for AI reasoning + component generation.
// • Drift‑proof, deterministic, backwards‑compatible, evolution‑safe.
// • Binary‑aware, pulse‑aware, dual‑band, shifter‑aware (symbolic + binary).
// • Presence/harmonics/IMMORTAL band metadata surfaced as pure schema only.
// • Multi‑backend aware (firebase/sql/worldDataProvider/custom).
// • v20 adds: IntellHash hints, BinarySubstrate hints, WorldRouter hints,
//   Scheduler hints, Region/Tenant/Partition/Index v2, and Epoch‑20 stability.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const PULSE_FIELDS_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// PulseField Types — the universal data language (GENETIC ALPHABET)
// ============================================================================
// NOTE: v20 adds no breaking primitives. New types must degrade cleanly.
export const PulseFieldTypes = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  DATE: "date",
  TIMESTAMP: "timestamp",
  ARRAY: "array",
  OBJECT: "object",
  ID: "id",
  EMAIL: "email",
  PHONE: "phone",
  URL: "url",
  JSON: "json",

  // v1.2+ extensions
  ENUM: "enum",
  CURRENCY: "currency",
  PERCENT: "percent",
  NULLABLE: "nullable",

  // v11‑Evo binary/pulse extensions
  BINARY: "binary",
  BITFIELD: "bitfield",
  PULSE: "pulse",
  PULSE_BINARY: "pulse_binary",

  // v14 IMMORTAL band/shifter extensions
  BAND: "band",
  PRESENCE: "presence",
  HARMONICS: "harmonics",
  PULSE_SHIFTER: "pulse_shifter",
  PULSE_SHIFTER_BINARY: "pulse_shifter_binary",

  // v17 multi‑backend / world‑layer hints
  REGION_CODE: "region_code",
  TENANT_ID: "tenant_id",
  PARTITION_KEY: "partition_key",
  INDEX_HINT: "index_hint",

  // v20 IMMORTAL new field types
  INTELL_HASH: "intell_hash",               // SHA‑256 + size + advantageHint
  BINARY_SUBSTRATE_FRAME: "binary_frame",   // fixed‑width substrate frame
  WORLD_ROUTER_HINT: "world_router_hint",   // routing metadata
  SCHEDULER_HINT: "scheduler_hint",         // scheduler metadata
  IMMORTAL_EPOCH: "immortal_epoch"          // epoch‑20 stability marker
};


// ============================================================================
// Validation rules — GENETIC EXPRESSION RULES
// ============================================================================
export const PulseFieldRules = {
  string: { maxLength: 2048, trim: true },
  number: { allowFloat: true },
  boolean: {},
  date: { format: "YYYY-MM-DD" },
  timestamp: { format: "ISO8601" },
  array: { elementType: "any", maxLength: 1024 },
  object: { strict: false },
  id: { pattern: /^[A-Za-z0-9_-]+$/ },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { pattern: /^[0-9+\-() ]+$/ },
  url: { pattern: /^https?:\/\/[^\s]+$/ },
  json: {},

  enum: {
    baseType: "string",
    allowedValues: [],
    maxLength: 255
  },
  currency: {
    baseType: "number",
    scale: 2,
    min: -90071992547409.91,
    max:  90071992547409.91
  },
  percent: {
    baseType: "number",
    normalized: false,
    min: 0,
    max: 100
  },
  nullable: {
    wrapper: true,
    allowNull: true
  },

  binary: {
    baseType: "string",
    encoding: "base64",
    maxLength: 8192
  },
  bitfield: {
    baseType: "number",
    min: 0
  },
  pulse: {
    baseType: "json",
    strict: false
  },
  pulse_binary: {
    baseType: "binary"
  },

  band: {
    baseType: "string",
    allowedValues: ["symbolic", "binary", "dual"],
    maxLength: 32
  },
  presence: {
    baseType: "json",
    strict: false
  },
  harmonics: {
    baseType: "json",
    strict: false
  },
  pulse_shifter: {
    baseType: "json",
    strict: false
  },
  pulse_shifter_binary: {
    baseType: "binary"
  },

  region_code: {
    baseType: "string",
    maxLength: 16
  },
  tenant_id: {
    baseType: "string",
    maxLength: 128
  },
  partition_key: {
    baseType: "string",
    maxLength: 256
  },
  index_hint: {
    baseType: "json",
    strict: false
  },

  // v20: IntellHash — SHA-256 + size + optional advantage hint
  intell_hash: {
    baseType: "string",
    encoding: "hex",
    length: 64,
    carriesSize: true,
    carriesAdvantageHint: true
  },

  // v20: BinarySubstrate frame — fixed-width binary frame metadata
  binary_frame: {
    baseType: "binary",
    fixedWidth: true,
    carriesTag: true,
    carriesBand: true,
    carriesSize: true
  },

  // v20: World router hint — routing metadata for world engine
  world_router_hint: {
    baseType: "json",
    strict: false,
    fields: {
      route: "string",
      region: "string",
      tenant: "string",
      priority: "number"
    }
  },

  // v20: Scheduler hint — scheduling metadata for world scheduler
  scheduler_hint: {
    baseType: "json",
    strict: false,
    fields: {
      cron: "string",
      window: "string",
      priority: "number"
    }
  },

  // v20: Immortal epoch marker — epoch/version stability
  immortal_epoch: {
    baseType: "string",
    pattern: /^v[0-9]+-IMMORTAL$/
  }
};


// ============================================================================
// SQL → PulseField mapping — RNA TRANSCRIPTION (SQL → Genome)
// ============================================================================
export const SQLToPulse = {
  VARCHAR:   PulseFieldTypes.STRING,
  TEXT:      PulseFieldTypes.STRING,
  INT:       PulseFieldTypes.NUMBER,
  INTEGER:   PulseFieldTypes.NUMBER,
  BIGINT:    PulseFieldTypes.NUMBER,
  FLOAT:     PulseFieldTypes.NUMBER,
  DOUBLE:    PulseFieldTypes.NUMBER,
  BOOLEAN:   PulseFieldTypes.BOOLEAN,
  DATE:      PulseFieldTypes.DATE,
  TIMESTAMP: PulseFieldTypes.TIMESTAMP,
  JSON:      PulseFieldTypes.JSON,

  DECIMAL:   PulseFieldTypes.NUMBER,
  NUMERIC:   PulseFieldTypes.NUMBER,

  VARBINARY: PulseFieldTypes.BINARY,
  BLOB:      PulseFieldTypes.BINARY,
  BIT:       PulseFieldTypes.BITFIELD
};


// ============================================================================
// Firestore → PulseField mapping — RNA TRANSCRIPTION (Firestore → Genome)
// ============================================================================
export const FirestoreToPulse = {
  string:    PulseFieldTypes.STRING,
  number:    PulseFieldTypes.NUMBER,
  boolean:   PulseFieldTypes.BOOLEAN,
  timestamp: PulseFieldTypes.TIMESTAMP,
  array:     PulseFieldTypes.ARRAY,
  map:       PulseFieldTypes.OBJECT,
  null:      PulseFieldTypes.JSON,
  bytes:     PulseFieldTypes.BINARY
};


// ============================================================================
// PulseField → SQL mapping — PROTEIN SYNTHESIS (Genome → SQL)
// ============================================================================
export const PulseToSQL = {
  string:   "VARCHAR(255)",
  number:   "DOUBLE",
  boolean:  "BOOLEAN",
  date:     "DATE",
  timestamp:"TIMESTAMP",
  array:    "JSON",
  object:   "JSON",
  id:       "VARCHAR(64)",
  email:    "VARCHAR(255)",
  phone:    "VARCHAR(32)",
  url:      "VARCHAR(512)",
  json:     "JSON",

  enum:     "VARCHAR(255)",
  currency: "DECIMAL(18,2)",
  percent:  "DOUBLE",
  nullable: "JSON",

  binary:        "VARBINARY(8192)",
  bitfield:      "BIGINT",
  pulse:         "JSON",
  pulse_binary:  "VARBINARY(8192)",

  band:                 "VARCHAR(32)",
  presence:             "JSON",
  harmonics:            "JSON",
  pulse_shifter:        "JSON",
  pulse_shifter_binary: "VARBINARY(8192)",

  region_code:   "VARCHAR(16)",
  tenant_id:     "VARCHAR(128)",
  partition_key: "VARCHAR(256)",
  index_hint:    "JSON",

  // v20
  intell_hash:          "CHAR(64)",
  binary_frame:         "VARBINARY(8192)",
  world_router_hint:    "JSON",
  scheduler_hint:       "JSON",
  immortal_epoch:       "VARCHAR(32)"
};


// ============================================================================
// PulseField → Firestore mapping — PROTEIN SYNTHESIS (Genome → Firestore)
// ============================================================================
export const PulseToFirestore = {
  string:   "string",
  number:   "number",
  boolean:  "boolean",
  date:     "timestamp",
  timestamp:"timestamp",
  array:    "array",
  object:   "map",
  id:       "string",
  email:    "string",
  phone:    "string",
  url:      "string",
  json:     "map",

  enum:     "string",
  currency: "number",
  percent:  "number",
  nullable: "map",

  binary:        "bytes",
  bitfield:      "number",
  pulse:         "map",
  pulse_binary:  "bytes",

  band:                 "string",
  presence:             "map",
  harmonics:            "map",
  pulse_shifter:        "map",
  pulse_shifter_binary: "bytes",

  region_code:   "string",
  tenant_id:     "string",
  partition_key: "string",
  index_hint:    "map",

  // v20
  intell_hash:          "string",
  binary_frame:         "bytes",
  world_router_hint:    "map",
  scheduler_hint:       "map",
  immortal_epoch:       "string"
};


// ============================================================================
// WorldDataProvider mapping hints — Genome → Abstract World Backend
// ============================================================================
export const PulseToWorldDataProvider = {
  string:   "string",
  number:   "number",
  boolean:  "boolean",
  date:     "date",
  timestamp:"timestamp",
  array:    "array",
  object:   "object",
  id:       "id",
  email:    "string",
  phone:    "string",
  url:      "string",
  json:     "json",

  enum:     "string",
  currency: "number",
  percent:  "number",
  nullable: "nullable",

  binary:        "binary",
  bitfield:      "number",
  pulse:         "json",
  pulse_binary:  "binary",

  band:                 "string",
  presence:             "json",
  harmonics:            "json",
  pulse_shifter:        "json",
  pulse_shifter_binary: "binary",

  region_code:   "string",
  tenant_id:     "string",
  partition_key: "string",
  index_hint:    "json",

  // v20
  intell_hash:          "string",
  binary_frame:         "binary",
  world_router_hint:    "json",
  scheduler_hint:       "json",
  immortal_epoch:       "string"
};


// ============================================================================
// validatePulseField(field) — GENETIC SANITY CHECK
// ============================================================================
export function validatePulseField(field) {
  if (!field || !field.type) {
    throw new Error("PulseField missing type");
  }

  const rules = PulseFieldRules[field.type];
  if (!rules) {
    throw new Error(`Unknown PulseField type: ${field.type}`);
  }

  if (field.type === "enum") {
    if (!Array.isArray(field.allowedValues) || field.allowedValues.length === 0) {
      throw new Error("PulseField enum requires non-empty allowedValues array");
    }
  }

  if (field.type === "nullable") {
    if (!field.innerType || !PulseFieldRules[field.innerType]) {
      throw new Error("PulseField nullable requires valid innerType");
    }
  }

  return true;
}


// ============================================================================
// PULSE_FIELDS_SPEC — FROZEN GENOME SNAPSHOT (v20-IMMORTAL)
// ============================================================================
export const PULSE_FIELDS_SPEC = Object.freeze({
  ...PULSE_FIELDS_CONTEXT,
  types: Object.freeze({ ...PulseFieldTypes }),
  rules: Object.freeze({ ...PulseFieldRules }),
  sqlToPulse: Object.freeze({ ...SQLToPulse }),
  firestoreToPulse: Object.freeze({ ...FirestoreToPulse }),
  pulseToSQL: Object.freeze({ ...PulseToSQL }),
  pulseToFirestore: Object.freeze({ ...PulseToFirestore }),
  pulseToWorldDataProvider: Object.freeze({ ...PulseToWorldDataProvider })
});
