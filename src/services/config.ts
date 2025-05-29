
const CONFIG_KEYS = {
  BEARER_TOKEN: 'bearer_token',
  ORGANIZATION_ID: 'solidtime_organization_id'
} as const;

export const getConfig = async () => {
  // Get bearer token from localStorage
  const bearerToken = localStorage.getItem(CONFIG_KEYS.BEARER_TOKEN) || '';
  
  // Get organization ID from localStorage
  const organizationId = localStorage.getItem(CONFIG_KEYS.ORGANIZATION_ID) || '';
  
  return {
    bearerToken,
    organizationId
  };
};

export const setConfig = (bearerToken: string, organizationId: string) => {
  localStorage.setItem(CONFIG_KEYS.BEARER_TOKEN, bearerToken);
  localStorage.setItem(CONFIG_KEYS.ORGANIZATION_ID, organizationId);
};

export const clearConfig = () => {
  localStorage.removeItem(CONFIG_KEYS.BEARER_TOKEN);
  localStorage.removeItem(CONFIG_KEYS.ORGANIZATION_ID);
};

export const isConfigured = async (): Promise<boolean> => {
  const config = await getConfig();
  return !!(config.bearerToken && config.organizationId);
};
