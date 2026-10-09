import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MPI_SCALING_SERIES } from '../../mock/demoData';

export const MpiChart: React.FC = () => {
  const chartData = MPI_SCALING_SERIES.map((d) => ({
    procs: `${d.processes}P`,
    compTime: d.compTime,
    commTime: d.commTime,
    total: d.totalTime,
  }));

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      <div className="border-b border-[#1e232f] pb-3">
        <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
          MPI Computation vs Communication Overhead
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-sans">
          Breakdown of kernel calculation vs MPI_Bcast / MPI_Gather message passing latency
        </p>
      </div>

      <div className="mt-3.5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
            <XAxis dataKey="procs" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="ms" />
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
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
            <Bar dataKey="compTime" stackId="a" fill="#14b8a6" name="Computation Time (ms)" />
            <Bar dataKey="commTime" stackId="a" fill="#f59e0b" name="MPI Comm Overhead (ms)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

