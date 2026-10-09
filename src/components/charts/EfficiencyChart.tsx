import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Tabs } from '../common/Tabs';
import { OPENMP_SCALING_SERIES, MPI_SCALING_SERIES } from '../../mock/demoData';

export const EfficiencyChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'openmp' | 'mpi' | 'hybrid'>('openmp');

  const getData = () => {
    switch (activeTab) {
      case 'openmp':
        return OPENMP_SCALING_SERIES.map((d) => ({
          units: `${d.threads}T`,
          efficiency: d.efficiency,
        }));
      case 'mpi':
        return MPI_SCALING_SERIES.map((d) => ({
          units: `${d.processes}P`,
          efficiency: d.efficiency,
        }));
      case 'hybrid':
        return [
          { units: '2 Cores', efficiency: 94.0 },
          { units: '4 Cores', efficiency: 85.5 },
          { units: '8 Cores', efficiency: 78.1 },
          { units: '16 Cores', efficiency: 63.4 },
        ];
    }
  };

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232f] pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
            Parallel Efficiency (E_p = S_p / p)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Core utilization effectiveness as concurrency scales
          </p>
        </div>

        <Tabs
          size="sm"
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          options={[
            { id: 'openmp', label: 'OpenMP' },
            { id: 'mpi', label: 'MPI' },
            { id: 'hybrid', label: 'Hybrid' },
          ]}
        />
      </div>

      <div className="mt-3.5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getData()} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
            <XAxis dataKey="units" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" domain={[0, 110]} />
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
            <ReferenceLine y={100} stroke="#475569" strokeDasharray="3 3" label={{ value: '100% Ideal', fill: '#94a3b8', fontSize: 10 }} />
            <Bar dataKey="efficiency" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Efficiency %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

