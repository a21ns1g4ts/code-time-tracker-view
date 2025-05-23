
import { format, startOfWeek, addDays, parseISO, isSameDay } from 'date-fns';
import { TimeEntry, DayData, WeekData } from '@/types/api';

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const groupEntriesByDay = (entries: TimeEntry[]): DayData[] => {
  const groupedByDate: { [key: string]: TimeEntry[] } = {};
  
  entries.forEach(entry => {
    const date = format(parseISO(entry.start), 'yyyy-MM-dd');
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(entry);
  });

  return Object.entries(groupedByDate).map(([date, dayEntries]) => {
    const totalDuration = dayEntries.reduce((sum, entry) => sum + entry.duration, 0);
    const hours = totalDuration / 3600;
    
    // Calculate intensity based on hours worked (0-4 scale)
    let intensity = 0;
    if (hours > 0.5) intensity = 1;
    if (hours > 2) intensity = 2;
    if (hours > 4) intensity = 3;
    if (hours > 6) intensity = 4;

    return {
      date,
      totalDuration,
      entries: dayEntries.sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime()),
      intensity
    };
  }).sort((a, b) => a.date.localeCompare(b.date));
};

export const generateWeeksData = (dayData: DayData[], weeks: number = 26): WeekData[] => {
  const today = new Date();
  const endDate = today;
  const startDate = addDays(startOfWeek(endDate), -weeks * 7);
  
  const weeksData: WeekData[] = [];
  
  for (let weekIndex = 0; weekIndex < weeks; weekIndex++) {
    const weekStart = addDays(startDate, weekIndex * 7);
    const days: (DayData | null)[] = [];
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = addDays(weekStart, dayIndex);
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      
      // Don't show future dates
      if (currentDate > today) {
        days.push(null);
        continue;
      }
      
      const existingDay = dayData.find(day => day.date === dateStr);
      if (existingDay) {
        days.push(existingDay);
      } else {
        days.push({
          date: dateStr,
          totalDuration: 0,
          entries: [],
          intensity: 0
        });
      }
    }
    
    weeksData.push({ days });
  }
  
  return weeksData;
};
