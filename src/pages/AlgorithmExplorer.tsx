import React, { useState } from 'react';
import { ArchitectureDiagram } from '../components/algorithms/ArchitectureDiagram';
import { AlgorithmCard } from '../components/algorithms/AlgorithmCard';
import { ComplexityTable } from '../components/algorithms/ComplexityTable';
import { CodeViewerModal } from '../components/algorithms/CodeViewerModal';
import { Tabs } from '../components/common/Tabs';
import { ArchitectureType } from '../types';
import { Layers, BookOpen, Code, Cpu, Server, Zap, CpuIcon } from 'lucide-react';

export const AlgorithmExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ArchitectureType>('openmp');
  const [inspectCodeAlgo, setInspectCodeAlgo] = useState<ArchitectureType | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#1e232f] pb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
            Algorithm Explorer &amp; Parallel Architectures
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          In-depth technical breakdown of CVRP heuristics, parallel loop partitioning, domain decomposition, and GPU warp kernels.
        </p>
      </div>

      {/* CVRP Problem Formulation Mathematical Overview */}
      <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-5 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase border-b border-[#1e232f] pb-2">
          <BookOpen className="h-4 w-4 text-blue-400" />
          <span>Mathematical Formulation: Capacitated Vehicle Routing Problem (CVRP)</span>
        </div>
        <div className="space-y-2 text-slate-300 font-sans leading-relaxed">
          <p>
            Given a complete weighted graph G = (V, E) where V = &#123;0, 1, ..., N&#125; consists of depot node 0 and customer nodes i &isin; &#123;1 ... N&#125; with demand q<sub>i</sub> &gt; 0.
            A fleet of K homogeneous vehicles with capacity C must service all customers minimizing total Euclidean tour distance:
          </p>
          <div className="rounded border border-[#1e232f] bg-[#0c0d11] p-3 font-mono text-xs text-blue-300 text-center">
            min &Sigma;<sub>k=1..K</sub> &Sigma;<sub>i,j &isin; V</sub> (c<sub>ij</sub> &middot; x<sub>ijk</sub>) &emsp; subject to &emsp; &Sigma;<sub>i &isin; Route<sub>k</sub></sub> q<sub>i</sub> &le; C, &emsp; &Sigma;<sub>k=1..K</sub> &Sigma;<sub>j &isin; V</sub> x<sub>ijk</sub> = 1 &forall; i &ge; 1
          </div>
        </div>
      </div>

      {/* Interactive Architecture Diagram */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono font-bold uppercase text-slate-400">
            Interactive Architecture Flowcharts
          </div>
          <Tabs
            size="sm"
            activeId={activeTab}
            onChange={(id) => setActiveTab(id as any)}
            options={[
              { id: 'sequential', label: 'Sequential' },
              { id: 'openmp', label: 'OpenMP' },
              { id: 'mpi', label: 'MPI' },
              { id: 'cuda', label: 'CUDA' },
              { id: 'hybrid', label: 'Hybrid' },
            ]}
          />
        </div>

        <ArchitectureDiagram algorithm={activeTab} />
      </div>

      {/* Detailed Architecture Cards */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold uppercase text-slate-400">
          Architecture Deep-Dive &amp; Kernel Strategies
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AlgorithmCard
            type="sequential"
            title="Sequential C++ Baseline"
            purpose="Establishes an unparallelized single-core baseline for measuring speedup and Amdahl acceleration."
            howItWorks="Executes standard Nearest Neighbor initial route construction followed by iterative 2-opt edge swap evaluation on a single CPU core."
            parallelizationStrategy="None (Reference single-threaded C++20 implementation compiled with -O3 optimizations)."
            advantages={[
              'Deterministic and zero synchronization overhead',
              'Minimal memory footprint O(N²)',
              'Accurate baseline reference for Amdahl speedup calculations',
            ]}
            limitations={[
              'Strictly bounded by single-core clock frequency',
              'Scales quadratically O(N²) causing severe bottlenecks for N > 500',
              'Underutilizes modern multi-core and SIMD execution units',
            ]}
            onViewCode={() => setInspectCodeAlgo('sequential')}
          />

          <AlgorithmCard
            type="openmp"
            title="OpenMP Multi-Core CPU Parallelism"
            purpose="Accelerates distance matrix computation and 2-opt pairwise search across multi-core CPU threads via shared memory."
            howItWorks="Partitions the 2-opt outer loop across threads using dynamic scheduling, evaluating simultaneous edge swaps and updating route structures with thread-safe atomic reductions."
            parallelizationStrategy="#pragma omp parallel for schedule(dynamic, 64) with SIMD vectorization and shared memory thread teams."
            advantages={[
              'High parallel efficiency on multi-core workstations (8–16 threads)',
              'Zero network serialization or PCIe transfer overhead',
              'Dynamic scheduling balances non-uniform route lengths effectively',
            ]}
            limitations={[
              'Bounded by NUMA memory bandwidth and L3 cache contention',
              'Amdahl serial fraction (depot returns, validation) limits peak scaling',
              'Requires cache-line padding to prevent false sharing',
            ]}
            onViewCode={() => setInspectCodeAlgo('openmp')}
          />

          <AlgorithmCard
            type="mpi"
            title="MPI Distributed-Memory Domain Decomposition"
            purpose="Enables scalability across cluster nodes and supercomputing clusters without shared memory limitations."
            howItWorks="Ranks execute domain decomposition, assigning subsets of vehicle routes to distinct processes. Best improvements are communicated via MPI_Bcast and aggregated with MPI_Gather."
            parallelizationStrategy="Island-model domain partitioning with asynchronous point-to-point ring communication (MPI_Sendrecv) for route migration."
            advantages={[
              'Scales beyond a single physical machine to multi-node clusters',
              'Each rank operates with dedicated L1/L2 cache and memory bandwidth',
              'Fault-tolerant domain partitioning',
            ]}
            limitations={[
              'Interconnect communication latency (MPI_Gather / Broadcast)',
              'Requires explicit memory marshaling and message serialization',
              'Load imbalance when routes contain unequal customer counts',
            ]}
            onViewCode={() => setInspectCodeAlgo('mpi')}
          />

          <AlgorithmCard
            type="cuda"
            title="CUDA GPU Massive Warp Parallelism"
            purpose="Leverages thousands of CUDA cores to evaluate all candidate (i, k) 2-opt edge swaps concurrently in O(1) step time."
            howItWorks="Flattened distance matrices and route arrays are copied to GPU VRAM. CUDA thread blocks map to 2D grid matrices, calculating distance delta deltas in parallel warps."
            parallelizationStrategy="__global__ void kernels mapped to 2D thread blocks (64..512 threads) with warp-level shuffle reductions in shared memory."
            advantages={[
              'Massive speedup (30× – 65×) for large customer instances (N > 1000)',
              'Hardware acceleration of thousands of simultaneous swap candidates',
              'High memory bandwidth (1000+ GB/s on HBM/GDDR6X)',
            ]}
            limitations={[
              'PCIe Host-to-Device (H2D) and Device-to-Host (D2H) transfer latency',
              'Warp divergence at route boundary conditions',
              'Requires NVIDIA GPU hardware runtime',
            ]}
            onViewCode={() => setInspectCodeAlgo('cuda')}
          />

          <AlgorithmCard
            type="hybrid"
            title="Hybrid MPI + OpenMP / CUDA Multi-Tier Architecture"
            purpose="Combines inter-node distributed computing with intra-node multi-threading and GPU acceleration for maximum HPC cluster utilization."
            howItWorks="Coarse-grained MPI distributes customer clusters between physical nodes, while intra-node OpenMP threads or CUDA kernels accelerate local route optimization."
            parallelizationStrategy="Hierarchical two-tier model: MPI_Init_thread(MPI_THREAD_MULTIPLE) + OpenMP thread pools + CUDA asynchronous streams."
            advantages={[
              'Optimal mapping to modern HPC supercomputer nodes (e.g. Perlmutter, Frontier)',
              'Minimizes MPI communication traffic by using shared memory inside nodes',
              'Capable of solving massive CVRP instances (N > 10,000)',
            ]}
            limitations={[
              'Complex synchronization and heterogeneous scheduling logic',
              'Requires careful NUMA core pinning and GPU device affinity tuning',
            ]}
            onViewCode={() => setInspectCodeAlgo('hybrid')}
          />
        </div>
      </div>

      {/* Big-O Complexity Comparison Table */}
      <ComplexityTable />

      {/* Code Inspection Modal */}
      {inspectCodeAlgo && (
        <CodeViewerModal
          isOpen={inspectCodeAlgo !== null}
          onClose={() => setInspectCodeAlgo(null)}
          algorithm={inspectCodeAlgo}
        />
      )}
    </div>
  );
};
