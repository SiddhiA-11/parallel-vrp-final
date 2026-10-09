import { apiClient } from './client';
import { Dataset, DatasetType } from '../types';
import { BENCHMARK_DATASETS, generateSyntheticNodes } from '../mock/demoData';

let localDatasets: Dataset[] = [...BENCHMARK_DATASETS];

export async function getDatasets(): Promise<Dataset[]> {
  return apiClient.get<Dataset[]>('/api/datasets', () => {
    return [...localDatasets];
  });
}

export async function getDatasetById(id: string): Promise<Dataset | null> {
  return apiClient.get<Dataset>(`/api/datasets/${id}`, () => {
    const found = localDatasets.find((d) => d.id === id);
    if (!found) throw new Error(`Dataset with id ${id} not found.`);
    return found;
  });
}

export interface GenerateDatasetParams {
  name: string;
  customerCount: number;
  vehicleCount: number;
  capacity: number;
  maxX?: number;
  maxY?: number;
  depotX?: number;
  depotY?: number;
  seed?: number;
}

export async function generateDataset(params: GenerateDatasetParams): Promise<Dataset> {
  return apiClient.post<Dataset, GenerateDatasetParams>('/api/datasets/generate', params, () => {
    const maxX = params.maxX || 1000;
    const maxY = params.maxY || 1000;
    const depotX = params.depotX ?? Math.round(maxX / 2);
    const depotY = params.depotY ?? Math.round(maxY / 2);
    const seed = params.seed ?? Math.floor(Math.random() * 10000);

    const customers = generateSyntheticNodes(
      params.customerCount,
      maxX,
      maxY,
      depotX,
      depotY,
      seed,
      params.capacity
    );

    const newDataset: Dataset = {
      id: `SYN-${params.customerCount}-k${params.vehicleCount}-${Date.now().toString().slice(-4)}`,
      name: params.name || `Generated-${params.customerCount}`,
      comment: `Synthetic CVRP instance (${params.customerCount} customers, capacity ${params.capacity}, seed ${seed})`,
      type: 'synthetic',
      source: 'PRL Generator',
      dimension: params.customerCount + 1,
      customerCount: params.customerCount,
      capacity: params.capacity,
      vehicleCount: params.vehicleCount,
      depot: { x: depotX, y: depotY },
      customers,
      createdAt: new Date().toISOString(),
    };

    localDatasets.unshift(newDataset);
    return newDataset;
  });
}

export async function uploadCustomDataset(dataset: Dataset): Promise<Dataset> {
  return apiClient.post<Dataset, Dataset>('/api/datasets/upload', dataset, () => {
    localDatasets.unshift(dataset);
    return dataset;
  });
}
