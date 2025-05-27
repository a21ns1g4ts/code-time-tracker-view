
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-4">{t('error')}</h2>
          <p className="text-gray-600 mb-8">
            Página não encontrada
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('back')}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
