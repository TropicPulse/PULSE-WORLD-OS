/**
===============================================================================
FILE: PulseWorldCompiler-CLI-v30.js
PURPOSE: Dedicated CLI wrapper for PulseWorldCompiler-v30
LAYER: NON-IMMORTAL (runtime-only, nondeterministic, environment-bound)
===============================================================================

WHY THIS FILE EXISTS
--------------------
PulseWorldCompiler-v30 is an IMMORTAL organ. IMMORTAL organs must be:

  • deterministic
  • drift-proof
  • environment-agnostic
  • path-agnostic
  • runtime-agnostic
  • free of Node-only globals (process, argv, cwd)
  • free of runtime identity checks (import.meta.url)
  • free of CLI detection logic
  • free of exit(), stdio, or any nondeterministic side-effects

Therefore, CLI mode MUST be isolated in a separate file that is NOT an organ.

This file is allowed to:
  ✓ use process
  ✓ use argv
  ✓ use import.meta.url
  ✓ use Node-only APIs
  ✓ behave nondeterministically
  ✓ exit the process
  ✓ detect direct invocation
  ✓ print logs, errors, stack traces

This keeps the IMMORTAL compiler pure, deterministic, and world-safe.
===============================================================================
*/

import { PulseWorldCompile } from "./PulseWorldCompiler-v30.js";

// ============================================================================
// CLI MODE — RUNTIME-ONLY, NON-DETERMINISTIC
// ----------------------------------------------------------------------------
// Direct invocation check:
//
//     node PulseWorldCompiler-CLI-v30.js
//
// This logic is *forbidden* inside an IMMORTAL organ, but is *required* here.
// ============================================================================
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  const entry = args[0] || "PULSE-INDEX.js";
  const outfile = args[1] || "PULSE-USER.js";

  PulseWorldCompile({ entry, outfile })
    .then(() => {
      console.log("✔ PulseWorldCompiler v30 completed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("✖ PulseWorldCompiler v30 failed:", err);
      process.exit(1);
    });
}
