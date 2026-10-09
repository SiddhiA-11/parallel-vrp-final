import React from 'react';
import { ArchitectureType, ImplementationStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Cpu, Server, Zap, Layers, Terminal } from 'lucide-react';

interface ImplementationGridProps {
  cudaAvailable?: boolean;
}

export const ImplementationGrid: React.FC<ImplementationGridProps> = ({ cudaAvailable = false }) => {
  const cards = [
    {
      id: 'sequential' as ArchitectureType,
      title: 'Sequential',
      subtitle: 'Single-Thread Baseline',
      status: 'READY' as const,
      icon: <Terminal className="h-4 w-4 text-slate-400" />,
      desc: 'Standard C++ reference using Euclidean 2-Opt and Nearest Neighbor.',
    },
    {
      id: 'openmp' as ArchitectureType,
      title: 'OpenMP',
      subtitle: 'Multi-Core Shared Memory',
      status: 'READY' as const,
      icon: <Cpu className="h-4 w-4 text-blue-400" />,
      desc: 'Multi-threaded loop chunking with dynamic schedule and shared memory.',
    },
    {
      id: 'mpi' as ArchitectureType,
      title: 'MPI',
      subtitle: 'Distributed Memory Clusters',
      status: 'READY' as const,
      icon: <Server className="h-4 w-4 text-teal-400" />,
      desc: 'Domain decomposition across cluster ranks with asynchronous ring exchange.',
    },
    {
      id: 'cuda' as ArchitectureType,
      title: 'CUDA',
      subtitle: 'GPU Warp Parallelism',
      status: (cudaAvailable ? 'READY' : 'UNAVAILABLE') as ImplementationStatus,
      icon: <Zap className={`h-4 w-4 ${cudaAvailable ? 'text-amber-400' : 'text-slate-500'}`} />,
      desc: cudaAvailable
        ? 'Massive GPU thread blocks evaluating 2-opt pairwise swaps in parallel warps.'
        : 'NVIDIA GPU / NVCC not detected on host. (Run on CUDA node or Colab).',
    },
    {
      id: 'hybrid' as ArchitectureType,
      title: 'Hybrid',
      subtitle: 'MPI + OpenMP Hierarchical',
      status: 'READY' as const,
      icon: <Layers className="h-4 w-4 text-indigo-400" />,
      desc: 'Multi-level scaling: Coarse-grained MPI between nodes + fine-grained OpenMP/CUDA.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 transition-colors hover:border-[#2b3344] shadow-xs"
        >
          <div className="flex items-start justify-between">
            <div className="rounded border border-[#1e232f] bg-[#0c0d11] p-1.5 text-slate-300">
              {card.icon}
            </div>
            <StatusBadge status={card.status} />
          </div>

          <div className="mt-2.5">
            <div className="font-mono text-xs font-bold text-slate-100">{card.title}</div>
            <div className="text-[10px] text-slate-400 font-mono">{card.subtitle}</div>
            <p className="mt-1.5 text-[11px] text-slate-400 font-sans leading-relaxed line-clamp-2">
              {card.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

