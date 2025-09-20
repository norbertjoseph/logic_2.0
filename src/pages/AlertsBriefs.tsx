import React from 'react';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import NotesSection from '../components/NotesSection';
import AlertsTable from '../components/AlertsTable';
import BriefExportsCard from '../components/BriefExportsCard';
import { FaExclamationTriangle, FaBell, FaFileSignature, FaPaperPlane } from 'react-icons/fa';
import { alertsData } from '../mockData';
import DashboardLayout from '@/components/DashboardLayout';

const AlertsBriefsDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-text-dark mb-1">Alerts & Briefs</h1>
      <p className="text-text-light mb-6">Manage exceptions, SLA breaches, and automated reports</p>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
         <KPICard title="New Exceptions" value="3" change="since last login" isPositive={false}>
            <FaExclamationTriangle className="text-red-500" />
          </KPICard>
          <KPICard title="SLA Breaches Today" value="2" change="↑ 1" isPositive={false}>
            <FaBell className="text-orange-500" />
          </KPICard>
          <KPICard title="Total Active Alerts" value="5" change="↓ 2" isPositive={true}>
            <FaFileSignature className="text-primary-blue" />
          </KPICard>
          <KPICard title="Daily Briefs Sent" value="4" change="to role groups" isPositive={true}>
            <FaPaperPlane className="text-green-500" />
          </KPICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ChartCard title="Exceptions & SLA Breaches">
            <AlertsTable alerts={alertsData} />
          </ChartCard>
          <NotesSection />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <BriefExportsCard title="Daily Brief" isBrief={true} />
          <BriefExportsCard title="Exports" isBrief={false} />
        </div>
      </div>
    </div>
    </DashboardLayout>
    
  );
};

export default AlertsBriefsDashboard;