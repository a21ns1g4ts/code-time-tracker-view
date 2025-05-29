
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConfigured } from '@/services/config';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkConfigAndRedirect = async () => {
      const configured = await isConfigured();
      if (configured) {
        navigate('/projects');
      } else {
        navigate('/');
      }
    };
    
    checkConfigAndRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Carregando...</span>
      </div>
    </div>
  );
};

export default Index;
