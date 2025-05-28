
import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  pt: {
    // Dashboard
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
    
    // App
    'app.title': 'SolidTime',
    'app.subtitle': 'Gerenciamento de tempo e projetos',
    
    // Projects
    'project.billable': 'Faturável',
    'project.non_billable': 'Não faturável',
    'project.archived': 'Arquivado',
    'project.details': 'Ver Detalhes',
    'project.access': 'Solicitar Acesso',
    'project.detail.back': 'Voltar aos Projetos',
    'project.detail.title': 'Detalhes do Projeto',
    'project.detail.subtitle': 'Visão geral do tempo registrado',
    'project.detail.view_entries': 'Ver Entradas de Tempo Completas',
    
    // Activity
    'activity.development': 'Atividade de Desenvolvimento',
    'activity.less': 'Menos',
    'activity.more': 'Mais',
    'activity.timeline': 'Linha do Tempo da Atividade',
    'hours.worked': 'horas trabalhadas',
    'no.activity.short': 'Sem atividade',
    'future.date': 'Data futura',
    
    // Timeline
    'timeline.day': 'Dia',
    'total': 'total',
    'worked.periods': 'Períodos Trabalhados',
    
    // Time entries
    'time.entries.title': 'Entradas de Tempo',
    'time.entries.subtitle': 'Gerencie e visualize suas entradas de tempo',
    'time.entries.back': 'Voltar ao Projeto',
    'time.records': 'Registros de Tempo',
    
    // General
    'no.activity': 'Nenhuma atividade registrada',
    'no.records': 'Nenhum registro encontrado',
    'error': 'Erro',
    'back': 'Voltar',
    'date': 'Data',
    'start': 'Início',
    'end': 'Fim',
    'duration': 'Duração',
    'description': 'Descrição',
    'total.hours': 'Total de Horas',
    'days.with.records': 'Dias com Registros',
    'total.records': 'Total de Registros',
    
    // Config
    'config.required': 'Configuração Necessária',
    'config.required.message': 'Configure a aplicação para continuar',
  },
  en: {
    // Dashboard
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
    
    // App
    'app.title': 'SolidTime',
    'app.subtitle': 'Time and project management',
    
    // Projects
    'project.billable': 'Billable',
    'project.non_billable': 'Non-billable',
    'project.archived': 'Archived',
    'project.details': 'View Details',
    'project.access': 'Request Access',
    'project.detail.back': 'Back to Projects',
    'project.detail.title': 'Project Details',
    'project.detail.subtitle': 'Overview of recorded time',
    'project.detail.view_entries': 'View Complete Time Entries',
    
    // Activity
    'activity.development': 'Development Activity',
    'activity.less': 'Less',
    'activity.more': 'More',
    'activity.timeline': 'Activity Timeline',
    'hours.worked': 'hours worked',
    'no.activity.short': 'No activity',
    'future.date': 'Future date',
    
    // Timeline
    'timeline.day': 'Day',
    'total': 'total',
    'worked.periods': 'Worked Periods',
    
    // Time entries
    'time.entries.title': 'Time Entries',
    'time.entries.subtitle': 'Manage and view your time entries',
    'time.entries.back': 'Back to Project',
    'time.records': 'Time Records',
    
    // General
    'no.activity': 'No activity recorded',
    'no.records': 'No records found',
    'error': 'Error',
    'back': 'Back',
    'date': 'Date',
    'start': 'Start',
    'end': 'End',
    'duration': 'Duration',
    'description': 'Description',
    'total.hours': 'Total Hours',
    'days.with.records': 'Days with Records',
    'total.records': 'Total Records',
    
    // Config
    'config.required': 'Configuration Required',
    'config.required.message': 'Please configure the application to continue',
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
