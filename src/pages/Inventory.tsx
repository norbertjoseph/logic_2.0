"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIInsights } from "@/context/AIInsightsContext";
import { useDate } from "@/context/DateContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Package, RefreshCw, ArchiveX, Wallet, TrendingUp, TrendingDown, AlertTriangle, BarChartHorizontal, Zap
} from "lucide-react";

const inventoryInsights = [
  { type: "Regional Performance Pattern", subtitle: "Strategic Intelligence", message: "Updated every 5 minutes based on latest time patterns.", recommendation: "View Details", priority: 2, icon: BarChartHorizontal, tag: "high", confidence: 0.88, impact_estimate: {} },
  { type: "Energy Optimization Opportunity", subtitle: "Cost Optimization", message: "Shift 14% production to night shift across regions to save ₹15.2L on electricity costs.", recommendation: "See Action", priority: 2, icon: Zap, tag: "high", confidence: 0.95, impact_estimate: {} },
  { type: "Quality Degradation Alert", subtitle: "Risk Management", message: "19% dropping (2.5/week) in South region. Correlation with new supplier launch detected.", recommendation: "Investigate", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.99, impact_estimate: {} },
];

const generateData = (dayOffset: number) => {
  const randomFactor = 1 - dayOffset * 0.03;
  return {
    kpiData: [
      { title: "Total Inventory Value", value: `₹${(26.7 * randomFactor).toFixed(1)}Cr`, change: `+${(5.2 - dayOffset).toFixed(1)}%`, trend: "up", icon: Package },
      { title: "Stock Turnover", value: `${(4.8 * randomFactor).toFixed(1)}x`, change: `+${(0.3 - dayOffset * 0.1).toFixed(1)}x`, trend: "up", icon: RefreshCw },
      { title: "Stockouts", value: `${Math.round(12 * (1 + dayOffset * 0.1))}`, change: `-${(3 - dayOffset).toFixed(0)}`, trend: "down", icon: ArchiveX },
      { title: "Carrying Cost", value: `${(18.5 * (1 + dayOffset * 0.01)).toFixed(1)}%`, change: `-${(1.2 - dayOffset * 0.2).toFixed(1)}%`, trend: "down", icon: Wallet },
    ],
    stockLevelsData: [
      { name: "Steel A1", current: 2400 * randomFactor, optimal: 2000, status: "Over" },
      { name: "Plastic B2", current: 1800 * randomFactor, optimal: 2200, status: "Under" },
      { name: "Component C", current: 1500 * randomFactor, optimal: 1500, status: "Optimal" },
      { name: "Raw Mat D", current: 800 * randomFactor, optimal: 1000, status: "Low" },
    ],
    inventoryTurnoverData: [
      { name: "Raw Materials", value: 6.5 * randomFactor },
      { name: "WIP", value: 4.8 * randomFactor },
      { name: "Components", value: 8.2 * randomFactor },
    ]
  };
};

const allData = {
  today: generateData(0),
  yesterday: generateData(1),
  '2daysAgo': generateData(2),
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Over": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Under": return "bg-red-100 text-red-800 border-red-200";
    case "Optimal": return "bg-green-100 text-green-800 border-green-200";
    case "Low": return "bg-orange-100 text-orange-800 border-orange-200";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Inventory = () => {
  const { setInsights } = useAIInsights();
  const { selectedDate } = useDate();
  const { kpiData, stockLevelsData, inventoryTurnoverData } = allData[selectedDate];

  useEffect(() => {
    setInsights(inventoryInsights);
    return () => setInsights([]);
  }, [setInsights]);

  return (
    <DashboardLayout title="Inventory" subtitle="Inventory optimization and stock level insights">
      <div className="flex-1 p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-slate-50 border-slate-200/60">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2"><kpi.icon className="w-4 h-4 text-indigo-500" />{kpi.title}</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold text-gray-800">{kpi.value}</p><div className={`flex items-center text-sm font-semibold ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}{kpi.change}</div></CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><Package className="w-5 h-5 text-indigo-500" />Current Stock Levels</CardTitle></CardHeader>
            <CardContent className="space-y-3">{stockLevelsData.map((item) => (<div key={item.name} className="flex items-center justify-between p-3 bg-white border rounded-lg"><div><p className="font-semibold text-gray-800">{item.name}</p><p className="text-xs text-gray-500">Current: {Math.round(item.current)} | Optimal: {item.optimal}</p></div><Badge variant="outline" className={`font-semibold ${getStatusBadgeClass(item.status)}`}>{item.status}</Badge></div>))}</CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><TrendingUp className="w-5 h-5 text-green-500" />Inventory Turnover</CardTitle></CardHeader>
            <CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={inventoryTurnoverData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis domain={[0, 12]} tickLine={false} axisLine={false} /><Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} /><Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><AlertTriangle className="w-5 h-5 text-orange-500" />Inventory Alerts</CardTitle></CardHeader>
          <CardContent><div className="flex items-center justify-between p-4 border rounded-lg bg-orange-50/50 border-orange-200"><div className="flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-orange-500" /><div><p className="font-semibold text-gray-800">Low stock for Raw Mat D</p><p className="text-sm text-gray-600">Potential production halt in 48 hours. Reorder required.</p></div></div><Badge className="text-white bg-orange-500 hover:bg-orange-600">Action Required</Badge></div></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;