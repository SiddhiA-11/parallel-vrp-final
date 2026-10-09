import React from 'react';
import { ArchitectureType, Dataset } from '../../types';
import { Play, Sparkles, Cpu, Server, Zap, Layers } from 'lucide-react';

interface RouteControlsProps {
  datasets: Dataset[];
  selectedDatasetId: string;
  onSelectDataset: (id: string) => void;
  activeAlgorithm: ArchitectureType;
  onSelectAlgorithm: (algo: ArchitectureType) => void;
  onRunAlgorithm: (algo: ArchitectureType) => void;
  onRunAll: () => void;
  onGenerateDataset: () => void;
  isRunning: boolean;
  selectedDataset: Dataset | null;
}

export const RouteControls: React.FC<RouteControlsProps> = ({
  datasets,
  selectedDatasetId,
  onSelectDataset,
  activeAlgorithm,
  onSelectAlgorithm,
  onRunAlgorithm,
  onRunAll,
  onGenerateDataset,
  isRunning,
  selectedDataset,
}) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 shadow-xs space-y-3">
      {/* Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-end">
        <div>
          <label className="block text-[10px] font-mono font-medium uppercase text-slate-400 mb-1">
            Instance Dataset
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

        {/* Dataset Quick Specs */}
        <div className="rounded border border-[#1e232f] bg-[#0c0d11] px-3 py-1.5 text-xs font-mono flex justify-between items-center text-slate-300">
          <div>
            <span className="text-slate-500">Nodes: </span>
            <span className="font-semibold text-slate-200">{selectedDataset?.customerCount || 0}</span>
          </div>
          <div className="text-slate-700">|</div>
          <div>
            <span className="text-slate-500">Fleet: </span>
            <span className="font-semibold text-slate-200">{selectedDataset?.vehicleCount || 0}</span>
          </div>
          <div className="text-slate-700">|</div>
          <div>
            <span className="text-slate-500">Cap: </span>
            <span className="font-semibold text-slate-200">{selectedDataset?.capacity || 0}</span>
          </div>
        </div>

        <div>
          <button
            onClick={onGenerateDataset}
            className="w-full flex items-center justify-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-3 py-1.5 text-xs font-mono font-medium text-slate-200 transition-colors hover:bg-[#232836] cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            <span>Generate Instance</span>
          </button>
        </div>

        <div>
          <button
            onClick={onRunAll}
            disabled={isRunning}
            className="w-full flex items-center justify-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-mono font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Run All 5 Implementations</span>
          </button>
        </div>
      </div>

      {/* Architecture Buttons Segmented Group */}
      <div className="border-t border-[#1e232f] pt-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-medium uppercase text-slate-400">
            Select &amp; Execute Architecture:
          </span>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'sequential' as const, label: 'Sequential', icon: null },
              { id: 'openmp' as const, label: 'OpenMP', icon: <Cpu className="h-3.5 w-3.5 text-blue-400" /> },
              { id: 'mpi' as const, label: 'MPI', icon: <Server className="h-3.5 w-3.5 text-teal-400" /> },
              { id: 'cuda' as const, label: 'CUDA', icon: <Zap className="h-3.5 w-3.5 text-amber-400" /> },
              { id: 'hybrid' as const, label: 'Hybrid', icon: <Layers className="h-3.5 w-3.5 text-indigo-400" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAlgorithm(item.id);
                  onRunAlgorithm(item.id);
                }}
                disabled={isRunning}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-colors border cursor-pointer ${
                  activeAlgorithm === item.id
                    ? 'border-[#2b3344] bg-[#181b24] text-white font-semibold'
                    : 'border-[#1e232f] bg-[#0c0d11] text-slate-400 hover:bg-[#181b24] hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

