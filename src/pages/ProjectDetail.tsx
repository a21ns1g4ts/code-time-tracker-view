
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjectTimeEntries } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingProjects from '@/components/LoadingProjects';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import { processTimeEntries } from '@/utils/dataProcessor';
import { format } from 'date-fns';
import { useSelectedDay } from '@/hooks/useSelectedDay';
import DayDetailsModal from '@/components/DayDetailsModal';
import PageLayout from '@/components/PageLayout';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { selectedDay, clearSelectedDay } = useSelectedDay();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

  const { data: entriesResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['projectTimeEntries', projectId],
    queryFn: () => fetchProjectTimeEntries(projectId!),
    enabled: !!projectId,
  });

  const processedData = entriesResponse ? processTimeEntries(entriesResponse.data) : null;

  // Check if there's a selected day to open modal
  useEffect(() => {
    if (selectedDay && processedData?.dayData[selectedDay]) {
      setSelectedDayData(processedData.dayData[selectedDay]);
      setModalOpen(true);
      clearSelectedDay(); // Clear after using
    }
  }, [selectedDay, processedData, clearSelectedDay]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDayData(null);
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
          <p className="text-center text-gray-500">{t('no.records')}</p>
        </div>
      </PageLayout>
    );
  }

  const { summary, recentEntries } = processedData;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => navigate('/projects')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('project.detail.back')}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('project.detail.title')}</h1>
          <p className="text-gray-600">{t('project.detail.subtitle')}</p>
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

        {/* View Complete Time Entries Button */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(`/project/${projectId}/time-entries`)}
            className="w-full md:w-auto"
          >
            {t('project.detail.view_entries')}
          </Button>
        </div>

        {/* Recent Time Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{t('time.records')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('start')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('end')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('duration')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('description')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentEntries.slice(0, 10).map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(entry.start), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(entry.start), 'HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.end ? format(new Date(entry.end), 'HH:mm') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.hours.toFixed(1)}h
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {entry.description || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {recentEntries.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              {t('no.records')}
            </div>
          )}
        </div>

        {/* Day Details Modal */}
        <DayDetailsModal 
          open={modalOpen}
          onClose={handleCloseModal}
          dayData={selectedDayData}
        />
      </div>
    </PageLayout>
  );
};

export default ProjectDetail;
