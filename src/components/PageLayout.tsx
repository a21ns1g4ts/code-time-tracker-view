
import React from 'react';
import TopNavigation from './TopNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
