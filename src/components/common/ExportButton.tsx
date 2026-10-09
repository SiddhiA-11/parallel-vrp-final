import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileJson, ChevronDown } from 'lucide-react';
import { Experiment } from '../../types';
import { exportExperimentsToCsv, exportExperimentToJson } from '../../utils/export';

interface ExportButtonProps {
  experiments: Experiment[];
  selectedExperiment?: Experiment;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ experiments, selectedExperiment }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCsv = () => {
    exportExperimentsToCsv(experiments);
    setOpen(false);
  };

  const handleJson = () => {
    if (selectedExperiment) {
      exportExperimentToJson(selectedExperiment);
    } else if (experiments.length > 0) {
      exportExperimentToJson(experiments[0]);
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        disabled={experiments.length === 0}
        className="inline-flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1.5 text-xs font-mono font-medium text-slate-200 transition-colors hover:bg-[#232836] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Download className="h-3.5 w-3.5 text-slate-400" />
        Export
        <ChevronDown className="h-3 w-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-44 rounded-md border border-[#2b3344] bg-[#13161c] py-1 shadow-lg font-mono">
          <button
            onClick={handleCsv}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:bg-[#181b24] cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
            CSV ({experiments.length})
          </button>
          <button
            onClick={handleJson}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:bg-[#181b24] cursor-pointer"
          >
            <FileJson className="h-3.5 w-3.5 text-blue-400" />
            JSON
          </button>
        </div>
      )}
    </div>
  );
};

