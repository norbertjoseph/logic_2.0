import React from 'react';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import NotesSection from '../components/NotesSection';
import PredictiveSignalChart from '../components/PredictiveSignalChart';
import CEOBriefCard from '../components/CEOBriefCard';
import { FaBrain, FaPlayCircle, FaUserShield, FaCheck } from 'react-icons/fa';
import { predictiveSignalsData } from '../mockData';
import DashboardLayout from '@/components/DashboardLayout';

const AIHubDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-text-dark mb-1">AI Hub</h1>
      <p className="text-text-light mb-6">Centralized intelligence for proactive decision-making</p>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
         <KPICard title="Active Predictions" value="14" change="↑ 3" isPositive={true}>
            <FaBrain className="text-primary-blue" />
          </KPICard>
          <KPICard title="Generated Scenarios" value="6" change="↑ 1" isPositive={true}>
            <FaPlayCircle className="text-opportunity-green" />
          </KPICard>
          <KPICard title="Copilot Assists" value="128" change="↑ 22" isPositive={true}>
            <FaUserShield className="text-orange-500" />
          </KPICard>
          <KPICard title="Avg. Model Confidence" value="96.2%" change="↑ 0.8%" isPositive={true}>
            <FaCheck className="text-green-500" />
          </KPICard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ChartCard title="Predictive Signals (OEE/Downtime/Quality Anomaly)">
            <PredictiveSignalChart data={predictiveSignalsData} />
          </ChartCard>
          <NotesSection />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <CEOBriefCard />
          <ChartCard title="What-if Simulator">
            <div className="space-y-3 text-sm">
                <p className="text-text-light">Select a scenario to model its impact on OEE and output.</p>
                <select className="w-full p-2 border border-border-color rounded-md bg-white">
                    <option>Simulate: Changeover Reduction</option>
                    <option>Simulate: Add Extra Crew</option>
                    <option>Simulate: Machine Fix</option>
                </select>
                <button className="w-full p-3 bg-primary-blue text-white font-semibold rounded-md hover:bg-blue-700">
                    Run Simulation
                </button>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
    </DashboardLayout>
    
  );
};

export default AIHubDashboard;