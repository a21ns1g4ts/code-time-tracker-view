
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/services/api';
import { isConfigured } from '@/services/config';
import ProjectPasswordModal from '@/components/ProjectPasswordModal';
import { Project } from '@/types/api';
import PageHeader from '@/components/PageHeader';
import LoadingProjects from '@/components/LoadingProjects';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import ProjectsList from '@/components/ProjectsList';
import useProjectAccess from '@/hooks/useProjectAccess';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);

  // Check if app is configured on mount
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const isConfigSet = await isConfigured();
        setConfigured(isConfigSet);
        if (isConfigSet) {
          refetch();
        }
      } catch (error) {
        console.error('Error checking configuration:', error);
        setConfigured(false);
      } finally {
        setConfigLoading(false);
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

  if (configLoading) {
    return <LoadingProjects />;
  }

  if (!configured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">{t('config.required')}</h2>
          <p className="text-gray-600">
            {t('config.required.message')}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ApiErrorDisplay 
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <PageHeader />

        {isLoading ? (
          <LoadingProjects />
        ) : (
          <div>
            {/* Projects list */}
            <h2 className="text-xl font-semibold mb-4">{t('projects')}</h2>
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
      </div>
    </div>
  );
};

export default Projects;
