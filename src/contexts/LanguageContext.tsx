import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de';

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
    if (savedLanguage && ['pt', 'en', 'es', 'fr', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
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
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Visão geral das suas atividades e estatísticas',
    'total.hours.week': 'Horas Totais (Semana)',
    'billable.hours.week': 'Horas Faturáveis (Semana)',
    'revenue.week': 'Receita (Semana)',
    'active.tasks': 'Tarefas Ativas',
    'daily.hours.trend': 'Tendência de Horas Diárias',
    'weekly.time.overview': 'Visão Semanal de Tempo',
    'latest.tasks': 'Tarefas Recentes',
    'team.activity': 'Atividade da Equipe',
    'last.activity': 'Última atividade',
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
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Overview of your activities and statistics',
    'total.hours.week': 'Total Hours (Week)',
    'billable.hours.week': 'Billable Hours (Week)',
    'revenue.week': 'Revenue (Week)',
    'active.tasks': 'Active Tasks',
    'daily.hours.trend': 'Daily Hours Trend',
    'weekly.time.overview': 'Weekly Time Overview',
    'latest.tasks': 'Latest Tasks',
    'team.activity': 'Team Activity',
    'last.activity': 'Last activity',
  },
  es: {
    // General
    'loading': 'Cargando...',
    'error': 'Error',
    'back': 'Volver',
    'retry': 'Reintentar',
    
    // Projects page
    'app.title': 'A2Insights Tracker',
    'app.subtitle': 'Rastrea tus proyectos',
    'projects': 'Proyectos',
    'project.details': 'Ver detalles',
    'project.access': 'Acceder al proyecto',
    'project.billable': 'Facturable',
    'project.non_billable': 'No facturable',
    'project.archived': 'Archivado',
    'access.denied': 'Acceso denegado',
    'access.denied.message': 'No tienes acceso a este proyecto',
    'access.checking': 'Verificando acceso...',
    'config.required': 'Configuración Requerida',
    'config.required.message': 'Bearer Token y Organization ID deben configurarse en Supabase en la tabla app_config.',
    
    // Project detail
    'project.detail.title': 'Detalles del Proyecto',
    'project.detail.subtitle': 'Ver todas las actividades de este proyecto',
    'project.detail.back': 'Volver a Proyectos',
    'project.detail.view_entries': 'Ver Entradas de Tiempo Completas',
    'project.detail.loading': 'Cargando datos del proyecto...',
    'summary': 'Resumen',
    'total.hours': 'Horas Totales',
    'days.with.records': 'Días con Registros',
    'time.records': 'Registros de Tiempo',
    'date': 'Fecha',
    'start': 'Inicio',
    'end': 'Fin',
    'duration': 'Duración',
    'description': 'Descripción',
    'no.records': 'No se encontraron registros de tiempo para este proyecto.',
    
    // Project time entries
    'time.entries.title': 'Entradas de Tiempo',
    'time.entries.subtitle': 'Ver todas las actividades de tiempo de este proyecto',
    'time.entries.back': 'Volver a Detalles',
    'project.summary': 'Resumen del Proyecto',
    'total.records': 'Total de Registros',
    'activity.time': 'Actividad de Tiempo',
    'activity.timeline': 'Cronología de Actividades',
    'activity.development': 'Actividad de Desarrollo',
    'activity.less': 'Menos',
    'activity.more': 'Más',
    'no.activity': 'No se encontró actividad para este proyecto.',
    'worked.periods': 'Períodos trabajados:',
    'hours.worked': 'trabajadas',
    'no.activity.short': 'Sin actividad',
    'future.date': 'Fecha futura',
    'timeline.day': 'Cronología',
    'total': 'total',
    
    // API errors
    'api.error': 'Error de API',
    'api.error.projects': 'Error al obtener datos del proyecto.',
    'api.error.entries': 'Error al obtener datos de entradas de tiempo.',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Visión general de tus actividades y estadísticas',
    'total.hours.week': 'Horas Totales (Semana)',
    'billable.hours.week': 'Horas Faturables (Semana)',
    'revenue.week': 'Receita (Semana)',
    'active.tasks': 'Tareas Activas',
    'daily.hours.trend': 'Tendencia de Horas Diarias',
    'weekly.time.overview': 'Visión Semanal de Tiempo',
    'latest.tasks': 'Tareas Recientes',
    'team.activity': 'Actividad de la Equipo',
    'last.activity': 'Última actividad',
  },
  fr: {
    // General
    'loading': 'Chargement...',
    'error': 'Erreur',
    'back': 'Retour',
    'retry': 'Réessayer',
    
    // Projects page
    'app.title': 'A2Insights Tracker',
    'app.subtitle': 'Suivez vos projets',
    'projects': 'Projets',
    'project.details': 'Voir les détails',
    'project.access': 'Accéder au projet',
    'project.billable': 'Facturable',
    'project.non_billable': 'Non facturable',
    'project.archived': 'Archivé',
    'access.denied': 'Accès refusé',
    'access.denied.message': 'Vous n\'avez pas accès à ce projet',
    'access.checking': 'Vérification de l\'accès...',
    'config.required': 'Configuration Requise',
    'config.required.message': 'Bearer Token et Organization ID doivent être configurés dans Supabase dans la table app_config.',
    
    // Project detail
    'project.detail.title': 'Détails du Projet',
    'project.detail.subtitle': 'Voir toutes les activités de ce projet',
    'project.detail.back': 'Retour aux Projets',
    'project.detail.view_entries': 'Voir les Entrées de Temps Complètes',
    'project.detail.loading': 'Chargement des données du projet...',
    'summary': 'Résumé',
    'total.hours': 'Heures Totales',
    'days.with.records': 'Jours avec Enregistrements',
    'time.records': 'Enregistrements de Temps',
    'date': 'Date',
    'start': 'Début',
    'end': 'Fin',
    'duration': 'Durée',
    'description': 'Description',
    'no.records': 'Aucun enregistrement de temps trouvé pour ce projet.',
    
    // Project time entries
    'time.entries.title': 'Entrées de Temps',
    'time.entries.subtitle': 'Voir toutes les activités de temps de ce projet',
    'time.entries.back': 'Retour aux Détails',
    'project.summary': 'Résumé du Projet',
    'total.records': 'Total des Enregistrements',
    'activity.time': 'Activité de Temps',
    'activity.timeline': 'Chronologie des Activités',
    'activity.development': 'Activité de Développement',
    'activity.less': 'Moins',
    'activity.more': 'Plus',
    'no.activity': 'Aucune activité trouvée pour ce projet.',
    'worked.periods': 'Périodes travaillées:',
    'hours.worked': 'travaillées',
    'no.activity.short': 'Aucune activité',
    'future.date': 'Date future',
    'timeline.day': 'Chronologie',
    'total': 'total',
    
    // API errors
    'api.error': 'Erreur API',
    'api.error.projects': 'Erreur lors de la récupération des données du projet.',
    'api.error.entries': 'Erreur lors de la récupération des données d\'entrées de temps.',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Vue d\'ensemble de vos activités et de vos statistiques',
    'total.hours.week': 'Heures Totales (Semaine)',
    'billable.hours.week': 'Heures Faturables (Semaine)',
    'revenue.week': 'Revenu (Semaine)',
    'active.tasks': 'Tâches Actives',
    'daily.hours.trend': 'Tendance des Heures Journalières',
    'weekly.time.overview': 'Vue Semestrielle de Temps',
    'latest.tasks': 'Tâches les Plus Recentes',
    'team.activity': 'Activité de l\'Équipe',
    'last.activity': 'Dernière activité',
  },
  de: {
    // General
    'loading': 'Laden...',
    'error': 'Fehler',
    'back': 'Zurück',
    'retry': 'Wiederholen',
    
    // Projects page
    'app.title': 'A2Insights Tracker',
    'app.subtitle': 'Verfolgen Sie Ihre Projekte',
    'projects': 'Projekte',
    'project.details': 'Details anzeigen',
    'project.access': 'Projekt zugreifen',
    'project.billable': 'Abrechenbar',
    'project.non_billable': 'Nicht abrechenbar',
    'project.archived': 'Archiviert',
    'access.denied': 'Zugang verweigert',
    'access.denied.message': 'Sie haben keinen Zugang zu diesem Projekt',
    'access.checking': 'Zugang prüfen...',
    'config.required': 'Konfiguration Erforderlich',
    'config.required.message': 'Bearer Token und Organization ID müssen in Supabase in der app_config Tabelle konfiguriert werden.',
    
    // Project detail
    'project.detail.title': 'Projektdetails',
    'project.detail.subtitle': 'Alle Aktivitäten dieses Projekts anzeigen',
    'project.detail.back': 'Zurück zu Projekten',
    'project.detail.view_entries': 'Vollständige Zeiteinträge anzeigen',
    'project.detail.loading': 'Projektdaten laden...',
    'summary': 'Zusammenfassung',
    'total.hours': 'Gesamtstunden',
    'days.with.records': 'Tage mit Einträgen',
    'time.records': 'Zeiteinträge',
    'date': 'Datum',
    'start': 'Start',
    'end': 'Ende',
    'duration': 'Dauer',
    'description': 'Beschreibung',
    'no.records': 'Keine Zeiteinträge für dieses Projekt gefunden.',
    
    // Project time entries
    'time.entries.title': 'Zeiteinträge',
    'time.entries.subtitle': 'Alle Zeitaktivitäten dieses Projekts anzeigen',
    'time.entries.back': 'Zurück zu Details',
    'project.summary': 'Projektzusammenfassung',
    'total.records': 'Gesamteinträge',
    'activity.time': 'Zeitaktivität',
    'activity.timeline': 'Aktivitätszeitlinie',
    'activity.development': 'Entwicklungsaktivität',
    'activity.less': 'Weniger',
    'activity.more': 'Mehr',
    'no.activity': 'Keine Aktivität für dieses Projekt gefunden.',
    'worked.periods': 'Arbeitszeiten:',
    'hours.worked': 'gearbeitet',
    'no.activity.short': 'Keine Aktivität',
    'future.date': 'Zukünftiges Datum',
    'timeline.day': 'Zeitlinie',
    'total': 'gesamt',
    
    // API errors
    'api.error': 'API-Fehler',
    'api.error.projects': 'Fehler beim Abrufen der Projektdaten.',
    'api.error.entries': 'Fehler beim Abrufen der Zeiteintragsdaten.',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Übersicht Ihrer Aktivitäten und Statistiken',
    'total.hours.week': 'Gesamtstunden (Woche)',
    'billable.hours.week': 'Gesamt fahrbare Stunden (Woche)',
    'revenue.week': 'Umsatz (Woche)',
    'active.tasks': 'Aktive Aufgaben',
    'daily.hours.trend': 'Trend der Tagesstunden',
    'weekly.time.overview': 'Wochenübersicht des Zeitgebers',
    'latest.tasks': 'Neueste Aufgaben',
    'team.activity': 'Teamaktivität',
    'last.activity': 'Letzte Aktivität',
  }
};
