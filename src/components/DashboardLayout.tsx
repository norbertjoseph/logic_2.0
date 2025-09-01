import React from "react";
import Sidebar from "./Sidebar";
import AISidebar from "./AISidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
      <AISidebar />
    </div>
  );
};

export default DashboardLayout;