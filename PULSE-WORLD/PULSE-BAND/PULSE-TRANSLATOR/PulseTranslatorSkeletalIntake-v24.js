/* ============================================================================
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
FILE: /pulse-translator/PulseTranslatorSkeletalIntake-v24.js
===============================================================================
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

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
  SQLToPulse,
  PulseFieldTypes,
  PulseFieldRules,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

const SKELETAL_SCHEMA_VERSION = "v4";

/* ============================================================================
   normalizeSQLType(sqlType)
   Handles DECIMAL(x,y), NUMERIC(x,y), VARCHAR(n), ENUM('a','b'), etc.
=============================================================================== */
function normalizeSQLType(sqlType = "") {
  return sqlType.toUpperCase().trim().replace(/\(.+\)/g, "");
}

/* ============================================================================
   extractEnumValues(sqlType)
   ENUM('A','B','C') → ["A","B","C"]
=============================================================================== */
function extractEnumValues(sqlType = "") {
  const match = sqlType.match(/\((.+)\)/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map(v => v.trim().replace(/^'|'$/g, ""))
    .filter(Boolean);
}

/* ============================================================================
   extractDecimalScale(sqlType)
   DECIMAL(18,2) → 2
=============================================================================== */
function extractDecimalScale(sqlType = "") {
  const m = sqlType.match(/\(\s*\d+\s*,\s*(\d+)\s*\)/);
  return m ? Number(m[1]) : 2;
}

/* ============================================================================
   translateSQLColumn(sqlType, columnName)
   v24 IMMORTAL EVO+++:
     • DECIMAL → currency w/ scale
     • ENUM → enum w/ allowedValues
     • JSON → json
     • VARBINARY/BLOB → binary
     • BIT → bitfield
     • presence/harmonics/shifter detection
     • region/tenant/partition/index-hint detection
     • nullable envelope
     • ruleHints + integrity metadata
=============================================================================== */
export function translateSQLColumn(sqlType, columnName) {
  if (!sqlType || !columnName) {
    throw new Error("PulseTranslatorSkeletalIntake-v24: missing sqlType or columnName");
  }

  const normalizedType = normalizeSQLType(sqlType);
  let pulseType = SQLToPulse[normalizedType] || PulseFieldTypes.STRING;

  // DECIMAL → currency
  if (normalizedType === "DECIMAL" || normalizedType === "NUMERIC") {
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

  // BIT → bitfield
  if (normalizedType === "BIT") {
    pulseType = PulseFieldTypes.BITFIELD ?? PulseFieldTypes.NUMBER;
  }

  // IMMORTAL schema-only detectors
  if (looksLikeBand(columnName)) pulseType = PulseFieldTypes.BAND;
  if (looksLikePresence(columnName)) pulseType = PulseFieldTypes.PRESENCE;
  if (looksLikeHarmonics(columnName)) pulseType = PulseFieldTypes.HARMONICS;
  if (looksLikeShifter(columnName)) pulseType = PulseFieldTypes.PULSE_SHIFTER;

  if (looksLikeRegion(columnName)) pulseType = PulseFieldTypes.REGION_CODE;
  if (looksLikeTenant(columnName)) pulseType = PulseFieldTypes.TENANT_ID;
  if (looksLikePartition(columnName)) pulseType = PulseFieldTypes.PARTITION_KEY;
  if (looksLikeIndexHint(columnName)) pulseType = PulseFieldTypes.INDEX_HINT;

  const isNullable = /\bNULL\b/i.test(sqlType);

  const field = {
    schemaVersion: SKELETAL_SCHEMA_VERSION,
    name: normalizeFieldName(columnName),
    type: pulseType,
    source: "sql",
    originalType: sqlType.trim()
  };

  // ENUM allowedValues
  if (pulseType === PulseFieldTypes.ENUM) {
    field.allowedValues = extractEnumValues(sqlType);
  }

  // DECIMAL scale
  if (pulseType === PulseFieldTypes.CURRENCY) {
    field.scale = extractDecimalScale(sqlType);
  }

  // NULLABLE envelope
  if (isNullable) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = pulseType;
  }

  // v24 ruleHints (if genome supports it)
  if (PulseFieldRules?.inferRuleHints) {
    field.ruleHints = PulseFieldRules.inferRuleHints(field) || null;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateSQLSchema(schemaObject)
=============================================================================== */
export function translateSQLSchema(schemaObject = {}) {
  const out = {};

  for (const [columnName, sqlType] of Object.entries(schemaObject)) {
    out[columnName] = translateSQLColumn(sqlType, columnName);
  }

  return out;
}

/* ============================================================================
   translateSQLQuery(queryString)
   Extracts SELECT fields → PulseField usage map.
   v24: deterministic, pure, zero‑SQL execution.
=============================================================================== */
export function translateSQLQuery(queryString = "") {
  const fields = extractSelectFields(queryString);

  return fields.map((f) => ({
    schemaVersion: SKELETAL_SCHEMA_VERSION,
    name: normalizeFieldName(f),
    type: PulseFieldTypes.STRING,
    source: "sql-query"
  }));
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeFieldName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}

function extractSelectFields(query) {
  const match = query.match(/select\s+(.+?)\s+from/i);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((f) => f.trim().replace(/`/g, ""))
    .filter(Boolean);
}

/* IMMORTAL schema-only detectors */
function looksLikeBand(name) { return /band/i.test(name); }
function looksLikePresence(name) { return /presence/i.test(name); }
function looksLikeHarmonics(name) { return /harmonics/i.test(name); }
function looksLikeShifter(name) { return /shifter/i.test(name); }
function looksLikeRegion(name) { return /region|country|locale/i.test(name); }
function looksLikeTenant(name) { return /tenant|account|org/i.test(name); }
function looksLikePartition(name) { return /partition|shard|segment/i.test(name); }
function looksLikeIndexHint(name) { return /index|idx|key/i.test(name); }
