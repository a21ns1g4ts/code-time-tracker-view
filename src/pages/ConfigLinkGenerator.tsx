
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Copy, CheckCircle, Github, Link } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const ConfigLinkGenerator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [apiBaseUrl, setApiBaseUrl] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!apiBaseUrl.trim() || !bearerToken.trim() || !organizationId.trim()) {
      toast({
        title: t('setup.error.fields'),
        variant: "destructive",
      });
      return;
    }

    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      api_base_url: apiBaseUrl.trim(),
      token: bearerToken.trim(),
      organization_id: organizationId.trim()
    });
    
    const configLink = `${baseUrl}/config?${params.toString()}`;
    setGeneratedLink(configLink);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: t('config.link.copied'),
        description: t('config.link.copied.description'),
      });
    } catch (err) {
      toast({
        title: t('config.link.error.copy'),
        variant: "destructive",
      });
    }
  };

  const clearForm = () => {
    setApiBaseUrl('');
    setBearerToken('');
    setOrganizationId('');
    setGeneratedLink('');
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
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Link className="h-6 w-6" />
              {t('config.link.generator.title')}
            </CardTitle>
            <CardDescription>
              {t('config.link.generator.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Form Fields */}
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={generateLink} className="flex-1">
                  {t('config.link.generate')}
                </Button>
                <Button variant="outline" onClick={clearForm}>
                  {t('config.link.clear')}
                </Button>
              </div>

              {/* Generated Link */}
              {generatedLink && (
                <div className="space-y-3">
                  <Alert className="bg-green-500/10 border-green-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      {t('config.link.generated')}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Label>{t('config.link.result')}</Label>
                    <div className="flex gap-2">
                      <Input
                        value={generatedLink}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button size="icon" variant="outline" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="pt-4 border-t space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  {t('config.link.instructions.title')}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('config.link.instructions.step1')}</li>
                  <li>• {t('config.link.instructions.step2')}</li>
                  <li>• {t('config.link.instructions.step3')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigLinkGenerator;
