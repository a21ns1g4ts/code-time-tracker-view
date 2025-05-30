import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // App
    'app.title': 'solidtime Stats',
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
    'password.modal.description': 'Este projeto requer uma senha para acesso. Por favor, digite a senha para o projeto {{projectName}}.',
    'password.modal.password.label': 'Senha',
    'password.modal.password.placeholder': 'Digite a senha do projeto',
    'password.modal.cancel': 'Cancelar',
    'password.modal.access': 'Acessar',
    'password.modal.verifying': 'Verificando...',
    'password.modal.error': 'Erro',
    'password.modal.enter.password': 'Por favor, digite a senha',
    'password.modal.access.granted': 'Acesso concedido',
    'password.modal.access.granted.message': 'Você agora tem acesso ao projeto {{projectName}}',
    'password.modal.incorrect.password': 'Senha incorreta',
    'password.modal.verification.error': 'Ocorreu um erro ao verificar a senha. Tente novamente.',

    // Projects
    'projects': 'Projetos',

    // Footer
    'footer.powered.by': 'Desenvolvido por',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentação'
  },
  en: {
    // App
    'app.title': 'solidtime Stats',
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
    'password.modal.description': 'This project requires a password for access. Please enter the password for project {{projectName}}.',
    'password.modal.password.label': 'Password',
    'password.modal.password.placeholder': 'Enter project password',
    'password.modal.cancel': 'Cancel',
    'password.modal.access': 'Access',
    'password.modal.verifying': 'Verifying...',
    'password.modal.error': 'Error',
    'password.modal.enter.password': 'Please enter the password',
    'password.modal.access.granted': 'Access granted',
    'password.modal.access.granted.message': 'You now have access to project {{projectName}}',
    'password.modal.incorrect.password': 'Incorrect password',
    'password.modal.verification.error': 'An error occurred while verifying the password. Please try again.',

    // Projects
    'projects': 'Projects',

    // Footer
    'footer.powered.by': 'Powered by',
    'footer.open.source': 'Open Source',
    'footer.github': 'GitHub',
    'footer.docs': 'Documentation'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
        setLanguage('pt');
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
