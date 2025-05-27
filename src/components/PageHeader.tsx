
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const PageHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('app.title')}</h1>
        <p className="text-gray-600">{t('app.subtitle')}</p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSelector />
        <LanguageSelector />
      </div>
    </div>
  );
};

export default PageHeader;
