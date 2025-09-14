"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIInsights } from "@/context/AIInsightsContext";
import { useDate } from "@/context/DateContext";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Monitor, Clock, TrendingDown, TrendingUp, Settings, AlertTriangle,
} from "lucide-react";

const generateDowntimeInsights = (dayOffset: number) => {
    const randomFactor = 1 - dayOffset * 0.1;
    return [
        { type: "Predictive Maintenance Window", subtitle: "Maintenance Intelligence", message: `Machine 3 shows early wear indicators. Schedule maintenance within ${(72 / (1 + dayOffset * 0.1)).toFixed(0)} hours to prevent unplanned downtime.`, recommendation: "Schedule Now", priority: 2, icon: TrendingUp, confidence: 0.85 * randomFactor, impact_estimate: {} },
        { type: "Setup Time Optimization", subtitle: "Process Improvement", message: `Changeover time can be reduced by ${(23 * randomFactor).toFixed(0)}% implementing quick-change tooling on Line 2.`, recommendation: "View Analysis", priority: 3, icon: Settings, confidence: 0.92 * randomFactor, impact_estimate: {} },
        { type: "Material Flow Bottleneck", subtitle: "Operations Alert", message: `Material shortage pattern detected. Inventory buffer adjustment needed to prevent ${(2 * randomFactor).toFixed(1)}-hour downtime.`, recommendation: "Take Action", priority: 1, icon: AlertTriangle, confidence: 0.98 * randomFactor, impact_estimate: {} },
    ];
};

const allDowntimeInsights = {
    today: generateDowntimeInsights(0),
    yesterday: generateDowntimeInsights(1),
    '2daysAgo': generateDowntimeInsights(2),
};

const generateData = (dayOffset: number) => {
  const randomFactor = 1 - dayOffset * 0.05;
  return {
    productionData: [
      { time: "13:00", value: 150 * randomFactor }, { time: "14:00", value: 165 * randomFactor },
      { time: "15:00", value: 158 * randomFactor }, { time: "16:00", value: 175 * randomFactor },
      { time: "17:00", value: 185 * randomFactor }, { time: "18:00", value: 170 * randomFactor },
      { time: "19:00", value: 178 * randomFactor }, { time: "20:00", value: 188 * randomFactor },
      { time: "21:00", value: 195 * randomFactor },
    ],
    machineData: [
      { name: "Machine 1", performance: (87 * randomFactor).toFixed(0), status: "Running" },
      { name: "Machine 2", performance: (92 * randomFactor).toFixed(0), status: "Running" },
      { name: "Machine 3", performance: (84 * randomFactor).toFixed(0), status: "Warning" },
      { name: "Machine 4", performance: (95 * randomFactor).toFixed(0), status: "Running" },
    ],
    reasonData: [
      { reason: "Setup/Changeover", duration: 10 + dayOffset * 2 }, { reason: "Material Shortage", duration: 15 + dayOffset * 1 },
      { reason: "Equipment Failure", duration: 20 - dayOffset * 2 }, { reason: "Quality Issues", duration: 25 - dayOffset * 1 },
      { reason: "Maintenance", duration: 30 + dayOffset * 3 }, { reason: "Other", duration: 35 },
    ].reverse(),
    downtimeData: [
      { time: "1", value: 16 + dayOffset }, { time: "2", value: 9 + dayOffset }, { time: "3", value: 22 - dayOffset },
      { time: "4", value: 13 + dayOffset }, { time: "5", value: 18 - dayOffset }, { time: "6", value: 7 + dayOffset },
      { time: "7", value: 26 - dayOffset }, { time: "8", value: 15 + dayOffset }, { time: "9", value: 20 - dayOffset },
      { time: "10", value: 17 + dayOffset }, { time: "11", value: 10 + dayOffset }, { time: "12", value: 14 - dayOffset },
    ]
  };
};

const allData = {
  today: generateData(0),
  yesterday: generateData(1),
  '2daysAgo': generateData(2),
};

const DowntimeLosses = () => {
  const { setInsights } = useAIInsights();
  const { selectedDate } = useDate();
  const { productionData, machineData, reasonData, downtimeData } = allData[selectedDate];

  useEffect(() => {
    setInsights(allDowntimeInsights[selectedDate]);
    return () => setInsights([]);
  }, [setInsights, selectedDate]);

  return (
    <DashboardLayout title="Downtime & Losses" subtitle="Downtime analysis, loss tracking, and MTTR monitoring for operational efficiency">
      <div className="p-6 bg-slate-50/50 grid grid-cols-3 grid-rows-2 gap-6 h-full">
        <Card className="col-span-2 row-span-1 flex flex-col h-full">
          <CardHeader><CardTitle className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>Production Timeline (Last 12 Hours)</CardTitle></CardHeader>
          <CardContent className="flex-grow"><ResponsiveContainer width="100%" height="100%"><AreaChart data={productionData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}><defs><linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="time" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorProduction)" /></AreaChart></ResponsiveContainer></CardContent>
        </Card>
        <Card className="col-span-1 row-span-1 flex flex-col h-full">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-600" />
              Machine Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between p-4 pt-2">
            <div className="grid grid-cols-2 gap-2">
              {machineData.map((machine) => (
                <div key={machine.name} className="p-2 rounded-lg border text-center bg-slate-50 flex flex-col justify-center items-center">
                  <p className="font-medium text-gray-700 text-sm">{machine.name}</p>
                  <p className="text-xl font-bold text-blue-600">{machine.performance}%</p>
                  <Badge variant="outline" className={`text-xs px-2 py-0.5 ${machine.status === 'Warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-800 border-green-200'}`}>{machine.status}</Badge>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <button className="font-semibold">Current Shift #2</button>
              <button className="text-blue-600 font-semibold">All Machines</button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 row-span-1 flex flex-col h-full">
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-red-500" />Duration by Reason</CardTitle></CardHeader>
          <CardContent className="flex-grow"><ResponsiveContainer width="100%" height="100%"><BarChart data={reasonData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" hide /><YAxis dataKey="reason" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 12 }} /><Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} /><Bar dataKey="duration" fill="#e5e7eb" radius={[0, 4, 4, 0]} barSize={12} /></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card className="col-span-2 row-span-1 flex flex-col h-full">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-purple-600" />Downtime Timeline (Last 12 Hours)</CardTitle></CardHeader>
          <CardContent className="flex-grow"><ResponsiveContainer width="100%" height="100%"><LineChart data={downtimeData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="time" hide /><YAxis domain={[0, 40]} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DowntimeLosses;