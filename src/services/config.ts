
const CONFIG_KEYS = {
  BEARER_TOKEN: 'solidtime_bearer_token',
  ORGANIZATION_ID: 'solidtime_organization_id'
} as const;

export const getConfig = () => {
  return {
    bearerToken: localStorage.getItem(CONFIG_KEYS.BEARER_TOKEN) || '',
    organizationId: localStorage.getItem(CONFIG_KEYS.ORGANIZATION_ID) || ''
  };
};

export const saveConfig = (bearerToken: string, organizationId: string) => {
  localStorage.setItem(CONFIG_KEYS.BEARER_TOKEN, bearerToken);
  localStorage.setItem(CONFIG_KEYS.ORGANIZATION_ID, organizationId);
};

export const isConfigured = () => {
  const config = getConfig();
  return config.bearerToken && config.organizationId;
};
