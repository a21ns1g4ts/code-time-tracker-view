
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BarChart3, Users, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: 'Controle de Tempo',
      description: 'Acompanhe suas horas trabalhadas com precisão'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Visualize sua produtividade com gráficos e métricas'
    },
    {
      icon: Users,
      title: 'Gestão de Equipe',
      description: 'Monitore a atividade de toda sua equipe'
    },
    {
      icon: Settings,
      title: 'Configuração Flexível',
      description: 'Personalize de acordo com suas necessidades'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TimeTracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <LanguageDropdown />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Gerencie seu Tempo com Eficiência
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Uma solução completa para controle de horas, produtividade e gestão de projetos. 
            Transforme a maneira como você acompanha seu trabalho.
          </p>
          <Button 
            onClick={() => navigate('/setup')} 
            size="lg" 
            className="text-lg px-8 py-3"
          >
            Começar Agora
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm border-border">
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

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Pronto para começar?</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Configure sua conta e comece a rastrear seu tempo em minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/setup')} 
                size="lg" 
                className="w-full sm:w-auto"
              >
                Configurar Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
