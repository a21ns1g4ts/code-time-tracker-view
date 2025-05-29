
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModeToggle } from './ModeToggle';
import LanguageDropdown from './LanguageDropdown';
import { Clock, LogOut } from 'lucide-react';
import { clearConfig } from '@/services/config';

const TopNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    clearConfig();
    navigate('/');
  };

  return (
    <div className="border-b bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">TimeTracker</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex space-x-1">
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
          <LanguageDropdown />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-sm"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
