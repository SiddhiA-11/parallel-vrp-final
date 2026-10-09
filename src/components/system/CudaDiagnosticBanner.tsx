import React from 'react';
import { CudaInfo } from '../../types';
import { AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';

interface CudaDiagnosticBannerProps {
  cudaInfo: CudaInfo;
}

export const CudaDiagnosticBanner: React.FC<CudaDiagnosticBannerProps> = ({ cudaInfo }) => {
  if (cudaInfo.available) {
    return (
      <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/20 p-3.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CheckCircle2 className="h-4 w-4" />
          <span>CUDA GPU ACCELERATION READY • {cudaInfo.version}</span>
        </div>
        <p className="mt-0.5 text-zinc-300 text-[11px] font-sans">
          NVIDIA GPU detected. GPU kernel dispatches, block dimensions (64..512), and PCIe transfers are enabled.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-900/40 bg-amber-950/15 p-4 font-mono text-xs">
      <div className="flex items-start gap-3">
        <div className="rounded border border-amber-800/60 bg-amber-950/50 p-1.5 text-amber-400">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="text-xs font-bold text-amber-300">
            CUDA Execution Unavailable on this Architecture
          </div>
          <p className="text-zinc-400 font-sans text-xs">
            {cudaInfo.reasonIfUnavailable ||
              'CUDA execution cannot run because an NVIDIA-compatible GPU environment was not detected.'}
          </p>
          <div className="rounded border border-[#1e232f] bg-[#181b24] p-2 text-[11px] text-slate-400 space-y-0.5">
            <div className="text-slate-200 font-medium flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-blue-400" />
              <span>Recommended Action:</span>
            </div>
            <div>
              {cudaInfo.suggestedAction ||
                'Run CUDA experiments on an NVIDIA GPU workstation, HPC cluster, or Google Colab with T4/A100 GPU.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
