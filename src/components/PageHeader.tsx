
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface PageHeaderProps {
  onOpenConfig: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onOpenConfig }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">A2Insights Tracker</h1>
        <p className="text-gray-600">Acompanhe seus projetos</p>
      </div>
      <Button onClick={onOpenConfig} variant="outline">
        <Settings className="w-4 h-4 mr-2" />
        Configurações
      </Button>
    </div>
  );
};

export default PageHeader;
