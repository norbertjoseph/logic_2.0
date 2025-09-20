// src/components/AlertList.tsx
import React from 'react';
import { FaExclamationTriangle, FaTools } from 'react-icons/fa';
import type { ClashAlert } from '../types';

interface AlertListProps {
  alerts: ClashAlert[];
}

const alertConfig = {
    Clash: { icon: <FaExclamationTriangle />, text: 'text-red-600', bg: 'bg-red-50' },
    Maintenance: { icon: <FaTools />, text: 'text-orange-600', bg: 'bg-orange-50' },
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => (
  <div className="space-y-3">
    {alerts.map(alert => {
        const config = alertConfig[alert.type];
        return (
            <div key={alert.id} className={`flex items-center p-3 rounded-md ${config.bg}`}>
                <div className={`mr-3 text-lg ${config.text}`}>{config.icon}</div>
                <div className="flex-1">
                    <p className="font-semibold text-sm text-text-dark">{alert.description}</p>
                    <p className="text-xs text-text-light">
                        Time: {alert.time} | Priority: <span className="font-medium">{alert.severity}</span>
                    </p>
                </div>
            </div>
        )
    })}
  </div>
);

export default AlertList;