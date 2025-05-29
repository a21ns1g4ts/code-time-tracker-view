
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              {t('footer.powered.by')} <a href="https://solidtime.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">solidtime</a>
            </p>
            <p className="text-muted-foreground text-xs">
              {t('footer.open.source')} • {t('app.addon.description')}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/solidtime-io/solidtime" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
            >
              <Github className="h-4 w-4" />
              {t('footer.github')}
            </a>
            <a 
              href="https://docs.solidtime.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              {t('footer.docs')}
            </a>
            <a 
              href="https://solidtime.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              solidtime.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
