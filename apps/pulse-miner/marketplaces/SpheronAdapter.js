// ======================================================
// SpheronAdapter.js — NEW ARCHITECTURE VERSION
// ======================================================

export default {
  id: "spheron",
  name: "Spheron Compute",

  // ----------------------------------------------------
  // 1. Ping Spheron
  // ----------------------------------------------------
  async ping() {
    const url = "https://api-v2.spheron.network/health";
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
  // 2. Fetch jobs from Spheron
  // ----------------------------------------------------
  async fetchJobs(deviceId) {
    try {
      const url = "https://api-v2.spheron.network/compute/jobs";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("SpheronAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  // ----------------------------------------------------
  // 3. Submit job result to Spheron
  // ----------------------------------------------------
  async submitResult(job, result) {
    try {
      const url = `https://api-v2.spheron.network/compute/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("SpheronAdapter.submitResult() error:", err);
      throw err;
    }
  },

  // ----------------------------------------------------
  // 4. Normalize Spheron job → Pulse job
  // ----------------------------------------------------
  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.payout ?? raw.price ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.cpu ?? 1);
    const memoryRequired = Number(raw.memory ?? 1024);
    const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

    return {
      id: String(raw.id),
      marketplace: "spheron",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpu ? 300 : 100,
      bandwidthNeededMbps: 5
    };
  }
};