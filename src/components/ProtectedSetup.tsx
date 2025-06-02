
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConfigured } from '@/services/config';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Setup from '@/pages/Setup';

const ProtectedSetup = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [shouldShowSetup, setShouldShowSetup] = useState(false);

  useEffect(() => {
    const checkConfigAndRedirect = async () => {
      try {
        const configured = await isConfigured();
        if (configured) {
          // Se já está configurado, redireciona para projects
          navigate('/projects', { replace: true });
        } else {
          // Se não está configurado, pode mostrar o setup
          setShouldShowSetup(true);
        }
      } catch (error) {
        console.error('Error checking configuration:', error);
        setShouldShowSetup(true);
      } finally {
        setLoading(false);
      }
    };
    
    checkConfigAndRedirect();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>{t('loading')}</span>
        </div>
      </div>
    );
  }

  if (!shouldShowSetup) {
    return null;
  }

  return <Setup />;
};

export default ProtectedSetup;
