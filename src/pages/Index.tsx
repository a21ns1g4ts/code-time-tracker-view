
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Settings, BarChart3, Calendar } from 'lucide-react';
import ConfigModal from '@/components/ConfigModal';
import ActivityGrid from '@/components/ActivityGrid';
import Timeline from '@/components/Timeline';
import { fetchTimeEntries } from '@/services/api';
import { isConfigured } from '@/services/config';
import { groupEntriesByDay, generateWeeksData, formatDuration } from '@/utils/dataProcessor';
import { DayData } from '@/types/api';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [showConfig, setShowConfig] = useState(!isConfigured());
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [configured, setConfigured] = useState(isConfigured());

  // Fix for the first error - ensure 'enabled' is a boolean
  const { data: timeEntries, isLoading, error, refetch } = useQuery({
    queryKey: ['timeEntries'],
    queryFn: fetchTimeEntries,
    enabled: configured,  // This is now a boolean
    refetchOnWindowFocus: false,
  });

  const dayData = timeEntries ? groupEntriesByDay(timeEntries.data) : [];
  const weeksData = generateWeeksData(dayData);
  
  const totalHours = dayData.reduce((sum, day) => sum + day.totalDuration, 0);
  const averageDaily = dayData.length > 0 ? totalHours / dayData.length : 0;
  const daysWorked = dayData.filter(day => day.totalDuration > 0).length;

  // Fix for the second error - ensure setConfigured receives a boolean
  const handleConfigSave = () => {
    setConfigured(true);  // This is correctly setting a boolean state
    refetch();
  };

  const handleDayClick = (day: DayData) => {
    setSelectedDay(day);
  };

  if (!configured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <CardTitle>Configuração Necessária</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Configure seu Bearer Token e Organization ID para começar a acompanhar sua rotina de trabalho.
            </p>
            <Button onClick={() => setShowConfig(true)}>
              Configurar API
            </Button>
          </CardContent>
        </Card>
        <ConfigModal 
          open={showConfig} 
          onClose={() => setShowConfig(false)}
          onSave={handleConfigSave}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <CardTitle>Erro na API</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Erro ao buscar dados da API. Verifique suas configurações.
            </p>
            <div className="space-x-2">
              <Button onClick={() => setShowConfig(true)} variant="outline">
                Configurações
              </Button>
              <Button onClick={() => refetch()}>
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
        <ConfigModal 
          open={showConfig} 
          onClose={() => setShowConfig(false)}
          onSave={handleConfigSave}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Work Tracker</h1>
            <p className="text-gray-600">Acompanhe sua rotina de desenvolvimento</p>
          </div>
          <Button onClick={() => setShowConfig(true)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Horas</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatDuration(totalHours)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Média Diária</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatDuration(averageDaily)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dias Trabalhados</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{daysWorked}</div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Grid */}
            <ActivityGrid weeksData={weeksData} onDayClick={handleDayClick} />

            {/* Timeline */}
            {selectedDay && selectedDay.totalDuration > 0 && (
              <Timeline dayData={selectedDay} />
            )}
          </div>
        )}

        <ConfigModal 
          open={showConfig} 
          onClose={() => setShowConfig(false)}
          onSave={handleConfigSave}
        />
      </div>
    </div>
  );
};

export default Index;
