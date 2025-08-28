import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Overview", path: "/" },
  { name: "Production", path: "/production" },
  { name: "Downtime & Losses", path: "/downtime-losses" },
  { name: "Quality", path: "/quality" },
  { name: "Assembly Recon", path: "/assembly-recon" },
  { name: "Inventory", path: "/inventory" },
  { name: "Logistics", path: "/logistics" },
  { name: "Scheduler", path: "/scheduler" },
  { name: "AI Hub", path: "/ai-hub" },
  { name: "Alerts & Briefs", path: "/alerts-briefs" }, // New link for Alerts & Briefs
  { name: "Reports", path: "/reports" },
  { name: "Admin & Setup", path: "/admin-setup" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col h-full border-r border-sidebar-border">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sidebar-primary">LOGIC LEAP</h2>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className="block p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;