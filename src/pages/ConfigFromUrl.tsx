
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { setConfig } from '@/services/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const ConfigFromUrl = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const configureFromUrl = async () => {
      try {
        const token = searchParams.get('token');
        const orgId = searchParams.get('org_id') || searchParams.get('organization_id');

        if (!token || !orgId) {
          throw new Error('Parâmetros token e org_id são obrigatórios na URL');
        }

        // Test the configuration by making a simple API call
        const response = await fetch(
          `https://solidtime.a2insights.com.br/api/v1/organizations/${orgId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Credenciais inválidas ou organização não encontrada');
        }

        // Save configuration
        setConfig(token, orgId);
        setStatus('success');

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/projects');
        }, 2000);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao configurar credenciais');
        setStatus('error');
      }
    };

    configureFromUrl();
  }, [searchParams, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'loading':
        return 'Configurando credenciais...';
      case 'success':
        return 'Configuração realizada com sucesso! Redirecionando...';
      case 'error':
        return 'Erro na configuração';
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

      {/* Status Card */}
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            <CardTitle className="text-2xl">{getStatusMessage()}</CardTitle>
            <CardDescription>
              {status === 'loading' && 'Validando suas credenciais da API...'}
              {status === 'success' && 'Você será redirecionado automaticamente.'}
              {status === 'error' && 'Verifique os parâmetros da URL e tente novamente.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'error' && (
              <>
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Button 
                    onClick={() => navigate('/setup')} 
                    className="w-full"
                  >
                    Configurar Manualmente
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Voltar ao Início
                  </Button>
                </div>
              </>
            )}
            
            {status === 'success' && (
              <Button 
                onClick={() => navigate('/projects')} 
                className="w-full"
              >
                Ir para Projetos
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigFromUrl;
