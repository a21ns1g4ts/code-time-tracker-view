
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

export interface Project {
  id: string;
  name: string;
  color: string;
  client_id: string | null;
  is_archived: boolean;
  billable_rate: number | null;
  is_billable: boolean;
  estimated_time: number | null;
  spent_time: number;
  is_public: boolean;
}

export interface ProjectsResponse {
  data: Project[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string | null;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface AppConfig {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectAccess {
  id: string;
  project_id: string;
  password: string;
  created_at: string;
  updated_at: string;
}
