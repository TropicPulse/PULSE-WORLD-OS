// ============================================================================
//  PULSE OS v10.4 — AI SERVICE GATEWAY
//  Safe Entry Point • Persona Router • Evolutionary Relay
//  PURE RELAY. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

import { runAI } from "./aiEngine.js";

import {
  analyzeFirestoreDoc,
  analyzeSQLSchema,
  detectDrift,
  detectSlowdownPatterns,
  validatePulseSchema
} from "./aiTools.js";

// ============================================================================
// INTERNAL — Deterministic Relay Wrapper
// ============================================================================
function callAI(intent, flags, operation, request = {}) {
  return runAI(
    Object.freeze({
      ...request,
      intent,
      ...flags
    }),
    operation
  );
}

// ============================================================================
// FIRESTORE ANALYSIS — Gateway Wrapper
// ============================================================================
export async function runAnalyzeFirestore(docData, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeFirestoreDoc(context, docData);
      detectSlowdownPatterns(context, docData);
      return pulseSchema;
    },
    request
  );
}

// ============================================================================
// SQL ANALYSIS — Gateway Wrapper
// ============================================================================
export async function runAnalyzeSQL(sqlSchema, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeSQLSchema(context, sqlSchema);
      detectSlowdownPatterns(context, sqlSchema);
      return pulseSchema;
    },
    request
  );
}

// ============================================================================
// DRIFT DETECTION — Gateway Wrapper
// ============================================================================
export async function runDetectDrift(pulseSchema, firestoreSchema, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const drift = detectDrift(context, pulseSchema, firestoreSchema);
      return Object.freeze({ drift });
    },
    request
  );
}

// ============================================================================
// PULSE SCHEMA VALIDATION — Gateway Wrapper
// ============================================================================
export async function runValidatePulse(pulseSchema, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      validatePulseSchema(context, pulseSchema);
      return Object.freeze({
        valid: context.diagnostics.mismatches.length === 0
      });
    },
    request
  );
}

// ============================================================================
// FULL AUDIT — Gateway Wrapper
// ============================================================================
export async function runFullAudit(pulseSchema, firestoreDoc, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      context.logStep?.("Starting full audit...");

      const fsPulse = analyzeFirestoreDoc(context, firestoreDoc);
      validatePulseSchema(context, pulseSchema);
      detectDrift(context, pulseSchema, fsPulse);
      detectSlowdownPatterns(context, firestoreDoc);

      context.logStep?.("Full audit completed.");

      return Object.freeze({
        pulseFromFirestore: fsPulse,
        driftDetected: context.diagnostics.driftDetected,
        mismatches: context.diagnostics.mismatches,
        missingFields: context.diagnostics.missingFields,
        slowdownCauses: context.diagnostics.slowdownCauses
      });
    },
    request
  );
}

// ============================================================================
// NEW v10.4 — SYSTEM ANALYSIS SERVICES
// ============================================================================
export async function runAnalyzeRoutes(routeData, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesRoutes: true }),
    async (context) => {
      context.logStep?.("Analyzing routing decisions...");
      return Object.freeze({ routeData });
    },
    request
  );
}

export async function runAnalyzeLogs(logs, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesLogs: true }),
    async (context) => {
      context.logStep?.("Analyzing logs...");
      return Object.freeze({ logs });
    },
    request
  );
}

export async function runAnalyzeErrors(errors, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesErrors: true }),
    async (context) => {
      context.logStep?.("Analyzing errors...");
      return Object.freeze({ errors });
    },
    request
  );
}

// ============================================================================
// NEW v10.4 — ARCHITECTURE SERVICES
// ============================================================================
export async function runExplainOrgan(organMeta, request = {}) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      context.logStep?.("Explaining organ...");
      return Object.freeze({ organMeta });
    },
    request
  );
}

export async function runExplainPathway(pathway, request = {}) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      context.logStep?.("Explaining pathway...");
      return Object.freeze({ pathway });
    },
    request
  );
}

// ============================================================================
// NEW v10.4 — TOUR GUIDE SERVICES
// ============================================================================
export async function runTourGuideQuery(query, request = {}) {
  return callAI(
    "analyze",
    Object.freeze({ touchesTourism: true }),
    async (context) => {
      context.logStep?.("Running tour guide query...");
      return Object.freeze({ query });
    },
    request
  );
}
