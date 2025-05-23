
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyProjectPassword, setProjectAccess } from '@/services/projectAccess';
import { toast } from '@/hooks/use-toast';

interface ProjectPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectId: string;
  projectName: string;
}

const ProjectPasswordModal: React.FC<ProjectPasswordModalProps> = ({ 
  open, 
  onClose, 
  onSuccess, 
  projectId, 
  projectName 
}) => {
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Erro",
        description: "Por favor, digite a senha",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    try {
      const isValid = await verifyProjectPassword(projectId, password);
      
      if (isValid) {
        setProjectAccess(projectId);
        toast({
          title: "Acesso concedido",
          description: `Você agora tem acesso ao projeto ${projectName}`
        });
        onSuccess();
      } else {
        toast({
          title: "Erro",
          description: "Senha incorreta",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao verificar a senha",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acesso ao Projeto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600">
            Este projeto requer uma senha para acesso. Por favor, digite a senha para o projeto <strong>{projectName}</strong>.
          </p>
          <div className="space-y-2">
            <Label htmlFor="projectPassword">Senha</Label>
            <Input
              id="projectPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha do projeto"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={isVerifying}>
              {isVerifying ? "Verificando..." : "Acessar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPasswordModal;
