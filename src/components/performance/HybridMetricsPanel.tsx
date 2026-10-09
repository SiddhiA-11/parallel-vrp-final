import React from 'react';
import { HybridBreakdown } from '../../types';
import { Layers } from 'lucide-react';

interface HybridMetricsPanelProps {
  metrics?: HybridBreakdown;
}

export const HybridMetricsPanel: React.FC<HybridMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="space-y-3.5">
      <div className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 p-3.5 font-mono text-xs text-indigo-200">
        <div className="flex items-center gap-2 font-bold text-indigo-300">
          <Layers className="h-4 w-4" />
          <span>MULTI-TIER HYBRID PARALLEL ARCHITECTURE</span>
        </div>
        <p className="mt-1 text-slate-300 font-sans">
          Combines distributed domain decomposition across MPI nodes with intra-node OpenMP thread teams / CUDA device offloading.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">MPI Processes</div>
          <div className="mt-1 text-base font-bold text-teal-400">
            {metrics?.mpiProcesses || 2} Nodes
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Outer parallelism</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Threads / Process</div>
          <div className="mt-1 text-base font-bold text-blue-400">
            {metrics?.threadsPerProcess || 4} Threads
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Inner shared memory</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Computation Time</div>
          <div className="mt-1 text-base font-bold text-emerald-400">
            {metrics?.computationTimeMs ? `${metrics.computationTimeMs.toFixed(2)} ms` : '97.20 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Active worker kernels</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3">
          <div className="text-[10px] uppercase text-slate-400 font-semibold">Inter-Node Comm</div>
          <div className="mt-1 text-base font-bold text-amber-400">
            {metrics?.mpiCommTimeMs ? `${metrics.mpiCommTimeMs.toFixed(2)} ms` : '15.60 ms'}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500">Ring exchange latency</div>
        </div>
      </div>
    </div>
  );
};
