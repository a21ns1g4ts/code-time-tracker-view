
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('time.entries.title')}</h1>
          <p className="text-gray-600 mb-8">{t('time.entries.subtitle')}</p>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-500">
              {t('no.activity')}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
