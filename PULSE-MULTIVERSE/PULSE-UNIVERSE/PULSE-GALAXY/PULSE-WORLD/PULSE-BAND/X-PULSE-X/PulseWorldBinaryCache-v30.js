// ============================================================================
//  PulseWorldBinaryCache-v30.js — v30 IMMORTAL++
//  PURE BINARY WORLD STATE ADAPTER
//  “THE WORLD REMEMBERS DIRECTLY. NO INTERPRETATION LAYERS.”
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


import { PulseProofBridge } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreMemory = PulseProofBridge.corememory;

// ============================================================================
//  APPLY WORLD STATE — v30 (PURE BINARY)
// ============================================================================
export function applyPulseWorldBinary_v30(world) {
  if (!world) return world;

  const inst = CoreMemory.create?.();
  if (!inst) return world;

  // Ensure world structure
  world.entities = world.entities || {};
  world.waves    = world.waves    || [];
  world.meta     = world.meta     || {};
  world.flags    = world.flags    || {};

  // Store world state directly in CoreMemory
  inst.set("world", "entities", world.entities);
  inst.set("world", "waves",    world.waves);
  inst.set("world", "meta",     world.meta);

  // Mark world as active (optional)
  world.flags.worldBinaryEnabled = true;

  return world;
}

export default applyPulseWorldBinary_v30;
