// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Critical — keep strict
      "no-undef": "error",
      "preserve-caught-error": "error",

      // Noisy — soften to warnings
      "no-unused-vars": "warn",
      "no-empty": "warn",
      "no-useless-assignment": "warn",
      "no-self-assign": "warn",
      "no-useless-escape": "warn",

      // Reasonable defaults
      "no-constant-condition": "warn",
      "no-unreachable": "warn",
      "no-extra-semi": "warn",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
    },
  },
];