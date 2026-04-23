// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiClinician.js
// LAYER: CLINICIAN ORGAN (Diagnostics + System Health + Trace Model)
// ============================================================================
//
// ROLE:
//   • Convert AI context into a structured diagnostic model.
//   • Feed the Admin Panel with safe, non‑identity system insights.
//   • Never expose UID, resendToken, or identity anchors.
//   • Never mutate anything.
//   • Pure read‑only diagnostics.
//
// CONTRACT:
//   • READ‑ONLY.
//   • ZERO MUTATION.
//   • ZERO RANDOMNESS.
//   • ZERO IDENTITY LEAKAGE.
// ============================================================================

export function buildAdminPanelModel(context) {
  if (!context) return {};

  // --------------------------------------------------------------------------
  // SAFE CONTEXT SNAPSHOT (identity‑safe)
  // --------------------------------------------------------------------------
  const safeContext = {
    personaId: context.personaId,
    persona: context.persona?.label || context.personaId,
    userIsOwner: context.userIsOwner || false,
    syncVariance: context.syncVariance || 0,
    sillyMode: context.personality?.sillyMode || false,
    seriousMode: context.personality?.seriousMode || false,
    permissions: context.permissions || null,
    boundaries: context.boundaries || null,
    steps: context.steps || [],
    flags: context.flags || []
  };

  // --------------------------------------------------------------------------
  // DIAGNOSTIC SUMMARY
  // --------------------------------------------------------------------------
  const summary = {
    mode: context.personaId,
    owner: context.userIsOwner ? "owner" : "user",
    sync: context.syncVariance <= 0.10 ? "aligned" : "misaligned",
    tone: context.personality?.sillyMode ? "playful" : "serious",
    permissionState: context.permissions ? "granted" : "restricted"
  };

  // --------------------------------------------------------------------------
  // TRACE MODEL (execution steps)
  // --------------------------------------------------------------------------
  const trace = Array.isArray(context.steps)
    ? context.steps.map((s) => ({ message: s }))
    : [];

  // --------------------------------------------------------------------------
  // FLAGS (slowdown, warnings, etc.)
  // --------------------------------------------------------------------------
  const flags = Array.isArray(context.flags)
    ? context.flags.map((f) => ({ type: f }))
    : [];

  // --------------------------------------------------------------------------
  // FINAL DIAGNOSTIC MODEL
  // --------------------------------------------------------------------------
  return {
    summary,
    safeContext,
    trace,
    flags
  };
}
