
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WeeklyHistory } from '@/services/chartApi';
import { format, parseISO } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeeklyTimeChartProps {
  data: WeeklyHistory[];
}

const chartConfig = {
  hours: {
    label: "Total Hours",
    color: "hsl(var(--chart-1))",
  },
};

const WeeklyTimeChart: React.FC<WeeklyTimeChartProps> = ({ data }) => {
  const { t } = useLanguage();

  const formattedData = data.map(item => ({
    ...item,
    date: format(parseISO(item.date), 'MMM dd'),
    hours: item.duration / 3600, // Convert seconds to hours
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="hours" fill="var(--color-hours)" />
      </BarChart>
    </ChartContainer>
  );
};

export default WeeklyTimeChart;
