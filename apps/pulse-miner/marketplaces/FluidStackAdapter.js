// ======================================================
// FluidStackAdapter.js — NEW ARCHITECTURE VERSION
// ======================================================

export default {
  id: "fluidstack",
  name: "FluidStack",

  // ----------------------------------------------------
  // 1. Ping FluidStack
  // ----------------------------------------------------
  async ping() {
    const url = "https://api.fluidstack.io/ping";
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
  // 2. Fetch jobs from FluidStack
  // ----------------------------------------------------
  async fetchJobs(deviceId) {
    try {
      const url = "https://api.fluidstack.io/jobs";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("FluidStackAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  // ----------------------------------------------------
  // 3. Submit job result to FluidStack
  // ----------------------------------------------------
  async submitResult(job, result) {
    try {
      const url = `https://api.fluidstack.io/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("FluidStackAdapter.submitResult() error:", err);
      throw err;
    }
  },

  // ----------------------------------------------------
  // 4. Normalize FluidStack job → Pulse job
  // ----------------------------------------------------
  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.payout ?? raw.price ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.cpu ?? 2);
    const memoryRequired = Number(raw.memory ?? 2048);
    const estimatedSeconds = Number(raw.estimatedSeconds ?? 1200);

    return {
      id: String(raw.id),
      marketplace: "fluidstack",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpuRequired ? 500 : 150,
      bandwidthNeededMbps: raw.dataSizeMB ? raw.dataSizeMB / 20 : 5
    };
  }
};