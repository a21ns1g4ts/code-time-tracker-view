import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import ProjectTimeEntries from '@/pages/ProjectTimeEntries';
import NotFound from '@/pages/NotFound';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient } from '@tanstack/react-query';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <QueryClient>
      <Router>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/project/:projectId/time-entries" element={<ProjectTimeEntries />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </LanguageProvider>
      </Router>
    </QueryClient>
  );
}

export default App;
