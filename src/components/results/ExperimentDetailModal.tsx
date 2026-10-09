import React from 'react';
import { Modal } from '../common/Modal';
import { Experiment } from '../../types';
import { AlgorithmBadge } from '../common/AlgorithmBadge';
import { StatusBadge } from '../common/StatusBadge';
import { SolutionValidatorView } from './SolutionValidatorView';
import { RouteCanvas } from '../routes/RouteCanvas';
import {
  formatExecutionTime,
  formatSpeedup,
  formatEfficiency,
  formatDistance,
  formatTimestamp,
} from '../../utils/formatters';
import { exportExperimentToJson } from '../../utils/export';
import { Download } from 'lucide-react';

interface ExperimentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiment: Experiment | null;
}

export const ExperimentDetailModal: React.FC<ExperimentDetailModalProps> = ({
  isOpen,
  onClose,
  experiment,
}) => {
  const [selectedVehicle, setSelectedVehicle] = React.useState<number | null>(null);

  if (!experiment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Run #${experiment.id}`}
      subtitle={`${experiment.algorithm.toUpperCase()} • ${experiment.datasetName}`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Top Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
            <div className="text-[9px] uppercase text-slate-400">Execution Time</div>
            <div className="mt-0.5 text-base font-bold text-slate-100">
              {formatExecutionTime(experiment.executionTimeMs)}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">{experiment.configuration}</div>
          </div>

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
            <div className="text-[9px] uppercase text-slate-400">Distance</div>
            <div className="mt-0.5 text-base font-bold text-slate-100">
              {formatDistance(experiment.routeDistance)}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">{experiment.vehicleCount} vehicles</div>
          </div>

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
            <div className="text-[9px] uppercase text-slate-400">Speedup</div>
            <div className="mt-0.5 text-base font-bold text-emerald-400">
              {formatSpeedup(experiment.speedupVsSeq)}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">vs Baseline</div>
          </div>

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5">
            <div className="text-[9px] uppercase text-slate-400">Efficiency</div>
            <div className="mt-0.5 text-base font-bold text-indigo-400">
              {formatEfficiency(experiment.efficiencyPercent)}
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">Core utilization</div>
          </div>
        </div>

        {/* Constraint Validation */}
        {experiment.solution?.validation && (
          <SolutionValidatorView validation={experiment.solution.validation} />
        )}

        {/* Route Visualizer Preview */}
        {experiment.solution?.routes && (
          <div>
            <div className="text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">
              Route Tours ({experiment.solution.routes.length} Vehicles):
            </div>
            <RouteCanvas
              depot={{ x: 500, y: 500 }}
              customers={
                experiment.solution.routes.flatMap((r) => r.customers || [])
              }
              routes={experiment.solution.routes}
              selectedVehicleId={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center border-t border-[#1e232f] pt-3 text-xs font-mono">
          <span className="text-slate-500 text-[11px]">{formatTimestamp(experiment.timestamp)}</span>
          <button
            onClick={() => exportExperimentToJson(experiment)}
            className="flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1 text-slate-200 hover:bg-[#1e232f] hover:text-white"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
