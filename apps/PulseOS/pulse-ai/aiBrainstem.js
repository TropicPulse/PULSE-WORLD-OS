// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiBrainstem.js
// LAYER: BRAINSTEM (Context + Organs + Personality)
// ============================================================================

import { Personas, OWNER_ID, getPersona } from "./persona.js";
import { createOrgans } from "./createOrgans.js";

function computeSyncVariance(request) {
  // Placeholder: later you can plug in real sync detection.
  // For now, always "perfect sync".
  return 0.0;
}

function computePersonalityFlags({ userId, personaId, syncVariance }) {
  const userIsOwner = userId === OWNER_ID;

  const sillyAllowedForOwner =
    userIsOwner &&
    personaId === Personas.TOURGUIDE &&
    syncVariance <= 0.10;

  return {
    userIsOwner,
    syncVariance,
    sillyMode: sillyAllowedForOwner,
    seriousMode: !sillyAllowedForOwner
  };
}

export function createBrainstem(request, db, fsAPI, routeAPI, schemaAPI) {
  const { userId, personaId: requestedPersonaId } = request;

  const syncVariance = computeSyncVariance(request);
  const persona = getPersona(requestedPersonaId, userId);

  const baseContext = {
    userId: userId || null,
    userIsOwner: userId === OWNER_ID,
    personaId: persona.id,
    persona,
    syncVariance,
    logStep: (msg) => {
      // Plug into your logging system.
      // console.log("[AI]", msg);
    }
  };

  const personality = computePersonalityFlags({
    userId: baseContext.userId,
    personaId: baseContext.personaId,
    syncVariance
  });

  const context = {
    ...baseContext,
    personality
  };

  const organs = createOrgans(context, db, fsAPI, routeAPI, schemaAPI);

  return {
    context,
    organs
  };
}
