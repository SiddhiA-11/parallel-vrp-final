import React from 'react';

interface LoadingStateProps {
  type?: 'card' | 'chart' | 'table' | 'full';
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ type = 'card', rows = 4 }) => {
  if (type === 'chart') {
    return (
      <div className="flex h-72 w-full animate-pulse flex-col justify-end gap-3 rounded-lg border border-[#1e232f] bg-[#13161c] p-6">
        <div className="h-4 w-40 rounded bg-[#1e232f]" />
        <div className="flex h-48 items-end gap-4 pt-6">
          <div className="h-28 w-full rounded bg-[#1e232f]/60" />
          <div className="h-40 w-full rounded bg-[#1e232f]/80" />
          <div className="h-20 w-full rounded bg-[#1e232f]/40" />
          <div className="h-32 w-full rounded bg-[#1e232f]/70" />
          <div className="h-44 w-full rounded bg-[#1e232f]/90" />
        </div>
        <div className="flex justify-between border-t border-[#1e232f] pt-2">
          <div className="h-3 w-16 rounded bg-[#1e232f]" />
          <div className="h-3 w-16 rounded bg-[#1e232f]" />
          <div className="h-3 w-16 rounded bg-[#1e232f]" />
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full animate-pulse overflow-hidden rounded-lg border border-[#1e232f] bg-[#13161c]">
        <div className="h-10 border-b border-[#1e232f] bg-[#181b24]" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-[#1e232f]/50 px-4 py-3.5">
            <div className="h-3.5 w-24 rounded bg-[#1e232f]" />
            <div className="h-3.5 w-16 rounded bg-[#1e232f]/60" />
            <div className="h-3.5 w-32 rounded bg-[#1e232f]/40" />
            <div className="h-3.5 w-20 rounded bg-[#1e232f]/80" />
            <div className="h-3.5 w-16 rounded bg-[#1e232f]/50" />
            <div className="h-3.5 w-12 rounded bg-[#1e232f]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-lg border border-[#1e232f] bg-[#13161c] p-4">
          <div className="flex justify-between">
            <div className="h-3 w-20 rounded bg-[#1e232f]" />
            <div className="h-6 w-6 rounded bg-[#1e232f]" />
          </div>
          <div className="mt-4 h-6 w-28 rounded bg-[#1e232f]" />
          <div className="mt-3 h-2.5 w-36 rounded bg-[#1e232f]/60" />
        </div>
      ))}
    </div>
  );
};
