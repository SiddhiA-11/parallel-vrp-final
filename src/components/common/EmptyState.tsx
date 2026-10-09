import React from 'react';
import { PlayCircle, Database, Cpu, Activity } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  iconType?: 'benchmark' | 'datasets' | 'hardware' | 'activity';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  iconType = 'benchmark',
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'datasets':
        return <Database className="h-6 w-6 text-slate-400" />;
      case 'hardware':
        return <Cpu className="h-6 w-6 text-slate-400" />;
      case 'activity':
        return <Activity className="h-6 w-6 text-slate-400" />;
      default:
        return <PlayCircle className="h-6 w-6 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#1e232f] bg-[#13161c] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#2b3344] bg-[#181b24]">
        {getIcon()}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-200">{title}</h3>
      <p className="mt-1 max-w-md text-xs text-slate-400 font-sans">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 rounded bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none cursor-pointer"
        >
          <PlayCircle className="h-3.5 w-3.5" />
          {actionText}
        </button>
      )}
    </div>
  );
};

