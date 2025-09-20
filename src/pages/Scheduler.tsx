import React from 'react';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import NotesSection from '../components/NotesSection';
import UtilizationChart from '../components/UtilizationChart';
import AlertList from '../components/AlertList';
import { FaTasks, FaBullseye, FaExclamationCircle, FaChartPie } from 'react-icons/fa';
import { utilizationData, clashAlerts } from '../mockData';
import DashboardLayout from '@/components/DashboardLayout';

const SchedulerDashboard: React.FC = () => {
  return (
    <DashboardLayout>
       <div className="p-6">
      <h1 className="text-3xl font-bold text-text-dark mb-1">Scheduler</h1>
      <p className="text-text-light mb-6">Constraint-aware planning and scenario modeling</p>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
         <KPICard title="Schedule Adherence" value="98.2%" change="↑ 1.2%" isPositive={true}>
            <FaTasks className="text-green-500" />
          </KPICard>
          <KPICard title="Constraint Violations" value="3" change="↑ 1" isPositive={false}>
            <FaExclamationCircle className="text-red-500" />
          </KPICard>
          <KPICard title="Plan Achievement" value="95.5%" change="↓ 0.5%" isPositive={false}>
            <FaBullseye className="text-orange-500" />
          </KPICard>
          <KPICard title="Overall Utilization" value="85.0%" change="↑ 3.0%" isPositive={true}>
            <FaChartPie className="text-primary-blue" />
          </KPICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ChartCard title="Utilization Heatmap (Week View)">
            <UtilizationChart data={utilizationData} />
          </ChartCard>
          <NotesSection />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ChartCard title="Setup Calendar (Clash Alerts)">
            <AlertList alerts={clashAlerts} />
          </ChartCard>
          <ChartCard title="Scenario Planning">
            <div className="space-y-3 text-center">
              <button className="w-full p-3 bg-blue-100 text-primary-blue font-semibold rounded-md hover:bg-blue-200">Compare A/B Scenarios</button>
              <button className="w-full p-3 bg-gray-100 text-text-dark font-medium rounded-md hover:bg-gray-200">Simulate Holiday Surge</button>
              <button className="w-full p-3 bg-gray-100 text-text-dark font-medium rounded-md hover:bg-gray-200">Model Subcontract Impact</button>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
    </DashboardLayout>
   
  );
};

export default SchedulerDashboard;