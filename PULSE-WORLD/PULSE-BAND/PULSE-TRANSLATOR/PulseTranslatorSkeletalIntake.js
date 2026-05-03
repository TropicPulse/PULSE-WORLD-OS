/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.SkeletalIntake",
  version: "v14-IMMORTAL",
  layer: "pulse_translator",
  role: "skeletal_intake_translator",
  lineage: "SkeletalIntake-v11.0 → v12.4 → v14-IMMORTAL",

  evo: {
    skeletalIntake: true,
    genomeDriven: true,
    sqlIntake: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroSQLExecution: true
  },

  contract: {
    always: [
      "PulseSpecs.DNAGenome",
      "PulseTranslator.RNAIntake",
      "PulseTranslator.RNAOutput",
      "PulseTranslator.SkeletalOutput"
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
  organ: "PulseTranslator.SkeletalIntake",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "SQLColumnDefinition",
    "SQLSchemaObject",
    "SQLQueryString"
  ],

  produces: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseFieldUsageMap"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  sql: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorSkeletalIntake.js
LAYER: THE SKELETAL INTAKE TRANSLATOR (SQL → Pulse)
===============================================================================

ROLE (v14+):
  THE SKELETAL INTAKE TRANSLATOR — Genome‑driven SQL → Pulse translator.
  • Converts SQL column definitions → PulseField objects.
  • Converts SQL schemas → PulseField schema maps.
  • Converts SQL SELECT queries → PulseField usage maps.
  • Uses PulseSpecsDNAGenome v14+ as the authoritative DNA.
  • Deterministic, drift‑proof, pure, read‑only.

PURPOSE (v14+):
  • Provide canonical PulseField structures from SQL metadata.
  • Ensure all SQL types are normalized into genome‑aligned PulseField types.
  • Serve as the skeletal intake layer of the Pulse OS organism.

CONTRACT:
  • PURE FUNCTION — no IO, no network, no SQL execution.
  • READ‑ONLY — no mutation of input.
  • NO eval(), NO Function(), NO dynamic imports.
  • Deterministic output only.

SAFETY:
  • v14+ upgrade is PURE + GENOME‑DRIVEN.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import {
  SQLToPulse,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome.js";

// ============================================================================
// normalizeSQLType(sqlType)
// Handles DECIMAL(x,y), NUMERIC(x,y), VARCHAR(n), etc.
// ============================================================================
function normalizeSQLType(sqlType = "") {
  const upper = sqlType.toUpperCase().trim();

  // Strip parameters: VARCHAR(255) → VARCHAR
  const base = upper.replace(/\(.+\)/g, "");

  return base;
}

// ============================================================================
// translateSQLColumn(sqlType, columnName)
// Converts a SQL column definition → PulseField object.
// ============================================================================
export function translateSQLColumn(sqlType, columnName) {
  if (!sqlType || !columnName) {
    throw new Error("PulseTranslatorSkeletalIntake-v14: missing sqlType or columnName");
  }

  const normalizedType = normalizeSQLType(sqlType);
  let pulseType = SQLToPulse[normalizedType] || PulseFieldTypes.STRING;

  // DECIMAL → currency
  if (normalizedType === "DECIMAL") {
    pulseType = PulseFieldTypes.CURRENCY;
  }

  // ENUM → enum
  if (normalizedType === "ENUM") {
    pulseType = PulseFieldTypes.ENUM;
  }

  // JSON → json
  if (normalizedType === "JSON") {
    pulseType = PulseFieldTypes.JSON;
  }

  // Detect NULLABLE (SQL: "columnName TYPE NULL")
  const isNullable = /\bNULL\b/i.test(sqlType);

  const field = {
    name: normalizeFieldName(columnName),
    type: pulseType,
    source: "sql",
    originalType: sqlType.trim()
  };

  // Wrap nullable fields
  if (isNullable) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = pulseType;
  }

  validatePulseField(field);
  return field;
}

// ============================================================================
// translateSQLSchema(schemaObject)
// Example input:
// {
//   id: "INT",
//   name: "VARCHAR(255)",
//   price: "DECIMAL(18,2)",
//   created_at: "TIMESTAMP NULL"
// }
// ============================================================================
export function translateSQLSchema(schemaObject = {}) {
  const out = {};

  for (const [columnName, sqlType] of Object.entries(schemaObject)) {
    out[columnName] = translateSQLColumn(sqlType, columnName);
  }

  return out;
}

// ============================================================================
// translateSQLQuery(queryString)
// Extracts SELECT fields → PulseField usage map.
// Lightweight — does NOT execute SQL.
// ============================================================================
export function translateSQLQuery(queryString = "") {
  const fields = extractSelectFields(queryString);

  return fields.map((f) => ({
    name: normalizeFieldName(f),
    type: PulseFieldTypes.STRING, // default inference
    source: "sql-query"
  }));
}

// ============================================================================
// Helpers
// ============================================================================
function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

function extractSelectFields(query) {
  const match = query.match(/select\s+(.+?)\s+from/i);
  if (!match) return [];

  const raw = match[1];
  return raw
    .split(",")
    .map((f) => f.trim().replace(/`/g, ""))
    .filter(Boolean);
}
