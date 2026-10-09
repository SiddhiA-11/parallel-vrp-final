import React from 'react';
import { LiveBenchmarkState } from '../../types';
import { Clock, CheckCircle2, Loader2, Activity } from 'lucide-react';

interface ExperimentStatusBarProps {
  state: LiveBenchmarkState;
}

export const ExperimentStatusBar: React.FC<ExperimentStatusBarProps> = ({ state }) => {
  if (!state.isRunning && state.currentStage === 'Idle') return null;

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs transition-all">
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232f] pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-[#2b3344] bg-[#181b24] text-slate-300">
            {state.isRunning ? <Loader2 className="h-4 w-4 animate-spin text-blue-400" /> : <Activity className="h-4 w-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase text-slate-200">
                {state.isRunning ? 'EXPERIMENT IN PROGRESS' : 'EXPERIMENT SUMMARY'}
              </span>
              {state.algorithm && (
                <span className="rounded bg-[#181b24] px-1.5 py-0.5 font-mono text-[9px] text-slate-300 uppercase border border-[#2b3344]">
                  {state.algorithm}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">{state.currentStage}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 rounded bg-[#181b24] px-2.5 py-1 border border-[#1e232f]">
            <Clock className="h-3 w-3 text-slate-400" />
            <span className="text-slate-500">Elapsed:</span>
            <span className="text-slate-100 font-semibold">{state.elapsedSeconds.toFixed(2)}s</span>
          </div>
        </div>
      </div>

      {/* Stage Progression Steps */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {state.stages.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isActive = stage.status === 'active';

          return (
            <div
              key={stage.id}
              className={`rounded border p-2 text-left font-mono transition-colors ${
                isDone
                  ? 'border-emerald-800/60 bg-emerald-950/20 text-emerald-300'
                  : isActive
                  ? 'border-blue-700/80 bg-blue-950/30 text-blue-200'
                  : 'border-[#1e232f] bg-[#181b24]/60 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between text-[9px]">
                <span>STAGE 0{idx + 1}</span>
                {isDone ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                )}
              </div>
              <div className="mt-0.5 truncate text-[10px] font-medium">{stage.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
