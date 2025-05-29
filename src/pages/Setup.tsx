
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertCircle } from 'lucide-react';
import { setConfig, isConfigured } from '@/services/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const Setup = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [bearerToken, setBearerToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to projects if already configured
    const checkConfig = async () => {
      const configured = await isConfigured();
      if (configured) {
        navigate('/projects');
      }
    };
    checkConfig();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!bearerToken.trim() || !organizationId.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Save configuration
      setConfig(bearerToken.trim(), organizationId.trim());
      
      // Test the configuration by making a simple API call
      const response = await fetch(
        `https://solidtime.a2insights.com.br/api/v1/organizations/${organizationId.trim()}`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken.trim()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Credenciais inválidas ou organização não encontrada');
      }

      // Redirect to projects page
      navigate('/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao validar configuração');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TimeTracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <LanguageDropdown />
        </div>
      </div>

      {/* Setup Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Configuração Inicial</CardTitle>
            <CardDescription>
              Insira suas credenciais da API para começar a usar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bearerToken">Token de Acesso</Label>
                <Input
                  id="bearerToken"
                  type="text"
                  placeholder="seu-bearer-token"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationId">ID da Organização</Label>
                <Input
                  id="organizationId"
                  type="text"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
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
                {isLoading ? 'Validando...' : 'Salvar Configuração'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-sm"
              >
                Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
