import React, { useState } from 'react';
import { GenerateDatasetParams } from '../../api/datasets';
import { Dataset } from '../../types';
import { DatasetScatterPreview } from './DatasetScatterPreview';
import { generateSyntheticNodes } from '../../mock/demoData';
import { Sparkles, Download, Play } from 'lucide-react';
import { downloadBlob } from '../../utils/export';

interface DatasetGeneratorProps {
  onGenerate: (params: GenerateDatasetParams) => Promise<Dataset>;
}

export const DatasetGenerator: React.FC<DatasetGeneratorProps> = ({ onGenerate }) => {
  const [name, setName] = useState('Synthetic-Custom');
  const [customers, setCustomers] = useState(250);
  const [vehicles, setVehicles] = useState(20);
  const [capacity, setCapacity] = useState(150);
  const [maxX, setMaxX] = useState(1000);
  const [maxY, setMaxY] = useState(1000);
  const [seed, setSeed] = useState(42);
  const [isGenerating, setIsGenerating] = useState(false);

  // Live preview nodes
  const previewCustomers = React.useMemo(() => {
    return generateSyntheticNodes(
      Math.min(customers, 500),
      maxX,
      maxY,
      Math.round(maxX / 2),
      Math.round(maxY / 2),
      seed,
      capacity
    );
  }, [customers, maxX, maxY, seed, capacity]);

  const handleCreate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate({
        name: name || `SYN-${customers}-k${vehicles}`,
        customerCount: customers,
        vehicleCount: vehicles,
        capacity,
        maxX,
        maxY,
        depotX: Math.round(maxX / 2),
        depotY: Math.round(maxY / 2),
        seed,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadJson = () => {
    const data = {
      name: name || `SYN-${customers}`,
      dimension: customers + 1,
      capacity,
      vehicleCount: vehicles,
      depot: { x: Math.round(maxX / 2), y: Math.round(maxY / 2) },
      customers: previewCustomers,
    };
    downloadBlob(JSON.stringify(data, null, 2), `${name || 'dataset'}.json`, 'application/json');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg border border-[#1e232f] bg-[#13161c] p-4 shadow-xs">
      {/* Controls */}
      <div className="space-y-3">
        <div className="border-b border-[#1e232f] pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-mono">
              Synthetic Instance Generator
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-400 font-sans">
            Create reproducible CVRP instances with clustered customer coordinates
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">Random Seed</label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">
              Customers: <span className="text-slate-100 font-semibold">{customers}</span>
            </label>
            <input
              type="range"
              min={20}
              max={2500}
              step={10}
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">
              Fleet: <span className="text-slate-100 font-semibold">{vehicles}</span>
            </label>
            <input
              type="range"
              min={2}
              max={100}
              step={1}
              value={vehicles}
              onChange={(e) => setVehicles(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase text-slate-400 text-[10px] mb-1">Coordinate Max (X &times; Y)</label>
            <input
              type="number"
              value={maxX}
              onChange={(e) => {
                setMaxX(Number(e.target.value));
                setMaxY(Number(e.target.value));
              }}
              className="w-full rounded border border-[#2b3344] bg-[#181b24] px-2.5 py-1.5 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleCreate}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-1.5 rounded bg-blue-600 px-3.5 py-1.5 text-xs font-mono font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            <Play className="h-3 w-3 fill-white" />
            <span>{isGenerating ? 'Generating...' : 'Generate & Load'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 rounded border border-[#2b3344] bg-[#181b24] px-3 py-1.5 text-xs font-mono font-medium text-slate-200 hover:bg-[#1e232f] hover:text-white"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Spatial Scatter Preview */}
      <div>
        <DatasetScatterPreview
          depot={{ x: Math.round(maxX / 2), y: Math.round(maxY / 2) }}
          customers={previewCustomers}
          height={280}
        />
      </div>
    </div>
  );
};
