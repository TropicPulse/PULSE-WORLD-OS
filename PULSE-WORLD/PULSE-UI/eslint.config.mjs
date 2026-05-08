import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],

    ignores: [
      // ============================================================
      // THE ONLY OS FILE YOU CURRENTLY HAVE
      // ============================================================
      "PULSE-X/PULSE-WORLD-OS.js"
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
      // NOISE REDUCTION — WARN OR DISABLE
      // ============================================================

      // OS daemon often has unused vars by design
      "no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^(Pulse|OS)", argsIgnorePattern: "^_" }
      ],

      // Allow empty catch blocks in OS boot layers
      "no-empty": [
        "warn",
        { allowEmptyCatch: true }
      ],

      // Harmless in your architecture
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
];
