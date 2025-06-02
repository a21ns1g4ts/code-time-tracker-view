
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConfigured } from '@/services/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, BarChart3, Shield, Zap, Eye, Link, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageDropdown from '@/components/LanguageDropdown';
import { ModeToggle } from '@/components/ModeToggle';
import Footer from '@/components/Footer';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkConfig = async () => {
      const configured = await isConfigured();
      if (configured) {
        navigate('/projects');
      }
    };
    checkConfig();
  }, [navigate]);

  const features = [
    {
      icon: Eye,
      title: t('feature.transparency.title'),
      description: t('feature.transparency.description')
    },
    {
      icon: Clock,
      title: t('feature.timetracking.title'),
      description: t('feature.timetracking.description')
    },
    {
      icon: BarChart3,
      title: t('feature.analytics.title'),
      description: t('feature.analytics.description')
    },
    {
      icon: Users,
      title: t('feature.clients.title'),
      description: t('feature.clients.description')
    },
    {
      icon: Shield,
      title: t('feature.security.title'),
      description: t('feature.security.description')
    },
    {
      icon: Zap,
      title: t('feature.realtime.title'),
      description: t('feature.realtime.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TimeTracker</span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageDropdown />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('welcome.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {t('welcome.hero.subtitle')}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <p className="text-blue-800 dark:text-blue-200 text-lg">
              {t('welcome.hero.description')}
            </p>
          </div>
          
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/setup')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-lg">{t('setup.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('setup.subtitle')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/config-generator')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Link className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-lg">{t('config.link.generator.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('config.link.generator.subtitle')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-lg">{t('get.started')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate('/setup')}
                  className="w-full"
                >
                  {t('get.started')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('welcome.features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('welcome.about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {t('welcome.about.description')}
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-700 dark:text-gray-300">
              {t('welcome.about.solidtime')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;
