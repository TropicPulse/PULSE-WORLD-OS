/* global log,warn,error */
// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-BAND/PULSE-X/PulseWorldVault-v20.js
// ORGAN: PulseWorldVault-v20 (Vault Organ)
// LAYER: PULSE-WORLD / MEMORY-CORE / VAULT / IMMORTAL-V20
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//  ██╗   ██╗ █████╗ ██╗   ██╗██╗████████╗
//  ██║   ██║██╔══██╗██║   ██║██║╚══██╔══╝
//  ██║   ██║███████║██║   ██║██║   ██║   
//  ╚██╗ ██╔╝██╔══██║██║   ██║██║   ██║   
//   ╚████╔╝ ██║  ██║╚██████╔╝██║   ██║   
//    ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚═╝   ╚═╝   
//
// ============================================================================
// PAGE INDEX — SOURCE OF TRUTH FOR THIS MODULE
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • The **Vault Organ** for Pulse‑World v20
// • A shared backend logic module used by many subsystems
// • A deterministic, side‑effect‑free utility layer
// • A Firestore writer for VaultHistory, IdentityHistory, CHANGES
// • A loyalty + wallet helper
// • A profanity‑cleaner + text normalizer
// • A security patch engine (Twilight Patch)
// • A Stripe balance lookup helper
// • A reminder parser + builder
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a Netlify handler (except the small router at bottom)
// • Not a UI renderer
// • Not a connector
// • Not a compute engine
// • Not a webhook processor
// • Not allowed to mutate global state
//
// RESPONSIBILITIES
// ----------------
// • Provide Vault‑level utilities for:
//     – Security patching
//     – Loyalty saving/loading
//     – Vault visit logging
//     – Stripe balance lookup
//     – Text sanitization + playful profanity filter
//     – Reminder parsing + normalization
//     – Email template rendering
// • Provide deterministic, reusable logic for all Vault‑related flows
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • Pure functions for currency, sanitization, loyalty prediction
// • Firestore writes for VaultHistory, CHANGES, IdentityHistory
// • Twilight Patch application + logging
// • Reminder natural language parsing + normalization
// • Stripe balance retrieval for connected accounts
//
// ALLOWED IMPORTS
// ---------------
// • admin, db (PulseWorldGenome-v20)
// • Stripe organ (getStripe)
// • emailTemplates (PulseOSLongTermMemory)
// • No new dependencies unless Aldwyn approves
//
// FORBIDDEN IMPORTS
// -----------------
// • window.*, document.*, DOM APIs
// • UI modules
// • Any dynamic import
//
// DEPLOYMENT RULES
// ----------------
// • Runs ONLY on backend (Node)
// • Must remain ESM
// • Must remain deterministic
// • Must remain side‑effect‑free except Firestore writes
//
// SAFETY CONSTRAINTS
// ------------------
// • Never log secrets
// • Never expose internal stack traces
// • Never mutate unrelated user fields
// • Always sanitize text before storing
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
//
// Enables:
//   • Self‑healing
//   • Drift detection
//   • Organism‑level routing
//   • Contract validation
//   • Future evolution
//
// DO NOT REMOVE.
//

export const AI_EXPERIENCE_META = {
  identity: "PulseWorldVault.VaultOrgan",
  version: "v20-Immortal",
  layer: "pulse_world_vault",
  role: "memory_core_utility",
  lineage: [
    "Vault-v12",
    "Vault-v14-Immortal",
    "Vault-v16-Immortal-Evo",
    "PulseWorldVault-v20-Immortal"
  ],

  evo: {
    driftProof: true,
    deterministic: true,
    zeroState: false, // interacts with Firestore
    zeroTiming: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    futureEvolutionReady: true
  },

  contracts: {
    organ: "PulseWorldVault-v20",
    mesh: "PulseMesh-v20",
    send: "PulseSend-v20",
    loyalty: "TPLoyalty-v20",
    wallet: "TPWallet-v20",
    history: "VaultHistory-v20"
  },

  safety: {
    neverLogSecrets: true,
    neverExposeTokens: true,
    neverUseWindow: true,
    neverUseDynamicImport: true,
    sanitizeAllText: true
  }
};

// ============================================================================
// IMPORTS
// ============================================================================

import { admin, db } from "../../PULSE-BAND/PULSE-X/PulseWorldGenome-v17.js";
import { getStripe as Stripe } from "./stripe.js";
import emailTemplates from "../../PULSE-BAND/PULSE-OS/PulseOSLongTermMemory.js";

// ============================================================================
// VAULT PATCH: TWILIGHT
// ============================================================================


export const VAULT_PATCH_TWILIGHT = {
  signature: "Twilight",
  invoked: "2026-04-07T04:00:00-07:00", // 4 AM MST
  version: 2,
  type: "security-data-integrity",
  glyph: "🌒",
  description: "The first protective veil cast by the Vault Spirit during a 4 AM development session.",
  note: "Named 'Twilight' because it was created in the quiet hours before dawn."
};


// ============================================================================
// EMAIL TEMPLATE RENDERING
// ============================================================================

export function getEmailHTML(type, payload) {
  return emailTemplates[type].html(payload);
}

// ============================================================================
// PIXEL SENDER
// ============================================================================

export function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}

// ============================================================================
// STRIPE BALANCE LOOKUP
// ============================================================================

export async function findUserStripeBalance(stripeAccountID, stripeSecret) {
  log("🔵 [findUserStripeBalance] START", { stripeAccountID });

  const stripe = new Stripe(stripeSecret);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

    const available = balance?.available?.[0]?.amount ?? 0;
    const pending = balance?.pending?.[0]?.amount ?? 0;

    const toBZD = (v) => {
      const n = Number(v);
      return isNaN(n) ? "0.00" : (n / 100).toFixed(2);
    };

    const result = {
      pendingBalance: toBZD(pending),
      availableBalance: toBZD(available)
    };

    log("🟢 [findUserStripeBalance] RESULT", result);
    return result;

  } catch (err) {
    error("❌ [findUserStripeBalance] ERROR:", {
      message: err.message,
      type: err.type,
      code: err.code
    });

    return {
      pendingBalance: "N/A",
      availableBalance: "N/A"
    };
  }
}

// ============================================================================
// SECURITY PATCH LOGGING
// ============================================================================

export async function logSecurityPatch(uid, patch, reason = "auto") {
  if (!uid) return;

  try {
    const ref = db
      .collection("securityPatchHistory")
      .doc(uid)
      .collection("entries")
      .doc();

    await ref.set({
      uid,
      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      reason,
      invoked: patch.invoked,
      description: patch.description,
      note: patch.note,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    log("🧾 Security patch logged:", uid, patch.signature);
  } catch (err) {
    error("🔥 logSecurityPatch failed:", err);
  }
}

// ============================================================================
// APPLY TWILIGHT PATCH
// ============================================================================

export async function applyTwilightPatch(uid, reason = "auto") {
  if (!uid) return;

  try {
    const patch = VAULT_PATCH_TWILIGHT;

    const userRef = db.collection("Users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      log("❌ User not found:", uid);
      return;
    }

    const data = snap.data() || {};
    const sec = data.TPSecurity || {};

    const updatedSecurity = {
      ...sec,

      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      lastPatchedAt: admin.firestore.FieldValue.serverTimestamp(),

      requiresPin: sec.requiresPin ?? true,
      dangerMode: sec.dangerMode ?? false,

      calculationVersion: sec.calculationVersion || 1,

      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await userRef.update({ TPSecurity: updatedSecurity });

    log("🌒 Twilight Patch applied to:", uid, updatedSecurity);

    await logSecurityPatch(uid, patch, reason);
  } catch (err) {
    error("🔥 applyTwilightPatch failed:", err);
  }
}

// ============================================================================
// CURRENCY HELPERS
// ============================================================================

export function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

export function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}

// ============================================================================
// TEXT SANITIZATION + PLAYFUL PROFANITY FILTER
// ============================================================================

export function sanitizeEverything(input) {
  if (!input) return "";

  let text = String(input);

  text = text.replace(/\s+/g, " ").trim();
  text = text.replace(/[\u200B-\u200F\uFEFF]/g, "");
  text = text.replace(/,/g, " • ");
  text = text.replace(/'/g, "’");
  text = text.replace(/\\/g, "");
  text = text.replace(/\.{2,}/g, ".");

  text = playfulClean(text);

  return text.trim();
}

export function playfulClean(input) {
  if (!input) return "";

  const dictionary = {
    word_f: {
      noun: ["pineapple","coconut","marshmallow","iguana nugget","hurricane dumpling","reef goblin"],
      verb: ["juggle","tap‑dance","boogie","shimmy","cha-cha","crab‑walk"],
      adj: ["spicy","wobbly","chaotic","sun‑kissed","unhinged","reef‑powered"]
    },
    word_s: {
      noun: ["guava","papaya","mango chunk","sand pebble","fruit catastrophe","tide‑sauce"],
      verb: ["splash","scoot","shuffle","wiggle","plop","sploosh"],
      adj: ["messy","funky","wonky","dusty","sticky","soggy"]
    },
    word_b: {
      noun: ["seashell","sunbeam","toucan","pelican","sass‑parrot","beach diva"],
      verb: ["chirp","wiggle","sass","squawk","side‑eye","strut"],
      adj: ["salty","spicy","sassy","stormy","feisty","sun‑dramatic"]
    },
    word_c: {
      noun: ["lava pearl","reef blossom","storm crystal","moon pebble","tidal rune","volcano sprinkle"],
      adj: ["ferocious","untamed","wild‑eyed","tempest‑touched","mythic","overdramatic"]
    },
    word_a: {
      noun: ["iguana","pelican","sand crab","reef turtle","snorkel gremlin","beach potato"],
      adj: ["chunky","sun‑kissed","sandy","reef‑brained","lumpy","tide‑soaked"]
    },
    word_d: {
      noun: ["sand dollar","reef pebble","tide pool","conch shell","sunburn moment","beach oopsie"],
      adj: ["breezy","sun‑drenched","tropical","warm‑hearted","dramatic","over‑toasted"]
    }
  };

  const alias = {
    damn: "word_d",
    darn: "word_d",
    dang: "word_d",
    fuck: "word_f",
    fucking: "word_f",
    shit: "word_s",
    bitch: "word_b",
    cunt: "word_c",
    ass: "word_a",
    asshole: "word_a"
  };

  const detectPOS = (words, i) => {
    const prev = words[i - 1]?.toLowerCase();
    if (prev && ["a","an","the","my","your","his","her","this","that"].includes(prev)) return "adj";
    if (prev && ["i","you","we","they","he","she","it"].includes(prev)) return "verb";
    return "noun";
  };

  const words = input.split(/\b/);

  const cleaned = words.map((word, i) => {
    const stripped = word.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, "");
    const key = alias[stripped];
    if (!key) return word;

    const pos = detectPOS(words, i);
    const options = dictionary[key][pos] || dictionary[key].noun;
    const replacement = options[Math.floor(Math.random() * options.length)];

    return word[0] === word[0].toUpperCase()
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });

  return cleaned.join("");
}

export function BECLEAN(input) {
  return playfulClean(sanitizeEverything(input));
}

// ============================================================================
// VAULT VISIT LOGGING
// ============================================================================

export async function saveLastVaultVisit(userId) {
  const ref = db.collection("Users").doc(userId);

  const payload = {
    TPWallet: {
      lastVaultVisit: admin.firestore.Timestamp.now(),
      vaultVisitCount: admin.firestore.FieldValue.increment(1)
    }
  };

  await ref.set(payload, { merge: true });

  // CHANGES log
  await db.collection("CHANGES").add({
    type: "vaultVisit",
    uid: userId,
    payload,
    reason: "vaultVisit",
    actor: "user",
    source: "app",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // IdentityHistory snapshot
  await db
    .collection("IdentityHistory")
    .doc(userId)
    .collection("snapshots")
    .add({
      snapshotType: "vaultVisit",
      payload,
      reason: "vaultVisit",
      actor: "user",
      source: "app",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

  // VaultHistory entry
  await db
    .collection("VaultHistory")
    .doc(userId)
    .collection("entries")
    .add({
      type: "visit",
      userAction: "opened_vault",
      systemResponse: "vault_loaded_successfully",
      metadata: payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
}

export async function getLastVaultVisit(userId) {
  const snap = await db.collection("Users").doc(userId).get();

  if (!snap.exists) {
    return {
      lastVaultVisit: null,
      vaultVisitCount: 0
    };
  }

  const data = snap.data().TPWallet || {};

  return {
    lastVaultVisit: data.lastVaultVisit || null,
    vaultVisitCount: data.vaultVisitCount || 0
  };
}

// ============================================================================
// LOYALTY LOAD + SAVE
// ============================================================================

export async function loadLoyalty(userId) {
  const snap = await db.collection("Users").doc(userId).get();
  if (!snap.exists) return null;

  return snap.data().TPLoyalty || null;
}

export async function saveLoyalty(userId, loyalty) {
  const ref = db.collection("Users").doc(userId);

  const allowedFields = [
    "tier",
    "tierKey",
    "tierMultiplier",
    "seasonalActive",
    "seasonalName",
    "seasonalMultiplier",
    "streakCount",
    "streakMultiplier",
    "streakExpires",
    "calculationVersion"
  ];

  const filtered = {};

  for (const key of allowedFields) {
    if (loyalty[key] !== undefined) {
      filtered[key] = loyalty[key];
    }
  }
  filtered.updated = admin.firestore.Timestamp.now();

  await ref.set({ TPLoyalty: filtered }, { merge: true });

  // CHANGES log
  await db.collection("CHANGES").add({
    type: "loyaltyUpdate",
    uid: userId,
    payload: filtered,
    reason: "loyaltyUpdate",
    actor: "system",
    source: "app",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // IdentityHistory snapshot
  await db
    .collection("IdentityHistory")
    .doc(userId)
    .collection("snapshots")
    .add({
      snapshotType: "loyaltyUpdate",
      payload: filtered,
      reason: "loyaltyUpdate",
      actor: "system",
      source: "app",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

  // VaultHistory entry
  await db
    .collection("VaultHistory")
    .doc(userId)
    .collection("entries")
    .add({
      type: "loyalty_update",
      userAction: "vault_loyalty_saved",
      systemResponse: "loyalty_updated",
      metadata: filtered,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
}
