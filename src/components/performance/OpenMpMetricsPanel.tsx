import React from 'react';
import { OpenMpBreakdown } from '../../types';
import { ScalingChart } from '../charts/ScalingChart';

interface OpenMpMetricsPanelProps {
  metrics?: OpenMpBreakdown;
}

export const OpenMpMetricsPanel: React.FC<OpenMpMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">OpenMP Threads</div>
          <div className="mt-1 text-base font-bold text-blue-400">
            {metrics?.threadsUsed || 8} Threads
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Shared-memory concurrency</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Parallel Region</div>
          <div className="mt-1 text-base font-bold text-emerald-400">
            {metrics?.parallelRegionTimeMs ? `${metrics.parallelRegionTimeMs.toFixed(2)} ms` : '116.70 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">#pragma omp parallel for</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Sync &amp; Barrier Cost</div>
          <div className="mt-1 text-base font-bold text-amber-400">
            {metrics?.syncOverheadMs ? `${metrics.syncOverheadMs.toFixed(2)} ms` : '1.82 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Thread sync latency</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Distance Matrix Time</div>
          <div className="mt-1 text-base font-bold text-slate-100">
            {metrics?.distCalcTimeMs ? `${metrics.distCalcTimeMs.toFixed(2)} ms` : '27.60 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Vectorized chunking</div>
        </div>
      </div>

      <ScalingChart />
    </div>
  );
};
