
export interface TimeEntry {
  id: string;
  start: string;
  end: string;
  duration: number;
  description: string;
  task_id: string | null;
  project_id: string;
  organization_id: string;
  user_id: string;
  tags: string[];
  billable: boolean;
}

export interface ApiResponse {
  data: TimeEntry[];
  meta: {
    total: number;
  };
}

export interface DayData {
  date: string;
  totalDuration: number;
  entries: TimeEntry[];
  intensity: number; // 0-4 for GitHub-like colors
}

export interface WeekData {
  days: (DayData | null)[];
}
