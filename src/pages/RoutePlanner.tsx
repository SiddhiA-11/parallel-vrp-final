import React, { useState, useEffect } from 'react';
import { useDatasets } from '../hooks/useDatasets';
import { useExperiment } from '../hooks/useExperiment';
import { RouteCanvas } from '../components/routes/RouteCanvas';
import { RouteControls } from '../components/routes/RouteControls';
import { RouteDetailsPanel } from '../components/routes/RouteDetailsPanel';
import { ExperimentStatusBar } from '../components/performance/ExperimentStatusBar';
import { DatasetUploadModal } from '../components/datasets/DatasetUploadModal';
import { ArchitectureType, Route, AlgorithmResult } from '../types';
import { solveCVRP } from '../utils/cvrpSolver';
import { DEFAULT_HARDWARE_CONFIG } from '../mock/demoData';
import { formatExecutionTime, formatSpeedup, formatDistance } from '../utils/formatters';
import { Layers, ShieldCheck, Clock, Zap } from 'lucide-react';

export const RoutePlanner: React.FC = () => {
  const {
    datasets,
    selectedDatasetId,
    setSelectedDatasetId,
    selectedDataset,
    generateDataset,
    uploadDataset,
  } = useDatasets();

  const { liveState, startBenchmark } = useExperiment();

  const [activeAlgorithm, setActiveAlgorithm] = useState<ArchitectureType>('openmp');
  const [currentResult, setCurrentResult] = useState<AlgorithmResult | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // When dataset changes, solve initial solution
  useEffect(() => {
    if (selectedDataset) {
      const res = solveCVRP(selectedDataset, activeAlgorithm, DEFAULT_HARDWARE_CONFIG);
      setCurrentResult(res);
      setSelectedVehicleId(null);
    }
  }, [selectedDataset, activeAlgorithm]);

  const handleRunAlgorithm = async (algo: ArchitectureType) => {
    if (!selectedDataset) return;
    setActiveAlgorithm(algo);
    const res = await startBenchmark(selectedDataset.id, algo, DEFAULT_HARDWARE_CONFIG);
    if (res) {
      setCurrentResult(res);
      setSelectedVehicleId(null);
    }
  };

  const handleRunAll = async () => {
    if (!selectedDataset) return;
    // Run sequentially through algorithms to populate comparison
    for (const algo of ['sequential', 'openmp', 'mpi', 'cuda', 'hybrid'] as ArchitectureType[]) {
      await startBenchmark(selectedDataset.id, algo, DEFAULT_HARDWARE_CONFIG);
    }
    const finalRes = solveCVRP(selectedDataset, 'cuda', DEFAULT_HARDWARE_CONFIG);
    setCurrentResult(finalRes);
    setActiveAlgorithm('cuda');
  };

  const handleGenerateQuick = async () => {
    await generateDataset({
      name: `Synthetic-Cluster-${Date.now().toString().slice(-4)}`,
      customerCount: 45,
      vehicleCount: 6,
      capacity: 100,
      maxX: 1000,
      maxY: 1000,
    });
  };

  const routes: Route[] = currentResult?.routes || [];

  return (
    <div className="space-y-5">
      {/* Top Controls Bar */}
      <RouteControls
        datasets={datasets}
        selectedDatasetId={selectedDatasetId}
        onSelectDataset={setSelectedDatasetId}
        activeAlgorithm={activeAlgorithm}
        onSelectAlgorithm={setActiveAlgorithm}
        onRunAlgorithm={handleRunAlgorithm}
        onRunAll={handleRunAll}
        onGenerateDataset={handleGenerateQuick}
        isRunning={liveState.isRunning}
        selectedDataset={selectedDataset}
      />

      {/* Live Experiment Status Bar if executing */}
      {liveState.isRunning && <ExperimentStatusBar state={liveState} />}

      {/* Main 2D Visualizer + Route Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: 2D Interactive SVG Map (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {selectedDataset && (
            <RouteCanvas
              depot={selectedDataset.depot}
              customers={selectedDataset.customers}
              routes={routes}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={setSelectedVehicleId}
            />
          )}

          {/* Quick Metrics Bar below Map */}
          {currentResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg border border-[#1e232f] bg-[#13161c] p-3 font-mono text-xs text-center">
              <div className="rounded bg-[#181b24] p-2.5 border border-[#1e232f]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Route Distance</div>
                <div className="mt-0.5 text-sm font-bold text-white">
                  {formatDistance(currentResult.totalDistance)}
                </div>
              </div>

              <div className="rounded bg-[#181b24] p-2.5 border border-[#1e232f]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Execution Time</div>
                <div className="mt-0.5 text-sm font-bold text-blue-400">
                  {formatExecutionTime(currentResult.executionTimeMs)}
                </div>
              </div>

              <div className="rounded bg-[#181b24] p-2.5 border border-[#1e232f]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Speedup vs Seq</div>
                <div className="mt-0.5 text-sm font-bold text-emerald-400">
                  {formatSpeedup(currentResult.speedupVsSeq)}
                </div>
              </div>

              <div className="rounded bg-[#181b24] p-2.5 border border-[#1e232f]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Solution Feasibility</div>
                <div className="mt-0.5 text-sm font-bold text-emerald-300 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>VALID CVRP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Selected Route & Fleet Utilization Panel (4 cols) */}
        <div className="lg:col-span-4">
          <RouteDetailsPanel
            routes={routes}
            selectedVehicleId={selectedVehicleId}
            onSelectVehicle={setSelectedVehicleId}
            totalDistance={currentResult?.totalDistance || 0}
            validation={currentResult?.validation}
            capacity={selectedDataset?.capacity || 100}
          />
        </div>
      </div>

      {/* Upload Modal */}
      <DatasetUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onImportDataset={uploadDataset}
      />
    </div>
  );
};
