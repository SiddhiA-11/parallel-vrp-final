import React from 'react';
import { ArchitectureType } from '../../types';

interface AlgorithmBadgeProps {
  algorithm: ArchitectureType;
}

export const AlgorithmBadge: React.FC<AlgorithmBadgeProps> = ({ algorithm }) => {
  const config = {
    sequential: {
      label: 'SEQUENTIAL',
      classes: 'border-slate-700 bg-slate-800/80 text-slate-300',
    },
    openmp: {
      label: 'OPENMP',
      classes: 'border-blue-800/80 bg-blue-950/40 text-blue-300',
    },
    mpi: {
      label: 'MPI',
      classes: 'border-teal-800/80 bg-teal-950/40 text-teal-300',
    },
    cuda: {
      label: 'CUDA',
      classes: 'border-amber-800/80 bg-amber-950/40 text-amber-300',
    },
    hybrid: {
      label: 'HYBRID',
      classes: 'border-indigo-800/80 bg-indigo-950/40 text-indigo-300',
    },
  }[algorithm] || {
    label: algorithm.toUpperCase(),
    classes: 'border-slate-700 bg-slate-800 text-slate-300',
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${config.classes}`}
    >
      {config.label}
    </span>
  );
};

