/**
// ============================================================================
//  PULSE-WORLD-UNIVERSE-PULSAR-UNIVERSE v30-Orbital-Immortal++  (PURE ESM)
// ============================================================================
 *  ROLE: Universe-layer symbolic orchestrator / multispin / civilization lens
 *  VERSION: v30-Orbital-Immortal++
 *  LAYER: Universe (pure symbolic, no storage, no I/O)
 * ============================================================================
 *
 *  WHAT THIS ORGAN IS:
 *  -------------------
 *  This is the "universe brain" for Pulse-World.
 *  It does NOT talk to the network, AWS, IndexedDB, or hardware.
 *  It ONLY:
 *    - Reads symbolic snapshots from "world providers".
 *    - Computes:
 *        * Multispin (which band is dominant: firebase/netlify/local/edge/groundstation/satellite/other)
 *        * Civilization field (tiers, density, pressure, orbital reach)
 *        * Health field (overall density/pressure band)
 *        * Game universe field (epochMode + season)
 *    - Returns a clean, deterministic snapshot.
 *
 *  WHAT THIS ORGAN IS NOT:
 *  -----------------------
 *    - No AWS SDK.
 *    - No Ground Station API calls.
 *    - No IndexedDB / binary / PulsePort logic.
 *    - No routing, no scheduling, no real-time.
 *
 *  YOU FEED IT SNAPSHOTS, IT GIVES YOU SYMBOLIC TRUTH.
 *
 *  ORBITAL UPGRADE (v30):
 *  ----------------------
 *  New world kinds:
 *    - "groundstation"
 *        Represents AWS Ground Station ingest as a WORLD.
 *        Think of it as:
 *          * RF → IP bridge.
 *          * Contact windows (when satellite is visible).
 *          * Dataflow endpoint groups (which regions can see the sky).
 *        You DO NOT call AWS from here.
 *        Instead, your AWS/VPC ingest layer:
 *          * Receives frames / contacts.
 *          * Aggregates them into symbolic hints:
 *              - contactDensity (0–1): how often we have contact.
 *              - orbitalReach (0–1): how many regions/meshes are covered.
 *              - orbitalPriority (0–1): how much we want to bias toward sky.
 *          * Passes those hints into civilizationHints for this worldId.
 *
 *    - "satellite"
 *        Represents the orbital presence / vertical axis as a WORLD.
 *        Think of it as:
 *          * Global broadcast layer.
 *          * Vertical fallback path.
 *          * "Sky mesh" that sees many ground meshes at once.
 *        Again: no real satellite API here.
 *        You feed it symbolic hints:
 *          - contactDensity: how often the satellite is "online" to us.
 *          - orbitalReach: how many ground regions it can see.
 *          - orbitalPriority: how much we want to favor orbital routing.
 *
 *  CONCEPTS TO THINK ABOUT (SATELLITE + AWS GROUND STATION):
 *  ---------------------------------------------------------
 *  1. Contact Windows (AWS Ground Station):
 *     - Each scheduled contact is a "breath" of the sky.
 *     - More contacts per day → higher contactDensity.
 *     - You can aggregate:
 *         contactDensity = (totalContactSeconds / totalDaySeconds)
 *     - This organ doesn't compute that; your ingest layer does.
 *
 *  2. Dataflow Endpoint Groups:
 *     - Each endpoint group is a region of your organism that can see the sky.
 *     - More endpoint groups / regions → higher orbitalReach.
 *     - You can think:
 *         orbitalReach = (#regionsWithEndpoint / #totalRegions)
 *
 *  3. Frame Rate / Throughput:
 *     - Symbolic orbitalPressure.
 *     - High throughput = more "load" on orbital path.
 *     - You can map:
 *         orbitalPressure ~ normalized(frameRate or Mbps)
 *     - Here we just bias density/pressure using orbital hints.
 *
 *  4. Being in a Satellite (conceptually, for Pulse-World):
 *     - You are above the mesh, not inside it.
 *     - You see multiple ground clusters at once.
 *     - You can:
 *         * Broadcast presence updates globally.
 *         * Provide fallback when ground internet is fragmented.
 *         * Act as a "vertical spine" for the organism.
 *     - Symbolically:
 *         * orbitalReach → how many ground worlds you can help.
 *         * orbitalPriority → how much we trust / favor orbital path.
 *
 *  5. How this helps AWS Ground Station integration:
 *     - You keep AWS-specific logic OUTSIDE this file.
 *     - Your AWS/VPC service:
 *         * Talks to Ground Station.
 *         * Tracks contacts, frames, throughput.
 *         * Computes:
 *             - contactDensity
 *             - orbitalReach
 *             - orbitalPriority
 *         * Calls setCivilizationHint(worldId, { ...orbital hints... }).
 *     - This organ then:
 *         * Treats GroundStation/Satellite as worlds.
 *         * Lets them influence multispin + civilization fields.
 *         * But never depends on them (fallback: they can vanish).
 *
 *  6. Resilience / Fallback Thinking:
 *     - If GroundStation goes down:
 *         * This world just stops contributing density/pressure.
 *         * Universe still spins with firebase/netlify/local/edge.
 *     - If Satellite goes down:
 *         * Same: orbital band weight drops.
 *         * Universe still spins; season may change (no more orbital-season).
 *     - This organ never breaks if sky disappears.
 *       It just reflects that the sky is quiet.
 *
 *  7. IndexedDB / Binary / IMMORTAL++ v30:
 *     - All of that lives in PulsePort / IMMORTAL++ layers.
 *     - They can:
 *         * Store snapshots from this organ.
 *         * Compress them.
 *         * Version them.
 *     - This organ stays pure math.
 *
 * ============================================================================
 */
// ============================================================================
//  PULSE-WORLD-UNIVERSE-PULSAR-UNIVERSE v30-Orbital-Immortal++  (PURE ESM)
// ============================================================================
//
//  PURE SYMBOLIC UNIVERSE ORGAN
//  - Knows about:
//      • Worlds (firebase / netlify / local / edge / groundstation / satellite / other)
//      • Civilization tiers, cost bands, epochs, seasons
//      • Orbital hints (contactDensity / orbitalReach / orbitalPriority)
//      • Multispin band dominance
//      • Global health + game/epoch mode
//      • Orbital / satellite dominance (orbital-season)
//
//  v30-Orbital UPGRADE:
//    - Stronger orbital semantics for groundstation/satellite worlds
//    - Satellite coverage + contact density surfaced cleanly
//    - Universe-level “orbitalField” for quick satellite awareness
//    - Fully compatible with existing providers + civ hints
//
// ============================================================================
// HELPERS
// ============================================================================

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `univ${h}`;
}

function safeCall(fn) {
  if (typeof fn !== "function") return null;
  try {
    return fn();
  } catch {
    return null;
  }
}

// Civilization tiers + cost bands are symbolic ladders.
const CIV_TIERS = ["outpost", "village", "town", "city", "metropolis", "capital", "legendary"];
const COST_BANDS = ["free", "low", "medium", "high", "premium", "mythic"];

// ============================================================================
// MULTISPIN MODEL (symbolic only)
// ============================================================================
//
// Bands:
//   - firebase
//   - netlify
//   - local
//   - edge
//   - groundstation
//   - satellite
//   - other
//

function computeBandWeight({ density, pressure, civIndex, costIndex }) {
  const d = clamp01(density);
  const p = clamp01(pressure);
  const c = clamp01(civIndex);
  const k = clamp01(costIndex);

  const base = d * 0.4 + p * 0.3 + c * 0.3;
  const friction = 0.1 + k * 0.4;
  const weight = base / friction;
  return clamp01(weight);
}

function normalizeVector(vec) {
  const sum = Object.values(vec).reduce((acc, v) => acc + (v || 0), 0);
  if (sum <= 0) return Object.fromEntries(Object.keys(vec).map(k => [k, 0]));
  const inv = 1 / sum;
  const out = {};
  for (const [k, v] of Object.entries(vec)) {
    out[k] = (v || 0) * inv;
  }
  return out;
}

// ============================================================================
// UNIVERSE ORGAN (PURE SYMBOLIC)
// ============================================================================

export function createPulseWorldUniverse({
  universeID = null,
  trace = false,
  worldProviders = {},
  civilizationHints = {}
} = {}) {
  const identity = Object.freeze({
    universeID: universeID || stableHash("PULSE-WORLD-UNIVERSE"),
    version: "v30-Orbital-Immortal++",
    layer: "universe-symbolic"
  });

  const log = (...args) => trace && console.log("[PulseWorldUniverse v30-Orbital]", ...args);

  const _worldProviders = { ...worldProviders };
  const _civHints = { ...civilizationHints };

  // ---------------------------------------------------------------------------
  // WORLD REGISTRY
  // ---------------------------------------------------------------------------

  function registerWorld(worldId, provider, civHint = null) {
    if (!worldId || typeof provider !== "object") {
      return { ok: false, reason: "invalid-arguments" };
    }
    _worldProviders[worldId] = { ...(provider || {}) };
    if (civHint) {
      _civHints[worldId] = { ...(_civHints[worldId] || {}), ...civHint };
    }
    return { ok: true };
  }

  function unregisterWorld(worldId) {
    delete _worldProviders[worldId];
    delete _civHints[worldId];
    return { ok: true };
  }

  function setCivilizationHint(worldId, civHint = {}) {
    if (!worldId) return { ok: false, reason: "invalid-worldId" };
    _civHints[worldId] = { ...(_civHints[worldId] || {}), ...(civHint || {}) };
    return { ok: true, hints: _civHints[worldId] };
  }

  function getCivilizationHint(worldId) {
    return _civHints[worldId] || null;
  }

  // ---------------------------------------------------------------------------
  // WORLD SNAPSHOT AGGREGATION
  // ---------------------------------------------------------------------------

  function readWorldSnapshot(worldId, provider) {
    const meshSnap = safeCall(provider.getMeshSnapshot);
    const beaconMeshSnap = safeCall(provider.getBeaconMeshSnapshot);
    const beaconEngineSnap = safeCall(provider.getBeaconEngineSnapshot);
    const consoleSnap = safeCall(provider.getConsoleSnapshot);
    const expansionSnap = safeCall(provider.getExpansionSnapshot);
    const overmindSnap = safeCall(provider.getOvermindSnapshot);
    const worldCoreSnap = safeCall(provider.getWorldCoreSnapshot);

    const civ = _civHints[worldId] || {};

    const meshMetrics = meshSnap?.densityHealth?.metrics || {};
    const beaconMeshPressure = beaconMeshSnap?.meshPressureIndex ?? null;
    const omniArtery = beaconMeshSnap?.continuanceOverlay?.arteryOverlay || {};
    const arteryPressure = omniArtery.arteryPressure ?? null;

    const userCount = meshMetrics.userCount || 0;
    const castleCount = meshMetrics.castleCount || 0;
    const meshPressureIndex =
      meshMetrics.meshPressureIndex ??
      beaconMeshPressure ??
      0;

    let density = clamp01((userCount + castleCount) / 1000);
    let pressure = clamp01(meshPressureIndex / 100);

    const civTier = civ.civilizationTier || "outpost";
    const townType = civ.townType || "wilderness";
    const costBand = civ.costBand || "unknown";
    const epoch = civ.epoch || "prelude";
    const season = civ.season || "alpha";

    const civIndex = CIV_TIERS.indexOf(civTier);
    const civNorm = civIndex >= 0 ? civIndex / (CIV_TIERS.length - 1 || 1) : 0;

    const costIndex = COST_BANDS.indexOf(costBand);
    const costNorm = costIndex >= 0 ? costIndex / (COST_BANDS.length - 1 || 1) : 0;

    // ORBITAL HINTS (for "groundstation" / "satellite")
    //
    // You compute these outside, e.g.:
    //   contactDensity: fraction of time with active contact.
    //   orbitalReach: fraction of regions/meshes covered.
    //   orbitalPriority: how much we want to favor this world in multispin.
    //
    const contactDensity = clamp01(civ.contactDensity ?? 0);
    const orbitalReach = clamp01(civ.orbitalReach ?? 0);
    const orbitalPriority = clamp01(civ.orbitalPriority ?? 0);

    if (provider.kind === "groundstation" || provider.kind === "satellite") {
      const orbitalBias =
        (contactDensity * 0.5 + orbitalReach * 0.5) *
        (0.5 + orbitalPriority * 0.5);

      density = clamp01(density + orbitalBias * 0.6);
      pressure = clamp01(pressure + orbitalBias * 0.8);
    }

    return Object.freeze({
      worldId,
      kind: provider.kind || "other",
      density,
      pressure,
      arteryPressure: arteryPressure != null ? clamp01(arteryPressure) : pressure,
      userCount,
      castleCount,
      meshPressureIndex,
      civTier,
      townType,
      costBand,
      epoch,
      season,
      civIndex: civNorm,
      costIndex: costNorm,
      contactDensity,
      orbitalReach,
      orbitalPriority,
      meshSnapshot: meshSnap,
      beaconMeshSnapshot: beaconMeshSnap,
      beaconEngineSnapshot: beaconEngineSnap,
      consoleSnapshot: consoleSnap,
      expansionSnapshot: expansionSnap,
      overmindSnapshot: overmindSnap,
      worldCoreSnapshot: worldCoreSnap
    });
  }

  function buildUniverseWorldsView() {
    const worlds = [];
    for (const [worldId, provider] of Object.entries(_worldProviders)) {
      const snap = readWorldSnapshot(worldId, provider);
      worlds.push(snap);
    }
    return Object.freeze(worlds);
  }

  // ---------------------------------------------------------------------------
  // MULTISPIN
  // ---------------------------------------------------------------------------

  function buildMultispinField() {
    const worlds = buildUniverseWorldsView();

    const bands = {
      firebase: 0,
      netlify: 0,
      local: 0,
      edge: 0,
      groundstation: 0,
      satellite: 0,
      other: 0
    };

    for (const w of worlds) {
      const kind = w.kind || "other";
      const bandKey = bands.hasOwnProperty(kind) ? kind : "other";

      const weight = computeBandWeight({
        density: w.density,
        pressure: w.pressure,
        civIndex: w.civIndex,
        costIndex: w.costIndex
      });

      bands[bandKey] += weight;
    }

    const normalized = normalizeVector(bands);

    return Object.freeze({
      rawBands: bands,
      spinVector: normalized,
      dominantBand:
        Object.entries(normalized).reduce(
          (best, [k, v]) => (v > best.value ? { key: k, value: v } : best),
          { key: "other", value: 0 }
        ).key
    });
  }

  // ---------------------------------------------------------------------------
  // CIVILIZATION FIELD
  // ---------------------------------------------------------------------------

  function buildCivilizationField() {
    const worlds = buildUniverseWorldsView();

    let maxCiv = 0;
    let maxCivWorld = null;
    let totalDensity = 0;
    let totalPressure = 0;

    const perWorld = worlds.map(w => {
      totalDensity += w.density;
      totalPressure += w.pressure;
      if (w.civIndex > maxCiv) {
        maxCiv = w.civIndex;
        maxCivWorld = w.worldId;
      }
      return {
        worldId: w.worldId,
        kind: w.kind,
        civTier: w.civTier,
        townType: w.townType,
        costBand: w.costBand,
        epoch: w.epoch,
        season: w.season,
        density: w.density,
        pressure: w.pressure,
        contactDensity: w.contactDensity,
        orbitalReach: w.orbitalReach,
        orbitalPriority: w.orbitalPriority
      };
    });

    const avgDensity = worlds.length ? totalDensity / worlds.length : 0;
    const avgPressure = worlds.length ? totalPressure / worlds.length : 0;

    const globalTierIndex = Math.round(maxCiv * (CIV_TIERS.length - 1 || 1));
    const globalTier = CIV_TIERS[globalTierIndex] || "outpost";

    return Object.freeze({
      globalTier,
      globalTierIndex,
      leadingWorldId: maxCivWorld,
      avgDensity,
      avgPressure,
      worlds: perWorld
    });
  }

  // ---------------------------------------------------------------------------
  // HEALTH FIELD
  // ---------------------------------------------------------------------------

  function buildUniverseHealthField() {
    const worlds = buildUniverseWorldsView();

    let totalUsers = 0;
    let totalCastles = 0;
    let maxPressure = 0;

    for (const w of worlds) {
      totalUsers += w.userCount;
      totalCastles += w.castleCount;
      if (w.meshPressureIndex > maxPressure) {
        maxPressure = w.meshPressureIndex;
      }
    }

    const density = clamp01((totalUsers + totalCastles) / 5000);
    const pressure = clamp01(maxPressure / 100);

    let healthBand = "unknown";
    if (pressure < 0.3) healthBand = "calm";
    else if (pressure < 0.6) healthBand = "stable";
    else if (pressure < 0.8) healthBand = "stressed";
    else healthBand = "overloaded";

    return Object.freeze({
      totalUsers,
      totalCastles,
      maxMeshPressureIndex: maxPressure,
      density,
      pressure,
      healthBand
    });
  }

  // ---------------------------------------------------------------------------
  // ORBITAL FIELD (v30-Orbital)
// ---------------------------------------------------------------------------
//
// Aggregates satellite/groundstation worlds into a single orbital view:
//   - totalOrbitalWorlds
//   - avgContactDensity
//   - avgOrbitalReach
//   - maxOrbitalPriority
//   - orbitalDominant: boolean (is satellite/groundstation clearly dominant)
//

  function buildOrbitalField() {
    const worlds = buildUniverseWorldsView();

    let totalOrbitalWorlds = 0;
    let sumContact = 0;
    let sumReach = 0;
    let maxPriority = 0;

    for (const w of worlds) {
      if (w.kind === "groundstation" || w.kind === "satellite") {
        totalOrbitalWorlds += 1;
        sumContact += w.contactDensity;
        sumReach += w.orbitalReach;
        if (w.orbitalPriority > maxPriority) {
          maxPriority = w.orbitalPriority;
        }
      }
    }

    const avgContactDensity = totalOrbitalWorlds ? sumContact / totalOrbitalWorlds : 0;
    const avgOrbitalReach = totalOrbitalWorlds ? sumReach / totalOrbitalWorlds : 0;

    const orbitalDominant = avgOrbitalReach > 0.4 || maxPriority > 0.5;

    return Object.freeze({
      totalOrbitalWorlds,
      avgContactDensity,
      avgOrbitalReach,
      maxOrbitalPriority: maxPriority,
      orbitalDominant
    });
  }

  // ---------------------------------------------------------------------------
  // GAME / CIVILIZATION HOOKS
  // ---------------------------------------------------------------------------

  function buildGameUniverseField() {
    const civField = buildCivilizationField();
    const healthField = buildUniverseHealthField();
    const multispin = buildMultispinField();

    let epochMode = "prelude";
    if (civField.globalTierIndex >= 2 && healthField.healthBand === "calm") {
      epochMode = "growth";
    } else if (civField.globalTierIndex >= 3 && healthField.healthBand === "stable") {
      epochMode = "golden-age";
    } else if (healthField.healthBand === "stressed") {
      epochMode = "stress";
    } else if (healthField.healthBand === "overloaded") {
      epochMode = "collapse";
    }

    const band = multispin.dominantBand;
    let season = "neutral";
    if (band === "firebase") season = "fire-season";
    else if (band === "netlify") season = "wind-season";
    else if (band === "local") season = "earth-season";
    else if (band === "edge") season = "storm-season";
    else if (band === "groundstation") season = "sky-season";
    else if (band === "satellite") season = "orbital-season";
    else season = "void-season";

    return Object.freeze({
      epochMode,
      season,
      civilization: civField,
      health: healthField,
      multispin
    });
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT (PURE SYMBOLIC VIEW)
// ---------------------------------------------------------------------------

  function getSnapshot() {
    const worlds = buildUniverseWorldsView();
    const multispin = buildMultispinField();
    const civField = buildCivilizationField();
    const healthField = buildUniverseHealthField();
    const gameField = buildGameUniverseField();
    const orbitalField = buildOrbitalField();

    return Object.freeze({
      identity,
      worlds,
      multispin,
      civilizationField: civField,
      healthField,
      gameUniverseField: gameField,
      orbitalField
    });
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  return Object.freeze({
    identity,

    // registry
    registerWorld,
    unregisterWorld,
    setCivilizationHint,
    getCivilizationHint,

    // views
    buildUniverseWorldsView,
    buildMultispinField,
    buildCivilizationField,
    buildUniverseHealthField,
    buildGameUniverseField,
    buildOrbitalField,

    // snapshot
    getSnapshot
  });
}

export default createPulseWorldUniverse;

/**
 * ============================================================================
 *  AWS GROUND STATION + ORBITAL INTERNET APPENDIX
 *  (Real-world concepts, settings, abilities, and orbital ideas)
 * ============================================================================
 *
 *  AWS GROUND STATION — WHAT IT ACTUALLY IS:
 *  ----------------------------------------
 *  AWS Ground Station is a fully managed service that lets you:
 *    - Schedule satellite passes (contact windows)
 *    - Downlink data from satellites (RF → IP)
 *    - Uplink commands to satellites
 *    - Route satellite data directly into your AWS VPC
 *
 *  It replaces:
 *    - Owning antennas
 *    - RF equipment
 *    - Tracking systems
 *    - Ground infrastructure
 *
 *  Instead, AWS provides:
 *    - Global antenna network
 *    - Multi-region coverage
 *    - High-rate downlink (X-band)
 *    - TT&C (S-band)
 *    - Secure VPC integration
 *
 *
 *  CONTACT WINDOWS — THE SKY OPENS AND CLOSES:
 *  -------------------------------------------
 *  Satellites in LEO (Low Earth Orbit) are NOT always visible.
 *  They pass overhead in "windows" that last 5–15 minutes.
 *
 *  Key concepts:
 *    - Pass duration: how long the satellite is visible
 *    - Pass frequency: how many times per day
 *    - Elevation angle: higher = better signal
 *    - Visibility region: which AWS Ground Station region can see it
 *
 *  Engineering ideas:
 *    - You can schedule passes automatically
 *    - You can prioritize high-elevation passes for best SNR
 *    - You can chain passes across multiple AWS regions
 *
 *
 *  DATAFLOW ENDPOINT GROUPS — WHERE THE SKY LANDS:
 *  -----------------------------------------------
 *  A Dataflow Endpoint Group defines:
 *    - Which AWS region receives the downlink
 *    - Which VPC/subnets the data flows into
 *    - Which compute resources process the stream
 *
 *  Think of it as:
 *    "Where does the satellite plug into your cloud?"
 *
 *  You can:
 *    - Route different satellites to different regions
 *    - Build multi-region ingest pipelines
 *    - Use EC2/ECS/Lambda/Kinesis for processing
 *
 *
 *  FREQUENCY BANDS & MODULATION — THE RF REALITY:
 *  ----------------------------------------------
 *  AWS Ground Station supports:
 *    - S-band (telemetry, tracking, command)
 *    - X-band (high-rate downlink)
 *    - UHF (legacy)
 *
 *  Common modulation/coding:
 *    - BPSK / QPSK / OQPSK
 *    - CCSDS frames
 *    - Viterbi / Reed-Solomon
 *    - Turbo / LDPC
 *
 *  Concepts:
 *    - Higher frequency = more bandwidth, more atmospheric loss
 *    - Lower frequency = more reliable, lower throughput
 *
 *
 *  ORBITAL INTERNET — WHAT YOU CAN DO:
 *  -----------------------------------
 *  AWS Ground Station is NOT continuous internet like Starlink.
 *  But you CAN build orbital internet-like behaviors:
 *
 *    1. Store-and-forward networks:
 *       Satellite collects → dumps during passes → AWS distributes globally.
 *
 *    2. Delay-Tolerant Networking (DTN):
 *       Perfect for remote sensors, oceans, polar regions, disaster zones.
 *
 *    3. Global broadcast:
 *       Satellite → AWS → CloudFront/S3/Kinesis → entire planet.
 *
 *    4. Orbital caching:
 *       Satellites carry:
 *         - compressed data
 *         - ML models
 *         - precomputed maps
 *         - sensor fusion results
 *
 *    5. Orbital ML inference:
 *       Satellites run:
 *         - object detection
 *         - anomaly detection
 *         - environmental classification
 *       Then downlink only results, not raw data.
 *
 *
 *  MULTI-SATELLITE CONSTELLATIONS — THE BIG LEAP:
 *  ----------------------------------------------
 *  AWS Ground Station supports multiple satellites.
 *
 *  You can:
 *    - Schedule passes across different orbits
 *    - Merge data from multiple spacecraft
 *    - Build a "virtual constellation"
 *    - Create global coverage patterns
 *    - Fuse optical + radar + IR data
 *
 *  Concept:
 *    "The sky becomes a distributed sensor network."
 *
 *
 *  ORBITAL DATA TYPES — WHAT SATELLITES SEND:
 *  ------------------------------------------
 *  Real satellites downlink:
 *    - Optical imagery
 *    - SAR (radar) imagery
 *    - Infrared / thermal data
 *    - AIS / ADS-B (ship/aircraft tracking)
 *    - Weather data
 *    - Environmental sensors
 *    - RF spectrum captures
 *    - Telemetry / health data
 *    - Command acknowledgements
 *
 *
 *  AWS GROUND STATION SETTINGS YOU SHOULD KNOW:
 *  --------------------------------------------
 *  1. Antenna selection:
 *       - Region
 *       - Antenna type
 *       - Frequency band
 *
 *  2. Mission profile:
 *       - Modulation
 *       - Coding
 *       - Polarization
 *       - Dataflow endpoints
 *
 *  3. Contact scheduling:
 *       - On-demand
 *       - Reserved
 *       - Predictive (based on orbital elements)
 *
 *  4. Dataflow configuration:
 *       - VPC
 *       - Subnets
 *       - Security groups
 *       - Routing tables
 *
 *  5. Downlink processing:
 *       - EC2
 *       - ECS
 *       - Lambda
 *       - Kinesis
 *
 *  6. Storage:
 *       - S3
 *       - Glacier
 *
 *
 *  ORBITAL IDEAS — WHAT YOU CAN DO IN SPACE:
 *  -----------------------------------------
 *  1. Orbital CDN:
 *       Cache data on satellites → broadcast during passes.
 *
 *  2. Orbital ML edge compute:
 *       Run inference in orbit → downlink only results.
 *
 *  3. Orbital sensor fusion:
 *       Combine optical + radar + IR + RF.
 *
 *  4. Orbital weather engine:
 *       Real-time atmospheric modeling from space.
 *
 *  5. Orbital RF mapping:
 *       Detect interference, jamming, illegal transmitters.
 *
 *  6. Orbital disaster response:
 *       Detect fires, floods, storms, earthquakes.
 *
 *  7. Orbital agriculture:
 *       Monitor crop health, soil moisture, irrigation.
 *
 *  8. Orbital maritime awareness:
 *       Track ships globally.
 *
 *  9. Orbital aviation awareness:
 *       Track aircraft globally.
 *
 *  10. Orbital timekeeping:
 *       Ultra-precise timing signals.
 *
 *
 *  THE BIG IDEA — WHY ORBIT MATTERS:
 *  ---------------------------------
 *  Orbit gives you:
 *    - Global perspective
 *    - Planet-scale sensing
 *    - Multi-region visibility
 *    - Disaster resilience
 *    - Independence from ground infrastructure
 *
 *  Orbit is the highest vantage point humanity has.
 *  AWS Ground Station is the bridge between that vantage point and your cloud.
 *
 * ============================================================================
 */
