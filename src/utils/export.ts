import { Experiment } from '../types';
import { formatExecutionTime, formatSpeedup, formatEfficiency } from './formatters';

export function exportExperimentsToCsv(experiments: Experiment[], filename = 'prl-benchmark-results.csv') {
  const headers = [
    'Experiment ID',
    'Timestamp',
    'Dataset',
    'Algorithm',
    'Customers',
    'Vehicles',
    'Capacity',
    'Configuration',
    'Execution Time (ms)',
    'Route Distance (km)',
    'Speedup vs Seq',
    'Efficiency (%)',
    'Validity',
    'Status',
  ];

  const rows = experiments.map((exp) => [
    `"${exp.id}"`,
    `"${exp.timestamp}"`,
    `"${exp.datasetName}"`,
    `"${exp.algorithm.toUpperCase()}"`,
    exp.customerCount,
    exp.vehicleCount,
    exp.capacity,
    `"${exp.configuration}"`,
    exp.executionTimeMs.toFixed(2),
    exp.routeDistance.toFixed(2),
    exp.speedupVsSeq.toFixed(2),
    exp.efficiencyPercent.toFixed(1),
    exp.valid ? 'VALID' : 'INVALID',
    `"${exp.status.toUpperCase()}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadBlob(csvContent, filename, 'text/csv;charset=utf-8;');
}

export function exportExperimentToJson(experiment: Experiment, filename?: string) {
  const name = filename || `experiment-${experiment.id}.json`;
  const jsonContent = JSON.stringify(experiment, null, 2);
  downloadBlob(jsonContent, name, 'application/json;charset=utf-8;');
}

export function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
