
import { supabase } from "@/integrations/supabase/client";

const CONFIG_KEYS = {
  BEARER_TOKEN: 'bearer_token',
  ORGANIZATION_ID: 'solidtime_organization_id'
} as const;

export const getConfig = async () => {
  // Try to get from Supabase first
  const { data: bearerTokenRow } = await supabase
    .from('app_config')
    .select('*')
    .eq('key', CONFIG_KEYS.BEARER_TOKEN)
    .single();
  
  // Fallback to localStorage for backward compatibility
  const bearerToken = bearerTokenRow?.value || localStorage.getItem('solidtime_bearer_token') || '';
  const organizationId = localStorage.getItem(CONFIG_KEYS.ORGANIZATION_ID) || '';
  
  return {
    bearerToken,
    organizationId
  };
};

export const saveConfig = async (bearerToken: string, organizationId: string) => {
  // Update in Supabase
  await supabase
    .from('app_config')
    .update({ value: bearerToken })
    .eq('key', CONFIG_KEYS.BEARER_TOKEN);
  
  // Also save in localStorage for backward compatibility
  localStorage.setItem('solidtime_bearer_token', bearerToken);
  localStorage.setItem(CONFIG_KEYS.ORGANIZATION_ID, organizationId);
};

export const isConfigured = async (): Promise<boolean> => {
  const config = await getConfig();
  return !!(config.bearerToken && config.organizationId);
};
