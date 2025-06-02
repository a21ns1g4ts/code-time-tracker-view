
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Copy, CheckCircle, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { isConfigured } from '@/services/config';
import TopNavigation from '@/components/TopNavigation';

const ConfigLinkGenerator = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [apiBaseUrl, setApiBaseUrl] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };
    
    checkConfig();
  }, []);

  const generateLink = () => {
    if (!apiBaseUrl.trim() || !bearerToken.trim() || !organizationId.trim()) {
      toast({
        title: t('error'),
        description: t('setup.error.fields'),
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams({
      apiBaseUrl: apiBaseUrl.trim(),
      bearerToken: bearerToken.trim(),
      organizationId: organizationId.trim(),
    });

    const link = `${window.location.origin}/config?${params.toString()}`;
    setGeneratedLink(link);
    
    toast({
      title: t('success'),
      description: t('config.link.generated'),
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: t('success'),
      description: t('config.link.copied'),
    });
  };

  if (loading) {
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
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('config.generator.title')}</CardTitle>
            <CardDescription>
              {t('config.generator.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiBaseUrl">{t('setup.api.url.label')}</Label>
                <Input
                  id="apiBaseUrl"
                  type="url"
                  placeholder={t('setup.api.url.placeholder')}
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
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
                />
              </div>

              <Button onClick={generateLink} className="w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                {t('config.generator.generate')}
              </Button>

              {generatedLink && (
                <div className="space-y-2">
                  <Label>{t('config.generator.link')}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      {t('config.generator.success')}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('config.generator.warning')}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigLinkGenerator;
