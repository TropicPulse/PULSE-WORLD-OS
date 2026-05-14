// ============================================================================
//  FILE: /PULSE-PROXY/PulseProxyInnerAgent-v20-Immortal-Bridge.js
//  PULSE OS v20‑IMMORTAL‑BRIDGE — PROXY INNER AGENT (DUAL‑BAND + PRESENCE + 20++)
//  “INNER AGENT / ORGANISM BRIDGE”
//  CNS ↔ Router ↔ /PULSE-PROXY/endpoint ↔ InnerAgent ↔ Brain / LTM / Pages
//  PURE BACKEND ORGAN — NO INTERNET FETCH, NO MARKETPLACE, NO BUSINESS LOGIC.
//  INTERNET IS ALWAYS BEAMED VIA EXPANSION / OUTER AGENT, NEVER FROM HERE.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { corsHandler, pulseCors } from "../PULSE-X/PulseWorldTransport-v20.js";


// ============================================================================
//  INTERNAL SURFACE HELPERS (A‑B‑A)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

function buildBand(modeKind) {
  if (modeKind === "binary") return "binary";
  if (modeKind === "dual") return "dual";
  return "symbolic";
}

function buildBandSignature(band) {
  return computeHash(`INNER_AGENT_BAND::${band}`);
}

function buildBinaryField(modeKind) {
  const depth = modeKind === "binary" ? 4 : modeKind === "dual" ? 2 : 1;
  const density = depth * 7;
  const surface = density + depth;
  return {
    binaryPhenotypeSignature: `inner-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `inner-binary-surface-${(surface * 13) % 99991}`,
    binarySurface: { depth, density, surface },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(type) {
  const t = String(type || "");
  const amplitude = 12 + (t.length % 6);
  const wavelength = amplitude + 5;
  const phase = amplitude % 16;
  return {
    amplitude,
    wavelength,
    phase,
    band: "inner-agent",
    mode: "symbolic-wave",
    waveSignature: computeHash(`INNER_WAVE::${t}::${amplitude}`)
  };
}

function buildPresenceField(type, target, outerPresence, proxyPresence) {
  const key = `${type || "?"}::${target || "?"}`;
  const baseSignature = computeHash(`INNER_PRESENCE::${key}`);
  const outerSig = outerPresence?.presenceSignature || null;
  const proxySig = proxyPresence?.presenceSignature || null;

  const focus =
    type?.includes("focus") || target === "Pages"
      ? "focused"
      : "neutral";

  return {
    focus,
    presenceSignature: baseSignature,
    outerPresenceSignature: outerSig,
    proxyPresenceSignature: proxySig
  };
}

// v20 — speed / advantage / experience / prewarm / policy / presenceView / chunks

function buildSpeedField({ outerSpeed, proxySpeed, route }) {
  const o = outerSpeed?.speedScore ?? 0;
  const p = proxySpeed?.speedScore ?? 0;
  const base = (o + p) / (o || p ? 2 : 1 || 1);
  let routeWeight = 0.5;
  if (route === "brain" || route === "brain-default") routeWeight = 0.7;
  if (route === "ltm") routeWeight = 0.6;
  if (route === "pages") routeWeight = 0.8;

  const speedScore = Math.min(1, base * routeWeight);
  let speedBand = "steady";
  if (speedScore < 0.25) speedBand = "slow";
  else if (speedScore < 0.6) speedBand = "steady";
  else speedBand = "quickened";

  return {
    outerSpeedScore: o,
    proxySpeedScore: p,
    route,
    speedScore,
    speedBand,
    speedSignature: computeHash(
      `INNER_SPEED::${route}::${o}::${p}::${speedScore}::${speedBand}`
    )
  };
}

function buildAdvantageField({ outerAdvantage, proxyAdvantage, route }) {
  const oa = outerAdvantage?.advantageScore ?? 0;
  const pa = proxyAdvantage?.advantageScore ?? 0;
  const combined = (oa + pa) / (oa || pa ? 2 : 1 || 1);

  let routeBias = 0.5;
  if (route === "brain" || route === "brain-default") routeBias = 0.7;
  if (route === "ltm") routeBias = 0.8;
  if (route === "pages") routeBias = 0.6;

  const advantageScore = Math.min(1, combined * routeBias);

  return {
    outerAdvantageScore: oa,
    proxyAdvantageScore: pa,
    route,
    advantageScore,
    advantageSignature: computeHash(
      `INNER_ADVANTAGE::${route}::${oa}::${pa}::${advantageScore}`
    )
  };
}

function buildExperienceField({ route, band, speedBand, loadHint }) {
  const r = route || "unknown";
  const b = band || "symbolic";
  const s = speedBand || "steady";
  const load = loadHint || "normal";

  return {
    route: r,
    band: b,
    speedBand: s,
    load,
    experienceSignature: computeHash(
      `INNER_EXPERIENCE::${r}::${b}::${s}::${load}`
    )
  };
}

function buildPrewarmHints({ route, band, speedBand }) {
  const hints = [];

  if (route === "pages") {
    hints.push("prewarm_page_cache");
    hints.push("prewarm_chunk_cache");
  }
  if (route === "brain" || route === "brain-default") {
    hints.push("prewarm_brain_routes");
  }
  if (route === "ltm") {
    hints.push("prewarm_ltm_index");
  }

  if (speedBand === "quickened") {
    hints.push("prioritize_low_latency_paths");
  }

  if (band === "binary") {
    hints.push("prewarm_binary_field");
  } else if (band === "dual") {
    hints.push("prewarm_dual_band_overlay");
  } else {
    hints.push("prewarm_symbolic_surface");
  }

  return {
    route,
    band,
    speedBand,
    hints,
    prewarmSignature: computeHash(
      `INNER_PREWARM::${route}::${band}::${speedBand}::${hints.join("|")}`
    )
  };
}

function buildSpeedPolicy({ route, band, speedField, advantageField, experienceField }) {
  // Simple deterministic policy surface — no external governor
  const policyKey = [
    route,
    band,
    speedField.speedBand,
    experienceField.load
  ].join("::");

  const priority =
    route === "pages"
      ? "ui-first"
      : route === "ltm"
      ? "memory-first"
      : "brain-first";

  const stabilityHint =
    advantageField.advantageScore > 0.7 ? "stable" : "adaptive";

  return {
    route,
    band,
    priority,
    speedBand: speedField.speedBand,
    load: experienceField.load,
    stability: stabilityHint,
    policySignature: computeHash(`INNER_POLICY::${policyKey}::${priority}::${stabilityHint}`)
  };
}

function buildPresenceViewFromHistory(history) {
  const byRoute = {};
  const byBand = {};
  const byTarget = {};
  const byLoad = {};

  for (const h of history) {
    const route = h.route || "unknown";
    const band = h.band || "symbolic";
    const target = h.target || "unknown";
    const load = h.load || "normal";

    byRoute[route] = (byRoute[route] || 0) + 1;
    byBand[band] = (byBand[band] || 0) + 1;
    byTarget[target] = (byTarget[target] || 0) + 1;
    byLoad[load] = (byLoad[load] || 0) + 1;
  }

  return {
    totalDispatches: history.length,
    byRoute,
    byBand,
    byTarget,
    byLoad,
    presenceViewSignature: computeHash(
      `INNER_PRESENCE_VIEW::${history.length}::${Object.keys(byRoute).join("|")}`
    )
  };
}

function buildChunksFromHistory(history, { maxChunkSize = 64 } = {}) {
  const size = Math.max(1, maxChunkSize | 0);
  const totalChunks = Math.ceil(history.length / size);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const start = i * size;
    const end = start + size;
    const slice = history.slice(start, end);
    chunks.push({
      kind: "InnerAgentDispatchChunk",
      chunkIndex: i,
      chunkCount: totalChunks,
      dispatchCount: slice.length,
      dispatches: slice
    });
  }

  return {
    chunks,
    chunkCount: chunks.length,
    chunksSignature: computeHash(
      `INNER_CHUNKS::${history.length}::${chunks.length}`
    )
  };
}

// ============================================================================
//  FACTORY — dependencies injected by backend spine / endpoint
// ============================================================================
export function createPulseProxyInnerAgent({
  Brain,
  LongTermMemory,
  Pages,
  log = console.log,
  warn = console.warn
} = {}) {

  const InnerState = {
    lastType: null,
    lastTarget: null,
    lastRoute: null,
    lastModeKind: null,
    lastBand: null,
    lastSpeedField: null,
    lastAdvantageField: null,
    lastExperienceField: null,
    lastHealingState: null,
    cycle: 0,
    history: [] // bridge‑level dispatch history for presence/chunk overlays
  };

  function safeLog(stage, details = {}) {
    try { log("[InnerAgent-v20]", stage, JSON.stringify(details)); }
    catch {}
  }

  function resolveTarget(type) {
    if (!type || typeof type !== "string")
      return { target: null, route: "unknown" };

    if (type.startsWith("brain:") || type === "PING_BRAIN")
      return { target: "Brain", route: "brain" };

    if (type.startsWith("ltm:") || type === "LONG_TERM_MEMORY")
      return { target: "LongTermMemory", route: "ltm" };

    if (type.startsWith("page:") || type === "PAGE_REQUEST")
      return { target: "Pages", route: "pages" };

    if (
      type === "FETCH_EXTERNAL_RESOURCE" ||
      type === "fetchExternalResource" ||
      type === "EXTERNAL_RESOURCE" ||
      type === "externalResource"
    ) {
      // still routed via PulseProxy/OuterAgent above this layer, not here
      return { target: "Brain", route: "brain-external-proxy" };
    }

    return { target: "Brain", route: "brain-default" };
  }

  async function dispatchToTarget(target, type, payload, binaryPayload, context) {
    const args = [type, payload || {}, binaryPayload || null, context || {}];

    if (target === "Brain") {
      if (!Brain?.handle) return { error: "BrainUnavailable", type, target };
      return await Brain.handle(...args);
    }

    if (target === "LongTermMemory") {
      if (!LongTermMemory?.handle) return { error: "LongTermMemoryUnavailable", type, target };
      return await LongTermMemory.handle(...args);
    }

    if (target === "Pages") {
      if (!Pages?.handle) return { error: "PagesUnavailable", type, target };
      return await Pages.handle(...args);
    }

    return { error: "UnknownTarget", type, target };
  }

  // ========================================================================
  //  PUBLIC ENTRY — ORGANISM-CORRECT BACKEND ENDPOINT BRIDGE
  // ========================================================================
  async function handle({
    type,
    payload,
    binaryPayload,
    context,
    modeKind,
    outerAgentContext,
    proxySpineContext
  } = {}) {

    // CORS at the boundary (unchanged behavior)
    if (context?.req && context?.res) {
      pulseCors(context.req, context.res, () => {});
    }

    const { target, route } = resolveTarget(type);
    const mk = modeKind || (binaryPayload ? "dual" : "symbolic");

    InnerState.cycle += 1;
    InnerState.lastType = type;
    InnerState.lastTarget = target;
    InnerState.lastRoute = route;
    InnerState.lastModeKind = mk;

    const band = buildBand(mk);
    const bandSignature = buildBandSignature(band);
    const binaryField = buildBinaryField(mk);
    const waveField = buildWaveField(type);

    const outerPresence = outerAgentContext?.presenceField || null;
    const proxyPresence = proxySpineContext?.presenceField || null;

    const presenceField = buildPresenceField(
      type,
      target,
      outerPresence,
      proxyPresence
    );

    const outerSpeed = outerAgentContext?.speedField || null;
    const proxySpeed = proxySpineContext?.speedField || null;
    const speedField = buildSpeedField({ outerSpeed, proxySpeed, route });

    const outerAdvantage = outerAgentContext?.advantageField || null;
    const proxyAdvantage = proxySpineContext?.advantageField || null;
    const advantageField = buildAdvantageField({
      outerAdvantage,
      proxyAdvantage,
      route
    });

    const loadHint =
      context?.loadHint ||
      (route === "pages" ? "ui" : route === "ltm" ? "memory" : "normal");

    const experienceField = buildExperienceField({
      route,
      band,
      speedBand: speedField.speedBand,
      loadHint
    });

    const prewarmHints = buildPrewarmHints({
      route,
      band,
      speedBand: speedField.speedBand
    });

    const speedPolicy = buildSpeedPolicy({
      route,
      band,
      speedField,
      advantageField,
      experienceField
    });

    const healingState = {
      cycle: InnerState.cycle,
      lastType: type,
      lastTarget: target,
      lastRoute: route,
      lastBand: band,
      lastSpeedScore: speedField.speedScore,
      lastAdvantageScore: advantageField.advantageScore,
      lastLoad: experienceField.load,
      speedPolicy
    };

    InnerState.lastBand = band;
    InnerState.lastSpeedField = speedField;
    InnerState.lastAdvantageField = advantageField;
    InnerState.lastExperienceField = experienceField;
    InnerState.lastHealingState = healingState;

    // record into bridge history for presence/chunk overlays
    InnerState.history.push({
      cycle: InnerState.cycle,
      type,
      target,
      route,
      band,
      speedScore: speedField.speedScore,
      advantageScore: advantageField.advantageScore,
      load: experienceField.load
    });

    const presenceView = buildPresenceViewFromHistory(InnerState.history);
    const chunks = buildChunksFromHistory(InnerState.history, { maxChunkSize: 64 });

    safeLog("DISPATCH_START", {
      type,
      target,
      route,
      modeKind: mk,
      band,
      speedScore: speedField.speedScore,
      advantageScore: advantageField.advantageScore,
      load: experienceField.load
    });

    try {
      const res = await dispatchToTarget(
        target,
        type,
        payload,
        binaryPayload,
        {
          ...context,
          innerAgentBand: band,
          innerAgentSpeedField: speedField,
          innerAgentAdvantageField: advantageField,
          innerAgentExperienceField: experienceField,
          innerAgentPrewarmHints: prewarmHints,
          innerAgentSpeedPolicy: speedPolicy
        }
      );

      safeLog("DISPATCH_OK", {
        type,
        target,
        route,
        modeKind: mk
      });

      return {
        ok: !res?.error,
        target,
        route,
        type,
        modeKind: mk,
        band,
        bandSignature,
        binaryField,
        waveField,
        presenceField,
        speedField,
        advantageField,
        experienceField,
        prewarmHints,
        speedPolicy,
        presenceView,
        chunks,
        healingState,
        result: res
      };

    } catch (err) {
      const message = String(err?.message || err);
      warn("[InnerAgent-v20] DISPATCH_ERROR", message);

      const errorHealingState = {
        ...healingState,
        lastError: message
      };
      InnerState.lastHealingState = errorHealingState;

      const presenceViewError = buildPresenceViewFromHistory(InnerState.history);
      const chunksError = buildChunksFromHistory(InnerState.history, { maxChunkSize: 64 });

      return {
        ok: false,
        target,
        route,
        type,
        modeKind: mk,
        band,
        bandSignature,
        binaryField,
        waveField,
        presenceField,
        speedField,
        advantageField,
        experienceField,
        prewarmHints,
        speedPolicy,
        presenceView: presenceViewError,
        chunks: chunksError,
        healingState: errorHealingState,
        error: "InnerAgentDispatchError",
        message
      };
    }
  }

  safeLog("INIT", {
    identity: PulseRole.identity,
    version: PulseRole.version,
    upgradeFrom: "PulseProxyInnerAgent-v16.3-Immortal-Bridge"
  });

  return {
    PulseRole,
    InnerState,
    handle
  };
}
