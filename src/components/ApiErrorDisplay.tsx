
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ApiErrorDisplayProps {
  onOpenConfig: () => void;
  onRetry: () => void;
}

const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({ onOpenConfig, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <CardTitle>Erro na API</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            Erro ao buscar dados da API. Verifique suas configurações.
          </p>
          <div className="space-x-2">
            <Button onClick={onOpenConfig} variant="outline">
              Configurações
            </Button>
            <Button onClick={onRetry}>
              Tentar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiErrorDisplay;
