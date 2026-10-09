import React, { useState, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Dataset, Customer } from '../../types';
import { Upload, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DatasetUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportDataset: (dataset: Dataset) => Promise<Dataset>;
}

export const DatasetUploadModal: React.FC<DatasetUploadModalProps> = ({
  isOpen,
  onClose,
  onImportDataset,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedDataset, setParsedDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setError(null);
    setParsedDataset(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const name = uploadedFile.name.replace(/\.[^/.]+$/, '');

        if (uploadedFile.name.endsWith('.json')) {
          const json = JSON.parse(text);
          if (!json.customers || !json.capacity) {
            throw new Error('Invalid JSON format: missing "customers" or "capacity" properties.');
          }
          setParsedDataset({
            id: `UPLOAD-${Date.now()}`,
            name: json.name || name,
            type: 'uploaded',
            source: 'User Upload (JSON)',
            dimension: json.customers.length + 1,
            customerCount: json.customers.length,
            capacity: json.capacity,
            vehicleCount: json.vehicleCount || Math.ceil(json.customers.length / 5),
            depot: json.depot || { x: 500, y: 500 },
            customers: json.customers,
          });
        } else if (uploadedFile.name.endsWith('.vrp') || text.includes('NODE_COORD_SECTION')) {
          // Standard VRPLIB Parser
          const lines = text.split('\n').map((l) => l.trim());
          let capacity = 100;
          let readingCoords = false;
          let readingDemands = false;

          const coordsMap = new Map<number, { x: number; y: number }>();
          const demandsMap = new Map<number, number>();
          let depotCoord = { x: 50, y: 50 };

          for (const line of lines) {
            if (line.startsWith('CAPACITY')) {
              capacity = parseInt(line.split(':')[1]?.trim() || line.split(/\s+/)[1], 10) || 100;
            } else if (line.startsWith('NODE_COORD_SECTION')) {
              readingCoords = true;
              readingDemands = false;
            } else if (line.startsWith('DEMAND_SECTION')) {
              readingCoords = false;
              readingDemands = true;
            } else if (line === 'EOF' || line.startsWith('-1')) {
              readingCoords = false;
              readingDemands = false;
            } else {
              const parts = line.split(/\s+/).filter(Boolean);
              if (readingCoords && parts.length >= 3) {
                const id = parseInt(parts[0], 10);
                const x = parseFloat(parts[1]);
                const y = parseFloat(parts[2]);
                coordsMap.set(id, { x, y });
              } else if (readingDemands && parts.length >= 2) {
                const id = parseInt(parts[0], 10);
                const d = parseInt(parts[1], 10);
                demandsMap.set(id, d);
              }
            }
          }

          if (coordsMap.has(1)) {
            depotCoord = coordsMap.get(1)!;
          }

          const customers: Customer[] = [];
          for (const [id, coord] of coordsMap.entries()) {
            if (id === 1) continue;
            customers.push({
              id: id - 1,
              coord,
              demand: demandsMap.get(id) || 10,
            });
          }

          setParsedDataset({
            id: `VRPLIB-${name}-${Date.now()}`,
            name,
            type: 'uploaded',
            source: 'User Upload (VRPLIB)',
            dimension: customers.length + 1,
            customerCount: customers.length,
            capacity,
            vehicleCount: Math.ceil(customers.length / 5),
            depot: depotCoord,
            customers,
          });
        } else {
          // CSV Parser
          const lines = text.split('\n').filter((l) => l.trim().length > 0);
          const customers: Customer[] = [];
          let depotCoord = { x: 500, y: 500 };

          lines.forEach((line, idx) => {
            const parts = line.split(',').map((p) => parseFloat(p.trim()));
            if (parts.length >= 3 && !isNaN(parts[1])) {
              if (idx === 0) {
                depotCoord = { x: parts[1], y: parts[2] };
              } else {
                customers.push({
                  id: idx,
                  coord: { x: parts[1], y: parts[2] },
                  demand: parts[3] || 10,
                });
              }
            }
          });

          setParsedDataset({
            id: `CSV-${name}-${Date.now()}`,
            name,
            type: 'uploaded',
            source: 'User Upload (CSV)',
            dimension: customers.length + 1,
            customerCount: customers.length,
            capacity: 100,
            vehicleCount: Math.ceil(customers.length / 5),
            depot: depotCoord,
            customers,
          });
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to parse uploaded dataset file.');
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleImport = async () => {
    if (!parsedDataset) return;
    setIsProcessing(true);
    try {
      await onImportDataset(parsedDataset);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to import dataset.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Benchmark Dataset"
      subtitle="Supported: .vrp (VRPLIB), .json, and .csv"
      maxWidth="md"
    >
      <div className="space-y-3">
        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-950/20'
              : 'border-[#2b3344] bg-[#181b24]/60 hover:border-[#3b82f6]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".vrp,.json,.csv,.txt"
            onChange={handleChange}
            className="hidden"
          />
          <Upload className="h-6 w-6 text-slate-400" />
          <p className="mt-2 text-xs font-semibold text-slate-200">
            Click to select or drop dataset file
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
            VRPLIB (.vrp), JSON (.json), or CSV (id,x,y,demand)
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded border border-rose-900/60 bg-rose-950/40 p-2.5 text-xs text-rose-300">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {parsedDataset && (
          <div className="rounded border border-[#1e232f] bg-[#181b24] p-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Parsed &amp; Validated</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-slate-300 text-[11px]">
              <div>Name: <span className="text-slate-100 font-semibold">{parsedDataset.name}</span></div>
              <div>Nodes: <span className="text-slate-100 font-semibold">{parsedDataset.customerCount}</span></div>
              <div>Capacity: <span className="text-slate-100 font-semibold">{parsedDataset.capacity}</span></div>
              <div>Vehicles: <span className="text-slate-100 font-semibold">{parsedDataset.vehicleCount}</span></div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-end gap-2 border-t border-[#1e232f] pt-3">
          <button
            onClick={onClose}
            className="rounded border border-[#2b3344] bg-[#181b24] px-3 py-1 text-xs font-mono text-slate-300 hover:bg-[#1e232f] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!parsedDataset || isProcessing}
            className="rounded bg-blue-600 px-3 py-1 text-xs font-mono font-semibold text-white hover:bg-blue-500 disabled:opacity-40"
          >
            {isProcessing ? 'Importing...' : 'Import Dataset'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
