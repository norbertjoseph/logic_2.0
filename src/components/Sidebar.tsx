import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Grid, 
  BarChart2, 
  AlertTriangle, 
  LifeBuoy, 
  Wrench, 
  Package, 
  Truck, 
  Calendar, 
  BrainCircuit, 
  Bell, 
  FileText, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "Overview", path: "/", icon: Grid },
  { name: "Production", path: "/production", icon: BarChart2 },
  { name: "Downtime & Losses", path: "/downtime-losses", icon: AlertTriangle },
  { name: "Quality", path: "/quality", icon: LifeBuoy },
  { name: "Assembly Recon", path: "/assembly-recon", icon: Wrench },
  { name: "Inventory", path: "/inventory", icon: Package },
  { name: "Logistics", path: "/logistics", icon: Truck },
  { name: "Scheduler", path: "/scheduler", icon: Calendar },
  { name: "AI Hub", path: "/ai-hub", icon: BrainCircuit },
  { name: "Alerts & Briefs", path: "/alerts-briefs", icon: Bell },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Admin & Setup", path: "/admin-setup", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col h-full border-r border-sidebar-border">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L100 28.87V86.6L50 115.47L0 86.6V28.87L50 0Z" fill="#4F46E5"/>
              <path d="M50 23.09L83.3 42.03V79.9L50 98.84L16.7 79.9V42.03L50 23.09Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Logic Leap</h2>
            <p className="text-xs text-gray-500">Smart Manufacturing</p>
          </div>
        </div>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 p-2 rounded-md transition-colors text-sm font-medium",
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-600 hover:bg-gray-200/50 hover:text-primary"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;