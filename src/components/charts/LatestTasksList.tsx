
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';
import { LatestTask } from '@/services/chartApi';
import { formatDuration } from '@/utils/dataProcessor';
import { format, parseISO } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface LatestTasksListProps {
  data: LatestTask[];
}

const LatestTasksList: React.FC<LatestTasksListProps> = ({ data }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {t('latest.tasks')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{task.name}</h4>
                <p className="text-sm text-gray-600">{task.project_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {format(parseISO(task.last_worked), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">
                  {formatDuration(task.time_spent)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestTasksList;
