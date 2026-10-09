import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperimentById } from '../../src/api/experiments';
import { Experiment } from '../../src/types';
import { AlgorithmBadge } from '../components/common/AlgorithmBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { SolutionValidatorView } from '../components/results/SolutionValidatorView';
import { RouteCanvas } from '../components/routes/RouteCanvas';
import { exportExperimentToJson } from '../utils/export';
import {
  formatExecutionTime,
  formatSpeedup,
  formatEfficiency,
  formatDistance,
  formatTimestamp,
} from '../utils/formatters';
import { ArrowLeft, Download, Clock, MapPin, Zap } from 'lucide-react';

export const ExperimentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      getExperimentById(id)
        .then((res) => setExperiment(res))
        .catch(() => setExperiment(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-xs text-slate-500">
        Loading experiment run details...
      </div>
    );
  }

  if (!experiment) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/results')}
          className="flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Experiment History</span>
        </button>
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-8 text-center text-xs font-mono text-slate-400">
          Experiment run {id} could not be found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e232f] pb-4">
        <div>
          <button
            onClick={() => navigate('/results')}
            className="flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to History</span>
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              Experiment #{experiment.id}
            </h2>
            <AlgorithmBadge algorithm={experiment.algorithm} />
            <StatusBadge status={experiment.valid ? 'VALID' : 'INVALID'} />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Executed on {formatTimestamp(experiment.timestamp)} • Instance: {experiment.datasetName} ({experiment.customerCount} nodes)
          </p>
        </div>

        <button
          onClick={() => exportExperimentToJson(experiment)}
          className="flex items-center gap-1.5 rounded-md border border-[#2b3344] bg-[#181b24] px-3.5 py-2 text-xs font-mono text-slate-200 hover:bg-[#1e232f] hover:text-white"
        >
          <Download className="h-4 w-4 text-blue-400" />
          <span>Export JSON</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4">
          <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Execution Time</div>
          <div className="mt-1 text-lg font-bold text-blue-400">
            {formatExecutionTime(experiment.executionTimeMs)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">{experiment.configuration}</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4">
          <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Total Route Distance</div>
          <div className="mt-1 text-lg font-bold text-white">
            {formatDistance(experiment.routeDistance)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">{experiment.vehicleCount} vehicles deployed</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4">
          <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Speedup vs Seq</div>
          <div className="mt-1 text-lg font-bold text-emerald-400">
            {formatSpeedup(experiment.speedupVsSeq)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Acceleration multiplier</div>
        </div>

        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4">
          <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Parallel Efficiency</div>
          <div className="mt-1 text-lg font-bold text-indigo-400">
            {formatEfficiency(experiment.efficiencyPercent)}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">Core utilization rate</div>
        </div>
      </div>

      {/* Solution Constraint Validation */}
      {experiment.solution?.validation && (
        <SolutionValidatorView validation={experiment.solution.validation} />
      )}

      {/* Route Map Preview */}
      {experiment.solution?.routes && (
        <div>
          <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
            Route Layout Visualization
          </div>
          <RouteCanvas
            depot={{ x: 500, y: 500 }}
            customers={experiment.solution.routes.flatMap((r) => r.customers || [])}
            routes={experiment.solution.routes}
            selectedVehicleId={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />
        </div>
      )}
    </div>
  );
};
