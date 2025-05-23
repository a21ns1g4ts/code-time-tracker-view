
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface ConfigurationNeededProps {
  onOpenConfig: () => void;
}

const ConfigurationNeeded: React.FC<ConfigurationNeededProps> = ({ onOpenConfig }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <CardTitle>Configuração Necessária</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Configure seu Bearer Token e Organization ID para começar a acompanhar seus projetos.
          </p>
          <Button onClick={onOpenConfig}>
            Configurar API
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationNeeded;
