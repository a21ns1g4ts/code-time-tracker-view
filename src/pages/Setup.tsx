
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertCircle, ExternalLink, Github } from 'lucide-react';
import { setConfig } from '@/services/config';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useLanguage } from '@/contexts/LanguageContext';

const Setup = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [apiBaseUrl, setApiBaseUrl] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!apiBaseUrl.trim() || !bearerToken.trim() || !organizationId.trim()) {
      setError(t('setup.error.fields'));
      return;
    }

    setIsLoading(true);
    
    try {
      setConfig(apiBaseUrl.trim(), bearerToken.trim(), organizationId.trim());
      navigate('/projects');
    } catch (err) {
      setError(t('setup.error.save'));
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-2xl">{t('setup.title')}</CardTitle>
            <CardDescription>
              {t('setup.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiBaseUrl">{t('setup.api.url.label')}</Label>
                <Input
                  id="apiBaseUrl"
                  type="url"
                  placeholder={t('setup.api.url.placeholder')}
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bearerToken">{t('setup.token.label')}</Label>
                <Input
                  id="bearerToken"
                  type="password"
                  placeholder={t('setup.token.placeholder')}
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationId">{t('setup.organization.label')}</Label>
                <Input
                  id="organizationId"
                  type="text"
                  placeholder={t('setup.organization.placeholder')}
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('setup.saving') : t('setup.save')}
              </Button>
            </form>

            {/* Help Section */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-foreground mb-3">
                {t('welcome.about.solidtime')}
              </h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://docs.solidtime.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t('footer.docs')}
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://solidtime.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                    solidtime.io
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
