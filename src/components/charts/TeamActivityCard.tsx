
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, FolderOpen } from 'lucide-react';
import { TeamActivity } from '@/services/chartApi';
import { formatDuration } from '@/utils/dataProcessor';
import { format, parseISO } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamActivityCardProps {
  data: TeamActivity[];
}

const TeamActivityCard: React.FC<TeamActivityCardProps> = ({ data }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {t('team.activity')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{member.user_name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    {formatDuration(member.total_time)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FolderOpen className="h-3 w-3" />
                    {member.projects_count} {t('projects')}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('last.activity')}: {format(parseISO(member.last_activity), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamActivityCard;
