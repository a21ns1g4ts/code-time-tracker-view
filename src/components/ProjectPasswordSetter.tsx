
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveProjectPassword } from '@/services/projectAccess';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface ProjectPasswordSetterProps {
  projectId: string;
  projectName: string;
}

const ProjectPasswordSetter: React.FC<ProjectPasswordSetterProps> = ({ projectId, projectName }) => {
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!password.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma senha",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      console.log('Saving password for project:', { projectId, projectName });
      await saveProjectPassword(projectId, password.trim());
      
      toast({
        title: "Senha salva",
        description: `Senha configurada com sucesso para o projeto ${projectName}`
      });
      setPassword('');
    } catch (error) {
      console.error('Error saving password:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar a senha. Verifique o console para mais detalhes.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Configurar Acesso</CardTitle>
        <Lock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`projectPassword-${projectId}`}>Senha para {projectName}</Label>
          <Input
            id={`projectPassword-${projectId}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Definir senha de acesso"
            disabled={isSaving}
          />
        </div>
        <Button onClick={handleSave} disabled={isSaving || !password.trim()} className="w-full">
          {isSaving ? "Salvando..." : "Salvar Senha"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectPasswordSetter;
