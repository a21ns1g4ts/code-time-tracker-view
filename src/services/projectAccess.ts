
import { supabase } from "@/integrations/supabase/client";

export const saveProjectPassword = async (projectId: string, password: string) => {
  const { data, error } = await supabase
    .from('project_access')
    .upsert({ 
      project_id: projectId, 
      password: password 
    }, { 
      onConflict: 'project_id' 
    })
    .select();
  
  if (error) {
    console.error('Error saving project password:', error);
    throw new Error(`Failed to save project password: ${error.message}`);
  }
  
  console.log('Project password saved successfully:', data);
  return data;
};

export const verifyProjectPassword = async (projectId: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('project_access')
      .select('password')
      .eq('project_id', projectId)
      .single();
    
    if (error) {
      console.error('Error verifying project password:', error);
      return false;
    }
    
    if (!data) {
      console.log('No password found for project:', projectId);
      return false;
    }
    
    const isValid = data.password === password;
    console.log('Password verification result:', { projectId, isValid });
    return isValid;
  } catch (error) {
    console.error('Exception in verifyProjectPassword:', error);
    return false;
  }
};

export const getProjectAccess = async (projectId: string): Promise<boolean> => {
  try {
    // Check if the project has any saved access data
    const { data, error } = await supabase
      .from('project_access')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) {
      console.error('Error checking project access:', error);
      return false;
    }
    
    if (!data || data.length === 0) {
      console.log('No access data found for project:', projectId);
      return false;
    }
    
    // Check if the project has been accessed before (stored in local storage)
    const accessedProjects = JSON.parse(localStorage.getItem('accessed_projects') || '{}');
    const hasAccess = !!accessedProjects[projectId];
    console.log('Project access check:', { projectId, hasAccess });
    return hasAccess;
  } catch (error) {
    console.error('Exception in getProjectAccess:', error);
    return false;
  }
};

export const setProjectAccess = (projectId: string) => {
  try {
    const accessedProjects = JSON.parse(localStorage.getItem('accessed_projects') || '{}');
    accessedProjects[projectId] = true;
    localStorage.setItem('accessed_projects', JSON.stringify(accessedProjects));
    console.log('Project access granted:', projectId);
  } catch (error) {
    console.error('Error setting project access:', error);
  }
};
