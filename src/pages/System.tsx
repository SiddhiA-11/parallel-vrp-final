import React from 'react';
import { useSystemInfo } from '../hooks/useSystemInfo';
import { HardwareSpecsCard } from '../components/system/HardwareSpecsCard';
import { CudaDiagnosticBanner } from '../components/system/CudaDiagnosticBanner';
import { CompilerTable } from '../components/system/CompilerTable';
import { EnvironmentCard } from '../components/system/EnvironmentCard';
import { LoadingState } from '../components/common/LoadingState';
import { Server, RefreshCw, Cpu, Zap, HardDrive, Terminal } from 'lucide-react';

export const System: React.FC = () => {
  const { systemInfo, loading, refresh, isMockMode, toggleMockMode } = useSystemInfo();

  if (loading || !systemInfo) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-60 rounded bg-slate-800 animate-pulse" />
        <LoadingState type="full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e232f] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              System Diagnostics &amp; HPC Environment
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real hardware probing from /api/system-info: CPU microarchitecture, memory bandwidth, CUDA accelerators, and MPI interconnects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 rounded-md border border-[#2b3344] bg-[#181b24] px-3.5 py-2 text-xs font-mono text-slate-200 hover:bg-[#1e232f] hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5 text-blue-400" />
            <span>Re-Probe Hardware</span>
          </button>
        </div>
      </div>

      {/* CUDA Diagnostic Banner */}
      <CudaDiagnosticBanner cudaInfo={systemInfo.cuda} />

      {/* Hardware Specs Cards (CPU, RAM, GPU) */}
      <HardwareSpecsCard systemInfo={systemInfo} />

      {/* HPC Compilers & Toolchain Table */}
      <CompilerTable
        compilers={systemInfo.compilers}
        openmp={systemInfo.openmp}
        mpi={systemInfo.mpi}
      />

      {/* HPC Environment Variables & Thread Affinities */}
      <EnvironmentCard envVars={systemInfo.environmentVariables} />
    </div>
  );
};
