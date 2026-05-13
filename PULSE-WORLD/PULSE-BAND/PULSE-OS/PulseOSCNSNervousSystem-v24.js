// ============================================================================
// FILE: /PULSE-OS/PulseOSCNSNervousSystem-v24-Immortal-DualBand.js
// PULSE OS — v24‑IMMORTAL‑DUALBAND‑PULSEBAND‑ARTERY‑AWARE
// “THE CENTRAL NERVOUS SYSTEM / COMMUNICATION INTELLIGENCE ORGAN”
//
//  • v24: PulseBand‑aware, artery‑aware, dualband‑tight, drift‑aware
//  • v24: CNS-level passive/active PageScanner integration (always-on, no timers)
//  • v24: CNS healers (checkBand / checkIdentity / checkRouterMemory) with
//          deterministic health snapshots + band/dna tagging
//  • v24: Optimized routing path, recursion‑safe, offline/online split preserved
//  • v24: DualBand AI auto‑boot preserved, but tagged with CNS context
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseOSCNSNervousSystemMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// ORGAN IMPORTS — COMPLETE THE CONNECTION (Membranes → CNS)
// ============================================================================
import { PulseOSShortTermMemory } from "./PulseOSShortTermMemory.js";
// PageScannerV12: A1/A2 intelligence pack, used here as CNS-level passive/active scanner
import { createPulseSkinReflex as PageScannerV12 } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

import checkBand from "../PULSE-X/PULSE-WORLD-BAND.js";
import checkIdentity from "../PULSE-X/PulseWorldIdentity-v20.js";
import checkRouterMemory from "../PULSE-PROXY/PulseProxyMemoryRouter-v20.js";
import { getStripe as Stripe } from "../PULSE-X/PulseWorldBank-v20.js";
import { createDualBandOrganism } from "../PULSE-AI/aiDualBand-v24.js";

// ============================================================================
// CNS CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID   = "CNS-LAYER";
const LAYER_NAME = "THE CENTRAL NERVOUS SYSTEM";
const LAYER_ROLE = "COMMUNICATION INTELLIGENCE ORGAN";
const LAYER_VER  = "24-Immortal";

const hasWindow = typeof window !== "undefined";

console.log(LAYER_NAME+" "+LAYER_VER);

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;
// Router memory + heartbeat surfaces from ShortTermMemory / window
const RouterMemory =
  (PulseOSShortTermMemory && PulseOSShortTermMemory.RouterMemory) ||
  PulseOSShortTermMemory ||
  (hasWindow && window.PulseRouterMemory) ||
  null;

const GateHeartbeat =
  (PulseOSShortTermMemory && PulseOSShortTermMemory.GateHeartbeat) ||
  (hasWindow && window.GateHeartbeat) ||
  null;

// Base logger (diagnostics only, non-contract)
const baseLog =
  (hasWindow && typeof window.PulseLog === "function")
    ? window.PulseLog
    : (typeof console !== "undefined" && typeof console.log === "function"
        ? console.log
        : () => {});

const CNS_DIAGNOSTICS_ENABLED =
  hasWindow &&
  (window.PULSE_CNS_DIAGNOSTICS === "true" ||
    window.PULSE_DIAGNOSTICS === "true");

const logCNS = (stage, details = {}) => {
  if (!CNS_DIAGNOSTICS_ENABLED) return;

  baseLog(JSON.stringify({
    pulseLayer: LAYER_ID,
    pulseName:  LAYER_NAME,
    pulseRole:  LAYER_ROLE,
    pulseVer:   LAYER_VER,
    stage,
    ...details
  }));
};

logCNS("CNS_INIT");

// ============================================================================
// PULSEBAND HELPERS
// ============================================================================
const ROUTE_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary",
  DUAL: "dual"
};

function normalizeBand(band) {
  const b = (band || ROUTE_BANDS.SYMBOLIC).toLowerCase();
  if (b === ROUTE_BANDS.BINARY) return ROUTE_BANDS.BINARY;
  if (b === ROUTE_BANDS.DUAL) return ROUTE_BANDS.DUAL;
  return ROUTE_BANDS.SYMBOLIC;
}

function resolveBandFromPayload(payload) {
  const band = payload && typeof payload.__band === "string"
    ? payload.__band.toLowerCase()
    : ROUTE_BANDS.SYMBOLIC;

  return normalizeBand(band === ROUTE_BANDS.BINARY ? ROUTE_BANDS.BINARY : ROUTE_BANDS.SYMBOLIC);
}

function resolveDnaTagFromPayload(payload) {
  return payload && typeof payload.__dnaTag === "string"
    ? payload.__dnaTag
    : null;
}

function makeErrorSignature(err) {
  const msg = String(err);
  const stack = err?.stack || "";
  const top = stack.split("\n")[1] || "NO_FRAME";
  return msg + "::" + top.trim();
}

// ============================================================================
// CNS‑LEVEL PAGESCANNER BRIDGE — ALWAYS‑ON PASSIVE/ACTIVE SCANNER
//  • No timers, no loops, no polling
//  • Called on every route/log/heal/transport/alert/heal-memory event
//  • Uses PageScannerV12.buildDriftPacket as the intelligence core
// ============================================================================
const CNSPageScanner = {
  emit(event, context = {}) {
    try {
      if (!PageScannerV12 || typeof PageScannerV12.buildDriftPacket !== "function") {
        return;
      }

      const packet = PageScannerV12.buildDriftPacket({
        event,
        layer: "B-Layer",
        subsystem: "CNS",
        cnsIdentity: PulseOSCNSNervousSystemMeta.identity,
        ...context
      });

      if (
        hasWindow &&
        window.PageScannerAdapter &&
        typeof window.PageScannerAdapter.onEvent === "function"
      ) {
        window.PageScannerAdapter.onEvent(packet);
      }

      if (typeof packet.severity === "number") {
        logCNS("CNS_PAGESCANNER_EVENT", {
          event,
          severity: packet.severity,
          tooFar: !!packet.tooFar
        });
      }
    } catch {
      // Scanner must never break CNS
    }
  }
};

// ============================================================================
// ROUTE FAILURE STATE
// ============================================================================
let routeFailureCount = 0;
let routerEventSeq = 0;

// ============================================================================
// CNS CONTEXT MAP — v24 dual‑band + binary‑aware + PulseBand
// ============================================================================
const CNS_CONTEXT = {
  label: "CNS",
  layer: "B‑Layer",
  purpose: "Frontend → Backend Communication Organ",
  context: "Sends structured requests to backend via Proxy Spine gateway",
  version: LAYER_VER,

  // Dual‑band tagging (symbolic‑primary, binary‑aware)
  band: ROUTE_BANDS.DUAL,
  symbolicPrimary: true,
  binaryAware: true,

  modes: {
    offline: "local-endpoint",
    online: "proxy-spine"
  },

  pulseBand: {
    cns: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryOverlay: true
  }
};

// ============================================================================
// CNS HEALING STATE — v24
// ============================================================================
const CNS_HEALING = {
  lastBandCheck: null,
  lastIdentityCheck: null,
  lastRouterMemoryCheck: null,
  lastHealRequestCount: 0,
  lastHealAppliedCount: 0,
  lastHealError: null,
  lastRouteErrorSignature: null,
  lastRouteBand: null,
  lastRouteDnaTag: null
};

function safeRun(label, fn) {
  try {
    const res = fn();
    return res === undefined ? { ok: true, surface: label } : res;
  } catch (err) {
    return { ok: false, error: String(err), surface: label };
  }
}

// ============================================================================
// TRANSPORT LAYER — OFFLINE + ONLINE (GUARDED GLOBALS, DUAL‑BAND)
//  • v24: same contract, more PulseBand context + scanner events
// ============================================================================
const Transport = {
  async callEndpoint(type, payload) {
    const offlineMode =
      hasWindow && window.PULSE_OFFLINE_MODE === true;

    // OFFLINE BAND
    if (offlineMode) {
      logCNS("TRANSPORT_OFFLINE_MODE", { type, band: "offline" });
      CNSPageScanner.emit("cns-transport-offline-call", {
        type,
        band: "offline",
        payloadShape: payload ? Object.keys(payload) : []
      });

      const localEndpoint =
        hasWindow && window.PulseLocalEndpoint &&
        typeof window.PulseLocalEndpoint.handle === "function"
          ? window.PulseLocalEndpoint
          : null;

      if (localEndpoint) {
        try {
          const result = await localEndpoint.handle({ type, payload, CNS_CONTEXT });
          logCNS("TRANSPORT_OFFLINE_RESPONSE", { type, band: "offline" });
          CNSPageScanner.emit("cns-transport-offline-response", {
            type,
            band: "offline"
          });
          return result;
        } catch (err) {
          const msg = String(err);
          logCNS("TRANSPORT_OFFLINE_ERROR", {
            type,
            band: "offline",
            message: msg
          });
          CNSPageScanner.emit("cns-transport-offline-error", {
            type,
            band: "offline",
            message: msg
          });
          return { error: "Offline local endpoint failed", details: msg };
        }
      }

      logCNS("TRANSPORT_OFFLINE_NO_HANDLER", { type, band: "offline" });
      CNSPageScanner.emit("cns-transport-offline-no-handler", {
        type,
        band: "offline"
      });
      return { error: "Offline mode: no local endpoint handler registered" };
    }

    // ONLINE BAND
    logCNS("TRANSPORT_ONLINE_CALL", { type, band: "online" });

    CNSPageScanner.emit("cns-transport-online-call", {
      type,
      band: "online",
      payloadShape: payload ? Object.keys(payload) : []
    });

    const remoteEndpoint =
      hasWindow && window.PulseRemoteEndpoint &&
      typeof window.PulseRemoteEndpoint.handle === "function"
        ? window.PulseRemoteEndpoint
        : null;

    if (!remoteEndpoint) {
      logCNS("TRANSPORT_ONLINE_NO_REMOTE_ENDPOINT", { type, band: "online" });
      CNSPageScanner.emit("cns-transport-online-no-remote", {
        type,
        band: "online"
      });
      return { error: "No remote endpoint handler registered for online band" };
    }

    try {
      // hook‑aware routing
      if (type === "hook" && payload?.name) {
        const result = await remoteEndpoint.handle({
          type: "hook",
          hookName: payload.name,
          hookPayload: payload.payload,
          context: CNS_CONTEXT
        });

        logCNS("TRANSPORT_ONLINE_RESPONSE", { type, band: "online" });
        CNSPageScanner.emit("cns-transport-online-response", {
          type,
          band: "online"
        });

        return result;
      }

      const json = await remoteEndpoint.handle({
        type,
        payload,
        context: CNS_CONTEXT
      });

      logCNS("TRANSPORT_ONLINE_RESPONSE", { type, band: "online" });
      CNSPageScanner.emit("cns-transport-online-response", {
        type,
        band: "online"
      });

      return json;
    } catch (err) {
      const msg = String(err);
      logCNS("TRANSPORT_ONLINE_ERROR", {
        type,
        band: "online",
        message: msg
      });
      CNSPageScanner.emit("cns-transport-online-error", {
        type,
        band: "online",
        message: msg
      });
      return { error: "Online remote endpoint failed", details: msg };
    }
  },

  async callCheckRouterMemory(logs) {
    const offlineMode =
      hasWindow && window.PULSE_OFFLINE_MODE === true;

    // always run local router-memory validator first
    CNS_HEALING.lastRouterMemoryCheck = safeRun("checkRouterMemory", () =>
      checkRouterMemory(logs)
    );

    if (offlineMode) {
      logCNS("HEAL_SKIP_OFFLINE", { count: logs.length, band: "offline" });

      CNSPageScanner.emit("cns-heal-skip-offline", {
        count: logs.length,
        band: "offline"
      });

      return null;
    }

    const remoteEndpoint =
      hasWindow && window.PulseRemoteEndpoint &&
      typeof window.PulseRemoteEndpoint.handle === "function"
        ? window.PulseRemoteEndpoint
        : null;

    if (!remoteEndpoint) {
      logCNS("HEAL_NO_REMOTE_ENDPOINT", { count: logs.length, band: "online" });

      CNSPageScanner.emit("cns-heal-no-remote", {
        count: logs.length,
        band: "online"
      });

      return null;
    }

    try {
      const data = await remoteEndpoint.handle({
        type: "CheckRouterMemory",
        payload: { logs },
        context: CNS_CONTEXT
      });

      CNSPageScanner.emit("cns-heal-remote-response", {
        count: logs.length,
        band: "online"
      });

      return data;
    } catch (err) {
      const msg = String(err);
      logCNS("HEAL_REMOTE_ERROR", {
        count: logs.length,
        band: "online",
        message: msg
      });

      CNSPageScanner.emit("cns-heal-remote-error", {
        count: logs.length,
        band: "online",
        message: msg
      });

      return null;
    }
  },

  async callRouteDownAlert(error, type) {
    const offlineMode =
      hasWindow && window.PULSE_OFFLINE_MODE === true;

    if (offlineMode) {
      logCNS("ALERT_SKIP_OFFLINE", { error, type, band: "offline" });

      CNSPageScanner.emit("cns-alert-skip-offline", {
        error,
        type,
        band: "offline"
      });

      return;
    }

    const remoteEndpoint =
      hasWindow && window.PulseRemoteEndpoint &&
      typeof window.PulseRemoteEndpoint.handle === "function"
        ? window.PulseRemoteEndpoint
        : null;

    if (!remoteEndpoint) {
      logCNS("ALERT_NO_REMOTE_ENDPOINT", { error, type, band: "online" });

      CNSPageScanner.emit("cns-alert-no-remote", {
        error,
        type,
        band: "online"
      });

      return;
    }

    try {
      await remoteEndpoint.handle({
        type: "RouteDownAlert",
        payload: { error, type },
        context: CNS_CONTEXT
      });
      logCNS("ALERT_SENT", { type, band: "online" });

      CNSPageScanner.emit("cns-alert-sent", {
        error,
        type,
        band: "online"
      });
    } catch (err) {
      const msg = String(err);
      logCNS("ALERT_REMOTE_ERROR", {
        message: msg,
        band: "online"
      });

      CNSPageScanner.emit("cns-alert-remote-error", {
        error,
        type,
        band: "online",
        message: msg
      });
    }
  }
};
// ------------------------------------------------------------
// NETLIFY VERSION OF YOUR FIREBASE FUNCTIONS
// ------------------------------------------------------------

// Helper for JSON responses
function json(obj, status = 200) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-uid",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    },
    body: JSON.stringify(obj)
  };
}

// ------------------------------------------------------------
// getStripeStatus
// ------------------------------------------------------------
export const getStripeStatus = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const body = JSON.parse(event.body || "{}");
    const { uid, token, stripeAccountId: incomingId } = body;

    if (!uid || !token) {
      return json({ success: false, error: "Missing uid or token" });
    }

    const userSnap = await db.collection("Users").doc(uid).get();
    if (!userSnap.exists) {
      return json({ success: false, error: "User not found" });
    }

    const user = userSnap.data() || {};
    const TPIdentity = user.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" });
    }

    const stripe = new Stripe(process.env.STRIPE_PASSWORD);
    const stripeAccountID =
      incomingId ||
      TPIdentity.stripeAccountID ||
      null;

    if (!stripeAccountID) {
      return json({
        success: true,
        status: "not_connected",
        onboardingLink:
          `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
      });
    }

    const acct = await stripe.accounts.retrieve(stripeAccountID);

    if (acct.charges_enabled && acct.payouts_enabled) {
      return json({
        success: true,
        status: "connected",
        dashboardLink: `https://dashboard.stripe.com/connect/accounts/${acct.id}`
      });
    }

    if (acct.requirements?.currently_due?.length > 0) {
      return json({
        success: true,
        status: "needs_verification",
        onboardingLink:
          `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
      });
    }

    return json({
      success: true,
      status: "pending",
      onboardingLink:
        `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
    });

  } catch (err) {
    console.error("getStripeStatus error:", err);
    return json({ success: false, error: "Server error: " + err.message });
  }
};

// ------------------------------------------------------------
// getLogHtml
// ------------------------------------------------------------
export const getLogHtml = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const id = event.queryStringParameters?.logId;

    if (!id) {
      return json({ success: false, error: "Missing logId" }, 400);
    }

    const doc = await db.collection("EmailLogs").doc(id).get();

    if (!doc.exists) {
      return json({ success: false, error: "Log not found" }, 404);
    }

    const data = doc.data() || {};
    return json({
      success: true,
      html: data.html || ""
    });

  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
};

// ------------------------------------------------------------
// getAllLogs
// ------------------------------------------------------------
export const getAllLogs = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const email = (event.queryStringParameters?.email || "").trim().toLowerCase();
    if (!email) {
      return json({ success: false, error: "Missing email" }, 400);
    }

    const snap = await db
      .collection("EmailLogs")
      .where("to", "==", email)
      .orderBy("createdAt", "desc")
      .limit(500)
      .get();

    const safeMillis = (ts) =>
      ts?.toMillis?.() ??
      (ts?._seconds ? ts._seconds * 1000 : null);

    const logs = snap.docs.map((doc) => {
      const d = doc.data() || {};
      return {
        id: doc.id,
        to: d.to || null,
        subject: d.subject || null,
        status: d.status || null,
        type: d.type || null,
        payload: d.payload || null,
        createdAt: safeMillis(d.createdAt),
        updatedAt: safeMillis(d.updatedAt)
      };
    });

    return json({ success: true, logs });

  } catch (err) {
    console.error("getAllLogs error:", err);
    return json({ success: false, error: err.message }, 500);
  }
};

// ------------------------------------------------------------
// getAllOrders
// ------------------------------------------------------------
export const getAllOrders = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const email = (event.queryStringParameters?.email || "").trim().toLowerCase();
    if (!email) {
      return json({ success: false, error: "Missing email" }, 400);
    }

    const customerSnap = await db
      .collection("Orders")
      .where("customerEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();

    const delivererSnap = await db
      .collection("Orders")
      .where("delivererEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();

    const safeMillis = (ts) =>
      ts?.toMillis?.() ??
      (ts?._seconds ? ts._seconds * 1000 : null);

    const orders = {};

    const add = (docs) => {
      docs.forEach((doc) => {
        const d = doc.data() || {};
        const orderID = d.orderID || doc.id;

        orders[orderID] = {
          id: doc.id,
          orderID,
          customerEmail: d.customerEmail || null,
          delivererEmail: d.delivererEmail || null,
          vendorEmail: d.vendorEmail || null,
          status: d.status || null,
          items: d.items || [],
          total: d.total || 0,

          createdAt: safeMillis(d.createdAt),
          updatedAt: safeMillis(d.updatedAt),
          orderedAt: safeMillis(d.orderedAt),
          deliveredAt: safeMillis(d.deliveredAt)
        };
      });
    };

    add(customerSnap.docs);
    add(delivererSnap.docs);

    return json({
      success: true,
      orders: Object.values(orders)
    });

  } catch (err) {
    console.error("getAllOrders error:", err);
    return json({ success: false, error: err.message }, 500);
  }
};

// ------------------------------------------------------------
// getAllUsers
// ------------------------------------------------------------
export const getAllUsers = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const snap = await db
      .collection("Users")
      .orderBy("TPIdentity.createdAt", "desc")
      .get();

    const safeMillis = (ts) => {
      if (!ts) return null;
      if (typeof ts.toMillis === "function") return ts.toMillis();
      if (ts?._seconds) return ts._seconds * 1000;
      if (typeof ts === "number") return ts;
      return null;
    };

    const safeNum = (v) =>
      Number.isFinite(Number(v)) ? Number(v) : 0;

    const users = snap.docs.map((doc) => {
      const data = doc.data() || {};
      const id = doc.id;

      const TPIdentity = data.TPIdentity || {};
      const TPLoyalty = data.TPLoyalty || {};
      const TPNotifications = data.TPNotifications || {};
      const TPSecurity = data.TPSecurity || {};

      return {
        id,

        email: TPIdentity.email || null,
        name: TPIdentity.name || null,
        role: TPIdentity.role || "Customer",
        phone: TPIdentity.phone || null,
        country: TPIdentity.country || null,

        loyalty: {
          pointsBalance: safeNum(TPLoyalty.pointsBalance),
          lifetimePoints: safeNum(TPLoyalty.lifetimePoints),
          referralCode: TPLoyalty.referralCode || null,
          referredBy: TPLoyalty.referredBy || null
        },

        notifications: {
          receiveMassEmails: TPNotifications.receiveMassEmails ?? true,
          receiveSMS: TPNotifications.receiveSMS ?? false
        },

        createdAt: safeMillis(TPIdentity.createdAt),
        updatedAt: safeMillis(TPIdentity.updatedAt),
        lastActive: safeMillis(TPSecurity.lastActive),
        lastEarnedDate: safeMillis(TPLoyalty.lastEarnedDate)
      };
    });

    return json({ success: true, users });

  } catch (err) {
    console.error("getAllUsers error:", err);
    return json({ success: false, error: "Server error: " + err.message }, 500);
  }
};

// ------------------------------------------------------------
// verifyToken
// ------------------------------------------------------------
export const verifyToken = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const body = JSON.parse(event.body || "{}");
    const { uid, token } = body;

    if (!uid || !token) {
      return json({ success: false, error: "Missing uid or token" }, 400);
    }

    const userDoc = await db.collection("Users").doc(uid).get();

    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const TPSecurity = userData.TPSecurity || {};

    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const responseIdentity = {
      uid,
      email: TPIdentity.email || null,
      name: TPIdentity.name || TPIdentity.displayName || "",
      role: TPIdentity.role || "Deliverer",
      stripeAccountID: TPIdentity.stripeAccountID || null,
      stripeDashboardURL: TPIdentity.stripeDashboardURL || null,
      displayName: TPIdentity.displayName || TPIdentity.name || null,
      photoURL: TPIdentity.photoURL || null,
      trustedDevice: TPSecurity.trustedDevice ?? false,
      identitySetAt: TPIdentity.identitySetAt || null,
      referralCode: TPIdentity.referralCode || null
    };

    return json({
      success: true,
      token,
      identity: responseIdentity
    });

  } catch (err) {
    console.error("verifyToken ERROR:", err);
    return json({ success: false, error: "Internal server error" }, 500);
  }
};

// ============================================================================
// UNIVERSAL SYS‑CALL FUNCTION — CNS v24‑IMMORTAL Dual‑Band
// ============================================================================
const routingInProgressBands = new Set();

export async function logEvent(eventType, data) {
  const band = resolveBandFromPayload(data || {});
  const dnaTag = resolveDnaTagFromPayload(data || {});
  logCNS("LOG_EVENT", { eventType, band, dnaTag });

  CNSPageScanner.emit("cns-log-event", {
    eventType,
    band,
    dnaTag
  });

  // pre‑validation on every event (band + identity)
  CNS_HEALING.lastBandCheck = safeRun("checkBand", () => checkBand(band));
  CNS_HEALING.lastIdentityCheck = safeRun("checkIdentity", () =>
    checkIdentity({ phase: "logEvent", eventType, band, dnaTag })
  );

  const page =
    hasWindow && window.location
      ? window.location.pathname
      : null;

  if (RouterMemory && typeof RouterMemory.push === "function") {
    RouterMemory.push({
      eventType,
      data,
      page,
      band,
      dnaTag,
      timestamp: ++routerEventSeq
    });
  }

  logCNS("LOG_PUSHED", { eventType, band, dnaTag });

  await healRouterMemoryIfNeeded();

  if (typeof GateHeartbeat === "function") {
    GateHeartbeat();
    logCNS("GATE_HEARTBEAT_SIGNAL_SENT", { band, dnaTag });

    CNSPageScanner.emit("cns-gate-heartbeat", {
      band,
      dnaTag
    });
  }
}

// ============================================================================
// ROUTER MEMORY HEALING — v24 Dual‑Band Aware
// ============================================================================
async function healRouterMemoryIfNeeded() {
  if (!RouterMemory || typeof RouterMemory.getAll !== "function") {
    logCNS("HEAL_SKIP_NO_ROUTER_MEMORY");

    CNSPageScanner.emit("cns-heal-skip-no-router-memory", {});
    return;
  }

  const logs = RouterMemory.getAll();
  if (!logs || logs.length === 0) {
    logCNS("HEAL_SKIP_EMPTY");

    CNSPageScanner.emit("cns-heal-skip-empty", {});
    return;
  }

  CNS_HEALING.lastHealRequestCount = logs.length;

  logCNS("HEAL_REQUEST", { count: logs.length });

  CNSPageScanner.emit("cns-heal-request", {
    count: logs.length
  });

  try {
    const data = await Transport.callCheckRouterMemory(logs);

    if (data && Array.isArray(data.logs)) {
      if (typeof RouterMemory.replaceAll === "function") {
        RouterMemory.replaceAll(data.logs);
      } else {
        RouterMemory._logs = data.logs;
      }
      CNS_HEALING.lastHealAppliedCount = data.logs.length;

      logCNS("HEAL_APPLIED", { count: data.logs.length });

      CNSPageScanner.emit("cns-heal-applied", {
        count: data.logs.length
      });
    } else if (data === null) {
      logCNS("HEAL_OFFLINE_NO_REMOTE");

      CNSPageScanner.emit("cns-heal-offline-no-remote", {});
    } else {
      logCNS("HEAL_DEGRADED");

      CNSPageScanner.emit("cns-heal-degraded", {});
    }
  } catch (err) {
    const msg = String(err);
    CNS_HEALING.lastHealError = msg;

    logCNS("HEAL_ERROR", { message: msg });

    CNSPageScanner.emit("cns-heal-error", {
      message: msg
    });
  }
}

// ============================================================================
// ROUTE‑DOWN ALERT — v24 Continuance‑First
// ============================================================================
async function triggerRouteDownAlert(error, type, band = ROUTE_BANDS.SYMBOLIC) {
  // capture band + identity drift at alert time
  CNS_HEALING.lastBandCheck = safeRun("checkBand", () => checkBand(band));
  CNS_HEALING.lastIdentityCheck = safeRun("checkIdentity", () =>
    checkIdentity({ phase: "routeDownAlert", type, band, error })
  );

  logCNS("ALERT_TRIGGER", { error, type, band });

  CNSPageScanner.emit("cns-alert-trigger", {
    error,
    type,
    band
  });

  try {
    await Transport.callRouteDownAlert(error, type);
    logCNS("ALERT_SENT", { type, band });

    CNSPageScanner.emit("cns-alert-sent-final", {
      error,
      type,
      band
    });
  } catch (err) {
    const msg = String(err);
    logCNS("ALERT_ERROR", { message: msg, band });

    CNSPageScanner.emit("cns-alert-error", {
      error,
      type,
      band,
      message: msg
    });
  }
}

// ============================================================================
// ROUTE — CNS v24‑IMMORTAL Dual‑Band
// ============================================================================
export async function route(type, payload = {}) {
  const band = resolveBandFromPayload(payload);
  const dnaTag = resolveDnaTagFromPayload(payload);

  // pre‑validation on route entry
  CNS_HEALING.lastBandCheck = safeRun("checkBand", () => checkBand(band));
  CNS_HEALING.lastIdentityCheck = safeRun("checkIdentity", () =>
    checkIdentity({ phase: "route", type, band, dnaTag })
  );

  if (routingInProgressBands.has(band)) {
    const result = {
      error: "routeRecursionDetected",
      details: "Routing attempted while routing already in progress for this band",
      band
    };

    CNSPageScanner.emit("cns-route-recursion-detected", {
      type,
      band,
      dnaTag
    });

    return result;
  }

  routingInProgressBands.add(band);

  logCNS("ROUTE_CALL", { type, band, dnaTag });

  CNSPageScanner.emit("cns-route-call", {
    type,
    band,
    dnaTag
  });

  await logEvent("routeCall", { type, payload, band, dnaTag, ...CNS_CONTEXT });
  await healRouterMemoryIfNeeded();

  try {
    const json = await Transport.callEndpoint(type, payload);

    routeFailureCount = 0;
    routingInProgressBands.delete(band);

    logCNS("ROUTE_RESPONSE", { type, band, dnaTag });
    logEvent("routeResponse", { type, payload, json, band, dnaTag, ...CNS_CONTEXT });

    CNSPageScanner.emit("cns-route-response", {
      type,
      band,
      dnaTag
    });

    return json;

  } catch (err) {
    const msg = String(err);
    const signature = makeErrorSignature(err);

    routeFailureCount++;
    CNS_HEALING.lastRouteErrorSignature = signature;
    CNS_HEALING.lastRouteBand = band;
    CNS_HEALING.lastRouteDnaTag = dnaTag;

    logCNS("ROUTE_ERROR", {
      type,
      message: msg,
      signature,
      count: routeFailureCount,
      band,
      dnaTag
    });

    CNSPageScanner.emit("cns-route-error", {
      type,
      band,
      dnaTag,
      message: msg,
      signature,
      count: routeFailureCount
    });

    logEvent("routeError", {
      type,
      payload,
      error: msg,
      signature,
      band,
      dnaTag,
      ...CNS_CONTEXT
    });

    if (msg.includes("Cannot find module") || msg.includes("already been declared")) {
      routingInProgressBands.delete(band);

      const result = { error: "importConflict", details: msg, signature, band, dnaTag };

      CNSPageScanner.emit("cns-route-import-conflict", {
        type,
        band,
        dnaTag,
        message: msg,
        signature
      });

      return result;
    }

    if (msg.includes("process is not defined")) {
      if (RouterMemory && typeof RouterMemory.push === "function") {
        RouterMemory.push({
          eventType: "frontendEnvMismatch",
          repairHint: "Replace process.env.* with window.PULSE_*",
          timestamp: ++routerEventSeq,
          signature,
          band,
          dnaTag
        });
      }
      routingInProgressBands.delete(band);

      const result = { error: "frontendEnvMismatch", details: msg, signature, band, dnaTag };

      CNSPageScanner.emit("cns-route-frontend-env-mismatch", {
        type,
        band,
        dnaTag,
        message: msg,
        signature
      });

      return result;
    }

    if (msg.includes("Maximum call stack size exceeded")) {
      routingInProgressBands.delete(band);

      const result = { error: "routeRecursionLoop", details: msg, signature, band, dnaTag };

      CNSPageScanner.emit("cns-route-recursion-loop", {
        type,
        band,
        dnaTag,
        message: msg,
        signature
      });

      return result;
    }

    const offlineMode =
      hasWindow && window.PULSE_OFFLINE_MODE === true;

    if (!offlineMode && routeFailureCount === 1) {
      logCNS("ROUTE_RETRY", { type, band, dnaTag });

      CNSPageScanner.emit("cns-route-retry", {
        type,
        band,
        dnaTag,
        message: msg,
        signature
      });

      try {
        const retryJson = await Transport.callEndpoint(type, payload);

        routeFailureCount = 0;
        routingInProgressBands.delete(band);

        logCNS("ROUTE_RETRY_SUCCESS", { type, band, dnaTag });
        logEvent("routeRetrySuccess", {
          type,
          payload,
          retryJson,
          signature,
          band,
          dnaTag,
          ...CNS_CONTEXT
        });

        CNSPageScanner.emit("cns-route-retry-success", {
          type,
          band,
          dnaTag,
          signature
        });

        return retryJson;

      } catch (retryErr) {
        const retryMsg = String(retryErr);

        logCNS("ROUTE_RETRY_FAIL", {
          type,
          message: retryMsg,
          signature,
          band,
          dnaTag
        });

        CNSPageScanner.emit("cns-route-retry-fail", {
          type,
          band,
          dnaTag,
          message: retryMsg,
          signature
        });

        await triggerRouteDownAlert(retryMsg, type, band);
        routeFailureCount = 0;
      }
    }

    routingInProgressBands.delete(band);

    const result = {
      error: "Frontend connector failed",
      details: msg,
      signature,
      band,
      dnaTag
    };

    CNSPageScanner.emit("cns-route-failed-final", {
      type,
      band,
      dnaTag,
      message: msg,
      signature
    });

    return result;
  }
}

// ============================================================================
// HEALING ENTRY POINT — v24 Dual‑Band
// ============================================================================
export async function heal(type, payload) {
  const band = resolveBandFromPayload(payload || {});
  const dnaTag = resolveDnaTagFromPayload(payload || {});
  logCNS("HEAL_CALL", { type, band, dnaTag });

  CNSPageScanner.emit("cns-heal-call", {
    type,
    band,
    dnaTag
  });

  // pre‑validation on heal entry
  CNS_HEALING.lastBandCheck = safeRun("checkBand", () => checkBand(band));
  CNS_HEALING.lastIdentityCheck = safeRun("checkIdentity", () =>
    checkIdentity({ phase: "heal", type, band, dnaTag })
  );

  logEvent("healingRequest", { type, payload, band, dnaTag, ...CNS_CONTEXT });

  const result = await route(type, payload);

  CNSPageScanner.emit("cns-heal-result", {
    type,
    band,
    dnaTag
  });

  return result;
}

// ============================================================================
// CNS NERVOUS SYSTEM DIAGNOSTICS SURFACE
// ============================================================================
export function getCNSNervousSystemDiagnostics() {
  return { ...CNS_HEALING };
}

// ============================================================================
// PUBLIC ORGAN SURFACE
// ============================================================================
export const PulseOSCNSNervousSystem = {
  PulseRole,
  meta: PulseOSCNSNervousSystemMeta,
  route,
  logEvent,
  heal,
  getDiagnostics: getCNSNervousSystemDiagnostics
};

// ============================================================================
// ORIGINAL DESIGN RESTORED — CNS auto‑boots DualBand AI (v24‑Immortal)
// ============================================================================
(async () => {
  try {
    const ai = await createDualBandOrganism({
      cnsContext: CNS_CONTEXT,
      band: ROUTE_BANDS.DUAL
    });

    const channel = new BroadcastChannel("PulseCNS");

    ai.on("event", (data) => {
      channel.postMessage({
        type: "DUALBAND_AI_EVENT",
        data,
        cnsContext: { band: ROUTE_BANDS.DUAL }
      });
    });

    ai.on("boot-organism", (bootOptions) => {
      channel.postMessage({
        type: "DUALBAND_BOOT",
        bootOptions,
        cnsContext: { band: ROUTE_BANDS.DUAL }
      });
    });

    console.log("[CNS v24] DualBand AI auto‑booted");
  } catch (err) {
    console.error("[CNS v24] DualBand AI auto‑boot FAILED:", err);
  }
})();
