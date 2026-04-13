// ======================================================
// VastAdapter.js — NEW ARCHITECTURE VERSION
// ======================================================

export default {
  id: "vast",
  name: "Vast.ai",

  // ----------------------------------------------------
  // 1. Ping Vast (optional)
  // ----------------------------------------------------
  async ping() {
    const url = "https://api.vast.ai/v0/ping";
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
  // 2. Fetch jobs from Vast
  // ----------------------------------------------------
  async fetchJobs(deviceId) {
    try {
      const url = "https://api.vast.ai/v0/jobs/list";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("VastAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  // ----------------------------------------------------
  // 3. Submit job result to Vast
  // ----------------------------------------------------
  async submitResult(job, result) {
    try {
      const url = `https://api.vast.ai/v0/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("VastAdapter.submitResult() error:", err);
      throw err;
    }
  },

  // ----------------------------------------------------
  // 4. Normalize Vast job → Pulse job
  // ----------------------------------------------------
  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout =
      raw.payout ??
      (raw.price_per_hour ? Number(raw.price_per_hour) : 0);

    const cpuRequired = Number(raw.cpu_required ?? raw.cpu ?? 1);
    const memoryRequired = Number(raw.memory_required ?? raw.ram ?? 1024);
    const estimatedSeconds = Number(raw.estimated_seconds ?? raw.duration ?? 600);

    if (payout <= 0) return null;
    if (estimatedSeconds <= 0) return null;

    return {
      id: String(raw.id),
      marketplace: "vast",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpu_score ?? raw.min_gpu_score ?? 100,
      bandwidthNeededMbps: raw.bandwidth ?? 5
    };
  }
};