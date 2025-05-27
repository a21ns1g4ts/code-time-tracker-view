import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchTimeEntries, fetchProjects } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { groupEntriesByDay, generateWeeksData, formatDuration } from '@/utils/dataProcessor';
import { getProjectAccess } from '@/services/projectAccess';
import { DayData } from '@/types/api';
import ActivityGrid from '@/components/ActivityGrid';
import Timeline from '@/components/Timeline';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectTimeEntries = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
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

  // Filter entries by project ID and process data
  const projectEntries = timeEntriesResponse?.data.filter(
    entry => entry.project_id === projectId
  ) || [];

  const dayData = groupEntriesByDay(projectEntries);
  const weeksData = generateWeeksData(dayData);
  const totalHours = dayData.reduce((sum, day) => sum + day.totalDuration, 0);

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
      setProjectName(project?.name || t('project.unknown'));
    }
  }, [projectsResponse, projectId, t]);

  // Scroll to anchor if present in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, dayData]);

  const handleDayClick = (day: DayData) => {
    console.log('Day clicked:', day);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('access.checking')}</p>
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
            <CardTitle>{t('api.error')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              {t('api.error.entries')}
            </p>
            <Button onClick={() => navigate(`/project/${projectId}`)}>
              {t('time.entries.back')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {t('time.entries.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('time.entries.title')} - {projectName}</h1>
            <p className="text-gray-600">{t('time.entries.subtitle')}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('project.summary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{t('total.hours')}</p>
                    <p className="text-xl font-semibold">{formatDuration(totalHours)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('days.with.records')}</p>
                    <p className="text-xl font-semibold">{dayData.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('total.records')}</p>
                    <p className="text-xl font-semibold">{projectEntries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('activity.time')}</h2>
              <Card>
                <CardContent className="p-6">
                  <ActivityGrid weeksData={weeksData} onDayClick={handleDayClick} projectId={projectId} />
                </CardContent>
              </Card>
            </div>

            {/* Timeline for days with activities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('activity.timeline')}</h2>
              <div className="space-y-4">
                {dayData.filter(day => day.totalDuration > 0).map((day) => (
                  <div key={day.date} id={`day-${day.date}`}>
                    <Timeline dayData={day} />
                  </div>
                ))}
                {dayData.filter(day => day.totalDuration > 0).length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-gray-500">{t('no.activity')}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeEntries;
