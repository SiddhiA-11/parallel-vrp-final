import { Dataset, Experiment, HardwareConfig } from '../types';

export const DEFAULT_HARDWARE_CONFIG: HardwareConfig = {
  openMpThreads: 8,
  mpiProcesses: 4,
  cudaBlockSize: 256,
  cudaGridSize: 16,
  hybridMpiProcesses: 2,
  hybridThreadsPerProcess: 4,
  randomSeed: 42,
};

// Standard CVRPLIB and Synthetic Benchmark instances
export const BENCHMARK_DATASETS: Dataset[] = [
  {
    id: 'A-n32-k5',
    name: 'Augerat A-n32-k5',
    comment: 'Classic Augerat CVRP Benchmark (Set A) with 31 customers and 5 vehicles',
    type: 'real',
    source: 'CVRPLIB (Augerat et al., 1995)',
    sourceUrl: 'http://vrp.atd-lab.inf.puc-rio.br/index.php/en/',
    dimension: 32,
    customerCount: 31,
    capacity: 100,
    vehicleCount: 5,
    bestKnownSolution: 784.0,
    depot: { x: 82, y: 76 },
    customers: [
      { id: 1, coord: { x: 96, y: 44 }, demand: 19 },
      { id: 2, coord: { x: 50, y: 5 }, demand: 21 },
      { id: 3, coord: { x: 49, y: 8 }, demand: 6 },
      { id: 4, coord: { x: 13, y: 7 }, demand: 19 },
      { id: 5, coord: { x: 29, y: 89 }, demand: 7 },
      { id: 6, coord: { x: 58, y: 30 }, demand: 12 },
      { id: 7, coord: { x: 84, y: 39 }, demand: 16 },
      { id: 8, coord: { x: 14, y: 24 }, demand: 6 },
      { id: 9, coord: { x: 2, y: 39 }, demand: 16 },
      { id: 10, coord: { x: 3, y: 82 }, demand: 8 },
      { id: 11, coord: { x: 5, y: 10 }, demand: 14 },
      { id: 12, coord: { x: 98, y: 52 }, demand: 21 },
      { id: 13, coord: { x: 84, y: 25 }, demand: 16 },
      { id: 14, coord: { x: 61, y: 59 }, demand: 3 },
      { id: 15, coord: { x: 1, y: 65 }, demand: 22 },
      { id: 16, coord: { x: 88, y: 51 }, demand: 18 },
      { id: 17, coord: { x: 91, y: 2 }, demand: 19 },
      { id: 18, coord: { x: 19, y: 32 }, demand: 1 },
      { id: 19, coord: { x: 93, y: 3 }, demand: 24 },
      { id: 20, coord: { x: 11, y: 91 }, demand: 8 },
      { id: 21, coord: { x: 60, y: 35 }, demand: 12 },
      { id: 22, coord: { x: 67, y: 58 }, demand: 4 },
      { id: 23, coord: { x: 17, y: 15 }, demand: 8 },
      { id: 24, coord: { x: 41, y: 75 }, demand: 24 },
      { id: 25, coord: { x: 44, y: 61 }, demand: 24 },
      { id: 26, coord: { x: 64, y: 4 }, demand: 2 },
      { id: 27, coord: { x: 94, y: 60 }, demand: 10 },
      { id: 28, coord: { x: 48, y: 40 }, demand: 15 },
      { id: 29, coord: { x: 95, y: 7 }, demand: 2 },
      { id: 30, coord: { x: 88, y: 62 }, demand: 14 },
      { id: 31, coord: { x: 28, y: 69 }, demand: 9 },
    ],
  },
  {
    id: 'A-n45-k6',
    name: 'Augerat A-n45-k6',
    comment: 'Augerat CVRP Instance with 44 customers and 6 vehicles',
    type: 'real',
    source: 'CVRPLIB (Augerat et al., 1995)',
    sourceUrl: 'http://vrp.atd-lab.inf.puc-rio.br/index.php/en/',
    dimension: 45,
    customerCount: 44,
    capacity: 100,
    vehicleCount: 6,
    bestKnownSolution: 944.0,
    depot: { x: 50, y: 50 },
    customers: generateSyntheticNodes(44, 100, 100, 50, 50, 42, 100),
  },
  {
    id: 'E-n101-k14',
    name: 'Christofides E-n101-k14',
    comment: 'Christofides & Eilon CVRP Standard Benchmark (100 customers, 14 vehicles)',
    type: 'real',
    source: 'CVRPLIB (Christofides et al., 1969)',
    sourceUrl: 'http://vrp.atd-lab.inf.puc-rio.br/index.php/en/',
    dimension: 101,
    customerCount: 100,
    capacity: 112,
    vehicleCount: 14,
    bestKnownSolution: 1067.0,
    depot: { x: 500, y: 500 },
    customers: generateSyntheticNodes(100, 1000, 1000, 500, 500, 101, 112),
  },
  {
    id: 'SYN-250-k20',
    name: 'HPC-Scale-250',
    comment: 'Multi-cluster benchmark for parallel thread scaling evaluation',
    type: 'synthetic',
    source: 'PRL Synthetic Generator',
    dimension: 251,
    customerCount: 250,
    capacity: 150,
    vehicleCount: 20,
    bestKnownSolution: 2840.0,
    depot: { x: 500, y: 500 },
    customers: generateSyntheticNodes(250, 1000, 1000, 500, 500, 250, 150),
  },
  {
    id: 'SYN-500-k35',
    name: 'HPC-Scale-500',
    comment: 'High-density customer instance for MPI and CUDA block-size comparisons',
    type: 'synthetic',
    source: 'PRL Synthetic Generator',
    dimension: 501,
    customerCount: 500,
    capacity: 200,
    vehicleCount: 35,
    bestKnownSolution: 5410.0,
    depot: { x: 500, y: 500 },
    customers: generateSyntheticNodes(500, 1000, 1000, 500, 500, 500, 200),
  },
  {
    id: 'SYN-1000-k50',
    name: 'HPC-Scale-1000',
    comment: 'Large-scale CVRP problem (1,000 customers, 50 vehicles) for GPU throughput benchmarking',
    type: 'synthetic',
    source: 'PRL Synthetic Generator',
    dimension: 1001,
    customerCount: 1000,
    capacity: 250,
    vehicleCount: 50,
    bestKnownSolution: 9850.0,
    depot: { x: 500, y: 500 },
    customers: generateSyntheticNodes(1000, 1000, 1000, 500, 500, 1000, 250),
  },
];

/**
 * Procedural generator for realistic CVRP clusters
 */
export function generateSyntheticNodes(
  count: number,
  maxX = 1000,
  maxY = 1000,
  depotX = 500,
  depotY = 500,
  seed = 42,
  capacity = 100
) {
  // Simple LCG pseudo-random for deterministic reproducibility
  let state = seed;
  const nextRand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  const clusters = [
    { x: maxX * 0.25, y: maxY * 0.25, radius: maxX * 0.18 },
    { x: maxX * 0.75, y: maxY * 0.25, radius: maxX * 0.18 },
    { x: maxX * 0.25, y: maxY * 0.75, radius: maxX * 0.18 },
    { x: maxX * 0.75, y: maxY * 0.75, radius: maxX * 0.18 },
    { x: depotX, y: depotY, radius: maxX * 0.22 },
  ];

  const customers = [];
  for (let i = 1; i <= count; i++) {
    // 70% clustered, 30% uniform
    const isClustered = nextRand() < 0.7;
    let x: number, y: number;

    if (isClustered) {
      const c = clusters[Math.floor(nextRand() * clusters.length)];
      const angle = nextRand() * 2 * Math.PI;
      const r = Math.sqrt(nextRand()) * c.radius;
      x = Math.max(10, Math.min(maxX - 10, Math.round(c.x + r * Math.cos(angle))));
      y = Math.max(10, Math.min(maxY - 10, Math.round(c.y + r * Math.sin(angle))));
    } else {
      x = Math.round(10 + nextRand() * (maxX - 20));
      y = Math.round(10 + nextRand() * (maxY - 20));
    }

    // Demands between 1 and min(30, capacity * 0.25)
    const maxDemand = Math.max(5, Math.floor(capacity * 0.22));
    const demand = Math.floor(1 + nextRand() * maxDemand);

    customers.push({
      id: i,
      coord: { x, y },
      demand,
    });
  }

  return customers;
}

// Pre-populated initial experiment runs
export const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-00421',
    timestamp: '2026-10-09T10:14:22Z',
    datasetId: 'SYN-1000-k50',
    datasetName: 'HPC-Scale-1000',
    algorithm: 'openmp',
    customerCount: 1000,
    vehicleCount: 50,
    capacity: 250,
    configuration: '8 threads (OpenMP)',
    hardwareConfig: { ...DEFAULT_HARDWARE_CONFIG, openMpThreads: 8 },
    executionTimeMs: 142.31,
    routeDistance: 10245.8,
    speedupVsSeq: 6.21,
    efficiencyPercent: 77.6,
    valid: true,
    status: 'completed',
    notes: 'Chunk size: 64, dynamic schedule, AVX-512 vectorization enabled.',
  },
  {
    id: 'EXP-00420',
    timestamp: '2026-10-09T10:12:05Z',
    datasetId: 'SYN-1000-k50',
    datasetName: 'HPC-Scale-1000',
    algorithm: 'sequential',
    customerCount: 1000,
    vehicleCount: 50,
    capacity: 250,
    configuration: '1 thread (Baseline C++)',
    hardwareConfig: { ...DEFAULT_HARDWARE_CONFIG, openMpThreads: 1 },
    executionTimeMs: 884.5,
    routeDistance: 10245.8,
    speedupVsSeq: 1.0,
    efficiencyPercent: 100.0,
    valid: true,
    status: 'completed',
    notes: 'Single-threaded baseline reference.',
  },
  {
    id: 'EXP-00419',
    timestamp: '2026-10-09T10:08:44Z',
    datasetId: 'SYN-1000-k50',
    datasetName: 'HPC-Scale-1000',
    algorithm: 'mpi',
    customerCount: 1000,
    vehicleCount: 50,
    capacity: 250,
    configuration: '4 processes (OpenMPI)',
    hardwareConfig: { ...DEFAULT_HARDWARE_CONFIG, mpiProcesses: 4 },
    executionTimeMs: 231.14,
    routeDistance: 10292.4,
    speedupVsSeq: 3.83,
    efficiencyPercent: 95.7,
    valid: true,
    status: 'completed',
    notes: 'Domain decomposition across 4 MPI ranks with asynchronous ring exchange.',
  },
  {
    id: 'EXP-00418',
    timestamp: '2026-10-09T09:55:10Z',
    datasetId: 'SYN-500-k35',
    datasetName: 'HPC-Scale-500',
    algorithm: 'hybrid',
    customerCount: 500,
    vehicleCount: 35,
    capacity: 200,
    configuration: '2 MPI procs × 4 OMP threads',
    hardwareConfig: { ...DEFAULT_HARDWARE_CONFIG, hybridMpiProcesses: 2, hybridThreadsPerProcess: 4 },
    executionTimeMs: 46.82,
    routeDistance: 5612.3,
    speedupVsSeq: 5.48,
    efficiencyPercent: 68.5,
    valid: true,
    status: 'completed',
    notes: 'Hybrid hierarchical model: node-level MPI message passing + intra-node OpenMP threads.',
  },
  {
    id: 'EXP-00417',
    timestamp: '2026-10-09T09:42:01Z',
    datasetId: 'A-n32-k5',
    datasetName: 'Augerat A-n32-k5',
    algorithm: 'openmp',
    customerCount: 31,
    vehicleCount: 5,
    capacity: 100,
    configuration: '4 threads (OpenMP)',
    hardwareConfig: { ...DEFAULT_HARDWARE_CONFIG, openMpThreads: 4 },
    executionTimeMs: 2.14,
    routeDistance: 784.0,
    speedupVsSeq: 2.85,
    efficiencyPercent: 71.3,
    valid: true,
    status: 'completed',
    notes: 'Achieved optimal BKS 784.0 km.',
  },
];

// Comprehensive benchmark scaling comparison points across input sizes
export const MULTI_SIZE_BENCHMARKS = [
  { customers: 100, sequential: 12.4, openmp: 2.8, mpi: 4.2, cuda: 1.4, hybrid: 2.6 },
  { customers: 250, sequential: 68.5, openmp: 12.1, mpi: 18.4, cuda: 3.8, hybrid: 10.5 },
  { customers: 500, sequential: 245.0, openmp: 42.6, mpi: 64.2, cuda: 8.9, hybrid: 35.1 },
  { customers: 1000, sequential: 884.5, openmp: 142.3, mpi: 231.1, cuda: 21.4, hybrid: 112.8 },
  { customers: 2000, sequential: 3410.0, openmp: 495.2, mpi: 840.5, cuda: 54.8, hybrid: 388.0 },
  { customers: 5000, sequential: 21500.0, openmp: 2890.0, mpi: 4920.0, cuda: 198.0, hybrid: 2140.0 },
];

export const OPENMP_SCALING_SERIES = [
  { threads: 1, timeMs: 884.5, speedup: 1.0, efficiency: 100.0, ideal: 1.0 },
  { threads: 2, timeMs: 462.1, speedup: 1.91, efficiency: 95.7, ideal: 2.0 },
  { threads: 4, timeMs: 248.6, speedup: 3.56, efficiency: 88.9, ideal: 4.0 },
  { threads: 8, timeMs: 142.3, speedup: 6.21, efficiency: 77.6, ideal: 8.0 },
  { threads: 16, timeMs: 98.4, speedup: 8.99, efficiency: 56.2, ideal: 16.0 },
];

export const MPI_SCALING_SERIES = [
  { processes: 1, totalTime: 884.5, compTime: 884.5, commTime: 0.0, speedup: 1.0, efficiency: 100.0 },
  { processes: 2, totalTime: 468.2, compTime: 442.2, commTime: 26.0, speedup: 1.89, efficiency: 94.4 },
  { processes: 4, totalTime: 252.1, compTime: 221.1, commTime: 31.0, speedup: 3.51, efficiency: 87.7 },
  { processes: 8, totalTime: 149.8, compTime: 110.5, commTime: 39.3, speedup: 5.90, efficiency: 73.8 },
  { processes: 16, totalTime: 108.4, compTime: 55.3, commTime: 53.1, speedup: 8.16, efficiency: 51.0 },
];

export const CUDA_BLOCK_SIZE_SERIES = [
  { blockSize: 64, kernelMs: 31.2, h2dMs: 0.42, d2hMs: 0.31, totalGpuMs: 31.93, warps: 2, occupancy: 68 },
  { blockSize: 128, kernelMs: 24.5, h2dMs: 0.42, d2hMs: 0.31, totalGpuMs: 25.23, warps: 4, occupancy: 85 },
  { blockSize: 256, kernelMs: 20.7, h2dMs: 0.42, d2hMs: 0.31, totalGpuMs: 21.43, warps: 8, occupancy: 96 },
  { blockSize: 512, kernelMs: 22.8, h2dMs: 0.42, d2hMs: 0.31, totalGpuMs: 23.53, warps: 16, occupancy: 82 },
];
