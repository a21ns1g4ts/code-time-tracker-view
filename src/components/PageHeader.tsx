
import React from 'react';

const PageHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">A2Insights Tracker</h1>
        <p className="text-gray-600">Acompanhe seus projetos</p>
      </div>
    </div>
  );
};

export default PageHeader;
