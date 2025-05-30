
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, AlertCircle, Loader2, Github } from 'lucide-react';
import { setConfig } from '@/services/config';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const ConfigFromUrl = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const configureFromUrl = async () => {
      try {
        const apiBaseUrl = searchParams.get('api_base_url') || searchParams.get('api_url');
        const token = searchParams.get('token');
        const organizationId = searchParams.get('organization_id');

        if (!apiBaseUrl || !token || !organizationId) {
          setStatus('error');
          setMessage(t('config.auto.error.params'));
          return;
        }

        setConfig(apiBaseUrl, token, organizationId);
        setStatus('success');
        setMessage(t('config.auto.success'));
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/projects');
        }, 2000);
        
      } catch (error) {
        setStatus('error');
        setMessage(t('config.auto.error.process'));
      }
    };

    configureFromUrl();
  }, [searchParams, navigate, t]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-3">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">{t('app.title')}</h1>
            <p className="text-xs text-muted-foreground">{t('app.addon.description')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://github.com/solidtime-io/solidtime" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {t('app.github')}
            </a>
          </Button>
          <ModeToggle />
          <LanguageDropdown />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('config.auto.title')}</CardTitle>
            <CardDescription>
              {t('config.auto.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">{t('config.auto.configuring')}</p>
              </div>
            )}
            
            {status === 'success' && (
              <Alert className="bg-green-500/10 border-green-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  {message}
                </AlertDescription>
              </Alert>
            )}
            
            {status === 'error' && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  {message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigFromUrl;
