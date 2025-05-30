
// Simplified project access using only organization configuration
export const saveProjectPassword = async (projectId: string, password: string) => {
  console.log('Saving password for project locally:', { projectId });
  
  try {
    const savedPasswords = JSON.parse(localStorage.getItem('project_passwords') || '{}');
    savedPasswords[projectId] = password;
    localStorage.setItem('project_passwords', JSON.stringify(savedPasswords));
    console.log('Project password saved successfully to localStorage');
  } catch (error) {
    console.error('Error saving project password:', error);
    throw new Error('Failed to save project password');
  }
};

export const verifyProjectPassword = async (projectId: string, password: string): Promise<boolean> => {
  try {
    console.log('Verifying password for project:', { projectId });
    
    const savedPasswords = JSON.parse(localStorage.getItem('project_passwords') || '{}');
    const savedPassword = savedPasswords[projectId];
    
    if (!savedPassword) {
      console.log('No password found for project:', projectId);
      return false;
    }
    
    const isValid = savedPassword === password;
    console.log('Password verification result:', { projectId, isValid });
    return isValid;
  } catch (error) {
    console.error('Exception in verifyProjectPassword:', error);
    return false;
  }
};

export const getProjectAccess = async (projectId: string): Promise<boolean> => {
  try {
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
