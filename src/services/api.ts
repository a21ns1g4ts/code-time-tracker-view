
import { ApiResponse } from '@/types/api';
import { getConfig } from './config';

const BASE_URL = 'https://solidtime.a2insights.com.br/api/v1';

export const fetchTimeEntries = async (): Promise<ApiResponse> => {
  const { bearerToken, organizationId } = getConfig();
  
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
