/* ============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.SkeletalOutput",
  version: "v24-IMMORTAL-Evo+++",
  layer: "pulse_translator",
  role: "skeletal_output_translator",
  lineage: "SkeletalOutput-v11 → v12.4 → v14-Immortal → v17-IMMORTAL → v24-IMMORTAL-Evo+++",

  evo: {
    skeletalOutput: true,
    genomeDriven: true,
    sqlOutput: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    harmonicsAware: true,
    shifterAware: true,
    regionAware: true,
    tenantAware: true,
    partitionAware: true,
    indexAware: true,

    // v24++ upgrades
    schemaVersioned: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    advantageAware: true,
    integrityAware: true,
    nullableEnvelopeAware: true,
    enumContractAware: true,
    currencyScaleAware: true,
    percentModeAware: true,
    jsonAware: true,
    bitfieldAware: true,

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
FILE: /pulse-translator/PulseTranslatorSkeletalOutput-v24.js
===============================================================================
*/

import {
  PulseToSQL,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

const SKELETAL_OUTPUT_SCHEMA_VERSION = "v4";

/* ============================================================================
   translatePulseField(field)
   Converts a PulseField → SQL column definition (IMMORTAL bone).
   v24 IMMORTAL EVO+++:
     • nullable envelope → JSON
     • enum → VARCHAR(255)
     • currency → DECIMAL(18,scale)
     • percent → DOUBLE
     • binary/pulse_binary → VARBINARY(8192)
     • presence/harmonics/shifter → JSON
     • band → VARCHAR(32)
     • region/tenant/partition/index-hint → VARCHAR/JSON
     • bitfield → BIT or VARBINARY(64)
     • schemaVersioned, deterministic, drift-proof
=============================================================================== */
export function translatePulseField(field) {
  validatePulseField(field);

  const columnName = normalizeSQLName(field.name);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER → JSON envelope
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
    const scale = typeof field.scale === "number" ? field.scale : 2;
    return `${columnName} DECIMAL(18,${scale})`;
  }

  // --------------------------------------------------------------------------
  // PERCENT → DOUBLE
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.PERCENT) {
    return `${columnName} DOUBLE`;
  }

  // --------------------------------------------------------------------------
  // BINARY / PULSE_BINARY → VARBINARY(8192)
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.BINARY ||
    field.type === PulseFieldTypes.PULSE_BINARY
  ) {
    return `${columnName} VARBINARY(8192)`;
  }

  // --------------------------------------------------------------------------
  // BITFIELD → BIT or VARBINARY(64)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BITFIELD) {
    return `${columnName} VARBINARY(64)`;
  }

  // --------------------------------------------------------------------------
  // PULSE / PRESENCE / HARMONICS / SHIFTER → JSON
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.PULSE ||
    field.type === PulseFieldTypes.PRESENCE ||
    field.type === PulseFieldTypes.HARMONICS ||
    field.type === PulseFieldTypes.PULSE_SHIFTER
  ) {
    return `${columnName} JSON`;
  }

  // --------------------------------------------------------------------------
  // BAND → VARCHAR(32)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BAND) {
    return `${columnName} VARCHAR(32)`;
  }

  // --------------------------------------------------------------------------
  // REGION / TENANT / PARTITION → VARCHAR
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.REGION_CODE) {
    return `${columnName} VARCHAR(16)`;
  }

  if (field.type === PulseFieldTypes.TENANT_ID) {
    return `${columnName} VARCHAR(128)`;
  }

  if (field.type === PulseFieldTypes.PARTITION_KEY) {
    return `${columnName} VARCHAR(256)`;
  }

  // --------------------------------------------------------------------------
  // INDEX_HINT → JSON
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.INDEX_HINT) {
    return `${columnName} JSON`;
  }

  // --------------------------------------------------------------------------
  // DEFAULT GENOME MAPPING
  // --------------------------------------------------------------------------
  const sqlType = PulseToSQL[field.type] || "VARCHAR(255)";
  return `${columnName} ${sqlType}`;
}

/* ============================================================================
   translatePulseSchema(schemaObject)
=============================================================================== */
export function translatePulseSchema(schemaObject = {}) {
  const columns = [];

  for (const field of Object.values(schemaObject)) {
    columns.push(translatePulseField(field));
  }

  return columns;
}

/* ============================================================================
   generateCreateTable(tableName, schemaObject)
=============================================================================== */
export function generateCreateTable(tableName, schemaObject = {}) {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchema(schemaObject);

  return `
CREATE TABLE ${normalized} (
  ${columns.join(",\n  ")}
);`.trim();
}

/* ============================================================================
   generateAddColumn(tableName, field)
=============================================================================== */
export function generateAddColumn(tableName, field) {
  validatePulseField(field);

  const normalized = normalizeSQLName(tableName);
  const columnDef = translatePulseField(field);

  return `ALTER TABLE ${normalized} ADD COLUMN ${columnDef};`;
}

/* ============================================================================
   generateDropColumn(tableName, columnName)
=============================================================================== */
export function generateDropColumn(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);

  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeSQLName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}
