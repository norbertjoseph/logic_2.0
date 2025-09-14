import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Production from "./pages/Production";
import DowntimeLosses from "./pages/DowntimeLosses";
import Quality from "./pages/Quality";
import AssemblyRecon from "./pages/AssemblyRecon";
import Inventory from "./pages/Inventory";
import Logistics from "./pages/Logistics";
import Scheduler from "./pages/Scheduler";
import AIHub from "./pages/AIHub";
import AlertsBriefs from "./pages/AlertsBriefs";
import NotFound from "./pages/NotFound";
import { AIInsightsProvider } from "./context/AIInsightsContext";
import Reports from "./pages/Reports";
import AdminSetup from "./pages/AdminSetup";
import { DateProvider } from "./context/DateContext";

const queryClient = new QueryClient();

const App = () => (
  <DateProvider>
    <AIInsightsProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/production" element={<Production />} />
              <Route path="/downtime-losses" element={<DowntimeLosses />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/assembly-recon" element={<AssemblyRecon />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/logistics" element={<Logistics />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/ai-hub" element={<AIHub />} />
              <Route path="/alerts-briefs" element={<AlertsBriefs />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin-setup" element={<AdminSetup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AIInsightsProvider>
  </DateProvider>
);

export default App;