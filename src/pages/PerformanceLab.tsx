import React, { useState } from 'react';
import { useDatasets } from '../hooks/useDatasets';
import { useBenchmarkHistory } from '../hooks/useBenchmarkHistory';
import { useExperiment } from '../hooks/useExperiment';
import { useSystemInfo } from '../hooks/useSystemInfo';
import { BenchmarkConfigPanel } from '../components/performance/BenchmarkConfigPanel';
import { ExperimentStatusBar } from '../components/performance/ExperimentStatusBar';
import { ResultsDataTable } from '../components/performance/ResultsDataTable';
import { ExecutionTimeChart } from '../components/charts/ExecutionTimeChart';
import { SpeedupChart } from '../components/charts/SpeedupChart';
import { EfficiencyChart } from '../components/charts/EfficiencyChart';
import { CudaMetricsPanel } from '../components/performance/CudaMetricsPanel';
import { MpiMetricsPanel } from '../components/performance/MpiMetricsPanel';
import { OpenMpMetricsPanel } from '../components/performance/OpenMpMetricsPanel';
import { HybridMetricsPanel } from '../components/performance/HybridMetricsPanel';
import { ExperimentDetailModal } from '../components/results/ExperimentDetailModal';
import { Tabs } from '../components/common/Tabs';
import { ArchitectureType, HardwareConfig, Experiment } from '../types';
import { DEFAULT_HARDWARE_CONFIG, MULTI_SIZE_BENCHMARKS } from '../mock/demoData';
import { Gauge, Cpu, Server, Zap, Layers, BarChart2 } from 'lucide-react';

export const PerformanceLab: React.FC = () => {
  const { datasets, selectedDatasetId, setSelectedDatasetId, selectedDataset } = useDatasets();
  const { experiments, addExperiment, refresh } = useBenchmarkHistory();
  const { liveState, startBenchmark, lastResult } = useExperiment();
  const { systemInfo } = useSystemInfo();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<ArchitectureType | 'all'>('all');
  const [hardwareConfig, setHardwareConfig] = useState<HardwareConfig>(DEFAULT_HARDWARE_CONFIG);
  const [activeSectionTab, setActiveSectionTab] = useState<'scaling' | 'openmp' | 'mpi' | 'cuda' | 'hybrid'>('scaling');
  const [inspectedExperiment, setInspectedExperiment] = useState<Experiment | null>(null);

  const handleRunBenchmark = async () => {
    if (!selectedDataset) return;

    if (selectedAlgorithm === 'all') {
      // Execute all 5 parallel architectures in sequence
      for (const algo of ['sequential', 'openmp', 'mpi', 'cuda', 'hybrid'] as ArchitectureType[]) {
        const res = await startBenchmark(selectedDataset.id, algo, hardwareConfig);
        if (res) {
          refresh();
        }
      }
    } else {
      const res = await startBenchmark(selectedDataset.id, selectedAlgorithm, hardwareConfig);
      if (res) {
        refresh();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#1e232f] pb-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
            Performance Laboratory
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Measure how algorithm execution scales across CPU threads, MPI processes, and GPU configurations.
        </p>
      </div>

      {/* Benchmark Suite Configuration Panel */}
      <BenchmarkConfigPanel
        datasets={datasets}
        selectedDatasetId={selectedDatasetId}
        onSelectDataset={setSelectedDatasetId}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        config={hardwareConfig}
        onChangeConfig={setHardwareConfig}
        onRunBenchmark={handleRunBenchmark}
        isRunning={liveState.isRunning}
      />

      {/* Live Experiment Pipeline Status */}
      <ExperimentStatusBar state={liveState} />

      {/* Benchmark Results Data Table */}
      <div>
        <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
          Benchmark Execution Log &amp; Speedup Metrics
        </div>
        <ResultsDataTable
          experiments={experiments}
          onSelectExperiment={setInspectedExperiment}
        />
      </div>

      {/* Architectural Deep-Dive Sections */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e232f] pb-3">
          <div className="font-mono text-sm font-bold uppercase text-white flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-400" />
            <span>Parallel Architecture Scaling Analytics</span>
          </div>

          <Tabs
            size="sm"
            activeId={activeSectionTab}
            onChange={(id) => setActiveSectionTab(id as any)}
            options={[
              { id: 'scaling', label: 'Strong/Weak Scaling' },
              { id: 'openmp', label: 'OpenMP CPU' },
              { id: 'mpi', label: 'MPI Distributed' },
              { id: 'cuda', label: 'CUDA GPU' },
              { id: 'hybrid', label: 'Hybrid MPI+OMP' },
            ]}
          />
        </div>

        {/* Section Viewports */}
        {activeSectionTab === 'scaling' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SpeedupChart />
            <EfficiencyChart />
            <div className="lg:col-span-2">
              <ExecutionTimeChart data={MULTI_SIZE_BENCHMARKS} />
            </div>
          </div>
        )}

        {activeSectionTab === 'openmp' && (
          <OpenMpMetricsPanel metrics={lastResult?.openMpMetrics} />
        )}

        {activeSectionTab === 'mpi' && (
          <MpiMetricsPanel metrics={lastResult?.mpiMetrics} />
        )}

        {activeSectionTab === 'cuda' && (
          <CudaMetricsPanel
            metrics={lastResult?.cudaMetrics}
            cudaInfo={systemInfo?.cuda}
          />
        )}

        {activeSectionTab === 'hybrid' && (
          <HybridMetricsPanel metrics={lastResult?.hybridMetrics} />
        )}
      </div>

      {/* Experiment Details Modal */}
      <ExperimentDetailModal
        isOpen={inspectedExperiment !== null}
        onClose={() => setInspectedExperiment(null)}
        experiment={inspectedExperiment}
      />
    </div>
  );
};
