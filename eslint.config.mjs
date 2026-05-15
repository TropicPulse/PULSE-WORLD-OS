import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],

    ignores: [
      "PULSE-UNIVERSE/PULSE-WORLD/PULSE-BAND/X-PULSE-X/PULSE-WORLD-OS.js"
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
      // PULSE-OS NAMING DIALECT
      // ============================================================
      "camelcase": [
        "warn",
        {
          allow: [
            "^Pulse",
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

      // // ============================================================
      // // IMMUTABLE PULSE EVOLUTION
      // // ============================================================
      // "no-param-reassign": [
      //   "error",
      //   {
      //     props: true,
      //     ignorePropertyModificationsFor: [
      //       "Pulse",
      //       "OS",
      //       "req",
      //       "res",
      //       "input",
      //       "intent",
      //       "target",
      //       "name"
      //     ]
      //   }
      // ],

      // ============================================================
      // DETERMINISTIC TIME
      // ============================================================
      "no-restricted-properties": [
        "warn",
        {
          object: "Date",
          property: "now",
          message: "Use admin.firestore.Timestamp.now() for deterministic time."
        }
      ],

      // ============================================================
      // DETERMINISTIC RANDOMNESS
      // ============================================================
      "no-restricted-globals": [
        "error",
        {
          name: "Math.random",
          message: "Use generateToken() — randomness is restricted in Pulse‑OS."
        }
      ],

      // ============================================================
      // NO DIRECT CONSOLE
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
  // IMMUNE ORGANS OVERRIDE — allow Date.now(), Math.random(), timers
  // ============================================================
  {
    files: [
      "**/PulseProxy*.js",
      "**/PulseProxyBinary*.js",
      "**/PulseOSLongTermMemory*.js",
      "**/WBC*.js",
      "**/*Healer*.js",
      "**/*Immune*.js",
      "**/*Membrane*.js",
      "**/PULSE-WORLD*.js",      
      "**/PULSE-UNIVERSE*.js",
      "**/*ProxySpine*.js",
      "**/*Vault*.js",
      "**/*Wallet*.js",
      "**/*Point*.js",
      "**/*ProxyBlood*.js"
    ],
    rules: {
      "no-restricted-properties": "off",
      "no-restricted-globals": "off"
    }
  }
];