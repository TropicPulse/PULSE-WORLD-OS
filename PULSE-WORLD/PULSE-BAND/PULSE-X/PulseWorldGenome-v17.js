/* global log, warn, error */
// ============================================================================
//  PULSE-WORLD GENOME — UNIVERSAL HELPER CORTEX (v17 IMMORTAL)
//  FILE: PULSE-WORLD/PULSE-WORLD/PULSE-X/PulseWorldGenome.js
//
//  ROLE:
//    • World-layer helper cortex for all backend logic
//    • Provides core deterministic helpers (fetch, geo, country, parsing)
//    • Auto-loads + auto-caches additional helpers from long-term memory
//    • Never exposes Firebase directly (routes via world genome organs)
//    • Safe to import from ANY backend function
//
//  LAYERS:
//    • World layer (PULSE-WORLD)
//    • Above backend organs (PULSE-BAND, PULSE-X)
//    • Above storage/data organs (Firebase genome, etc.)
//
//  MEMORY MODE (C):
//    • If a helper is missing locally, attempt to load from:
//        - PULSE-WORLD/PULSE-CORE
//        - PULSE-WORLD/PULSE-MEMORY (if present)
//        - PULSE-WORLD/PULSE-BAND/PULSE-X (world engine helpers)
//    • Cache loaded helpers in-memory for this cold start
//    • Subsequent calls are instant
//
//  SAFETY:
//    • No raw external fetch — must route through world engine / proxy
//    • No direct Firebase exports
//    • Deterministic, drift-proof, zero-mutation
// ============================================================================

/*
GENOME_META = {
  identity: "PulseWorldGenome",
  version: "v17-IMMORTAL-GENOME",
  layer: "world_layer",
  role: "world_helper_cortex",
  lineage: "PulseOS-v14 → v16-IMMORTAL → v17-IMMORTAL",

  evo: {
    deterministic: true,
    driftProof: true,
    zeroMutation: true,
    worldLayerOrgan: true,
    founderAligned: true,
    presenceAware: true,
    dualBandAware: true,
    proxyAware: true,
    safeInit: true,
    singleInstance: true,
    coldStartSafe: true,
    autoLoadHelpers: true,
    autoCacheHelpers: true
  },

  placement: {
    requiredFolder: "PULSE-WORLD",
    naturalLanguageHook: [
      "world helpers",
      "world genome",
      "backend helpers",
      "helper cortex"
    ]
  }
}
*/

// ============================================================================
//  IMPORTS — WORLD-LAYER ORGANS (NO SENSITIVE CONFIG)
// ============================================================================
import { PulseWorldFirebaseGenome } from "./PulseWorldFirebaseGenome-v17.js";

// We do NOT export admin/db; we only use them internally when needed.
const { admin, db } = PulseWorldFirebaseGenome || { admin: null, db: null };

// ============================================================================
//  HELPER REGISTRY — AUTO-LOAD + AUTO-CACHE (MODE C)
// ============================================================================
const helperCache = new Map();

/**
 * Resolve a helper by name.
 * 1) Check local registry
 * 2) Check cached dynamic helpers
 * 3) Try long-term memory modules (CORE, MEMORY, X)
 */
export async function getHelper(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Helper name required");
  }

  const key = name.trim();

  // 1) Local registry
  if (localHelpers[key]) return localHelpers[key];

  // 2) Cached
  if (helperCache.has(key)) return helperCache.get(key);

  // 3) Long-term memory search
  const candidates = [
    "../../PULSE-CORE/Helpers.js",
    "../../PULSE-MEMORY/LongTermHelpers.js",
    "../../PULSE-BAND/PULSE-X/WorldHelpers.js"
  ];

  for (const path of candidates) {
    try {
      const mod = await import(path);
      if (mod && typeof mod[key] === "function") {
        helperCache.set(key, mod[key]);
        return mod[key];
      }
    } catch {
      // ignore and try next
    }
  }

  warn?.(`⚠️ [PulseWorldGenome] Helper not found in memory: ${key}`);
  throw new Error(`Helper not found: ${key}`);
}

// ============================================================================
//  WORLD ROUTING — NO RAW FETCH
// ============================================================================

/**
 * Route an external request through the world engine / proxy.
 * This must be wired by the runtime (CNS / InnerAgent / Proxy).
 */
async function routeThroughWorldEngine(task, payload) {
  // Prefer a global router if present (CNS / InnerAgent)
  const router =
    globalThis?.PulseWorldRouter ||
    globalThis?.route ||
    null;

  if (!router || typeof router !== "function") {
    throw new Error("World routing not available (PulseWorldRouter/route missing)");
  }

  return router(task, payload);
}

/**
 * safeFetchJson — routed JSON fetch with timeout + presence/dualband flags.
 */
export async function safeFetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const routed = await routeThroughWorldEngine("fetchExternalResource", {
      url,
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || null,
      binaryAware: true,
      dualBand: true,
      presenceAware: true,
      reflexOrigin: "PulseWorldGenome",
      layer: "B2",
      timeout: 15000
    });

    clearTimeout(timeout);

    if (!routed || routed.ok === false) {
      throw new Error(routed?.error || `Routed fetch failed for ${url}`);
    }

    return routed.data || routed.body || routed.result || null;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ============================================================================
//  GOOGLE HELPERS (PLACES + GEOCODING) — ROUTED
// ============================================================================
export async function searchPlacesText(query, apiKey) {
  const url = "https://places.googleapis.com/v1/places:searchText";

  const body = {
    textQuery: query,
    languageCode: "en"
  };

  const res = await safeFetchJson(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey
    },
    body: JSON.stringify(body)
  });

  return res?.places || [];
}

export async function geocodeAddress(address, apiKey) {
  const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const data = await safeFetchJson(url);
  if (!data?.results || data.results.length === 0) return null;
  return data.results[0];
}

// ============================================================================
//  FUZZY GEOCODER (Belize-biased) — LEANED BUT FUNCTIONALLY EQUIVALENT
// ============================================================================
export async function fuzzyGeocode(venue, apiKey, knownLat = null, knownLng = null) {
  const cleaned = venue.trim();

  const attempts = [
    `${cleaned} San Pedro Belize`,
    `${cleaned} Ambergris Caye`,
    `${cleaned} Belize`,
    cleaned
  ];

  const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  for (const query of attempts) {
    const results = await searchPlacesText(query, apiKey);
    if (!results?.length) continue;

    const candidates = results.filter(r => {
      if (!r.types) return false;
      if (
        r.types.includes("locality") ||
        r.types.includes("political") ||
        r.types.includes("sublocality") ||
        r.types.includes("neighborhood") ||
        r.types.includes("administrative_area_level_1") ||
        r.types.includes("administrative_area_level_2")
      ) return false;

      return r.types.some(t =>
        t === "bar" ||
        t === "restaurant" ||
        t === "night_club" ||
        t === "cafe" ||
        t === "point_of_interest" ||
        t === "establishment"
      );
    });

    if (!candidates.length) continue;

    let business = null;

    if (knownLat && knownLng) {
      let closest = null;
      let closestDist = Infinity;

      for (const r of candidates) {
        const lat = r.location.latitude;
        const lng = r.location.longitude;
        const dist = haversine(knownLat, knownLng, lat, lng);
        if (dist < closestDist) {
          closestDist = dist;
          closest = r;
        }
      }

      if (closest && closestDist <= 3000) {
        business = closest;
      } else {
        continue;
      }
    } else {
      business = candidates[0];
    }

    let finalPlaceId = business.id;
    let lat = business.location.latitude;
    let lng = business.location.longitude;

    try {
      const canonical = await safeFetchJson(
        `https://places.googleapis.com/v1/places/${finalPlaceId}?fields=*`,
        {
          method: "GET",
          headers: { "X-Goog-Api-Key": apiKey }
        }
      );
      if (canonical?.id) finalPlaceId = canonical.id;
    } catch {
      // ignore canonical failure
    }

    return {
      formatted_address: business.formattedAddress,
      geometry: { location: { lat, lng } },
      place_id: finalPlaceId
    };
  }

  for (const query of attempts) {
    const geo = await geocodeAddress(query, apiKey);
    if (!geo) continue;

    if (knownLat && knownLng) {
      const lat = geo.geometry.location.lat;
      const lng = geo.geometry.location.lng;
      const dist = haversine(knownLat, knownLng, lat, lng);

      if (dist > 150) {
        return {
          formatted_address: geo.formatted_address,
          geometry: { location: { lat: knownLat, lng: knownLng } },
          place_id: null
        };
      }
    }

    return geo;
  }

  if (knownLat && knownLng) {
    return {
      formatted_address: venue,
      geometry: { location: { lat: knownLat, lng: knownLng } },
      place_id: null
    };
  }

  return null;
}

// ============================================================================
export function buildStaticMapUrl(lat, lng, placeId, key, label = "") {
  const base =
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap`;

  if (placeId) {
    return `${base}&markers=color:red|place_id:${placeId}&key=${key}`;
  }

  const labelPart = label
    ? `&markers=color:red|label:${encodeURIComponent(label)}|${lat},${lng}`
    : `&markers=color:red|${lat},${lng}`;

  return `${base}${labelPart}&key=${key}`;
}

// ============================================================================
//  COUNTRY NORMALIZER
// ============================================================================
export function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US", can: "CA", mex: "MX", blz: "BZ", gbr: "GB",
    jam: "JM", tto: "TT", hnd: "HN", gtm: "GT", slv: "SV",
    nic: "NI", cri: "CR", pan: "PA", dom: "DO", prt: "PR",
    brb: "BB", lca: "LC", kna: "KN"
  };
  if (alpha3[cleaned]) return alpha3[cleaned];

  const map = {
    "belize": "BZ",
    "united states": "US",
    "united states of america": "US",
    "usa": "US",
    "us": "US",
    "mexico": "MX",
    "canada": "CA",
    "united kingdom": "GB",
    "great britain": "GB",
    "uk": "GB",
    "jamaica": "JM",
    "bahamas": "BS",
    "trinidad and tobago": "TT",
    "guatemala": "GT",
    "honduras": "HN",
    "el salvador": "SV",
    "nicaragua": "NI",
    "costa rica": "CR",
    "panama": "PA",
    "dominican republic": "DO",
    "puerto rico": "PR",
    "barbados": "BB",
    "saint lucia": "LC",
    "saint kitts and nevis": "KN",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "australia": "AU",
    "new zealand": "NZ",
    "india": "IN",
    "china": "CN",
    "japan": "JP",
    "south korea": "KR",
    "brazil": "BR",
    "argentina": "AR",
    "colombia": "CO",
    "chile": "CL"
  };

  return map[cleaned] || "BZ";
}

// ============================================================================
//  COMMUNICATION + DATE HELPERS
// ============================================================================
export function parseSMSBoolean(value) {
  if (!value) return false;
  const v = String(value).toLowerCase().trim();
  return v === "i agree to receive sms!" || v === "true" || v === "1";
}

export function receiveCommunication(raw) {
  if (!raw || typeof raw !== "string") {
    return { receiveSMS: false, receiveMassEmails: false };
  }

  const cleaned = raw
    .split(",")
    .map(x => x.trim().toLowerCase())
    .filter(Boolean);

  const receiveSMS = cleaned.some(x => x.includes("sms"));
  const receiveMassEmails = cleaned.some(x =>
    x.includes("mass email") ||
    x.includes("mass-email") ||
    x.includes("mass_emails") ||
    x.includes("massemails")
  );

  return { receiveSMS, receiveMassEmails };
}

export function safeDate(value) {
  if (!value) return null;

  if (typeof value.toDate === "function") {
    try {
      return value.toDate().toISOString();
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    const sec = value.seconds ?? value._seconds;
    if (typeof sec === "number") {
      try {
        return new Date(sec * 1000).toISOString();
      } catch {
        return null;
      }
    }
  }

  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toISOString();
  } catch {
    return null;
  }
}

export function calculateReleaseDate(deliveredAt, delayDays = 3) {
  try {
    if (!deliveredAt || !admin?.firestore) return null;

    let date;
    if (typeof deliveredAt.toDate === "function") {
      date = deliveredAt.toDate();
    } else {
      date = new Date(deliveredAt);
    }

    if (isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + delayDays);
    return admin.firestore.Timestamp.fromDate(date);
  } catch {
    return null;
  }
}

// ============================================================================
//  REQUEST PARSER (LEANED, STILL DETERMINISTIC)
// ============================================================================
export async function parseIncomingRequest(req) {
  log?.("🔵 [parseIncomingRequest] START");

  let payload = {};
  let email = null;
  let emailType = null;
  let logId = null;

  const isGarbage = (v) => {
    if (!v) return true;
    const s = String(v);
    return (
      s.trim() === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    );
  };

  const clean = (v) => (isGarbage(v) ? null : String(v).trim());
  const soft = (v, fb = null) => (v == null ? fb : String(v).trim() || fb);
  const temp = (v, fb = null) => (v == null ? fb : String(v).trim());

  if (req.method === "POST" && req.body && typeof req.body === "object") {
    payload = req.body;
    email = payload.email || null;
    emailType = payload.emailType || payload.type || null;
    logId = payload.logId || null;
  }

  const merged = { ...payload, ...req.query };

  email = temp(merged.email || email, null);
  emailType = temp(merged.emailType || merged.type || emailType, "newUser");
  logId = temp(merged.logId || logId, null);

  if (!logId && db) {
    logId = db.collection("EmailLogs").doc().id;
  }

  const rawType = (merged.type || "").toLowerCase();
  const rawFunction = (merged.function || "").toLowerCase();
  const rawEmailType = (emailType || "").toLowerCase();

  const isUserFlow =
    rawType === "users" ||
    rawEmailType === "users" ||
    rawFunction === "newuser" ||
    rawFunction === "userupdate";

  const cleanFn = isUserFlow ? clean : soft;

  email = cleanFn(email, null);
  emailType = cleanFn(emailType, "newUser");

  const requiresEmail =
    rawType === "users" ||
    rawFunction === "sendemail" ||
    (rawEmailType && rawEmailType !== "newuser");

  if (requiresEmail && !email) {
    throw new Error("Missing Email");
  }

  if (email) {
    email = decodeURIComponent(email).trim().toLowerCase();
    if (!email.includes("@") || email.length < 5) {
      throw new Error("Invalid Email");
    }
  }

  if (emailType) {
    emailType = emailType.charAt(0).toLowerCase() + emailType.slice(1);
  }

  const finalPayload = {
    TPIdentity: {
      email,
      displayName: clean(merged.displayName),
      resendToken: clean(merged.resendToken)
    },

    TPNotifications: {
      receiveSMS:
        merged.receiveSMS === true ||
        merged.receiveSMS === "true" ||
        merged.receiveSMS === 1,

      receiveMassEmails:
        merged.receiveMassEmails === true ||
        merged.receiveMassEmails === "true" ||
        merged.receiveMassEmails === 1
    },

    TPWallet: {
      payFrequency: clean(merged.payFrequency),
      payDay: clean(merged.payDay)
    },

    TPLoyalty: {
      pointsBalance: Number(merged.pointsBalance || merged.points || 0)
    },

    meta: {
      type: clean(rawType),
      function: clean(rawFunction),
      logId
    }
  };

  log?.("✅ FINAL PARSED:", { email, emailType, logId, payload: finalPayload });

  return { email, emailType, logId, payload: finalPayload };
}

// ============================================================================
//  STRIPE PAYOUT SETTINGS (KEPT, BUT ROUTED THROUGH GENOME)
// ============================================================================
export async function configurePayoutSettings(stripe, accountId, payFrequency, payDay) {
  log?.("🔵 [configurePayoutSettings] START");

  const cleanLower = (v, fallback = null) => {
    if (!v) return fallback;
    const s = String(v).trim().toLowerCase();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return fallback;
    return s;
  };

  if (!db || !admin) {
    throw new Error("World data genome not available (admin/db missing)");
  }

  try {
    payFrequency = cleanLower(payFrequency, "daily");
    payDay = cleanLower(payDay, "monday");

    const allowedFreq = ["daily", "weekly"];
    if (!allowedFreq.includes(payFrequency)) payFrequency = "daily";

    const allowedDays = ["monday","tuesday","wednesday","thursday","friday"];
    if (payFrequency === "weekly" && !allowedDays.includes(payDay)) {
      payDay = "monday";
    }

    const account = await stripe.accounts.retrieve(accountId);

    const snap = await db
      .collection("Users")
      .where("TPIdentity.stripeAccountID", "==", accountId)
      .limit(1)
      .get();

    if (snap.empty) {
      throw new Error("Missing user for Stripe account");
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data() || {};

    const country = normalizeCountry(
      account.country ??
      userData.TPIdentity?.country ??
      "BZ"
    );

    const instantPayoutSupportedCountries = ["US", "GB", "CA", "AU"];

    const schedule = { interval: payFrequency };
    if (payFrequency === "weekly") {
      schedule.weekly_anchor = payDay;
    }

    const payoutSettings = {
      settings: {
        payouts: {
          schedule,
          ...(instantPayoutSupportedCountries.includes(country)
            ? {}
            : { debit_negative_balances: false })
        }
      }
    };

    await stripe.accounts.update(accountId, payoutSettings);

    const now = admin.firestore.FieldValue.serverTimestamp();

    await userRef.set(
      {
        TPIdentity: {
          ...userData.TPIdentity,
          country,
          updatedAt: now
        },
        TPWallet: {
          ...userData.TPWallet,
          payouts: {
            frequency: payFrequency,
            day: payDay,
            updatedAt: now
          },
          updatedAt: now
        }
      },
      { merge: true }
    );

    log?.("✅ [configurePayoutSettings] COMPLETE");

    return {
      country,
      instantPayoutsEnabled: instantPayoutSupportedCountries.includes(country)
    };

  } catch (err) {
    error?.("❌ configurePayoutSettings error:", err.message);
    throw err;
  }
}

// ============================================================================
//  BINARY FETCH + HASH HELPERS
// ============================================================================
export async function fetchBuffer(url) {
  try {
    const resp = await fetch(url, { redirect: "follow" });
    const status = resp.status;

    if (!resp.ok) {
      return { ok: false, status, error: `HTTP ${status}` };
    }

    const contentType = resp.headers.get("content-type") || "";
    const arrayBuf = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    return { ok: true, buffer, contentType, status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function computeSha256Hex(buffer) {
  try {
    if (
      globalThis.crypto &&
      globalThis.crypto.subtle &&
      typeof globalThis.crypto.subtle.digest === "function"
    ) {
      let ab;

      if (buffer instanceof ArrayBuffer) {
        ab = buffer;
      } else if (ArrayBuffer.isView(buffer)) {
        ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else {
        ab = Buffer.from(buffer).buffer;
      }

      const hashBuf = await globalThis.crypto.subtle.digest("SHA-256", ab);
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
    }
  } catch {
    // fall through
  }

  try {
    const nodeBuf = Buffer.isBuffer(buffer)
      ? buffer
      : Buffer.from(buffer);

    const crypto = await import("crypto");
    return crypto.createHash("sha256").update(nodeBuf).digest("hex");
  } catch (err) {
    warn?.("⚠️ computeSha256Hex fallback failed:", err);
    return null;
  }
}

// ============================================================================
//  LOCAL HELPER REGISTRY (for getHelper)
// ============================================================================
const localHelpers = {
  safeFetchJson,
  searchPlacesText,
  geocodeAddress,
  fuzzyGeocode,
  buildStaticMapUrl,
  normalizeCountry,
  parseSMSBoolean,
  receiveCommunication,
  safeDate,
  calculateReleaseDate,
  parseIncomingRequest,
  configurePayoutSettings,
  fetchBuffer,
  computeSha256Hex
};

// ============================================================================
// 📘 PAGE INDEX — END OF FILE
// ============================================================================

export { admin, db };
