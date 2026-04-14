// marketplaceB.js
// Example marketplace client template (ESM)

async function ping() {
  try {
    const start = Date.now();
    const res = await fetch("https://example-marketplace-B.com/health");
    if (!res.ok) return null;
    return Date.now() - start;
  } catch {
    return null;
  }
}

async function fetchJobs() {
  try {
    const res = await fetch("https://example-marketplace-B.com/api/jobs");
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// -------------------------------
// NEW: Submit job results
// -------------------------------
async function submitResult(job, result) {
  try {
    const res = await fetch("https://example-marketplace-B.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: job.id,
        result
      })
    });

    if (!res.ok) {
      throw new Error(`Marketplace B submission failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

export const marketplaceB = {
  id: "B",
  name: "Marketplace B",
  ping,
  fetchJobs,
  submitResult
};