/**
 * ============================================================================
 * ORGAN: PulseSpecsNetworkTranslator
 * VERSION: v20-IMMORTAL
 * LAYER: NETWORK (Proxy / Transport Intelligence Layer)
 * ROLE: Convert raw network events → deterministic NetworkSpec
 * ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
 * HIGH-LEVEL PURPOSE
 * ------------------
 * This organ is the "circulatory map" of the organism.
 *
 * It takes raw network events observed by your proxy (requests/responses,
 * timings, sizes, endpoints) and converts them into a structured, stable
 * NetworkSpec that describes:
 *
 *   - sessions
 *   - flows (e.g., "LLM turn", "page load", "asset burst")
 *   - routes (individual HTTP(S) calls)
 *
 * This lets your system:
 *   - correlate DOM state ↔ network behavior
 *   - understand when an LLM call happened
 *   - see how heavy a page or action is
 *   - build evolutionary memory of usage patterns
 *   - prewarm, route, and optimize intelligently
 *
 * DOWNSTREAM CONSUMERS
 * --------------------
 *   - Genome organ (PulseSpecsGenomeTranslator-v20)
 *   - Proxy decision organs (routing, prewarm, caching)
 *   - UI (session/flow visualizations, debugging, analytics)
 *   - Earn / billing / usage tracking
 *
 * IMMORTAL-TIER GUARANTEES
 * ------------------------
 * 1. Determinism:
 *    Same input events → same NetworkSpec.
 *
 * 2. Zero Hallucination:
 *    Only describes observed events.
 *    No invented calls, no guessed timings.
 *
 * 3. Minimal Interpretation:
 *    Light classification only (e.g., "llm-turn", "page-load").
 *    No semantic inference about content.
 *
 * 4. Schema Stability:
 *    NetworkSpec v20-IMMORTAL is a hard contract.
 *
 * 5. Safety:
 *    - No network calls
 *    - No mutation of events
 *    - No PII inference
 *
 * INPUT CONTRACT
 * --------------
 * buildNetworkSpec({
 *   events: Array<{
 *     id: string,
 *     method: string,
 *     url: string,
 *     host: string,
 *     path: string,
 *     startTime: number,      // ms since epoch or monotonic
 *     endTime: number,        // same clock as startTime
 *     requestBytes: number,
 *     responseBytes: number,
 *     statusCode?: number,
 *     tags?: string[]         // optional pre-tags from proxy
 *   }>,
 *   sessionId: string,
 *   timestamp: string (ISO 8601)
 * })
 *
 * OUTPUT CONTRACT
 * ---------------
 * NetworkSpec v20:
 *
 * {
 *   specVersion: "v20-network",
 *   sessionId: string,
 *   capturedAt: string,
 *   summary: {
 *     totalRequests: number,
 *     totalBytes: number,
 *     durationMs: number,
 *     llmCalls: number,
 *     apiCalls: number,
 *     assetCalls: number
 *   },
 *   flows: Array<{
 *     id: string,              // "flow-1", "flow-2", ...
 *     kind: "llm-turn" | "page-load" | "asset-burst" | "api-call" | "other",
 *     startedAt: number,
 *     endedAt: number,
 *     stats: {
 *       requestCount: number,
 *       totalBytes: number,
 *       durationMs: number
 *     },
 *     routes: Array<{
 *       id: string,            // "route-1-1", "route-1-2", ...
 *       method: string,
 *       url: string,
 *       host: string,
 *       path: string,
 *       tags: string[],
 *       timing: {
 *         start: number,
 *         end: number,
 *         durationMs: number
 *       },
 *       size: {
 *         requestBytes: number,
 *         responseBytes: number
 *       },
 *       statusCode: number | null
 *     }>
 *   }>
 * }
 *
 * VERSION LINEAGE (v19 → v20-IMMORTAL)
 * ------------------------------------
 * - Added explicit ORGAN_META and CONTRACT_META semantics.
 * - Introduced flows as first-class units (grouped events).
 * - Added summary block for quick high-level stats.
 * - Added explicit "kind" classification for flows.
 * - Enforced deterministic ordering and IDs.
 * - Marked as IMMORTAL-tier: schema is now a hard contract.
 */

// ============================================================================
// PUBLIC ENTRYPOINT
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

/**
 * Build a NetworkSpec from raw network events.
 *
 * @param {Object} params
 * @param {Array<Object>} params.events - Raw network events from proxy.
 * @param {string} params.sessionId - Logical session identifier.
 * @param {string} params.timestamp - ISO 8601 capture time.
 * @returns {Object} NetworkSpec v20-IMMORTAL.
 */
export function buildNetworkSpec({ events, sessionId, timestamp }) {
  const normalized = normalizeEvents(events);
  const summary = summarizeNetwork(normalized);
  const flows = groupIntoFlows(normalized);

  return {
    specVersion: "v20-network",
    sessionId,
    capturedAt: timestamp,
    summary,
    flows: flows.map((flow, i) => ({
      id: `flow-${i + 1}`,
      kind: flow.kind,
      startedAt: flow.startedAt,
      endedAt: flow.endedAt,
      stats: {
        requestCount: flow.requests.length,
        totalBytes: flow.totalBytes,
        durationMs: flow.durationMs,
      },
      routes: flow.requests.map((r, j) => ({
        id: `route-${i + 1}-${j + 1}`,
        method: r.method,
        url: r.url,
        host: r.host,
        path: r.path,
        tags: classifyRoute(r),
        timing: {
          start: r.startTime,
          end: r.endTime,
          durationMs: Math.max(0, r.endTime - r.startTime),
        },
        size: {
          requestBytes: r.requestBytes,
          responseBytes: r.responseBytes,
        },
        statusCode: typeof r.statusCode === "number" ? r.statusCode : null,
      })),
    })),
  };
}

// ============================================================================
// INTERNAL HELPERS: NORMALIZATION
// ============================================================================

/**
 * Normalize events to a consistent internal shape.
 *
 * @param {Array<Object>} events
 * @returns {Array<Object>}
 */
function normalizeEvents(events) {
  if (!Array.isArray(events)) return [];

  return events
    .filter(Boolean)
    .map((e) => ({
      id: String(e.id ?? ""),
      method: String(e.method ?? "GET").toUpperCase(),
      url: String(e.url ?? ""),
      host: String(e.host ?? extractHost(e.url) ?? ""),
      path: String(e.path ?? extractPath(e.url) ?? "/"),
      startTime: Number(e.startTime ?? 0),
      endTime: Number(e.endTime ?? e.startTime ?? 0),
      requestBytes: Number(e.requestBytes ?? 0),
      responseBytes: Number(e.responseBytes ?? 0),
      statusCode: typeof e.statusCode === "number" ? e.statusCode : null,
      tags: Array.isArray(e.tags) ? e.tags.slice() : [],
    }))
    .sort((a, b) => a.startTime - b.startTime);
}

/**
 * Extract host from URL.
 *
 * @param {string} url
 * @returns {string|null}
 */
function extractHost(url) {
  try {
    const u = new URL(url);
    return u.host || null;
  } catch {
    return null;
  }
}

/**
 * Extract path from URL.
 *
 * @param {string} url
 * @returns {string|null}
 */
function extractPath(url) {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return null;
  }
}

// ============================================================================
// INTERNAL HELPERS: SUMMARY
// ============================================================================

/**
 * Build a high-level summary of the network activity.
 *
 * @param {Array<Object>} events
 * @returns {Object}
 */
function summarizeNetwork(events) {
  if (events.length === 0) {
    return {
      totalRequests: 0,
      totalBytes: 0,
      durationMs: 0,
      llmCalls: 0,
      apiCalls: 0,
      assetCalls: 0,
    };
  }

  const firstStart = events[0].startTime;
  const lastEnd = events.reduce(
    (max, e) => (e.endTime > max ? e.endTime : max),
    events[0].endTime
  );

  let totalBytes = 0;
  let llmCalls = 0;
  let apiCalls = 0;
  let assetCalls = 0;

  for (const e of events) {
    totalBytes += (e.requestBytes || 0) + (e.responseBytes || 0);

    const tags = classifyRoute(e);
    if (tags.includes("llm")) llmCalls++;
    else if (tags.includes("api")) apiCalls++;
    else if (tags.includes("asset")) assetCalls++;
  }

  return {
    totalRequests: events.length,
    totalBytes,
    durationMs: Math.max(0, lastEnd - firstStart),
    llmCalls,
    apiCalls,
    assetCalls,
  };
}

// ============================================================================
// INTERNAL HELPERS: FLOW GROUPING
// ============================================================================

/**
 * Group events into flows.
 *
 * A "flow" is a cluster of related requests in time, such as:
 *   - a single LLM turn
 *   - a page load
 *   - an asset burst
 *   - a small API interaction
 *
 * This implementation uses simple temporal clustering:
 *   - events close in time are grouped together
 *   - then each group is classified by dominant route type
 *
 * @param {Array<Object>} events
 * @returns {Array<{ kind: string, startedAt: number, endedAt: number, durationMs: number, totalBytes: number, requests: Array<Object> }>}
 */
function groupIntoFlows(events) {
  if (events.length === 0) return [];

  const FLOWS = [];
  const MAX_GAP_MS = 1500; // if gap between events > this, start new flow

  let currentFlow = {
    requests: [],
    startedAt: events[0].startTime,
    endedAt: events[0].endTime,
  };

  for (let i = 0; i < events.length; i++) {
    const e = events[i];

    if (currentFlow.requests.length === 0) {
      currentFlow.requests.push(e);
      currentFlow.startedAt = e.startTime;
      currentFlow.endedAt = e.endTime;
      continue;
    }

    const prev = currentFlow.requests[currentFlow.requests.length - 1];
    const gap = e.startTime - prev.endTime;

    if (gap > MAX_GAP_MS) {
      // finalize current flow
      finalizeFlow(currentFlow, FLOWS);
      // start new flow
      currentFlow = {
        requests: [e],
        startedAt: e.startTime,
        endedAt: e.endTime,
      };
    } else {
      currentFlow.requests.push(e);
      if (e.endTime > currentFlow.endedAt) {
        currentFlow.endedAt = e.endTime;
      }
    }
  }

  // finalize last flow
  if (currentFlow.requests.length > 0) {
    finalizeFlow(currentFlow, FLOWS);
  }

  return FLOWS;
}

/**
 * Finalize a flow: compute stats and classify kind.
 *
 * @param {{ requests: Array<Object>, startedAt: number, endedAt: number }} flow
 * @param {Array<Object>} out
 */
function finalizeFlow(flow, out) {
  const totalBytes = flow.requests.reduce(
    (sum, r) => sum + (r.requestBytes || 0) + (r.responseBytes || 0),
    0
  );
  const durationMs = Math.max(0, flow.endedAt - flow.startedAt);
  const kind = classifyFlow(flow.requests);

  out.push({
    kind,
    startedAt: flow.startedAt,
    endedAt: flow.endedAt,
    durationMs,
    totalBytes,
    requests: flow.requests,
  });
}

/**
 * Classify a flow based on its routes.
 *
 * @param {Array<Object>} requests
 * @returns {string}
 */
function classifyFlow(requests) {
  let llmCount = 0;
  let assetCount = 0;
  let apiCount = 0;

  for (const r of requests) {
    const tags = classifyRoute(r);
    if (tags.includes("llm")) llmCount++;
    else if (tags.includes("asset")) assetCount++;
    else if (tags.includes("api")) apiCount++;
  }

  if (llmCount > 0) return "llm-turn";
  if (assetCount > 0 && requests.length > 3) return "page-load";
  if (apiCount > 0) return "api-call";
  if (assetCount > 0) return "asset-burst";
  return "other";
}

// ============================================================================
// INTERNAL HELPERS: ROUTE CLASSIFICATION
// ============================================================================

/**
 * Classify a single route into tags.
 *
 * Tags are additive and conservative:
 *   - "llm"    → known LLM endpoints (OpenAI, Anthropic, etc.)
 *   - "api"    → JSON APIs, non-asset endpoints
 *   - "asset"  → images, fonts, CSS, JS, media
 *   - "auth"   → login, token, auth endpoints
 *   - "telemetry" → analytics, tracking
 *
 * @param {Object} route
 * @returns {string[]}
 */
function classifyRoute(route) {
  const tags = new Set(route.tags || []);

  const url = route.url || "";
  const path = route.path || "";
  const host = route.host || "";

  // LLM endpoints (extend as needed)
  if (
    /openai\.com/i.test(host) ||
    /anthropic\.com/i.test(host) ||
    /api\/v1\/chat\/completions/i.test(path) ||
    /\/v1\/messages/i.test(path)
  ) {
    tags.add("llm");
    tags.add("api");
  }

  // Asset detection by extension
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(path)) {
    tags.add("asset");
  }
  if (/\.(css)$/i.test(path)) {
    tags.add("asset");
  }
  if (/\.(js|mjs|cjs)$/i.test(path)) {
    tags.add("asset");
  }
  if (/\.(woff|woff2|ttf|otf|eot)$/i.test(path)) {
    tags.add("asset");
  }
  if (/\.(mp4|webm|mp3|wav|ogg)$/i.test(path)) {
    tags.add("asset");
  }

  // Auth-ish
  if (/login|signin|oauth|token|auth/i.test(url)) {
    tags.add("auth");
  }

  // Telemetry-ish
  if (/analytics|telemetry|metrics|track/i.test(url)) {
    tags.add("telemetry");
  }

  // Generic API (JSON-ish, non-asset)
  if (!tags.has("asset") && /\/api\//i.test(path)) {
    tags.add("api");
  }

  return Array.from(tags);
}
