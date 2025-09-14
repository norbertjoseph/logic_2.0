"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDate } from "@/context/DateContext";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import { 
  Clock, Settings, ShieldCheck, Target, TrendingUp, TrendingDown
} from "lucide-react";

const generateData = (dayOffset: number) => {
  const randomFactor = (1 - dayOffset * 0.05);
  return {
    kpiData: {
      availability: { value: (87.2 * randomFactor).toFixed(1), change: 2.1 - dayOffset, icon: Clock, color: "from-[#D4F7DC] to-[#A8E6CF]", trendColor: "text-green-500" },
      reliability: { value: (94.8 * randomFactor).toFixed(1), change: -1.3 + dayOffset * 0.2, icon: Settings, color: "from-[#D6E0FF] to-[#A7C4FF]", trendColor: "text-red-500" },
      quality: { value: (98.5 * randomFactor).toFixed(1), change: 0.7 - dayOffset * 0.1, icon: ShieldCheck, color: "from-[#F0D9FF] to-[#D1A7FF]", trendColor: "text-green-500" },
      oee: { value: (81.3 * randomFactor).toFixed(1), change: -1.5 + dayOffset * 0.3, icon: Target, color: "from-[#FFD9D9] to-[#FFA7A7]", trendColor: "text-red-500" }
    },
    oeeTrendData: Array.from({ length: 12 }, (_, i) => ({
      time: `${String(i * 2).padStart(2, '0')}:00`,
      oee: Math.round((75 + Math.sin(i * 0.8) * 10 + Math.cos(i * 0.3) * 5 + Math.random() * 5) * randomFactor)
    })),
    lossReasonsData: [
      { reason: "Machine Breakdown", percentage: 35 * randomFactor, fill: "#ef4444" },
      { reason: "Setup & Adjustments", percentage: 20 * randomFactor, fill: "#f97316" },
      { reason: "Material Shortage", percentage: 15 * randomFactor, fill: "#eab308" },
      { reason: "Quality Issues", percentage: 12 * randomFactor, fill: "#22c55e" },
      { reason: "Other", percentage: 18 * randomFactor, fill: "#3b82f6" }
    ],
    scrapData: [
      { machine: "Machine A", scrap: (4.2 * randomFactor).toFixed(1) },
      { machine: "Machine B", scrap: (3.8 * randomFactor).toFixed(1) },
      { machine: "Machine C", scrap: (5.1 * randomFactor).toFixed(1) },
      { machine: "Machine D", scrap: (2.9 * randomFactor).toFixed(1) },
      { machine: "Machine E", scrap: (3.5 * randomFactor).toFixed(1) }
    ]
  };
};

const allData = {
  today: generateData(0),
  yesterday: generateData(1),
  '2daysAgo': generateData(2),
};

const Overview = () => {
  const { selectedDate } = useDate();
  const { kpiData, oeeTrendData, lossReasonsData, scrapData } = allData[selectedDate];

  return (
    <DashboardLayout title="Overview">
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(kpiData).map(([key, data]) => (
            <Card key={key} className={`bg-gradient-to-br ${data.color} border-none text-gray-800`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                <data.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.value}%</div>
                <p className={`text-xs flex items-center ${data.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {data.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(data.change).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500"></span>OEE Trend (24h)</CardTitle></CardHeader>
            <CardContent><div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={oeeTrendData}><XAxis dataKey="time" interval={1} tickFormatter={(value, index) => index % 2 === 0 ? value : ''} /><YAxis domain={[60, 100]} /><Tooltip /><Line type="monotone" dataKey="oee" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#3b82f6', strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-500"></span>Loss Reasons</CardTitle></CardHeader>
            <CardContent><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={lossReasonsData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}><XAxis type="number" domain={[0, 40]} /><YAxis dataKey="reason" type="category" width={90} /><Tooltip /><Bar dataKey="percentage" fill="#8b5cf6" /></BarChart></ResponsiveContainer></div></CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500"></span>Scrap by Machine (Units)</CardTitle></CardHeader>
            <CardContent><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={scrapData}><XAxis dataKey="machine" /><YAxis /><Tooltip /><Bar dataKey="scrap" fill="#10b981" /></BarChart></ResponsiveContainer></div></CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;