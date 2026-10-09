import React from 'react';
import { ArchitectureType } from '../../types';
import { ArrowDown, ArrowRight, Cpu, Server, Zap } from 'lucide-react';

interface ArchitectureDiagramProps {
  algorithm: ArchitectureType;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ algorithm }) => {
  return (
    <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5 mb-5">
        <span className="font-mono text-xs font-semibold uppercase text-slate-300">
          Parallel Flowchart &amp; Memory Topology
        </span>
        <span className="font-mono text-[11px] text-slate-500 uppercase">{algorithm}</span>
      </div>

      {algorithm === 'sequential' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 font-mono text-xs text-center">
          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 w-36">
            <div className="text-slate-500 text-[9px]">STAGE 1</div>
            <div className="font-semibold text-slate-200 mt-0.5">Input Nodes</div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden sm:block" />
          <ArrowDown className="h-3.5 w-3.5 text-slate-600 sm:hidden" />

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 w-36">
            <div className="text-slate-500 text-[9px]">STAGE 2</div>
            <div className="font-semibold text-slate-200 mt-0.5">Dist Matrix O(N²)</div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden sm:block" />
          <ArrowDown className="h-3.5 w-3.5 text-slate-600 sm:hidden" />

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 w-36">
            <div className="text-slate-500 text-[9px]">STAGE 3</div>
            <div className="font-semibold text-slate-200 mt-0.5">Nearest Neighbor</div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden sm:block" />
          <ArrowDown className="h-3.5 w-3.5 text-slate-600 sm:hidden" />

          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 w-36">
            <div className="text-slate-500 text-[9px]">STAGE 4</div>
            <div className="font-semibold text-slate-200 mt-0.5">2-Opt Local Search</div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden sm:block" />
          <ArrowDown className="h-3.5 w-3.5 text-slate-600 sm:hidden" />

          <div className="rounded border border-emerald-800/80 bg-emerald-950/30 p-2.5 w-36">
            <div className="text-emerald-400 text-[9px]">RESULT</div>
            <div className="font-semibold text-emerald-300 mt-0.5">Validated Routes</div>
          </div>
        </div>
      )}

      {algorithm === 'openmp' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 text-center min-w-[120px]">
              <div className="text-slate-500 text-[9px]">INPUT</div>
              <div className="font-semibold text-slate-200 mt-0.5">Coordinate Grid</div>
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden md:block" />
            <ArrowDown className="h-3.5 w-3.5 text-slate-600 md:hidden" />

            <div className="rounded border border-blue-900/60 bg-blue-950/20 p-3 flex-1">
              <div className="text-center text-blue-300 font-semibold mb-2 text-xs">
                #pragma omp parallel for schedule(dynamic, chunk)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {['Thread 0 (Core 0)', 'Thread 1 (Core 1)', 'Thread 2 (Core 2)', 'Thread N (Core N)'].map(
                  (t, i) => (
                    <div key={i} className="rounded border border-[#1e232f] bg-[#181b24] p-2">
                      <Cpu className="h-3.5 w-3.5 text-blue-400 mx-auto" />
                      <div className="mt-1 font-medium text-slate-200 text-[11px]">{t}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">2-Opt Search</div>
                    </div>
                  )
                )}
              </div>
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden md:block" />
            <ArrowDown className="h-3.5 w-3.5 text-slate-600 md:hidden" />

            <div className="rounded border border-emerald-800/80 bg-emerald-950/30 p-2.5 text-center min-w-[120px]">
              <div className="text-emerald-400 text-[9px]">MERGE</div>
              <div className="font-semibold text-emerald-300 mt-0.5">Best Routes</div>
            </div>
          </div>
        </div>
      )}

      {algorithm === 'mpi' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 text-center min-w-[120px]">
              <div className="text-slate-500 text-[9px]">ROOT (Rank 0)</div>
              <div className="font-semibold text-slate-200 mt-0.5">MPI_Bcast</div>
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden md:block" />
            <ArrowDown className="h-3.5 w-3.5 text-slate-600 md:hidden" />

            <div className="rounded border border-teal-900/60 bg-teal-950/20 p-3 flex-1">
              <div className="text-center text-teal-300 font-semibold mb-2 text-xs">
                Distributed Domain Decomposition &amp; Island Model
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {['MPI Rank 0 (Node 1)', 'MPI Rank 1 (Node 2)', 'MPI Rank 2 (Node 3)', 'MPI Rank 3 (Node 4)'].map(
                  (r, i) => (
                    <div key={i} className="rounded border border-[#1e232f] bg-[#181b24] p-2">
                      <Server className="h-3.5 w-3.5 text-teal-400 mx-auto" />
                      <div className="mt-1 font-medium text-slate-200 text-[11px]">{r}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Island 2-Opt</div>
                    </div>
                  )
                )}
              </div>
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden md:block" />
            <ArrowDown className="h-3.5 w-3.5 text-slate-600 md:hidden" />

            <div className="rounded border border-emerald-800/80 bg-emerald-950/30 p-2.5 text-center min-w-[120px]">
              <div className="text-emerald-400 text-[9px]">GATHER</div>
              <div className="font-semibold text-emerald-300 mt-0.5">MPI_Gather</div>
            </div>
          </div>
        </div>
      )}

      {algorithm === 'cuda' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="rounded border border-[#1e232f] bg-[#181b24] p-3">
              <Cpu className="h-4 w-4 text-slate-400 mx-auto" />
              <div className="font-semibold text-slate-100 mt-1">Host (CPU Memory)</div>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Allocate pinned buffers &amp; launch kernel grid
              </p>
            </div>

            <div className="rounded border border-dashed border-[#2b3344] bg-[#181b24]/60 p-3 flex flex-col justify-center">
              <div className="text-amber-400 font-semibold">PCIe Bus Transfer</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                cudaMemcpy(H2D) &rarr; Kernel &rarr; cudaMemcpy(D2H)
              </div>
            </div>

            <div className="rounded border border-amber-900/60 bg-amber-950/20 p-3">
              <Zap className="h-4 w-4 text-amber-400 mx-auto" />
              <div className="font-semibold text-amber-300 mt-1">Device GPU Grid</div>
              <p className="text-[11px] text-slate-300 mt-1 font-sans">
                __global__ 2-opt kernel evaluating edge pairs across parallel warps
              </p>
            </div>
          </div>
        </div>
      )}

      {algorithm === 'hybrid' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="rounded border border-indigo-900/50 bg-indigo-950/20 p-3">
            <div className="text-center font-semibold text-indigo-300 mb-2">
              Hierarchical Architecture: MPI Clusters + OpenMP Core Teams
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 text-center">
                <div className="text-slate-200 font-semibold">MPI Rank 0 (Node A)</div>
                <div className="mt-1 text-slate-400 text-[10px]">
                  #pragma omp parallel (8 Threads) + CUDA Streams
                </div>
              </div>
              <div className="rounded border border-[#1e232f] bg-[#181b24] p-2.5 text-center">
                <div className="text-slate-200 font-semibold">MPI Rank 1 (Node B)</div>
                <div className="mt-1 text-slate-400 text-[10px]">
                  #pragma omp parallel (8 Threads) + CUDA Streams
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
