"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  Clock, 
  Settings, // Changed from Wrench
  ShieldCheck, // Changed from CheckCircle
  Target, // Changed from AlertTriangle
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Dummy data for the charts and KPIs
const kpiData = {
  availability: { value: 87.2, change: 2.1, icon: Clock, color: "from-[#D4F7DC] to-[#A8E6CF]", trendColor: "text-green-500" },
  reliability: { value: 94.8, change: -1.3, icon: Settings, color: "from-[#D6E0FF] to-[#A7C4FF]", trendColor: "text-red-500" },
  quality: { value: 98.5, change: 0.7, icon: ShieldCheck, color: "from-[#F0D9FF] to-[#D1A7FF]", trendColor: "text-green-500" },
  oee: { value: 81.3, change: -1.5, icon: Target, color: "from-[#FFD9D9] to-[#FFA7A7]", trendColor: "text-red-500" }
};

const oeeTrendData = Array.from({ length: 12 }, (_, i) => {
  const hour = i * 2;
  const timeLabel = `${String(hour).padStart(2, '0')}:00`;
  // Generate some fluctuating OEE data for 24 hours
  const oeeValue = 75 + Math.sin(i * 0.8) * 10 + Math.cos(i * 0.3) * 5 + Math.random() * 5;
  return { time: timeLabel, oee: Math.round(oeeValue * 10) / 10 };
});


const lossReasonsData = [
  { reason: "Machine Breakdown", percentage: 35, fill: "#ef4444" },
  { reason: "Setup & Adjustments", percentage: 20, fill: "#f97316" },
  { reason: "Material Shortage", percentage: 15, fill: "#eab308" },
  { reason: "Quality Issues", percentage: 12, fill: "#22c55e" },
  { reason: "Other", percentage: 18, fill: "#3b82f6" }
];

const scrapData = [
  { machine: "Machine A", scrap: 4.2 },
  { machine: "Machine B", scrap: 3.8 },
  { machine: "Machine C", scrap: 5.1 },
  { machine: "Machine D", scrap: 2.9 },
  { machine: "Machine E", scrap: 3.5 }
];

const Overview = () => {
  return (
    <DashboardLayout title="Overview">
      <div className="flex-1 p-6 bg-white">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(kpiData).map(([key, data]) => (
            <Card key={key} className={`bg-gradient-to-br ${data.color} border-none text-gray-800`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                <data.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.value}%</div>
                <p className={`text-xs flex items-center ${data.trendColor}`}>
                  {data.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(data.change)}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OEE Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                OEE Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oeeTrendData}>
                    <XAxis dataKey="time" interval={1} tickFormatter={(value, index) => index % 2 === 0 ? value : ''} />
                    <YAxis domain={[70, 95]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="oee" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#3b82f6' }}
                      activeDot={{ r: 6, fill: '#3b82f6', stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Loss Reasons Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                Loss Reasons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lossReasonsData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="reason" type="category" width={90} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#8b5cf6" /> {/* Using a purple shade */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Scrap by Machine Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Scrap by Machine (Units)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scrapData}>
                    <XAxis dataKey="machine" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scrap" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;