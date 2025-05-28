
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { TeamActivity } from '@/services/chartApi';
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
          {data.map((member) => (
            <div key={member.member_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                {member.description && (
                  <p className="text-sm text-gray-600">{member.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  {member.status ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500" />
                  )}
                  <span className="text-xs text-gray-500">
                    {member.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamActivityCard;
