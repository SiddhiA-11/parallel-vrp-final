import React, { useState, useMemo } from 'react';
import { useBenchmarkHistory } from '../hooks/useBenchmarkHistory';
import { ResultsDataTable } from '../components/performance/ResultsDataTable';
import { ExperimentFilter } from '../components/results/ExperimentFilter';
import { ExperimentDetailModal } from '../components/results/ExperimentDetailModal';
import { EmptyState } from '../components/common/EmptyState';
import { ExportButton } from '../components/common/ExportButton';
import { Experiment } from '../types';
import { useNavigate } from 'react-router-dom';
import { History, Trash2, RotateCcw, Plus } from 'lucide-react';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { experiments, clearAll, loading } = useBenchmarkHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [minCustomers, setMinCustomers] = useState(0);
  const [inspectedExperiment, setInspectedExperiment] = useState<Experiment | null>(null);

  const filteredExperiments = useMemo(() => {
    return experiments.filter((exp) => {
      const matchSearch =
        exp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.configuration.toLowerCase().includes(searchTerm.toLowerCase());
      const matchAlgo = selectedAlgo === 'all' || exp.algorithm === selectedAlgo;
      const matchStatus =
        selectedStatus === 'all' || (selectedStatus === 'valid' ? exp.valid : !exp.valid);
      const matchCustomers = exp.customerCount >= minCustomers;

      return matchSearch && matchAlgo && matchStatus && matchCustomers;
    });
  }, [experiments, searchTerm, selectedAlgo, selectedStatus, minCustomers]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedAlgo('all');
    setSelectedStatus('all');
    setMinCustomers(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e232f] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              Experiment Benchmark History
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Historical database of parallel CVRP execution logs, speedups, and mathematical validity audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton experiments={filteredExperiments} />
          {experiments.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-md border border-rose-900/40 bg-rose-950/30 px-3 py-1.5 text-xs font-mono text-rose-300 hover:bg-rose-900/40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <ExperimentFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedAlgo={selectedAlgo}
        onAlgoChange={setSelectedAlgo}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        minCustomers={minCustomers}
        onMinCustomersChange={setMinCustomers}
        onReset={handleResetFilters}
      />

      {/* Results Table or Empty State */}
      {experiments.length === 0 ? (
        <EmptyState
          title="No Benchmark Results Yet"
          description="Execute your first parallel optimization experiment to populate the historical benchmark database."
          actionText="Run Your First Experiment"
          onAction={() => navigate('/performance')}
          iconType="benchmark"
        />
      ) : (
        <ResultsDataTable
          experiments={filteredExperiments}
          onSelectExperiment={setInspectedExperiment}
        />
      )}

      {/* Experiment Detail Modal */}
      <ExperimentDetailModal
        isOpen={inspectedExperiment !== null}
        onClose={() => setInspectedExperiment(null)}
        experiment={inspectedExperiment}
      />
    </div>
  );
};
