import React, { useState, useMemo } from 'react';
import { Experiment } from '../../types';
import { AlgorithmBadge } from '../common/AlgorithmBadge';
import { StatusBadge } from '../common/StatusBadge';
import { ExportButton } from '../common/ExportButton';
import {
  formatExecutionTime,
  formatSpeedup,
  formatEfficiency,
  formatNumber,
  formatDistance,
} from '../../utils/formatters';
import { Search, ArrowUpDown, ChevronRight } from 'lucide-react';

interface ResultsDataTableProps {
  experiments: Experiment[];
  onSelectExperiment?: (exp: Experiment) => void;
}

export const ResultsDataTable: React.FC<ResultsDataTableProps> = ({
  experiments,
  onSelectExperiment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [algoFilter, setAlgoFilter] = useState<string>('all');
  const [validityFilter, setValidityFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Experiment>('timestamp');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredExperiments = useMemo(() => {
    return experiments.filter((exp) => {
      const matchSearch =
        exp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.configuration.toLowerCase().includes(searchTerm.toLowerCase());
      const matchAlgo = algoFilter === 'all' || exp.algorithm === algoFilter;
      const matchValidity =
        validityFilter === 'all' || (validityFilter === 'valid' ? exp.valid : !exp.valid);
      return matchSearch && matchAlgo && matchValidity;
    });
  }, [experiments, searchTerm, algoFilter, validityFilter]);

  const sortedExperiments = useMemo(() => {
    return [...filteredExperiments].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredExperiments, sortField, sortAsc]);

  const toggleSort = (field: keyof Experiment) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] shadow-xs">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-[#1e232f] p-3.5">
        <div className="flex flex-1 items-center gap-2.5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search runs, datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-[#2b3344] bg-[#0c0d11] pl-8 pr-2.5 py-1 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Algorithm Filter */}
          <select
            value={algoFilter}
            onChange={(e) => setAlgoFilter(e.target.value)}
            className="rounded border border-[#2b3344] bg-[#0c0d11] px-2 py-1 text-xs font-mono text-slate-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Targets</option>
            <option value="sequential">Sequential</option>
            <option value="openmp">OpenMP</option>
            <option value="mpi">MPI</option>
            <option value="cuda">CUDA</option>
            <option value="hybrid">Hybrid</option>
          </select>

          {/* Validity Filter */}
          <select
            value={validityFilter}
            onChange={(e) => setValidityFilter(e.target.value)}
            className="rounded border border-[#2b3344] bg-[#0c0d11] px-2 py-1 text-xs font-mono text-slate-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Validity</option>
            <option value="valid">Valid Only</option>
            <option value="invalid">Invalid Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400">{filteredExperiments.length} Records</span>
          <ExportButton experiments={filteredExperiments} />
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="border-b border-[#1e232f] bg-[#0c0d11] text-[10px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-3.5 py-2.5">Implementation</th>
              <th
                className="px-3.5 py-2.5 cursor-pointer hover:text-slate-200"
                onClick={() => toggleSort('customerCount')}
              >
                <div className="flex items-center gap-1">
                  <span>Input</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-3.5 py-2.5">Fleet</th>
              <th className="px-3.5 py-2.5">Config</th>
              <th
                className="px-3.5 py-2.5 cursor-pointer hover:text-slate-200"
                onClick={() => toggleSort('executionTimeMs')}
              >
                <div className="flex items-center gap-1">
                  <span>Execution Time</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="px-3.5 py-2.5 cursor-pointer hover:text-slate-200"
                onClick={() => toggleSort('routeDistance')}
              >
                <div className="flex items-center gap-1">
                  <span>Distance</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="px-3.5 py-2.5 cursor-pointer hover:text-slate-200"
                onClick={() => toggleSort('speedupVsSeq')}
              >
                <div className="flex items-center gap-1">
                  <span>Speedup</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="px-3.5 py-2.5 cursor-pointer hover:text-slate-200"
                onClick={() => toggleSort('efficiencyPercent')}
              >
                <div className="flex items-center gap-1">
                  <span>Efficiency</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-3.5 py-2.5">Validity</th>
              <th className="px-3.5 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e232f]">
            {sortedExperiments.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No benchmark records match current filter criteria.
                </td>
              </tr>
            ) : (
              sortedExperiments.map((exp) => (
                <tr
                  key={exp.id}
                  onClick={() => onSelectExperiment && onSelectExperiment(exp)}
                  className="cursor-pointer transition-colors hover:bg-[#181b24]/50"
                >
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <AlgorithmBadge algorithm={exp.algorithm} />
                      <span className="text-slate-400 text-[11px] hidden xl:inline">{exp.datasetName}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-100">
                    {formatNumber(exp.customerCount)}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-300">
                    {exp.vehicleCount}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-300 font-sans text-xs">
                    {exp.configuration}
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold text-slate-100">
                    {formatExecutionTime(exp.executionTimeMs)}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-300">
                    {formatDistance(exp.routeDistance)}
                  </td>
                  <td className="px-3.5 py-2.5 font-bold text-emerald-400">
                    {formatSpeedup(exp.speedupVsSeq)}
                  </td>
                  <td className="px-3.5 py-2.5 text-slate-300">
                    {formatEfficiency(exp.efficiencyPercent)}
                  </td>
                  <td className="px-3.5 py-2.5">
                    <StatusBadge status={exp.valid ? 'VALID' : 'INVALID'} />
                  </td>
                  <td className="px-3.5 py-2.5 text-right">
                    <button
                      className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectExperiment) onSelectExperiment(exp);
                      }}
                    >
                      <span>Inspect</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

