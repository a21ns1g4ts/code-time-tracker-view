
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LoadingProjects: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">{t('loading')}</p>
    </div>
  );
};

export default LoadingProjects;
