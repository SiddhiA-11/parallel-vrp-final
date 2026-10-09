import { useState, useRef } from 'react';
import { ArchitectureType, HardwareConfig, AlgorithmResult, LiveBenchmarkState, ExperimentStage } from '../types';
import { runSingleAlgorithm } from '../api/experiments';

const INITIAL_STAGES: ExperimentStage[] = [
  { id: 'load', label: 'Dataset loading', status: 'pending' },
  { id: 'dist', label: 'Euclidean distance matrix calculation', status: 'pending' },
  { id: 'opt', label: 'Route construction & local 2-opt optimization', status: 'pending' },
  { id: 'valid', label: 'CVRP constraint validation', status: 'pending' },
  { id: 'perf', label: 'Performance & hardware profiling', status: 'pending' },
  { id: 'save', label: 'Committing benchmark metrics', status: 'pending' },
];

export function useExperiment() {
  const [liveState, setLiveState] = useState<LiveBenchmarkState>({
    isRunning: false,
    currentStage: 'Idle',
    elapsedSeconds: 0,
    stages: INITIAL_STAGES,
  });
  const [lastResult, setLastResult] = useState<AlgorithmResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  const startBenchmark = async (
    datasetId: string,
    algorithm: ArchitectureType,
    config?: Partial<HardwareConfig>
  ): Promise<AlgorithmResult | null> => {
    setError(null);
    setLiveState({
      isRunning: true,
      algorithm,
      currentStage: 'Initializing experiment...',
      elapsedSeconds: 0,
      stages: INITIAL_STAGES.map((s, idx) => ({
        ...s,
        status: idx === 0 ? 'active' : 'pending',
      })),
    });

    const startTime = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setLiveState((prev) => ({
        ...prev,
        elapsedSeconds: Number(((Date.now() - startTime) / 1000).toFixed(2)),
      }));
    }, 100);

    try {
      // Step through stages visually for great feedback
      await new Promise((r) => setTimeout(r, 120));
      setLiveState((prev) => ({
        ...prev,
        currentStage: 'Calculating Euclidean distance matrix...',
        stages: prev.stages.map((s) => (s.id === 'load' ? { ...s, status: 'completed' } : s.id === 'dist' ? { ...s, status: 'active' } : s)),
      }));

      await new Promise((r) => setTimeout(r, 150));
      setLiveState((prev) => ({
        ...prev,
        currentStage: `Executing ${algorithm.toUpperCase()} parallel solver...`,
        stages: prev.stages.map((s) => (s.id === 'dist' ? { ...s, status: 'completed' } : s.id === 'opt' ? { ...s, status: 'active' } : s)),
      }));

      const result = await runSingleAlgorithm({ datasetId, algorithm, hardwareConfig: config });

      setLiveState((prev) => ({
        ...prev,
        currentStage: 'Validating CVRP capacity & customer constraints...',
        stages: prev.stages.map((s) => (s.id === 'opt' ? { ...s, status: 'completed' } : s.id === 'valid' ? { ...s, status: 'active' } : s)),
      }));

      await new Promise((r) => setTimeout(r, 80));
      setLiveState((prev) => ({
        ...prev,
        currentStage: 'Computing parallel speedup & efficiency...',
        stages: prev.stages.map((s) => (s.id === 'valid' ? { ...s, status: 'completed' } : s.id === 'perf' ? { ...s, status: 'active' } : s)),
      }));

      await new Promise((r) => setTimeout(r, 60));
      setLiveState((prev) => ({
        ...prev,
        currentStage: 'Benchmark completed successfully.',
        isRunning: false,
        stages: prev.stages.map((s) => ({ ...s, status: 'completed' })),
      }));

      setLastResult(result);
      return result;
    } catch (err: any) {
      const msg = err?.message || 'Benchmark execution failed';
      setError(msg);
      setLiveState((prev) => ({
        ...prev,
        isRunning: false,
        currentStage: `Failed: ${msg}`,
        error: msg,
      }));
      return null;
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return {
    liveState,
    lastResult,
    error,
    startBenchmark,
  };
}
