import React from 'react';
import { Modal } from '../common/Modal';
import { ArchitectureType } from '../../types';
import { Copy, Check } from 'lucide-react';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  algorithm: ArchitectureType;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ isOpen, onClose, algorithm }) => {
  const [copied, setCopied] = React.useState(false);

  const getCode = () => {
    switch (algorithm) {
      case 'sequential':
        return `// Sequential CVRP 2-Opt Optimizer Baseline (C++)
bool two_opt_route_seq(Route& route, const CVRPInstance& inst) {
    bool improved = false;
    int n = static_cast<int>(route.customer_ids.size());
    if (n <= 2) return false;

    for (int i = 0; i < n - 1; ++i) {
        for (int k = i + 1; k < n; ++k) {
            int node_a = (i == 0) ? 0 : route.customer_ids[i - 1];
            int node_b = route.customer_ids[i];
            int node_c = route.customer_ids[k];
            int node_d = (k == n - 1) ? 0 : route.customer_ids[k + 1];

            double current_dist = inst.dist_matrix[node_a][node_b] + inst.dist_matrix[node_c][node_d];
            double new_dist = inst.dist_matrix[node_a][node_c] + inst.dist_matrix[node_b][node_d];

            if (new_dist < current_dist - 1e-6) {
                std::reverse(route.customer_ids.begin() + i, route.customer_ids.begin() + k + 1);
                improved = true;
            }
        }
    }
    return improved;
}`;

      case 'openmp':
        return `// OpenMP Shared-Memory Multi-Core Parallel 2-Opt (C++)
#include <omp.h>

void compute_distance_matrix_omp(CVRPInstance& inst, int num_threads) {
    int N = inst.dimension;
    #pragma omp parallel for num_threads(num_threads) schedule(dynamic, 64)
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < N; ++j) {
            if (i == j) {
                inst.dist_matrix[i][j] = 0.0;
            } else {
                inst.dist_matrix[i][j] = calculate_euclidean_distance(inst.all_nodes[i], inst.all_nodes[j]);
            }
        }
    }
}

bool two_opt_route_omp_inter(std::vector<Route>& routes, const CVRPInstance& inst, int num_threads) {
    bool global_improved = false;
    #pragma omp parallel for num_threads(num_threads) schedule(dynamic, 1) reduction(||:global_improved)
    for (size_t r = 0; r < routes.size(); ++r) {
        bool local_improved = two_opt_single_route(routes[r], inst);
        global_improved = global_improved || local_improved;
    }
    return global_improved;
}`;

      case 'mpi':
        return `// MPI Distributed-Memory Domain Decomposition (C++ / MPI)
#include <mpi.h>

void solve_cvrp_mpi(int argc, char** argv) {
    MPI_Init(&argc, &argv);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Broadcast customer coordinates to all cluster nodes
    MPI_Bcast(inst.coords_flat.data(), N * 2, MPI_DOUBLE, 0, MPI_COMM_WORLD);

    // Each rank optimizes its assigned vehicle route subset (Domain Partitioning)
    int routes_per_rank = total_routes / size;
    int start_r = rank * routes_per_rank;
    int end_r = (rank == size - 1) ? total_routes : start_r + routes_per_rank;

    for (int r = start_r; r < end_r; ++r) {
        two_opt_single_route(local_routes[r], inst);
    }

    // Gather optimized routes back to Root Rank 0
    MPI_Gather(local_data.data(), count, MPI_DOUBLE, global_data.data(), count, MPI_DOUBLE, 0, MPI_COMM_WORLD);
    MPI_Finalize();
}`;

      case 'cuda':
        return `// CUDA Massive GPU Grid 2-Opt Kernel (C++ / CUDA NVCC)
__global__ void cvrp_two_opt_kernel(
    const double* __restrict__ d_dist_matrix,
    int* __restrict__ d_routes,
    int route_len,
    int num_routes,
    double* __restrict__ d_gains
) {
    int r = blockIdx.y; // Vehicle Route Index
    int i = blockIdx.x * blockDim.x + threadIdx.x; // Outer swap index
    int k = threadIdx.y; // Inner swap index

    if (r < num_routes && i < route_len - 1 && k > i && k < route_len) {
        int node_a = (i == 0) ? 0 : d_routes[r * route_len + i - 1];
        int node_b = d_routes[r * route_len + i];
        int node_c = d_routes[r * route_len + k];
        int node_d = (k == route_len - 1) ? 0 : d_routes[r * route_len + k + 1];

        double curr_dist = d_dist_matrix[node_a * N + node_b] + d_dist_matrix[node_c * N + node_d];
        double new_dist  = d_dist_matrix[node_a * N + node_c] + d_dist_matrix[node_b * N + node_d];

        double gain = curr_dist - new_dist;
        if (gain > 0.0) {
            // Write improvement to device gain matrix for warp reduction
            d_gains[r * (route_len * route_len) + (i * route_len + k)] = gain;
        }
    }
}`;

      case 'hybrid':
        return `// Hybrid MPI + OpenMP Multi-Tier Supercomputing Kernel
#include <mpi.h>
#include <omp.h>

void solve_cvrp_hybrid(CVRPInstance& inst, int mpi_procs, int omp_threads) {
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Coarse-grained MPI Domain Decomposition
    int start_route, end_route;
    partition_routes(rank, mpi_procs, start_route, end_route);

    // Fine-grained OpenMP thread team per MPI rank
    #pragma omp parallel for num_threads(omp_threads) schedule(dynamic, 4)
    for (int r = start_route; r < end_route; ++r) {
        two_opt_single_route(routes[r], inst);
    }

    // Inter-node ring communication exchange for cross-route migrations
    MPI_Sendrecv(local_buffer, size, MPI_BYTE, next_rank, 0,
                 recv_buffer, size, MPI_BYTE, prev_rank, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
}`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`C++ / HPC Implementation: ${algorithm.toUpperCase()}`}
      subtitle="Actual parallel algorithm source snippet executed on backend node"
      maxWidth="4xl"
    >
      <div className="relative">
        <button
          onClick={copyCode}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-[#1e232f] hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>

        <pre className="max-h-[500px] overflow-auto rounded-lg border border-[#1e232f] bg-[#0c0d11] p-4 font-mono text-xs text-slate-200 leading-relaxed">
          <code>{getCode()}</code>
        </pre>
      </div>
    </Modal>
  );
};
