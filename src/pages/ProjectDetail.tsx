
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchTimeEntries } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { groupEntriesByDay, formatDuration } from '@/utils/dataProcessor';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import { getProjectAccess } from '@/services/projectAccess';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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
    return null; // Will be redirected by the useEffect
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
              Erro ao buscar dados do projeto.
            </p>
            <Button onClick={() => navigate('/projects')}>
              Voltar para Projetos
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
  const totalHours = dayData.reduce((sum, day) => sum + day.totalDuration, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/projects')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Projetos
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalhes do Projeto</h1>
            <p className="text-gray-600">Visualize todas as atividades deste projeto</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados do projeto...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total de Horas</p>
                    <p className="text-xl font-semibold">{formatDuration(totalHours)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dias com Registros</p>
                    <p className="text-xl font-semibold">{dayData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Entries Table */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Registros de Tempo</h2>
              
              {projectEntries.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Início</TableHead>
                          <TableHead>Fim</TableHead>
                          <TableHead>Duração</TableHead>
                          <TableHead>Descrição</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectEntries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              {format(parseISO(entry.start), 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell>
                              {format(parseISO(entry.start), 'HH:mm')}
                            </TableCell>
                            <TableCell>
                              {format(parseISO(entry.end), 'HH:mm')}
                            </TableCell>
                            <TableCell>{formatDuration(entry.duration)}</TableCell>
                            <TableCell>{entry.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500">Nenhum registro de tempo encontrado para este projeto.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
