import React from 'react';
import { ArchitectureType, Dataset, HardwareConfig } from '../../types';
import { Play, Settings } from 'lucide-react';

interface BenchmarkConfigPanelProps {
  datasets: Dataset[];
  selectedDatasetId: string;
  onSelectDataset: (id: string) => void;
  selectedAlgorithm: ArchitectureType | 'all';
  onSelectAlgorithm: (algo: ArchitectureType | 'all') => void;
  config: HardwareConfig;
  onChangeConfig: (newConfig: HardwareConfig) => void;
  onRunBenchmark: () => void;
  isRunning: boolean;
}

export const BenchmarkConfigPanel: React.FC<BenchmarkConfigPanelProps> = ({
  datasets,
  selectedDatasetId,
  onSelectDataset,
  selectedAlgorithm,
  onSelectAlgorithm,
  config,
  onChangeConfig,
  onRunBenchmark,
  isRunning,
}) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
            Experiment Configuration
          </h3>
        </div>
        <span className="font-mono text-[11px] text-slate-400">CVRP Benchmark Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Dataset Dropdown */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1">
            Benchmark Dataset
          </label>
          <select
            value={selectedDatasetId}
            onChange={(e) => onSelectDataset(e.target.value)}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.customerCount} nodes, C={d.capacity})
              </option>
            ))}
          </select>
        </div>

        {/* Implementation Selector */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1">
            Target Implementation
          </label>
          <select
            value={selectedAlgorithm}
            onChange={(e) => onSelectAlgorithm(e.target.value as any)}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">ALL (Full Comparison Suite)</option>
            <option value="sequential">Sequential (Baseline C++)</option>
            <option value="openmp">OpenMP (Multi-Core CPU)</option>
            <option value="mpi">MPI (Distributed Memory)</option>
            <option value="cuda">CUDA (GPU Parallel)</option>
            <option value="hybrid">Hybrid (MPI + OpenMP)</option>
          </select>
        </div>

        {/* OpenMP Threads */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1 flex justify-between">
            <span>OpenMP Threads</span>
            <span className="text-slate-200 font-semibold">{config.openMpThreads}T</span>
          </label>
          <select
            value={config.openMpThreads}
            onChange={(e) => onChangeConfig({ ...config, openMpThreads: Number(e.target.value) })}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            {[1, 2, 4, 8, 16, 32].map((t) => (
              <option key={t} value={t}>
                {t} Threads
              </option>
            ))}
          </select>
        </div>

        {/* MPI Processes */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1 flex justify-between">
            <span>MPI Processes</span>
            <span className="text-slate-200 font-semibold">{config.mpiProcesses}P</span>
          </label>
          <select
            value={config.mpiProcesses}
            onChange={(e) => onChangeConfig({ ...config, mpiProcesses: Number(e.target.value) })}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            {[1, 2, 4, 8, 16].map((p) => (
              <option key={p} value={p}>
                {p} Processes
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-end border-t border-[#1e232f] pt-3">
        {/* CUDA Block Size */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1 flex justify-between">
            <span>CUDA Block Size</span>
            <span className="text-slate-200 font-semibold">{config.cudaBlockSize}</span>
          </label>
          <select
            value={config.cudaBlockSize}
            onChange={(e) => onChangeConfig({ ...config, cudaBlockSize: Number(e.target.value) })}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            {[64, 128, 256, 512].map((b) => (
              <option key={b} value={b}>
                {b} Threads/Block ({b / 32} Warps)
              </option>
            ))}
          </select>
        </div>

        {/* Hybrid Configuration */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1 flex justify-between">
            <span>Hybrid Config</span>
            <span className="text-slate-200 font-semibold">
              {config.hybridMpiProcesses}P × {config.hybridThreadsPerProcess}T
            </span>
          </label>
          <select
            value={`${config.hybridMpiProcesses}x${config.hybridThreadsPerProcess}`}
            onChange={(e) => {
              const [p, t] = e.target.value.split('x').map(Number);
              onChangeConfig({ ...config, hybridMpiProcesses: p, hybridThreadsPerProcess: t });
            }}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="1x4">1 MPI × 4 OpenMP (4 Cores)</option>
            <option value="2x4">2 MPI × 4 OpenMP (8 Cores)</option>
            <option value="4x4">4 MPI × 4 OpenMP (16 Cores)</option>
            <option value="2x8">2 MPI × 8 OpenMP (16 Cores)</option>
          </select>
        </div>

        {/* Random Seed */}
        <div>
          <label className="block text-[10px] font-mono font-medium text-slate-400 uppercase mb-1">
            Random Seed
          </label>
          <input
            type="number"
            value={config.randomSeed}
            onChange={(e) => onChangeConfig({ ...config, randomSeed: Number(e.target.value) })}
            className="w-full rounded border border-[#2b3344] bg-[#0c0d11] px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Primary CTA */}
        <div>
          <button
            onClick={onRunBenchmark}
            disabled={isRunning}
            className="w-full flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-xs font-mono font-semibold text-white shadow-xs transition-colors hover:bg-blue-500 focus:outline-none disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{isRunning ? 'RUNNING EXPERIMENT...' : 'RUN BENCHMARK'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

