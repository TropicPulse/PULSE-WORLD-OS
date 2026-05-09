// ============================================================================
//  PULSE OS v20‑IMMORTAL‑EVO++++ — PULSE WORLD ADMIN PANEL ORGAN
//  Owner Console • Multi/One Mind • Pulse Control • Evidence Checker
//  AI Activity • Diagnostics v20 Integration • Advantage/Speed/Experience View
//  PURE OBSERVATION. ZERO MUTATION. ZERO IDENTITY LEAKAGE.
// ============================================================================

export const PulseWorldAdminMeta = Object.freeze({
  layer: "PulseWorldAdminConsole",
  role: "PULSE_WORLD_ADMIN_PANEL_ORGAN",
  version: "20-Immortal-Evo++++",
  identity: "aiPulseWorldAdminPanel-v20-Immortal-Evo++++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualBand: true,
    windowAware: true,
    packetAware: false,
    readOnly: true,
    multiInstanceReady: true,
    diagnosticsArteryAware: true,
    epoch: "20-Immortal-Evo++++",

    adminConsole: true,
    introspectionTools: true,
    evidenceAware: true,
    multiMindAware: true,
    pulseGovernorAware: true,
    aiAuditAware: true,

    advantageFieldAware: true,
    speedFieldAware: true,
    experienceFieldAware: true,
    chunkCachePrewarmAware: true
  }),

  contract: Object.freeze({
    purpose: Object.freeze([
      "Provide a rich, owner-facing PulseWorld Admin Panel model",
      "Expose pulse, mind, performance, security, evidence, and advantage views",
      "Integrate with diagnostics and evidence organs",
      "Surface advantage/speed/experience fields for owner control",
      "Stay read-only and identity-safe"
    ]),
    never: Object.freeze([
      "mutate organism state directly",
      "execute admin actions directly",
      "expose identity anchors",
      "write to external systems",
      "override SafetyFrame",
      "override PermissionsEngine"
    ]),
    always: Object.freeze([
      "summarize",
      "structure",
      "format",
      "stay deterministic",
      "stay ego-free",
      "stay owner-facing only"
    ])
  })
});

// ============================================================================
//  COLOR + ICON HELPERS — UI FLAVOR
// ============================================================================

const COLORS = Object.freeze({
  bgDark: "#05060A",
  bgPanel: "#0B0F1A",
  bgCard: "#111827",
  borderSoft: "#1F2937",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
  accentBlue: "#3B82F6",
  accentPurple: "#8B5CF6",
  accentCyan: "#22D3EE",
  accentGreen: "#22C55E",
  accentRed: "#EF4444",
  accentAmber: "#F59E0B",
  accentPink: "#EC4899",
  moneyPositive: "#22C55E",
  moneyNegative: "#EF4444",
  pulseActive: "#22D3EE",
  pulseHalted: "#6B7280"
});

const ICONS = Object.freeze({
  health: "heart-pulse",
  pulse: "waveform",
  mind: "brain-circuit",
  oneMind: "user-shield",
  multiMind: "users",
  security: "shield-check",
  warning: "triangle-alert",
  error: "x-octagon",
  ok: "check-circle",
  moneyUp: "trending-up",
  moneyDown: "trending-down",
  trendingUp: "trending-up",
  trendingDown: "trending-down",
  evidence: "file-search",
  diagnostics: "activity",
  performance: "gauge",
  persona: "mask",
  overmind: "orbit",
  helper: "sparkles",
  fallback: "lifebuoy",
  readOnly: "lock",
  active: "play",
  stopped: "pause-circle",
  message: "message-circle",
  trace: "scroll-text",
  artery: "git-branch",
  governor: "sliders",
  admin: "crown",
  aiEvidence: "scale",
  aiDrift: "waves",
  advantage: "sparkles",
  speed: "gauge",
  experience: "orbit"
});

// ============================================================================
//  ARCHETYPE NAMING — FUN LABELS FOR AI MODES
// ============================================================================

function archetypeForAI(ai = {}) {
  const role = ai.role || "";
  const lane = ai.lane || "";
  const tags = ai.tags || [];

  if (tags.includes("security") || role === "sentinel") return "The Sentinel";
  if (tags.includes("governor") || role === "governor") return "The Governor";
  if (tags.includes("router") || role === "router") return "The Navigator";
  if (tags.includes("persona") || role === "persona") return "The Mask";
  if (tags.includes("overmind") || role === "overmind") return "The Overmind";
  if (tags.includes("helper") || role === "helper") return "The Scribe";
  if (tags.includes("evidence") || role === "evidence") return "The Archivist";
  if (tags.includes("earn") || role === "earn") return "The Merchant";
  if (tags.includes("scheduler") || role === "scheduler") return "The Conductor";
  if (tags.includes("reflex") || role === "reflex") return "The Reflex";
  if (tags.includes("pipeline") || role === "pipeline") return "The Alchemist";

  if (lane === "binary") return "The Binary Engine";
  if (lane === "symbolic") return "The Storyteller";

  return "Unknown Archetype";
}

// ============================================================================
//  BUCKET HELPERS
// ============================================================================

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketHealth(v) {
  if (v >= 0.9) return "excellent";
  if (v >= 0.75) return "good";
  if (v >= 0.5) return "fair";
  if (v >= 0.25) return "weak";
  return "critical";
}

function colorForHealthBucket(bucket) {
  switch (bucket) {
    case "excellent":
    case "good":
      return COLORS.accentGreen;
    case "fair":
      return COLORS.accentAmber;
    case "weak":
    case "critical":
      return COLORS.accentRed;
    default:
      return COLORS.textSecondary;
  }
}

function colorForPressureBucket(bucket) {
  switch (bucket) {
    case "overload":
      return COLORS.accentRed;
    case "high":
      return COLORS.accentAmber;
    case "medium":
      return COLORS.accentPurple;
    case "low":
      return COLORS.accentCyan;
    case "none":
    default:
      return COLORS.textSecondary;
  }
}

function colorForEvidenceBucket(bucket) {
  switch (bucket) {
    case "excellent":
      return COLORS.accentGreen;
    case "good":
      return COLORS.accentCyan;
    case "fair":
      return COLORS.accentAmber;
    case "weak":
    case "critical":
      return COLORS.accentRed;
    default:
      return COLORS.textSecondary;
  }
}

function colorForAdvantageBucket(bucket) {
  switch (bucket) {
    case "dominant":
      return COLORS.accentGreen;
    case "strong":
      return COLORS.accentCyan;
    case "present":
      return COLORS.accentAmber;
    case "weak":
      return COLORS.accentPink;
    default:
      return COLORS.textSecondary;
  }
}

function colorForSpeedBucket(bucket) {
  switch (bucket) {
    case "blazing":
      return COLORS.accentGreen;
    case "fast":
      return COLORS.accentCyan;
    case "steady":
      return COLORS.accentAmber;
    case "slow":
      return COLORS.accentPink;
    default:
      return COLORS.textSecondary;
  }
}

function colorForExperienceBucket(bucket) {
  switch (bucket) {
    case "legendary":
      return COLORS.accentGreen;
    case "expert":
      return COLORS.accentCyan;
    case "seasoned":
      return COLORS.accentAmber;
    case "novice":
      return COLORS.accentPink;
    default:
      return COLORS.textSecondary;
  }
}

// ============================================================================
//  CORE PANEL SECTION BUILDERS
// ============================================================================

function buildHeaderSection({ ownerName = "Owner", mode = {}, organism = {} }) {
  const pulseMode = mode.pulseMode || "normal"; // normal | elevated | fallback
  const mindMode = mode.mindMode || "multi"; // multi | one
  const aiMode = mode.aiMode || "active"; // active | readOnly
  const pulseActive = organism.pulseActive !== false;

  return Object.freeze({
    id: "header",
    type: "header",
    title: "PulseWorld Admin Panel",
    subtitle: `Welcome, ${ownerName}.`,
    icon: ICONS.admin,
    colors: {
      background: COLORS.bgPanel,
      accent: COLORS.accentBlue
    },
    badges: [
      {
        id: "pulse-mode",
        label: `Pulse: ${pulseMode}`,
        icon: ICONS.pulse,
        color:
          pulseMode === "fallback"
            ? COLORS.accentAmber
            : pulseMode === "elevated"
            ? COLORS.accentPurple
            : COLORS.accentCyan
      },
      {
        id: "mind-mode",
        label: mindMode === "one" ? "One Mind" : "Multi Mind",
        icon: mindMode === "one" ? ICONS.oneMind : ICONS.multiMind,
        color: mindMode === "one" ? COLORS.accentPink : COLORS.accentBlue
      },
      {
        id: "ai-mode",
        label: aiMode === "readOnly" ? "AI: Read‑Only" : "AI: Active",
        icon: aiMode === "readOnly" ? ICONS.readOnly : ICONS.active,
        color: aiMode === "readOnly" ? COLORS.accentAmber : COLORS.accentGreen
      },
      {
        id: "pulse-state",
        label: pulseActive ? "Pulse Flowing" : "Pulse Halted",
        icon: pulseActive ? ICONS.pulse : ICONS.stopped,
        color: pulseActive ? COLORS.pulseActive : COLORS.pulseHalted
      }
    ]
  });
}

// ---------------------------------------------------------------------------

function buildHealthSection({ artery = {}, diagnostics = {}, aiEvidence = {}, aiAdvantage = {}, aiSpeed = {}, aiExperience = {} }) {
  const organism = artery.organism || {};
  const pressure = organism.pressure || 0;
  const pressureBucket = organism.pressureBucket || bucketPressure(pressure);

  const healthScore = Math.max(
    0,
    Math.min(
      1,
      1 -
        (diagnostics.mismatches || 0) * 0.02 -
        (diagnostics.missingFields || 0) * 0.01 -
        (diagnostics.slowdown || 0) * 0.03 -
        (diagnostics.drift ? 0.2 : 0)
    )
  );
  const healthBucket = bucketHealth(healthScore);

  const evidenceBucket = aiEvidence.evidenceBucket || "unknown";
  const matchPct = Math.round((aiEvidence.matchPct || 0) * 100);
  const mismatchPct = Math.round((aiEvidence.mismatchPct || 0) * 100);
  const omissionPct = Math.round((aiEvidence.omissionPct || 0) * 100);
  const driftPct = Math.round((aiEvidence.drift || 0) * 100);

  const advantageScore = aiAdvantage.score || 0;
  const advantageBucket = aiAdvantage.bucket || "none";
  const advantageLabel = aiAdvantage.label || "Advantage";

  const speedScore = aiSpeed.score || 0;
  const speedBucket = aiSpeed.bucket || "idle";
  const speedLabel = aiSpeed.label || "Speed";

  const experienceScore = aiExperience.score || 0;
  const experienceBucket = aiExperience.bucket || "none";
  const experienceLabel = aiExperience.label || "Experience";

  return Object.freeze({
    id: "organism-health",
    type: "cards-row",
    title: "Organism Health, Pressure, Evidence & Advantage Fields",
    icon: ICONS.health,
    cards: [
      {
        id: "health-score",
        title: "Health Score",
        icon: ICONS.health,
        value: Math.round(healthScore * 100),
        unit: "%",
        bucket: healthBucket,
        color: colorForHealthBucket(healthBucket),
        description:
          healthBucket === "excellent"
            ? "Organism is thriving."
            : healthBucket === "good"
            ? "Organism is stable."
            : healthBucket === "fair"
            ? "Some issues detected."
            : healthBucket === "weak"
            ? "Multiple issues detected."
            : "Critical state — investigate."
      },
      {
        id: "pressure",
        title: "Artery Pressure",
        icon: ICONS.artery,
        value: Math.round(pressure * 100),
        unit: "%",
        bucket: pressureBucket,
        color: colorForPressureBucket(pressureBucket),
        description:
          pressureBucket === "overload"
            ? "Overload — consider fallback or throttling."
            : pressureBucket === "high"
            ? "High pressure — monitor closely."
            : pressureBucket === "medium"
            ? "Moderate pressure — normal under load."
            : pressureBucket === "low"
            ? "Low pressure — plenty of headroom."
            : "No significant pressure."
      },
      {
        id: "diagnostics",
        title: "Diagnostics",
        icon: ICONS.diagnostics,
        value: (diagnostics.mismatches || 0) + (diagnostics.missingFields || 0),
        unit: "issues",
        bucket:
          diagnostics.drift || (diagnostics.mismatches || 0) > 0
            ? "warning"
            : "ok",
        color:
          diagnostics.drift || (diagnostics.mismatches || 0) > 0
            ? COLORS.accentAmber
            : COLORS.accentGreen,
        description: diagnostics.drift
          ? "Schema drift detected."
          : (diagnostics.mismatches || 0) + (diagnostics.missingFields || 0) > 0
          ? "Data issues present."
          : "No major data issues."
      },
      {
        id: "ai-evidence",
        title: "AI Evidence Alignment",
        icon: ICONS.aiEvidence,
        value: matchPct,
        unit: "% match",
        bucket: evidenceBucket,
        color: colorForEvidenceBucket(evidenceBucket),
        description:
          evidenceBucket === "excellent"
            ? `Strongly aligned. Mismatch ${mismatchPct}%, omission ${omissionPct}%, drift ${driftPct}%.`
            : evidenceBucket === "good"
            ? `Mostly aligned. Mismatch ${mismatchPct}%, omission ${omissionPct}%, drift ${driftPct}%.`
            : evidenceBucket === "fair"
            ? `Mixed. Mismatch ${mismatchPct}%, omission ${omissionPct}%, drift ${driftPct}%.`
            : evidenceBucket === "weak"
            ? `Weak alignment. Mismatch ${mismatchPct}%, omission ${omissionPct}%, drift ${driftPct}%.`
            : `Critical or unknown alignment. Mismatch ${mismatchPct}%, omission ${omissionPct}%, drift ${driftPct}%.`
      },
      {
        id: "ai-advantage",
        title: advantageLabel,
        icon: ICONS.advantage,
        value: Math.round(advantageScore * 100),
        unit: "%",
        bucket: advantageBucket,
        color: colorForAdvantageBucket(advantageBucket),
        description:
          advantageBucket === "dominant"
            ? "Strong systemic advantage active."
            : advantageBucket === "strong"
            ? "Clear advantage present."
            : advantageBucket === "present"
            ? "Some advantage available."
            : advantageBucket === "weak"
            ? "Minimal advantage — can be improved."
            : "No measurable advantage yet."
      },
      {
        id: "ai-speed",
        title: speedLabel,
        icon: ICONS.speed,
        value: Math.round(speedScore * 100),
        unit: "%",
        bucket: speedBucket,
        color: colorForSpeedBucket(speedBucket),
        description:
          speedBucket === "blazing"
            ? "Peak throughput and responsiveness."
            : speedBucket === "fast"
            ? "High performance under load."
            : speedBucket === "steady"
            ? "Stable performance."
            : speedBucket === "slow"
            ? "Slow under current load."
            : "Idle or no signal."
      },
      {
        id: "ai-experience",
        title: experienceLabel,
        icon: ICONS.experience,
        value: Math.round(experienceScore * 100),
        unit: "%",
        bucket: experienceBucket,
        color: colorForExperienceBucket(experienceBucket),
        description:
          experienceBucket === "legendary"
            ? "Extremely rich experience history."
            : experienceBucket === "expert"
            ? "Deep experience accumulated."
            : experienceBucket === "seasoned"
            ? "Solid experience base."
            : experienceBucket === "novice"
            ? "Early-stage experience."
            : "No meaningful experience yet."
      }
    ]
  });
}

// ---------------------------------------------------------------------------

function buildPulseControlSection({ mode = {}, capabilities = {} }) {
  const pulseMode = mode.pulseMode || "normal";
  const mindMode = mode.mindMode || "multi";
  const aiMode = mode.aiMode || "active";

  return Object.freeze({
    id: "pulse-control",
    type: "control-grid",
    title: "Pulse & Mind Control",
    icon: ICONS.governor,
    description:
      "High‑level controls for pulse flow, mind modes, and AI activity. These are descriptors — actual actions are executed by the Governor organ.",
    controls: [
      {
        id: "pulse-normal",
        label: "Pulse: Normal",
        icon: ICONS.pulse,
        color: COLORS.accentCyan,
        active: pulseMode === "normal",
        action: "setPulseMode:normal",
        hint: "Standard operation — full capabilities, normal safety."
      },
      {
        id: "pulse-fallback",
        label: "Pulse: Fallback",
        icon: ICONS.fallback,
        color: COLORS.accentAmber,
        active: pulseMode === "fallback",
        action: "setPulseMode:fallback",
        hint: "Global fail‑open fallback — advanced features de‑rated, core stays alive."
      },
      {
        id: "mind-multi",
        label: "Multi‑Mind",
        icon: ICONS.multiMind,
        color: COLORS.accentBlue,
        active: mindMode === "multi",
        action: "setMindMode:multi",
        hint: "Multiple minds/personas/overminds active (within safety)."
      },
      {
        id: "mind-one",
        label: "One Mind",
        icon: ICONS.oneMind,
        color: COLORS.accentPink,
        active: mindMode === "one",
        action: "setMindMode:one",
        hint: "All extra minds read‑only; only core deterministic engine acts."
      },
      {
        id: "ai-active",
        label: "AI: Active",
        icon: ICONS.active,
        color: COLORS.accentGreen,
        active: aiMode === "active",
        action: "setAIMode:active",
        hint: "AIs can act within permissions and safety."
      },
      {
        id: "ai-readonly",
        label: "AI: Read‑Only",
        icon: ICONS.readOnly,
        color: COLORS.accentAmber,
        active: aiMode === "readOnly",
        action: "setAIMode:readOnly",
        hint: "AIs can observe and message you, but cannot act."
      },
      {
        id: "pulse-halt-organism",
        label: "Halt Pulse (This Organism)",
        icon: ICONS.stopped,
        color: COLORS.accentRed,
        active: false,
        action: "pulseHalt:organism",
        hint: "Stop pulse transport for this organism only. System stays alive."
      },
      {
        id: "pulse-resume-organism",
        label: "Resume Pulse",
        icon: ICONS.pulse,
        color: COLORS.accentGreen,
        active: false,
        action: "pulseResume:organism",
        hint: "Resume pulse transport for this organism."
      }
    ],
    capabilities: Object.freeze({
      canSetPulseMode: !!capabilities.canSetPulseMode,
      canSetMindMode: !!capabilities.canSetMindMode,
      canSetAIMode: !!capabilities.canSetAIMode,
      canPulseHalt: !!capabilities.canPulseHalt
    })
  });
}

// ---------------------------------------------------------------------------

function buildEarnSection({ earn = {} }) {
  const totalEarn = earn.totalEarn || 0;
  const dailyEarn = earn.dailyEarn || 0;
  const earnTrend = earn.trend || 0;
  const trendPositive = earnTrend >= 0;

  return Object.freeze({
    id: "earn-panel",
    type: "cards-row",
    title: "Earn & Throughput",
    icon: ICONS.moneyUp,
    cards: [
      {
        id: "total-earn",
        title: "Total Earn",
        icon: trendPositive ? ICONS.moneyUp : ICONS.moneyDown,
        value: totalEarn.toFixed(2),
        unit: "$",
        color: totalEarn >= 0 ? COLORS.moneyPositive : COLORS.moneyNegative,
        description:
          totalEarn >= 0
            ? "Positive lifetime earnings."
            : "Net negative — check costs."
      },
      {
        id: "daily-earn",
        title: "Daily Earn",
        icon: trendPositive ? ICONS.moneyUp : ICONS.moneyDown,
        value: dailyEarn.toFixed(2),
        unit: "$/day",
        color: dailyEarn >= 0 ? COLORS.moneyPositive : COLORS.moneyNegative,
        description:
          dailyEarn >= 0
            ? "Earning today."
            : "Spending more than earning today."
      },
      {
        id: "earn-trend",
        title: "Earn Trend",
        icon: trendPositive ? ICONS.trendingUp : ICONS.trendingDown,
        value: Math.round(Math.abs(earnTrend) * 100),
        unit: "%",
        color: trendPositive ? COLORS.accentGreen : COLORS.accentRed,
        description: trendPositive
          ? "Earnings trending up."
          : "Earnings trending down."
      }
    ]
  });
}

// ---------------------------------------------------------------------------

function buildAIMindsSection({ aiMinds = [], mode = {}, aiActivity = [] }) {
  const mindMode = mode.mindMode || "multi";
  const aiMode = mode.aiMode || "active";

  const activityById = new Map();
  aiActivity.forEach((a) => {
    if (a?.id) activityById.set(a.id, a);
  });

  const items = aiMinds.map((ai) => {
    const archetype = archetypeForAI(ai);
    const status = ai.status || "idle";
    const lane = ai.lane || "unknown";
    const role = ai.role || "unknown";
    const canAct = status === "active" && aiMode === "active" && mindMode === "multi";

    const activity = activityById.get(ai.id) || {};
    const ev = activity.evidence || {};
    const matchPct = Math.round((ev.matchPct || 0) * 100);
    const mismatchPct = Math.round((ev.mismatchPct || 0) * 100);
    const omissionPct = Math.round((ev.omissionPct || 0) * 100);
    const evidenceBucket = ev.evidenceBucket || "unknown";

    let statusColor = COLORS.textSecondary;
    if (status === "active") statusColor = COLORS.accentGreen;
    else if (status === "readOnly") statusColor = COLORS.accentAmber;
    else if (status === "isolated") statusColor = COLORS.accentRed;

    return {
      id: ai.id || role,
      name: ai.name || role,
      archetype,
      role,
      lane,
      status,
      canAct,
      icon:
        role === "persona"
          ? ICONS.persona
          : role === "overmind"
          ? ICONS.overmind
          : role === "helper"
          ? ICONS.helper
          : ICONS.mind,
      colors: {
        status: statusColor,
        evidence: colorForEvidenceBucket(evidenceBucket)
      },
      evidence: {
        matchPct,
        mismatchPct,
        omissionPct,
        bucket: evidenceBucket
      },
      messaging: {
        canMessageOwner: true,
        canReceiveFromOwner: true
      }
    };
  });

  return Object.freeze({
    id: "ai-minds",
    type: "list",
    title: mindMode === "one" ? "AI Minds (Read‑Only View)" : "AI Minds",
    icon: ICONS.mind,
    description:
      mindMode === "one"
        ? "All minds are in read‑only/message‑only mode. Only the core engine can act."
        : "Multiple minds/personas/overminds may be active, within safety and permissions.",
    items
  });
}

// ---------------------------------------------------------------------------

function buildMessagingSection({ conversations = [] }) {
  return Object.freeze({
    id: "messaging",
    type: "messaging-panel",
    title: "Owner ↔ AI Messaging",
    icon: ICONS.message,
    description:
      "Two‑way messaging between you and your AIs. In OneMindMode, they can only message and cannot act.",
    conversations: conversations.map((c) => ({
      id: c.id,
      aiId: c.aiId,
      aiName: c.aiName,
      archetype: archetypeForAI(c.ai || {}),
      lastMessagePreview: c.lastMessagePreview || "",
      unreadCount: c.unreadCount || 0,
      pinned: !!c.pinned
    }))
  });
}

// ---------------------------------------------------------------------------

function buildEvidenceSection({ evidence = {} }) {
  const lastCheck = evidence.lastCheck || null;
  const match = evidence.match || 0;
  const mismatch = evidence.mismatch || 0;
  const omission = evidence.omission || 0;
  const drift = evidence.drift || 0;

  const total = match + mismatch + omission || 1;
  const matchPct = (match / total) || 0;
  const mismatchPct = (mismatch / total) || 0;
  const omissionPct = (omission / total) || 0;

  return Object.freeze({
    id: "evidence-checker",
    type: "evidence-panel",
    title: "Evidence Checker",
    icon: ICONS.evidence,
    description:
      "Compare AI outputs against evidential records. Use this to audit, verify, and trust‑check any answer.",
    lastCheck,
    metrics: {
      match: {
        label: "Matches",
        value: Math.round(matchPct * 100),
        unit: "%",
        color: COLORS.accentGreen
      },
      mismatch: {
        label: "Mismatches",
        value: Math.round(mismatchPct * 100),
        unit: "%",
        color: COLORS.accentRed
      },
      omission: {
        label: "Omissions",
        value: Math.round(omissionPct * 100),
        unit: "%",
        color: COLORS.accentAmber
      },
      drift: {
        label: "Drift",
        value: Math.round(drift * 100),
        unit: "%",
        color: drift > 0 ? COLORS.accentRed : COLORS.textSecondary
      }
    },
    actions: [
      {
        id: "check-current-answer",
        label: "Check Current Answer Against Evidence",
        icon: ICONS.evidence,
        color: COLORS.accentBlue,
        action: "evidenceCheck:current"
      },
      {
        id: "open-evidence-log",
        label: "Open Evidence Log",
        icon: ICONS.trace,
        color: COLORS.accentPurple,
        action: "evidenceLog:open"
      }
    ]
  });
}

// ---------------------------------------------------------------------------

function buildDiagnosticsSection({ adminDiagnosticsModel = null }) {
  if (!adminDiagnosticsModel) {
    return Object.freeze({
      id: "diagnostics",
      type: "placeholder",
      title: "Diagnostics",
      icon: ICONS.diagnostics,
      description:
        "Admin Diagnostics organ not attached. Link it to see summary cards, issues, AI activity, evidence, and advantage fields."
    });
  }

  return Object.freeze({
    id: "diagnostics",
    type: "embedded-diagnostics",
    title: "Diagnostics & Issues",
    icon: ICONS.diagnostics,
    summaryCards: adminDiagnosticsModel.summaryCards || [],
    issueList: adminDiagnosticsModel.issueList || [],
    artery: adminDiagnosticsModel.artery || {},
    aiActivity: adminDiagnosticsModel.aiActivity || [],
    evidence: adminDiagnosticsModel.evidence || {},
    governorMode: adminDiagnosticsModel.governorMode || {},
    meta: adminDiagnosticsModel.meta || {}
  });
}

// ============================================================================
//  PUBLIC API — Create PulseWorld Admin Panel Organ (v20‑IMMORTAL‑EVO++++)
// ============================================================================

export function createPulseWorldAdminPanel(context = {}) {
  const ownerName = context.ownerName || "Owner";

  const adminDiagnosticsModel = context.adminDiagnosticsModel || null;

  const mode =
    context.mode ||
    adminDiagnosticsModel?.governorMode || {
      pulseMode: "normal",
      mindMode: "multi",
      aiMode: "active"
    };

  const organism = context.organism || {
    pulseActive: true
  };

  const artery =
    context.artery ||
    adminDiagnosticsModel?.artery || {
      organism: {
        pressure: 0,
        pressureBucket: "none"
      }
    };

  const diagnostics = context.diagnostics || {
    mismatches: adminDiagnosticsModel
      ? adminDiagnosticsModel.artery?.diagnostics?.mismatches || 0
      : 0,
    missingFields: adminDiagnosticsModel
      ? adminDiagnosticsModel.artery?.diagnostics?.missingFields || 0
      : 0,
    slowdown: adminDiagnosticsModel
      ? adminDiagnosticsModel.artery?.diagnostics?.slowdown || 0
      : 0,
    drift: adminDiagnosticsModel
      ? adminDiagnosticsModel.artery?.diagnostics?.drift || false
      : false
  };

  const earn = context.earn || {
    totalEarn: 0,
    dailyEarn: 0,
    trend: 0
  };

  const aiMinds = Array.isArray(context.aiMinds) ? context.aiMinds : [];
  const conversations = Array.isArray(context.conversations)
    ? context.conversations
    : [];

  const evidence =
    context.evidence || adminDiagnosticsModel?.evidence || {};

  const aiActivity = adminDiagnosticsModel?.aiActivity || [];

  const capabilities = context.capabilities || {
    canSetPulseMode: true,
    canSetMindMode: true,
    canSetAIMode: true,
    canPulseHalt: true
  };

  function prewarm() {
    // symbolic-only prewarm hook for future chunk cache / route prewarm
    return true;
  }

  function buildModel(extraMeta = {}) {
    const header = buildHeaderSection({ ownerName, mode, organism });
    const health = buildHealthSection({
      artery,
      diagnostics,
      aiEvidence: adminDiagnosticsModel?.artery?.aiEvidence || {},
      aiAdvantage: adminDiagnosticsModel?.artery?.aiAdvantage || {},
      aiSpeed: adminDiagnosticsModel?.artery?.aiSpeed || {},
      aiExperience: adminDiagnosticsModel?.artery?.aiExperience || {}
    });
    const pulseControl = buildPulseControlSection({ mode, capabilities });
    const earnPanel = buildEarnSection({ earn });
    const aiMindsPanel = buildAIMindsSection({ aiMinds, mode, aiActivity });
    const messagingPanel = buildMessagingSection({ conversations });
    const evidencePanel = buildEvidenceSection({ evidence });
    const diagnosticsPanel = buildDiagnosticsSection({ adminDiagnosticsModel });

    return Object.freeze({
      meta: Object.freeze({
        ...extraMeta,
        ownerName,
        mode,
        organism,
        version: PulseWorldAdminMeta.version,
        identity: PulseWorldAdminMeta.identity
      }),
      theme: Object.freeze({
        colors: COLORS,
        icons: ICONS
      }),
      layout: Object.freeze({
        sections: [
          header,
          health,
          pulseControl,
          earnPanel,
          aiMindsPanel,
          messagingPanel,
          evidencePanel,
          diagnosticsPanel
        ]
      })
    });
  }

  return Object.freeze({
    meta: PulseWorldAdminMeta,
    prewarm,
    buildModel
  });
}

// ============================================================================
//  NODE/COMMONJS EXPORTS
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    PulseWorldAdminMeta,
    createPulseWorldAdminPanel
  };
}
