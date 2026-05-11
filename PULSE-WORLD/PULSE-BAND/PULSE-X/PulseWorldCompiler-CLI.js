/**
===============================================================================
FILE: PulseWorldCompiler-CLI.js
PURPOSE: Dedicated CLI wrapper for PulseWorldCompiler-v20
LAYER: NON-IMMORTAL (runtime-only)
===============================================================================

WHY THIS FILE EXISTS
--------------------
PulseWorldCompiler-v20 is an IMMORTAL organ. IMMORTAL organs must be:

  • deterministic
  • drift-proof
  • environment-agnostic
  • path-agnostic
  • runtime-agnostic
  • free of Node-only globals (process, argv, cwd)
  • free of runtime identity checks (import.meta.url)
  • free of CLI detection logic

The IMMORTAL contract *forbids* any code that behaves differently depending on
how the file is executed. That includes:

  ✗ process.argv
  ✗ process.exit
  ✗ import.meta.url comparisons
  ✗ CLI-mode detection
  ✗ runtime branching

These are ALL nondeterministic and environment-dependent.

Therefore, CLI mode MUST be isolated in a separate file that is NOT an organ.

This file is allowed to:
  ✓ use process
  ✓ use argv
  ✓ use import.meta.url
  ✓ use Node-only APIs
  ✓ behave nondeterministically
  ✓ exit the process
  ✓ detect direct invocation

This keeps the IMMORTAL organ pure and deterministic.
===============================================================================
*/

import { PulseWorldCompile } from "../../PULSE-UI/_CREATION_BARRIER/PulseWorldCompiler-v20.js";
// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;


// ============================================================================
// CLI MODE — RUNTIME-ONLY, NON-DETERMINISTIC
// ----------------------------------------------------------------------------
// This block checks whether THIS FILE was executed directly via Node:
//
//     node PulseWorldCompiler-CLI.js
//
// If so, it runs the compiler and exits the process.
//
// This logic is *not allowed* inside an IMMORTAL organ, but it is perfectly
// valid here because this file is NOT part of the deterministic dependency
// graph. It is a runtime wrapper only.
// ============================================================================
if (import.meta.url === `file://${process.argv[1]}`) {
  PulseWorldCompile()
    .then(() => {
      console.log("✔ PulseWorldCompiler completed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("✖ PulseWorldCompiler failed:", err);
      process.exit(1);
    });
}
