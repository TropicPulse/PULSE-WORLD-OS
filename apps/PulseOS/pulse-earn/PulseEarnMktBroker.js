// ============================================================================
//  RunPodAdapter.js — v9.3
//  PulseOS Marketplace Organ • RunPod Bare-Metal / GPU Jobs
// ============================================================================
//
//  WHAT THIS ORGAN IS:
//  --------------------
//  • Marketplace adapter for RunPod.
//  • Knows how to:
//      - register device (logical identity)
//      - request jobs
//      - submit job results
//      - normalize RunPod jobs into Pulse-native shape
//  • Deterministic, importless, marketplace-only.
//
//  WHAT THIS ORGAN IS NOT:
//  ------------------------
//  • Not EarnEngine.
//  • Not a router.
//  • Not a mesh layer.
//  • Not a GPU driver.
//  • Not OS / business logic.
//  • Not a scaling brain.
//
//  SAFETY CONTRACT (v9.3):
//  ------------------------
//  • No imports.
//  • No randomness.
//  • No timestamps for logic decisions.
//  • No external mutation beyond RunPod HTTP calls.
//  • Pure, deterministic marketplace organ.
// ============================================================================

// ⭐ PulseRole — identifies this as the RunPod v9.3 Marketplace Organ
export const PulseRole = {
  type: "MarketplaceAdapter",
  subsystem: "Marketplace",
  layer: "RunPod",
  version: "9.3",
  identity: "RunPodAdapter-v9.3",

  evo: {
    driftProof: true,
    marketplaceAware: true,
    gpuAware: true,
    earnEngineReady: true,
    routerAwareReady: true,
    futureEvolutionReady: true,
    unifiedAdvantageField: true
  },

  marketplace: "RunPod",
  contract: "RunPod-v1",
  earnCompatibility: "PulseEarn-v9",
  pulseContract: "Pulse-v2.1"
};

// ============================================================================
//  CONFIG — You wire these via env / secrets
// ============================================================================

const RUNPOD_API_KEY =
  process.env.RUNPOD_API_KEY || "<PUT_YOUR_RUNPOD_API_KEY_HERE>";

const RUNPOD_BASE_URL = "https://api.runpod.io";

// Typical v2 endpoints (adjust if your account uses different paths)
const RUNPOD_REGISTER_URL = `${RUNPOD_BASE_URL}/provider/register`;
const RUNPOD_REQUEST_JOB_URL = `${RUNPOD_BASE_URL}/provider/job/next`;
const RUNPOD_SUBMIT_JOB_URL = `${RUNPOD_BASE_URL}/provider/job/submit`;

// Safe logger hooks (injected by outer layer)
const _log = global?.log || console.log;
const _error = global?.error || console.error;

// ============================================================================
//  INTERNAL — HTTP helper (deterministic, no retries, no randomness)
// ============================================================================
async function runpodRequest(path, body) {
  const url = path;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${RUNPOD_API_KEY}`
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body || {})
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RunPod HTTP ${res.status}: ${text}`);
  }

  return res.json().catch(() => ({}));
}

// ============================================================================
//  normalizeJob() — Convert RunPod job → Pulse-native job shape
// ============================================================================
export function normalizeJob(runpodJob) {
  if (!runpodJob) return null;

  const jobId = runpodJob.id || runpodJob.jobId || null;
  const payload = runpodJob.input || runpodJob.payload || {};
  const priority = runpodJob.priority || "normal";

  return {
    marketplace: "RunPod",
    jobId,
    payload,
    priority,
    raw: runpodJob
  };
}

// ============================================================================
//  registerDevice() — Logical provider registration
//  NOTE: Some providers don't require explicit registration; this is a
//        deterministic wrapper so EarnEngine can treat all marketplaces the same.
// ============================================================================
export async function registerDevice({ deviceId, gpuInfo = {}, meta = {} } = {}) {
  _log("marketplace", "runpod_register_start", {
    marketplace: "RunPod",
    deviceId: deviceId || null
  });

  // If RunPod doesn't require explicit registration, this can be a no-op
  // or a simple "ping" to validate the API key.
  const body = {
    deviceId: deviceId || null,
    gpu: gpuInfo,
    meta
  };

  try {
    const result = await runpodRequest(RUNPOD_REGISTER_URL, body);

    _log("marketplace", "runpod_register_success", {
      marketplace: "RunPod",
      deviceId: deviceId || null
    });

    return {
      ok: true,
      result
    };
  } catch (err) {
    _error("marketplace", "runpod_register_failed", {
      marketplace: "RunPod",
      deviceId: deviceId || null,
      error: String(err)
    });

    return {
      ok: false,
      error: String(err)
    };
  }
}

// ============================================================================
//  requestJob() — Ask RunPod for the next job
// ============================================================================
export async function requestJob({ deviceId, filters = {} } = {}) {
  _log("marketplace", "runpod_request_job_start", {
    marketplace: "RunPod",
    deviceId: deviceId || null
  });

  const body = {
    deviceId: deviceId || null,
    filters
  };

  try {
    const result = await runpodRequest(RUNPOD_REQUEST_JOB_URL, body);

    const job = result.job || result || null;
    const normalized = normalizeJob(job);

    if (!normalized) {
      _log("marketplace", "runpod_request_job_empty", {
        marketplace: "RunPod",
        deviceId: deviceId || null
      });

      return {
        ok: true,
        job: null
      };
    }

    _log("marketplace", "runpod_request_job_success", {
      marketplace: "RunPod",
      deviceId: deviceId || null,
      jobId: normalized.jobId
    });

    return {
      ok: true,
      job: normalized
    };
  } catch (err) {
    _error("marketplace", "runpod_request_job_failed", {
      marketplace: "RunPod",
      deviceId: deviceId || null,
      error: String(err)
    });

    return {
      ok: false,
      error: String(err),
      job: null
    };
  }
}

// ============================================================================
//  submitJob() — Submit job result back to RunPod
// ============================================================================
export async function submitJob({ jobId, result, error: jobError = null } = {}) {
  _log("marketplace", "runpod_submit_job_start", {
    marketplace: "RunPod",
    jobId: jobId || null
  });

  const body = {
    jobId,
    result: jobError ? null : result,
    error: jobError ? String(jobError) : null
  };

  try {
    const res = await runpodRequest(RUNPOD_SUBMIT_JOB_URL, body);

    _log("marketplace", "runpod_submit_job_success", {
      marketplace: "RunPod",
      jobId: jobId || null
    });

    return {
      ok: true,
      result: res
    };
  } catch (err) {
    _error("marketplace", "runpod_submit_job_failed", {
      marketplace: "RunPod",
      jobId: jobId || null,
      error: String(err)
    });

    return {
      ok: false,
      error: String(err)
    };
  }
}

// ============================================================================
//  EXPORT — Marketplace organ surface
// ============================================================================
export const RunPodAdapter = {
  PulseRole,
  registerDevice,
  requestJob,
  submitJob,
  normalizeJob,
  meta: {
    marketplace: "RunPod",
    version: "9.3",
    layer: "MarketplaceAdapter",
    identity: "RunPodAdapter-v9.3"
  }
};
