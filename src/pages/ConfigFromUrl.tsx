
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { setConfig } from '@/services/config';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const ConfigFromUrl = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const configureFromUrl = async () => {
      try {
        const token = searchParams.get('token');
        const organizationId = searchParams.get('organization_id');

        if (!token || !organizationId) {
          setStatus('error');
          setMessage('Parâmetros de configuração ausentes na URL');
          return;
        }

        setConfig(token, organizationId);
        setStatus('success');
        setMessage('Configuração salva com sucesso!');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/projects');
        }, 2000);
        
      } catch (error) {
        setStatus('error');
        setMessage('Erro ao processar configurações da URL');
      }
    };

    configureFromUrl();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
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
      <div className="max-w-md mx-auto px-4 py-16">
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">Configuração Automática</CardTitle>
            <CardDescription className="text-muted-foreground">
              Processando suas credenciais de acesso...
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Configurando...</p>
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
