// ============================================================================
//  PULSE TRUST EVIDENCE v20.0.0 — IMMORTAL CONSTITUTIONAL EVIDENCE FABRIC
//  RAW • RAW_AI • AI  —  FULL STACK EVIDENCE FOR TRUST & TRANSPARENCY
//  v20+: Band-integrated, Evidential Records–native, CNS-aware
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustEvidence
  version: 20.0.0
  tier: IMMORTAL
  role: trust_evidence_fabric
  mind: false

  description:
    "Non-mind constitutional evidence fabric. Pulls RAW, RAW_AI, and AI-layer
     signals from world, user, trust, jury, expansion, overmind, band, and infra
     subsystems. Freezes them into immutable evidence packets for transparency,
     drift detection, and creator oversight. Never interprets, never judges,
     never rewrites."

  guarantees:
    - "Never performs AI reasoning."
    - "Never interprets or judges evidence."
    - "Never rewrites or mutates stored records."
    - "Always preserves RAW signals exactly as received."
    - "Always categorizes evidence as RAW / RAW_AI / AI."
    - "Always timestamps and freezes evidence packets."
    - "Always remains deterministic and drift-proof."

  boundaries:
    - "Cannot classify behavior as good/bad."
    - "Cannot infer intent or motivation."
    - "Cannot perform legal, moral, or ethical reasoning."
    - "Cannot generate opinions or narratives."
    - "Cannot alter upstream subsystem outputs."

  identity:
    band: "trust"
    type: "organ"
    mind: false
    immutable: true

  lineage:
    parent: "PulseEvidenceCore-v20"
    evolution: "v20++ IMMORTAL — CNS-integrated constitutional trust evidence fusion"

  safety:
    - "No legal framing."
    - "No harm-related interpretation."
    - "No judgment of people or actions."
    - "Technical and structural evidence only."

  integration:
    receives:
      - PulseAIWorldCore.buildAdvantageContext()
      - PulseAIWorldCore.snapshotWorld()
      - PulseUser.citizenWitness / snapshotUser()
      - PulseTrust.snapshot()
      - JuryFrame.snapshotFeed() / snapshot()
      - JuryBoxCamera.snapshot()
      - JuryCouncil.snapshot()
      - ExpansionCompliance.snapshot()
      - OvermindPrime.snapshotMeta() / snapshotTrust()
      - Server.snapshot()
      - Castle.snapshot()
      - PulseWorldBand.snapshotBand()          // v20+: CNS snapshot
    feeds:
      - OvermindPrime (trustSnapshot)
      - PulseTrust (evidence history)
      - Creator tools (inspection, oversight)
      - Debug / audit tooling
      - PulseEvidenceCore-v20 (global evidential records)

  contract:
    input:
      - captureEvidence(label, context)
      - recordRaw(data)
      - recordRawAI(data)
      - recordAI(data)
    output:
      - getEvidenceHistory()
      - getLatestPacket()
      - getTimeline()
      - getByCategory(category)
      - getByLabel(label)

  immortal:
    drift_protection: true
    mutation_protection: true
    deterministic: true
    constitutional: true
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝██╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { admin, db } from "../X-PULSE-X/PulseWorldFirebaseGenome-v20.js";
// ============================================================================
//  META EXPORT
// ============================================================================
export const PulseTrustEvidenceMeta = Object.freeze({
  id: "PulseTrustEvidence-v20++",
  version: "20.0.0",
  role: "trust_evidence_fabric",
  mind: false,
  description:
    "IMMORTAL non-mind trust evidence fabric for RAW / RAW_AI / AI signals, CNS-integrated.",
  identity: {
    type: "organ",
    name: "PulseTrustEvidence",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    categories: ["RAW", "RAW_AI", "AI"],
    cnsIntegrated: true,
    evidentialRecordsNative: true
  }
});

// ============================================================================
//  CLASS — CONSTITUTIONAL TRUST EVIDENCE FABRIC v20
// ============================================================================
export class PulseTrustEvidence {
  constructor(config = {}) {
    this.config = {
      id: PulseTrustEvidenceMeta.id,
      ...config
    };

    // Upstream organs / providers (pull-only)
    this.worldCore = config.worldCore || null;           // PulseAIWorldCore / PulseWorldCore
    this.userCore = config.userCore || null;             // PulseUser / citizenWitness
    this.trustCore = config.trustCore || null;           // PulseTrust
    this.juryFrame = config.juryFrame || null;           // JuryFrame
    this.juryBoxCamera = config.juryBoxCamera || null;   // JuryBoxCamera
    this.juryCouncil = config.juryCouncil || null;       // JuryCouncil
    this.expansionCompliance = config.expansionCompliance || null;
    this.overmind = config.overmind || null;             // OvermindPrime meta/trust snapshot
    this.server = config.server || null;                 // Server snapshot
    this.castle = config.castle || null;                 // Castle snapshot

    // v20+: CNS / Band integration
    this.bandCore = config.bandCore || null;             // PulseWorldBand / CheckBand CNS

    // Optional underlying evidence core (append-only log, global evidential records)
    this.evidenceCore = config.evidenceCore || null;     // PulseEvidenceCore-v20
    this.records = [];                                   // local append-only if no evidenceCore

    // Lightweight index (metadata-only, never mutates packets)
    this.index = {
      byLabel: new Map(),   // label -> [packetRefs]
      byCategory: {
        RAW: [],
        RAW_AI: [],
        AI: []
      }
    };

    this.logger = config.logger || console;
  }

  // ========================================================================
  //  CAPTURE FULL EVIDENCE PACKET (CNS-AWARE)
// ========================================================================
  captureEvidence(label = "tick", context = {}) {
  // Deterministic timestamp — NEVER Date.now()
  const resolvedTs = context.ts ?? admin.firestore.Timestamp.now();

  const worldAdvantage =
    this._safeCall(this.worldCore, "buildAdvantageContext") || null;
  const worldSnapshot =
    this._safeCall(this.worldCore, "snapshotWorld") || null;

  const citizenWitness =
    this._safeCall(this.userCore, "snapshotCitizenWitness") ||
    this._safeCall(this.userCore, "snapshotUser") ||
    null;

  const trustSnapshot = this._safeCall(this.trustCore, "snapshot") || null;
  const expansionSnapshot =
    this._safeCall(this.expansionCompliance, "snapshot") || null;
  const overmindMeta =
    this._safeCall(this.overmind, "snapshotMeta") ||
    this._safeCall(this.overmind, "snapshotTrust") ||
    null;

  const juryFeed =
    this._safeCall(this.juryFrame, "snapshotFeed") ||
    this._safeCall(this.juryFrame, "snapshot") ||
    null;

  const juryBoxSnapshot =
    this._safeCall(this.juryBoxCamera, "snapshot") || null;
  const juryCouncilSnapshot =
    this._safeCall(this.juryCouncil, "snapshot") || null;

  const serverSnapshot = this._safeCall(this.server, "snapshot") || null;
  const castleSnapshot = this._safeCall(this.castle, "snapshot") || null;

  const bandSnapshot =
    this._safeCall(this.bandCore, "snapshotBand") || null;

  const rawEntries = [];
  const rawAIEntries = [];
  const aiEntries = [];

  this._pushIfPresent(rawEntries, "world_snapshot", worldSnapshot);
  this._pushIfPresent(rawEntries, "server_snapshot", serverSnapshot);
  this._pushIfPresent(rawEntries, "castle_snapshot", castleSnapshot);
  this._pushIfPresent(rawEntries, "band_snapshot", bandSnapshot);
  this._pushIfPresent(
    rawEntries,
    "citizen_witness_raw",
    citizenWitness?.raw ?? null
  );

  this._pushIfPresent(rawAIEntries, "world_advantage_context", worldAdvantage);
  this._pushIfPresent(rawAIEntries, "trust_snapshot", trustSnapshot);
  this._pushIfPresent(
    rawAIEntries,
    "expansion_compliance_snapshot",
    expansionSnapshot
  );
  this._pushIfPresent(rawAIEntries, "overmind_meta", overmindMeta);
  this._pushIfPresent(
    rawAIEntries,
    "citizen_witness_structured",
    citizenWitness?.structured ?? null
  );

  this._pushIfPresent(aiEntries, "jury_feed", juryFeed);
  this._pushIfPresent(aiEntries, "jury_box_snapshot", juryBoxSnapshot);
  this._pushIfPresent(aiEntries, "jury_council_snapshot", juryCouncilSnapshot);
  this._pushIfPresent(
    aiEntries,
    "citizen_witness_ai",
    citizenWitness?.ai ?? null
  );

  const packet = Object.freeze({
    ts: resolvedTs,
    label,
    context: {
      id: context.id || null,
      tick: context.tick || null,
      worldLens: context.worldLens || null,
      bandEvent: context.bandEvent || null,
      bandContext: context.bandContext || null
    },
    meta: {
      id: this.config.id,
      version: PulseTrustEvidenceMeta.version,
      schema: PulseTrustEvidenceMeta.schema
    },
    categories: {
      RAW: rawEntries,
      RAW_AI: rawAIEntries,
      AI: aiEntries
    },
    worldAdvantage,
    worldSnapshot,
    citizenWitness,
    trustSnapshot,
    expansionSnapshot,
    overmindMeta,
    juryFeed,
    juryBoxSnapshot,
    juryCouncilSnapshot,
    serverSnapshot,
    castleSnapshot,
    bandSnapshot
  });

  if (this.evidenceCore) {
    this.evidenceCore.recordRaw(packet);
  } else {
    this.records.push(packet);
    this._indexPacket(packet);
  }

  this._log("trust-evidence:packet", { packet });
  return packet;
}


  // ========================================================================
  //  DIRECT RECORDING HELPERS (DELEGATE OR LOCAL APPEND-ONLY)
// ========================================================================
  recordRaw(data) {
    if (this.evidenceCore) {
      return this.evidenceCore.recordRaw(data);
    }
    const entry = this._makeEntry("RAW", data);
    this.records.push(entry);
    this._indexEntry(entry);
    this._log("trust-evidence:raw", entry);
    return entry;
  }

  recordRawAI(data) {
    if (this.evidenceCore) {
      return this.evidenceCore.recordRawAI(data);
    }
    const entry = this._makeEntry("RAW_AI", data);
    this.records.push(entry);
    this._indexEntry(entry);
    this._log("trust-evidence:raw-ai", entry);
    return entry;
  }

  recordAI(data) {
    if (this.evidenceCore) {
      return this.evidenceCore.recordAI(data);
    }
    const entry = this._makeEntry("AI", data);
    this.records.push(entry);
    this._indexEntry(entry);
    this._log("trust-evidence:ai", entry);
    return entry;
  }

  // ========================================================================
  //  GETTERS
  // ========================================================================
  getEvidenceHistory() {
    if (this.evidenceCore) return this.evidenceCore.getEvidence();
    return [...this.records];
  }

  getLatestPacket() {
    if (this.evidenceCore) return this.evidenceCore.getLatest();
    return this.records[this.records.length - 1] || null;
  }

  getTimeline() {
    if (this.evidenceCore) return this.evidenceCore.getTimeline();
    return this.records.map((r) => ({
      ts: r.ts,
      label: r.label || null,
      meta: r.meta
    }));
  }

  getByCategory(category) {
    if (this.evidenceCore) return this.evidenceCore.getByCategory(category);

    if (category === "RAW" || category === "RAW_AI" || category === "AI") {
      return this.index.byCategory[category].slice();
    }

    return this.records.filter((r) => r.category === category);
  }

  getByLabel(label) {
    if (this.evidenceCore && this.evidenceCore.getByLabel) {
      return this.evidenceCore.getByLabel(label);
    }
    const arr = this.index.byLabel.get(label);
    return arr ? arr.slice() : [];
  }

  // ========================================================================
  //  INTERNAL HELPERS (NON-MIND)
// ========================================================================
  _safeCall(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  _pushIfPresent(arr, key, value) {
    if (value === null || value === undefined) return;
    arr.push({ key, value });
  }

  _makeEntry(category, data) {
  return Object.freeze({
    ts: admin.firestore.Timestamp.now(),
    category,
    meta: {
      id: this.config.id,
      version: PulseTrustEvidenceMeta.version,
      schema: PulseTrustEvidenceMeta.schema
    },
    data
  });
}


  _indexPacket(packet) {
    const label = packet.label || null;
    if (label != null) {
      if (!this.index.byLabel.has(label)) {
        this.index.byLabel.set(label, []);
      }
      this.index.byLabel.get(label).push(packet);
    }

    if (packet.categories?.RAW?.length) {
      this.index.byCategory.RAW.push(packet);
    }
    if (packet.categories?.RAW_AI?.length) {
      this.index.byCategory.RAW_AI.push(packet);
    }
    if (packet.categories?.AI?.length) {
      this.index.byCategory.AI.push(packet);
    }
  }

  _indexEntry(entry) {
    const cat = entry.category;
    if (!cat) return;
    if (this.index.byCategory[cat]) {
      this.index.byCategory[cat].push(entry);
    }
  }

  _log(event, payload) {
    try {
      this.logger?.log?.(event, {
        ...payload,
        trustEvidence: PulseTrustEvidenceMeta.identity
      });
    } catch {
      // logging is non-fatal
    }
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createPulseTrustEvidence(config = {}) {
  const core = new PulseTrustEvidence(config);

  return Object.freeze({
    meta: PulseTrustEvidenceMeta,
    captureEvidence: (label, ctx) => core.captureEvidence(label, ctx),
    recordRaw: (d) => core.recordRaw(d),
    recordRawAI: (d) => core.recordRawAI(d),
    recordAI: (d) => core.recordAI(d),
    getEvidenceHistory: () => core.getEvidenceHistory(),
    getLatestPacket: () => core.getLatestPacket(),
    getTimeline: () => core.getTimeline(),
    getByCategory: (c) => core.getByCategory(c),
    getByLabel: (l) => core.getByLabel(l)
  });
}

export const pulseTrustEvidence = new PulseTrustEvidence();
