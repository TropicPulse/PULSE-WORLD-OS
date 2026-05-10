// ============================================================================
// FILE: /PulseOS/Scanner/PulseHeatMap-v20-IMMORTAL.js
// PULSE OS — v20-IMMORTAL
// UNIVERSAL HEATMAP ORGAN — ROLE-COLOR, PRESENCE, HARMONICS, MULTI-SPIN, DUAL-BAND, ADVANTAGE VIEW
// ============================================================================
// ROLE (v20-IMMORTAL):
//   - Convert any grid into a universal, role-colored heatmap representation.
//   - Environment-aware (body/home/town/kitchen/crab/etc).
//   - Presence-aware (presenceAvg, presenceGradient).
//   - Harmonics-aware (phaseDrift, coherenceScore).
//   - Dual-band aware (binary + pulse + presence).
//   - Multi-spin aware (spin divergence weighting).
//   - Deterministic color mapping (epoch-stable).
//   - Renderer-agnostic output.
//   - Role-aware overlays (nodeAdmin, reproduction, castle, server, expansion).
//   - Shifter-aware: visually distinct, static-like overlays for shifter pulses.
//   - Advantage-aware: exposes advantageView surfaces for higher-level organs.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseHeatMapMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ---------------------------------------------------------------------------
// BASIC HELPERS
// ---------------------------------------------------------------------------
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ---------------------------------------------------------------------------
// FACTORY
// ---------------------------------------------------------------------------
export function createPulseHeatMap({ trace = false } = {}) {
  // -------------------------------------------------------------------------
  // ENVIRONMENT TEMPLATES
  // -------------------------------------------------------------------------
  const templates = {
    body:    { sprite: "silhouette-body",    mapCoord: (x,y,W,H)=>({envX:x/W,envY:y/H}) },
    home:    { sprite: "silhouette-home",    mapCoord: (x,y,W,H)=>({envX:x/W,envY:y/H}) },
    town:    { sprite: "silhouette-town",    mapCoord: (x,y,W,H)=>({envX:x/W,envY:y/H}) },
    kitchen: { sprite: "silhouette-kitchen", mapCoord: (x,y,W,H)=>({envX:x/W,envY:y/H}) },
    crab:    { sprite: "silhouette-crab",    mapCoord: (x,y,W,H)=>({envX:x/W,envY:y/H}) }
  };

  function registerTemplate(name, sprite, mapCoord) {
    templates[name] = { sprite, mapCoord };
  }

  // -------------------------------------------------------------------------
  // INTERNAL HELPERS — GRID ACCESS
  // -------------------------------------------------------------------------
  function sampleCell(grid, x, y) {
    if (!grid || y < 0 || y >= grid.length) return null;
    if (x < 0 || x >= grid[0].length) return null;
    return grid[y][x];
  }

  // -------------------------------------------------------------------------
  // LOCAL GRADIENT / PRESENCE GRADIENT
  // -------------------------------------------------------------------------
  function computeLocalGradient(grid, x, y) {
    const c = sampleCell(grid, x, y);
    if (!c) {
      return {
        gradientMagnitude: 0,
        gradientDirection: 0,
        presenceGradient: 0
      };
    }

    const left  = sampleCell(grid, x - 1, y) || c;
    const right = sampleCell(grid, x + 1, y) || c;
    const up    = sampleCell(grid, x, y - 1) || c;
    const down  = sampleCell(grid, x, y + 1) || c;

    const dCenter = c.density ?? 0;
    const dX = (right.density ?? dCenter) - (left.density ?? dCenter);
    const dY = (down.density ?? dCenter) - (up.density ?? dCenter);

    const pCenter = c.presence ?? 0;
    const pX = (right.presence ?? pCenter) - (left.presence ?? pCenter);
    const pY = (down.presence ?? pCenter) - (up.presence ?? pCenter);

    const gradientMagnitude = clamp(Math.sqrt(dX * dX + dY * dY), 0, 2);
    const gradientDirection = Math.atan2(dY, dX);
    const presenceGradient = clamp(Math.sqrt(pX * pX + pY * pY), 0, 2);

    return {
      gradientMagnitude,
      gradientDirection,
      presenceGradient
    };
  }

  // -------------------------------------------------------------------------
  // PULSE SIGNATURE (dual-band)
// -------------------------------------------------------------------------
  function computePulseSignature(cell) {
    const density = clamp(cell.density ?? 0, 0, 1);
    const wave = clamp(cell.wave ?? 0, 0, 1);
    const presence = clamp(cell.presence ?? 0, 0, 1);
    const contrast = clamp(cell.contrast ?? 0, 0, 1);

    const binaryBand = clamp(density * 0.6 + contrast * 0.4, 0, 1);
    const pulseBand = clamp(wave * 0.7 + presence * 0.3, 0, 1);

    const dualBandCoherence = clamp(
      1 - Math.abs(binaryBand - pulseBand),
      0,
      1
    );

    const pulseType =
      pulseBand > 0.75
        ? "surge"
        : pulseBand > 0.5
        ? "active"
        : pulseBand > 0.25
        ? "idle"
        : "cold";

    return {
      binaryBand,
      pulseBand,
      dualBandCoherence,
      pulseType
    };
  }

  // -------------------------------------------------------------------------
  // SHIFTER STATIC OVERLAY
  // -------------------------------------------------------------------------
  function computeShifterStatic(cell, gradientMagnitude, harmonicDrift) {
    const isShifter =
      Array.isArray(cell.tags) && cell.tags.includes("shifter");

    if (!isShifter) {
      return {
        isShifter: false,
        shifterStaticIntensity: 0,
        shifterNoiseBand: 0,
        shifterEdgeSharpness: 0
      };
    }

    const density = clamp(cell.density ?? 0, 0, 1);
    const wave = clamp(cell.wave ?? 0, 0, 1);
    const presence = clamp(cell.presence ?? 0, 0, 1);

    const staticBase =
      0.4 * wave +
      0.3 * gradientMagnitude +
      0.2 * harmonicDrift +
      0.1 * (1 - presence);

    const shifterStaticIntensity = clamp(staticBase, 0, 1);
    const shifterNoiseBand = clamp(wave * 0.8 + density * 0.2, 0, 1);
    const shifterEdgeSharpness = clamp(gradientMagnitude * 0.9, 0, 1);

    return {
      isShifter: true,
      shifterStaticIntensity,
      shifterNoiseBand,
      shifterEdgeSharpness
    };
  }

  function shifterOverlayColor(staticIntensity) {
    if (staticIntensity > 0.8) return "rgb(255, 0, 255)";
    if (staticIntensity > 0.6) return "rgb(180, 0, 255)";
    if (staticIntensity > 0.4) return "rgb(0, 255, 255)";
    if (staticIntensity > 0.2) return "rgb(120, 255, 255)";
    return null;
  }

  // -------------------------------------------------------------------------
  // BASE HEAT COLOR (dual-band)
// -------------------------------------------------------------------------
  function baseHeatColorFromValue(v, presence = 0, coherence = 0) {
    const x = clamp(v, 0, 1);
    const p = clamp(presence, 0, 1);
    const h = clamp(coherence, 0, 1);

    const bias = h * 0.2 - p * 0.1;
    const y = clamp(x + bias, 0, 1);

    if (y > 0.85) return "rgb(255, 0, 0)";
    if (y > 0.70) return "rgb(255, 80, 0)";
    if (y > 0.55) return "rgb(255, 150, 0)";
    if (y > 0.40) return "rgb(255, 220, 0)";
    if (y > 0.25) return "rgb(180, 255, 0)";
    if (y > 0.10) return "rgb(80, 255, 80)";
    return "rgb(0, 180, 255)";
  }

  // -------------------------------------------------------------------------
  // ROLE COLOR OVERLAY
  // -------------------------------------------------------------------------
  function roleColorForCell(cell, envType) {
    const tags = cell.tags || [];
    const has = t => tags.includes(t);

    if (has("nodeadmin") || has("node-admin")) {
      if (envType === "body")  return "rgb(140, 190, 255)";
      if (envType === "home")  return "rgb(230, 210, 170)";
      if (envType === "town")  return "rgb(255, 255, 255)";
      return "rgb(90, 170, 255)";
    }

    if (has("reproduction-admin")) return "rgb(60, 210, 120)";
    if (has("castle"))            return "rgb(255, 150, 40)";
    if (has("server"))            return "rgb(255, 230, 80)";
    if (has("expansion"))         return "rgb(255, 60, 60)";

    return null;
  }

  // -------------------------------------------------------------------------
  // MULTI-SPIN BOOST
  // -------------------------------------------------------------------------
  function spinBoost(spins, x, y) {
    if (!Array.isArray(spins) || spins.length < 2) return 0;

    let total = 0, count = 0;

    for (let i = 1; i < spins.length; i++) {
      const prevRow = spins[i - 1][y] || [];
      const currRow = spins[i][y] || [];
      const prev = prevRow[x] || {};
      const curr = currRow[x] || {};

      const diff =
        Math.abs((curr.density ?? 0) - (prev.density ?? 0)) +
        Math.abs((curr.presence ?? 0) - (prev.presence ?? 0));

      total += diff;
      count++;
    }

    return count ? clamp(total / count, 0, 1) * 0.20 : 0;
  }

  // -------------------------------------------------------------------------
  // DIAGNOSTICS ENGINE — full v16 rules, upgraded to v20
  // -------------------------------------------------------------------------
  function diagnoseCell(cell, {
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    envType,
    gradientMagnitude,
    pulseSignature,
    shifterStatic
  }) {
    const issues = [];

    // 1. Low coherence (harmonic instability)
    if (coherenceScore < 0.35) {
      issues.push({
        type: "harmonic-instability",
        severity: coherenceScore < 0.20 ? "high" : "medium",
        icon: "⚠️"
      });
    }

    // 2. High drift (phase instability)
    if (harmonicDrift > 0.55) {
      issues.push({
        type: "phase-drift",
        severity: harmonicDrift > 0.75 ? "high" : "medium",
        icon: "⚡"
      });
    }

    // 3. Presence imbalance (too low or too high)
    if ((cell.presence ?? 0) < presenceAvg * 0.4) {
      issues.push({
        type: "presence-low",
        severity: "low",
        icon: "⬇️"
      });
    }
    if ((cell.presence ?? 0) > presenceAvg * 1.8) {
      issues.push({
        type: "presence-spike",
        severity: "medium",
        icon: "⬆️"
      });
    }

    // 4. Density degradation (node wearing out)
    if ((cell.density ?? 0) < 0.05 && (cell.wave ?? 0) > 0.4) {
      issues.push({
        type: "density-degradation",
        severity: "high",
        icon: "🛑"
      });
    }

    // 5. Contrast collapse (visual cortex blind spot)
    if ((cell.contrast ?? 0) < 0.05 && (cell.density ?? 0) > 0.3) {
      issues.push({
        type: "contrast-collapse",
        severity: "medium",
        icon: "❗"
      });
    }

    // 6. Role-specific warnings
    if (cell.tags?.includes("server") && (cell.density ?? 0) > 0.85) {
      issues.push({
        type: "server-overload",
        severity: "high",
        icon: "🔥"
      });
    }

    if (cell.tags?.includes("castle") && coherenceScore < 0.4) {
      issues.push({
        type: "castle-weakening",
        severity: "medium",
        icon: "🏚️"
      });
    }

    if (cell.tags?.includes("expansion") && harmonicDrift > 0.6) {
      issues.push({
        type: "expansion-instability",
        severity: "high",
        icon: "💥"
      });
    }

    // 7. Gradient anomalies (edges / fractures)
    if (gradientMagnitude > 0.9) {
      issues.push({
        type: "gradient-fracture",
        severity: "high",
        icon: "🪓"
      });
    } else if (gradientMagnitude > 0.6) {
      issues.push({
        type: "gradient-edge",
        severity: "medium",
        icon: "〰️"
      });
    }

    // 8. Dual-band decoherence
    if (pulseSignature.dualBandCoherence < 0.4) {
      issues.push({
        type: "dualband-decoherence",
        severity: "medium",
        icon: "🌀"
      });
    }

    // 9. Shifter-specific anomalies
    if (shifterStatic.isShifter && shifterStatic.shifterStaticIntensity > 0.4) {
      issues.push({
        type: "shifter-static",
        severity:
          shifterStatic.shifterStaticIntensity > 0.75 ? "high" : "medium",
        icon: "📡"
      });
    }

    return issues;
  }

  // -------------------------------------------------------------------------
  // ADVANTAGE VIEW (for higher-level organs)
// -------------------------------------------------------------------------
  function buildAdvantageView({
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    envType,
    width,
    height
  }) {
    const area = width * height;
    const presenceWeight =
      presenceAvg * 0.6 +
      clamp(coherenceScore, 0, 1) * 0.3 -
      clamp(harmonicDrift, 0, 1) * 0.2;

    const envBias =
      envType === "body" ? 1.0 :
      envType === "home" ? 0.9 :
      envType === "town" ? 0.8 :
      envType === "kitchen" ? 0.85 :
      envType === "crab" ? 0.75 :
      0.8;

    const advantageScore = clamp(presenceWeight * envBias, 0, 1);

    return {
      version: "v20-IMMORTAL-ADVANTAGE",
      envType,
      width,
      height,
      area,
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envBias,
      advantageScore
    };
  }

  // -------------------------------------------------------------------------
  // CELL HEAT BUILD (full v20 surface)
// -------------------------------------------------------------------------
  function buildCellHeat({
    grid,
    spins,
    x,
    y,
    envType,
    presenceAvg,
    harmonicDrift,
    coherenceScore
  }) {
    const cell = sampleCell(grid, x, y) || {};
    const { gradientMagnitude, gradientDirection, presenceGradient } =
      computeLocalGradient(grid, x, y);

    const pulseSignature = computePulseSignature(cell);
    const shifterStatic = computeShifterStatic(
      cell,
      gradientMagnitude,
      harmonicDrift
    );

    let value =
      0.40 * (cell.density ?? 0) +
      0.25 * (cell.contrast ?? 0) +
      0.20 * (cell.wave ?? 0) +
      0.15 * (cell.presence ?? 0);

    value += spinBoost(spins, x, y);
    value = clamp(value, 0, 1);

    const baseColor = baseHeatColorFromValue(
      value,
      presenceAvg,
      coherenceScore
    );
    const roleColor = roleColorForCell(cell, envType);
    const shifterColor = shifterOverlayColor(
      shifterStatic.shifterStaticIntensity
    );

    const finalColor = shifterColor || roleColor || baseColor;

    const diagnostics = diagnoseCell(cell, {
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envType,
      gradientMagnitude,
      pulseSignature,
      shifterStatic
    });

    return {
      x,
      y,
      value,
      baseColor,
      roleColor,
      shifterColor,
      finalColor,
      gradientMagnitude,
      gradientDirection,
      presenceGradient,
      pulseSignature,
      shifterStatic,
      diagnostics
    };
  }

  // -------------------------------------------------------------------------
  // MAIN HEATMAP BUILDER
  // -------------------------------------------------------------------------
  function buildHeatMap({
    grid,
    spins = [],
    envType = "body",
    presenceAvg = 0,
    harmonicDrift = 0,
    coherenceScore = 0
  }) {
    if (!Array.isArray(grid) || grid.length === 0) {
      return {
        meta: PulseHeatMapMeta,
        envType,
        width: 0,
        height: 0,
        cells: [],
        advantageView: buildAdvantageView({
          presenceAvg,
          harmonicDrift,
          coherenceScore,
          envType,
          width: 0,
          height: 0
        })
      };
    }

    const height = grid.length;
    const width = grid[0].length;

    const tmpl = templates[envType] || templates.body;
    const cells = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cellHeat = buildCellHeat({
          grid,
          spins,
          x,
          y,
          envType,
          presenceAvg,
          harmonicDrift,
          coherenceScore
        });

        const envCoord = tmpl.mapCoord(x, y, width - 1, height - 1);

        cells.push({
          // coordinates
          x: cellHeat.x,
          y: cellHeat.y,
          envX: envCoord.envX,
          envY: envCoord.envY,
          sprite: tmpl.sprite,

          // scalar + colors
          value: cellHeat.value,
          color: cellHeat.finalColor,
          heatColor: cellHeat.baseColor,
          roleColor: cellHeat.roleColor,
          shifterOverlayColor: cellHeat.shifterColor,

          // diagnostics
          diagnostics: cellHeat.diagnostics,
          warningIcon: cellHeat.diagnostics[0]?.icon ?? null,
          severity: cellHeat.diagnostics[0]?.severity ?? "none",

          // dual-band / pulse signature
          binaryBand: cellHeat.pulseSignature.binaryBand,
          pulseBand: cellHeat.pulseSignature.pulseBand,
          dualBandCoherence: cellHeat.pulseSignature.dualBandCoherence,
          pulseType: cellHeat.pulseSignature.pulseType,

          // gradient / presence field
          gradientMagnitude: cellHeat.gradientMagnitude,
          gradientDirection: cellHeat.gradientDirection,
          presenceGradient: cellHeat.presenceGradient,

          // shifter-specific overlays
          isShifter: cellHeat.shifterStatic.isShifter,
          shifterStaticIntensity: cellHeat.shifterStatic.shifterStaticIntensity,
          shifterNoiseBand: cellHeat.shifterStatic.shifterNoiseBand,
          shifterEdgeSharpness: cellHeat.shifterStatic.shifterEdgeSharpness
        });
      }
    }

    const advantageView = buildAdvantageView({
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envType,
      width,
      height
    });

    if (trace) {
       
      console.log("[PulseHeatMap-v20] built heatmap", {
        envType,
        width,
        height,
        advantageScore: advantageView.advantageScore
      });
    }

    return {
      meta: PulseHeatMapMeta,
      envType,
      sprite: tmpl.sprite,
      width,
      height,
      cells,
      advantageView
    };
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseHeatMapMeta,
    registerTemplate,
    buildHeatMap
  });
}

export default createPulseHeatMap;
