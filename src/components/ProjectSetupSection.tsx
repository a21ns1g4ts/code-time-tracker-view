
import React from 'react';
import ProjectPasswordSetter from '@/components/ProjectPasswordSetter';
import { Project } from '@/types/api';

interface ProjectSetupSectionProps {
  projects: Project[];
}

const ProjectSetupSection: React.FC<ProjectSetupSectionProps> = ({ projects }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Configurar Senhas dos Projetos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectPasswordSetter 
            key={`setter-${project.id}`}
            projectId={project.id} 
            projectName={project.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSetupSection;
