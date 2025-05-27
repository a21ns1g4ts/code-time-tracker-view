
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchTimeEntries, fetchProjects } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { groupEntriesByDay, generateWeeksData, formatDuration } from '@/utils/dataProcessor';
import { getProjectAccess } from '@/services/projectAccess';
import ActivityGrid from '@/components/ActivityGrid';
import Timeline from '@/components/Timeline';

const ProjectTimeEntries = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [projectName, setProjectName] = useState<string>('');

  // Fetch projects to get project name
  const { data: projectsResponse } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Fetch time entries
  const { data: timeEntriesResponse, isLoading, error } = useQuery({
    queryKey: ['timeEntries', projectId],
    queryFn: fetchTimeEntries,
    enabled: hasAccess && !!projectId,
  });

  useEffect(() => {
    const checkAccess = async () => {
      if (!projectId) {
        navigate('/projects');
        return;
      }

      const access = await getProjectAccess(projectId);
      setHasAccess(access);
      setIsChecking(false);
      
      if (!access) {
        toast({
          title: "Acesso negado",
          description: "Você não tem acesso a este projeto",
          variant: "destructive"
        });
        navigate('/projects');
      }
    };

    checkAccess();
  }, [projectId, navigate]);

  // Get project name from projects response
  useEffect(() => {
    if (projectsResponse?.data && projectId) {
      const project = projectsResponse.data.find(p => p.id === projectId);
      setProjectName(project?.name || 'Projeto Desconhecido');
    }
  }, [projectsResponse, projectId]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
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
              Erro ao buscar dados de time entries.
            </p>
            <Button onClick={() => navigate(`/project/${projectId}`)}>
              Voltar para Detalhes do Projeto
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter entries by project ID
  const projectEntries = timeEntriesResponse?.data.filter(
    entry => entry.project_id === projectId
  ) || [];

  const dayData = groupEntriesByDay(projectEntries);
  const weeksData = generateWeeksData(dayData);
  const totalHours = dayData.reduce((sum, day) => sum + day.totalDuration, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/project/${projectId}`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Detalhes
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Time Entries - {projectName}</h1>
            <p className="text-gray-600">Visualize todas as atividades de tempo deste projeto</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total de Horas</p>
                    <p className="text-xl font-semibold">{formatDuration(totalHours)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dias com Registros</p>
                    <p className="text-xl font-semibold">{dayData.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total de Registros</p>
                    <p className="text-xl font-semibold">{projectEntries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Atividade de Tempo</h2>
              <Card>
                <CardContent className="p-6">
                  <ActivityGrid weeksData={weeksData} />
                </CardContent>
              </Card>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Timeline de Atividades</h2>
              <Timeline dayData={dayData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeEntries;
