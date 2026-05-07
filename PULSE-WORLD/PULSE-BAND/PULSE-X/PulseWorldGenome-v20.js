// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-X/PulseWorldGenome-v20-IMMORTAL.js
/* global log, warn, error */

// ============================================================================
//  PULSE-WORLD GENOME ORGAN — PulseWorldGenome (v20 IMMORTAL)
//  World-layer deterministic service organ
//  ROLE:
//    - Single world-genome surface for:
//        • Data genome (Firebase / SQL / future backends)
//        • Social graph organ
//        • World helpers (geo, comms, payouts, hashing, routing)
//        • World prewarm + health
//    - Deterministic, drift-proof, dual-band, cache-aware.
//    - No direct raw fetch except via routed world engine.
// ============================================================================

/*
GENOME_META = {
  identity: "PulseWorldGenome",
  version: "v20-IMMORTAL",
  epoch: "v20-IMMORTAL",
  layer: "world_layer",
  role: "world_genome",
  lineage: "PulseOS-v14 → v16-IMMORTAL → v17-IMMORTAL → v20-IMMORTAL",

  evo: {
    deterministic: true,
    driftProof: true,
    zeroMutation: true,
    zeroExternalMutation: true,

    worldLayerOrgan: true,
    founderAligned: true,
    presenceAware: true,
    bandAware: true,
    proxyAware: true,
    safeInit: true,
    singleInstance: true,
    coldStartSafe: true,
    healthAware: true,
    namespaceAware: true,
    cacheAware: true,
    prewarmAware: true,
    geoAware: true,
    intellHashAware: true,
    binaryAware: true,
    schedulerAware: true,
    runtimeV20Aware: true
  },

  placement: {
    requiredFolder: "PULSE-WORLD",
    requiredSubsystem: "world_engine",
    naturalLanguageHook: [
      "world connection",
      "world engine",
      "backend connection",
      "backend engine",
      "firebase genome",
      "world data",
      "world memory",
      "world genome",
      "world helpers"
    ]
  },

  notifications: {
    onMisplacement: "adaptive",
    adminEmail: [
      "fordfamilydistribution@gmail.com",
      "aldwynfox101@gmail.com",
      "sales@tropicpulse.bz"
    ],
    adminSMS: "+15096077261",
    adminMessenger: [
      "+15096077261",
      "aldwynfox101@gmail.com"
    ]
  }
}
*/

// ============================================================================
//  IMPORTS — DATA GENOME + SPECS + TRANSLATORS + SOCIAL GRAPH
// ============================================================================

// Data genome (Firebase owner, v20)
import {
  PulseWorldFirebaseGenome,
  admin as FirebaseAdmin,
  db as FirebaseDB,
  storage as FirebaseStorage,
  checkWorldDataHealth,
  appendWorldSnapshot
} from "./PulseWorldFirebaseGenome-v20.js";

// Specs genome (schema + DNAs)
import * as PulseSpecsDNAGenome from "../PULSE-SPECS/PulseSpecsDNAGenome-v17.js";

// Translators (RNA/Skeletal → backend shapes)
import * as PulseTranslatorRNAIntake from "../PULSE-TRANSLATOR/PulseTranslatorRNAIntake-v17.js";
import * as PulseTranslatorRNAOutput from "../PULSE-TRANSLATOR/PulseTranslatorRNAOutput-v17.js";
import * as PulseTranslatorSkeletalIntake from "../PULSE-TRANSLATOR/PulseTranslatorSkeletalIntake-v17.js";
import * as PulseTranslatorSkeletalOutput from "../PULSE-TRANSLATOR/PulseTranslatorSkeletalOutput-v17.js";

// Social graph organ
import { createPulseWorldSocialGraph } from "./PulseWorldSocialGraph-v17.js";

// ============================================================================
//  LOCAL CACHES (WORLD-LAYER)
// ============================================================================

const helperCache = new Map();
const geoCache = new Map();          // key: query|lat|lng → result
const staticMapCache = new Map();    // key: lat|lng|placeId|label → url
const intellHashCache = new Map();   // key: hashKey → { hash, meta }
const worldDocCache = new Map();     // key: dnaName|id → payload

// ============================================================================
//  WORLD ROUTING — NO RAW FETCH FOR JSON
// ============================================================================

async function routeThroughWorldEngine(task, payload) {
  const router =
    globalThis?.PulseWorldRouter ||
    globalThis?.route ||
    null;

  if (!router || typeof router !== "function") {
    throw new Error("World routing not available (PulseWorldRouter/route missing)");
  }

  return router(task, payload);
}

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
//  GOOGLE HELPERS (PLACES + GEOCODING) — ROUTED + CACHED
// ============================================================================

export async function searchPlacesText(query, apiKey) {
  const cacheKey = `places:${query}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

  const url = "https://places.googleapis.com/v1/places:searchText";
  const body = { textQuery: query, languageCode: "en" };

  const res = await safeFetchJson(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey
    },
    body: JSON.stringify(body)
  });

  const places = res?.places || [];
  geoCache.set(cacheKey, places);
  return places;
}

export async function geocodeAddress(address, apiKey) {
  const cacheKey = `geocode:${address}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

  const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const data = await safeFetchJson(url);
  const result = (!data?.results || data.results.length === 0) ? null : data.results[0];

  geoCache.set(cacheKey, result);
  return result;
}

// ============================================================================
//  FUZZY GEOCODER (Belize-biased)
// ============================================================================

export async function fuzzyGeocode(venue, apiKey, knownLat = null, knownLng = null) {
  const cleaned = venue.trim();
  const cacheKey = `fuzzy:${cleaned}|${knownLat || ""}|${knownLng || ""}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

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

    const result = {
      formatted_address: business.formattedAddress,
      geometry: { location: { lat, lng } },
      place_id: finalPlaceId
    };

    geoCache.set(cacheKey, result);
    return result;
  }

  for (const query of attempts) {
    const geo = await geocodeAddress(query, apiKey);
    if (!geo) continue;

    if (knownLat && knownLng) {
      const lat = geo.geometry.location.lat;
      const lng = geo.geometry.location.lng;
      const dist = haversine(knownLat, knownLng, lat, lng);

      if (dist > 150) {
        const result = {
          formatted_address: geo.formatted_address,
          geometry: { location: { lat: knownLat, lng: knownLng } },
          place_id: null
        };
        geoCache.set(cacheKey, result);
        return result;
      }
    }

    geoCache.set(cacheKey, geo);
    return geo;
  }

  if (knownLat && knownLng) {
    const result = {
      formatted_address: venue,
      geometry: { location: { lat: knownLat, lng: knownLng } },
      place_id: null
    };
    geoCache.set(cacheKey, result);
    return result;
  }

  geoCache.set(cacheKey, null);
  return null;
}

// ============================================================================
//  STATIC MAP URL (CACHED)
// ============================================================================

export function buildStaticMapUrl(lat, lng, placeId, key, label = "") {
  const cacheKey = `static:${lat}|${lng}|${placeId || ""}|${label || ""}`;
  if (staticMapCache.has(cacheKey)) return staticMapCache.get(cacheKey);

  const base =
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap`;

  let url;
  if (placeId) {
    url = `${base}&markers=color:red|place_id:${placeId}&key=${key}`;
  } else {
    const labelPart = label
      ? `&markers=color:red|label:${encodeURIComponent(label)}|${lat},${lng}`
      : `&markers=color:red|${lat},${lng}`;
    url = `${base}${labelPart}&key=${key}`;
  }

  staticMapCache.set(cacheKey, url);
  return url;
}

// ============================================================================
//  GEO PROFILE + TRIP HELPERS (WORLD-AWARE)
// ============================================================================

export async function buildGeoProfile({ venue, apiKey, knownLat = null, knownLng = null, label = "" }) {
  const fuzzy = await fuzzyGeocode(venue, apiKey, knownLat, knownLng);
  if (!fuzzy) {
    return {
      ok: false,
      reason: "NO_GEO_MATCH",
      venue,
      mapUrl: null,
      center: null
    };
  }

  const lat = fuzzy.geometry.location.lat;
  const lng = fuzzy.geometry.location.lng;
  const mapUrl = buildStaticMapUrl(lat, lng, fuzzy.place_id, apiKey, label || "T");

  return {
    ok: true,
    venue,
    formattedAddress: fuzzy.formatted_address,
    placeId: fuzzy.place_id,
    center: { lat, lng },
    mapUrl
  };
}

export function buildTripSummary({ originCountry, destinationCountry, nights, guests }) {
  return {
    originCountry: normalizeCountry(originCountry),
    destinationCountry: normalizeCountry(destinationCountry),
    nights: Number(nights || 0),
    guests: Number(guests || 1),
    band: "world_trip",
    advantageHint: nights >= 5 ? "long_stay" : "short_stay"
  };
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
    if (!deliveredAt || !FirebaseAdmin?.firestore) return null;

    let date;
    if (typeof deliveredAt.toDate === "function") {
      date = deliveredAt.toDate();
    } else {
      date = new Date(deliveredAt);
    }

    if (isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + delayDays);
    return FirebaseAdmin.firestore.Timestamp.fromDate(date);
  } catch {
    return null;
  }
}

// ============================================================================
//  REQUEST PARSER (EMAIL / WORLD ENTRYPOINT)
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

  if (!logId && FirebaseDB) {
    logId = FirebaseDB.collection("EmailLogs").doc().id;
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
//  STRIPE PAYOUT SETTINGS
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

  if (!FirebaseDB || !FirebaseAdmin) {
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

    const snap = await FirebaseDB
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

    const now = FirebaseAdmin.firestore.FieldValue.serverTimestamp();

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
//  INTELLHASH (WORLD-AWARE HASH PROFILE)
// ============================================================================

export async function computeIntellHash({ buffer, tag = "generic", contentType = null }) {
  if (!buffer) return { ok: false, error: "NO_BUFFER" };

  const size =
    buffer.length ??
    buffer.byteLength ??
    (ArrayBuffer.isView(buffer) ? buffer.byteLength : null) ??
    0;

  const cacheKey = `${tag}|${size}`;
  if (intellHashCache.has(cacheKey)) {
    return { ok: true, cached: true, ...intellHashCache.get(cacheKey) };
  }

  const hash = await computeSha256Hex(buffer);
  if (!hash) return { ok: false, error: "HASH_FAILED" };

  const profile = {
    hash,
    tag,
    size,
    contentType: contentType || null,
    band: "binary",
    advantageHint: size > 5_000_000 ? "large_asset" : "small_asset"
  };

  intellHashCache.set(cacheKey, profile);
  return { ok: true, cached: false, ...profile };
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
  buildGeoProfile,
  buildTripSummary,
  normalizeCountry,
  parseSMSBoolean,
  receiveCommunication,
  safeDate,
  calculateReleaseDate,
  parseIncomingRequest,
  configurePayoutSettings,
  fetchBuffer,
  computeSha256Hex,
  computeIntellHash
};

// ============================================================================
//  HELPER REGISTRY — AUTO-LOAD + AUTO-CACHE (MODE C)
// ============================================================================

export async function getHelper(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Helper name required");
  }

  const key = name.trim();

  if (localHelpers[key]) return localHelpers[key];
  if (helperCache.has(key)) return helperCache.get(key);

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
      // ignore and continue
    }
  }

  warn?.(`⚠️ [PulseWorldGenome] Missing helper: ${key}`);
  throw new Error(`Helper not found: ${key}`);
}

export async function prewarmWorldHelpers() {
  const hotHelpers = [
    "safeFetchJson",
    "searchPlacesText",
    "geocodeAddress",
    "fuzzyGeocode",
    "normalizeCountry",
    "parseIncomingRequest",
    "computeIntellHash"
  ];

  for (const h of hotHelpers) {
    try {
      await getHelper(h);
    } catch {
      // best-effort only
    }
  }

  try {
    await checkWorldDataHealth?.();
  } catch {
    // best-effort
  }
}

// ============================================================================
//  BACKEND ABSTRACTION — FIREBASE OR SQL (OR OTHER)
// ============================================================================

const WORLD_DATA_BACKEND =
  process.env.PULSE_WORLD_BACKEND || "firebase"; // "firebase" | "sql" | "mock"

let sqlClient = null;

// Lazy-load SQL client if needed (placeholder; you wire real client)
async function getSqlClient() {
  if (WORLD_DATA_BACKEND !== "sql") return null;
  if (sqlClient) return sqlClient;

  try {
    const mod = await import("../PULSE-BAND/PULSE-DATA/PulseSqlClient.js");
    sqlClient = mod.default || mod.sqlClient || mod;
    return sqlClient;
  } catch (err) {
    warn?.("⚠️ [PulseWorldGenome] SQL client load failed:", err?.message || err);
    return null;
  }
}

/**
 * WorldDataProvider — unified interface:
 *   • respects PulseSpecsDNAGenome
 *   • uses Translators to map to/from backend shapes
 *   • routes to Firebase OR SQL based on WORLD_DATA_BACKEND
 *   • v20: worldDocCache-aware
 */
export const WorldDataProvider = Object.freeze({
  backend: WORLD_DATA_BACKEND,

  async getCollection(dnaName) {
    const dna = PulseSpecsDNAGenome?.getDNA?.(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);

    if (WORLD_DATA_BACKEND === "firebase") {
      const path = PulseTranslatorSkeletalOutput.toFirebasePath(dna);
      return FirebaseDB.collection(path);
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const client = await getSqlClient();
      if (!client) throw new Error("SQL backend not available");
      const table = PulseTranslatorSkeletalOutput.toSqlTable(dna);
      return { client, table };
    }

    throw new Error(`Unsupported backend: ${WORLD_DATA_BACKEND}`);
  },

  async create(dnaName, payload) {
    const dna = PulseSpecsDNAGenome?.getDNA?.(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);

    const intake = PulseTranslatorRNAIntake.fromWorldPayload(dna, payload);

    if (WORLD_DATA_BACKEND === "firebase") {
      const col = await this.getCollection(dnaName);
      const docRef = col.doc(intake.id || undefined);
      await docRef.set(intake.body, { merge: true });

      const key = `${dnaName}|${docRef.id}`;
      worldDocCache.set(key, { id: docRef.id, ...intake.body });

      return { id: docRef.id };
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const { client, table } = await this.getCollection(dnaName);
      const row = PulseTranslatorSkeletalIntake.toSqlRow(dna, intake);
      const res = await client.insert(table, row);
      const worldPayload = PulseTranslatorRNAOutput.toWorldPayload(dna, res);

      const key = `${dnaName}|${worldPayload.id}`;
      worldDocCache.set(key, worldPayload);

      return worldPayload;
    }

    throw new Error(`Unsupported backend: ${WORLD_DATA_BACKEND}`);
  },

  async get(dnaName, id) {
    const dna = PulseSpecsDNAGenome?.getDNA?.(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);
    if (!id) throw new Error("id required");

    const cacheKey = `${dnaName}|${id}`;
    if (worldDocCache.has(cacheKey)) {
      return worldDocCache.get(cacheKey);
    }

    if (WORLD_DATA_BACKEND === "firebase") {
      const col = await this.getCollection(dnaName);
      const snap = await col.doc(id).get();
      if (!snap.exists) return null;
      const payload = PulseTranslatorRNAOutput.fromFirebaseDoc(dna, snap);
      worldDocCache.set(cacheKey, payload);
      return payload;
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const { client, table } = await this.getCollection(dnaName);
      const row = await client.getById(table, id);
      if (!row) return null;
      const payload = PulseTranslatorRNAOutput.fromSqlRow(dna, row);
      worldDocCache.set(cacheKey, payload);
      return payload;
    }

    throw new Error(`Unsupported backend: ${WORLD_DATA_BACKEND}`);
  }
});

// ============================================================================
//  WORLD GENOME CREATION (v20 IMMORTAL)
// ============================================================================

export function createPulseWorldGenome({ PowerUserRanking, log: logger, warn: warner, error: errorLogger } = {}) {
  // Create the world social graph organ
  const socialGraph = createPulseWorldSocialGraph({
    PowerUserRanking,
    log: logger || log,
    warn: warner || warn,
    error: errorLogger || error
  });

  // Genome metadata
  const meta = {
    layer: "PulseWorldGenome",
    role: "WORLD_GENOME",
    version: "v20-IMMORTAL",
    organs: {
      socialGraph: socialGraph.meta,
      dataGenome: PulseWorldFirebaseGenome.meta || {
        role: "WORLD_DATA_GENOME",
        version: "v20-IMMORTAL"
      }
    },
    backend: WORLD_DATA_BACKEND,
    cache: {
      helpers: true,
      geo: true,
      staticMaps: true,
      intellHash: true,
      worldDocs: true
    }
  };

  // IMMORTAL genome object
  return Object.freeze({
    meta,
    socialGraph,
    dataGenome: PulseWorldFirebaseGenome,
    worldData: WorldDataProvider,
    helpers: {
      getHelper,
      prewarmWorldHelpers
    }
  });
}

// ============================================================================
//  EXPORTS — WORLD-LAYER DATA BINDINGS + GENOME INSTANCE
// ============================================================================

export const admin = FirebaseAdmin;
export const db = FirebaseDB;
export const storage = FirebaseStorage;

export {
  PulseWorldFirebaseGenome,
  checkWorldDataHealth,
  appendWorldSnapshot
};

// Default export instance
export const pulseWorldGenome = createPulseWorldGenome();

// 📘 PAGE INDEX — END OF FILE
