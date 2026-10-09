export interface Point {
  x: number;
  y: number;
}

export interface Customer {
  id: number;
  coord: Point;
  demand: number;
}

export interface Depot {
  coord: Point;
}

export interface Route {
  routeId: number;
  customerIds: number[]; // 1-based customer IDs in visit order
  distance: number;
  load: number;
  color?: string;
}

export interface CVRPInstance {
  name: string;
  comment?: string;
  dimension: number;        // Total nodes including depot
  capacity: number;         // Maximum capacity per vehicle
  vehicleCount: number;     // Maximum fleet size available
  depot: Point;
  customers: Customer[];
  bks?: number;             // Best Known Solution distance (if benchmark)
}

export type ArchitectureType = 'sequential' | 'openmp' | 'mpi' | 'cuda' | 'hybrid';

export interface HardwareConfig {
  openMpThreads: number;      // 1, 2, 4, 8, 16, 32, 64
  mpiProcesses: number;       // 1, 2, 4, 8, 16
  cudaBlockSize: number;      // 64, 128, 256, 512, 1024
  hybridMpiNodes: number;     // 1, 2, 4, 8
  hybridThreadsPerNode: number; // 2, 4, 8, 16
}

export interface ConvergencePoint {
  iteration: number;
  distance: number;
  timeMs: number;
  improved: boolean;
}

export interface Solution {
  algorithm: ArchitectureType;
  algorithmName: string;
  datasetName: string;
  customerCount: number;
  maxVehicles: number;
  vehiclesUsed: number;
  capacity: number;
  totalDistance: number;
  bks?: number;
  gapPercent?: number;
  executionTimeMs: number;
  distCalcTimeMs: number;
  constructionTimeMs: number;
  localSearchTimeMs: number;
  communicationTimeMs: number;
  memoryTransferTimeMs: number;
  valid: boolean;
  errorMessage?: string;
  routes: Route[];
  convergenceHistory: ConvergencePoint[];
  meta: {
    threadsUsed?: number;
    mpiProcesses?: number;
    cudaBlockSize?: number;
    device?: string;
    speedupVsSeq?: number;
    efficiency?: number;
    karpFlattMetric?: number;
  };
}

export interface BenchmarkResult {
  instanceName: string;
  dimension: number;
  capacity: number;
  bks?: number;
  results: Record<ArchitectureType, Solution>;
  speedups: Record<ArchitectureType, number>;
  efficiencies: Record<ArchitectureType, number>;
  timestamp: string;
}

export interface AmdahlDataPoint {
  processors: number;
  theoreticalSpeedup: number;
  gustafsonSpeedup: number;
  empiricalSpeedup: number;
  efficiency: number;
}
