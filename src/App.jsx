import { Routes, Route, Navigate } from 'react-router-dom';
import { VulnProvider } from './context/VulnContext';
import DashboardPage from './pages/DashboardPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <VulnProvider>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vuln/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </VulnProvider>
  );
}
