
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS, es, fr, de } from 'date-fns/locale';
import { WeekData, DayData } from '@/types/api';
import { formatDuration, generateWeeksData, groupEntriesByDay } from '@/utils/dataProcessor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import DayDetailsModal from './DayDetailsModal';

interface ActivityGridProps {
  data: { [key: string]: DayData };
  projectId: string;
  onDayClick?: (day: DayData) => void;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ data, projectId, onDayClick }) => {
  const { t, language } = useLanguage();
  const locales = { pt: ptBR, en: enUS, es: es, fr: fr, de: de };
  const locale = locales[language as keyof typeof locales] || enUS;
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert data object to array and generate weeks data
  const dayDataArray = Object.values(data);
  const weeksData = generateWeeksData(dayDataArray);

  const getIntensityColor = (intensity: number): string => {
    const colors = [
      'bg-gray-100 border-gray-200', // 0
      'bg-green-100 border-green-200', // 1
      'bg-green-300 border-green-400', // 2
      'bg-green-500 border-green-600', // 3
      'bg-green-700 border-green-800', // 4
    ];
    return colors[intensity] || colors[0];
  };

  const getDayLabel = (dayIndex: number): string => {
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    return days[dayIndex];
  };

  const handleDayClick = (day: DayData) => {
    if (day && day.totalDuration > 0) {
      if (onDayClick) {
        onDayClick(day);
      }
      
      // Open modal with day details
      setSelectedDay(day);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const monthLabels = weeksData.map((week, weekIndex) => {
    const firstDay = week.days.find(day => day !== null);
    if (!firstDay) return null;
    
    const date = parseISO(firstDay.date);
    const isFirstWeekOfMonth = weekIndex === 0 || 
      format(date, 'MM') !== format(parseISO(weeksData[weekIndex - 1]?.days?.find(d => d !== null)?.date || firstDay.date), 'MM');
    
    return isFirstWeekOfMonth ? format(date, 'MMM', { locale }) : null;
  });

  return (
    <>
      <TooltipProvider>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('activity.development')}</h2>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{t('activity.less')}</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map(intensity => (
                  <div
                    key={intensity}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                  />
                ))}
              </div>
              <span>{t('activity.more')}</span>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex flex-col space-y-1 mr-2">
              <div className="h-4"></div>
              {[1, 3, 5].map(dayIndex => (
                <div key={dayIndex} className="h-3 flex items-center text-xs text-gray-500">
                  {getDayLabel(dayIndex)}
                </div>
              ))}
            </div>
            
            <div className="flex-1">
              <div className="flex space-x-1 mb-2">
                {monthLabels.map((label, index) => (
                  <div key={index} className="text-xs text-gray-500 w-3">
                    {label}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-1">
                {weeksData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col space-y-1">
                    {week.days.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 rounded-sm border cursor-pointer transition-all hover:ring-2 hover:ring-gray-400 ${
                              day ? getIntensityColor(day.intensity) : 'bg-gray-50 border-gray-100'
                            }`}
                            onClick={() => day && handleDayClick(day)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            {day ? (
                              <>
                                <div className="font-medium">
                                  {format(parseISO(day.date), 'dd/MM/yyyy', { locale })}
                                </div>
                                <div>
                                  {day.totalDuration > 0 
                                    ? `${formatDuration(day.totalDuration)} ${t('hours.worked')}`
                                    : t('no.activity.short')
                                  }
                                </div>
                              </>
                            ) : (
                              t('future.date')
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>

      <DayDetailsModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        dayData={selectedDay}
      />
    </>
  );
};

export default ActivityGrid;
