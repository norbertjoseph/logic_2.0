"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIInsights } from "@/context/AIInsightsContext";
import { useDate } from "@/context/DateContext";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Zap, BarChartHorizontal
} from "lucide-react";

const generateQualityInsights = (dayOffset: number) => {
    const randomFactor = 1 - dayOffset * 0.1;
    return [
        { type: "Regional Performance Pattern", subtitle: "Strategic Intelligence", message: "Updated every 5 minutes based on latest time patterns.", recommendation: "View Details", priority: 2, icon: BarChartHorizontal, tag: "high", confidence: 0.88 * randomFactor, impact_estimate: {} },
        { type: "Energy Optimization Opportunity", subtitle: "Cost Optimization", message: `Shift ${(14 * randomFactor).toFixed(0)}% production to night shift across regions to save ₹${(15.2 * randomFactor).toFixed(1)}L on electricity costs.`, recommendation: "See Action", priority: 2, icon: Zap, tag: "high", confidence: 0.95 * randomFactor, impact_estimate: {} },
        { type: "Quality Degradation Alert", subtitle: "Risk Management", message: `${(19 * (1 + dayOffset * 0.1)).toFixed(0)}% dropping (${(2.5 * (1 + dayOffset * 0.1)).toFixed(1)}/week) in South region. Correlation with new supplier launch detected.`, recommendation: "Investigate", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.99 * randomFactor, impact_estimate: {} },
    ];
};

const allQualityInsights = {
    today: generateQualityInsights(0),
    yesterday: generateQualityInsights(1),
    '2daysAgo': generateQualityInsights(2),
};

const generateData = (dayOffset: number) => {
  const randomFactor = 1 - dayOffset * 0.02;
  return {
    kpiData: [
      { title: "First Pass Yield", value: `${(94.2 * randomFactor).toFixed(1)}%`, change: 2.1 - dayOffset * 0.5, trend: "up" },
      { title: "Defect Rate", value: `${(1.8 / randomFactor).toFixed(1)}%`, change: -0.5 + dayOffset * 0.1, trend: "down" },
      { title: "Customer Returns", value: `${(0.3 / randomFactor).toFixed(1)}%`, change: -0.1 + dayOffset * 0.05, trend: "down" },
      { title: "Quality Score", value: (96.7 * randomFactor).toFixed(1), change: 1.2 - dayOffset * 0.3, trend: "up" },
    ],
    qualityTrendData: [
      { name: 'Jan', value: 95 * randomFactor }, { name: 'Feb', value: 96 * randomFactor }, { name: 'Mar', value: 96 * randomFactor },
      { name: 'Apr', value: 97 * randomFactor }, { name: 'May', value: 97 * randomFactor },
    ],
    defectAnalysisData: [
      { name: 'Dimensional', value: 45 + dayOffset * 2 }, { name: 'Surface', value: 28 + dayOffset },
      { name: 'Material', value: 32 - dayOffset }, { name: 'Assembly', value: 22 - dayOffset * 2 },
    ]
  };
};

const allData = {
  today: generateData(0),
  yesterday: generateData(1),
  '2daysAgo': generateData(2),
};

const Quality = () => {
  const { setInsights } = useAIInsights();
  const { selectedDate } = useDate();
  const { kpiData, qualityTrendData, defectAnalysisData } = allData[selectedDate];

  useEffect(() => {
    setInsights(allQualityInsights[selectedDate]);
    return () => setInsights([]);
  }, [setInsights, selectedDate]);

  return (
    <DashboardLayout title="Quality" subtitle="Quality control metrics and defect analysis">
      <div className="flex-1 p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" />{kpi.title}</CardTitle></CardHeader>
              <CardContent className="flex items-baseline justify-between"><p className="text-3xl font-bold text-gray-800">{kpi.value}</p><div className={`flex items-center text-sm font-semibold ${kpi.change > 0 ? 'text-green-500' : 'text-red-500'}`}>{kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}{kpi.change > 0 ? `+${kpi.change.toFixed(1)}` : kpi.change.toFixed(1)}{kpi.title.includes('Score') ? '' : '%'}</div></CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Quality Trend</CardTitle></CardHeader>
            <CardContent className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis domain={[80, 100]} tickLine={false} axisLine={false} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><AlertTriangle className="w-4 h-4 text-red-500" />Defect Analysis</CardTitle></CardHeader>
            <CardContent className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={defectAnalysisData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis domain={[0, 60]} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700"><CheckCircle2 className="w-5 h-5 text-orange-500" />Quality Alerts & Actions</CardTitle></CardHeader>
          <CardContent><div className="flex items-center justify-between p-4 border rounded-lg bg-red-50/50 border-red-200"><div className="flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-red-500" /><div><p className="font-semibold text-gray-800">High Defect Rate - Line 3</p><p className="text-sm text-gray-600">Dimensional defects above threshold</p></div></div><Badge className="text-white bg-red-600 hover:bg-red-700">Critical</Badge></div></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Quality;