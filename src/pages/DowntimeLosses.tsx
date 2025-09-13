"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIInsights } from "@/context/AIInsightsContext";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Monitor, Clock, TrendingDown, TrendingUp, Settings, AlertTriangle,
} from "lucide-react";

const downtimeInsights = [
  {
    type: "Predictive Maintenance Window",
    subtitle: "Maintenance Intelligence",
    message: "Machine 3 shows early wear indicators. Schedule maintenance within 72 hours to prevent unplanned downtime.",
    recommendation: "Schedule Now",
    priority: 2,
    icon: TrendingUp,
    confidence: 0.85,
    impact_estimate: {},
  },
  {
    type: "Setup Time Optimization",
    subtitle: "Process Improvement",
    message: "Changeover time can be reduced by 23% implementing quick-change tooling on Line 2.",
    recommendation: "View Analysis",
    priority: 3,
    icon: Settings,
    confidence: 0.92,
    impact_estimate: {},
  },
  {
    type: "Material Flow Bottleneck",
    subtitle: "Operations Alert",
    message: "Material shortage pattern detected. Inventory buffer adjustment needed to prevent 2-hour downtime.",
    recommendation: "Take Action",
    priority: 1,
    icon: AlertTriangle,
    confidence: 0.98,
    impact_estimate: {},
  },
];

const productionData = [
  { time: "13:00", value: 150 }, { time: "14:00", value: 165 },
  { time: "15:00", value: 158 }, { time: "16:00", value: 175 },
  { time: "17:00", value: 185 }, { time: "18:00", value: 170 },
  { time: "19:00", value: 178 }, { time: "20:00", value: 188 },
  { time: "21:00", value: 195 },
];

const machineData = [
  { name: "Machine 1", performance: 87, status: "Running" },
  { name: "Machine 2", performance: 92, status: "Running" },
  { name: "Machine 3", performance: 84, status: "Warning" },
  { name: "Machine 4", performance: 95, status: "Running" },
];

const reasonData = [
  { reason: "Setup/Changeover", duration: 10 }, { reason: "Material Shortage", duration: 15 },
  { reason: "Equipment Failure", duration: 20 }, { reason: "Quality Issues", duration: 25 },
  { reason: "Maintenance", duration: 30 }, { reason: "Other", duration: 35 },
].reverse();

const downtimeData = [
  { time: "1", value: 16 }, { time: "2", value: 9 }, { time: "3", value: 22 },
  { time: "4", value: 13 }, { time: "5", value: 18 }, { time: "6", value: 7 },
  { time: "7", value: 26 }, { time: "8", value: 15 }, { time: "9", value: 20 },
  { time: "10", value: 17 }, { time: "11", value: 10 }, { time: "12", value: 14 },
];

const DowntimeLosses = () => {
  const { setInsights } = useAIInsights();

  useEffect(() => {
    setInsights(downtimeInsights);
    return () => setInsights([]);
  }, [setInsights]);

  return (
    <DashboardLayout
      title="Downtime & Losses"
      subtitle="Downtime analysis, loss tracking, and MTTR monitoring for operational efficiency"
    >
      <div className="p-6 bg-slate-50/50 grid grid-cols-3 grid-rows-2 gap-6 h-full">
        <Card className="col-span-2 row-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              Production Timeline (Last 12 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorProduction)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 row-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Monitor className="h-5 w-5 text-blue-600" />Machine Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {machineData.map((machine) => (
                <div key={machine.name} className="p-1 rounded-lg border text-center bg-slate-50 flex flex-col justify-center">
                  <p className="font-medium text-gray-700 text-xs">{machine.name}</p>
                  <p className="text-lg font-bold text-blue-600">{machine.performance}%</p>
                  <Badge variant="outline" className={`text-xs ${machine.status === 'Warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
                    {machine.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm mt-4 text-gray-600 shrink-0">
              <button className="font-semibold">Current Shift #2</button>
              <button className="text-blue-600 font-semibold">All Machines</button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 row-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-red-500" />Duration by Reason</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasonData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="reason" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Bar dataKey="duration" fill="#e5e7eb" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 row-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-purple-600" />Downtime Timeline (Last 12 Hours)</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downtimeData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 30]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DowntimeLosses;