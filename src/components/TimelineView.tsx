
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { DayData } from '@/types/api';
import { formatDuration } from '@/utils/dataProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Timeline from './Timeline';

interface TimelineViewProps {
  data: any[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ data }) => {
  const { t, language } = useLanguage();

  // Group timeline data by date
  const groupedByDate: { [key: string]: DayData } = {};
  
  data.forEach(entry => {
    const date = entry.date;
    if (!groupedByDate[date]) {
      groupedByDate[date] = {
        date,
        totalDuration: 0,
        entries: [],
        intensity: 0
      };
    }
    groupedByDate[date].entries.push(entry);
    groupedByDate[date].totalDuration += entry.duration;
  });

  // Calculate intensity for each day
  Object.values(groupedByDate).forEach(day => {
    const hours = day.totalDuration / 3600;
    let intensity = 0;
    if (hours > 0.5) intensity = 1;
    if (hours > 2) intensity = 2;
    if (hours > 4) intensity = 3;
    if (hours > 6) intensity = 4;
    day.intensity = intensity;
  });

  const sortedDays = Object.values(groupedByDate).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-4">
      {sortedDays.map(dayData => (
        <div key={dayData.date} id={`day-${dayData.date}`}>
          <Timeline dayData={dayData} />
        </div>
      ))}
    </div>
  );
};

export default TimelineView;
