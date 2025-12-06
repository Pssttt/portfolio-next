"use client";

import { useState } from "react";

interface DownloadStats {
  totalDownloads: number;
  uniqueIPs: number;
  lastDownload: string | null;
  downloads: Array<{
    timestamp: string;
    userAgent: string;
    referer: string;
    ip: string;
  }>;
}

export function ResumeStatsViewer() {
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = prompt("Enter admin token:");
      if (!token) return;

      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized or error fetching stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fetchStats}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Loading..." : "View Download Stats"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {stats && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary rounded">
              <p className="text-sm text-muted-foreground">Total Downloads</p>
              <p className="text-2xl font-bold">{stats.totalDownloads}</p>
            </div>
            <div className="p-3 bg-secondary rounded">
              <p className="text-sm text-muted-foreground">Unique Visitors</p>
              <p className="text-2xl font-bold">{stats.uniqueIPs}</p>
            </div>
          </div>

          {stats.lastDownload && (
            <div className="p-3 bg-secondary rounded">
              <p className="text-sm text-muted-foreground">Last Download</p>
              <p className="text-sm font-mono">
                {new Date(stats.lastDownload).toLocaleString()}
              </p>
            </div>
          )}

          <details className="p-3 bg-secondary rounded cursor-pointer">
            <summary className="font-semibold">View All Downloads</summary>
            <div className="mt-3 max-h-64 overflow-y-auto space-y-2">
              {stats.downloads.map((d, i) => (
                <div
                  key={i}
                  className="text-xs p-2 bg-background rounded font-mono"
                >
                  <p>{new Date(d.timestamp).toLocaleString()}</p>
                  <p>IP: {d.ip}</p>
                  <p>Referer: {d.referer}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
