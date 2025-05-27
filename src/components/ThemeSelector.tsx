
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type Theme = 'classic' | 'solarized-classic' | 'solarized-dark' | 'dark';

interface ThemeOption {
  id: Theme;
  name: string;
  icon: string;
  cssUrl: string;
}

const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('classic');

  const themes: ThemeOption[] = [
    {
      id: 'classic',
      name: 'Classic',
      icon: '🌞',
      cssUrl: '/themes/classic.css'
    },
    {
      id: 'solarized-classic',
      name: 'Solarized Classic',
      icon: '🌗',
      cssUrl: '/themes/solarized-classic.css'
    },
    {
      id: 'solarized-dark',
      name: 'Solarized Dark',
      icon: '🌘',
      cssUrl: '/themes/solarized-dark.css'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: '🌚',
      cssUrl: '/themes/dark.css'
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('classic');
    }
  }, []);

  const applyTheme = (themeId: Theme) => {
    // Remove existing theme links
    const existingLinks = document.querySelectorAll('link[data-theme]');
    existingLinks.forEach(link => link.remove());

    // Add new theme link
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = theme.cssUrl;
      link.setAttribute('data-theme', themeId);
      document.head.appendChild(link);
    }
  };

  const switchTheme = (themeId: Theme) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    applyTheme(themeId);
  };

  return (
    <div className="flex items-center gap-2">
      {themes.map((theme) => (
        <Button
          key={theme.id}
          variant={currentTheme === theme.id ? "default" : "outline"}
          size="sm"
          onClick={() => switchTheme(theme.id)}
          className="flex items-center gap-1 text-xs"
          title={theme.name}
        >
          <span>{theme.icon}</span>
        </Button>
      ))}
    </div>
  );
};

export default ThemeSelector;
