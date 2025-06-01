
import { useState, useEffect } from 'react';

export const useSelectedDay = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    const storedDay = localStorage.getItem('selectedDay');
    if (storedDay) {
      setSelectedDay(storedDay);
    }
  }, []);

  const updateSelectedDay = (day: string) => {
    setSelectedDay(day);
    localStorage.setItem('selectedDay', day);
  };

  const clearSelectedDay = () => {
    setSelectedDay(null);
    localStorage.removeItem('selectedDay');
  };

  return {
    selectedDay,
    updateSelectedDay,
    clearSelectedDay
  };
};
