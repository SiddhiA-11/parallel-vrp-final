import React from 'react';
import { Experiment } from '../../types';
import { AlgorithmBadge } from '../common/AlgorithmBadge';
import { StatusBadge } from '../common/StatusBadge';
import { formatExecutionTime, formatSpeedup } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { ArrowRight, History } from 'lucide-react';

interface RecentResultsTableProps {
  experiments: Experiment[];
}

export const RecentResultsTable: React.FC<RecentResultsTableProps> = ({ experiments }) => {
  const recents = experiments.slice(0, 5);

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1e232f] p-3.5">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-400" />
          <h4 className="font-mono text-xs font-bold uppercase text-slate-200">Recent Benchmark Runs</h4>
        </div>
        <Link
          to="/results"
          className="flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300"
        >
          <span>View All Runs</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="border-b border-[#1e232f] bg-[#0c0d11] text-[10px] uppercase text-slate-400">
            <tr>
              <th className="px-3.5 py-2">ID</th>
              <th className="px-3.5 py-2">Implementation</th>
              <th className="px-3.5 py-2">Dataset</th>
              <th className="px-3.5 py-2">Nodes</th>
              <th className="px-3.5 py-2">Execution Time</th>
              <th className="px-3.5 py-2">Speedup</th>
              <th className="px-3.5 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e232f]">
            {recents.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-500 font-mono text-xs">
                  No experiment runs recorded yet.
                </td>
              </tr>
            ) : (
              recents.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#181b24]/50 transition-colors">
                  <td className="px-3.5 py-2 font-bold text-slate-300">{exp.id}</td>
                  <td className="px-3.5 py-2">
                    <AlgorithmBadge algorithm={exp.algorithm} />
                  </td>
                  <td className="px-3.5 py-2 text-slate-300">{exp.datasetName}</td>
                  <td className="px-3.5 py-2 text-slate-100 font-semibold">{exp.customerCount}</td>
                  <td className="px-3.5 py-2 text-slate-200 font-semibold">{formatExecutionTime(exp.executionTimeMs)}</td>
                  <td className="px-3.5 py-2 text-emerald-400 font-bold">{formatSpeedup(exp.speedupVsSeq)}</td>
                  <td className="px-3.5 py-2">
                    <StatusBadge status={exp.valid ? 'VALID' : 'INVALID'} />
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

