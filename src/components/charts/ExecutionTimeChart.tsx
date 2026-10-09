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

interface DataPoint {
  customers: number;
  sequential?: number;
  openmp?: number;
  mpi?: number;
  cuda?: number;
  hybrid?: number;
}

interface ExecutionTimeChartProps {
  data?: DataPoint[];
  loading?: boolean;
}

const DEFAULT_DATA: DataPoint[] = [
  { customers: 100, sequential: 12.4, openmp: 2.8, mpi: 4.2, cuda: 1.4, hybrid: 2.6 },
  { customers: 250, sequential: 68.5, openmp: 12.1, mpi: 18.4, cuda: 3.8, hybrid: 10.5 },
  { customers: 500, sequential: 245.0, openmp: 42.6, mpi: 64.2, cuda: 8.9, hybrid: 35.1 },
  { customers: 1000, sequential: 884.5, openmp: 142.3, mpi: 231.1, cuda: 21.4, hybrid: 112.8 },
  { customers: 2000, sequential: 3410.0, openmp: 495.2, mpi: 840.5, cuda: 54.8, hybrid: 388.0 },
];

export const ExecutionTimeChart: React.FC<ExecutionTimeChartProps> = ({
  data = DEFAULT_DATA,
  loading = false,
}) => {
  const [metricMode, setMetricMode] = useState<'time' | 'speedup' | 'efficiency'>('time');
  const [visibleSeries, setVisibleSeries] = useState({
    sequential: true,
    openmp: true,
    mpi: true,
    cuda: true,
    hybrid: true,
  });

  const chartData = data.map((d) => {
    const seq = d.sequential || 1;
    if (metricMode === 'speedup') {
      return {
        customers: `${d.customers} nodes`,
        sequential: 1.0,
        openmp: d.openmp ? Number((seq / d.openmp).toFixed(2)) : undefined,
        mpi: d.mpi ? Number((seq / d.mpi).toFixed(2)) : undefined,
        cuda: d.cuda ? Number((seq / d.cuda).toFixed(2)) : undefined,
        hybrid: d.hybrid ? Number((seq / d.hybrid).toFixed(2)) : undefined,
      };
    }
    if (metricMode === 'efficiency') {
      return {
        customers: `${d.customers} nodes`,
        sequential: 100.0,
        openmp: d.openmp ? Number(((seq / d.openmp / 8) * 100).toFixed(1)) : undefined,
        mpi: d.mpi ? Number(((seq / d.mpi / 4) * 100).toFixed(1)) : undefined,
        cuda: d.cuda ? Number(((seq / d.cuda / 8) * 100).toFixed(1)) : undefined,
        hybrid: d.hybrid ? Number(((seq / d.hybrid / 8) * 100).toFixed(1)) : undefined,
      };
    }
    return {
      customers: `${d.customers} nodes`,
      sequential: d.sequential,
      openmp: d.openmp,
      mpi: d.mpi,
      cuda: d.cuda,
      hybrid: d.hybrid,
    };
  });

  const toggleSeries = (key: keyof typeof visibleSeries) => {
    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const colors = {
    sequential: '#64748b',
    openmp: '#3b82f6',
    mpi: '#14b8a6',
    cuda: '#f59e0b',
    hybrid: '#818cf8',
  };

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232f] pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight">
            Implementation Performance Comparison
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Benchmark scaling across customer problem dimensions (N)
          </p>
        </div>

        <Tabs
          size="sm"
          activeId={metricMode}
          onChange={(id) => setMetricMode(id as any)}
          options={[
            { id: 'time', label: 'Time (ms)' },
            { id: 'speedup', label: 'Speedup (×)' },
            { id: 'efficiency', label: 'Efficiency (%)' },
          ]}
        />
      </div>

      {/* Series filter toggles */}
      <div className="flex flex-wrap items-center gap-1.5 pt-3 text-xs font-mono">
        <span className="text-slate-500 text-[10px] uppercase tracking-wider mr-1">Toggles:</span>
        {(['sequential', 'openmp', 'mpi', 'cuda', 'hybrid'] as const).map((key) => {
          const active = visibleSeries[key];
          return (
            <button
              key={key}
              onClick={() => toggleSeries(key)}
              className={`flex items-center gap-1.5 rounded px-2 py-0.5 border text-[11px] transition-colors cursor-pointer ${
                active
                  ? 'border-[#2b3344] bg-[#181b24] text-slate-100 font-medium'
                  : 'border-[#1e232f] bg-[#0c0d11] text-slate-500 opacity-50'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors[key] }} />
              <span className="uppercase">{key}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas */}
      <div className="mt-3.5 h-64 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-slate-500">
            Profiling hardware execution times...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
              <XAxis dataKey="customers" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis
                stroke="#475569"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                unit={metricMode === 'speedup' ? '×' : metricMode === 'efficiency' ? '%' : 'ms'}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181b24',
                  borderColor: '#2b3344',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#f8fafc',
                }}
                itemStyle={{ padding: '1px 0' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(value) => <span className="text-slate-300 font-mono text-xs uppercase">{value}</span>}
              />

              {visibleSeries.sequential && (
                <Line
                  type="monotone"
                  dataKey="sequential"
                  stroke={colors.sequential}
                  strokeWidth={1.5}
                  dot={{ r: 2.5, fill: colors.sequential }}
                  name="Sequential"
                />
              )}
              {visibleSeries.openmp && (
                <Line
                  type="monotone"
                  dataKey="openmp"
                  stroke={colors.openmp}
                  strokeWidth={2}
                  dot={{ r: 3, fill: colors.openmp }}
                  name="OpenMP"
                />
              )}
              {visibleSeries.mpi && (
                <Line
                  type="monotone"
                  dataKey="mpi"
                  stroke={colors.mpi}
                  strokeWidth={2}
                  dot={{ r: 3, fill: colors.mpi }}
                  name="MPI"
                />
              )}
              {visibleSeries.cuda && (
                <Line
                  type="monotone"
                  dataKey="cuda"
                  stroke={colors.cuda}
                  strokeWidth={2}
                  dot={{ r: 3, fill: colors.cuda }}
                  name="CUDA"
                />
              )}
              {visibleSeries.hybrid && (
                <Line
                  type="monotone"
                  dataKey="hybrid"
                  stroke={colors.hybrid}
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={{ r: 2.5, fill: colors.hybrid }}
                  name="Hybrid"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

