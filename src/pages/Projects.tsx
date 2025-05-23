
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/services/api';
import { isConfigured } from '@/services/config';
import ConfigModal from '@/components/ConfigModal';
import ProjectPasswordModal from '@/components/ProjectPasswordModal';
import { Project } from '@/types/api';
import PageHeader from '@/components/PageHeader';
import LoadingProjects from '@/components/LoadingProjects';
import ConfigurationNeeded from '@/components/ConfigurationNeeded';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import ProjectsList from '@/components/ProjectsList';
import ProjectSetupSection from '@/components/ProjectSetupSection';
import useProjectAccess from '@/hooks/useProjectAccess';

const Projects = () => {
  const [configVisible, setConfigVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [configured, setConfigured] = useState(false);

  // Check if app is configured on mount
  useEffect(() => {
    const checkConfig = async () => {
      const isConfigSet = await isConfigured();
      setConfigured(isConfigSet);
      if (isConfigSet) {
        refetch();
      }
    };
    
    checkConfig();
  }, []);

  const { data: projectsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    enabled: configured,
  });

  const { projectAccess, handlePasswordSuccess: updateProjectAccess } = useProjectAccess(projectsResponse?.data);

  const handleConfigSave = () => {
    setConfigured(true);
    refetch();
  };

  const openPasswordModal = (project: Project) => {
    setSelectedProject(project);
    setPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setPasswordModalOpen(false);
    if (selectedProject) {
      updateProjectAccess(selectedProject.id);
    }
  };

  if (!configured) {
    return (
      <>
        <ConfigurationNeeded onOpenConfig={() => setConfigVisible(true)} />
        <ConfigModal 
          open={configVisible} 
          onClose={() => setConfigVisible(false)}
          onSave={handleConfigSave}
        />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ApiErrorDisplay 
          onOpenConfig={() => setConfigVisible(true)} 
          onRetry={() => refetch()}
        />
        <ConfigModal 
          open={configVisible} 
          onClose={() => setConfigVisible(false)}
          onSave={handleConfigSave}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <PageHeader onOpenConfig={() => setConfigVisible(true)} />

        {isLoading ? (
          <LoadingProjects />
        ) : (
          <div>
            {/* Admin area for setting passwords */}
            <ProjectSetupSection projects={projectsResponse?.data || []} />

            {/* Projects list */}
            <h2 className="text-xl font-semibold mb-4">Projetos</h2>
            <ProjectsList 
              projects={projectsResponse?.data || []} 
              projectAccess={projectAccess}
              onRequestAccess={openPasswordModal}
            />

            {selectedProject && (
              <ProjectPasswordModal
                open={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onSuccess={handlePasswordSuccess}
                projectId={selectedProject.id}
                projectName={selectedProject.name}
              />
            )}
          </div>
        )}

        <ConfigModal 
          open={configVisible} 
          onClose={() => setConfigVisible(false)}
          onSave={handleConfigSave}
        />
      </div>
    </div>
  );
};

export default Projects;
