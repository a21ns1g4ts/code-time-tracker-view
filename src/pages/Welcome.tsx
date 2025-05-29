
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BarChart3, Users, Settings, Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t('feature.public.stats.title'),
      description: t('feature.public.stats.description')
    },
    {
      icon: Clock,
      title: t('feature.realtime.title'),
      description: t('feature.realtime.description')
    },
    {
      icon: Users,
      title: t('feature.charts.title'),
      description: t('feature.charts.description')
    },
    {
      icon: Settings,
      title: t('feature.open.source.title'),
      description: t('feature.open.source.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
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
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            {t('welcome.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('welcome.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/setup')} 
              size="lg" 
              className="text-lg px-8 py-3"
            >
              {t('welcome.get.started')}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              asChild
              className="text-lg px-8 py-3"
            >
              <a 
                href="https://solidtime.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {t('welcome.about.solidtime')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur-sm border-border hover:scale-105">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About SolidTime Section */}
        <div className="text-center mb-16">
          <Card className="max-w-4xl mx-auto bg-background/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                {t('welcome.about.solidtime')}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {t('welcome.solidtime.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a 
                    href="https://solidtime.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    solidtime.io
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://github.com/solidtime-io/solidtime" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    {t('footer.github')}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://docs.solidtime.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t('footer.docs')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-background/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">{t('config.required')}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {t('config.required.message')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/setup')} 
                size="lg" 
                className="w-full sm:w-auto"
              >
                {t('setup.title')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            {t('footer.powered.by')} <a href="https://solidtime.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">solidtime</a> • {t('footer.open.source')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
