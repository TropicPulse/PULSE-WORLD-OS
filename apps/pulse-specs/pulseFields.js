// ============================================================================
//  PULSE FIELDS v1.3
//  OS DATA GENOME + TRANSLATION SPEC
//  Deterministic, Drift‑Proof Canonical Field Language
//  PURE SPEC. NO IO. NO NETWORK. NO AI.
// ============================================================================
//
// WHAT THIS FILE IS:
//  -------------------
//  • The OS‑level data genome for Tropic Pulse.
//  • The canonical PulseField language for every subsystem.
//  • The source of truth for SQL ↔ Pulse ↔ Firestore mappings.
//  • The validation rulebook for translators + healers.
//  • The schema cortex for AI reasoning + component generation.
//  • The backwards‑compatible evolution log for data healing + migrations.
//
// WHAT THIS FILE IS NOT:
//  -----------------------
//  • NOT a compute engine.
//  • NOT a runtime.
//  • NOT a database client.
//  • NOT a network caller.
//  • NOT a place for user‑provided logic.
//  • NOT a place for eval / dynamic imports.
//
// SAFETY CONTRACT:
//  ----------------
//  • Read‑only spec — no file writes.
//  • No eval(), no Function(), no dynamic imports.
//  • No network calls.
//  • Deterministic, stable output only.
//  • Backwards‑compatible evolution only.
//  • All new types must degrade safely to existing primitives.
//
// ============================================================================
//  OS CONTEXT METADATA
// ============================================================================
export const PULSE_FIELDS_CONTEXT = {
  layer: "PulseSpecs",
  role: "OS_DATA_GENOME",
  purpose: "Define canonical PulseField types, rules, and mappings",
  context: "Deterministic data language for all Pulse subsystems",
  version: 1.3,
  target: "os-core",
  selfRepairable: false,
  evolution: {
    "1.1": "Base genome: core types + SQL/Firestore mappings.",
    "1.2": "Extended numeric semantics (currency/percent) and enum support.",
    "1.3": "Explicit null handling + stricter URL/email patterns + frozen spec snapshot."
  }
};

// ============================================================================
//  PulseField Types — the universal data language
// ============================================================================
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

  // v1.2+ extensions (backwards‑compatible)
  ENUM: "enum",          // stored as string, constrained to allowedValues
  CURRENCY: "currency",  // stored as number, fixed scale
  PERCENT: "percent",    // stored as number, 0–100 or 0–1 normalized
  NULLABLE: "nullable"   // wrapper type for explicit null semantics
};

// ============================================================================
//  Validation rules for each field type
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
  email: {
    // Slightly stricter but still robust; must remain backwards‑compatible.
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { pattern: /^[0-9+\-() ]+$/ },
  url: {
    // Require http/https, allow query + fragments.
    pattern: /^https?:\/\/[^\s]+$/
  },
  json: {},

  // v1.2+ extensions
  enum: {
    baseType: "string",
    allowedValues: [], // translators/healers must supply concrete list
    maxLength: 255
  },
  currency: {
    baseType: "number",
    scale: 2, // fixed decimal places
    min: -90071992547409.91,
    max: 90071992547409.91
  },
  percent: {
    baseType: "number",
    normalized: false, // false → 0–100, true → 0–1
    min: 0,
    max: 100
  },
  nullable: {
    // Wrapper: { type: 'nullable', innerType: 'string' | 'number' | ... }
    wrapper: true,
    allowNull: true
  }
};

// ============================================================================
//  SQL → PulseField mapping rules
// ============================================================================
export const SQLToPulse = {
  VARCHAR: PulseFieldTypes.STRING,
  TEXT: PulseFieldTypes.STRING,
  INT: PulseFieldTypes.NUMBER,
  INTEGER: PulseFieldTypes.NUMBER,
  BIGINT: PulseFieldTypes.NUMBER,
  FLOAT: PulseFieldTypes.NUMBER,
  DOUBLE: PulseFieldTypes.NUMBER,
  BOOLEAN: PulseFieldTypes.BOOLEAN,
  DATE: PulseFieldTypes.DATE,
  TIMESTAMP: PulseFieldTypes.TIMESTAMP,
  JSON: PulseFieldTypes.JSON,

  // v1.2+ semantic hints (still stored as numeric/string underneath)
  DECIMAL: PulseFieldTypes.NUMBER,
  NUMERIC: PulseFieldTypes.NUMBER
};

// ============================================================================
//  Firestore → PulseField mapping rules
// ============================================================================
export const FirestoreToPulse = {
  string: PulseFieldTypes.STRING,
  number: PulseFieldTypes.NUMBER,
  boolean: PulseFieldTypes.BOOLEAN,
  timestamp: PulseFieldTypes.TIMESTAMP,
  array: PulseFieldTypes.ARRAY,
  map: PulseFieldTypes.OBJECT,
  null: PulseFieldTypes.JSON // null treated as generic JSON container
};

// ============================================================================
//  PulseField → SQL mapping rules
// ============================================================================
export const PulseToSQL = {
  string: "VARCHAR(255)",
  number: "DOUBLE",
  boolean: "BOOLEAN",
  date: "DATE",
  timestamp: "TIMESTAMP",
  array: "JSON",
  object: "JSON",
  id: "VARCHAR(64)",
  email: "VARCHAR(255)",
  phone: "VARCHAR(32)",
  url: "VARCHAR(512)",
  json: "JSON",

  // v1.2+ extensions
  enum: "VARCHAR(255)",      // constrained at app/spec level
  currency: "DECIMAL(18,2)", // safe default
  percent: "DOUBLE",         // normalized or 0–100, enforced by rules
  nullable: "JSON"           // wrapper; translators choose concrete column
};

// ============================================================================
//  PulseField → Firestore mapping rules
// ============================================================================
export const PulseToFirestore = {
  string: "string",
  number: "number",
  boolean: "boolean",
  date: "timestamp",
  timestamp: "timestamp",
  array: "array",
  object: "map",
  id: "string",
  email: "string",
  phone: "string",
  url: "string",
  json: "map",

  // v1.2+ extensions
  enum: "string",
  currency: "number",
  percent: "number",
  nullable: "map" // wrapper object with { value, isNull }
};

// ============================================================================
//  validatePulseField(field) — schema sanity check
// ============================================================================
export function validatePulseField(field) {
  if (!field || !field.type) {
    throw new Error("PulseField missing type");
  }

  const rules = PulseFieldRules[field.type];
  if (!rules) {
    throw new Error(`Unknown PulseField type: ${field.type}`);
  }

  // v1.3: light structural checks for extended types (still deterministic)
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
//  PULSE_FIELDS_SPEC — single export for translators + healers
//  Frozen snapshot to prevent runtime mutation / drift.
// ============================================================================
export const PULSE_FIELDS_SPEC = Object.freeze({
  ...PULSE_FIELDS_CONTEXT,
  types: Object.freeze({ ...PulseFieldTypes }),
  rules: Object.freeze({ ...PulseFieldRules }),
  sqlToPulse: Object.freeze({ ...SQLToPulse }),
  firestoreToPulse: Object.freeze({ ...FirestoreToPulse }),
  pulseToSQL: Object.freeze({ ...PulseToSQL }),
  pulseToFirestore: Object.freeze({ ...PulseToFirestore })
});
