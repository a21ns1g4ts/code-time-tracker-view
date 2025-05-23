
import { useState, useEffect } from 'react';
import { getProjectAccess, setProjectAccess } from '@/services/projectAccess';
import { Project } from '@/types/api';

export const useProjectAccess = (projects: Project[] | undefined) => {
  const [projectAccess, setProjectAccessState] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (projects) {
      // Check access status for all projects
      const checkAllProjectsAccess = async () => {
        const accessStatus: Record<string, boolean> = {};
        
        for (const project of projects) {
          accessStatus[project.id] = await getProjectAccess(project.id);
        }
        
        setProjectAccessState(accessStatus);
      };
      
      checkAllProjectsAccess();
    }
  }, [projects]);

  const handlePasswordSuccess = (projectId: string) => {
    setProjectAccess(projectId);
    setProjectAccessState(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  return { projectAccess, handlePasswordSuccess };
};

export default useProjectAccess;
