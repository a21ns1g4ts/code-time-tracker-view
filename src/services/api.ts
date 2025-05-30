
import { ApiResponse, ProjectsResponse } from '@/types/api';
import { getConfig } from './config';

// Organization API
export const fetchOrganization = async () => {
  const { apiBaseUrl, bearerToken, organizationId } = await getConfig();
  
  if (!apiBaseUrl || !bearerToken || !organizationId) {
    throw new Error('API base URL, bearer token and organization ID are required');
  }

  const response = await fetch(
    `${apiBaseUrl}/organizations/${organizationId}`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch organization: ${response.status}`);
  }

  return response.json();
};

export interface TimeEntriesFilters {
  member_id?: string;
  start?: string;
  end?: string;
  active?: 'true' | 'false';
  billable?: 'true' | 'false';
  limit?: number;
  offset?: number;
  only_full_dates?: 'true' | 'false';
  user_id?: string;
  member_ids?: string[];
  client_ids?: string[];
  project_ids?: string[];
  tag_ids?: string[];
  task_ids?: string[];
}

export const fetchTimeEntries = async (filters?: TimeEntriesFilters): Promise<ApiResponse> => {
  const { apiBaseUrl, bearerToken, organizationId } = await getConfig();
  
  if (!apiBaseUrl || !bearerToken || !organizationId) {
    throw new Error('API base URL, bearer token and organization ID are required');
  }

  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(`${key}[]`, item));
        } else {
          params.append(key, value.toString());
        }
      }
    });
  }

  const queryString = params.toString();
  const url = `${apiBaseUrl}/organizations/${organizationId}/time-entries${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch time entries: ${response.status}`);
  }

  return response.json();
};

export const fetchProjectTimeEntries = async (projectId: string, filters?: TimeEntriesFilters): Promise<ApiResponse> => {
  // Use the correct endpoint with project_ids filter instead of the non-existent project-specific endpoint
  const projectFilters: TimeEntriesFilters = {
    ...filters,
    project_ids: [projectId]
  };
  
  return fetchTimeEntries(projectFilters);
};

export const fetchProjects = async (): Promise<ProjectsResponse> => {
  const { apiBaseUrl, bearerToken, organizationId } = await getConfig();
  
  if (!apiBaseUrl || !bearerToken || !organizationId) {
    throw new Error('API base URL, bearer token and organization ID are required');
  }

  const response = await fetch(
    `${apiBaseUrl}/organizations/${organizationId}/projects`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  return response.json();
};
