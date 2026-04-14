// ======================================================
// AkashAdapter.js — NEW ARCHITECTURE VERSION
// ======================================================

export default {
  id: "akash",
  name: "Akash Network",

  // ----------------------------------------------------
  // 1. Ping Akash
  // ----------------------------------------------------
  async ping() {
    const url = "https://akash-api.polkachu.com/blocks/latest";
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
  // 2. Fetch jobs from Akash
  // ----------------------------------------------------
  async fetchJobs(deviceId) {
    try {
      const url = "https://akash-api.polkachu.com/akash/market/v1beta3/leases/list";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.leases)) return [];

      return data.leases
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("AkashAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  // ----------------------------------------------------
  // 3. Submit job result to Akash
  // ----------------------------------------------------
  async submitResult(job, result) {
    try {
      const url = `https://akash-api.polkachu.com/akash/market/v1beta3/leases/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("AkashAdapter.submitResult() error:", err);
      throw err;
    }
  },

  // ----------------------------------------------------
  // 4. Normalize Akash job → Pulse job
  // ----------------------------------------------------
  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.price?.amount ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.resources?.cpu?.units ?? 1);
    const memoryRequired = Number(raw.resources?.memory?.quantity ?? 1024);
    const estimatedSeconds = Number(raw.duration ?? 600);

    return {
      id: String(raw.id),
      marketplace: "akash",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.resources?.gpu ? 300 : 100,
      bandwidthNeededMbps: 5
    };
  }
};