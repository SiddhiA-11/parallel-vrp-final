import React from 'react';
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

export const ScalingChart: React.FC = () => {
  const data = [
    { p: 1, openmp: 884.5, mpi: 884.5, ideal: 884.5 },
    { p: 2, openmp: 462.1, mpi: 468.2, ideal: 442.25 },
    { p: 4, openmp: 248.6, mpi: 252.1, ideal: 221.12 },
    { p: 8, openmp: 142.3, mpi: 149.8, ideal: 110.56 },
    { p: 16, openmp: 98.4, mpi: 108.4, ideal: 55.28 },
  ];

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      <div className="border-b border-[#1e232f] pb-3">
        <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
          Strong Scaling Analysis (N = 1000 Fixed)
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-sans">
          Execution time reduction as processing cores scale from 1 to 16
        </p>
      </div>

      <div className="mt-3.5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
            <XAxis dataKey="p" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} unit=" Cores" />
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
            <Line type="monotone" dataKey="openmp" stroke="#3b82f6" strokeWidth={2} name="OpenMP Time (ms)" />
            <Line type="monotone" dataKey="mpi" stroke="#14b8a6" strokeWidth={2} name="MPI Time (ms)" />
            <Line
              type="monotone"
              dataKey="ideal"
              stroke="#64748b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              name="Ideal T_1/p"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

