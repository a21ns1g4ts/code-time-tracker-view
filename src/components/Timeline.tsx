import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { DayData } from '@/types/api';
import { formatDuration } from '@/utils/dataProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineProps {
  dayData: DayData;
}

const Timeline: React.FC<TimelineProps> = ({ dayData }) => {
  const { t, language } = useLanguage();
  const locale = language === 'pt' ? ptBR : enUS;

  const getTimelinePosition = (timeString: string): number => {
    const date = parseISO(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // Map 0-1440 minutes (24 hours) to 0-100%
    return (totalMinutes / 1440) * 100;
  };

  const getTimelineWidth = (start: string, end: string): number => {
    const startPos = getTimelinePosition(start);
    const endPos = getTimelinePosition(end);
    return endPos - startPos;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>
            {t('timeline.day')} - {format(parseISO(dayData.date), 'dd/MM/yyyy', { locale })}
          </span>
          <span className="text-sm font-normal text-gray-500">
            ({formatDuration(dayData.totalDuration)} {t('total')})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Hour markers */}
          <div className="relative h-8 bg-gray-50 rounded">
            <div className="absolute inset-0 flex">
              {Array.from({ length: 25 }, (_, i) => (
                <div 
                  key={i} 
                  className="flex-1 border-r border-gray-200 text-xs text-gray-400 flex items-center justify-center"
                >
                  {i % 4 === 0 && `${i}h`}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline entries */}
          <div className="relative h-16 bg-gray-50 rounded overflow-hidden">
            {dayData.entries.map((entry, index) => {
              const startPos = getTimelinePosition(entry.start);
              const width = getTimelineWidth(entry.start, entry.end);
              
              return (
                <div
                  key={entry.id}
                  className={`absolute h-12 top-2 bg-blue-500 hover:bg-blue-600 rounded shadow-sm cursor-pointer transition-colors group`}
                  style={{
                    left: `${startPos}%`,
                    width: `${width}%`,
                    minWidth: '2px'
                  }}
                  title={`${format(parseISO(entry.start), 'HH:mm')} - ${format(parseISO(entry.end), 'HH:mm')} (${formatDuration(entry.duration)})`}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {format(parseISO(entry.start), 'HH:mm')} - {format(parseISO(entry.end), 'HH:mm')}
                    <br />
                    {formatDuration(entry.duration)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Entry details */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">{t('worked.periods')}</h4>
            {dayData.entries.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm">
                    {format(parseISO(entry.start), 'HH:mm')} - {format(parseISO(entry.end), 'HH:mm')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {formatDuration(entry.duration)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
