import React from 'react';
import { SystemInfo } from '../../types';
import { Server } from 'lucide-react';

interface SystemQuickCardProps {
  systemInfo: SystemInfo | null;
  loading?: boolean;
}

export const SystemQuickCard: React.FC<SystemQuickCardProps> = ({ systemInfo, loading }) => {
  if (loading || !systemInfo) {
    return (
      <div className="h-32 animate-pulse rounded-lg border border-[#1e232f] bg-[#13161c] p-4" />
    );
  }

  const cudaAvailable = systemInfo.cuda.available;

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
        <div className="flex items-center gap-2">
          <Server className="h-3.5 w-3.5 text-slate-400" />
          <h4 className="font-mono text-xs font-bold uppercase text-slate-200">Detected Node Hardware</h4>
        </div>
        <span className="font-mono text-[10px] text-slate-500">{systemInfo.hostName}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 font-mono text-xs">
        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">CPU Model</div>
          <div className="mt-0.5 font-semibold text-slate-200 truncate" title={systemInfo.cpu.model}>
            {systemInfo.cpu.model.split(' ')[0]} {systemInfo.cpu.model.split(' ')[1] || ''}
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">CPU Cores</div>
          <div className="mt-0.5 font-semibold text-blue-400">
            {systemInfo.cpu.cores}C / {systemInfo.cpu.threads}T
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">Memory (RAM)</div>
          <div className="mt-0.5 font-semibold text-emerald-400">
            {systemInfo.memory.totalGb} GB
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">GPU Device</div>
          <div className="mt-0.5 font-semibold text-slate-200 truncate" title={systemInfo.gpu.name}>
            {systemInfo.gpu.name.split(' ')[0]} {systemInfo.gpu.name.split(' ')[1] || ''}
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">CUDA Runtime</div>
          <div
            className={`mt-0.5 font-semibold ${
              cudaAvailable ? 'text-amber-400' : 'text-slate-500'
            }`}
          >
            {cudaAvailable ? systemInfo.cuda.version : 'Unavailable'}
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">OpenMP Spec</div>
          <div className="mt-0.5 font-semibold text-slate-200">
            {systemInfo.openmp.specVersion.split(' ')[0]}
          </div>
        </div>

        <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
          <div className="text-[9px] uppercase text-slate-500">MPI Version</div>
          <div className="mt-0.5 font-semibold text-teal-400">
            {systemInfo.mpi.implementation.split(' ')[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

