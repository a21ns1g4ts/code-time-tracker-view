
import { useState, useEffect } from 'react';

export const useSelectedSection = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    const storedSection = localStorage.getItem('selectedSection');
    if (storedSection) {
      setSelectedSection(storedSection);
    }
  }, []);

  const updateSelectedSection = (section: string) => {
    setSelectedSection(section);
    localStorage.setItem('selectedSection', section);
  };

  const clearSelectedSection = () => {
    setSelectedSection(null);
    localStorage.removeItem('selectedSection');
  };

  return {
    selectedSection,
    updateSelectedSection,
    clearSelectedSection
  };
};
