
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Settings, Clock, Calendar, AlertCircle, Lock, Unlock } from 'lucide-react';
import ConfigModal from '@/components/ConfigModal';
import { fetchProjects } from '@/services/api';
import { isConfigured } from '@/services/config';
import { toast } from '@/hooks/use-toast';
import { formatDuration } from '@/utils/dataProcessor';
import { Link, useNavigate } from 'react-router-dom';
import ProjectPasswordModal from '@/components/ProjectPasswordModal';
import ProjectPasswordSetter from '@/components/ProjectPasswordSetter';
import { getProjectAccess } from '@/services/projectAccess';
import { Project } from '@/types/api';

const Projects = () => {
  const navigate = useNavigate();
  const [configVisible, setConfigVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [projectAccess, setProjectAccess] = useState<Record<string, boolean>>({});

  const { data: projectsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    enabled: false, // Will be enabled in useEffect
  });

  const [configured, setConfigured] = React.useState(false);

  React.useEffect(() => {
    const checkConfig = async () => {
      const isConfigSet = await isConfigured();
      setConfigured(isConfigSet);
      if (isConfigSet) {
        refetch();
      }
    };

    checkConfig();
  }, [refetch]);

  React.useEffect(() => {
    if (projectsResponse?.data) {
      // Check access status for all projects
      const checkAllProjectsAccess = async () => {
        const accessStatus: Record<string, boolean> = {};
        
        for (const project of projectsResponse.data) {
          accessStatus[project.id] = await getProjectAccess(project.id);
        }
        
        setProjectAccess(accessStatus);
      };
      
      checkAllProjectsAccess();
    }
  }, [projectsResponse]);

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
      setProjectAccess(prev => ({
        ...prev,
        [selectedProject.id]: true
      }));
    }
  };

  if (!configured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <CardTitle>Configuração Necessária</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Configure seu Bearer Token e Organization ID para começar a acompanhar seus projetos.
            </p>
            <Button onClick={() => setConfigVisible(true)}>
              Configurar API
            </Button>
          </CardContent>
        </Card>
        <ConfigModal 
          open={configVisible} 
          onClose={() => setConfigVisible(false)}
          onSave={handleConfigSave}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <CardTitle>Erro na API</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Erro ao buscar dados da API. Verifique suas configurações.
            </p>
            <div className="space-x-2">
              <Button onClick={() => setConfigVisible(true)} variant="outline">
                Configurações
              </Button>
              <Button onClick={() => refetch()}>
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
        <ConfigModal 
          open={configVisible} 
          onClose={() => setConfigVisible(false)}
          onSave={handleConfigSave}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">A2Insights Tracker</h1>
            <p className="text-gray-600">Acompanhe seus projetos</p>
          </div>
          <Button onClick={() => setConfigVisible(true)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando projetos...</p>
          </div>
        ) : (
          <div>
            {/* Admin area for setting passwords */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Configurar Senhas dos Projetos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsResponse?.data.map((project) => (
                  <ProjectPasswordSetter 
                    key={`setter-${project.id}`}
                    projectId={project.id} 
                    projectName={project.name}
                  />
                ))}
              </div>
            </div>

            {/* Projects list */}
            <h2 className="text-xl font-semibold mb-4">Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsResponse?.data.map((project) => (
                <Card 
                  key={project.id} 
                  style={{ 
                    borderLeftColor: project.color || '#3B82F6',
                    borderLeftWidth: '4px'
                  }}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                    {projectAccess[project.id] ? (
                      <Unlock className="h-5 w-5 text-green-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-amber-500" />
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {formatDuration(project.spent_time)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {project.is_billable ? 'Faturável' : 'Não faturável'}
                        </span>
                      </div>
                      {project.is_archived && (
                        <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                          Arquivado
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    {projectAccess[project.id] ? (
                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/project/${project.id}`)}
                      >
                        Ver detalhes
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => openPasswordModal(project)}
                      >
                        Acessar projeto
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

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
