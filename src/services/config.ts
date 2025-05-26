
import { supabase } from "@/integrations/supabase/client";

const CONFIG_KEYS = {
  BEARER_TOKEN: 'bearer_token',
  ORGANIZATION_ID: 'solidtime_organization_id'
} as const;

export const getConfig = async () => {
  // Get bearer token from Supabase
  const { data: bearerTokenRow } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', CONFIG_KEYS.BEARER_TOKEN)
    .single();
  
  // Get organization ID from Supabase
  const { data: organizationIdRow } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', CONFIG_KEYS.ORGANIZATION_ID)
    .single();
  
  return {
    bearerToken: bearerTokenRow?.value || '',
    organizationId: organizationIdRow?.value || ''
  };
};

export const isConfigured = async (): Promise<boolean> => {
  const config = await getConfig();
  return !!(config.bearerToken && config.organizationId);
};
