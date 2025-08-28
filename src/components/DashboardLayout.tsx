import React from "react";
import Sidebar from "./Sidebar";
import AISidebar from "./AISidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 bg-white overflow-auto">
        {children}
      </main>
      <AISidebar />
    </div>
  );
};

export default DashboardLayout;