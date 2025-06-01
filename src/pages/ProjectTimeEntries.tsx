
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjectTimeEntries } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingProjects from '@/components/LoadingProjects';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import ActivityGrid from '@/components/ActivityGrid';
import TimelineView from '@/components/TimelineView';
import { processTimeEntries } from '@/utils/dataProcessor';
import PageLayout from '@/components/PageLayout';

const ProjectTimeEntries = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [timelineData, setTimelineData] = useState<any[]>([]);

  const { data: entriesResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['projectTimeEntries', projectId],
    queryFn: () => fetchProjectTimeEntries(projectId!),
    enabled: !!projectId,
  });

  const processedData = entriesResponse ? processTimeEntries(entriesResponse.data) : null;
  
  const dayData = processedData?.dayData || {};
  const summary = processedData?.summary || { totalHours: 0, daysWithRecords: 0, totalRecords: 0 };

  useEffect(() => {
    if (processedData?.timelineData) {
      setTimelineData(processedData.timelineData);
    }
  }, [processedData]);

  const handleDayClick = (day: any) => {
    // Handle day click if needed
    console.log('Day clicked:', day);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <LoadingProjects />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <ApiErrorDisplay onRetry={() => refetch()} />
      </PageLayout>
    );
  }

  if (!processedData) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500">{t('no.activity')}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => navigate(`/project/${projectId}`)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('time.entries.back')}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('time.entries.title')}</h1>
          <p className="text-gray-600">{t('time.entries.subtitle')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t('total.hours')}</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalHours.toFixed(1)}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">{t('days.with.records')}</p>
                <p className="text-2xl font-bold text-gray-900">{summary.daysWithRecords}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">#</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{t('total.records')}</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalRecords}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('activity.development')}</h3>
          <ActivityGrid data={dayData} projectId={projectId!} onDayClick={handleDayClick} showModal={true} />
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">{t('activity.timeline')}</h3>
          <TimelineView data={timelineData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectTimeEntries;
