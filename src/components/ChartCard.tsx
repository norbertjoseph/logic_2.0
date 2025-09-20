import React from 'react';

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-border-color shadow-sm">
    <h3 className="font-semibold text-lg text-text-dark mb-4">{title}</h3>
    {children}
  </div>
);
export default ChartCard;