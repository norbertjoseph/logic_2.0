import React from 'react';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import ShipmentTable from '../components/ShipmentTable';
import CostByModeChart from '../components/CostByModeChart';
import NotesSection from '../components/NotesSection';
import { FaTruck, FaCheckCircle, FaShippingFast, FaClock } from 'react-icons/fa';
import { criticalShipments, costByModeData } from '../mockData';
import DashboardLayout from '@/components/DashboardLayout';

const LogisticsDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-text-dark mb-1">Logistics</h1>
      <p className="text-text-light mb-6">Real-time dashboard for comprehensive logistics oversight</p>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KPICard title="On-Time Delivery" value="94.7%" change="↑ 2.1%" isPositive={true}>
          <FaCheckCircle className="text-green-500" />
        </KPICard>
        <KPICard title="In-Transit Shipments" value="842" change="↓ 1.5%" isPositive={true}>
          <FaTruck className="text-primary-blue" />
        </KPICard>
        <KPICard title="Avg. Transit Time" value="3.1 Days" change="↑ 0.2 Days" isPositive={false}>
          <FaShippingFast className="text-orange-500" />
        </KPICard>
        <KPICard title="Avg. Dwell Time" value="18 Hours" change="↑ 1.2 Hours" isPositive={false}>
          <FaClock className="text-red-500" />
        </KPICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ChartCard title="Critical Shipments (Dispatch/Receipt)">
            <ShipmentTable shipments={criticalShipments} />
          </ChartCard>
          <NotesSection />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ChartCard title="Transport Utilization (Cost % by Mode)">
            <CostByModeChart data={costByModeData} />
          </ChartCard>
          <ChartCard title="Warehouse Capacity">
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-primary-blue">88%</p>
              <p className="text-sm text-text-light">Bin Occupancy</p>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
    </DashboardLayout>
    
  );
};

export default LogisticsDashboard;