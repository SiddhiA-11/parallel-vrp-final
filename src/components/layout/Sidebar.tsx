import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Route,
  Gauge,
  Database,
  Cpu,
  History,
  Server,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
} from 'lucide-react';
import { useSystemInfo } from '../../hooks/useSystemInfo';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { systemInfo, isMockMode } = useSystemInfo();

  const navItems = [
    { to: '/', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: '/routes', label: 'Route Planner', icon: <Route className="h-4 w-4" /> },
    { to: '/performance', label: 'Performance Lab', icon: <Gauge className="h-4 w-4" /> },
    { to: '/datasets', label: 'Datasets', icon: <Database className="h-4 w-4" /> },
    { to: '/algorithms', label: 'Algorithm Explorer', icon: <Layers className="h-4 w-4" /> },
    { to: '/results', label: 'Results', icon: <History className="h-4 w-4" /> },
    { to: '/system', label: 'System', icon: <Server className="h-4 w-4" /> },
  ];

  const cudaAvailable = systemInfo?.cuda.available ?? false;

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col border-r border-[#1e232f] bg-[#090a0e] transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between border-b border-[#1e232f] px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#181b24] border border-[#2b3344] text-slate-100 font-mono font-bold text-xs">
              PRL
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-semibold text-xs tracking-tight text-slate-100">Parallel Route Lab</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">CVRP HPC Suite</div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded bg-[#181b24] border border-[#2b3344] text-slate-100 font-mono font-bold text-xs">
            P
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden rounded p-1 text-slate-400 hover:bg-[#181b24] hover:text-slate-100 md:block transition-colors cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#181b24] text-slate-100 font-semibold border border-[#2b3344]'
                  : 'text-slate-400 hover:bg-[#13161c] hover:text-slate-200 border border-transparent'
              }`
            }
          >
            <span className="shrink-0 text-slate-400 group-hover:text-slate-200">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Hardware & Status */}
      <div className="border-t border-[#1e232f] bg-[#0c0d11] p-3">
        {!collapsed ? (
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center justify-between rounded bg-[#13161c] px-2 py-1.5 border border-[#1e232f]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-emerald-500" /> SYSTEM
              </span>
              <span className="text-emerald-400 font-semibold text-[10px]">ONLINE</span>
            </div>

            <div className="flex items-center justify-between rounded bg-[#13161c] px-2 py-1.5 border border-[#1e232f]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="h-3 w-3 text-blue-400" /> API
              </span>
              <span className={`font-semibold text-[10px] ${isMockMode ? 'text-amber-400' : 'text-blue-400'}`}>
                {isMockMode ? 'DEMO' : 'LIVE'}
              </span>
            </div>

            <div className="flex items-center justify-between rounded bg-[#13161c] px-2 py-1.5 border border-[#1e232f]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-slate-400" /> CUDA
              </span>
              <span
                className={`font-semibold text-[10px] ${
                  cudaAvailable ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {cudaAvailable ? 'READY' : 'UNSET'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" title="System Online" />
            <span className={`h-2 w-2 rounded-full ${isMockMode ? 'bg-amber-400' : 'bg-blue-500'}`} title="API Status" />
          </div>
        )}
      </div>
    </aside>
  );
};

