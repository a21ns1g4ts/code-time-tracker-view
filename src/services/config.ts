
const CONFIG_KEYS = {
  API_BASE_URL: 'api_base_url',
  BEARER_TOKEN: 'bearer_token',
  ORGANIZATION_ID: 'solidtime_organization_id'
} as const;

export const getConfig = async () => {
  // Get API base URL from localStorage
  const apiBaseUrl = localStorage.getItem(CONFIG_KEYS.API_BASE_URL) || '';
  
  // Get bearer token from localStorage
  const bearerToken = localStorage.getItem(CONFIG_KEYS.BEARER_TOKEN) || '';
  
  // Get organization ID from localStorage
  const organizationId = localStorage.getItem(CONFIG_KEYS.ORGANIZATION_ID) || '';
  
  return {
    apiBaseUrl,
    bearerToken,
    organizationId
  };
};

export const setConfig = (apiBaseUrl: string, bearerToken: string, organizationId: string) => {
  localStorage.setItem(CONFIG_KEYS.API_BASE_URL, apiBaseUrl);
  localStorage.setItem(CONFIG_KEYS.BEARER_TOKEN, bearerToken);
  localStorage.setItem(CONFIG_KEYS.ORGANIZATION_ID, organizationId);
};

export const clearConfig = () => {
  localStorage.removeItem(CONFIG_KEYS.API_BASE_URL);
  localStorage.removeItem(CONFIG_KEYS.BEARER_TOKEN);
  localStorage.removeItem(CONFIG_KEYS.ORGANIZATION_ID);
};

export const isConfigured = async (): Promise<boolean> => {
  const config = await getConfig();
  return !!(config.apiBaseUrl && config.bearerToken && config.organizationId);
};
