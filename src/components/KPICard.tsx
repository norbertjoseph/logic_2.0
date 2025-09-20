import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  children: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, isPositive, children }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-border-color shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-light">{title}</span>
        {children}
      </div>
      <p className="text-3xl font-bold text-text-dark">{value}</p>
      <p className={`text-xs font-medium mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} vs last period
      </p>
    </div>
  );
};
export default KPICard;