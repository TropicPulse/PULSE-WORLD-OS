// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSendMover (v3.0)
//  Provides BOTH:
//    • createPulseSendMover() factory
//    • Unified organ object (PulseSendMover) for PulseSend assembly
// ============================================================================
export const PulseSendMover = {
  PulseRole,

  // Placeholder until wired by PulseSend.js
  move(...args) {
    throw new Error(
      "[PulseSendMover-v3] PulseSendMover.move() was called before initialization. " +
      "Use createPulseSendMover(...) to wire dependencies."
    );
  }
};
