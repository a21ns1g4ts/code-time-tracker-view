
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WeeklyTime } from '@/services/chartApi';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeeklyTimeChartProps {
  data: WeeklyTime[];
}

const chartConfig = {
  total_time: {
    label: "Total Time",
    color: "hsl(var(--chart-1))",
  },
  billable_time: {
    label: "Billable Time",
    color: "hsl(var(--chart-2))",
  },
};

const WeeklyTimeChart: React.FC<WeeklyTimeChartProps> = ({ data }) => {
  const { t } = useLanguage();

  const formattedData = data.map(item => ({
    ...item,
    total_time: item.total_time / 3600, // Convert to hours
    billable_time: item.billable_time / 3600,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total_time" fill="var(--color-total_time)" />
        <Bar dataKey="billable_time" fill="var(--color-billable_time)" />
      </BarChart>
    </ChartContainer>
  );
};

export default WeeklyTimeChart;
