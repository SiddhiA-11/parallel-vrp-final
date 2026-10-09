import React from 'react';

export const ComplexityTable: React.FC = () => {
  const data = [
    {
      arch: 'Sequential',
      time: 'O(V · (N/V)² · iters)',
      space: 'O(N²)',
      comm: 'O(1) (Shared memory)',
      speedupLimit: '1.0× (Baseline)',
      bottleneck: 'Single-thread CPU memory throughput & serial ALU loops',
    },
    {
      arch: 'OpenMP',
      time: 'O((V · (N/V)² · iters) / T)',
      space: 'O(N² + T · N)',
      comm: 'O(T) (L3 Cache sync / barriers)',
      speedupLimit: 'T / (s + p/T) (Amdahl ~8-14× on 16C)',
      bottleneck: 'Thread barrier synchronizations & cache coherence invalidations',
    },
    {
      arch: 'MPI',
      time: 'O((V · (N/V)² · iters) / P)',
      space: 'O(P · N²)',
      comm: 'O(P · N) (Network MPI_Gather/Bcast)',
      speedupLimit: 'P / (1 + comm/comp)',
      bottleneck: 'Interconnect latency (Ethernet/InfiniBand) & load imbalance',
    },
    {
      arch: 'CUDA',
      time: 'O((V · N/V · iters) / (Blocks · Warps))',
      space: 'O(N² + GPU VRAM)',
      comm: 'O(N) (PCIe Host ↔ Device transfers)',
      speedupLimit: '30× - 65× vs CPU Baseline',
      bottleneck: 'PCIe bus bandwidth & Warp branch divergence in route boundaries',
    },
    {
      arch: 'Hybrid (MPI + OpenMP / CUDA)',
      time: 'O(N² / (P · T · GPU_cores))',
      space: 'O(P · N²)',
      comm: 'Hierarchical (Inter-node + Intra-node)',
      speedupLimit: 'Scales to 100+ nodes in HPC supercomputers',
      bottleneck: 'Heterogeneous task scheduling & cross-layer latency',
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-[#1e232f] bg-[#13161c] shadow-xs font-mono text-xs">
      <div className="border-b border-[#1e232f] bg-[#0c0d11] p-3 text-xs font-bold text-slate-200 uppercase tracking-wider">
        Theoretical &amp; Empirical Algorithmic Complexity Comparison
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-[#1e232f] bg-[#181b24] text-[10px] text-slate-400 uppercase">
            <tr>
              <th className="px-3.5 py-2.5">Architecture</th>
              <th className="px-3.5 py-2.5">Time Complexity</th>
              <th className="px-3.5 py-2.5">Space Complexity</th>
              <th className="px-3.5 py-2.5">Communication Cost</th>
              <th className="px-3.5 py-2.5">Speedup Upper Bound</th>
              <th className="px-3.5 py-2.5">Primary Bottleneck</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e232f]/60">
            {data.map((row) => (
              <tr key={row.arch} className="hover:bg-[#181b24]/50">
                <td className="px-3.5 py-2.5 font-bold text-slate-100">{row.arch}</td>
                <td className="px-3.5 py-2.5 text-emerald-400">{row.time}</td>
                <td className="px-3.5 py-2.5 text-slate-300">{row.space}</td>
                <td className="px-3.5 py-2.5 text-amber-400">{row.comm}</td>
                <td className="px-3.5 py-2.5 font-semibold text-slate-200">{row.speedupLimit}</td>
                <td className="px-3.5 py-2.5 text-slate-400 text-[11px] font-sans">{row.bottleneck}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
