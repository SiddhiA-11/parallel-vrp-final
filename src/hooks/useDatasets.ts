import { useState, useEffect, useCallback } from 'react';
import { Dataset } from '../types';
import { getDatasets, generateDataset, GenerateDatasetParams, uploadCustomDataset } from '../api/datasets';

export function useDatasets() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('SYN-1000-k50');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await getDatasets();
      setDatasets(list);
      if (list.length > 0 && !list.some((d) => d.id === selectedDatasetId)) {
        setSelectedDatasetId(list[0].id);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load datasets');
    } finally {
      setLoading(false);
    }
  }, [selectedDatasetId]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  const selectedDataset = datasets.find((d) => d.id === selectedDatasetId) || datasets[0] || null;

  const handleGenerate = async (params: GenerateDatasetParams) => {
    const created = await generateDataset(params);
    setDatasets((prev) => [created, ...prev]);
    setSelectedDatasetId(created.id);
    return created;
  };

  const handleUpload = async (dataset: Dataset) => {
    const uploaded = await uploadCustomDataset(dataset);
    setDatasets((prev) => [uploaded, ...prev]);
    setSelectedDatasetId(uploaded.id);
    return uploaded;
  };

  return {
    datasets,
    selectedDatasetId,
    setSelectedDatasetId,
    selectedDataset,
    loading,
    error,
    refresh: fetchDatasets,
    generateDataset: handleGenerate,
    uploadDataset: handleUpload,
  };
}
