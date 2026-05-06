// ============================================================================
// FILE: /PulseOS/Scanner/PulseHeatMap-v16.js
// PULSE OS — v16-IMMORTAL
// UNIVERSAL HEATMAP ORGAN — ROLE-COLOR, PRESENCE, HARMONICS, MULTI-SPIN, DUAL-BAND
// ============================================================================
// ROLE (v16-IMMORTAL):
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
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseHeatMap",
  version: "v16-Immortal",
  layer: "heatmap",
  role: "universal_heatmap_organ",
  lineage: "PulseHeatMap-v12.3-Evo → v16-Immortal",

  evo: {
    heatmapOrgan: true,
    dualBand: true,
    presenceAware: true,
    harmonicAware: true,
    multiSpinAware: true,
    roleColorAware: true,
    environmentAware: true,
    advantageView: true,
    windowSafe: true,

    shifterAware: true,
    pulseTypeAware: true,
    gradientAware: true,
    anomalyOverlayAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroRandomness: true
  },

  contract: {
    always: [],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyHeatMap"
    ]
  }
}
*/

export function createPulseHeatMap({ trace = false } = {}) {
  // ---------------------------------------------------------------------------
  // ENVIRONMENT TEMPLATES
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // INTERNAL HELPERS — GRADIENT / PULSE SIGNATURE / SHIFTER STATIC
  // ---------------------------------------------------------------------------
  function sampleCell(grid, x, y) {
    if (!grid || y < 0 || y >= grid.length) return null;
    if (x < 0 || x >= grid[0].length) return null;
    return grid[y][x];
  }

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
    const gradientDirection = Math.atan2(dY, dX); // radians
    const presenceGradient = clamp(Math.sqrt(pX * pX + pY * pY), 0, 2);

    return {
      gradientMagnitude,
      gradientDirection,
      presenceGradient
    };
  }

  function computePulseSignature(cell) {
    const density = clamp(cell.density ?? 0, 0, 1);
    const wave = clamp(cell.wave ?? 0, 0, 1);
    const presence = clamp(cell.presence ?? 0, 0, 1);
    const contrast = clamp(cell.contrast ?? 0, 0, 1);

    const binaryBand = clamp((density * 0.6 + contrast * 0.4), 0, 1);
    const pulseBand = clamp((wave * 0.7 + presence * 0.3), 0, 1);

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
    // Static-like magenta/cyan glitch band
    if (staticIntensity > 0.8) return "rgb(255, 0, 255)";   // hard magenta
    if (staticIntensity > 0.6) return "rgb(180, 0, 255)";   // violet
    if (staticIntensity > 0.4) return "rgb(0, 255, 255)";   // cyan
    if (staticIntensity > 0.2) return "rgb(120, 255, 255)"; // soft cyan
    return null;
  }

  // ---------------------------------------------------------------------------
  // BASE HEAT COLOR (dual-band)
  // ---------------------------------------------------------------------------
  function baseHeatColorFromValue(v, presence = 0, coherence = 0) {
    const x = clamp(v, 0, 1);
    const p = clamp(presence, 0, 1);
    const h = clamp(coherence, 0, 1);

    const bias = (h * 0.2) - (p * 0.1);
    const y = clamp(x + bias, 0, 1);

    if (y > 0.85) return "rgb(255, 0, 0)";
    if (y > 0.70) return "rgb(255, 80, 0)";
    if (y > 0.55) return "rgb(255, 150, 0)";
    if (y > 0.40) return "rgb(255, 220, 0)";
    if (y > 0.25) return "rgb(180, 255, 0)";
    if (y > 0.10) return "rgb(80, 255, 80)";
    return "rgb(0, 180, 255)";
  }

  // ---------------------------------------------------------------------------
  // ROLE COLOR OVERLAY
  // ---------------------------------------------------------------------------
  function roleColorForCell(cell, envType) {
    const tags = cell.tags || [];
    const has = t => tags.includes(t);

    // NodeAdmin variants
    if (has("nodeadmin") || has("node-admin")) {
      if (envType === "body")  return "rgb(140, 190, 255)"; // user nodeadmin
      if (envType === "home")  return "rgb(230, 210, 170)"; // house nodeadmin
      if (envType === "town")  return "rgb(255, 255, 255)"; // city nodeadmin
      return "rgb(90, 170, 255)";                           // generic
    }

    if (has("reproduction-admin")) return "rgb(60, 210, 120)";   // green
    if (has("castle"))            return "rgb(255, 150, 40)";    // orange
    if (has("server"))            return "rgb(255, 230, 80)";    // yellow
    if (has("expansion"))         return "rgb(255, 60, 60)";     // red

    return null;
  }

  // ---------------------------------------------------------------------------
  // MULTI-SPIN BOOST
  // ---------------------------------------------------------------------------
  function spinBoost(spins, x, y) {
    if (!Array.isArray(spins) || spins.length < 2) return 0;

    let total = 0, count = 0;

    for (let i = 1; i < spins.length; i++) {
      const prev = spins[i - 1][y][x];
      const curr = spins[i][y][x];

      const diff =
        Math.abs(curr.density - prev.density) +
        Math.abs((curr.presence ?? 0) - (prev.presence ?? 0));

      total += diff;
      count++;
    }

    return count ? clamp(total / count, 0, 1) * 0.20 : 0;
  }

  // ---------------------------------------------------------------------------
  // DIAGNOSTICS ENGINE — degradation, inefficiency, drift, imbalance
  // ---------------------------------------------------------------------------
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
    if (cell.presence < presenceAvg * 0.4) {
      issues.push({
        type: "presence-low",
        severity: "low",
        icon: "⬇️"
      });
    }
    if (cell.presence > presenceAvg * 1.8) {
      issues.push({
        type: "presence-spike",
        severity: "medium",
        icon: "⬆️"
      });
    }

    // 4. Density degradation (node wearing out)
    if (cell.density < 0.05 && cell.wave > 0.4) {
      issues.push({
        type: "density-degradation",
        severity: "high",
        icon: "🛑"
      });
    }

    // 5. Contrast collapse (visual cortex blind spot)
    if (cell.contrast < 0.05 && cell.density > 0.3) {
      issues.push({
        type: "contrast-collapse",
        severity: "medium",
        icon: "❗"
      });
    }

    // 6. Role-specific warnings
    if (cell.tags?.includes("server") && cell.density > 0.85) {
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

  // ---------------------------------------------------------------------------
  // CORE: GRID → HEATMAP POINTS
  // ---------------------------------------------------------------------------
  function buildEnvironmentHeatMap({
    grid,
    envType,
    spins = null,
    presenceAvg = 0,
    harmonicDrift = 0,
    coherenceScore = 0
  }) {
    const tmpl = templates[envType] || templates.body;
    const H = grid.length;
    const W = grid[0].length;

    const points = [];

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const cell = grid[y][x];

        let value =
          0.40 * cell.density +
          0.25 * cell.contrast +
          0.20 * cell.wave +
          0.15 * (cell.presence ?? 0);

        value += spinBoost(spins, x, y);

        const gradientInfo = computeLocalGradient(grid, x, y);
        const pulseSignature = computePulseSignature(cell);
        const shifterStatic = computeShifterStatic(
          cell,
          gradientInfo.gradientMagnitude,
          harmonicDrift
        );

        const heatColor = baseHeatColorFromValue(
          value,
          presenceAvg,
          coherenceScore
        );
        const roleColor = roleColorForCell(cell, envType);

        const shifterColor =
          shifterOverlayColor(shifterStatic.shifterStaticIntensity);

        // Final color priority:
        //   1. Shifter overlay (if present)
        //   2. Role color
        //   3. Base heat color
        const finalColor = shifterColor || roleColor || heatColor;

        const diagnostics = diagnoseCell(cell, {
          presenceAvg,
          harmonicDrift,
          coherenceScore,
          envType,
          gradientMagnitude: gradientInfo.gradientMagnitude,
          pulseSignature,
          shifterStatic
        });

        const { envX, envY } = tmpl.mapCoord(x, y, W - 1, H - 1);

        points.push({
          // core coordinates
          x,
          y,
          envX,
          envY,
          sprite: tmpl.sprite,

          // scalar value + color stack
          value,
          color: finalColor,
          heatColor,
          roleColor,
          shifterOverlayColor: shifterColor,

          // diagnostics
          diagnostics,                     // list of issues + icons
          warningIcon: diagnostics[0]?.icon ?? null,
          severity: diagnostics[0]?.severity ?? "none",

          // dual-band / pulse signature
          binaryBand: pulseSignature.binaryBand,
          pulseBand: pulseSignature.pulseBand,
          dualBandCoherence: pulseSignature.dualBandCoherence,
          pulseType: pulseSignature.pulseType, // "surge" | "active" | "idle" | "cold"

          // gradient / presence field
          gradientMagnitude: gradientInfo.gradientMagnitude,
          gradientDirection: gradientInfo.gradientDirection,
          presenceGradient: gradientInfo.presenceGradient,

          // shifter-specific overlays
          isShifter: shifterStatic.isShifter,
          shifterStaticIntensity: shifterStatic.shifterStaticIntensity,
          shifterNoiseBand: shifterStatic.shifterNoiseBand,
          shifterEdgeSharpness: shifterStatic.shifterEdgeSharpness,

          // original cell context
          tags: cell.tags,
          presence: cell.presence,
          density: cell.density,
          wave: cell.wave,
          contrast: cell.contrast,

          // global harmonic context
          harmonics: coherenceScore,
          harmonicDrift,
          presenceAvg
        });
      }
    }

    if (trace) {
      console.log(
        "[PulseHeatMap‑v16-IMMORTAL] env:",
        envType,
        "points:",
        points.length
      );
    }

    return {
      envType,
      sprite: tmpl.sprite,
      points
    };
  }

  return {
    registerTemplate,
    buildEnvironmentHeatMap
  };
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
