"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Data for KPI cards
const kpiData = [
  {
    title: "Assembly Efficiency",
    value: "91.3%",
    change: "+3.2%",
    trend: "up",
    color: "from-blue-500 to-blue-700",
    sparklineData: [{ v: 1 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }],
  },
  {
    title: "Rework Rate",
    value: "4.7%",
    change: "-8.5%",
    trend: "down",
    color: "from-green-500 to-green-700",
    sparklineData: [{ v: 5 }, { v: 4 }, { v: 4 }, { v: 3 }, { v: 2 }, { v: 1 }],
  },
  {
    title: "Cycle Time",
    value: "12.3 min",
    change: "-5.2%",
    trend: "down",
    color: "from-teal-400 to-teal-600",
    sparklineData: [{ v: 4 }, { v: 3 }, { v: 5 }, { v: 2 }, { v: 3 }, { v: 1 }],
  },
  {
    title: "Station Utilization",
    value: "87.9%",
    change: "+2.8%",
    trend: "up",
    color: "from-purple-500 to-fuchsia-500",
    sparklineData: [{ v: 2 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 5 }, { v: 6 }],
  },
];

// Data for Station Efficiency Chart
const stationEfficiencyData = [
  { name: "Station 1", efficiency: 98 },
  { name: "Station 2", efficiency: 88 },
  { name: "Station 3", efficiency: 95 },
  { name: "Station 4", efficiency: 85 },
  { name: "Station 5", efficiency: 92 },
];

// Data for Station Utilization Chart
const stationUtilizationData = [
  { name: "Station 1", utilization: 95 },
  { name: "Station 2", utilization: 92 },
  { name: "Station 3", utilization: 94 },
  { name: "Station 4", utilization: 88 },
  { name: "Station 5", utilization: 91 },
];

const AssemblyRecon = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-gray-50/50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Assembly Recon Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitor assembly line performance, track operator efficiency, and manage quality
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className={`text-white bg-gradient-to-br ${kpi.color} border-none`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    {kpi.title}
                  </div>
                  <div className="h-8 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={kpi.sparklineData}>
                        <Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.7)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{kpi.value}</p>
                <div className={`flex items-center text-sm font-medium text-white/80`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {kpi.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Station Efficiency</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stationEfficiencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                  <Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Station Utilization</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stationUtilizationData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="utilization" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssemblyRecon;