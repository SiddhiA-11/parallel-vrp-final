import React from 'react';
import { CompilerInfo, OpenMpInfo, MpiInfo } from '../../types';
import { Terminal, CheckCircle2, XCircle } from 'lucide-react';

interface CompilerTableProps {
  compilers: CompilerInfo;
  openmp: OpenMpInfo;
  mpi: MpiInfo;
}

export const CompilerTable: React.FC<CompilerTableProps> = ({ compilers, openmp, mpi }) => {
  const tools = [
    {
      tool: 'OpenMP Compiler & Spec',
      version: `${openmp.compiler} (${openmp.specVersion})`,
      status: openmp.available,
      path: 'libomp / libgomp runtime',
    },
    {
      tool: 'MPI Cluster Implementation',
      version: `${mpi.implementation} (Standard ${mpi.standardVersion})`,
      status: mpi.available,
      path: mpi.interconnect || 'POSIX Shared Memory IPC',
    },
    {
      tool: 'G++ / GCC (C++20)',
      version: compilers.gpp?.version || 'GCC 14.1.0',
      status: compilers.gpp?.available ?? true,
      path: compilers.gpp?.path || '/usr/bin/g++',
    },
    {
      tool: 'Clang++ (LLVM Frontend)',
      version: compilers.clang?.version || 'Clang 18.1.8',
      status: compilers.clang?.available ?? true,
      path: compilers.clang?.path || '/usr/bin/clang++',
    },
    {
      tool: 'NVCC (CUDA Compiler)',
      version: compilers.nvcc?.version || 'Not Detected',
      status: compilers.nvcc?.available ?? false,
      path: compilers.nvcc?.path || 'N/A',
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-[#1e232f] bg-[#13161c] shadow-xs font-mono text-xs">
      <div className="border-b border-[#1e232f] bg-[#0c0d11] p-3 text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <Terminal className="h-4 w-4 text-blue-400" />
        <span>HPC Compilers &amp; Parallel Framework Toolchains</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-[#1e232f] bg-[#181b24] text-[10px] text-slate-400 uppercase">
            <tr>
              <th className="px-3.5 py-2.5">Toolchain</th>
              <th className="px-3.5 py-2.5">Detected Version</th>
              <th className="px-3.5 py-2.5">Binary / Interconnect Path</th>
              <th className="px-3.5 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e232f]/60">
            {tools.map((t, idx) => (
              <tr key={idx} className="hover:bg-[#181b24]/50">
                <td className="px-3.5 py-2 font-semibold text-slate-100">{t.tool}</td>
                <td className="px-3.5 py-2 text-slate-300">{t.version}</td>
                <td className="px-3.5 py-2 text-slate-400">{t.path}</td>
                <td className="px-3.5 py-2">
                  {t.status ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> READY
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500 font-semibold">
                      <XCircle className="h-3 w-3" /> UNSET
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
