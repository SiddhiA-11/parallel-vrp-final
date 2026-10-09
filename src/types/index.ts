export type ArchitectureType = 'sequential' | 'openmp' | 'mpi' | 'cuda' | 'hybrid';

export type DatasetType = 'real' | 'synthetic' | 'uploaded';

export type ImplementationStatus = 'available' | 'unavailable' | 'running' | 'completed' | 'failed' | 'not_compiled';

export interface Point {
  x: number;
  y: number;
}

export interface Customer {
  id: number;
  coord: Point;
  demand: number;
  readyTime?: number;
  dueTime?: number;
  serviceTime?: number;
}

export interface Depot {
  id: number;
  coord: Point;
}

export interface Route {
  vehicleId: number;
  customerIds: number[]; // 1-based customer IDs in visit order
  distance: number;
  load: number;
  capacity: number;
  color?: string;
  customers?: Customer[];
}

export interface Dataset {
  id: string;
  name: string;
  comment?: string;
  type: DatasetType;
  source?: string;
  sourceUrl?: string;
  dimension: number;        // Total nodes including depot
  customerCount: number;    // Customers excluding depot
  capacity: number;         // Vehicle maximum capacity
  vehicleCount: number;     // Suggested or max fleet size
  depot: Point;
  customers: Customer[];
  bestKnownSolution?: number; // Distance of optimal or BKS
  createdAt?: string;
}

export interface HardwareConfig {
  openMpThreads: number;      // 1, 2, 4, 8, 16, 32
  mpiProcesses: number;       // 1, 2, 4, 8, 16
  cudaBlockSize: number;      // 64, 128, 256, 512
  cudaGridSize?: number;
  hybridMpiProcesses: number; // 1, 2, 4
  hybridThreadsPerProcess: number; // 2, 4, 8
  randomSeed: number;
}

export interface SolutionValidation {
  valid: boolean;
  allCustomersVisited: boolean;
  noDuplicateVisits: boolean;
  capacityRespected: boolean;
  depotRoundTrip: boolean;
  vehicleCountRespected: boolean;
  visitedCount: number;
  totalCustomers: number;
  maxLoadUsed: number;
  maxCapacity: number;
  errors: string[];
  warnings: string[];
}

export interface CudaBreakdown {
  kernelTimeMs: number;
  hostToDeviceMs: number;
  deviceToHostMs: number;
  totalGpuTimeMs: number;
  gridDim: number;
  blockDim: number;
  warpsPerBlock: number;
  occupancyPercent?: number;
}

export interface MpiBreakdown {
  computationTimeMs: number;
  communicationTimeMs: number;
  broadcastTimeMs: number;
  gatherTimeMs: number;
  syncTimeMs: number;
  totalTimeMs: number;
  processCount: number;
}

export interface OpenMpBreakdown {
  parallelRegionTimeMs: number;
  syncOverheadMs: number;
  distCalcTimeMs: number;
  localSearchTimeMs: number;
  threadsUsed: number;
}

export interface HybridBreakdown {
  mpiProcesses: number;
  threadsPerProcess: number;
  cudaAccelerated: boolean;
  computationTimeMs: number;
  mpiCommTimeMs: number;
  ompSyncTimeMs: number;
  cudaTransferTimeMs?: number;
}

export interface AlgorithmResult {
  algorithm: ArchitectureType;
  algorithmName: string;
  datasetId: string;
  datasetName: string;
  customerCount: number;
  vehiclesUsed: number;
  maxVehicles: number;
  capacity: number;
  totalDistance: number;
  bks?: number;
  bksGapPercent?: number;
  executionTimeMs: number;
  speedupVsSeq: number;
  efficiencyPercent: number;
  valid: boolean;
  validation: SolutionValidation;
  routes: Route[];
  hardwareConfig: Partial<HardwareConfig>;
  cudaMetrics?: CudaBreakdown;
  mpiMetrics?: MpiBreakdown;
  openMpMetrics?: OpenMpBreakdown;
  hybridMetrics?: HybridBreakdown;
  stageTimings?: {
    distMatrixMs: number;
    constructionMs: number;
    localSearchMs: number;
    validationMs: number;
  };
}

export interface Experiment {
  id: string;
  timestamp: string;
  datasetId: string;
  datasetName: string;
  algorithm: ArchitectureType;
  customerCount: number;
  vehicleCount: number;
  capacity: number;
  configuration: string;
  hardwareConfig: HardwareConfig;
  executionTimeMs: number;
  routeDistance: number;
  speedupVsSeq: number;
  efficiencyPercent: number;
  valid: boolean;
  status: 'completed' | 'failed' | 'running' | 'idle';
  solution?: AlgorithmResult;
  notes?: string;
}

export interface BenchmarkSuiteResult {
  id: string;
  timestamp: string;
  datasetId: string;
  datasetName: string;
  customerCount: number;
  vehicleCount: number;
  capacity: number;
  baselineTimeMs: number; // Sequential time
  results: Record<ArchitectureType, AlgorithmResult>;
  speedups: Record<ArchitectureType, number>;
  efficiencies: Record<ArchitectureType, number>;
}

export interface CpuInfo {
  model: string;
  cores: number;
  threads: number;
  architecture: string;
  baseClockGhz?: number;
  l1CacheKb?: number;
  l2CacheMb?: number;
  l3CacheMb?: number;
  extensions?: string[];
}

export interface MemoryInfo {
  totalGb: number;
  availableGb: number;
  usedGb: number;
  type?: string;
  bandwidthGbs?: number;
}

export interface GpuInfo {
  available: boolean;
  name: string;
  memoryTotalGb: number;
  memoryFreeGb: number;
  computeCapability?: string;
  cudaCores?: number;
  smCount?: number;
  maxThreadsPerBlock?: number;
  warpSize?: number;
  driverVersion?: string;
}

export interface CudaInfo {
  available: boolean;
  version?: string;
  runtimeVersion?: string;
  toolkitPath?: string;
  reasonIfUnavailable?: string;
  suggestedAction?: string;
}

export interface OpenMpInfo {
  available: boolean;
  compiler: string;
  version: string;
  specVersion: string;
  maxThreads: number;
}

export interface MpiInfo {
  available: boolean;
  implementation: string; // OpenMPI, MPICH, Intel MPI
  version: string;
  standardVersion: string;
  interconnect?: string;
  detectedNodes: number;
}

export interface CompilerInfo {
  gpp?: { version: string; path: string; available: boolean };
  gcc?: { version: string; path: string; available: boolean };
  clang?: { version: string; path: string; available: boolean };
  nvcc?: { version: string; path: string; available: boolean };
}

export interface SystemInfo {
  hostName: string;
  os: string;
  kernel: string;
  uptimeSeconds: number;
  cpu: CpuInfo;
  memory: MemoryInfo;
  gpu: GpuInfo;
  cuda: CudaInfo;
  openmp: OpenMpInfo;
  mpi: MpiInfo;
  compilers: CompilerInfo;
  environmentVariables: Record<string, string>;
  isMockData?: boolean;
}

export interface ExperimentStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  elapsedMs?: number;
}

export interface LiveBenchmarkState {
  isRunning: boolean;
  experimentId?: string;
  algorithm?: ArchitectureType;
  datasetName?: string;
  customerCount?: number;
  vehicleCount?: number;
  currentStage: string;
  elapsedSeconds: number;
  stages: ExperimentStage[];
  error?: string;
}
