"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Wrench, AlertTriangle, BarChartHorizontal } from "lucide-react";
import { useDate } from "@/context/DateContext";
import { useAIInsights } from "@/context/AIInsightsContext";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const generateAssemblyReconInsights = (dayOffset: number) => {
    const randomFactor = 1 - dayOffset * 0.1;
    return [
        { type: "Station 4 Bottleneck", subtitle: "Efficiency Alert", message: `Station 4 cycle time is ${(22 * (1 + dayOffset * 0.1)).toFixed(0)}% higher than others, causing a line imbalance. Potential for 8% throughput increase.`, recommendation: "Analyze Station 4", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.97 * randomFactor, impact_estimate: {} },
        { type: "Predictive Maintenance", subtitle: "Maintenance Advisory", message: `Vibration sensors on Station 2's robotic arm show wear patterns. Schedule maintenance in ${(48 / (1 + dayOffset * 0.1)).toFixed(0)}h to prevent failure.`, recommendation: "Schedule Maintenance", priority: 2, icon: Wrench, tag: "high", confidence: 0.91 * randomFactor, impact_estimate: {} },
        { type: "Rework Rate Pattern", subtitle: "Quality Insight", message: `A high rework rate is correlated with new operator shifts. Additional training could reduce rework by ${(30 * randomFactor).toFixed(0)}%.`, recommendation: "Review Training Data", priority: 3, icon: BarChartHorizontal, tag: "medium", confidence: 0.86 * randomFactor, impact_estimate: {} },
    ];
};

const allAssemblyReconInsights = {
    today: generateAssemblyReconInsights(0),
    yesterday: generateAssemblyReconInsights(1),
    '2daysAgo': generateAssemblyReconInsights(2),
};

const generateData = (dayOffset: number) => {
  const randomFactor = 1 - dayOffset * 0.02;
  return {
    kpiData: [
      { title: "Assembly Efficiency", value: `${(91.3 * randomFactor).toFixed(1)}%`, change: `+${(3.2 - dayOffset * 0.5).toFixed(1)}%`, trend: "up", color: "from-blue-500 to-blue-700", sparklineData: [{ v: 1 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }] },
      { title: "Rework Rate", value: `${(4.7 / randomFactor).toFixed(1)}%`, change: `-${(8.5 - dayOffset * 0.8).toFixed(1)}%`, trend: "down", color: "from-green-500 to-green-700", sparklineData: [{ v: 5 }, { v: 4 }, { v: 4 }, { v: 3 }, { v: 2 }, { v: 1 }] },
      { title: "Cycle Time", value: `${(12.3 * (1 + dayOffset * 0.02)).toFixed(1)} min`, change: `-${(5.2 - dayOffset * 0.4).toFixed(1)}%`, trend: "down", color: "from-teal-400 to-teal-600", sparklineData: [{ v: 4 }, { v: 3 }, { v: 5 }, { v: 2 }, { v: 3 }, { v: 1 }] },
      { title: "Station Utilization", value: `${(87.9 * randomFactor).toFixed(1)}%`, change: `+${(2.8 - dayOffset * 0.3).toFixed(1)}%`, trend: "up", color: "from-purple-500 to-fuchsia-500", sparklineData: [{ v: 2 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 5 }, { v: 6 }] },
    ],
    stationEfficiencyData: [
      { name: "Station 1", efficiency: 98 * randomFactor }, { name: "Station 2", efficiency: 88 * randomFactor },
      { name: "Station 3", efficiency: 95 * randomFactor }, { name: "Station 4", efficiency: 85 * randomFactor },
      { name: "Station 5", efficiency: 92 * randomFactor },
    ],
    stationUtilizationData: [
      { name: "Station 1", utilization: 95 * randomFactor }, { name: "Station 2", utilization: 92 * randomFactor },
      { name: "Station 3", utilization: 94 * randomFactor }, { name: "Station 4", utilization: 88 * randomFactor },
      { name: "Station 5", utilization: 91 * randomFactor },
    ]
  };
};

const allData = {
  today: generateData(0),
  yesterday: generateData(1),
  '2daysAgo': generateData(2),
};

const AssemblyRecon = () => {
  const { setInsights } = useAIInsights();
  const { selectedDate } = useDate();
  const { kpiData, stationEfficiencyData, stationUtilizationData } = allData[selectedDate];

  useEffect(() => {
    setInsights(allAssemblyReconInsights[selectedDate]);
    return () => setInsights([]);
  }, [setInsights, selectedDate]);

  return (
    <DashboardLayout title="Assembly Recon" subtitle="Monitor assembly line performance, track operator efficiency, and manage quality">
      <div className="flex-1 p-6 bg-gray-50/50">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className={`text-white bg-gradient-to-br ${kpi.color} border-none`}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center justify-between"><div className="flex items-center gap-2"><Activity className="w-4 h-4" />{kpi.title}</div><div className="h-8 w-20"><ResponsiveContainer width="100%" height="100%"><LineChart data={kpi.sparklineData}><Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.7)" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></CardTitle></CardHeader>
              <CardContent><p className="text-4xl font-bold">{kpi.value}</p><div className={`flex items-center text-sm font-medium text-white/80`}>{kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}{kpi.change}</div></CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Station Efficiency</CardTitle></CardHeader>
            <CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={stationEfficiencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} /><YAxis domain={[70, 100]} tickLine={false} axisLine={false} /><Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} /><Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Station Utilization</CardTitle></CardHeader>
            <CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={stationUtilizationData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} /><YAxis domain={[70, 100]} tickLine={false} axisLine={false} /><Tooltip /><Line type="monotone" dataKey="utilization" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssemblyRecon;