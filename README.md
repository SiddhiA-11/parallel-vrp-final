# Parallel Route Lab (PRL)
### Parallel Vehicle Routing & High-Performance Computing Analysis Platform

A high-end research dashboard and benchmarking platform for the **Capacitated Vehicle Routing Problem (CVRP)** across modern computing architectures:
- **Sequential Baseline (Single-Thread C++20)**
- **OpenMP (Shared-Memory Multi-Core CPU Concurrency)**
- **MPI (Distributed-Memory Domain Decomposition across Clusters)**
- **CUDA (Massively Parallel GPU Grid & 2-Opt Warp Kernels)**
- **Hybrid (MPI + OpenMP / MPI + CUDA Hierarchical Supercomputing)**

---

## 🔬 Key Capabilities & Views

1. **Parallel Computing Overview (`/`)**
   - High-level metric summary cards (Customers, Fleet Vehicles, Best Distance, Fastest Time, Peak Speedup, System Status).
   - Multi-architecture implementation availability grid.
   - Interactive execution time, speedup ($S_p = T_1/T_p$), and efficiency ($E_p = S_p/p$) comparative curves.
   - Live hardware specification detection (CPU, Cores/Threads, RAM, GPU, CUDA status).

2. **2D CVRP Route Planner & Interactive Visualizer (`/routes`)**
   - Custom 2D SVG canvas rendering customer clusters, demand annotations, and vehicle tours.
   - Distinct color palettes and directional routes per vehicle.
   - Interactive customer inspection: hover to see Customer ID, Demand, Coordinate $(x, y)$, and assigned vehicle.
   - Click to isolate and highlight single vehicle tours while dimming background routes.
   - Toolbar actions: Fit to View, Reset, Zoom In/Out, Toggle Demands, Toggle IDs, Toggle Route Lines.
   - Vehicle payload utilization bars with capacity overload detection.

3. **Performance Laboratory (`/performance`)**
   - Comprehensive configuration suite: OpenMP threads (1..32), MPI processes (1..16), CUDA block size (64..512), seed reproducibility.
   - Live experiment execution pipeline with real stage tracking.
   - Sortable, searchable, filterable data tables with CSV and JSON export.
   - Strong/Weak scaling analysis, Amdahl speedup models with dashed ideal linear references.
   - Dedicated CUDA panel (Kernel Time vs Host-to-Device/Device-to-Host PCIe latencies, block size curves, and clear guidance if CUDA hardware is absent).
   - Dedicated MPI communication overhead panel ($\text{MPI\_Bcast}$ and $\text{MPI\_Gather}$ breakdown).
   - Dedicated OpenMP thread scaling and Hybrid multi-tier configuration panels.

4. **Benchmark Datasets & Generator (`/datasets`)**
   - Standard CVRPLIB instances (Augerat, Christofides, Golden & Stewart).
   - Procedural synthetic instance generator with clustered / uniform customer distributions and spatial scatter preview.
   - Drag-and-drop parser for `.vrp` (VRPLIB standard), `.json`, and `.csv` files.

5. **Algorithm Explorer & Educational Architecture (`/algorithms`)**
   - Mathematical formulation of CVRP and objective functions.
   - Interactive execution flowcharts for Sequential, OpenMP, MPI, CUDA, and Hybrid architectures.
   - Algorithmic Big-O Time, Space, and Communication complexity comparison table.
   - In-app C++ / CUDA kernel inspector with syntax-highlighted source snippets.

6. **Experiment History & Mathematical Auditor (`/results`, `/results/:id`)**
   - Complete audit trail of past benchmark executions.
   - Full mathematical constraint validation (all customers visited once, capacity limits, depot round-trips, fleet limits).
   - Direct JSON run export and CSV batch export.

7. **System Diagnostics & HPC Environment (`/system`)**
   - Probes CPU model, core topologies, SIMD vector instructions (AVX-512, NEON), memory bandwidth, GPU accelerators, compilers (G++, GCC, Clang, NVCC), MPI libraries, and runtime environment variables.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- NPM or Bun

### Installation
```bash
# Clone or navigate to the repository
cd parallel-vrp-laboratory

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```

The laboratory will launch at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔌 Backend API Integration

PRL contains a centralized API layer (`src/api/client.ts`) configured to connect to your C++ backend via `VITE_API_URL`:

```env
VITE_API_URL="http://localhost:8000"
```

### Endpoints
- `GET /api/system-info` &mdash; Returns CPU, RAM, GPU, CUDA, OpenMP, and MPI specifications.
- `GET /api/datasets` &mdash; Returns list of available benchmark CVRP instances.
- `POST /api/datasets/generate` &mdash; Generates a synthetic dataset.
- `POST /api/benchmark/run` &mdash; Executes sequential/parallel algorithms on the backend.
- `GET /api/experiments` &mdash; Returns experiment history.

> **Offline / Demo Resilience:** When the backend server is offline or in demo mode, PRL transparently runs its deterministic client-side CVRP heuristic engine (Greedy Nearest Neighbor + 2-Opt local search + hardware timing models) to ensure uninterrupted demonstration and interactive experimentation without fabricating invalid results.

