
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConfigured } from '@/services/config';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkConfigAndRedirect = async () => {
      try {
        const configured = await isConfigured();
        if (configured) {
          navigate('/projects', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error checking configuration:', error);
        navigate('/', { replace: true });
      }
    };
    
    checkConfigAndRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>{t('loading')}</span>
      </div>
    </div>
  );
};

export default Index;
