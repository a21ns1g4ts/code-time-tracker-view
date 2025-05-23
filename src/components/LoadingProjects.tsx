
import React from 'react';

const LoadingProjects: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Carregando projetos...</p>
    </div>
  );
};

export default LoadingProjects;
