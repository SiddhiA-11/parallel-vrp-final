import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToggleLeft, ToggleRight, Cpu } from 'lucide-react';
import { useSystemInfo } from '../../hooks/useSystemInfo';

interface TopbarProps {
  onToggleMobileNav?: () => void;
  isExperimentRunning?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileNav, isExperimentRunning }) => {
  const location = useLocation();
  const { systemInfo, isMockMode, toggleMockMode } = useSystemInfo();

  const getPageMeta = (pathname: string) => {
    switch (pathname) {
      case '/':
        return { title: 'Parallel Computing Overview', breadcrumb: 'Overview' };
      case '/routes':
        return { title: 'CVRP Route Planner & 2D Visualizer', breadcrumb: 'Route Planner' };
      case '/performance':
        return { title: 'Performance Laboratory', breadcrumb: 'Performance Lab' };
      case '/datasets':
        return { title: 'Benchmark Datasets & Generator', breadcrumb: 'Datasets' };
      case '/algorithms':
        return { title: 'Algorithm Explorer & Parallel Architectures', breadcrumb: 'Algorithms' };
      case '/results':
        return { title: 'Experiment Benchmark History', breadcrumb: 'Results' };
      case '/system':
        return { title: 'System Diagnostics & HPC Environment', breadcrumb: 'System' };
      default:
        if (pathname.startsWith('/results/')) {
          return { title: 'Experiment Details', breadcrumb: 'Results / Details' };
        }
        return { title: 'Parallel Route Lab', breadcrumb: 'Lab' };
    }
  };

  const meta = getPageMeta(location.pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#1e232f] bg-[#0c0d11]/95 px-4 sm:px-6 backdrop-blur-sm">
      {/* Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleMobileNav && (
          <button
            onClick={onToggleMobileNav}
            className="rounded p-1 text-slate-400 hover:bg-[#181b24] hover:text-white md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span>prl</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium">{meta.breadcrumb.toLowerCase()}</span>
          </div>
          <h1 className="text-sm font-medium text-slate-100 tracking-tight">{meta.title}</h1>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Experiment Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded border border-[#1e232f] bg-[#13161c] px-2.5 py-1 text-xs">
          <div className="flex items-center gap-1.5 font-mono">
            {isExperimentRunning ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-400 font-semibold text-[11px]">BENCHMARK RUNNING</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400 font-medium text-[11px]">ENGINE READY</span>
              </>
            )}
          </div>
        </div>

        {/* Mock / Live Backend Mode Toggle */}
        <div className="flex items-center rounded border border-[#1e232f] bg-[#13161c] px-2.5 py-1 text-xs">
          <button
            onClick={() => toggleMockMode(!isMockMode)}
            className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle between Live Backend API and Local High-Fidelity Heuristics Engine"
          >
            {isMockMode ? (
              <>
                <ToggleLeft className="h-4 w-4 text-amber-500" />
                <span className="text-amber-400 font-medium">DEMO</span>
              </>
            ) : (
              <>
                <ToggleRight className="h-4 w-4 text-blue-500" />
                <span className="text-blue-400 font-medium">LIVE API</span>
              </>
            )}
          </button>
        </div>

        {/* Hardware quick tag */}
        {systemInfo && (
          <div className="hidden lg:flex items-center gap-2 rounded border border-[#1e232f] bg-[#13161c] px-2.5 py-1 text-[11px] font-mono text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-slate-400" />
            <span>{systemInfo.cpu.cores}C / {systemInfo.cpu.threads}T</span>
            <span className="text-slate-600">|</span>
            <span>{systemInfo.memory.totalGb}GB RAM</span>
          </div>
        )}
      </div>
    </header>
  );
};

