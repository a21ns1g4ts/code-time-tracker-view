
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Lock, Unlock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '@/utils/dataProcessor';
import { Project } from '@/types/api';

interface ProjectsListProps {
  projects: Project[];
  projectAccess: Record<string, boolean>;
  onRequestAccess: (project: Project) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, projectAccess, onRequestAccess }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          style={{ 
            borderLeftColor: project.color || '#3B82F6',
            borderLeftWidth: '4px'
          }}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
            {projectAccess[project.id] ? (
              <Unlock className="h-5 w-5 text-green-500" />
            ) : (
              <Lock className="h-5 w-5 text-amber-500" />
            )}
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {formatDuration(project.spent_time)}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {project.is_billable ? 'Faturável' : 'Não faturável'}
                </span>
              </div>
              {project.is_archived && (
                <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                  Arquivado
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            {projectAccess[project.id] ? (
              <Button 
                className="w-full" 
                onClick={() => navigate(`/project/${project.id}`)}
              >
                Ver detalhes
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={() => onRequestAccess(project)}
              >
                Acessar projeto
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsList;
