// ============================================================================
//  PulseTranslatorSkeletalClient.js — v24-IMMORTAL++
//  CLIENT-SIDE SQL TRANSLATOR (PURE • DETERMINISTIC • ZERO IO)
//  Converts PulseField → SQL column definitions (client-safe)
//  Converts PulseSchema → SQL CREATE TABLE statements
//  Converts PulseField changes → SQL migration fragments
//
//  ⭐ THIS FILE IS THE CLIENT-SIDE MIRROR OF YOUR SERVER-SIDE SQL TRANSLATOR ⭐
//
//  It does NOT execute SQL.
//  It does NOT connect to SQL Server.
//  It ONLY generates deterministic SQL strings.
//
//  When you build your SQL adapter (PulseSqlClient.js), use the notes below.
//  They represent the BEST POSSIBLE SQL SERVER SETUP for Pulse OS.
//
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


export const PulseTranslatorSkeletalClientMeta = Object.freeze({
  identity: "PulseTranslatorSkeletalClient-v24-IMMORTAL++",
  layer: "PulseClientTranslator",
  role: "SQL_TRANSLATOR_CLIENT",
  version: "24-IMMORTAL++",
  deterministic: true,
  driftProof: true,
  zeroIO: true,
  zeroNetwork: true,
  zeroMutation: true
});

// ============================================================================
//  ⭐ SQL SERVER BEST PRACTICES FOR PULSE OS (READ THIS WHEN BUILDING ADAPTER)
// ============================================================================
//
//  1. STRING TYPES
//     - Use NVARCHAR(255) instead of VARCHAR(255)
//       SQL Server's VARCHAR is ASCII-only.
//       Pulse OS uses emojis, multi-language, persona IDs, symbolic text.
//       → ALWAYS prefer NVARCHAR.
//
//  2. DATE TYPES
//     - Use DATETIME2(3) instead of DATETIME
//       Better precision, deterministic, no legacy rounding.
//       Perfect for Pulse timestamps.
//
//  3. ID TYPES
//     - Use BIGINT for Pulse IDs (snowflakes).
//       They are 64-bit epoch-based identifiers.
//       SQL Server handles BIGINT beautifully.
//
//  4. NULLABLE FIELDS
//     - Pulse NULLABLE wrapper = JSON
//       SQL Server supports JSON natively.
//       Use NVARCHAR(MAX) with CHECK(ISJSON(column)=1)
//
//  5. INDEXING STRATEGY
//     - Clustered index on (id)
//       Pulse IDs are time-ordered → perfect for clustered index.
//     - Nonclustered indexes on:
//         createdAt
//         updatedAt
//         userId
//         foreign keys
//
//  6. MEMORY OPTIMIZED TABLES (OPTIONAL, GOD-TIER SPEED)
//     - Use MEMORY_OPTIMIZED=ON for high-frequency Pulse traffic.
//       WITH (MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_ONLY)
//
//  7. STORED PROCEDURES
//     - Use stored procedures for heavy operations.
//       Dynamic SQL is fine for simple CRUD, but SPs give:
//         deterministic plans
//         speed
//         security
//         stability
//
//  8. TRANSACTIONS
//     - Wrap multi-step writes in explicit transactions.
//       Pulse OS expects atomicity.
//
//  9. SCHEMA VERSIONING
//     - Keep a PulseWorldSchemaVersion table.
//       Store migration history.
//       Deterministic upgrades.
//
// 10. NEVER LET CLIENT EXECUTE SQL
//     - This file is PURE TRANSLATION ONLY.
//       Execution happens ONLY in backend adapter.
//
// ============================================================================
//  END OF SQL SERVER MASTER NOTES
// ============================================================================


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function normalizeSQLName(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}


// ---------------------------------------------------------------------------
// PulseField → SQL column definition
// ---------------------------------------------------------------------------
//
// ⭐ NOTE FOR FUTURE YOU:
// When you build your SQL adapter, map these types to the BEST SQL Server types.
// The client translator uses generic SQL types, but your backend adapter should
// upgrade them to NVARCHAR, DATETIME2, etc.
//
// ---------------------------------------------------------------------------
export function translatePulseFieldClient(field) {
  if (!field || typeof field !== "object") {
    throw new Error("Invalid PulseField for client translation");
  }

  const columnName = normalizeSQLName(field.name);

  switch (field.type) {
    case "NULLABLE":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use NVARCHAR(MAX) CHECK(ISJSON(column)=1)
      return `${columnName} JSON`;

    case "ENUM":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use NVARCHAR(255)
      return `${columnName} VARCHAR(255)`;

    case "CURRENCY":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use DECIMAL(18, scale)
      return `${columnName} DECIMAL(18,${field.scale ?? 2})`;

    case "PERCENT":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use FLOAT or DECIMAL(5,4)
      return `${columnName} FLOAT`;

    case "INT":
      return `${columnName} INT`;

    case "BIGINT":
      return `${columnName} BIGINT`;

    case "TEXT":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use NVARCHAR(MAX)
      return `${columnName} TEXT`;

    case "STRING":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use NVARCHAR(255)
      return `${columnName} VARCHAR(255)`;

    case "BOOL":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use BIT
      return `${columnName} BIT`;

    case "DATE":
      // ⭐ SQL SERVER BEST PRACTICE:
      // Use DATETIME2(3)
      return `${columnName} DATETIME`;

    default:
      // ⭐ DEFAULT STRING TYPE
      return `${columnName} VARCHAR(255)`;
  }
}


// ---------------------------------------------------------------------------
// PulseSchema → SQL column list
// ---------------------------------------------------------------------------
export function translatePulseSchemaClient(schemaObject = {}) {
  return Object.values(schemaObject).map((field) =>
    translatePulseFieldClient(field)
  );
}


// ---------------------------------------------------------------------------
// CREATE TABLE generator
// ---------------------------------------------------------------------------
//
// ⭐ NOTE:
// Your backend SQL adapter should:
//   - Add PRIMARY KEY (id)
//   - Add clustered index
//   - Add nonclustered indexes
//   - Add NVARCHAR upgrades
//   - Add DATETIME2 upgrades
//
// This client version is intentionally minimal.
//
// ---------------------------------------------------------------------------
export function generateCreateTableClient(tableName, schemaObject = {}) {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchemaClient(schemaObject);

  return `
CREATE TABLE ${normalized} (
  ${columns.join(",\n  ")}
);`.trim();
}


// ---------------------------------------------------------------------------
// Migration: ADD COLUMN
// ---------------------------------------------------------------------------
export function generateAddColumnClient(tableName, field) {
  const normalized = normalizeSQLName(tableName);
  const col = translatePulseFieldClient(field);
  return `ALTER TABLE ${normalized} ADD ${col};`;
}


// ---------------------------------------------------------------------------
// Migration: DROP COLUMN
// ---------------------------------------------------------------------------
export function generateDropColumnClient(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);
  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}
