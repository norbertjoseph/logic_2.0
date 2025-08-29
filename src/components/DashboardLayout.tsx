import React from "react";
import Sidebar from "./Sidebar";
import AISidebar from "./AISidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background"> {/* Added h-screen and overflow-hidden */}
      <Sidebar />
      <main className="flex-1 p-6 bg-white overflow-y-auto"> {/* Changed overflow-auto to overflow-y-auto for explicit vertical scrolling */}
        {children}
      </main>
      <AISidebar />
    </div>
  );
};

export default DashboardLayout;