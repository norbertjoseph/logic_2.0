import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartProps { data: { name: string; value: number }[]; }

const COLORS = ['#4A90E2', '#82D8C3', '#A3A1FB', '#F5A623'];

const CostByModeChart: React.FC<ChartProps> = ({ data }) => (
  <div style={{ width: '100%', height: 250 }}>
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 13 }} stroke="#2C3E50" width={80} />
        <Tooltip formatter={(value: number) => `${value}%`} cursor={{ fill: 'rgba(247, 249, 252, 0.7)' }} />
        <Bar dataKey="value" barSize={25} radius={[0, 5, 5, 0]}>
          {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
export default CostByModeChart;