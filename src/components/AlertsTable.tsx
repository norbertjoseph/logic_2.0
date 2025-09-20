import React from 'react';
import type { Alert } from '../types';
import { FaCheck, FaUserPlus } from 'react-icons/fa';

interface AlertsTableProps {
  alerts: Alert[];
}

const severityStyles: Record<Alert['severity'], string> = {
  High: 'bg-red-100 text-alert-red',
  Medium: 'bg-orange-100 text-warning-orange',
  Low: 'bg-blue-100 text-primary-blue',
};

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-text-light uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">Description</th>
          <th scope="col" className="px-4 py-3">Severity</th>
          <th scope="col" className="px-4 py-3">Owner</th>
          <th scope="col" className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map(alert => (
          <tr key={alert.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-4">
                <p className="font-medium text-text-dark">{alert.description}</p>
                <p className="text-xs text-text-light">{alert.type} - ID: {alert.id}</p>
            </td>
            <td className="px-4 py-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${severityStyles[alert.severity]}`}>
                {alert.severity}
              </span>
            </td>
            <td className="px-4 py-4 font-medium text-text-dark">{alert.owner}</td>
            <td className="px-4 py-4">
                {alert.status === 'New' ? (
                    <div className="flex items-center gap-2">
                         <button className="flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-800">
                            <FaCheck /> Acknowledge
                         </button>
                         <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800">
                            <FaUserPlus /> Reassign
                         </button>
                    </div>
                ) : (
                    <span className="text-xs font-medium text-text-light">Acknowledged</span>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AlertsTable;