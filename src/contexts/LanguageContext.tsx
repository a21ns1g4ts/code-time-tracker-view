import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'ru' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Estatísticas públicas dos seus projetos',
    'app.addon.description': 'Addon open-source para estatísticas públicas de projetos',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Estatísticas Públicas para solidtime',
    'welcome.subtitle': 'Exiba a produtividade da sua equipe e estatísticas de projetos publicamente com este addon open-source para solidtime.',
    'welcome.get.started': 'Começar',
    'welcome.about.solidtime': 'Sobre o solidtime',
    'welcome.solidtime.description': 'solidtime é uma aplicação moderna e open-source de controle de tempo construída para freelancers e equipes. Controle tempo, gerencie projetos, gere relatórios e faturas.',

    // Features
    'feature.public.stats.title': 'Estatísticas Públicas',
    'feature.public.stats.description': 'Compartilhe suas estatísticas de projeto e produtividade da equipe publicamente',
    'feature.realtime.title': 'Dados em Tempo Real',
    'feature.realtime.description': 'Atualizações ao vivo da sua instância solidtime',
    'feature.charts.title': 'Gráficos Bonitos',
    'feature.charts.description': 'Visualize seus dados com gráficos e tabelas interativas',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Completamente open source e customizável',

    // Setup
    'setup.title': 'Configuração',
    'setup.subtitle': 'Conecte sua instância solidtime para exibir estatísticas públicas',
    'setup.api.url.label': 'URL Base da API',
    'setup.api.url.placeholder': 'https://sua-instancia-solidtime.com/api/v1',
    'setup.token.label': 'Token Bearer',
    'setup.token.placeholder': 'Digite seu token da API',
    'setup.organization.label': 'ID da Organização',
    'setup.organization.placeholder': 'Digite o ID da sua organização',
    'setup.save': 'Salvar Configuração',
    'setup.saving': 'Salvando...',
    'setup.error.fields': 'Por favor, preencha todos os campos',
    'setup.error.save': 'Erro ao salvar configuração',

    // Config
    'config.auto.title': 'Configuração Automática',
    'config.auto.subtitle': 'Configurando sua conexão solidtime',
    'config.auto.configuring': 'Configurando sua conexão...',
    'config.auto.success': 'Configuração bem-sucedida! Redirecionando...',
    'config.auto.error.params': 'Parâmetros obrigatórios ausentes na URL',
    'config.auto.error.process': 'Erro ao processar configuração',
    'config.required': 'Configuração Necessária',
    'config.required.message': 'Por favor, configure sua conexão solidtime para visualizar estatísticas',

    // Password Modal
    'password.modal.title': 'Acesso ao Projeto',
    'password.modal.description': 'Este projeto requer uma senha para acesso. Por favor, digite a senha para o projeto',
    'password.modal.password.label': 'Senha',
    'password.modal.password.placeholder': 'Digite a senha do projeto',
    'password.modal.cancel': 'Cancelar',
    'password.modal.access': 'Acessar',
    'password.modal.verifying': 'Verificando...',
    'password.modal.error': 'Erro',
    'password.modal.enter.password': 'Por favor, digite a senha',
    'password.modal.access.granted': 'Acesso concedido',
    'password.modal.access.granted.message': 'Você agora tem acesso ao projeto',
    'password.modal.incorrect.password': 'Senha incorreta',
    'password.modal.verification.error': 'Ocorreu um erro ao verificar a senha. Tente novamente.',

    // Projects
    'projects': 'Projetos',
    'project.billable': 'Faturável',
    'project.non_billable': 'Não faturável',
    'project.archived': 'Arquivado',
    'project.details': 'Ver Detalhes',
    'project.access': 'Solicitar Acesso',

    // Activity
    'activity.development': 'Atividade de Desenvolvimento',
    'activity.timeline': 'Cronograma de Atividades',
    'activity.less': 'Menos',
    'activity.more': 'Mais',
    'no.activity': 'Nenhuma atividade registrada',
    'no.activity.short': 'Sem atividade',
    'future.date': 'Data futura',
    'hours.worked': 'trabalhadas',

    // Time entries
    'time.entries.title': 'Registros de Tempo',
    'time.entries.subtitle': 'Visualize todos os registros de tempo para este projeto',
    'time.entries.back': 'Voltar ao Projeto',
    'total.hours': 'Total de Horas',
    'days.with.records': 'Dias com Registros',
    'total.records': 'Total de Registros',

    // Timeline
    'timeline.day': 'Dia',
    'total': 'total',
    'worked.periods': 'Períodos Trabalhados',

    // Dashboard
    'dashboard': 'Painel',
    'dashboard.subtitle': 'Visão geral das suas atividades e estatísticas',
    'total.hours.week': 'Horas Totais (Semana)',
    'revenue.week': 'Receita (Semana)',
    'active.tasks': 'Tarefas Ativas',
    'team.members': 'Membros da Equipe',
    'daily.hours.trend': 'Tendência de Horas Diárias',
    'weekly.time.overview': 'Visão Geral Semanal',
    'weekly.project.overview': 'Visão Geral de Projetos Semanais',

    // Footer
    'footer.powered.by': 'Desenvolvido por',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentação',

    // Common
    'loading': 'Carregando...',
    'error': 'Erro',
    'back': 'Voltar',
    'logout': 'Sair',
    'close': 'Fechar',

    // Additional translations
    'api.error.message': 'Erro ao buscar dados da API. Verifique as configurações.',
    'retry': 'Tentar Novamente',
    'page.not.found': 'Página não encontrada'
  },
  en: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Public statistics for your projects',
    'app.addon.description': 'Open-source addon for public project statistics',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Public Statistics for solidtime',
    'welcome.subtitle': 'Display your team\'s productivity and project statistics publicly with this open-source addon for solidtime.',
    'welcome.get.started': 'Get Started',
    'welcome.about.solidtime': 'About solidtime',
    'welcome.solidtime.description': 'solidtime is a modern, open-source time tracking application built for freelancers and teams. Track time, manage projects, generate reports and invoices.',

    // Features
    'feature.public.stats.title': 'Public Statistics',
    'feature.public.stats.description': 'Share your project statistics and team productivity publicly',
    'feature.realtime.title': 'Real-time Data',
    'feature.realtime.description': 'Live updates from your solidtime instance',
    'feature.charts.title': 'Beautiful Charts',
    'feature.charts.description': 'Visualize your data with interactive charts and graphs',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Completely open source and customizable',

    // Setup
    'setup.title': 'Setup Configuration',
    'setup.subtitle': 'Connect your solidtime instance to display public statistics',
    'setup.api.url.label': 'API Base URL',
    'setup.api.url.placeholder': 'https://your-solidtime-instance.com/api/v1',
    'setup.token.label': 'Bearer Token',
    'setup.token.placeholder': 'Enter your API token',
    'setup.organization.label': 'Organization ID',
    'setup.organization.placeholder': 'Enter your organization ID',
    'setup.save': 'Save Configuration',
    'setup.saving': 'Saving...',
    'setup.error.fields': 'Please fill in all fields',
    'setup.error.save': 'Error saving configuration',

    // Config
    'config.auto.title': 'Automatic Configuration',
    'config.auto.subtitle': 'Setting up your solidtime connection',
    'config.auto.configuring': 'Configuring your connection...',
    'config.auto.success': 'Configuration successful! Redirecting...',
    'config.auto.error.params': 'Missing required parameters in URL',
    'config.auto.error.process': 'Error processing configuration',
    'config.required': 'Configuration Required',
    'config.required.message': 'Please configure your solidtime connection to view statistics',

    // Password Modal
    'password.modal.title': 'Project Access',
    'password.modal.description': 'This project requires a password for access. Please enter the password for project',
    'password.modal.password.label': 'Password',
    'password.modal.password.placeholder': 'Enter project password',
    'password.modal.cancel': 'Cancel',
    'password.modal.access': 'Access',
    'password.modal.verifying': 'Verifying...',
    'password.modal.error': 'Error',
    'password.modal.enter.password': 'Please enter the password',
    'password.modal.access.granted': 'Access granted',
    'password.modal.access.granted.message': 'You now have access to project',
    'password.modal.incorrect.password': 'Incorrect password',
    'password.modal.verification.error': 'An error occurred while verifying the password. Please try again.',

    // Projects
    'projects': 'Projects',
    'project.billable': 'Billable',
    'project.non_billable': 'Non-billable',
    'project.archived': 'Archived',
    'project.details': 'View Details',
    'project.access': 'Request Access',

    // Activity
    'activity.development': 'Development Activity',
    'activity.timeline': 'Activity Timeline',
    'activity.less': 'Less',
    'activity.more': 'More',
    'no.activity': 'No activity recorded',
    'no.activity.short': 'No activity',
    'future.date': 'Future date',
    'hours.worked': 'worked',

    // Time entries
    'time.entries.title': 'Time Entries',
    'time.entries.subtitle': 'View all time entries for this project',
    'time.entries.back': 'Back to Project',
    'total.hours': 'Total Hours',
    'days.with.records': 'Days with Records',
    'total.records': 'Total Records',

    // Timeline
    'timeline.day': 'Day',
    'total': 'total',
    'worked.periods': 'Worked Periods',

    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Overview of your activities and statistics',
    'total.hours.week': 'Total Hours (Week)',
    'revenue.week': 'Revenue (Week)',
    'active.tasks': 'Active Tasks',
    'team.members': 'Team Members',
    'daily.hours.trend': 'Daily Hours Trend',
    'weekly.time.overview': 'Weekly Time Overview',
    'weekly.project.overview': 'Weekly Project Overview',

    // Footer
    'footer.powered.by': 'Powered by',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation',

    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'back': 'Back',
    'logout': 'Logout',
    'close': 'Close',

    // Additional translations
    'api.error.message': 'Error fetching data from API. Check your configuration.',
    'retry': 'Try Again',
    'page.not.found': 'Page not found'
  },
  es: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Estadísticas públicas de tus proyectos',
    'app.addon.description': 'Complemento de código abierto para estadísticas públicas de proyectos',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Estadísticas Públicas para solidtime',
    'welcome.subtitle': 'Muestra la productividad de tu equipo y estadísticas de proyectos públicamente con este complemento de código abierto para solidtime.',
    'welcome.get.started': 'Comenzar',
    'welcome.about.solidtime': 'Acerca de solidtime',
    'welcome.solidtime.description': 'solidtime es una aplicación moderna y de código abierto de seguimiento de tiempo construida para freelancers y equipos. Rastrea tiempo, gestiona proyectos, genera informes y facturas.',

    // Features
    'feature.public.stats.title': 'Estadísticas Públicas',
    'feature.public.stats.description': 'Comparte las estadísticas de tu proyecto y la productividad del equipo públicamente',
    'feature.realtime.title': 'Datos en Tiempo Real',
    'feature.realtime.description': 'Actualizaciones en vivo desde tu instancia de solidtime',
    'feature.charts.title': 'Gráficos Hermosos',
    'feature.charts.description': 'Visualiza tus datos con gráficos y tablas interactivas',
    'feature.open.source.title': 'Código Abierto',
    'feature.open.source.description': 'Completamente de código abierto y personalizable',

    // Setup
    'setup.title': 'Configuración',
    'setup.subtitle': 'Conecta tu instancia de solidtime para mostrar estadísticas públicas',
    'setup.api.url.label': 'URL Base de la API',
    'setup.api.url.placeholder': 'https://tu-instancia-solidtime.com/api/v1',
    'setup.token.label': 'Token Bearer',
    'setup.token.placeholder': 'Ingresa tu token de API',
    'setup.organization.label': 'ID de Organización',
    'setup.organization.placeholder': 'Ingresa el ID de tu organización',
    'setup.save': 'Guardar Configuración',
    'setup.saving': 'Guardando...',
    'setup.error.fields': 'Por favor completa todos los campos',
    'setup.error.save': 'Error al guardar la configuración',

    // Config
    'config.auto.title': 'Configuración Automática',
    'config.auto.subtitle': 'Configurando tu conexión solidtime',
    'config.auto.configuring': 'Configurando tu conexión...',
    'config.auto.success': '¡Configuración exitosa! Redirigiendo...',
    'config.auto.error.params': 'Faltan parámetros requeridos en la URL',
    'config.auto.error.process': 'Error al procesar la configuración',
    'config.required': 'Configuración Requerida',
    'config.required.message': 'Por favor configura tu conexión solidtime para ver estadísticas',

    // Password Modal
    'password.modal.title': 'Acceso al Proyecto',
    'password.modal.description': 'Este proyecto requiere una contraseña para acceder. Por favor ingresa la contraseña para el proyecto',
    'password.modal.password.label': 'Contraseña',
    'password.modal.password.placeholder': 'Ingresa la contraseña del proyecto',
    'password.modal.cancel': 'Cancelar',
    'password.modal.access': 'Acceder',
    'password.modal.verifying': 'Verificando...',
    'password.modal.error': 'Error',
    'password.modal.enter.password': 'Por favor ingresa la contraseña',
    'password.modal.access.granted': 'Acceso concedido',
    'password.modal.access.granted.message': 'Ahora tienes acceso al proyecto',
    'password.modal.incorrect.password': 'Contraseña incorrecta',
    'password.modal.verification.error': 'Ocurrió un error al verificar la contraseña. Inténtalo de nuevo.',

    // Projects
    'projects': 'Proyectos',
    'project.billable': 'Facturable',
    'project.non_billable': 'No facturable',
    'project.archived': 'Archivado',
    'project.details': 'Ver Detalles',
    'project.access': 'Solicitar Acceso',

    // Activity
    'activity.development': 'Actividad de Desarrollo',
    'activity.timeline': 'Cronología de Actividades',
    'activity.less': 'Menos',
    'activity.more': 'Más',
    'no.activity': 'No hay actividad registrada',
    'no.activity.short': 'Sin actividad',
    'future.date': 'Fecha futura',
    'hours.worked': 'trabajadas',

    // Time entries
    'time.entries.title': 'Registros de Tiempo',
    'time.entries.subtitle': 'Ver todos los registros de tiempo para este proyecto',
    'time.entries.back': 'Volver al Proyecto',
    'total.hours': 'Horas Totales',
    'days.with.records': 'Días con Registros',
    'total.records': 'Registros Totales',

    // Timeline
    'timeline.day': 'Día',
    'total': 'total',
    'worked.periods': 'Períodos Trabajados',

    // Dashboard
    'dashboard': 'Panel',
    'dashboard.subtitle': 'Resumen de tus actividades y estadísticas',
    'total.hours.week': 'Horas Totales (Semana)',
    'revenue.week': 'Ingresos (Semana)',
    'active.tasks': 'Tareas Activas',
    'team.members': 'Miembros del Equipo',
    'daily.hours.trend': 'Tendencia de Horas Diarias',
    'weekly.time.overview': 'Resumen Semanal',
    'weekly.project.overview': 'Resumen de Proyectos Semanales',

    // Footer
    'footer.powered.by': 'Desarrollado por',
    'footer.open.source': 'Código Abierto',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentación',

    // Common
    'loading': 'Cargando...',
    'error': 'Error',
    'back': 'Volver',
    'logout': 'Cerrar Sesión',
    'close': 'Cerrar',

    // Additional translations
    'api.error.message': 'Error al obtener datos de la API. Revisa tu configuración.',
    'retry': 'Intentar de Nuevo',
    'page.not.found': 'Página no encontrada'
  },
  fr: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Statistiques publiques de vos projets',
    'app.addon.description': 'Extension open-source pour les statistiques publiques de projets',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Statistiques Publiques pour solidtime',
    'welcome.subtitle': 'Affichez la productivité de votre équipe et les statistiques de projets publiquement avec cette extension open-source pour solidtime.',
    'welcome.get.started': 'Commencer',
    'welcome.about.solidtime': 'À propos de solidtime',
    'welcome.solidtime.description': 'solidtime est une application moderne et open-source de suivi du temps conçue pour les freelancers et les équipes. Suivez le temps, gérez les projets, générez des rapports et des factures.',

    // Features
    'feature.public.stats.title': 'Statistiques Publiques',
    'feature.public.stats.description': 'Partagez publiquement les statistiques de votre projet et la productivité de l\'équipe',
    'feature.realtime.title': 'Données en Temps Réel',
    'feature.realtime.description': 'Mises à jour en direct depuis votre instance solidtime',
    'feature.charts.title': 'Beaux Graphiques',
    'feature.charts.description': 'Visualisez vos données avec des graphiques et tableaux interactifs',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Entièrement open source et personnalisable',

    // Setup
    'setup.title': 'Configuration',
    'setup.subtitle': 'Connectez votre instance solidtime pour afficher les statistiques publiques',
    'setup.api.url.label': 'URL de Base de l\'API',
    'setup.api.url.placeholder': 'https://votre-instance-solidtime.com/api/v1',
    'setup.token.label': 'Token Bearer',
    'setup.token.placeholder': 'Entrez votre token API',
    'setup.organization.label': 'ID de l\'Organisation',
    'setup.organization.placeholder': 'Entrez l\'ID de votre organisation',
    'setup.save': 'Sauvegarder la Configuration',
    'setup.saving': 'Sauvegarde...',
    'setup.error.fields': 'Veuillez remplir tous les champs',
    'setup.error.save': 'Erreur lors de la sauvegarde de la configuration',

    // Config
    'config.auto.title': 'Configuration Automatique',
    'config.auto.subtitle': 'Configuration de votre connexion solidtime',
    'config.auto.configuring': 'Configuration de votre connexion...',
    'config.auto.success': 'Configuration réussie ! Redirection...',
    'config.auto.error.params': 'Paramètres requis manquants dans l\'URL',
    'config.auto.error.process': 'Erreur lors du traitement de la configuration',
    'config.required': 'Configuration Requise',
    'config.required.message': 'Veuillez configurer votre connexion solidtime pour voir les statistiques',

    // Password Modal
    'password.modal.title': 'Accès au Projet',
    'password.modal.description': 'Ce projet nécessite un mot de passe pour accéder. Veuillez entrer le mot de passe pour le projet',
    'password.modal.password.label': 'Mot de passe',
    'password.modal.password.placeholder': 'Entrez le mot de passe du projet',
    'password.modal.cancel': 'Annuler',
    'password.modal.access': 'Accéder',
    'password.modal.verifying': 'Vérification...',
    'password.modal.error': 'Erreur',
    'password.modal.enter.password': 'Veuillez entrer le mot de passe',
    'password.modal.access.granted': 'Accès accordé',
    'password.modal.access.granted.message': 'Vous avez maintenant accès au projet',
    'password.modal.incorrect.password': 'Mot de passe incorrect',
    'password.modal.verification.error': 'Une erreur s\'est produite lors de la vérification du mot de passe. Veuillez réessayer.',

    // Projects
    'projects': 'Projets',
    'project.billable': 'Facturable',
    'project.non_billable': 'Non facturable',
    'project.archived': 'Archivé',
    'project.details': 'Voir Détails',
    'project.access': 'Demander l\'Accès',

    // Activity
    'activity.development': 'Activité de Développement',
    'activity.timeline': 'Chronologie des Activités',
    'activity.less': 'Moins',
    'activity.more': 'Plus',
    'no.activity': 'Aucune activité enregistrée',
    'no.activity.short': 'Aucune activité',
    'future.date': 'Date future',
    'hours.worked': 'travaillées',

    // Time entries
    'time.entries.title': 'Entrées de Temps',
    'time.entries.subtitle': 'Voir toutes les entrées de temps pour ce projet',
    'time.entries.back': 'Retour au Projet',
    'total.hours': 'Heures Totales',
    'days.with.records': 'Jours avec Enregistrements',
    'total.records': 'Enregistrements Totaux',

    // Timeline
    'timeline.day': 'Jour',
    'total': 'total',
    'worked.periods': 'Périodes Travaillées',

    // Dashboard
    'dashboard': 'Tableau de Bord',
    'dashboard.subtitle': 'Aperçu de vos activités et statistiques',
    'total.hours.week': 'Heures Totales (Semaine)',
    'revenue.week': 'Revenus (Semaine)',
    'active.tasks': 'Tâches Actives',
    'team.members': 'Membres de l\'Équipe',
    'daily.hours.trend': 'Tendance des Heures Quotidiennes',
    'weekly.time.overview': 'Aperçu Hebdomadaire',
    'weekly.project.overview': 'Aperçu des Projets Hebdomadaires',

    // Footer
    'footer.powered.by': 'Propulsé par',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation',

    // Common
    'loading': 'Chargement...',
    'error': 'Erreur',
    'back': 'Retour',
    'logout': 'Déconnexion',
    'close': 'Fermer',

    // Additional translations
    'api.error.message': 'Erreur lors de la récupération des données de l\'API. Vérifiez votre configuration.',
    'retry': 'Réessayer',
    'page.not.found': 'Page non trouvée'
  },
  de: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Öffentliche Statistiken Ihrer Projekte',
    'app.addon.description': 'Open-Source-Addon für öffentliche Projektstatistiken',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Öffentliche Statistiken für solidtime',
    'welcome.subtitle': 'Zeigen Sie die Produktivität Ihres Teams und Projektstatistiken öffentlich mit diesem Open-Source-Addon für solidtime.',
    'welcome.get.started': 'Loslegen',
    'welcome.about.solidtime': 'Über solidtime',
    'welcome.solidtime.description': 'solidtime ist eine moderne, Open-Source-Zeiterfassungsanwendung für Freelancer und Teams. Zeit erfassen, Projekte verwalten, Berichte und Rechnungen erstellen.',

    // Features
    'feature.public.stats.title': 'Öffentliche Statistiken',
    'feature.public.stats.description': 'Teilen Sie Ihre Projektstatistiken und Teamproduktivität öffentlich',
    'feature.realtime.title': 'Echtzeitdaten',
    'feature.realtime.description': 'Live-Updates von Ihrer solidtime-Instanz',
    'feature.charts.title': 'Schöne Diagramme',
    'feature.charts.description': 'Visualisieren Sie Ihre Daten mit interaktiven Diagrammen und Grafiken',
    'feature.open.source.title': 'Open Source',
    'feature.open.source.description': 'Vollständig Open Source und anpassbar',

    // Setup
    'setup.title': 'Konfiguration',
    'setup.subtitle': 'Verbinden Sie Ihre solidtime-Instanz, um öffentliche Statistiken anzuzeigen',
    'setup.api.url.label': 'API-Basis-URL',
    'setup.api.url.placeholder': 'https://ihre-solidtime-instanz.com/api/v1',
    'setup.token.label': 'Bearer Token',
    'setup.token.placeholder': 'Geben Sie Ihr API-Token ein',
    'setup.organization.label': 'Organisations-ID',
    'setup.organization.placeholder': 'Geben Sie Ihre Organisations-ID ein',
    'setup.save': 'Konfiguration Speichern',
    'setup.saving': 'Speichern...',
    'setup.error.fields': 'Bitte füllen Sie alle Felder aus',
    'setup.error.save': 'Fehler beim Speichern der Konfiguration',

    // Config
    'config.auto.title': 'Automatische Konfiguration',
    'config.auto.subtitle': 'Einrichten Ihrer solidtime-Verbindung',
    'config.auto.configuring': 'Konfiguriere Ihre Verbindung...',
    'config.auto.success': 'Konfiguration erfolgreich! Weiterleitung...',
    'config.auto.error.params': 'Fehlende erforderliche Parameter in der URL',
    'config.auto.error.process': 'Fehler beim Verarbeiten der Konfiguration',
    'config.required': 'Konfiguration Erforderlich',
    'config.required.message': 'Bitte konfigurieren Sie Ihre solidtime-Verbindung, um Statistiken anzuzeigen',

    // Password Modal
    'password.modal.title': 'Projektzugang',
    'password.modal.description': 'Dieses Projekt erfordert ein Passwort für den Zugang. Bitte geben Sie das Passwort für das Projekt ein',
    'password.modal.password.label': 'Passwort',
    'password.modal.password.placeholder': 'Projektpasswort eingeben',
    'password.modal.cancel': 'Abbrechen',
    'password.modal.access': 'Zugriff',
    'password.modal.verifying': 'Überprüfung...',
    'password.modal.error': 'Fehler',
    'password.modal.enter.password': 'Bitte geben Sie das Passwort ein',
    'password.modal.access.granted': 'Zugang gewährt',
    'password.modal.access.granted.message': 'Sie haben jetzt Zugang zum Projekt',
    'password.modal.incorrect.password': 'Falsches Passwort',
    'password.modal.verification.error': 'Ein Fehler ist bei der Passwort-Überprüfung aufgetreten. Bitte versuchen Sie es erneut.',

    // Projects
    'projects': 'Projekte',
    'project.billable': 'Abrechenbar',
    'project.non_billable': 'Nicht abrechenbar',
    'project.archived': 'Archiviert',
    'project.details': 'Details Anzeigen',
    'project.access': 'Zugang Anfordern',

    // Activity
    'activity.development': 'Entwicklungsaktivität',
    'activity.timeline': 'Aktivitäts-Zeitlinie',
    'activity.less': 'Weniger',
    'activity.more': 'Mehr',
    'no.activity': 'Keine Aktivität aufgezeichnet',
    'no.activity.short': 'Keine Aktivität',
    'future.date': 'Zukünftiges Datum',
    'hours.worked': 'gearbeitet',

    // Time entries
    'time.entries.title': 'Zeiteinträge',
    'time.entries.subtitle': 'Alle Zeiteinträge für dieses Projekt anzeigen',
    'time.entries.back': 'Zurück zum Projekt',
    'total.hours': 'Gesamtstunden',
    'days.with.records': 'Tage mit Aufzeichnungen',
    'total.records': 'Gesamtaufzeichnungen',

    // Timeline
    'timeline.day': 'Tag',
    'total': 'gesamt',
    'worked.periods': 'Arbeitsperioden',

    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.subtitle': 'Überblick über Ihre Aktivitäten und Statistiken',
    'total.hours.week': 'Gesamtstunden (Woche)',
    'revenue.week': 'Einnahmen (Woche)',
    'active.tasks': 'Aktive Aufgaben',
    'team.members': 'Teammitglieder',
    'daily.hours.trend': 'Tägliche Stunden-Trend',
    'weekly.time.overview': 'Wöchentliche Zeitübersicht',
    'weekly.project.overview': 'Wöchentliche Projektübersicht',

    // Footer
    'footer.powered.by': 'Betrieben von',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Dokumentation',

    // Common
    'loading': 'Laden...',
    'error': 'Fehler',
    'back': 'Zurück',
    'logout': 'Abmelden',
    'close': 'Schließen',

    // Additional translations
    'api.error.message': 'Fehler beim Abrufen von Daten aus der API. Überprüfen Sie Ihre Konfiguration.',
    'retry': 'Erneut Versuchen',
    'page.not.found': 'Seite nicht gefunden'
  },
  ru: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': 'Публичная статистика ваших проектов',
    'app.addon.description': 'Open-source дополнение для публичной статистики проектов',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'Публичная Статистика для solidtime',
    'welcome.subtitle': 'Показывайте продуктивность вашей команды и статистику проектов публично с этим open-source дополнением для solidtime.',
    'welcome.get.started': 'Начать',
    'welcome.about.solidtime': 'О solidtime',
    'welcome.solidtime.description': 'solidtime - это современное приложение с открытым исходным кодом для отслеживания времени, созданное для фрилансеров и команд. Отслеживайте время, управляйте проектами, создавайте отчеты и счета.',

    // Features
    'feature.public.stats.title': 'Публичная Статистика',
    'feature.public.stats.description': 'Делитесь статистикой проектов и продуктивностью команды публично',
    'feature.realtime.title': 'Данные в Реальном Времени',
    'feature.realtime.description': 'Живые обновления с вашего экземпляра solidtime',
    'feature.charts.title': 'Красивые Графики',
    'feature.charts.description': 'Визуализируйте данные с помощью интерактивных графиков и диаграмм',
    'feature.open.source.title': 'Открытый Код',
    'feature.open.source.description': 'Полностью с открытым исходным кодом и настраиваемый',

    // Setup
    'setup.title': 'Настройка',
    'setup.subtitle': 'Подключите ваш экземпляр solidtime для отображения публичной статистики',
    'setup.api.url.label': 'Базовый URL API',
    'setup.api.url.placeholder': 'https://ваш-экземпляр-solidtime.com/api/v1',
    'setup.token.label': 'Bearer Token',
    'setup.token.placeholder': 'Введите ваш API токен',
    'setup.organization.label': 'ID Организации',
    'setup.organization.placeholder': 'Введите ID вашей организации',
    'setup.save': 'Сохранить Конфигурацию',
    'setup.saving': 'Сохранение...',
    'setup.error.fields': 'Пожалуйста, заполните все поля',
    'setup.error.save': 'Ошибка сохранения конфигурации',

    // Config
    'config.auto.title': 'Автоматическая Настройка',
    'config.auto.subtitle': 'Настройка вашего подключения solidtime',
    'config.auto.configuring': 'Настройка вашего подключения...',
    'config.auto.success': 'Настройка успешна! Перенаправление...',
    'config.auto.error.params': 'Отсутствуют обязательные параметры в URL',
    'config.auto.error.process': 'Ошибка обработки конфигурации',
    'config.required': 'Требуется Настройка',
    'config.required.message': 'Пожалуйста, настройте ваше подключение solidtime для просмотра статистики',

    // Password Modal
    'password.modal.title': 'Доступ к Проекту',
    'password.modal.description': 'Этот проект требует пароль для доступа. Пожалуйста, введите пароль для проекта',
    'password.modal.password.label': 'Пароль',
    'password.modal.password.placeholder': 'Введите пароль проекта',
    'password.modal.cancel': 'Отмена',
    'password.modal.access': 'Доступ',
    'password.modal.verifying': 'Проверка...',
    'password.modal.error': 'Ошибка',
    'password.modal.enter.password': 'Пожалуйста, введите пароль',
    'password.modal.access.granted': 'Доступ предоставлен',
    'password.modal.access.granted.message': 'Теперь у вас есть доступ к проекту',
    'password.modal.incorrect.password': 'Неверный пароль',
    'password.modal.verification.error': 'Произошла ошибка при проверке пароля. Пожалуйста, попробуйте снова.',

    // Projects
    'projects': 'Проекты',
    'project.billable': 'Оплачиваемый',
    'project.non_billable': 'Неоплачиваемый',
    'project.archived': 'Архивный',
    'project.details': 'Посмотреть Детали',
    'project.access': 'Запросить Доступ',

    // Activity
    'activity.development': 'Активность Разработки',
    'activity.timeline': 'Временная Шкала Активности',
    'activity.less': 'Меньше',
    'activity.more': 'Больше',
    'no.activity': 'Активность не записана',
    'no.activity.short': 'Нет активности',
    'future.date': 'Будущая дата',
    'hours.worked': 'отработано',

    // Time entries
    'time.entries.title': 'Записи Времени',
    'time.entries.subtitle': 'Просмотреть все записи времени для этого проекта',
    'time.entries.back': 'Вернуться к Проекту',
    'total.hours': 'Общее Время',
    'days.with.records': 'Дни с Записями',
    'total.records': 'Всего Записей',

    // Timeline
    'timeline.day': 'День',
    'total': 'всего',
    'worked.periods': 'Рабочие Периоды',

    // Dashboard
    'dashboard': 'Панель',
    'dashboard.subtitle': 'Обзор ваших активностей и статистики',
    'total.hours.week': 'Общее Время (Неделя)',
    'revenue.week': 'Доход (Неделя)',
    'active.tasks': 'Активные Задачи',
    'team.members': 'Члены Команды',
    'daily.hours.trend': 'Тренд Ежедневных Часов',
    'weekly.time.overview': 'Недельный Обзор Времени',
    'weekly.project.overview': 'Недельный Обзор Проектов',

    // Footer
    'footer.powered.by': 'Работает на',
    'footer.open.source': 'Открытый Код',
    'footer.github': 'GitHub',
    'footer.docs': 'Документация',

    // Common
    'loading': 'Загрузка...',
    'error': 'Ошибка',
    'back': 'Назад',
    'logout': 'Выйти',
    'close': 'Закрыть',

    // Additional translations
    'api.error.message': 'Ошибка получения данных из API. Проверьте вашу конфигурацию.',
    'retry': 'Попробовать Снова',
    'page.not.found': 'Страница не найдена'
  },
  zh: {
    // App
    'app.title': 'solidtime Stats',
    'app.subtitle': '您项目的公共统计',
    'app.addon.description': '项目公共统计的开源插件',
    'app.github': 'GitHub',

    // Welcome
    'welcome.title': 'solidtime 公共统计',
    'welcome.subtitle': '使用这个 solidtime 开源插件公开展示您团队的生产力和项目统计。',
    'welcome.get.started': '开始',
    'welcome.about.solidtime': '关于 solidtime',
    'welcome.solidtime.description': 'solidtime 是一个现代化的开源时间跟踪应用程序，专为自由职业者和团队打造。跟踪时间、管理项目、生成报告和发票。',

    // Features
    'feature.public.stats.title': '公共统计',
    'feature.public.stats.description': '公开分享您的项目统计和团队生产力',
    'feature.realtime.title': '实时数据',
    'feature.realtime.description': '来自您 solidtime 实例的实时更新',
    'feature.charts.title': '美丽图表',
    'feature.charts.description': '使用交互式图表和图形可视化您的数据',
    'feature.open.source.title': '开源',
    'feature.open.source.description': '完全开源且可定制',

    // Setup
    'setup.title': '设置配置',
    'setup.subtitle': '连接您的 solidtime 实例以显示公共统计',
    'setup.api.url.label': 'API 基础 URL',
    'setup.api.url.placeholder': 'https://您的-solidtime-实例.com/api/v1',
    'setup.token.label': 'Bearer Token',
    'setup.token.placeholder': '输入您的 API 令牌',
    'setup.organization.label': '组织 ID',
    'setup.organization.placeholder': '输入您的组织 ID',
    'setup.save': '保存配置',
    'setup.saving': '保存中...',
    'setup.error.fields': '请填写所有字段',
    'setup.error.save': '保存配置时出错',

    // Config
    'config.auto.title': '自动配置',
    'config.auto.subtitle': '设置您的 solidtime 连接',
    'config.auto.configuring': '正在配置您的连接...',
    'config.auto.success': '配置成功！正在重定向...',
    'config.auto.error.params': 'URL 中缺少必需参数',
    'config.auto.error.process': '处理配置时出错',
    'config.required': '需要配置',
    'config.required.message': '请配置您的 solidtime 连接以查看统计',

    // Password Modal
    'password.modal.title': '项目访问',
    'password.modal.description': '此项目需要密码才能访问。请输入项目密码',
    'password.modal.password.label': '密码',
    'password.modal.password.placeholder': '输入项目密码',
    'password.modal.cancel': '取消',
    'password.modal.access': '访问',
    'password.modal.verifying': '验证中...',
    'password.modal.error': '错误',
    'password.modal.enter.password': '请输入密码',
    'password.modal.access.granted': '访问已授予',
    'password.modal.access.granted.message': '您现在可以访问项目',
    'password.modal.incorrect.password': '密码错误',
    'password.modal.verification.error': '验证密码时发生错误。请重试。',

    // Projects
    'projects': '项目',
    'project.billable': '可计费',
    'project.non_billable': '不可计费',
    'project.archived': '已归档',
    'project.details': '查看详情',
    'project.access': '请求访问',

    // Activity
    'activity.development': '开发活动',
    'activity.timeline': '活动时间线',
    'activity.less': '较少',
    'activity.more': '更多',
    'no.activity': '没有记录活动',
    'no.activity.short': '无活动',
    'future.date': '未来日期',
    'hours.worked': '已工作',

    // Time entries
    'time.entries.title': '时间记录',
    'time.entries.subtitle': '查看此项目的所有时间记录',
    'time.entries.back': '返回项目',
    'total.hours': '总小时数',
    'days.with.records': '有记录的天数',
    'total.records': '总记录数',

    // Timeline
    'timeline.day': '天',
    'total': '总计',
    'worked.periods': '工作时段',

    // Dashboard
    'dashboard': '仪表板',
    'dashboard.subtitle': '您的活动和统计概览',
    'total.hours.week': '总小时数（周）',
    'revenue.week': '收入（周）',
    'active.tasks': '活跃任务',
    'team.members': '团队成员',
    'daily.hours.trend': '每日小时趋势',
    'weekly.time.overview': '每周时间概览',
    'weekly.project.overview': '每周项目概览',

    // Footer
    'footer.powered.by': '技术支持',
    'footer.open.source': '开源',
    'footer.github': 'GitHub',
    'footer.docs': '文档',

    // Common
    'loading': '加载中...',
    'error': '错误',
    'back': '返回',
    'logout': '登出',
    'close': '关闭',

    // Additional translations
    'api.error.message': '从 API 获取数据时出错。请检查您的配置。',
    'retry': '重试',
    'page.not.found': '页面未找到'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'pt', 'es', 'fr', 'de', 'ru', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
        setLanguage('pt');
      } else if (browserLang.startsWith('es')) {
        setLanguage('es');
      } else if (browserLang.startsWith('fr')) {
        setLanguage('fr');
      } else if (browserLang.startsWith('de')) {
        setLanguage('de');
      } else if (browserLang.startsWith('ru')) {
        setLanguage('ru');
      } else if (browserLang.startsWith('zh')) {
        setLanguage('zh');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
