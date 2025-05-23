
import { supabase } from "@/integrations/supabase/client";

export const saveProjectPassword = async (projectId: string, password: string) => {
  const { data, error } = await supabase
    .from('project_access')
    .upsert({ project_id: projectId, password }, { onConflict: 'project_id' });
  
  if (error) {
    throw new Error(`Failed to save project password: ${error.message}`);
  }
  
  return data;
};

export const verifyProjectPassword = async (projectId: string, password: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('project_access')
    .select('password')
    .eq('project_id', projectId)
    .single();
  
  if (error) {
    return false;
  }
  
  return data?.password === password;
};

export const getProjectAccess = async (projectId: string): Promise<boolean> => {
  // Check if the project has any saved access data
  const { data, error } = await supabase
    .from('project_access')
    .select('*')
    .eq('project_id', projectId);
  
  if (error || !data || data.length === 0) {
    return false;
  }
  
  // Check if the project has been accessed before (stored in local storage)
  const accessedProjects = JSON.parse(localStorage.getItem('accessed_projects') || '{}');
  return !!accessedProjects[projectId];
};

export const setProjectAccess = (projectId: string) => {
  const accessedProjects = JSON.parse(localStorage.getItem('accessed_projects') || '{}');
  accessedProjects[projectId] = true;
  localStorage.setItem('accessed_projects', JSON.stringify(accessedProjects));
};
