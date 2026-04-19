// FILE: tropic-pulse-functions/apps/pulse-translator/pulseToSQL.js
// VERSION: 7.3
//
// ------------------------------------------------------
// 📘 PAGE INDEX — Source of Truth for This File
// ------------------------------------------------------
//
// ROLE:
//   PulseToSQL — deterministic, read‑only translator that converts PulseField
//   definitions into SQL column definitions, SQL table schemas, and SQL
//   migration fragments.
//
// PURPOSE:
//   • Convert PulseField objects → SQL column definitions
//   • Convert PulseField schemas → SQL CREATE TABLE statements
//   • Provide a stable, AI‑readable + human‑readable SQL translation layer
//   • Enable backend AI to generate SQL safely and deterministically
//
// OUTPUT:
//   • SQL column definitions
//   • SQL CREATE TABLE statements
//   • SQL ALTER TABLE migration fragments
//
// RESPONSIBILITIES:
//   • Map PulseField types → SQL types
//   • Normalize SQL identifiers
//   • Validate PulseField definitions
//   • Produce deterministic SQL output
//
// SAFETY RULES (CRITICAL):
//   • READ‑ONLY — no file writes
//   • NO eval(), NO Function(), NO dynamic imports
//   • NO executing SQL
//   • NO network calls
//   • Deterministic translation only
//
// ------------------------------------------------------
// Pulse → SQL Translator (v7.3)
// ------------------------------------------------------

import {
  PulseToSQL,
  PulseFieldTypes,
  validatePulseField
} from "../pulse-specs/pulseFields.js";

/**
 * translatePulseField(field)
 * Converts a PulseField object into a SQL column definition.
 * v7.3: supports:
 *   • nullable wrapper
 *   • enum
 *   • currency (DECIMAL)
//   • percent (DOUBLE)
//   • deterministic fallback rules
 */
export function translatePulseField(field) {
  validatePulseField(field);

  const columnName = normalizeSQLName(field.name);

  // v7.3: nullable wrapper → JSON column storing { isNull, value }
  if (field.type === PulseFieldTypes.NULLABLE) {
    return `${columnName} JSON`;
  }

  // v7.3: enum → VARCHAR(255)
  if (field.type === PulseFieldTypes.ENUM) {
    return `${columnName} VARCHAR(255)`;
  }

  // v7.3: currency → DECIMAL(18,2)
  if (field.type === PulseFieldTypes.CURRENCY) {
    return `${columnName} DECIMAL(18,${field.scale ?? 2})`;
  }

  // v7.3: percent → DOUBLE
  if (field.type === PulseFieldTypes.PERCENT) {
    return `${columnName} DOUBLE`;
  }

  // Default mapping from PulseFields v1.3
  const sqlType = PulseToSQL[field.type] || "VARCHAR(255)";
  return `${columnName} ${sqlType}`;
}

/**
 * translatePulseSchema(schemaObject)
 * Converts a PulseField schema into an array of SQL column definitions.
 */
export function translatePulseSchema(schemaObject = {}) {
  const columns = [];

  for (const field of Object.values(schemaObject)) {
    columns.push(translatePulseField(field));
  }

  return columns;
}

/**
 * generateCreateTable(tableName, schemaObject)
 * Produces a full CREATE TABLE statement.
 */
export function generateCreateTable(tableName, schemaObject = {}) {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchema(schemaObject);

  return `
CREATE TABLE ${normalized} (
  ${columns.join(",\n  ")}
);`.trim();
}

/**
 * generateAddColumn(tableName, field)
 * Produces a SQL migration fragment for adding a column.
 */
export function generateAddColumn(tableName, field) {
  validatePulseField(field);

  const normalized = normalizeSQLName(tableName);
  const columnDef = translatePulseField(field);

  return `ALTER TABLE ${normalized} ADD COLUMN ${columnDef};`;
}

/**
 * generateDropColumn(tableName, columnName)
 */
export function generateDropColumn(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);

  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function normalizeSQLName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}
