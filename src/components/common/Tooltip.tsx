import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children || (
        <HelpCircle className="h-3.5 w-3.5 cursor-help text-slate-500 hover:text-slate-300" />
      )}
      {visible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-normal rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-center font-mono text-[11px] text-slate-200 shadow-xl min-w-[140px] max-w-xs">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
        </div>
      )}
    </div>
  );
};
