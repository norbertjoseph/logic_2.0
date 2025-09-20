import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';
import type { PredictiveSignal } from '../types';

interface ChartProps {
  data: PredictiveSignal[];
}

const PredictiveSignalChart: React.FC<ChartProps> = ({ data }) => {
  const anomaly = data.find(d => d.anomaly);

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#8A94A6" />
          <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} stroke="#8A94A6" unit="%" />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Quality']}
            cursor={{ stroke: '#4A90E2', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          {anomaly && (
            <ReferenceDot
              x={anomaly.time}
              y={anomaly.value}
              r={8}
              fill="#D0021B"
              stroke="#fff"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictiveSignalChart;