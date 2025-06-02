
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { setConfig } from '@/services/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';
import TopNavigation from '@/components/TopNavigation';
import { isConfigured } from '@/services/config';

const ConfigFromUrl = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [configured, setConfigured] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);

  // Check if app is configured on mount
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const isConfigSet = await isConfigured();
        setConfigured(isConfigSet);
      } catch (error) {
        console.error('Error checking configuration:', error);
        setConfigured(false);
      } finally {
        setConfigLoading(false);
      }
    };
    
    checkConfig();
  }, []);

  useEffect(() => {
    const apiBaseUrl = searchParams.get('apiBaseUrl');
    const bearerToken = searchParams.get('bearerToken');
    const organizationId = searchParams.get('organizationId');

    if (!apiBaseUrl || !bearerToken || !organizationId) {
      setStatus('error');
      setError(t('config.url.error.missing'));
      return;
    }

    try {
      setConfig(apiBaseUrl, bearerToken, organizationId);
      setStatus('success');
      
      // Redirect after successful configuration
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setError(t('config.url.error.invalid'));
    }
  }, [searchParams, navigate, t]);

  if (configLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>{t('loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {configured ? (
        <TopNavigation />
      ) : (
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('app.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('app.addon.description')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <LanguageDropdown />
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {status === 'success' && <CheckCircle className="h-8 w-8 text-green-600" />}
              {status === 'error' && <AlertCircle className="h-8 w-8 text-red-600" />}
              {status === 'loading' && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>}
            </div>
            <CardTitle className="text-2xl">
              {status === 'loading' && t('config.url.processing')}
              {status === 'success' && t('config.url.success')}
              {status === 'error' && t('config.url.error')}
            </CardTitle>
            <CardDescription>
              {status === 'loading' && t('config.url.processing.subtitle')}
              {status === 'success' && t('config.url.success.subtitle')}
              {status === 'error' && t('config.url.error.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('config.url.redirect')}
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={() => navigate('/')} className="w-full">
                  {t('config.url.back')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigFromUrl;
