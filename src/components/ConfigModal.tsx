
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveConfig, getConfig } from '@/services/config';
import { toast } from '@/hooks/use-toast';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ open, onClose, onSave }) => {
  const [bearerToken, setBearerToken] = useState(getConfig().bearerToken);
  const [organizationId, setOrganizationId] = useState(getConfig().organizationId);

  const handleSave = () => {
    if (!bearerToken || !organizationId) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    saveConfig(bearerToken, organizationId);
    toast({
      title: "Configuração salva",
      description: "Bearer token e Organization ID foram salvos com sucesso"
    });
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuração da API</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bearerToken">Bearer Token</Label>
            <Input
              id="bearerToken"
              type="password"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Digite seu Bearer token"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizationId">Organization ID</Label>
            <Input
              id="organizationId"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="Digite seu Organization ID"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigModal;
