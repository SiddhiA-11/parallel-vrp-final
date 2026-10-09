import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  isExperimentRunning?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ isExperimentRunning }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0d11] text-slate-100 flex">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Viewport */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          collapsed ? 'md:ml-16' : 'md:ml-60'
        }`}
      >
        <Topbar
          onToggleMobileNav={() => setMobileNavOpen(true)}
          isExperimentRunning={isExperimentRunning}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="border-t border-[#1e232f] bg-[#0c0d11] py-3.5 px-6 text-xs text-slate-500 font-mono">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto text-[11px]">
            <span>Parallel Route Lab (PRL) • Parallel Computing Laboratory</span>
            <span className="text-slate-600">Sequential | OpenMP | MPI | CUDA | Hybrid</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

