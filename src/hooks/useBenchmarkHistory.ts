import { useState, useEffect, useCallback } from 'react';
import { Experiment, ArchitectureType } from '../types';
import { getExperiments, clearExperimentHistory } from '../api/experiments';

export function useBenchmarkHistory() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await getExperiments();
      setExperiments(list);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch experiment history');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleClear = () => {
    clearExperimentHistory();
    setExperiments([]);
  };

  const addExperiment = (exp: Experiment) => {
    setExperiments((prev) => [exp, ...prev]);
  };

  return {
    experiments,
    loading,
    error,
    refresh: fetchHistory,
    clearAll: handleClear,
    addExperiment,
  };
}
