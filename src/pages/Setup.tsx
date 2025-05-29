
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertCircle } from 'lucide-react';
import { setConfig } from '@/services/config';
import { ModeToggle } from '@/components/ModeToggle';
import LanguageDropdown from '@/components/LanguageDropdown';

const Setup = () => {
  const navigate = useNavigate();
  const [bearerToken, setBearerToken] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!bearerToken.trim() || !organizationId.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      setConfig(bearerToken.trim(), organizationId.trim());
      navigate('/projects');
    } catch (err) {
      setError('Erro ao salvar configurações. Verifique os dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-2xl text-card-foreground">Configuração Inicial</CardTitle>
            <CardDescription className="text-muted-foreground">
              Configure suas credenciais de acesso para começar a usar o TimeTracker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bearerToken" className="text-foreground">Token de Acesso</Label>
                <Input
                  id="bearerToken"
                  type="password"
                  placeholder="Insira seu bearer token"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  required
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationId" className="text-foreground">ID da Organização</Label>
                <Input
                  id="organizationId"
                  type="text"
                  placeholder="Insira o ID da sua organização"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  required
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Configurando...' : 'Salvar Configurações'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
