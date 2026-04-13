// ======================================================
// RenderAdapter.js — NEW ARCHITECTURE VERSION
// ======================================================

export default {
  id: "render",
  name: "Render Network",

  // ----------------------------------------------------
  // 1. Ping Render Network
  // ----------------------------------------------------
  async ping() {
    const url = "https://api.rendernetwork.com/ping";
    const start = Date.now();

    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return Date.now() - start;
    } catch {
      return null;
    }
  },

  // ----------------------------------------------------
  // 2. Fetch jobs from Render Network
  // ----------------------------------------------------
  async fetchJobs(deviceId) {
    try {
      const url = "https://api.rendernetwork.com/jobs";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("RenderAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  // ----------------------------------------------------
  // 3. Submit job result to Render Network
  // ----------------------------------------------------
  async submitResult(job, result) {
    try {
      const url = `https://api.rendernetwork.com/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("RenderAdapter.submitResult() error:", err);
      throw err;
    }
  },

  // ----------------------------------------------------
  // 4. Normalize Render job → Pulse job
  // ----------------------------------------------------
  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.reward ?? raw.payout ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.cpu ?? 2);
    const memoryRequired = Number(raw.memory ?? 2048);
    const estimatedSeconds = Number(raw.estimatedSeconds ?? 900);

    return {
      id: String(raw.id),
      marketplace: "render",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpuRequired ? 400 : 150,
      bandwidthNeededMbps: raw.assetSizeMB ? raw.assetSizeMB / 10 : 10
    };
  }
};