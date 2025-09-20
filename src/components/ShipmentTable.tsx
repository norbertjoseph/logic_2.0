import React from 'react';
import type { Shipment } from '../types';

const statusStyles: Record<Shipment['status'], string> = {
  Delayed: 'bg-red-100 text-alert-red',
  'At Risk': 'bg-orange-100 text-warning-orange',
  'On Time': 'bg-green-100 text-opportunity-green',
};

const ShipmentTable: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-text-light uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">Shipment ID</th>
          <th scope="col" className="px-4 py-3">Destination</th>
          <th scope="col" className="px-4 py-3">Status</th>
          <th scope="col" className="px-4 py-3">ETA</th>
          <th scope="col" className="px-4 py-3">Carrier</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map(item => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium text-text-dark">{item.id}</td>
            <td className="px-4 py-3 text-text-dark">{item.destination}</td>
            <td className="px-4 py-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}>{item.status}</span>
            </td>
            <td className="px-4 py-3 text-text-dark">{item.eta}</td>
            <td className="px-4 py-3 text-text-dark">{item.carrier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ShipmentTable;