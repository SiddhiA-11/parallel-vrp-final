import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  highlightColor?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'purple';
  isEmpty?: boolean;
  emptyText?: string;
  onClickCta?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  isEmpty,
  emptyText = 'No data yet',
  onClickCta,
}) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 transition-colors hover:border-[#2b3344] shadow-xs">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 font-mono">
          {label}
        </span>
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded border border-[#1e232f] bg-[#0c0d11] text-slate-400">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2.5">
        {isEmpty ? (
          <div className="py-0.5">
            <span className="text-xs text-slate-500 font-mono">{emptyText}</span>
            {onClickCta && (
              <button
                onClick={onClickCta}
                className="mt-1 block text-xs font-medium text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
              >
                Run experiment
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-slate-100">{value}</span>
          </div>
        )}
      </div>

      {(subtext || trend) && !isEmpty && (
        <div className="mt-2 flex items-center justify-between text-xs">
          {subtext && <span className="text-slate-400 text-[11px] font-sans">{subtext}</span>}
          {trend && (
            <span
              className={`font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                trend.isPositive
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : trend.isNeutral
                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                  : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

