
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
    'projects.title': 'Projetos',
    'projects.subtitle': 'Visualize todos os projetos disponíveis',
    'project.billable': 'Faturável',
    'project.non_billable': 'Não faturável',
    'project.archived': 'Arquivado',
    'project.details': 'Ver Detalhes',
    'project.access': 'Solicitar Acesso',
    'project.statistics': 'Estatísticas do Projeto',
    'project.overview': 'Visão Geral',
    'project.activity': 'Atividade',
    'project.time.entries': 'Registros de Tempo',

    // Activity
    'activity.development': 'Atividade de Desenvolvimento',
    'activity.timeline': 'Cronograma de Atividades',
    'activity.grid': 'Grade de Atividades',
    'activity.less': 'Menos',
    'activity.more': 'Mais',
    'activity.view.details': 'Ver Detalhes',
    'no.activity': 'Nenhuma atividade registrada',
    'no.activity.short': 'Sem atividade',
    'future.date': 'Data futura',
    'hours.worked': 'horas trabalhadas',
    'hour.worked': 'hora trabalhada',

    // Time entries
    'time.entries.title': 'Registros de Tempo',
    'time.entries.subtitle': 'Visualize todos os registros de tempo para este projeto',
    'time.entries.back': 'Voltar ao Projeto',
    'time.entry': 'Registro de Tempo',
    'time.entry.description': 'Descrição',
    'time.entry.task': 'Tarefa',
    'time.entry.start': 'Início',
    'time.entry.end': 'Fim',
    'time.entry.duration': 'Duração',
    'time.entry.user': 'Usuário',
    'time.entry.billable': 'Faturável',
    'total.hours': 'Total de Horas',
    'days.with.records': 'Dias com Registros',
    'total.records': 'Total de Registros',

    // Timeline
    'timeline.day': 'Dia',
    'timeline.week': 'Semana',
    'timeline.month': 'Mês',
    'timeline.year': 'Ano',
    'total': 'total',
    'worked.periods': 'Períodos Trabalhados',

    // Dashboard
    'dashboard': 'Painel',
    'dashboard.title': 'Painel de Controle',
    'dashboard.subtitle': 'Visão geral das suas atividades e estatísticas',
    'total.hours.week': 'Horas Totais (Semana)',
    'revenue.week': 'Receita (Semana)',
    'active.tasks': 'Tarefas Ativas',
    'team.members': 'Membros da Equipe',
    'daily.hours.trend': 'Tendência de Horas Diárias',
    'weekly.time.overview': 'Visão Geral Semanal',
    'weekly.project.overview': 'Visão Geral de Projetos Semanais',

    // Statistics
    'statistics': 'Estatísticas',
    'statistics.overview': 'Visão Geral das Estatísticas',
    'statistics.this.week': 'Esta Semana',
    'statistics.this.month': 'Este Mês',
    'statistics.this.year': 'Este Ano',
    'statistics.all.time': 'Todo o Período',

    // Charts
    'chart.hours.per.day': 'Horas por Dia',
    'chart.hours.per.week': 'Horas por Semana',
    'chart.hours.per.month': 'Horas por Mês',
    'chart.projects.comparison': 'Comparação de Projetos',
    'chart.team.activity': 'Atividade da Equipe',
    'chart.productivity': 'Produtividade',

    // Navigation
    'nav.home': 'Início',
    'nav.projects': 'Projetos',
    'nav.dashboard': 'Painel',
    'nav.settings': 'Configurações',
    'nav.help': 'Ajuda',

    // Footer
    'footer.powered.by': 'Desenvolvido por',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentação',
    'footer.support': 'Suporte',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',

    // Common
    'loading': 'Carregando...',
    'error': 'Erro',
    'success': 'Sucesso',
    'warning': 'Aviso',
    'info': 'Informação',
    'back': 'Voltar',
    'next': 'Próximo',
    'previous': 'Anterior',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'confirm': 'Confirmar',
    'delete': 'Excluir',
    'edit': 'Editar',
    'view': 'Visualizar',
    'search': 'Pesquisar',
    'filter': 'Filtrar',
    'sort': 'Classificar',
    'refresh': 'Atualizar',
    'logout': 'Sair',
    'close': 'Fechar',
    'open': 'Abrir',
    'yes': 'Sim',
    'no': 'Não',
    'ok': 'OK',

    // Date/Time
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'tomorrow': 'Amanhã',
    'this.week': 'Esta Semana',
    'last.week': 'Semana Passada',
    'next.week': 'Próxima Semana',
    'this.month': 'Este Mês',
    'last.month': 'Mês Passado',
    'next.month': 'Próximo Mês',

    // Error Messages
    'api.error.message': 'Erro ao buscar dados da API. Verifique as configurações.',
    'retry': 'Tentar Novamente',
    'page.not.found': 'Página não encontrada',
    'permission.denied': 'Permissão negada',
    'connection.error': 'Erro de conexão',
    'timeout.error': 'Tempo limite excedido',
    'unknown.error': 'Erro desconhecido'
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
    'projects.title': 'Projects',
    'projects.subtitle': 'View all available projects',
    'project.billable': 'Billable',
    'project.non_billable': 'Non-billable',
    'project.archived': 'Archived',
    'project.details': 'View Details',
    'project.access': 'Request Access',
    'project.statistics': 'Project Statistics',
    'project.overview': 'Overview',
    'project.activity': 'Activity',
    'project.time.entries': 'Time Entries',

    // Activity
    'activity.development': 'Development Activity',
    'activity.timeline': 'Activity Timeline',
    'activity.grid': 'Activity Grid',
    'activity.less': 'Less',
    'activity.more': 'More',
    'activity.view.details': 'View Details',
    'no.activity': 'No activity recorded',
    'no.activity.short': 'No activity',
    'future.date': 'Future date',
    'hours.worked': 'hours worked',
    'hour.worked': 'hour worked',

    // Time entries
    'time.entries.title': 'Time Entries',
    'time.entries.subtitle': 'View all time entries for this project',
    'time.entries.back': 'Back to Project',
    'time.entry': 'Time Entry',
    'time.entry.description': 'Description',
    'time.entry.task': 'Task',
    'time.entry.start': 'Start',
    'time.entry.end': 'End',
    'time.entry.duration': 'Duration',
    'time.entry.user': 'User',
    'time.entry.billable': 'Billable',
    'total.hours': 'Total Hours',
    'days.with.records': 'Days with Records',
    'total.records': 'Total Records',

    // Timeline
    'timeline.day': 'Day',
    'timeline.week': 'Week',
    'timeline.month': 'Month',
    'timeline.year': 'Year',
    'total': 'total',
    'worked.periods': 'Worked Periods',

    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview of your activities and statistics',
    'total.hours.week': 'Total Hours (Week)',
    'revenue.week': 'Revenue (Week)',
    'active.tasks': 'Active Tasks',
    'team.members': 'Team Members',
    'daily.hours.trend': 'Daily Hours Trend',
    'weekly.time.overview': 'Weekly Time Overview',
    'weekly.project.overview': 'Weekly Project Overview',

    // Statistics
    'statistics': 'Statistics',
    'statistics.overview': 'Statistics Overview',
    'statistics.this.week': 'This Week',
    'statistics.this.month': 'This Month',
    'statistics.this.year': 'This Year',
    'statistics.all.time': 'All Time',

    // Charts
    'chart.hours.per.day': 'Hours per Day',
    'chart.hours.per.week': 'Hours per Week',
    'chart.hours.per.month': 'Hours per Month',
    'chart.projects.comparison': 'Projects Comparison',
    'chart.team.activity': 'Team Activity',
    'chart.productivity': 'Productivity',

    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'nav.help': 'Help',

    // Footer
    'footer.powered.by': 'Powered by',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation',
    'footer.support': 'Support',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'warning': 'Warning',
    'info': 'Information',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'save': 'Save',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'edit': 'Edit',
    'view': 'View',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'refresh': 'Refresh',
    'logout': 'Logout',
    'close': 'Close',
    'open': 'Open',
    'yes': 'Yes',
    'no': 'No',
    'ok': 'OK',

    // Date/Time
    'today': 'Today',
    'yesterday': 'Yesterday',
    'tomorrow': 'Tomorrow',
    'this.week': 'This Week',
    'last.week': 'Last Week',
    'next.week': 'Next Week',
    'this.month': 'This Month',
    'last.month': 'Last Month',
    'next.month': 'Next Month',

    // Error Messages
    'api.error.message': 'Error fetching data from API. Check your configuration.',
    'retry': 'Try Again',
    'page.not.found': 'Page not found',
    'permission.denied': 'Permission denied',
    'connection.error': 'Connection error',
    'timeout.error': 'Timeout error',
    'unknown.error': 'Unknown error'
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
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Ver todos los proyectos disponibles',
    'project.billable': 'Facturable',
    'project.non_billable': 'No facturable',
    'project.archived': 'Archivado',
    'project.details': 'Ver Detalles',
    'project.access': 'Solicitar Acceso',
    'project.statistics': 'Estadísticas del Proyecto',
    'project.overview': 'Resumen',
    'project.activity': 'Actividad',
    'project.time.entries': 'Registros de Tiempo',

    // Activity
    'activity.development': 'Actividad de Desarrollo',
    'activity.timeline': 'Cronología de Actividades',
    'activity.grid': 'Cuadrícula de Actividades',
    'activity.less': 'Menos',
    'activity.more': 'Más',
    'activity.view.details': 'Ver Detalles',
    'no.activity': 'No hay actividad registrada',
    'no.activity.short': 'Sin actividad',
    'future.date': 'Fecha futura',
    'hours.worked': 'horas trabajadas',
    'hour.worked': 'hora trabajada',

    // Time entries
    'time.entries.title': 'Registros de Tiempo',
    'time.entries.subtitle': 'Ver todos los registros de tiempo para este proyecto',
    'time.entries.back': 'Volver al Proyecto',
    'time.entry': 'Registro de Tiempo',
    'time.entry.description': 'Descripción',
    'time.entry.task': 'Tarea',
    'time.entry.start': 'Inicio',
    'time.entry.end': 'Fin',
    'time.entry.duration': 'Duración',
    'time.entry.user': 'Usuario',
    'time.entry.billable': 'Facturable',
    'total.hours': 'Horas Totales',
    'days.with.records': 'Días con Registros',
    'total.records': 'Registros Totales',

    // Timeline
    'timeline.day': 'Día',
    'timeline.week': 'Semana',
    'timeline.month': 'Mes',
    'timeline.year': 'Año',
    'total': 'total',
    'worked.periods': 'Períodos Trabajados',

    // Dashboard
    'dashboard': 'Panel',
    'dashboard.title': 'Panel de Control',
    'dashboard.subtitle': 'Resumen de tus actividades y estadísticas',
    'total.hours.week': 'Horas Totales (Semana)',
    'revenue.week': 'Ingresos (Semana)',
    'active.tasks': 'Tareas Activas',
    'team.members': 'Miembros del Equipo',
    'daily.hours.trend': 'Tendencia de Horas Diarias',
    'weekly.time.overview': 'Resumen Semanal',
    'weekly.project.overview': 'Resumen de Proyectos Semanales',

    // Statistics
    'statistics': 'Estadísticas',
    'statistics.overview': 'Resumen de Estadísticas',
    'statistics.this.week': 'Esta Semana',
    'statistics.this.month': 'Este Mes',
    'statistics.this.year': 'Este Año',
    'statistics.all.time': 'Todo el Tiempo',

    // Charts
    'chart.hours.per.day': 'Horas por Día',
    'chart.hours.per.week': 'Horas por Semana',
    'chart.hours.per.month': 'Horas por Mes',
    'chart.projects.comparison': 'Comparación de Proyectos',
    'chart.team.activity': 'Actividad del Equipo',
    'chart.productivity': 'Productividad',

    // Navigation
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.dashboard': 'Panel',
    'nav.settings': 'Configuración',
    'nav.help': 'Ayuda',

    // Footer
    'footer.powered.by': 'Desarrollado por',
    'footer.open.source': 'Código Abierto',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentación',
    'footer.support': 'Soporte',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',

    // Common
    'loading': 'Cargando...',
    'error': 'Error',
    'success': 'Éxito',
    'warning': 'Advertencia',
    'info': 'Información',
    'back': 'Volver',
    'next': 'Siguiente',
    'previous': 'Anterior',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'confirm': 'Confirmar',
    'delete': 'Eliminar',
    'edit': 'Editar',
    'view': 'Ver',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'sort': 'Ordenar',
    'refresh': 'Actualizar',
    'logout': 'Cerrar Sesión',
    'close': 'Cerrar',
    'open': 'Abrir',
    'yes': 'Sí',
    'no': 'No',
    'ok': 'OK',

    // Date/Time
    'today': 'Hoy',
    'yesterday': 'Ayer',
    'tomorrow': 'Mañana',
    'this.week': 'Esta Semana',
    'last.week': 'Semana Pasada',
    'next.week': 'Próxima Semana',
    'this.month': 'Este Mes',
    'last.month': 'Mes Pasado',
    'next.month': 'Próximo Mes',

    // Error Messages
    'api.error.message': 'Error al obtener datos de la API. Revisa tu configuración.',
    'retry': 'Intentar de Nuevo',
    'page.not.found': 'Página no encontrada',
    'permission.denied': 'Permiso denegado',
    'connection.error': 'Error de conexión',
    'timeout.error': 'Error de tiempo de espera',
    'unknown.error': 'Error desconocido'
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
    'projects.title': 'Projets',
    'projects.subtitle': 'Voir tous les projets disponibles',
    'project.billable': 'Facturable',
    'project.non_billable': 'Non facturable',
    'project.archived': 'Archivé',
    'project.details': 'Voir Détails',
    'project.access': 'Demander l\'Accès',
    'project.statistics': 'Statistiques du Projet',
    'project.overview': 'Aperçu',
    'project.activity': 'Activité',
    'project.time.entries': 'Entrées de Temps',

    // Activity
    'activity.development': 'Activité de Développement',
    'activity.timeline': 'Chronologie des Activités',
    'activity.grid': 'Grille d\'Activités',
    'activity.less': 'Moins',
    'activity.more': 'Plus',
    'activity.view.details': 'Voir les Détails',
    'no.activity': 'Aucune activité enregistrée',
    'no.activity.short': 'Aucune activité',
    'future.date': 'Date future',
    'hours.worked': 'heures travaillées',
    'hour.worked': 'heure travaillée',

    // Time entries
    'time.entries.title': 'Entrées de Temps',
    'time.entries.subtitle': 'Voir toutes les entrées de temps pour ce projet',
    'time.entries.back': 'Retour au Projet',
    'time.entry': 'Entrée de Temps',
    'time.entry.description': 'Description',
    'time.entry.task': 'Tâche',
    'time.entry.start': 'Début',
    'time.entry.end': 'Fin',
    'time.entry.duration': 'Durée',
    'time.entry.user': 'Utilisateur',
    'time.entry.billable': 'Facturable',
    'total.hours': 'Heures Totales',
    'days.with.records': 'Jours avec Enregistrements',
    'total.records': 'Enregistrements Totaux',

    // Timeline
    'timeline.day': 'Jour',
    'timeline.week': 'Semaine',
    'timeline.month': 'Mois',
    'timeline.year': 'Année',
    'total': 'total',
    'worked.periods': 'Périodes Travaillées',

    // Dashboard
    'dashboard': 'Tableau de Bord',
    'dashboard.title': 'Tableau de Bord',
    'dashboard.subtitle': 'Aperçu de vos activités et statistiques',
    'total.hours.week': 'Heures Totales (Semaine)',
    'revenue.week': 'Revenus (Semaine)',
    'active.tasks': 'Tâches Actives',
    'team.members': 'Membres de l\'Équipe',
    'daily.hours.trend': 'Tendance des Heures Quotidiennes',
    'weekly.time.overview': 'Aperçu Hebdomadaire',
    'weekly.project.overview': 'Aperçu des Projets Hebdomadaires',

    // Statistics
    'statistics': 'Statistiques',
    'statistics.overview': 'Aperçu des Statistiques',
    'statistics.this.week': 'Cette Semaine',
    'statistics.this.month': 'Ce Mois',
    'statistics.this.year': 'Cette Année',
    'statistics.all.time': 'Tout le Temps',

    // Charts
    'chart.hours.per.day': 'Heures par Jour',
    'chart.hours.per.week': 'Heures par Semaine',
    'chart.hours.per.month': 'Heures par Mois',
    'chart.projects.comparison': 'Comparaison des Projets',
    'chart.team.activity': 'Activité de l\'Équipe',
    'chart.productivity': 'Productivité',

    // Navigation
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.dashboard': 'Tableau de Bord',
    'nav.settings': 'Paramètres',
    'nav.help': 'Aide',

    // Footer
    'footer.powered.by': 'Propulsé par',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation',
    'footer.support': 'Support',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',

    // Common
    'loading': 'Chargement...',
    'error': 'Erreur',
    'success': 'Succès',
    'warning': 'Avertissement',
    'info': 'Information',
    'back': 'Retour',
    'next': 'Suivant',
    'previous': 'Précédent',
    'save': 'Sauvegarder',
    'cancel': 'Annuler',
    'confirm': 'Confirmer',
    'delete': 'Supprimer',
    'edit': 'Modifier',
    'view': 'Voir',
    'search': 'Rechercher',
    'filter': 'Filtrer',
    'sort': 'Trier',
    'refresh': 'Actualiser',
    'logout': 'Déconnexion',
    'close': 'Fermer',
    'open': 'Ouvrir',
    'yes': 'Oui',
    'no': 'Non',
    'ok': 'OK',

    // Date/Time
    'today': 'Aujourd\'hui',
    'yesterday': 'Hier',
    'tomorrow': 'Demain',
    'this.week': 'Cette Semaine',
    'last.week': 'Semaine Dernière',
    'next.week': 'Semaine Prochaine',
    'this.month': 'Ce Mois',
    'last.month': 'Mois Dernier',
    'next.month': 'Mois Prochain',

    // Error Messages
    'api.error.message': 'Erreur lors de la récupération des données de l\'API. Vérifiez votre configuration.',
    'retry': 'Réessayer',
    'page.not.found': 'Page non trouvée',
    'permission.denied': 'Permission refusée',
    'connection.error': 'Erreur de connexion',
    'timeout.error': 'Erreur de délai d\'attente',
    'unknown.error': 'Erreur inconnue'
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
    'projects.title': 'Projekte',
    'projects.subtitle': 'Alle verfügbaren Projekte anzeigen',
    'project.billable': 'Abrechenbar',
    'project.non_billable': 'Nicht abrechenbar',
    'project.archived': 'Archiviert',
    'project.details': 'Details Anzeigen',
    'project.access': 'Zugang Anfordern',
    'project.statistics': 'Projektstatistiken',
    'project.overview': 'Überblick',
    'project.activity': 'Aktivität',
    'project.time.entries': 'Zeiteinträge',

    // Activity
    'activity.development': 'Entwicklungsaktivität',
    'activity.timeline': 'Aktivitäts-Zeitlinie',
    'activity.grid': 'Aktivitätsraster',
    'activity.less': 'Weniger',
    'activity.more': 'Mehr',
    'activity.view.details': 'Details Anzeigen',
    'no.activity': 'Keine Aktivität aufgezeichnet',
    'no.activity.short': 'Keine Aktivität',
    'future.date': 'Zukünftiges Datum',
    'hours.worked': 'Stunden gearbeitet',
    'hour.worked': 'Stunde gearbeitet',

    // Time entries
    'time.entries.title': 'Zeiteinträge',
    'time.entries.subtitle': 'Alle Zeiteinträge für dieses Projekt anzeigen',
    'time.entries.back': 'Zurück zum Projekt',
    'time.entry': 'Zeiteintrag',
    'time.entry.description': 'Beschreibung',
    'time.entry.task': 'Aufgabe',
    'time.entry.start': 'Start',
    'time.entry.end': 'Ende',
    'time.entry.duration': 'Dauer',
    'time.entry.user': 'Benutzer',
    'time.entry.billable': 'Abrechenbar',
    'total.hours': 'Gesamtstunden',
    'days.with.records': 'Tage mit Aufzeichnungen',
    'total.records': 'Gesamtaufzeichnungen',

    // Timeline
    'timeline.day': 'Tag',
    'timeline.week': 'Woche',
    'timeline.month': 'Monat',
    'timeline.year': 'Jahr',
    'total': 'gesamt',
    'worked.periods': 'Arbeitsperioden',

    // Dashboard
    'dashboard': 'Dashboard',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Überblick über Ihre Aktivitäten und Statistiken',
    'total.hours.week': 'Gesamtstunden (Woche)',
    'revenue.week': 'Einnahmen (Woche)',
    'active.tasks': 'Aktive Aufgaben',
    'team.members': 'Teammitglieder',
    'daily.hours.trend': 'Tägliche Stunden-Trend',
    'weekly.time.overview': 'Wöchentliche Zeitübersicht',
    'weekly.project.overview': 'Wöchentliche Projektübersicht',

    // Statistics
    'statistics': 'Statistiken',
    'statistics.overview': 'Statistik-Überblick',
    'statistics.this.week': 'Diese Woche',
    'statistics.this.month': 'Dieser Monat',
    'statistics.this.year': 'Dieses Jahr',
    'statistics.all.time': 'Gesamte Zeit',

    // Charts
    'chart.hours.per.day': 'Stunden pro Tag',
    'chart.hours.per.week': 'Stunden pro Woche',
    'chart.hours.per.month': 'Stunden pro Monat',
    'chart.projects.comparison': 'Projektvergleich',
    'chart.team.activity': 'Teamaktivität',
    'chart.productivity': 'Produktivität',

    // Navigation
    'nav.home': 'Startseite',
    'nav.projects': 'Projekte',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Einstellungen',
    'nav.help': 'Hilfe',

    // Footer
    'footer.powered.by': 'Betrieben von',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Dokumentation',
    'footer.support': 'Support',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Bedingungen',

    // Common
    'loading': 'Laden...',
    'error': 'Fehler',
    'success': 'Erfolg',
    'warning': 'Warnung',
    'info': 'Information',
    'back': 'Zurück',
    'next': 'Weiter',
    'previous': 'Vorherig',
    'save': 'Speichern',
    'cancel': 'Abbrechen',
    'confirm': 'Bestätigen',
    'delete': 'Löschen',
    'edit': 'Bearbeiten',
    'view': 'Anzeigen',
    'search': 'Suchen',
    'filter': 'Filtern',
    'sort': 'Sortieren',
    'refresh': 'Aktualisieren',
    'logout': 'Abmelden',
    'close': 'Schließen',
    'open': 'Öffnen',
    'yes': 'Ja',
    'no': 'Nein',
    'ok': 'OK',

    // Date/Time
    'today': 'Heute',
    'yesterday': 'Gestern',
    'tomorrow': 'Morgen',
    'this.week': 'Diese Woche',
    'last.week': 'Letzte Woche',
    'next.week': 'Nächste Woche',
    'this.month': 'Dieser Monat',
    'last.month': 'Letzter Monat',
    'next.month': 'Nächster Monat',

    // Error Messages
    'api.error.message': 'Fehler beim Abrufen von Daten aus der API. Überprüfen Sie Ihre Konfiguration.',
    'retry': 'Erneut Versuchen',
    'page.not.found': 'Seite nicht gefunden',
    'permission.denied': 'Berechtigung verweigert',
    'connection.error': 'Verbindungsfehler',
    'timeout.error': 'Zeitüberschreitungsfehler',
    'unknown.error': 'Unbekannter Fehler'
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
    'projects.title': 'Проекты',
    'projects.subtitle': 'Просмотреть все доступные проекты',
    'project.billable': 'Оплачиваемый',
    'project.non_billable': 'Неоплачиваемый',
    'project.archived': 'Архивный',
    'project.details': 'Посмотреть Детали',
    'project.access': 'Запросить Доступ',
    'project.statistics': 'Статистика Проекта',
    'project.overview': 'Обзор',
    'project.activity': 'Активность',
    'project.time.entries': 'Записи Времени',

    // Activity
    'activity.development': 'Активность Разработки',
    'activity.timeline': 'Временная Шкала Активности',
    'activity.grid': 'Сетка Активности',
    'activity.less': 'Меньше',
    'activity.more': 'Больше',
    'activity.view.details': 'Просмотреть Детали',
    'no.activity': 'Активность не записана',
    'no.activity.short': 'Нет активности',
    'future.date': 'Будущая дата',
    'hours.worked': 'часов отработано',
    'hour.worked': 'час отработан',

    // Time entries
    'time.entries.title': 'Записи Времени',
    'time.entries.subtitle': 'Просмотреть все записи времени для этого проекта',
    'time.entries.back': 'Вернуться к Проекту',
    'time.entry': 'Запись Времени',
    'time.entry.description': 'Описание',
    'time.entry.task': 'Задача',
    'time.entry.start': 'Начало',
    'time.entry.end': 'Конец',
    'time.entry.duration': 'Продолжительность',
    'time.entry.user': 'Пользователь',
    'time.entry.billable': 'Оплачиваемый',
    'total.hours': 'Общее Время',
    'days.with.records': 'Дни с Записями',
    'total.records': 'Всего Записей',

    // Timeline
    'timeline.day': 'День',
    'timeline.week': 'Неделя',
    'timeline.month': 'Месяц',
    'timeline.year': 'Год',
    'total': 'всего',
    'worked.periods': 'Рабочие Периоды',

    // Dashboard
    'dashboard': 'Панель',
    'dashboard.title': 'Панель Управления',
    'dashboard.subtitle': 'Обзор ваших активностей и статистики',
    'total.hours.week': 'Общее Время (Неделя)',
    'revenue.week': 'Доход (Неделя)',
    'active.tasks': 'Активные Задачи',
    'team.members': 'Члены Команды',
    'daily.hours.trend': 'Тренд Ежедневных Часов',
    'weekly.time.overview': 'Недельный Обзор Времени',
    'weekly.project.overview': 'Недельный Обзор Проектов',

    // Statistics
    'statistics': 'Статистика',
    'statistics.overview': 'Обзор Статистики',
    'statistics.this.week': 'Эта Неделя',
    'statistics.this.month': 'Этот Месяц',
    'statistics.this.year': 'Этот Год',
    'statistics.all.time': 'Все Время',

    // Charts
    'chart.hours.per.day': 'Часов в День',
    'chart.hours.per.week': 'Часов в Неделю',
    'chart.hours.per.month': 'Часов в Месяц',
    'chart.projects.comparison': 'Сравнение Проектов',
    'chart.team.activity': 'Активность Команды',
    'chart.productivity': 'Продуктивность',

    // Navigation
    'nav.home': 'Главная',
    'nav.projects': 'Проекты',
    'nav.dashboard': 'Панель',
    'nav.settings': 'Настройки',
    'nav.help': 'Помощь',

    // Footer
    'footer.powered.by': 'Работает на',
    'footer.open.source': 'Открытый Код',
    'footer.github': 'GitHub',
    'footer.docs': 'Документация',
    'footer.support': 'Поддержка',
    'footer.privacy': 'Конфиденциальность',
    'footer.terms': 'Условия',

    // Common
    'loading': 'Загрузка...',
    'error': 'Ошибка',
    'success': 'Успех',
    'warning': 'Предупреждение',
    'info': 'Информация',
    'back': 'Назад',
    'next': 'Далее',
    'previous': 'Предыдущий',
    'save': 'Сохранить',
    'cancel': 'Отмена',
    'confirm': 'Подтвердить',
    'delete': 'Удалить',
    'edit': 'Редактировать',
    'view': 'Просмотр',
    'search': 'Поиск',
    'filter': 'Фильтр',
    'sort': 'Сортировка',
    'refresh': 'Обновить',
    'logout': 'Выйти',
    'close': 'Закрыть',
    'open': 'Открыть',
    'yes': 'Да',
    'no': 'Нет',
    'ok': 'OK',

    // Date/Time
    'today': 'Сегодня',
    'yesterday': 'Вчера',
    'tomorrow': 'Завтра',
    'this.week': 'Эта Неделя',
    'last.week': 'Прошлая Неделя',
    'next.week': 'Следующая Неделя',
    'this.month': 'Этот Месяц',
    'last.month': 'Прошлый Месяц',
    'next.month': 'Следующий Месяц',

    // Error Messages
    'api.error.message': 'Ошибка получения данных из API. Проверьте вашу конфигурацию.',
    'retry': 'Попробовать Снова',
    'page.not.found': 'Страница не найдена',
    'permission.denied': 'Доступ запрещен',
    'connection.error': 'Ошибка соединения',
    'timeout.error': 'Ошибка тайм-аута',
    'unknown.error': 'Неизвестная ошибка'
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
    'projects.title': '项目',
    'projects.subtitle': '查看所有可用项目',
    'project.billable': '可计费',
    'project.non_billable': '不可计费',
    'project.archived': '已归档',
    'project.details': '查看详情',
    'project.access': '请求访问',
    'project.statistics': '项目统计',
    'project.overview': '概览',
    'project.activity': '活动',
    'project.time.entries': '时间记录',

    // Activity
    'activity.development': '开发活动',
    'activity.timeline': '活动时间线',
    'activity.grid': '活动网格',
    'activity.less': '较少',
    'activity.more': '更多',
    'activity.view.details': '查看详情',
    'no.activity': '没有记录活动',
    'no.activity.short': '无活动',
    'future.date': '未来日期',
    'hours.worked': '小时已工作',
    'hour.worked': '小时已工作',

    // Time entries
    'time.entries.title': '时间记录',
    'time.entries.subtitle': '查看此项目的所有时间记录',
    'time.entries.back': '返回项目',
    'time.entry': '时间记录',
    'time.entry.description': '描述',
    'time.entry.task': '任务',
    'time.entry.start': '开始',
    'time.entry.end': '结束',
    'time.entry.duration': '持续时间',
    'time.entry.user': '用户',
    'time.entry.billable': '可计费',
    'total.hours': '总小时数',
    'days.with.records': '有记录的天数',
    'total.records': '总记录数',

    // Timeline
    'timeline.day': '天',
    'timeline.week': '周',
    'timeline.month': '月',
    'timeline.year': '年',
    'total': '总计',
    'worked.periods': '工作时段',

    // Dashboard
    'dashboard': '仪表板',
    'dashboard.title': '仪表板',
    'dashboard.subtitle': '您的活动和统计概览',
    'total.hours.week': '总小时数（周）',
    'revenue.week': '收入（周）',
    'active.tasks': '活跃任务',
    'team.members': '团队成员',
    'daily.hours.trend': '每日小时趋势',
    'weekly.time.overview': '每周时间概览',
    'weekly.project.overview': '每周项目概览',

    // Statistics
    'statistics': '统计',
    'statistics.overview': '统计概览',
    'statistics.this.week': '本周',
    'statistics.this.month': '本月',
    'statistics.this.year': '今年',
    'statistics.all.time': '所有时间',

    // Charts
    'chart.hours.per.day': '每日小时数',
    'chart.hours.per.week': '每周小时数',
    'chart.hours.per.month': '每月小时数',
    'chart.projects.comparison': '项目比较',
    'chart.team.activity': '团队活动',
    'chart.productivity': '生产力',

    // Navigation
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.dashboard': '仪表板',
    'nav.settings': '设置',
    'nav.help': '帮助',

    // Footer
    'footer.powered.by': '技术支持',
    'footer.open.source': '开源',
    'footer.github': 'GitHub',
    'footer.docs': '文档',
    'footer.support': '支持',
    'footer.privacy': '隐私',
    'footer.terms': '条款',

    // Common
    'loading': '加载中...',
    'error': '错误',
    'success': '成功',
    'warning': '警告',
    'info': '信息',
    'back': '返回',
    'next': '下一个',
    'previous': '上一个',
    'save': '保存',
    'cancel': '取消',
    'confirm': '确认',
    'delete': '删除',
    'edit': '编辑',
    'view': '查看',
    'search': '搜索',
    'filter': '筛选',
    'sort': '排序',
    'refresh': '刷新',
    'logout': '登出',
    'close': '关闭',
    'open': '打开',
    'yes': '是',
    'no': '否',
    'ok': '确定',

    // Date/Time
    'today': '今天',
    'yesterday': '昨天',
    'tomorrow': '明天',
    'this.week': '本周',
    'last.week': '上周',
    'next.week': '下周',
    'this.month': '本月',
    'last.month': '上月',
    'next.month': '下月',

    // Error Messages
    'api.error.message': '从 API 获取数据时出错。请检查您的配置。',
    'retry': '重试',
    'page.not.found': '页面未找到',
    'permission.denied': '权限被拒绝',
    'connection.error': '连接错误',
    'timeout.error': '超时错误',
    'unknown.error': '未知错误'
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
