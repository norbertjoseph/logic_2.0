// src/components/UtilizationChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { MachineUtilization } from '../types';

interface ChartProps {
  data: MachineUtilization[];
}

const UtilizationChart: React.FC<ChartProps> = ({ data }) => (
  <div style={{ width: '100%', height: 280 }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#8A94A6" />
        <YAxis tick={{ fontSize: 12 }} stroke="#8A94A6" unit="%" />
        <Tooltip
          formatter={(value: number) => [`${value}%`, 'Utilization']}
          cursor={{ fill: 'rgba(247, 249, 252, 0.7)' }}
        />
        <Bar dataKey="utilization" fill="#4A90E2" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default UtilizationChart;