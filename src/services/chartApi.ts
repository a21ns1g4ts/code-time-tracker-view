
import { getConfig } from './config';

const BASE_URL = 'https://solidtime.a2insights.com.br/api/v1';

export interface ChartResponse<T = any> {
  data: T;
  meta?: any;
}

// Updated interfaces based on OpenAPI spec
export interface DailyTrackedHours {
  date: string;
  duration: number;
}

export interface LastSevenDaysData {
  date: string;
  duration: number;
  history: number[];
}

export interface LatestTask {
  task_id: string;
  name: string;
  description: string | null;
  status: boolean;
  time_entry_id: string | null;
}

export interface TeamActivity {
  member_id: string;
  name: string;
  description: string | null;
  time_entry_id: string;
  task_id: string | null;
  status: boolean;
}

export interface WeeklyBillableAmount {
  value: number;
  currency: string;
}

export interface WeeklyProjectOverview {
  value: number;
  name: string;
  color: string;
}

export interface WeeklyHistory {
  date: string;
  duration: number;
}

const makeRequest = async <T>(endpoint: string): Promise<T> => {
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

export const fetchDailyTrackedHours = async (): Promise<DailyTrackedHours[]> => {
  return makeRequest<DailyTrackedHours[]>('/charts/daily-tracked-hours');
};

export const fetchLastSevenDays = async (): Promise<LastSevenDaysData[]> => {
  return makeRequest<LastSevenDaysData[]>('/charts/last-seven-days');
};

export const fetchLatestTasks = async (): Promise<LatestTask[]> => {
  return makeRequest<LatestTask[]>('/charts/latest-tasks');
};

export const fetchLatestTeamActivity = async (): Promise<TeamActivity[]> => {
  return makeRequest<TeamActivity[]>('/charts/latest-team-activity');
};

export const fetchTotalWeeklyBillableAmount = async (): Promise<WeeklyBillableAmount> => {
  return makeRequest<WeeklyBillableAmount>('/charts/total-weekly-billable-amount');
};

export const fetchTotalWeeklyBillableTime = async (): Promise<number> => {
  return makeRequest<number>('/charts/total-weekly-billable-time');
};

export const fetchTotalWeeklyTime = async (): Promise<number> => {
  return makeRequest<number>('/charts/total-weekly-time');
};

export const fetchWeeklyHistory = async (): Promise<WeeklyHistory[]> => {
  return makeRequest<WeeklyHistory[]>('/charts/weekly-history');
};

export const fetchWeeklyProjectOverview = async (): Promise<WeeklyProjectOverview[]> => {
  return makeRequest<WeeklyProjectOverview[]>('/charts/weekly-project-overview');
};
