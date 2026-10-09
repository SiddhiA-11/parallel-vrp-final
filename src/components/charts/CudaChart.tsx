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
import { CUDA_BLOCK_SIZE_SERIES } from '../../mock/demoData';

interface CudaChartProps {
  isAvailable?: boolean;
}

export const CudaChart: React.FC<CudaChartProps> = ({ isAvailable = true }) => {
  if (!isAvailable) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-dashed border-[#1e232f] bg-[#13161c] p-6 text-center">
        <div className="font-mono text-xs font-semibold text-slate-400">CUDA GPU ACCELERATION UNAVAILABLE</div>
        <p className="mt-1 max-w-sm text-xs text-slate-500 font-sans">
          Run experiments on an NVIDIA CUDA-enabled workstation, HPC cluster or Google Colab to profile GPU kernel metrics.
        </p>
      </div>
    );
  }

  const chartData = CUDA_BLOCK_SIZE_SERIES.map((d) => ({
    block: `${d.blockSize}T`,
    kernel: d.kernelMs,
    h2d: d.h2dMs,
    d2h: d.d2hMs,
    total: d.totalGpuMs,
  }));

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      <div className="border-b border-[#1e232f] pb-3">
        <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
          CUDA Block Size vs Kernel &amp; PCIe Latency
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-sans">
          GPU Kernel execution vs Host-to-Device (H2D) and Device-to-Host (D2H) memory transfer overhead
        </p>
      </div>

      <div className="mt-3.5 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2432" />
            <XAxis dataKey="block" stroke="#475569" tick={{ fontSize: 11, fill: '#94a3b8' }} />
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
            <Bar dataKey="kernel" stackId="a" fill="#f59e0b" name="GPU 2-Opt Kernel (ms)" />
            <Bar dataKey="h2d" stackId="a" fill="#3b82f6" name="Host→Device Transfer" />
            <Bar dataKey="d2h" stackId="a" fill="#818cf8" name="Device→Host Transfer" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

