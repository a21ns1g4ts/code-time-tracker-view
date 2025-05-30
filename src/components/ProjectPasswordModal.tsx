
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyProjectPassword, setProjectAccess } from '@/services/projectAccess';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast({
        title: t('password.modal.error'),
        description: t('password.modal.enter.password'),
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    try {
      console.log('Attempting to verify password for project:', { projectId, projectName, password: password.trim() });
      const isValid = await verifyProjectPassword(projectId, password.trim());
      
      if (isValid) {
        setProjectAccess(projectId);
        toast({
          title: t('password.modal.access.granted'),
          description: `${t('password.modal.access.granted.message')} ${projectName}`
        });
        setPassword('');
        onSuccess();
      } else {
        toast({
          title: t('password.modal.error'),
          description: t('password.modal.incorrect.password'),
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      toast({
        title: t('password.modal.error'),
        description: t('password.modal.verification.error'),
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('password.modal.title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600">
            {t('password.modal.description')} {projectName}
          </p>
          <div className="space-y-2">
            <Label htmlFor="projectPassword">{t('password.modal.password.label')}</Label>
            <Input
              id="projectPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password.modal.password.placeholder')}
              disabled={isVerifying}
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose} type="button" disabled={isVerifying}>
              {t('password.modal.cancel')}
            </Button>
            <Button type="submit" disabled={isVerifying || !password.trim()}>
              {isVerifying ? t('password.modal.verifying') : t('password.modal.access')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPasswordModal;
