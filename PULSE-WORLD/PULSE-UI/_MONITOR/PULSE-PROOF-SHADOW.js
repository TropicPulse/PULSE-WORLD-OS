/* ============================================================================
   PULSE-WORLD ORGAN — PulseWorldFirebaseShadow (v24 SHADOW)
   Frontend-safe Firebase organ for Portal + Logger + Touch + RouteCarpet
   ----------------------------------------------------------------------------
   ROLE:
     - Provides SAFE Firebase Client SDK access on frontend
     - No Admin SDK, no secrets, no private keys
     - Used for: logs, routes, snapshots, metadata, analytics
     - NOT used for: auth verification, privileged writes, admin tasks

   PLACEMENT:
     /PULSE-WORLD/PULSE-WORLD-FRONTEND/PulseWorldFirebaseShadow-v24.js

   NOTES:
     - This is the SHADOW organ (frontend mirror of backend FirebaseGenome)
     - Safe for browser, safe for public, safe for Portal + Logger
     - All writes must obey Firebase Security Rules
     - No privileged operations allowed
============================================================================ */

//
// 1 — IMPORT FIREBASE CLIENT SDK (SAFE FOR FRONTEND)
// ----------------------------------------------------------------------------
// These imports contain NO secrets, NO admin access, NO private keys.
// They are designed for browser use.
//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getDatabase, ref, set as rtdbSet, get as rtdbGet} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { getStorage, ref as storageRef, uploadString} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const C_ID   = "color:#8D6E63; font-weight:bold; font-family:monospace;"; // Cyan
const C_OK   = "color:#00FF9C; font-family:monospace;";                   // Neon Green
const C_INFO = "color:#E8F8FF; font-family:monospace;";                   // White
const C_WARN = "color:#FFE066; font-family:monospace;";                   // Yellow
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;"; // Red
//
// 2 — FIREBASE CONFIG (PUBLIC, SAFE)
// ----------------------------------------------------------------------------
// This is the SAME config used everywhere. It is NOT secret.
// Firebase Client SDK config is PUBLIC BY DESIGN.
//
const firebaseConfig = {
  apiKey: "AIzaSyD4I5YDtZMMC_tDuwR9CEjhs_iAdrLzthQ",
  authDomain: "tropic-pulse.firebaseapp.com",
  projectId: "tropic-pulse",
  storageBucket: "tropic-pulse.firebasestorage.app",
  messagingSenderId: "642785071979",
  appId: "1:642785071979:web:4287c6bdf51f5233db722e"
};


//
// 3 — INITIALIZE FRONTEND FIREBASE APP
// ----------------------------------------------------------------------------
// This creates a SAFE frontend Firebase instance.
// No Admin SDK. No privileged access.
//
const app = initializeApp(firebaseConfig);

//
// 4 — FRONTEND FIREBASE SERVICES
// ----------------------------------------------------------------------------
// These are safe for browser use.
//
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);


//
// 5 — SHADOW ORGAN API (SAFE FRONTEND FUNCTIONS)
// ----------------------------------------------------------------------------
// These functions are used by Portal + Logger + Touch + RouteCarpet.
// They write ONLY non-sensitive metadata.
// They obey Firebase Security Rules.
// They NEVER bypass rules.
// They NEVER perform admin operations.
//
export const PulseWorldFirebaseShadow = Object.freeze({

  //
  // ⭐ Save daily route map (Portal)
  //
  async savePageRoutes(page, routes) {
    try {
      const today = new Date().toISOString().slice(0, 10);

      await SetDoc(Doc(firestore, "pulse_page_routes", page), {
        date: today,
        routes,
        epoch: Date.now()
      });

      console.log("[FirebaseShadow] Saved page routes →", page);
    } catch (err) {
      console.error("[FirebaseShadow] FAILED savePageRoutes →", err);
    }
  },

  //
  // ⭐ Load page routes (Portal)
  //
  async loadPageRoutes(page) {
    try {
      const snap = await GetDoc(Doc(firestore, "pulse_page_routes", page));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error("[FirebaseShadow] FAILED loadPageRoutes →", err);
      return null;
    }
  },

  //
  // ⭐ Save daily organism snapshot (OrganismMap)
  //
  async saveOrganismSnapshot(snapshot) {
    try {
      await SetDoc(Doc(firestore, "pulse_organism_snapshot", "daily"), snapshot);
      console.log("[FirebaseShadow] Saved organism snapshot");
    } catch (err) {
      console.error("[FirebaseShadow] FAILED saveOrganismSnapshot →", err);
    }
  },

  //
  // ⭐ Load organism snapshot
  //
  async loadOrganismSnapshot() {
    try {
      const snap = await GetDoc(Doc(firestore, "pulse_organism_snapshot", "daily"));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error("[FirebaseShadow] FAILED loadOrganismSnapshot →", err);
      return null;
    }
  },

  //
  // ⭐ Log event (Logger)
  //
  async logEvent(type, payload) {
    try {
      const id = String(Date.now());
      await SetDoc(Doc(firestore, "pulse_logs", id), {
        type,
        payload,
        epoch: Date.now()
      });

      console.log("[FirebaseShadow] Logged event →", type);
    } catch (err) {
      console.error("[FirebaseShadow] FAILED logEvent →", err);
    }
  },

  //
  // ⭐ Save per-system organism snapshot (hourly)
  //
  async saveSystemSnapshot(systemName, snapshot) {
    try {
      const epoch = Date.now();
      const hourKey = new Date().toISOString().slice(0, 13); // "YYYY-MM-DDTHH"

      const systemPath = `ORGANISM/SYSTEMS/${systemName}`;

      // 1 — Load existing latest snapshot
      const latestRef = Doc(firestore, systemPath, "latest");
      const latestSnap = await GetDoc(latestRef);

      // 2 — Archive previous snapshot
      if (latestSnap.exists()) {
        const historyRef = Doc(firestore, `${systemPath}/history`, String(latestSnap.data().epoch));
        await SetDoc(historyRef, latestSnap.data());
      }

      // 3 — Save new snapshot
      await SetDoc(latestRef, {
        epoch,
        hour: hourKey,
        snapshot
      });

      console.log(`[FirebaseShadow] Saved system snapshot → ${systemName}`);

    } catch (err) {
      console.error("[FirebaseShadow] FAILED saveSystemSnapshot →", err);
    }
  },

  //
  // ⭐ Load latest system snapshot
  //
  async loadSystemSnapshot(systemName) {
    try {
      const snap = await GetDoc(Doc(firestore, `ORGANISM/SYSTEMS/${systemName}`, "latest"));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error("[FirebaseShadow] FAILED loadSystemSnapshot →", err);
      return null;
    }
  },

  //
  // ⭐ Save JSON to Storage
  //
  async saveJSON(path, obj) {
    try {
      const ref = StorageRef(Storage, path);
      await UploadString(ref, JSON.stringify(obj), "raw");
      console.log("[FirebaseShadow] Saved JSON →", path);
    } catch (err) {
      console.error("[FirebaseShadow] FAILED saveJSON →", err);
    }
  }
});

//
// 6 — GLOBAL ATTACHMENT
// ----------------------------------------------------------------------------
// Makes the organ available everywhere on frontend.
//
window.PulseWorldFirebaseShadow = PulseWorldFirebaseShadow;
console.log(
      "%c[PulseFirebaseShadow] %cSHADOW organ %c→ %s",
      C_ID, C_INFO, C_OK, "Ready"
    );

  // Export the REAL Firestore instance
// ⭐ Export REAL Firestore + helpers
export const firestore = db;
export const Doc = doc;
export const RTDB = rtdb;
export const SetDoc = setDoc;
export const GetDoc = getDoc;
export const UpdateDoc = updateDoc;
export const Collection = collection;

// ⭐ Export REAL Storage helpers
export const Storage = storage;
export const StorageRef = storageRef;
export const UploadString = uploadString;

