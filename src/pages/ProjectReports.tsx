
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, FileText, Share, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingProjects from '@/components/LoadingProjects';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import PageLayout from '@/components/PageLayout';
import { format } from 'date-fns';

const ProjectReports = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: reportsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });

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

  const reports = reportsResponse?.data || [];

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
          {t('project.detail.back')}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('reports.title')}</h1>
          <p className="text-gray-600">{t('reports.subtitle')}</p>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t('no.reports')}</p>
            <p className="text-gray-400 text-sm mt-2">{t('no.reports.description')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg truncate">{report.name}</CardTitle>
                    </div>
                    {report.is_public && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {t('public')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {report.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {report.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{t('created')}: {format(new Date(report.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                    
                    {report.public_until && (
                      <div className="flex items-center gap-2">
                        <Share className="h-4 w-4" />
                        <span>{t('public.until')}: {format(new Date(report.public_until), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('view.report')}
                    </Button>
                    
                    {report.shareable_link && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(report.shareable_link!, '_blank')}
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProjectReports;
