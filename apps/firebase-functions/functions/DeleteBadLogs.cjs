const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteBadLogs() {
  const cutoff = new Date("2026-02-03"); // <-- REAL DATE

  const snap = await db
    .collection("EmailLogs")
    .where("status", "==", "Pending")
    .get();

  console.log("Found:", snap.size, "logs to delete");

  const batch = db.batch();
  snap.forEach(doc => batch.delete(doc.ref));

  await batch.commit();
  console.log("Done deleting logs");
}

deleteBadLogs();