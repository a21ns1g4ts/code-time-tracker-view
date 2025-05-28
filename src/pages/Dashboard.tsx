
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import LoadingProjects from '@/components/LoadingProjects';
import ApiErrorDisplay from '@/components/ApiErrorDisplay';
import DailyHoursChart from '@/components/charts/DailyHoursChart';
import WeeklyTimeChart from '@/components/charts/WeeklyTimeChart';
import WeeklyProjectOverviewChart from '@/components/charts/WeeklyProjectOverviewChart';
import LatestTasksList from '@/components/charts/LatestTasksList';
import TeamActivityCard from '@/components/charts/TeamActivityCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import {
  fetchDailyTrackedHours,
  fetchLastSevenDays,
  fetchLatestTasks,
  fetchLatestTeamActivity,
  fetchWeeklyHistory,
  fetchTotalWeeklyBillableAmount,
  fetchWeeklyProjectOverview
} from '@/services/chartApi';

const Dashboard = () => {
  const { t } = useLanguage();

  const { data: dailyHours, isLoading: loadingDaily, error: errorDaily } = useQuery({
    queryKey: ['dailyTrackedHours'],
    queryFn: fetchDailyTrackedHours,
  });

  const { data: weeklyHistory, isLoading: loadingWeekly, error: errorWeekly } = useQuery({
    queryKey: ['weeklyHistory'],
    queryFn: fetchWeeklyHistory,
  });

  const { data: latestTasks, isLoading: loadingTasks, error: errorTasks } = useQuery({
    queryKey: ['latestTasks'],
    queryFn: fetchLatestTasks,
  });

  const { data: teamActivity, isLoading: loadingTeam, error: errorTeam } = useQuery({
    queryKey: ['latestTeamActivity'],
    queryFn: fetchLatestTeamActivity,
  });

  const { data: lastSevenDays, isLoading: loadingSevenDays } = useQuery({
    queryKey: ['lastSevenDays'],
    queryFn: fetchLastSevenDays,
  });

  const { data: billableAmount, isLoading: loadingBillable } = useQuery({
    queryKey: ['totalWeeklyBillableAmount'],
    queryFn: fetchTotalWeeklyBillableAmount,
  });

  const { data: projectOverview, isLoading: loadingOverview } = useQuery({
    queryKey: ['weeklyProjectOverview'],
    queryFn: fetchWeeklyProjectOverview,
  });

  const isLoading = loadingDaily || loadingWeekly || loadingTasks || loadingTeam;
  const hasError = errorDaily || errorWeekly || errorTasks || errorTeam;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <LoadingProjects />
        </div>
      </PageLayout>
    );
  }

  if (hasError) {
    return (
      <PageLayout>
        <ApiErrorDisplay onRetry={() => window.location.reload()} />
      </PageLayout>
    );
  }

  // Calculate summary stats from last seven days
  const totalHoursLastWeek = lastSevenDays?.reduce((sum, day) => sum + day.duration / 3600, 0) || 0;
  const totalAmountThisWeek = billableAmount?.value || 0;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('total.hours.week')}</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHoursLastWeek.toFixed(1)}h</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('revenue.week')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {billableAmount?.currency} {(totalAmountThisWeek / 100).toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('active.tasks')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestTasks?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('team.members')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamActivity?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('daily.hours.trend')}</CardTitle>
            </CardHeader>
            <CardContent>
              {dailyHours && <DailyHoursChart data={dailyHours} />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('weekly.time.overview')}</CardTitle>
            </CardHeader>
            <CardContent>
              {weeklyHistory && <WeeklyTimeChart data={weeklyHistory} />}
            </CardContent>
          </Card>
        </div>

        {/* Project Overview Chart */}
        {projectOverview && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('weekly.project.overview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyProjectOverviewChart data={projectOverview} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tasks and Team Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {latestTasks && <LatestTasksList data={latestTasks} />}
          {teamActivity && <TeamActivityCard data={teamActivity} />}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
