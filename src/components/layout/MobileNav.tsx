import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Route, Gauge, Database, Layers, History, Server } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navItems = [
    { to: '/', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: '/routes', label: 'Route Planner', icon: <Route className="h-4 w-4" /> },
    { to: '/performance', label: 'Performance Lab', icon: <Gauge className="h-4 w-4" /> },
    { to: '/datasets', label: 'Datasets', icon: <Database className="h-4 w-4" /> },
    { to: '/algorithms', label: 'Algorithm Explorer', icon: <Layers className="h-4 w-4" /> },
    { to: '/results', label: 'Results', icon: <History className="h-4 w-4" /> },
    { to: '/system', label: 'System', icon: <Server className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
      <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-[#090a0e] p-4 border-r border-[#1e232f]">
        <div className="flex items-center justify-between border-b border-[#1e232f] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-[#181b24] border border-[#2b3344]">
              PRL
            </span>
            <span className="text-xs text-slate-300 font-medium">Parallel Route Lab</span>
          </div>
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-3 flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#181b24] text-white font-semibold border border-[#2b3344]'
                    : 'text-slate-400 hover:bg-[#13161c] hover:text-slate-200'
                }`
              }
            >
              <span className="text-slate-400">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

