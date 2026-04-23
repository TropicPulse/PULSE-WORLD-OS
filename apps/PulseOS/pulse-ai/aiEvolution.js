// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiEvolution.js
// LAYER: EVOLUTION ORGAN (Organism Awareness + Drift + Growth Detection)
// ============================================================================
//
// ROLE:
//   • Detect unused imports, dead code, orphaned routes, unused components.
//   • Detect schema drift, organ drift, page drift, PulseEarn drift.
//   • Detect evolutionary patterns (“new limb”, “overgrowth”, “starvation”).
//   • Provide owner‑only deep organism insight.
//   • Integrates with Architect + Earn + Power + Environment organs.
//   • Never mutate anything.
//
// CONTRACT:
//   • READ‑ONLY.
//   • ZERO MUTATION.
//   • ZERO RANDOMNESS.
//   • DETERMINISTIC ANALYSIS ONLY.
// ============================================================================

import { Personas } from "./persona.js";

export function createEvolutionAPI(fsAPI, routeAPI, schemaAPI) {

  // --------------------------------------------------------------------------
  // ACCESS CONTROL
  // --------------------------------------------------------------------------
  function assertOwnerArchitect(context) {
    if (!context.userIsOwner || context.personaId !== Personas.ARCHITECT) {
      context.logStep("aiEvolution: access denied (not owner+architect).");
      return false;
    }
    return true;
  }

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  function stripIdentityAnchors(record) {
    if (!record || typeof record !== "object") return record;
    const clone = { ...record };
    delete clone.uid;
    delete clone.userId;
    delete clone.resendToken;
    delete clone.identityRoot;
    delete clone.sessionRoot;
    delete clone.deviceFingerprint;
    return clone;
  }

  function detectUnusedImports(file) {
    const unused = [];
    for (const imp of file.imports) {
      if (!file.references.includes(imp.name)) {
        unused.push(imp);
      }
    }
    return unused;
  }

  function detectOrphanedRoutes(routeMap) {
    return routeMap.filter(r => !r.inbound && !r.outbound);
  }

  function detectDeadComponents(files) {
    return files.filter(f => f.type === "component" && f.references.length === 0);
  }

  function detectSchemaDrift(schemas) {
    const drift = [];
    for (const s of schemas) {
      if (s.expectedFields && s.actualFields) {
        for (const key of Object.keys(s.expectedFields)) {
          if (!s.actualFields[key]) {
            drift.push({
              schema: s.name,
              field: key,
              issue: "missing"
            });
          }
        }
      }
    }
    return drift;
  }

  function detectOrganDrift(files) {
    return files
      .filter(f => f.type === "organ")
      .map(f => ({
        organ: f.name,
        missingExports: f.expectedExports?.filter(e => !f.exports.includes(e)) || [],
        unusedExports: f.exports?.filter(e => !f.references.includes(e)) || []
      }))
      .filter(o => o.missingExports.length > 0 || o.unusedExports.length > 0);
  }

  function detectPulseEarnDrift(files) {
    const earn = files.find(f => f.name === "PulseEarn.js");
    if (!earn) return null;

    return {
      missingExports: earn.expectedExports?.filter(e => !earn.exports.includes(e)) || [],
      unusedImports: detectUnusedImports(earn),
      unusedExports: earn.exports?.filter(e => !earn.references.includes(e)) || [],
      deadPaths: earn.deadPaths || []
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — Evolutionary Insight
  // --------------------------------------------------------------------------
  return {

    // ----------------------------------------------------------------------
    // FULL ORGANISM OVERVIEW
    // ----------------------------------------------------------------------
    async getOrganismOverview(context) {
      if (!assertOwnerArchitect(context)) return null;

      const [files, routes, schemas] = await Promise.all([
        fsAPI.getAllFiles(),
        routeAPI.getRouteMap(),
        schemaAPI.getAllSchemas()
      ]);

      const unusedImports   = files.flatMap(f => detectUnusedImports(f));
      const orphanedRoutes  = detectOrphanedRoutes(routes);
      const deadComponents  = detectDeadComponents(files);
      const schemaDrift     = detectSchemaDrift(schemas);
      const organDrift      = detectOrganDrift(files);
      const pulseEarnDrift  = detectPulseEarnDrift(files);

      return {
        unusedImports: unusedImports.map(stripIdentityAnchors),
        orphanedRoutes: orphanedRoutes.map(stripIdentityAnchors),
        deadComponents: deadComponents.map(stripIdentityAnchors),
        schemaDrift: schemaDrift.map(stripIdentityAnchors),
        organDrift: organDrift.map(stripIdentityAnchors),
        pulseEarnDrift: pulseEarnDrift
      };
    },

    // ----------------------------------------------------------------------
    // FILE‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeFile(context, filePath) {
      if (!assertOwnerArchitect(context)) return null;

      const file = await fsAPI.getFile(filePath);
      if (!file) return null;

      return {
        unusedImports: detectUnusedImports(file),
        references: file.references,
        exports: file.exports,
        deadPaths: file.deadPaths || []
      };
    },

    // ----------------------------------------------------------------------
    // ROUTE‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeRoute(context, routeId) {
      if (!assertOwnerArchitect(context)) return null;

      const route = await routeAPI.getRoute(routeId);
      if (!route) return null;

      return {
        inbound: route.inbound,
        outbound: route.outbound,
        orphaned: !route.inbound && !route.outbound
      };
    },

    // ----------------------------------------------------------------------
    // SCHEMA‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeSchema(context, schemaName) {
      if (!assertOwnerArchitect(context)) return null;

      const schema = await schemaAPI.getSchema(schemaName);
      if (!schema) return null;

      const drift = detectSchemaDrift([schema]);

      return {
        schema: stripIdentityAnchors(schema),
        drift
      };
    }
  };
}
