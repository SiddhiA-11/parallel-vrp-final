import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatasets } from '../hooks/useDatasets';
import { DatasetTable } from '../components/datasets/DatasetTable';
import { DatasetGenerator } from '../components/datasets/DatasetGenerator';
import { DatasetUploadModal } from '../components/datasets/DatasetUploadModal';
import { Dataset } from '../types';
import { Database, Upload, Sparkles, Layers } from 'lucide-react';

export const Datasets: React.FC = () => {
  const navigate = useNavigate();
  const {
    datasets,
    selectedDatasetId,
    setSelectedDatasetId,
    generateDataset,
    uploadDataset,
  } = useDatasets();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleBenchmarkDataset = (dataset: Dataset) => {
    setSelectedDatasetId(dataset.id);
    navigate('/performance');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e232f] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              Benchmark Datasets &amp; Generator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standard CVRPLIB problem instances, procedural cluster generators, and custom format importers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 rounded-md border border-[#2b3344] bg-[#181b24] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-[#1e232f] hover:text-white"
          >
            <Upload className="h-4 w-4 text-blue-400" />
            <span>Upload Dataset (.vrp / .json)</span>
          </button>
        </div>
      </div>

      {/* Dataset Instances Table */}
      <div>
        <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
          Available CVRP Instances ({datasets.length})
        </div>
        <DatasetTable
          datasets={datasets}
          selectedDatasetId={selectedDatasetId}
          onSelectDataset={setSelectedDatasetId}
          onLoadForBenchmark={handleBenchmarkDataset}
        />
      </div>

      {/* Synthetic Dataset Generator */}
      <div>
        <DatasetGenerator onGenerate={generateDataset} />
      </div>

      {/* Upload Modal */}
      <DatasetUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onImportDataset={uploadDataset}
      />
    </div>
  );
};
