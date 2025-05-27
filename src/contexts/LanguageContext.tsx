
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  pt: {
    // General
    'loading': 'Carregando...',
    'error': 'Erro',
    'back': 'Voltar',
    'retry': 'Tentar novamente',
    
    // Projects page
    'app.title': 'A2Insights Tracker',
    'app.subtitle': 'Acompanhe seus projetos',
    'projects': 'Projetos',
    'project.details': 'Ver detalhes',
    'project.access': 'Acessar projeto',
    'project.billable': 'Faturável',
    'project.non_billable': 'Não faturável',
    'project.archived': 'Arquivado',
    'access.denied': 'Acesso negado',
    'access.denied.message': 'Você não tem acesso a este projeto',
    'access.checking': 'Verificando acesso...',
    'config.required': 'Configuração Necessária',
    'config.required.message': 'Bearer Token e Organization ID devem ser configurados no Supabase na tabela app_config.',
    
    // Project detail
    'project.detail.title': 'Detalhes do Projeto',
    'project.detail.subtitle': 'Visualize todas as atividades deste projeto',
    'project.detail.back': 'Voltar para Projetos',
    'project.detail.view_entries': 'Ver Time Entries Completo',
    'project.detail.loading': 'Carregando dados do projeto...',
    'summary': 'Resumo',
    'total.hours': 'Total de Horas',
    'days.with.records': 'Dias com Registros',
    'time.records': 'Registros de Tempo',
    'date': 'Data',
    'start': 'Início',
    'end': 'Fim',
    'duration': 'Duração',
    'description': 'Descrição',
    'no.records': 'Nenhum registro de tempo encontrado para este projeto.',
    
    // Project time entries
    'time.entries.title': 'Time Entries',
    'time.entries.subtitle': 'Visualize todas as atividades de tempo deste projeto',
    'time.entries.back': 'Voltar para Detalhes',
    'project.summary': 'Resumo do Projeto',
    'total.records': 'Total de Registros',
    'activity.time': 'Atividade de Tempo',
    'activity.timeline': 'Timeline de Atividades',
    'activity.development': 'Atividade de Desenvolvimento',
    'activity.less': 'Menos',
    'activity.more': 'Mais',
    'no.activity': 'Nenhuma atividade encontrada para este projeto.',
    'worked.periods': 'Períodos trabalhados:',
    'hours.worked': 'trabalhadas',
    'no.activity.short': 'Nenhuma atividade',
    'future.date': 'Data futura',
    'timeline.day': 'Timeline',
    'total': 'total',
    
    // API errors
    'api.error': 'Erro na API',
    'api.error.projects': 'Erro ao buscar dados do projeto.',
    'api.error.entries': 'Erro ao buscar dados de time entries.',
  },
  en: {
    // General
    'loading': 'Loading...',
    'error': 'Error',
    'back': 'Back',
    'retry': 'Retry',
    
    // Projects page
    'app.title': 'A2Insights Tracker',
    'app.subtitle': 'Track your projects',
    'projects': 'Projects',
    'project.details': 'View details',
    'project.access': 'Access project',
    'project.billable': 'Billable',
    'project.non_billable': 'Non-billable',
    'project.archived': 'Archived',
    'access.denied': 'Access denied',
    'access.denied.message': 'You do not have access to this project',
    'access.checking': 'Checking access...',
    'config.required': 'Configuration Required',
    'config.required.message': 'Bearer Token and Organization ID must be configured in Supabase in the app_config table.',
    
    // Project detail
    'project.detail.title': 'Project Details',
    'project.detail.subtitle': 'View all activities for this project',
    'project.detail.back': 'Back to Projects',
    'project.detail.view_entries': 'View Complete Time Entries',
    'project.detail.loading': 'Loading project data...',
    'summary': 'Summary',
    'total.hours': 'Total Hours',
    'days.with.records': 'Days with Records',
    'time.records': 'Time Records',
    'date': 'Date',
    'start': 'Start',
    'end': 'End',
    'duration': 'Duration',
    'description': 'Description',
    'no.records': 'No time records found for this project.',
    
    // Project time entries
    'time.entries.title': 'Time Entries',
    'time.entries.subtitle': 'View all time activities for this project',
    'time.entries.back': 'Back to Details',
    'project.summary': 'Project Summary',
    'total.records': 'Total Records',
    'activity.time': 'Time Activity',
    'activity.timeline': 'Activity Timeline',
    'activity.development': 'Development Activity',
    'activity.less': 'Less',
    'activity.more': 'More',
    'no.activity': 'No activity found for this project.',
    'worked.periods': 'Work periods:',
    'hours.worked': 'worked',
    'no.activity.short': 'No activity',
    'future.date': 'Future date',
    'timeline.day': 'Timeline',
    'total': 'total',
    
    // API errors
    'api.error': 'API Error',
    'api.error.projects': 'Error fetching project data.',
    'api.error.entries': 'Error fetching time entries data.',
  }
};
