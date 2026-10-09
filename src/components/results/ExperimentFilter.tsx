import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface ExperimentFilterProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedAlgo: string;
  onAlgoChange: (algo: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  minCustomers: number;
  onMinCustomersChange: (val: number) => void;
  onReset: () => void;
}

export const ExperimentFilter: React.FC<ExperimentFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedAlgo,
  onAlgoChange,
  selectedStatus,
  onStatusChange,
  minCustomers,
  onMinCustomersChange,
  onReset,
}) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 shadow-xs space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
        <div className="flex items-center gap-1.5 font-semibold uppercase text-slate-200">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span>Filter Benchmark Runs</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div>
          <label className="block text-[9px] uppercase text-slate-400 mb-1">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="EXP ID, dataset..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded border border-[#2b3344] bg-[#181b24] pl-8 pr-2.5 py-1 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[9px] uppercase text-slate-400 mb-1">Target Architecture</label>
          <select
            value={selectedAlgo}
            onChange={(e) => onAlgoChange(e.target.value)}
            className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1 text-slate-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Targets</option>
            <option value="sequential">Sequential</option>
            <option value="openmp">OpenMP</option>
            <option value="mpi">MPI</option>
            <option value="cuda">CUDA</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-[9px] uppercase text-slate-400 mb-1">Validity Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1 text-slate-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Records</option>
            <option value="valid">Valid Only</option>
            <option value="invalid">Invalid Only</option>
          </select>
        </div>

        <div>
          <label className="block text-[9px] uppercase text-slate-400 mb-1">
            Min Customers: <span className="text-slate-100 font-semibold">{minCustomers}</span>
          </label>
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={minCustomers}
            onChange={(e) => onMinCustomersChange(Number(e.target.value))}
            className="w-full accent-blue-500 mt-1"
          />
        </div>
      </div>
    </div>
  );
};
