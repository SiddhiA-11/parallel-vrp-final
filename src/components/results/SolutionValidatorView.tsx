import React from 'react';
import { SolutionValidation } from '../../types';
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface SolutionValidatorViewProps {
  validation?: SolutionValidation;
}

export const SolutionValidatorView: React.FC<SolutionValidatorViewProps> = ({ validation }) => {
  if (!validation) return null;

  const checks = [
    {
      label: 'All Customers Visited',
      passed: validation.allCustomersVisited,
      detail: `${validation.visitedCount} of ${validation.totalCustomers} customers serviced`,
    },
    {
      label: 'No Duplicate Visits',
      passed: validation.noDuplicateVisits,
      detail: validation.noDuplicateVisits ? 'Each customer visited exactly once' : 'Duplicate visits detected',
    },
    {
      label: 'Vehicle Capacity Respected',
      passed: validation.capacityRespected,
      detail: `Max route load: ${validation.maxLoadUsed} / ${validation.maxCapacity} units`,
    },
    {
      label: 'Depot Round-Trip Constraint',
      passed: validation.depotRoundTrip,
      detail: 'All vehicles start and finish at central depot (Node 0)',
    },
    {
      label: 'Fleet Size Constraint',
      passed: validation.vehicleCountRespected,
      detail: 'Vehicle fleet count within problem specification limits',
    },
  ];

  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 font-mono text-xs shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          {validation.valid ? (
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          )}
          <span className="font-bold text-slate-100 text-xs">CVRP Constraint Verification</span>
        </div>
        <span
          className={`rounded px-1.5 py-0.5 text-[9px] font-semibold border ${
            validation.valid
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
              : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
          }`}
        >
          {validation.valid ? 'VALID CVRP' : 'VIOLATIONS DETECTED'}
        </span>
      </div>

      <div className="space-y-1.5">
        {checks.map((check, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded bg-[#181b24] p-2 border border-[#1e232f]"
          >
            <div className="flex items-center gap-2">
              {check.passed ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              )}
              <span className={check.passed ? 'text-slate-200' : 'text-rose-300 font-bold'}>
                {check.label}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">{check.detail}</span>
          </div>
        ))}
      </div>

      {validation.errors.length > 0 && (
        <div className="mt-2.5 rounded border border-rose-900/60 bg-rose-950/30 p-2 text-[11px] text-rose-300 space-y-0.5">
          <div className="font-semibold">Violation Details:</div>
          {validation.errors.map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}
    </div>
  );
};
