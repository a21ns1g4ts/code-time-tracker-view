
import { getConfig } from './config';

const BASE_URL = 'https://solidtime.a2insights.com.br/api/v1';

export interface ChartResponse<T = any> {
  data: T;
  meta?: any;
}

export interface DailyTrackedHours {
  date: string;
  hours: number;
  billable_hours: number;
}

export interface LastSevenDaysData {
  date: string;
  total_time: number;
  billable_time: number;
}

export interface LatestTask {
  id: string;
  name: string;
  project_name: string;
  time_spent: number;
  last_worked: string;
}

export interface TeamActivity {
  user_name: string;
  total_time: number;
  projects_count: number;
  last_activity: string;
}

export interface WeeklyBillableAmount {
  week: string;
  amount: number;
  hours: number;
}

export interface WeeklyTime {
  week: string;
  total_time: number;
  billable_time: number;
}

export interface WeeklyHistory {
  week: string;
  total_hours: number;
  projects: Array<{
    name: string;
    hours: number;
    color: string;
  }>;
}

const makeRequest = async <T>(endpoint: string): Promise<ChartResponse<T>> => {
  const { bearerToken, organizationId } = await getConfig();
  
  if (!bearerToken || !organizationId) {
    throw new Error('Bearer token and organization ID are required');
  }

  const response = await fetch(`${BASE_URL}/organizations/${organizationId}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
};

export const fetchDailyTrackedHours = async (): Promise<ChartResponse<DailyTrackedHours[]>> => {
  return makeRequest<DailyTrackedHours[]>('/charts/daily-tracked-hours');
};

export const fetchLastSevenDays = async (): Promise<ChartResponse<LastSevenDaysData[]>> => {
  return makeRequest<LastSevenDaysData[]>('/charts/last-seven-days');
};

export const fetchLatestTasks = async (): Promise<ChartResponse<LatestTask[]>> => {
  return makeRequest<LatestTask[]>('/charts/latest-tasks');
};

export const fetchLatestTeamActivity = async (): Promise<ChartResponse<TeamActivity[]>> => {
  return makeRequest<TeamActivity[]>('/charts/latest-team-activity');
};

export const fetchTotalWeeklyBillableAmount = async (): Promise<ChartResponse<WeeklyBillableAmount[]>> => {
  return makeRequest<WeeklyBillableAmount[]>('/charts/total-weekly-billable-amount');
};

export const fetchTotalWeeklyBillableTime = async (): Promise<ChartResponse<WeeklyTime[]>> => {
  return makeRequest<WeeklyTime[]>('/charts/total-weekly-billable-time');
};

export const fetchTotalWeeklyTime = async (): Promise<ChartResponse<WeeklyTime[]>> => {
  return makeRequest<WeeklyTime[]>('/charts/total-weekly-time');
};

export const fetchWeeklyHistory = async (): Promise<ChartResponse<WeeklyHistory[]>> => {
  return makeRequest<WeeklyHistory[]>('/charts/weekly-history');
};
