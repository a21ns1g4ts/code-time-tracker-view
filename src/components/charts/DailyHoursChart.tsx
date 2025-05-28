
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DailyTrackedHours } from '@/services/chartApi';
import { format, parseISO } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface DailyHoursChartProps {
  data: DailyTrackedHours[];
}

const chartConfig = {
  hours: {
    label: "Total Hours",
    color: "hsl(var(--chart-1))",
  },
};

const DailyHoursChart: React.FC<DailyHoursChartProps> = ({ data }) => {
  const { t } = useLanguage();

  const formattedData = data.map(item => ({
    ...item,
    date: format(parseISO(item.date), 'MMM dd'),
    hours: item.duration / 3600, // Convert seconds to hours
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <AreaChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="hours"
          stroke="var(--color-hours)"
          fill="var(--color-hours)"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default DailyHoursChart;
