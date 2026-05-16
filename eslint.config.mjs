import globals from "globals";

export default [

  // ============================================================
  // 1. GLOBAL RULESET — applies to ALL JS in the organism
  // ============================================================
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],

    ignores: [
      // OS‑level compiled organism
      "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-BAND/X-PULSE-X/PULSE-WORLD-OS.js"
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {

      // ============================================================
      // CRITICAL — REAL BUGS
      // ============================================================
      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
      "preserve-caught-error": "error",

      // ============================================================
      // PULSE‑WORLD NAMING DIALECT
      // ============================================================
      "camelcase": [
        "warn",
        {
          allow: [
            "^Pulse",
            "^PULSE",
            "^OS",
            "^u[A-Z]",
            ".*_.*",
            "^[A-Z0-9_]+$",
            "^req$",
            "^res$"
          ],
          properties: "never",
          ignoreDestructuring: true
        }
      ],

      // ============================================================
      // UNUSED VARS — PULSE DIALECT
      // ============================================================
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^(Pulse|OS|u|log|warn|error|err)|.*_.*",
          argsIgnorePattern: "^(Pulse|OS|u|log|warn|error|err|_)|.*_.*"
        }
      ],

      // ============================================================
      // DETERMINISTIC TIME (except immune/proxy overrides)
      // ============================================================
      "no-restricted-properties": [
        "warn",
        {
          object: "Date",
          property: "now",
          message: "Use deterministic time — PulseWorld forbids Date.now() outside immune/proxy layers."
        }
      ],

      // ============================================================
      // DETERMINISTIC RANDOMNESS
      // ============================================================
      "no-restricted-globals": [
        "error",
        {
          name: "Math.random",
          message: "Use generateToken() — randomness restricted in Pulse‑World."
        }
      ],

      // ============================================================
      // NO DIRECT CONSOLE (except diagnostics)
      // ============================================================
      "no-console": [
        "warn",
        { allow: ["warn", "error"] }
      ],

      // ============================================================
      // EMPTY CATCH ALLOWED IN OS BOOT
      // ============================================================
      "no-empty": [
        "warn",
        { allowEmptyCatch: true }
      ],

      // ============================================================
      // HARMLESS IN YOUR ARCHITECTURE
      // ============================================================
      "no-useless-assignment": "warn",
      "no-self-assign": "warn",
      "no-useless-escape": "warn",

      // ============================================================
      // REASONABLE DEFAULTS
      // ============================================================
      "no-constant-condition": "warn",
      "no-unreachable": "warn",
      "no-extra-semi": "warn",
    },
  },

  // ============================================================
  // 2. IMMUNE / WBC / HEALER / MEMBRANE — randomness + time allowed
  // ============================================================
  {
    files: [
      "**/*WBC*.js",
      "**/*Immune*.js",
      "**/*Healer*.js",
      "**/*Membrane*.js",
      "**/PulseOSLongTermMemory*.js",
      "**/*ProxyBlood*.js"
    ],
    rules: {
      "no-restricted-properties": "off",
      "no-restricted-globals": "off"
    }
  },

  // ============================================================
  // 3. PROXY LAYER — allowed to mutate, use time, use randomness
  // ============================================================
  {
    files: [
      "**/PulseProxy*.js",
      "**/PulseProxyBinary*.js",
      "**/*ProxySpine*.js",
      "**/*Vault*.js",
      "**/*Wallet*.js",
      "**/*Point*.js"
    ],
    rules: {
      "no-restricted-properties": "off",
      "no-restricted-globals": "off",
      "no-param-reassign": "off"
    }
  },

  // ============================================================
  // 4. MULTIVERSE / UNIVERSE / GALAXY / WORLD — strict deterministic
  // ============================================================
  {
    files: [
      "PULSE-MULTIVERSE/**/*.js",
      "PULSE-UNIVERSE/**/*.js",
      "PULSE-GALAXY/**/*.js",
      "PULSE-WORLD/**/*.js"
    ],
    rules: {
      "no-restricted-properties": "warn",
      "no-restricted-globals": "error",
      "no-param-reassign": [
        "warn",
        {
          props: true,
          ignorePropertyModificationsFor: ["Pulse", "OS", "intent", "target"]
        }
      ]
    }
  },

  // ============================================================
  // 5. PULSE‑BAND — DualBand lanes allowed to mutate
  // ============================================================
  {
    files: [
      "PULSE-WORLD/PULSE-BAND/**/*.js"
    ],
    rules: {
      "no-param-reassign": "off",
      "no-restricted-properties": "warn",
      "no-restricted-globals": "warn"
    }
  },

  // ============================================================
  // 6. X‑PULSE‑X — organism constructor, full override
  // ============================================================
  {
    files: [
      "PULSE-WORLD/PULSE-BAND/X-PULSE-X/**/*.js"
    ],
    rules: {
      "no-restricted-properties": "off",
      "no-restricted-globals": "off",
      "no-param-reassign": "off",
      "no-console": "off"
    }
  },

  // ============================================================
  // 7. PULSEVISION (frontend) — relaxed rules
  // ============================================================
  {
    files: [
      "PULSE-WORLD/PULSEVISION/**/*.js",
      "PULSE-WORLD/PULSEVISION/**/*.jsx"
    ],
    rules: {
      "no-restricted-properties": "off",
      "no-restricted-globals": "off",
      "no-console": "off"
    }
  }

];
