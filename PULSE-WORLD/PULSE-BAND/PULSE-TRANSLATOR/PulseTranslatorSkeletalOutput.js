/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.SkeletalOutput",
  version: "v14-IMMORTAL",
  layer: "pulse_translator",
  role: "skeletal_output_translator",
  lineage: "SkeletalOutput-v11.0 → v12.4 → v14-IMMORTAL",

  evo: {
    skeletalOutput: true,
    genomeDriven: true,
    sqlOutput: true,
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
  organ: "PulseTranslator.SkeletalOutput",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseTableName"
  ],

  produces: [
    "SQLColumnDefinition",
    "SQLColumnDefinition[]",
    "SQLCreateTableStatement",
    "SQLMigrationFragment"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  sql: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorSkeletal.js
LAYER: THE SKELETAL TRANSLATOR (Pulse → SQL)
===============================================================================

ROLE (v14+):
  THE SKELETAL TRANSLATOR — Genome‑driven Pulse → SQL translator.
  • Converts PulseField definitions → SQL column definitions.
  • Converts PulseField schemas → SQL CREATE TABLE statements.
  • Converts PulseField changes → SQL migration fragments.
  • Uses PulseSpecsDNAGenome v14+ as the authoritative DNA.
  • Deterministic, drift‑proof, pure, read‑only.

PURPOSE (v14+):
  • Provide canonical SQL structures from PulseField metadata.
  • Ensure all SQL types are normalized into genome‑aligned SQL types.
  • Serve as the skeletal output layer of the Pulse OS organism.

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
  PulseToSQL,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome.js";

// ============================================================================
// translatePulseField(field)
// Converts a PulseField → SQL column definition (bone).
// ============================================================================
export function translatePulseField(field) {
  validatePulseField(field);

  const columnName = normalizeSQLName(field.name);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER → JSON bone storing { isNull, value }
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.NULLABLE) {
    return `${columnName} JSON`;
  }

  // --------------------------------------------------------------------------
  // ENUM → VARCHAR(255)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.ENUM) {
    return `${columnName} VARCHAR(255)`;
  }

  // --------------------------------------------------------------------------
  // CURRENCY → DECIMAL(18,scale)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.CURRENCY) {
    return `${columnName} DECIMAL(18,${field.scale ?? 2})`;
  }

  // --------------------------------------------------------------------------
  // PERCENT → DOUBLE
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.PERCENT) {
    return `${columnName} DOUBLE`;
  }

  // --------------------------------------------------------------------------
  // DEFAULT GENOME MAPPING
  // --------------------------------------------------------------------------
  const sqlType = PulseToSQL[field.type] || "VARCHAR(255)";
  return `${columnName} ${sqlType}`;
}

// ============================================================================
// translatePulseSchema(schemaObject)
// Converts a PulseField schema → array of SQL column definitions.
// ============================================================================
export function translatePulseSchema(schemaObject = {}) {
  const columns = [];

  for (const field of Object.values(schemaObject)) {
    columns.push(translatePulseField(field));
  }

  return columns;
}

// ============================================================================
// generateCreateTable(tableName, schemaObject)
// Produces a full CREATE TABLE statement (bone formation).
// ============================================================================
export function generateCreateTable(tableName, schemaObject = {}) {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchema(schemaObject);

  return `
CREATE TABLE ${normalized} (
  ${columns.join(",\n  ")}
);`.trim();
}

// ============================================================================
// generateAddColumn(tableName, field)
// Produces a SQL migration fragment for adding a column (bone growth).
// ============================================================================
export function generateAddColumn(tableName, field) {
  validatePulseField(field);

  const normalized = normalizeSQLName(tableName);
  const columnDef = translatePulseField(field);

  return `ALTER TABLE ${normalized} ADD COLUMN ${columnDef};`;
}

// ============================================================================
// generateDropColumn(tableName, columnName)
// Produces a SQL migration fragment for removing a column (bone removal).
// ============================================================================
export function generateDropColumn(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);

  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}

// ============================================================================
// Helpers
// ============================================================================
function normalizeSQLName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
