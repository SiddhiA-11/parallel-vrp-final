/**
 * Formatting utilities for HPC benchmarks, timings, metrics, and hardware.
 */

export function formatExecutionTime(ms: number | undefined | null): string {
  if (ms === undefined || ms === null || isNaN(ms)) return '—';
  if (ms === 0) return '0.00 ms';
  if (ms < 1) {
    return `${(ms * 1000).toFixed(0)} µs`;
  }
  if (ms < 1000) {
    return `${ms.toFixed(2)} ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(2)} s`;
  }
  const mins = Math.floor(seconds / 60);
  const remSec = (seconds % 60).toFixed(1);
  return `${mins}m ${remSec}s`;
}

export function formatSpeedup(speedup: number | undefined | null): string {
  if (speedup === undefined || speedup === null || isNaN(speedup)) return '—';
  return `${speedup.toFixed(2)}×`;
}

export function formatEfficiency(efficiency: number | undefined | null): string {
  if (efficiency === undefined || efficiency === null || isNaN(efficiency)) return '—';
  return `${efficiency.toFixed(1)}%`;
}

export function formatDistance(dist: number | undefined | null, unit: string = 'km'): string {
  if (dist === undefined || dist === null || isNaN(dist)) return '—';
  return `${dist.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ${unit}`;
}

export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) return '—';
  return num.toLocaleString('en-US');
}

export function formatTimestamp(isoDate: string | undefined | null): string {
  if (!isoDate) return '—';
  try {
    const d = new Date(isoDate);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return isoDate;
  }
}

export function formatBytes(bytes: number | undefined | null): string {
  if (bytes === undefined || bytes === null || isNaN(bytes)) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function formatPercent(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return `${(val * 100).toFixed(1)}%`;
}
