import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Overview } from './pages/Overview';
import { RoutePlanner } from './pages/RoutePlanner';
import { PerformanceLab } from './pages/PerformanceLab';
import { Datasets } from './pages/Datasets';
import { AlgorithmExplorer } from './pages/AlgorithmExplorer';
import { Results } from './pages/Results';
import { ExperimentDetails } from './pages/ExperimentDetails';
import { System } from './pages/System';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="routes" element={<RoutePlanner />} />
          <Route path="performance" element={<PerformanceLab />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="algorithms" element={<AlgorithmExplorer />} />
          <Route path="results" element={<Results />} />
          <Route path="results/:id" element={<ExperimentDetails />} />
          <Route path="system" element={<System />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
