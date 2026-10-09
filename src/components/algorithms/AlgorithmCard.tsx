import React from 'react';
import { ArchitectureType } from '../../types';
import { AlgorithmBadge } from '../common/AlgorithmBadge';
import { Code, CheckCircle2, AlertCircle } from 'lucide-react';

interface AlgorithmCardProps {
  type: ArchitectureType;
  title: string;
  purpose: string;
  howItWorks: string;
  parallelizationStrategy: string;
  advantages: string[];
  limitations: string[];
  onViewCode: () => void;
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  type,
  title,
  purpose,
  howItWorks,
  parallelizationStrategy,
  advantages,
  limitations,
  onViewCode,
}) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5">
        <div className="flex items-center gap-2">
          <AlgorithmBadge algorithm={type} />
          <h3 className="text-xs font-bold text-slate-100 font-mono">{title}</h3>
        </div>
        <button
          onClick={onViewCode}
          className="flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-2 py-1 text-xs font-mono text-slate-200 hover:bg-[#1e232f] hover:text-white transition-colors"
        >
          <Code className="h-3.5 w-3.5 text-slate-400" />
          <span>Inspect Source</span>
        </button>
      </div>

      {/* Purpose */}
      <div>
        <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Objective:</div>
        <p className="mt-0.5 text-xs text-slate-300 font-sans leading-relaxed">{purpose}</p>
      </div>

      {/* How it Works & Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-mono">
        <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
          <div className="text-[9px] uppercase text-slate-400 font-semibold">Mechanism:</div>
          <p className="mt-0.5 text-slate-300 text-[11px] font-sans leading-relaxed">{howItWorks}</p>
        </div>
        <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
          <div className="text-[9px] uppercase text-slate-400 font-semibold">Parallel Strategy:</div>
          <p className="mt-0.5 text-slate-300 text-[11px] font-sans leading-relaxed">{parallelizationStrategy}</p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs pt-1">
        <div>
          <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold mb-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Advantages:</span>
          </div>
          <ul className="space-y-0.5 text-[11px] text-slate-300 list-disc pl-4 font-sans">
            {advantages.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold mb-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Limitations &amp; Bottlenecks:</span>
          </div>
          <ul className="space-y-0.5 text-[11px] text-slate-400 list-disc pl-4 font-sans">
            {limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
