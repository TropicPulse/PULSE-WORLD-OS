/**
 * ============================================================================
 * ORGAN: PulseSpecsSkeletalTranslator
 * VERSION: v20-IMMORTAL
 * LAYER: DOM (Decrypted Visibility Layer)
 * ROLE: Convert raw DOM → deterministic semantic skeleton (SkeletalSpec)
 * ============================================================================
 *
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
 * HIGH-LEVEL PURPOSE
 * ------------------
 * This organ is the "eyes" of the organism.
 * It takes a DOM snapshot from a browser context (extension, webview, custom
 * client) and produces a *SkeletalSpec* — a minimal, stable, structured
 * representation of what is visibly happening on the page right now.
 *
 * The SkeletalSpec is:
 *   - deterministic
 *   - minimal but expressive
 *   - stable across runs
 *   - safe (no DOM mutation, no PII inference)
 *
 * DOWNSTREAM CONSUMERS
 * --------------------
 *   - Genome organ (PulseSpecsGenomeTranslator-v20)
 *   - Network organ (for DOM↔route correlation)
 *   - Conversation Vault / history UI
 *   - Translation / summarization / annotation organs
 *   - Prewarm / routing / hinting systems
 *
 * IMMORTAL-TIER GUARANTEES
 * ------------------------
 * 1. Determinism:
 *    Same DOM snapshot → same SkeletalSpec.
 *
 * 2. Zero Hallucination:
 *    Only extracts what exists in the DOM.
 *    No invented content, no inferred text.
 *
 * 3. Minimal Interpretation:
 *    Light structural classification only (e.g., "chat", "article").
 *    No semantic summarization, no opinion, no rewriting.
 *
 * 4. Schema Stability:
 *    The SkeletalSpec schema is stable and versioned.
 *    v20-IMMORTAL is a contract, not a suggestion.
 *
 * 5. Safety:
 *    - No DOM writes
 *    - No event injection
 *    - No network calls
 *    - No PII inference
 *
 * INPUT CONTRACT
 * --------------
 * buildSkeletalSpec({
 *   domSnapshot: Document | HTMLElement,
 *   url: string,
 *   title: string,
 *   timestamp: string (ISO 8601)
 * })
 *
 * OUTPUT CONTRACT
 * ---------------
 * SkeletalSpec v20:
 *
 * {
 *   specVersion: "v20-skeletal",
 *   meta: {
 *     url: string,
 *     title: string,
 *     capturedAt: string
 *   },
 *   focus: {
 *     mode: "chat" | "article" | "editor" | "feed" | "form" | "unknown",
 *     primaryRegion: {
 *       selector: string | null,
 *       description: string | null
 *     }
 *   },
 *   content: {
 *     blocks: Array<{
 *       id: string,              // "block-1", "block-2", ...
 *       type: string,            // "heading", "paragraph", "code", "message", ...
 *       role: string | null,     // "user", "assistant", "author", ...
 *       text: string
 *     }>
 *   },
 *   interaction: {
 *     activeElement: {
 *       tag: string | null,
 *       type: string | null,
 *       id: string | null,
 *       classList: string[] | null
 *     },
 *     selection: {
 *       text: string | null
 *     },
 *     scroll: {
 *       scrollTop: number,
 *       scrollHeight: number,
 *       viewportHeight: number
 *     }
 *   }
 * }
 *
 * VERSION LINEAGE (v19 → v20-IMMORTAL)
 * ------------------------------------
 * - Added explicit ORGAN_META and CONTRACT_META semantics.
 * - Added interaction capture (activeElement, selection, scroll).
 * - Added mode inference and primaryRegion description.
 * - Enforced deterministic block IDs and ordering.
 * - Tightened safety and zero-hallucination constraints.
 * - Marked as IMMORTAL-tier: schema is now a hard contract.
 */

// ============================================================================
// PUBLIC ENTRYPOINT
// ============================================================================

/**
 * Build a SkeletalSpec from a DOM snapshot.
 *
 * @param {Object} params
 * @param {Document|HTMLElement} params.domSnapshot - The DOM root to inspect.
 * @param {string} params.url - Current page URL.
 * @param {string} params.title - Current document title.
 * @param {string} params.timestamp - ISO 8601 capture time.
 * @returns {Object} SkeletalSpec v20-IMMORTAL.
 */
export function buildSkeletalSpec({ domSnapshot, url, title, timestamp }) {
  const root = normalizeRoot(domSnapshot);

  const mode = inferModeFromDom(root);
  const primaryRegion = extractPrimaryRegion(root);
  const blocks = extractContentBlocks(root, primaryRegion);

  const activeElement = getActiveElementInfo(root);
  const selection = getSelectionInfo(root);
  const scroll = getScrollInfo(root);

  return {
    specVersion: "v20-skeletal",

    meta: {
      url,
      title,
      capturedAt: timestamp,
    },

    focus: {
      mode,
      primaryRegion,
    },

    content: {
      blocks: blocks.map((block, index) => ({
        id: `block-${index + 1}`,
        type: block.type,
        role: block.role || null,
        text: block.text,
      })),
    },

    interaction: {
      activeElement,
      selection,
      scroll,
    },
  };
}

// ============================================================================
// INTERNAL HELPERS: ROOT NORMALIZATION
// ============================================================================

/**
 * Normalize the root so we always operate on a Document-like object.
 *
 * @param {Document|HTMLElement} domSnapshot
 * @returns {Document|HTMLElement}
 */
function normalizeRoot(domSnapshot) {
  // In a browser extension/content script, domSnapshot will usually be `document`.
  // In tests or special contexts, it might be a subtree.
  return domSnapshot || document;
}

// ============================================================================
// INTERNAL HELPERS: MODE INFERENCE
// ============================================================================

/**
 * Infer high-level page mode from DOM structure.
 *
 * This is intentionally conservative and structural:
 *   - "chat"    → presence of alternating message bubbles, chat containers
 *   - "article" → long-form text, headings, single main content region
 *   - "editor"  → large editable area, code editors, textareas
 *   - "feed"    → repeated card-like items, scrollable list
 *   - "form"    → multiple inputs, labels, submit buttons
 *   - "unknown" → fallback
 *
 * @param {Document|HTMLElement} root
 * @returns {string}
 */
function inferModeFromDom(root) {
  try {
    const body = root.body || root;

    // Very rough heuristics; you can refine these over time.
    if (body.querySelector('[role="log"][aria-live], [data-chat], .chat, .conversation')) {
      return "chat";
    }

    if (body.querySelector("article, [role='article']")) {
      return "article";
    }

    if (body.querySelector("textarea, [contenteditable='true'], .CodeMirror, .monaco-editor")) {
      return "editor";
    }

    if (body.querySelector("form") && body.querySelectorAll("input, textarea, select").length > 3) {
      return "form";
    }

    const cards = body.querySelectorAll("article, .card, [data-feed-item]");
    if (cards.length >= 5) {
      return "feed";
    }

    return "unknown";
  } catch {
    return "unknown";
  }
}

// ============================================================================
// INTERNAL HELPERS: PRIMARY REGION EXTRACTION
// ============================================================================

/**
 * Identify the primary content region.
 *
 * Returns a minimal descriptor:
 *   {
 *     selector: string | null,
 *     description: string | null
 *   }
 *
 * @param {Document|HTMLElement} root
 * @returns {{ selector: string | null, description: string | null }}
 */
function extractPrimaryRegion(root) {
  try {
    const body = root.body || root;

    // Prefer <main> or <article>
    let el =
      body.querySelector("main") ||
      body.querySelector("article") ||
      body.querySelector("[role='main']");

    // Fallback: largest text container
    if (!el) {
      el = findLargestTextContainer(body);
    }

    if (!el) {
      return {
        selector: null,
        description: null,
      };
    }

    return {
      selector: buildDomSelector(el),
      description: describeElement(el),
    };
  } catch {
    return {
      selector: null,
      description: null,
    };
  }
}

/**
 * Find the element with the largest amount of visible text.
 *
 * @param {HTMLElement} root
 * @returns {HTMLElement|null}
 */
function findLargestTextContainer(root) {
  let best = null;
  let bestScore = 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
  while (walker.nextNode()) {
    const el = /** @type {HTMLElement} */ (walker.currentNode);
    if (!isVisible(el)) continue;

    const text = el.innerText || "";
    const score = text.trim().length;

    if (score > bestScore) {
      bestScore = score;
      best = el;
    }
  }

  return best;
}

/**
 * Build a simple CSS-like selector for an element.
 *
 * @param {HTMLElement} el
 * @returns {string}
 */
function buildDomSelector(el) {
  if (!el || !el.tagName) return "";

  const parts = [];
  let current = el;

  while (current && current.tagName && parts.length < 5) {
    let part = current.tagName.toLowerCase();
    if (current.id) {
      part += `#${current.id}`;
      parts.unshift(part);
      break;
    } else {
      if (current.classList && current.classList.length > 0) {
        part += "." + Array.from(current.classList)
          .slice(0, 2)
          .join(".");
      }
      parts.unshift(part);
      current = current.parentElement;
    }
  }

  return parts.join(" > ");
}

/**
 * Describe an element in human-readable terms.
 *
 * @param {HTMLElement} el
 * @returns {string}
 */
function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = el.classList && el.classList.length
    ? "." + Array.from(el.classList).slice(0, 2).join(".")
    : "";
  return `${tag}${id}${cls}`;
}

// ============================================================================
// INTERNAL HELPERS: CONTENT BLOCK EXTRACTION
// ============================================================================

/**
 * Extract content blocks from the DOM in reading order.
 *
 * Blocks are minimal units of visible text with structural typing.
 *
 * @param {Document|HTMLElement} root
 * @param {{ selector: string | null }} primaryRegion
 * @returns {Array<{ type: string, role?: string|null, text: string }>}
 */
function extractContentBlocks(root, primaryRegion) {
  const container = resolvePrimaryContainer(root, primaryRegion);
  if (!container) return [];

  const blocks = [];

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
    null
  );

  while (walker.nextNode()) {
    const el = /** @type {HTMLElement} */ (walker.currentNode);
    if (!isVisible(el)) continue;

    const tag = el.tagName.toLowerCase();

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      const text = (el.innerText || "").trim();
      if (text) {
        blocks.push({
          type: "heading",
          text,
        });
      }
      continue;
    }

    // Paragraph-like
    if (tag === "p" || tag === "li" || tag === "div" || tag === "span") {
      const text = (el.innerText || "").trim();
      if (text && isBlockLevel(el)) {
        blocks.push({
          type: "paragraph",
          text,
        });
      }
      continue;
    }

    // Code blocks
    if (tag === "pre" || tag === "code") {
      const text = (el.innerText || "").trim();
      if (text) {
        blocks.push({
          type: "code",
          text,
        });
      }
      continue;
    }

    // Chat messages (very light heuristic)
    if (el.getAttribute("data-message-role")) {
      const role = el.getAttribute("data-message-role");
      const text = (el.innerText || "").trim();
      if (text) {
        blocks.push({
          type: "message",
          role: role || null,
          text,
        });
      }
      continue;
    }
  }

  return blocks;
}

/**
 * Resolve the primary container element from the primaryRegion descriptor.
 *
 * @param {Document|HTMLElement} root
 * @param {{ selector: string | null }} primaryRegion
 * @returns {HTMLElement|null}
 */
function resolvePrimaryContainer(root, primaryRegion) {
  const body = root.body || root;
  if (primaryRegion && primaryRegion.selector) {
    const el = body.querySelector(primaryRegion.selector);
    if (el) return el;
  }
  return body;
}

/**
 * Check if an element is reasonably visible.
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isVisible(el) {
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return false;
  }
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  return true;
}

/**
 * Rough heuristic: is this element block-level enough to be a content block?
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isBlockLevel(el) {
  const style = window.getComputedStyle(el);
  return style.display === "block" || style.display === "flex" || style.display === "grid";
}

// ============================================================================
// INTERNAL HELPERS: INTERACTION CAPTURE
// ============================================================================

/**
 * Capture active element info (focused input, editor, etc.).
 *
 * @param {Document|HTMLElement} root
 * @returns {{ tag: string|null, type: string|null, id: string|null, classList: string[]|null }}
 */
function getActiveElementInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const el = doc.activeElement;
    if (!el || el === doc.body) {
      return {
        tag: null,
        type: null,
        id: null,
        classList: null,
      };
    }

    const tag = el.tagName ? el.tagName.toLowerCase() : null;
    const type = /** @type {HTMLInputElement} */ (el).type || null;
    const id = el.id || null;
    const classList = el.classList ? Array.from(el.classList) : null;

    return { tag, type, id, classList };
  } catch {
    return {
      tag: null,
      type: null,
      id: null,
      classList: null,
    };
  }
}

/**
 * Capture current text selection (if any).
 *
 * @param {Document|HTMLElement} root
 * @returns {{ text: string|null }}
 */
function getSelectionInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const sel = doc.getSelection ? doc.getSelection() : window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return { text: null };
    }
    const text = sel.toString().trim();
    return {
      text: text || null,
    };
  } catch {
    return {
      text: null,
    };
  }
}

/**
 * Capture scroll state.
 *
 * @param {Document|HTMLElement} root
 * @returns {{ scrollTop: number, scrollHeight: number, viewportHeight: number }}
 */
function getScrollInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const scrollingElement = doc.scrollingElement || doc.documentElement || doc.body;

    return {
      scrollTop: scrollingElement.scrollTop || 0,
      scrollHeight: scrollingElement.scrollHeight || 0,
      viewportHeight: window.innerHeight || 0,
    };
  } catch {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      viewportHeight: 0,
    };
  }
}
