import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../components/common/MetricCard';
import { ExecutionTimeChart } from '../components/charts/ExecutionTimeChart';
import { ImplementationGrid } from '../components/dashboard/ImplementationGrid';
import { SystemQuickCard } from '../components/dashboard/SystemQuickCard';
import { RecentResultsTable } from '../components/dashboard/RecentResultsTable';
import { useSystemInfo } from '../hooks/useSystemInfo';
import { useBenchmarkHistory } from '../hooks/useBenchmarkHistory';
import { useDatasets } from '../hooks/useDatasets';
import { MULTI_SIZE_BENCHMARKS } from '../mock/demoData';
import {
  Users,
  Truck,
  MapPin,
  Clock,
  Zap,
  Activity,
  PlayCircle,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  formatExecutionTime,
  formatSpeedup,
  formatDistance,
  formatNumber,
} from '../utils/formatters';

export const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { systemInfo, loading: systemLoading } = useSystemInfo();
  const { experiments, loading: expLoading } = useBenchmarkHistory();
  const { datasets, selectedDataset } = useDatasets();

  // Compute summary metrics from real/history data
  const hasExperiments = experiments.length > 0;
  const bestSpeedup = hasExperiments
    ? Math.max(...experiments.map((e) => e.speedupVsSeq))
    : 0;
  const fastestTime = hasExperiments
    ? Math.min(...experiments.map((e) => e.executionTimeMs))
    : 0;
  const bestDistance = hasExperiments
    ? Math.min(...experiments.map((e) => e.routeDistance))
    : 0;

  const totalCustomers = selectedDataset ? selectedDataset.customerCount : 0;
  const totalVehicles = selectedDataset ? selectedDataset.vehicleCount : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e232f] pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
            Parallel Computing Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze delivery-route optimization across CPU, distributed-memory, and GPU architectures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/routes')}
            className="flex items-center gap-1.5 rounded-md border border-[#2b3344] bg-[#181b24] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-[#1e232f] hover:text-white"
          >
            <MapPin className="h-4 w-4 text-blue-400" />
            <span>2D Route Planner</span>
          </button>

          <button
            onClick={() => navigate('/performance')}
            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-500 active:bg-blue-700"
          >
            <PlayCircle className="h-4 w-4" />
            <span>Open Performance Lab</span>
          </button>
        </div>
      </div>

      {/* Top 6 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <MetricCard
          label="Customers"
          value={formatNumber(totalCustomers)}
          subtext={selectedDataset?.name || 'Active dataset'}
          icon={<Users className="h-4 w-4" />}
          highlightColor="blue"
        />

        <MetricCard
          label="Fleet Vehicles"
          value={formatNumber(totalVehicles)}
          subtext={`Cap: ${selectedDataset?.capacity || 100} units`}
          icon={<Truck className="h-4 w-4" />}
          highlightColor="slate"
        />

        <MetricCard
          label="Best Distance"
          value={hasExperiments ? formatDistance(bestDistance) : '—'}
          subtext={hasExperiments ? 'Shortest CVRP solution' : undefined}
          icon={<MapPin className="h-4 w-4" />}
          highlightColor="emerald"
          isEmpty={!hasExperiments}
          emptyText="No benchmark runs"
          onClickCta={() => navigate('/performance')}
        />

        <MetricCard
          label="Fastest Execution"
          value={hasExperiments ? formatExecutionTime(fastestTime) : '—'}
          subtext={hasExperiments ? 'Peak GPU/HPC kernel' : undefined}
          icon={<Clock className="h-4 w-4" />}
          highlightColor="indigo"
          isEmpty={!hasExperiments}
          emptyText="No benchmark runs"
          onClickCta={() => navigate('/performance')}
        />

        <MetricCard
          label="Peak Speedup"
          value={hasExperiments ? formatSpeedup(bestSpeedup) : '—'}
          subtext={hasExperiments ? 'vs Single-Thread C++' : undefined}
          icon={<Zap className="h-4 w-4" />}
          highlightColor="amber"
          isEmpty={!hasExperiments}
          emptyText="No benchmark runs"
          onClickCta={() => navigate('/performance')}
        />

        <MetricCard
          label="System Status"
          value={systemInfo?.cpu.cores ? `${systemInfo.cpu.cores}C / ${systemInfo.cpu.threads}T` : 'ONLINE'}
          subtext={systemInfo?.cuda.available ? 'CUDA Active' : 'CPU Concurrency'}
          icon={<Activity className="h-4 w-4" />}
          highlightColor="emerald"
        />
      </div>

      {/* Horizontal Implementation Status Panel */}
      <div>
        <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
          Architecture Implementations Status
        </div>
        <ImplementationGrid cudaAvailable={systemInfo?.cuda.available} />
      </div>

      {/* Large Implementation Performance Chart */}
      <ExecutionTimeChart data={MULTI_SIZE_BENCHMARKS} loading={expLoading} />

      {/* Node Hardware Specifications */}
      <SystemQuickCard systemInfo={systemInfo} loading={systemLoading} />

      {/* Recent Experiment Runs */}
      <RecentResultsTable experiments={experiments} />
    </div>
  );
};
