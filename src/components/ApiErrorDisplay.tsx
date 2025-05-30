
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ApiErrorDisplayProps {
  onRetry: () => void;
}

const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({ onRetry }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <CardTitle>{t('error')}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            {t('api.error.message')}
          </p>
          <Button onClick={onRetry}>
            {t('retry')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiErrorDisplay;
