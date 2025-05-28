
import { ApiResponse, ProjectsResponse } from '@/types/api';
import { getConfig } from './config';

const BASE_URL = 'https://solidtime.a2insights.com.br/api/v1';

// Organization API
export const fetchOrganization = async () => {
  const { bearerToken, organizationId } = await getConfig();
  
  if (!bearerToken || !organizationId) {
    throw new Error('Bearer token and organization ID are required');
  }

  const response = await fetch(
    `${BASE_URL}/organizations/${organizationId}`,
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

export const fetchTimeEntries = async (): Promise<ApiResponse> => {
  const { bearerToken, organizationId } = await getConfig();
  
  if (!bearerToken || !organizationId) {
    throw new Error('Bearer token and organization ID are required');
  }

  const response = await fetch(
    `${BASE_URL}/organizations/${organizationId}/time-entries`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch time entries: ${response.status}`);
  }

  return response.json();
};

export const fetchProjectTimeEntries = async (projectId: string): Promise<ApiResponse> => {
  const { bearerToken, organizationId } = await getConfig();
  
  if (!bearerToken || !organizationId) {
    throw new Error('Bearer token and organization ID are required');
  }

  const response = await fetch(
    `${BASE_URL}/organizations/${organizationId}/projects/${projectId}/time-entries`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch project time entries: ${response.status}`);
  }

  return response.json();
};

export const fetchProjects = async (): Promise<ProjectsResponse> => {
  const { bearerToken, organizationId } = await getConfig();
  
  if (!bearerToken || !organizationId) {
    throw new Error('Bearer token and organization ID are required');
  }

  const response = await fetch(
    `${BASE_URL}/organizations/${organizationId}/projects`,
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
