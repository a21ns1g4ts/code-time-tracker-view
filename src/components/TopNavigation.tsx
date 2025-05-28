import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from './ModeToggle';

const TopNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="border-b bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex space-x-1">
            <Button
              variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-sm"
            >
              {t('dashboard')}
            </Button>
            <Button
              variant={location.pathname === '/projects' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/projects')}
              className="text-sm"
            >
              {t('projects')}
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
