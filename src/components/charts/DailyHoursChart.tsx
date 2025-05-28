
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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
  billable_hours: {
    label: "Billable Hours",
    color: "hsl(var(--chart-2))",
  },
};

const DailyHoursChart: React.FC<DailyHoursChartProps> = ({ data }) => {
  const { t } = useLanguage();

  const formattedData = data.map(item => ({
    ...item,
    date: format(parseISO(item.date), 'MMM dd'),
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
          stackId="1"
          stroke="var(--color-hours)"
          fill="var(--color-hours)"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="billable_hours"
          stackId="1"
          stroke="var(--color-billable_hours)"
          fill="var(--color-billable_hours)"
          fillOpacity={0.8}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default DailyHoursChart;
