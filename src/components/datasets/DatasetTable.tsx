import React from 'react';
import { Dataset } from '../../types';
import { ExternalLink, Play, Database } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface DatasetTableProps {
  datasets: Dataset[];
  selectedDatasetId: string;
  onSelectDataset: (id: string) => void;
  onLoadForBenchmark: (dataset: Dataset) => void;
}

export const DatasetTable: React.FC<DatasetTableProps> = ({
  datasets,
  selectedDatasetId,
  onSelectDataset,
  onLoadForBenchmark,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1e232f] bg-[#13161c] shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="border-b border-[#1e232f] bg-[#0c0d11] text-[10px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-3.5 py-2.5">Dataset Instance</th>
              <th className="px-3.5 py-2.5">Source</th>
              <th className="px-3.5 py-2.5">Type</th>
              <th className="px-3.5 py-2.5">Customers</th>
              <th className="px-3.5 py-2.5">Fleet</th>
              <th className="px-3.5 py-2.5">Capacity</th>
              <th className="px-3.5 py-2.5">Best Known (BKS)</th>
              <th className="px-3.5 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e232f]/60">
            {datasets.map((d) => {
              const isSelected = d.id === selectedDatasetId;

              return (
                <tr
                  key={d.id}
                  onClick={() => onSelectDataset(d.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#181b24]' : 'hover:bg-[#181b24]/50'
                  }`}
                >
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border ${
                          isSelected
                            ? 'border-blue-500/60 bg-blue-950/40 text-blue-300'
                            : 'border-[#1e232f] bg-[#181b24] text-slate-400'
                        }`}
                      >
                        <Database className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100">{d.name}</div>
                        {d.comment && (
                          <div className="text-[10px] text-slate-500 max-w-xs truncate font-sans">
                            {d.comment}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-1 text-slate-300">
                      <span>{d.source || 'Local'}</span>
                      {d.sourceUrl && (
                        <a
                          href={d.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-400 hover:underline"
                          title="Open repository"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </td>

                  <td className="px-3.5 py-2.5">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase border ${
                        d.type === 'real'
                          ? 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50'
                          : d.type === 'synthetic'
                          ? 'bg-blue-950/40 text-blue-300 border-blue-800/50'
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                      }`}
                    >
                      {d.type}
                    </span>
                  </td>

                  <td className="px-3.5 py-2.5 font-semibold text-slate-100">
                    {formatNumber(d.customerCount)}
                  </td>

                  <td className="px-3.5 py-2.5 text-slate-300">
                    {d.vehicleCount}
                  </td>

                  <td className="px-3.5 py-2.5 text-slate-300">
                    {d.capacity}
                  </td>

                  <td className="px-3.5 py-2.5 text-emerald-400 font-semibold">
                    {d.bestKnownSolution ? `${d.bestKnownSolution.toFixed(1)} km` : '—'}
                  </td>

                  <td className="px-3.5 py-2.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadForBenchmark(d);
                      }}
                      className="inline-flex items-center gap-1 rounded border border-[#2b3344] bg-[#181b24] px-2 py-1 text-xs font-medium text-slate-200 hover:bg-[#1e232f] hover:text-white"
                    >
                      <Play className="h-3 w-3 text-slate-400" />
                      <span>Benchmark</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
