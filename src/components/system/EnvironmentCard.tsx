import React from 'react';
import { Settings } from 'lucide-react';

interface EnvironmentCardProps {
  envVars: Record<string, string>;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ envVars }) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-400" />
          <h4 className="font-mono text-xs font-bold uppercase text-slate-200">
            Active HPC Environment Variables &amp; Affinities
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-xs">
        {Object.entries(envVars).map(([key, val]) => (
          <div key={key} className="rounded border border-[#1e232f] bg-[#181b24] p-2">
            <div className="text-[9px] text-slate-500 uppercase">{key}</div>
            <div className="mt-0.5 font-semibold text-slate-200 truncate" title={val}>
              {val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
