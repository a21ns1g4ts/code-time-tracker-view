
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import Welcome from '@/pages/Welcome';
import ProtectedSetup from '@/components/ProtectedSetup';
import ConfigFromUrl from '@/pages/ConfigFromUrl';
import ConfigLinkGenerator from '@/pages/ConfigLinkGenerator';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import ProjectTimeEntries from '@/pages/ProjectTimeEntries';
import ProjectReports from '@/pages/ProjectReports';
import NotFound from '@/pages/NotFound';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/setup" element={<ProtectedSetup />} />
                <Route path="/config" element={<ConfigFromUrl />} />
                <Route path="/config-generator" element={<ConfigLinkGenerator />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
                <Route path="/project/:projectId/time-entries" element={<ProjectTimeEntries />} />
                <Route path="/project/:projectId/reports" element={<ProjectReports />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
