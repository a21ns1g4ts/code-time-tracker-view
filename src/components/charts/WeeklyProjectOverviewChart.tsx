
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WeeklyProjectOverview } from '@/services/chartApi';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeeklyProjectOverviewChartProps {
  data: WeeklyProjectOverview[];
}

const chartConfig = {
  projects: {
    label: "Projects",
  },
};

const WeeklyProjectOverviewChart: React.FC<WeeklyProjectOverviewChartProps> = ({ data }) => {
  const { t } = useLanguage();

  const formattedData = data.map(item => ({
    ...item,
    hours: item.value / 3600, // Convert seconds to hours
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <PieChart>
        <Pie
          data={formattedData}
          dataKey="hours"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, hours }) => `${name}: ${hours.toFixed(1)}h`}
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  );
};

export default WeeklyProjectOverviewChart;
