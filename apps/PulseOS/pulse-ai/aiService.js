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
// INTERNAL — Helper to wrap runAI with correct flags
// ============================================================================
function callAI(intent, flags, operation, request = {}) {
  return runAI(
    {
      ...request,
      intent,
      ...flags
    },
    operation
  );
}

// ============================================================================
// FIRESTORE ANALYSIS — Gateway Wrapper
// ============================================================================
export async function runAnalyzeFirestore(docData, request = {}) {
  return callAI(
    "analyze",
    { touchesSchemas: true },
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
    { touchesSchemas: true },
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
    { touchesSchemas: true },
    async (context) => {
      const drift = detectDrift(context, pulseSchema, firestoreSchema);
      return { drift };
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
    { touchesSchemas: true },
    async (context) => {
      validatePulseSchema(context, pulseSchema);
      return { valid: context.diagnostics.mismatches.length === 0 };
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
    { touchesSchemas: true },
    async (context) => {
      context.logStep("Starting full audit...");

      const fsPulse = analyzeFirestoreDoc(context, firestoreDoc);
      validatePulseSchema(context, pulseSchema);
      detectDrift(context, pulseSchema, fsPulse);
      detectSlowdownPatterns(context, firestoreDoc);

      context.logStep("Full audit completed.");

      return {
        pulseFromFirestore: fsPulse,
        driftDetected: context.diagnostics.driftDetected,
        mismatches: context.diagnostics.mismatches,
        missingFields: context.diagnostics.missingFields,
        slowdownCauses: context.diagnostics.slowdownCauses
      };
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
    { touchesRoutes: true },
    async (context) => {
      context.logStep("Analyzing routing decisions...");
      return { routeData };
    },
    request
  );
}

export async function runAnalyzeLogs(logs, request = {}) {
  return callAI(
    "analyze",
    { touchesLogs: true },
    async (context) => {
      context.logStep("Analyzing logs...");
      return { logs };
    },
    request
  );
}

export async function runAnalyzeErrors(errors, request = {}) {
  return callAI(
    "analyze",
    { touchesErrors: true },
    async (context) => {
      context.logStep("Analyzing errors...");
      return { errors };
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
    { touchesArchitecture: true },
    async (context) => {
      context.logStep("Explaining organ...");
      return { organMeta };
    },
    request
  );
}

export async function runExplainPathway(pathway, request = {}) {
  return callAI(
    "explain",
    { touchesArchitecture: true },
    async (context) => {
      context.logStep("Explaining pathway...");
      return { pathway };
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
    { touchesTourism: true },
    async (context) => {
      context.logStep("Running tour guide query...");
      return { query };
    },
    request
  );
}
