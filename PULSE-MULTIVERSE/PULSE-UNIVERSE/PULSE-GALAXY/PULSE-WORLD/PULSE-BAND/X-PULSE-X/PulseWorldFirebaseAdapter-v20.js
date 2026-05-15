
// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/PulseWorldFirebaseAdapter-v20-IMMORTAL.js
// ROLE: WORLD_LOGGING_ADAPTER — deterministic, IMMORTAL-safe logging into Firestore
// LAYER: PULSE-WORLD / PULSE-X / WORLD_DATA_GENOME
// NOTES:
//   - Uses PulseWorldFirebaseGenome-v20 for admin/db/systemCollection
//   - Pure backend organ: no UI, no random, no network beyond Firestore
//   - One canonical entrypoint: logToFirebase(envelope)
// ============================================================================



import {
  admin,
  db,
  systemCollection
} from "./PulseWorldFirebaseGenome-v20.js";

// ---------------------------------------------------------------------------
// INTERNAL: IntellHash (dual hash, bounded, deterministic)
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1000003;
  }
  return `a${h}`;
}

function computeDualHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const combined = computeHash(primary + "::" + secondary);
  return { primary, secondary, combined };
}

// ---------------------------------------------------------------------------
 // INTERNAL: level normalization + envelope shaping
// ---------------------------------------------------------------------------
const LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];

function normalizeLevel(level) {
  const v = String(level || "info").toLowerCase().trim();
  if (LEVELS.includes(v)) return v;
  if (v === "warning") return "warn";
  return "info";
}
export function nowMillis(admin) {
  return admin.firestore.Timestamp.now().toMillis();
}

function buildLogEnvelope(input = {}) {
  const level = normalizeLevel(input.level);
  const message = String(input.message || "").slice(0, 4096);

  const world = input.world || "pulse-world";
  const region = input.region || input.regionCode || "global";
  const tenantId = input.tenantId || null;
  const userId = input.userId || null;
  const requestId = input.requestId || input.reqId || null;
  const route = input.route || null;
  const host = input.host || null;
  const channel = input.channel || "world";
  const source = input.source || "PulseWorldFirebaseAdapter-v20";

  const meta = input.meta && typeof input.meta === "object" ? input.meta : {};
  const tags = Array.isArray(input.tags) ? input.tags.map(String) : [];

  const env = process.env.NODE_ENV || "unknown";
  const projectId = process.env.FIREBASE_PROJECT_ID || null;

  const base = {
    level,
    message,
    channel,
    source,
    tags,
    worldContext: {
      world,
      region,
      tenantId,
      userId,
      requestId,
      route,
      host
    },
    runtimeContext: {
      nodeEnv: env,
      projectId,
      adapterVersion: PulseWorldFirebaseAdapterMeta.version
    },
    meta,
    timestamps: {
      clientAt: input.clientAt || null,
      receivedAt: nowMillis()
    }
  };

  const intellPayload = {
    level,
    message,
    world,
    region,
    tenantId,
    userId,
    requestId,
    route,
    host,
    tags,
    nodeEnv: env,
    projectId
  };

  const intellHash = computeDualHash(JSON.stringify(intellPayload));

  return {
    ...base,
    intellHash,
    immortalMeta: {
      presenceBandState: input.presenceBandState || null,
      harmonicDrift: input.harmonicDrift || null,
      coherenceScore: input.coherenceScore || null,
      dualBandMode: input.dualBandMode || "symbolic",
      shifterBand: input.shifterBand || "logging"
    }
  };
}

// ---------------------------------------------------------------------------
// PUBLIC: logToFirebase (core IMMORTAL logger)
// ---------------------------------------------------------------------------
export async function logToFirebase(level, message, meta = {}) {
  if (!db || !admin) {
    warn?.("[PulseWorldFirebaseAdapter] admin/db not available; skipping log");
    return { ok: false, skipped: true, reason: "no_db" };
  }

  try {
    const envelope = buildLogEnvelope({
      level,
      message,
      ...meta
    });

    const col = systemCollection
      ? systemCollection("Logs")
      : db.collection("__SYSTEM__/Logs/v1");

    const doc = {
      ...envelope,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const ref = await col.add(doc);

    return {
      ok: true,
      id: ref.id,
      level: envelope.level,
      intellHash: envelope.intellHash
    };
  } catch (err) {
    error?.("[PulseWorldFirebaseAdapter] logToFirebase error:", err);
    return { ok: false, error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// PUBLIC: structured helpers
// ---------------------------------------------------------------------------
export async function logInfo(message, meta = {}) {
  return logToFirebase("info", message, meta);
}

export async function logWarn(message, meta = {}) {
  return logToFirebase("warn", message, meta);
}

export async function logError(message, meta = {}) {
  return logToFirebase("error", message, meta);
}

export async function logFatal(message, meta = {}) {
  return logToFirebase("fatal", message, meta);
}

// ---------------------------------------------------------------------------
// LEGACY-LIKE LAMBDA HANDLER (for event-based runtimes)
// ---------------------------------------------------------------------------
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const { level, message, meta, ...rest } = body || {};
    const result = await logToFirebase(level, message, {
      ...(meta || {}),
      ...rest
    });

    return {
      statusCode: result.ok ? 200 : 500,
      body: JSON.stringify({ ok: result.ok, id: result.id || null })
    };
  } catch (err) {
    console.error("[PulseWorldFirebaseAdapter] handler error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
}
