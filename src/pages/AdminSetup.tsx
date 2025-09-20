import React, { useState } from 'react';
import UserManagement from '../components/admin/UserManagement';
import DashboardLayout from '@/components/DashboardLayout';

type AdminTab = 'users' | 'workspace' | 'config' | 'system';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      // Add cases for other tabs later
      // case 'workspace':
      //   return <div>Workspace Settings</div>;
      default:
        return <UserManagement />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-text-dark mb-1">Admin & Setup</h1>
      <p className="text-text-light mb-6">Manage users, workspace, and system settings.</p>

      <div className="border-b border-border-color mb-6">
        <nav className="flex space-x-6">
          <TabButton name="Users & Roles" tab="users" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton name="Workspace" tab="workspace" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton name="Configuration" tab="config" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton name="System" tab="system" activeTab={activeTab} onClick={setActiveTab} />
        </nav>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
    </DashboardLayout>
    
  );
};

// Helper component for tabs
const TabButton: React.FC<{ name: string; tab: AdminTab; activeTab: AdminTab; onClick: (tab: AdminTab) => void; }> = 
({ name, tab, activeTab, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`py-3 px-1 text-sm font-semibold transition-colors ${
      activeTab === tab 
      ? 'border-b-2 border-primary-blue text-primary-blue' 
      : 'text-text-light hover:text-text-dark'
    }`}
  >
    {name}
  </button>
);

export default AdminDashboard;