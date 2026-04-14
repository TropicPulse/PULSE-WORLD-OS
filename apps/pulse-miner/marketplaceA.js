// marketplaceA.js
// Example marketplace client template (ESM)

async function ping() {
  try {
    const start = Date.now();
    const res = await fetch("https://example-marketplace-A.com/ping");
    if (!res.ok) return null;
    return Date.now() - start;
  } catch {
    return null;
  }
}

async function fetchJobs() {
  try {
    const res = await fetch("https://example-marketplace-A.com/jobs");
    if (!res.ok) return [];
    return await res.json(); // must return array of jobs
  } catch {
    return [];
  }
}

// -------------------------------
// NEW: Submit job results
// -------------------------------
async function submitResult(job, result) {
  try {
    const res = await fetch("https://example-marketplace-A.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: job.id,
        result
      })
    });

    if (!res.ok) {
      throw new Error(`Marketplace A submission failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

export const marketplaceA = {
  id: "A",
  name: "Marketplace A",
  ping,
  fetchJobs,
  submitResult
};