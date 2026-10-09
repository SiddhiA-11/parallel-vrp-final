import React from 'react';

export interface TabOption {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({ options, activeId, onChange, size = 'md' }) => {
  return (
    <div className="inline-flex rounded-md border border-[#1e232f] bg-[#0c0d11] p-0.5">
      {options.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 rounded font-mono transition-colors cursor-pointer ${
              size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'
            } ${
              isActive
                ? 'bg-[#181b24] text-slate-100 font-semibold border border-[#2b3344] shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#13161c] border border-transparent'
            }`}
          >
            {tab.icon && <span className="text-slate-400">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`rounded px-1 font-mono text-[9px] ${
                  isActive ? 'bg-[#0c0d11] text-slate-300 border border-[#2b3344]' : 'bg-[#181b24] text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

