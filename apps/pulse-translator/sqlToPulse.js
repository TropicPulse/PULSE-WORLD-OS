// FILE: tropic-pulse-functions/apps/pulse-translator/sqlToPulse.js
// VERSION: 7.3
//
// ------------------------------------------------------
// 📘 PAGE INDEX — Source of Truth for This File
// ------------------------------------------------------
//
// ROLE:
//   SQLtoPulse — deterministic, read‑only translator that converts SQL
//   column definitions, query structures, and inferred types into the
//   canonical Pulse‑Fields specification.
//
// PURPOSE:
//   • Convert SQL schemas → PulseField definitions
//   • Convert SQL query structures → PulseField usage maps
//   • Provide a stable, AI‑readable + human‑readable data translation layer
//   • Enable backend + frontend AI to understand SQL data safely
//
// OUTPUT:
//   • PulseField objects
//   • PulseField type mappings
//   • Deterministic translation results
//
// RESPONSIBILITIES:
//   • Parse SQL column definitions
//   • Infer PulseField types from SQL types
//   • Normalize field names
//   • Validate against PulseField rules
//   • Produce deterministic PulseField objects
//
// SAFETY RULES (CRITICAL):
//   • READ‑ONLY — no file writes
//   • NO eval(), NO Function(), NO dynamic imports
//   • NO executing SQL
//   • NO network calls
//   • Deterministic translation only
//
// ------------------------------------------------------
// SQL → Pulse Translator (v7.3)
// ------------------------------------------------------

import {
  SQLToPulse,
  PulseFieldTypes,
  validatePulseField
} from "../pulse-specs/pulseFields.js";

/**
 * normalizeSQLType(sqlType)
 * v7.3: handles DECIMAL(x,y), NUMERIC(x,y), VARCHAR(n), etc.
 */
function normalizeSQLType(sqlType = "") {
  const upper = sqlType.toUpperCase().trim();

  // Strip parameters: VARCHAR(255) → VARCHAR
  const base = upper.replace(/\(.+\)/g, "");

  return base;
}

/**
 * translateSQLColumn(sqlType, columnName)
 * Converts a SQL column definition into a PulseField object.
 * v7.3: supports:
 *   • DECIMAL → currency
 *   • NUMERIC → number
 *   • ENUM → enum
 *   • JSON → json
 *   • NULLABLE → nullable wrapper (if SQL says NULL)
 */
export function translateSQLColumn(sqlType, columnName) {
  if (!sqlType || !columnName) {
    throw new Error("sqlToPulse: missing sqlType or columnName");
  }

  const normalizedType = normalizeSQLType(sqlType);
  let pulseType = SQLToPulse[normalizedType] || PulseFieldTypes.STRING;

  // v7.3: DECIMAL → currency
  if (normalizedType === "DECIMAL") {
    pulseType = PulseFieldTypes.CURRENCY;
  }

  // v7.3: ENUM → enum
  if (normalizedType === "ENUM") {
    pulseType = PulseFieldTypes.ENUM;
  }

  // v7.3: JSON → json
  if (normalizedType === "JSON") {
    pulseType = PulseFieldTypes.JSON;
  }

  // v7.3: detect NULLABLE (SQL: "columnName TYPE NULL")
  const isNullable = /\bNULL\b/i.test(sqlType);

  const field = {
    name: normalizeFieldName(columnName),
    type: pulseType,
    source: "sql",
    originalType: sqlType.trim(),
  };

  // v7.3: wrap nullable fields
  if (isNullable) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = pulseType;
  }

  validatePulseField(field);
  return field;
}

/**
 * translateSQLSchema(schemaObject)
 * Example input:
 * {
 *   id: "INT",
 *   name: "VARCHAR(255)",
 *   price: "DECIMAL(18,2)",
 *   created_at: "TIMESTAMP NULL"
 * }
 */
export function translateSQLSchema(schemaObject = {}) {
  const out = {};

  for (const [columnName, sqlType] of Object.entries(schemaObject)) {
    out[columnName] = translateSQLColumn(sqlType, columnName);
  }

  return out;
}

/**
 * translateSQLQuery(queryString)
 * Extracts SELECT fields and infers PulseField types.
 * v7.3: still lightweight — does NOT execute SQL.
 */
export function translateSQLQuery(queryString = "") {
  const fields = extractSelectFields(queryString);

  return fields.map((f) => ({
    name: normalizeFieldName(f),
    type: PulseFieldTypes.STRING, // default inference
    source: "sql-query",
  }));
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

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
