import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  reason: string;
  suggestedAction?: string;
  technicalDetails?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Execution Error',
  reason,
  suggestedAction,
  technicalDetails,
  onRetry,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 p-5 text-left">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-rose-800/60 bg-rose-950/60 p-2 text-rose-400">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-rose-200">{title}</h4>
          <p className="mt-1 text-xs text-rose-300/80">{reason}</p>

          {suggestedAction && (
            <div className="mt-2.5 rounded border border-[#1e232f] bg-[#0c0d11] p-2.5 text-xs text-slate-300">
              <span className="font-semibold text-blue-400">Suggested Action: </span>
              {suggestedAction}
            </div>
          )}

          {technicalDetails && (
            <div className="mt-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-300"
              >
                {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                Technical Diagnostics
              </button>
              {showDetails && (
                <pre className="mt-2 max-h-36 overflow-x-auto rounded border border-[#1e232f] bg-[#0c0d11] p-2.5 font-mono text-[11px] text-slate-300">
                  {technicalDetails}
                </pre>
              )}
            </div>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-[#1e232f] hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Operation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
