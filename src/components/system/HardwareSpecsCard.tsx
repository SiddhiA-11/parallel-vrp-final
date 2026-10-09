import React from 'react';
import { SystemInfo } from '../../types';
import { Cpu, HardDrive, Zap } from 'lucide-react';

interface HardwareSpecsCardProps {
  systemInfo: SystemInfo;
}

export const HardwareSpecsCard: React.FC<HardwareSpecsCardProps> = ({ systemInfo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* CPU Card */}
      <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            <h4 className="font-mono text-xs font-bold uppercase text-slate-100">Processor (CPU)</h4>
          </div>
          <span className="font-mono text-[10px] text-slate-400">{systemInfo.cpu.architecture}</span>
        </div>

        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Model:</span>
            <span className="text-slate-200 font-medium text-right max-w-[170px] truncate" title={systemInfo.cpu.model}>
              {systemInfo.cpu.model}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cores / Threads:</span>
            <span className="text-blue-400 font-semibold">{systemInfo.cpu.cores} Cores / {systemInfo.cpu.threads} Threads</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">L3 Cache:</span>
            <span>{systemInfo.cpu.l3CacheMb} MB Shared</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Extensions:</span>
            <span className="text-[11px] text-emerald-400">{systemInfo.cpu.extensions?.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Memory Card */}
      <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-slate-400" />
            <h4 className="font-mono text-xs font-bold uppercase text-slate-100">System Memory</h4>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold">{systemInfo.memory.totalGb} GB</span>
        </div>

        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Total Installed:</span>
            <span className="text-slate-200 font-medium">{systemInfo.memory.totalGb} GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Available:</span>
            <span className="text-emerald-400 font-semibold">{systemInfo.memory.availableGb} GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Memory Type:</span>
            <span className="text-slate-400">{systemInfo.memory.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Bandwidth:</span>
            <span className="text-slate-200 font-medium">{systemInfo.memory.bandwidthGbs} GB/s</span>
          </div>
        </div>
      </div>

      {/* GPU / CUDA Card */}
      <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <h4 className="font-mono text-xs font-bold uppercase text-slate-100">GPU &amp; Accelerator</h4>
          </div>
          <span
            className={`font-mono text-[9px] font-bold rounded px-1.5 py-0.5 border ${
              systemInfo.cuda.available
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                : 'bg-[#181b24] text-slate-400 border-[#2b3344]'
            }`}
          >
            {systemInfo.cuda.available ? 'CUDA ACTIVE' : 'UNSET'}
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Device:</span>
            <span className="text-slate-200 font-medium text-right max-w-[160px] truncate" title={systemInfo.gpu.name}>
              {systemInfo.gpu.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">CUDA Runtime:</span>
            <span className={systemInfo.cuda.available ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
              {systemInfo.cuda.version || 'Not Detected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Warp Size:</span>
            <span>{systemInfo.gpu.warpSize || 32} threads</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Driver Version:</span>
            <span className="text-slate-400">{systemInfo.gpu.driverVersion || 'Native Driver'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
