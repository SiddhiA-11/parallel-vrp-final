import { apiClient } from './client';
import {
  ArchitectureType,
  Experiment,
  HardwareConfig,
  AlgorithmResult,
  Dataset,
} from '../types';
import { INITIAL_EXPERIMENTS, DEFAULT_HARDWARE_CONFIG } from '../mock/demoData';
import { getDatasetById } from './datasets';
import { solveCVRP } from '../utils/cvrpSolver';

let localExperiments: Experiment[] = (() => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('PRL_EXPERIMENT_HISTORY');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use initial
      }
    }
  }
  return [...INITIAL_EXPERIMENTS];
})();

function persistExperiments() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('PRL_EXPERIMENT_HISTORY', JSON.stringify(localExperiments));
    } catch {
      // ignore storage quota
    }
  }
}

export async function getExperiments(): Promise<Experiment[]> {
  return apiClient.get<Experiment[]>('/api/experiments', () => {
    return [...localExperiments];
  });
}

export async function getExperimentById(id: string): Promise<Experiment | null> {
  return apiClient.get<Experiment>(`/api/experiments/${id}`, () => {
    const found = localExperiments.find((e) => e.id === id);
    if (!found) throw new Error(`Experiment ${id} not found.`);
    return found;
  });
}

export interface RunAlgorithmParams {
  datasetId: string;
  algorithm: ArchitectureType;
  hardwareConfig?: Partial<HardwareConfig>;
}

export async function runSingleAlgorithm(params: RunAlgorithmParams): Promise<AlgorithmResult> {
  const fullConfig: HardwareConfig = {
    ...DEFAULT_HARDWARE_CONFIG,
    ...(params.hardwareConfig || {}),
  };

  return apiClient.post<AlgorithmResult, any>('/api/benchmark/run', {
    datasetId: params.datasetId,
    algorithm: params.algorithm,
    config: fullConfig,
  }, async () => {
    const dataset = await getDatasetById(params.datasetId);
    if (!dataset) {
      throw new Error(`Dataset ${params.datasetId} not found`);
    }

    // Solve using local CVRP engine
    const result = solveCVRP(dataset, params.algorithm, fullConfig);

    // Save as new experiment in history
    const expId = `EXP-${(localExperiments.length + 420 + Math.floor(Math.random() * 50)).toString().padStart(5, '0')}`;
    const newExp: Experiment = {
      id: expId,
      timestamp: new Date().toISOString(),
      datasetId: dataset.id,
      datasetName: dataset.name,
      algorithm: params.algorithm,
      customerCount: dataset.customerCount,
      vehicleCount: dataset.vehicleCount,
      capacity: dataset.capacity,
      configuration: getConfigurationLabel(params.algorithm, fullConfig),
      hardwareConfig: fullConfig,
      executionTimeMs: result.executionTimeMs,
      routeDistance: result.totalDistance,
      speedupVsSeq: result.speedupVsSeq,
      efficiencyPercent: result.efficiencyPercent,
      valid: result.valid,
      status: 'completed',
      solution: result,
      notes: `${result.algorithmName} on ${dataset.name} (${dataset.customerCount} nodes).`,
    };

    localExperiments.unshift(newExp);
    persistExperiments();

    return result;
  });
}

export function getConfigurationLabel(algo: ArchitectureType, config: HardwareConfig): string {
  switch (algo) {
    case 'sequential':
      return '1 thread (Baseline C++)';
    case 'openmp':
      return `${config.openMpThreads} threads (OpenMP)`;
    case 'mpi':
      return `${config.mpiProcesses} procs (MPI Distributed)`;
    case 'cuda':
      return `Block size ${config.cudaBlockSize} (CUDA GPU)`;
    case 'hybrid':
      return `${config.hybridMpiProcesses} MPI × ${config.hybridThreadsPerProcess} OMP`;
    default:
      return 'Standard';
  }
}

export function clearExperimentHistory() {
  localExperiments = [];
  persistExperiments();
}
