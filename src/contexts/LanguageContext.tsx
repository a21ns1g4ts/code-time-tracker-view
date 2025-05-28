import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  pt: {
    'dashboard': 'Painel',
    'dashboard.subtitle': 'Visão geral do seu tempo e projetos',
    'projects': 'Projetos',
    'latest.tasks': 'Tarefas Recentes',
    'team.activity': 'Atividade da Equipe',
    'daily.hours.trend': 'Tendência de Horas Diárias',
    'weekly.time.overview': 'Visão Geral do Tempo Semanal',
    'total.hours.week': 'Horas Totais na Semana',
    'billable.hours.week': 'Horas Faturáveis na Semana',
    'revenue.week': 'Receita na Semana',
    'active.tasks': 'Tarefas Ativas',
    'last.activity': 'Última atividade',
    'weekly.project.overview': 'Visão Geral Semanal dos Projetos',
    'team.members': 'Membros da Equipe',
  },
  en: {
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Overview of your time and projects',
    'projects': 'Projects',
    'latest.tasks': 'Latest Tasks',
    'team.activity': 'Team Activity',
    'daily.hours.trend': 'Daily Hours Trend',
    'weekly.time.overview': 'Weekly Time Overview',
    'total.hours.week': 'Total Hours This Week',
    'billable.hours.week': 'Billable Hours This Week',
    'revenue.week': 'Revenue This Week',
    'active.tasks': 'Active Tasks',
    'last.activity': 'Last activity',
    'weekly.project.overview': 'Weekly Project Overview',
    'team.members': 'Team Members',
  }
};

type Language = 'en' | 'pt';
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
