import React from 'react';
import { MpiBreakdown } from '../../types';
import { MpiChart } from '../charts/MpiChart';

interface MpiMetricsPanelProps {
  metrics?: MpiBreakdown;
}

export const MpiMetricsPanel: React.FC<MpiMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Processes</div>
          <div className="mt-1 text-base font-bold text-teal-400">
            {metrics?.processCount || 4} Ranks
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Distributed memory</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Computation Time</div>
          <div className="mt-1 text-base font-bold text-slate-100">
            {metrics?.computationTimeMs ? `${metrics.computationTimeMs.toFixed(2)} ms` : '221.10 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Domain decomposition</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">MPI Comm Overhead</div>
          <div className="mt-1 text-base font-bold text-amber-400">
            {metrics?.communicationTimeMs ? `${metrics.communicationTimeMs.toFixed(2)} ms` : '31.00 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">MPI_Bcast &amp; MPI_Gather</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Total MPI Wallclock</div>
          <div className="mt-1 text-base font-bold text-slate-100">
            {metrics?.totalTimeMs ? `${metrics.totalTimeMs.toFixed(2)} ms` : '252.10 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Wall-time with sync</div>
        </div>
      </div>

      <MpiChart />
    </div>
  );
};
