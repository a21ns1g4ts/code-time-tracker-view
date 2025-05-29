
import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  pt: {
    // App branding
    'app.title': 'SolidTime Public Stats',
    'app.subtitle': 'Visualização pública de estatísticas de projetos',
    'app.addon.description': 'Addon open source para solidtime',
    'app.github': 'Star us on Github!',
    
    // Welcome page
    'welcome.title': 'Visualize Estatísticas Públicas do SolidTime',
    'welcome.subtitle': 'Uma ferramenta open source para compartilhar estatísticas de projetos e time entries do solidtime de forma pública e transparente.',
    'welcome.get.started': 'Começar Configuração',
    'welcome.about.solidtime': 'Sobre o SolidTime',
    'welcome.solidtime.description': 'O solidtime é um moderno rastreador de tempo open source para freelancers e equipes.',
    
    // Features
    'feature.public.stats.title': 'Estatísticas Públicas',
    'feature.public.stats.description': 'Compartilhe estatísticas de projetos de forma transparente',
    'feature.realtime.title': 'Tempo Real',
    'feature.realtime.description': 'Visualize dados atualizados em tempo real',
    'feature.charts.title': 'Gráficos Interativos',
    'feature.charts.description': 'Visualizações bonitas e informativas dos seus dados',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Código aberto e totalmente customizável',
    
    // Setup
    'setup.title': 'Configuração do Addon',
    'setup.subtitle': 'Configure a conexão com sua instância do solidtime',
    'setup.token.label': 'Token de API do SolidTime',
    'setup.token.placeholder': 'Insira seu token de API do solidtime',
    'setup.organization.label': 'ID da Organização',
    'setup.organization.placeholder': 'Insira o ID da sua organização',
    'setup.save': 'Salvar Configurações',
    'setup.saving': 'Configurando...',
    'setup.error.fields': 'Por favor, preencha todos os campos',
    'setup.error.save': 'Erro ao salvar configurações. Verifique os dados e tente novamente.',
    
    // Config from URL
    'config.auto.title': 'Configuração Automática',
    'config.auto.subtitle': 'Processando credenciais do solidtime...',
    'config.auto.configuring': 'Configurando conexão...',
    'config.auto.success': 'Conexão configurada com sucesso!',
    'config.auto.error.params': 'Parâmetros de configuração ausentes na URL',
    'config.auto.error.process': 'Erro ao processar configurações da URL',
    
    // Dashboard
    'dashboard': 'Painel',
    'dashboard.subtitle': 'Visão geral das estatísticas públicas',
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
    'config.required.message': 'Configure a conexão com o solidtime para continuar',
    
    // Footer links
    'footer.powered.by': 'Powered by',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentação',
  },
  en: {
    // App branding
    'app.title': 'SolidTime Public Stats',
    'app.subtitle': 'Public project statistics visualization',
    'app.addon.description': 'Open source addon for solidtime',
    'app.github': 'Star us on Github!',
    
    // Welcome page
    'welcome.title': 'Visualize SolidTime Public Statistics',
    'welcome.subtitle': 'An open source tool to share solidtime project statistics and time entries publicly and transparently.',
    'welcome.get.started': 'Get Started',
    'welcome.about.solidtime': 'About SolidTime',
    'welcome.solidtime.description': 'solidtime is a modern open source time tracker for freelancers and teams.',
    
    // Features
    'feature.public.stats.title': 'Public Statistics',
    'feature.public.stats.description': 'Share project statistics transparently',
    'feature.realtime.title': 'Real Time',
    'feature.realtime.description': 'View real-time updated data',
    'feature.charts.title': 'Interactive Charts',
    'feature.charts.description': 'Beautiful and informative visualizations of your data',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Open source and fully customizable',
    
    // Setup
    'setup.title': 'Addon Configuration',
    'setup.subtitle': 'Configure connection to your solidtime instance',
    'setup.token.label': 'SolidTime API Token',
    'setup.token.placeholder': 'Enter your solidtime API token',
    'setup.organization.label': 'Organization ID',
    'setup.organization.placeholder': 'Enter your organization ID',
    'setup.save': 'Save Configuration',
    'setup.saving': 'Configuring...',
    'setup.error.fields': 'Please fill in all fields',
    'setup.error.save': 'Error saving configuration. Check your data and try again.',
    
    // Config from URL
    'config.auto.title': 'Automatic Configuration',
    'config.auto.subtitle': 'Processing solidtime credentials...',
    'config.auto.configuring': 'Configuring connection...',
    'config.auto.success': 'Connection configured successfully!',
    'config.auto.error.params': 'Configuration parameters missing from URL',
    'config.auto.error.process': 'Error processing configuration from URL',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Overview of public statistics',
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
    'config.required.message': 'Configure solidtime connection to continue',
    
    // Footer links
    'footer.powered.by': 'Powered by',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation',
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
