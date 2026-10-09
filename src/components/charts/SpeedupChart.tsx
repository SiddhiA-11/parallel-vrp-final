import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Tabs } from '../common/Tabs';
import { OPENMP_SCALING_SERIES, MPI_SCALING_SERIES } from '../../mock/demoData';

export const SpeedupChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'openmp' | 'mpi' | 'cuda' | 'hybrid'>('openmp');

  const getChartData = () => {
    switch (activeTab) {
      case 'openmp':
        return OPENMP_SCALING_SERIES.map((d) => ({
          units: `${d.threads}T`,
          actual: d.speedup,
          ideal: d.ideal,
        }));
      case 'mpi':
        return MPI_SCALING_SERIES.map((d) => ({
          units: `${d.processes}P`,
          actual: d.speedup,
          ideal: d.processes,
        }));
      case 'cuda':
        return [
          { units: '64 (2W)', actual: 28.3, ideal: 35.0 },
          { units: '128 (4W)', actual: 36.1, ideal: 42.0 },
          { units: '256 (8W)', actual: 41.3, ideal: 48.0 },
          { units: '512 (16W)', actual: 37.6, ideal: 50.0 },
        ];
      case 'hybrid':
        return [
          { units: '2 Cores', actual: 1.88, ideal: 2.0 },
          { units: '4 Cores', actual: 3.42, ideal: 4.0 },
          { units: '8 Cores', actual: 6.25, ideal: 8.0 },
          { units: '16 Cores', actual: 10.14, ideal: 16.0 },
        ];
    }
  };

  const chartData = getChartData();

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232f] pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
            Parallel Speedup (S_p = T_1 / T_p)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Strong scaling vs theoretical linear reference
          </p>
        </div>

        <Tabs
          size="sm"
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          options={[
            { id: 'openmp', label: 'OpenMP' },
            { id: 'mpi', label: 'MPI' },
            { id: 'cuda', label: 'CUDA' },
            { id: 'hybrid', label: 'Hybrid' },
          ]}
        />
      </div>

      <div className="mt-3.5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
            <XAxis dataKey="units" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="×" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#181b24',
                borderColor: '#2b3344',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#f8fafc',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
              formatter={(val) => <span className="text-slate-300 font-mono text-xs">{val}</span>}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: '#3b82f6' }}
              name="Empirical Speedup"
            />
            <Line
              type="monotone"
              dataKey="ideal"
              stroke="#64748b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              name="Ideal Linear"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

