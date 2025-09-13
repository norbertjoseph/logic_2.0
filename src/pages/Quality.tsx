"use client";

import React, { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIInsights } from "@/context/AIInsightsContext";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Zap, BarChartHorizontal, Bot, LayoutGrid
} from "lucide-react";

const qualityInsights = [
  {
    type: "Regional Performance Pattern",
    subtitle: "Strategic Intelligence",
    message: "Updated every 5 minutes based on latest time patterns.",
    recommendation: "View Details",
    priority: 2,
    icon: BarChartHorizontal,
    tag: "high",
    confidence: 0.88,
    impact_estimate: {},
  },
  {
    type: "Energy Optimization Opportunity",
    subtitle: "Cost Optimization",
    message: "Shift 14% production to night shift across regions to save ₹15.2L on electricity costs.",
    recommendation: "See Action",
    priority: 2,
    icon: Zap,
    tag: "high",
    confidence: 0.95,
    impact_estimate: {},
  },
  {
    type: "Quality Degradation Alert",
    subtitle: "Risk Management",
    message: "19% dropping (2.5/week) in South region. Correlation with new supplier launch detected.",
    recommendation: "Investigate",
    priority: 1,
    icon: AlertTriangle,
    tag: "critical",
    confidence: 0.99,
    impact_estimate: {},
  },
];

const kpiData = [
  { title: "First Pass Yield", value: "94.2%", change: 2.1, trend: "up" },
  { title: "Defect Rate", value: "1.8%", change: -0.5, trend: "down" },
  { title: "Customer Returns", value: "0.3%", change: -0.1, trend: "down" },
  { title: "Quality Score", value: "96.7", change: 1.2, trend: "up" },
];

const qualityTrendData = [
  { name: 'Jan', value: 95 }, { name: 'Feb', value: 96 }, { name: 'Mar', value: 96 },
  { name: 'Apr', value: 97 }, { name: 'May', value: 97 },
];

const defectAnalysisData = [
  { name: 'Dimensional', value: 45 }, { name: 'Surface', value: 28 },
  { name: 'Material', value: 32 }, { name: 'Assembly', value: 22 },
];

const Quality = () => {
  const { setInsights } = useAIInsights();

  useEffect(() => {
    setInsights(qualityInsights);
    return () => setInsights([]);
  }, [setInsights]);

  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  {kpi.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
                <div className={`flex items-center text-sm font-semibold text-green-500`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {kpi.change > 0 ? `+${kpi.change}` : kpi.change}{kpi.title.includes('Score') ? '' : '%'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Quality Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Defect Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={defectAnalysisData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 60]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              Quality Alerts & Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50/50 border-red-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold text-gray-800">High Defect Rate - Line 3</p>
                  <p className="text-sm text-gray-600">Dimensional defects above threshold</p>
                </div>
              </div>
              <Badge className="text-white bg-red-600 hover:bg-red-700">Critical</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Quality;