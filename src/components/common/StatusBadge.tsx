import React from 'react';
import { ImplementationStatus } from '../../types';

interface StatusBadgeProps {
  status: ImplementationStatus | 'valid' | 'invalid' | 'active' | 'idle' | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const norm = status.toLowerCase();

  const isSuccess = ['available', 'completed', 'valid', 'ready'].includes(norm);
  const isRunning = ['running', 'active'].includes(norm);
  const isUnavailable = ['unavailable', 'not_compiled', 'disabled', 'unset'].includes(norm);
  const isError = ['failed', 'invalid', 'error'].includes(norm);

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (isSuccess) {
    styles = 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60';
    dotColor = 'bg-emerald-400';
  } else if (isRunning) {
    styles = 'bg-blue-950/50 text-blue-300 border-blue-800/60';
    dotColor = 'bg-blue-400';
  } else if (isUnavailable) {
    styles = 'bg-[#13161c] text-slate-500 border-[#1e232f]';
    dotColor = 'bg-slate-600';
  } else if (isError) {
    styles = 'bg-rose-950/50 text-rose-300 border-rose-800/60';
    dotColor = 'bg-rose-400';
  }

  const text = status.replace('_', ' ').toUpperCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border font-mono font-medium tracking-wider ${styles} ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {text}
    </span>
  );
};

