"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Cpu, Search, Bell, User } from "lucide-react";

const regionalData = [
  { region: 'North', output: 2400, cost: 1100, oee: 70.4, qa: 541, rework: 96, scrap: 21 },
  { region: 'East', output: 2800, cost: 1900, oee: 66.5, qa: 452, rework: 78, scrap: 18 },
  { region: 'West', output: 3000, cost: 1400, oee: 70.8, qa: 623, rework: 112, scrap: 31 },
  { region: 'South', output: 2500, cost: 1700, oee: 67.8, qa: 587, rework: 89, scrap: 24 },
];

const kpiData = {
  shiftOutput: { value: '32.1K', change: 68.9, period: 'Aug 1ST' },
  downtime: { value: '₹4.8Cr', trend: 39, period: 'Aug MTD', events: 19491 },
  costImpact: { regional: '₹7.8Cr', priority: '₹23.4Cr', monthly: '₹1.6L' }
};

const Production = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        {/* Header Section - Removed as it's now handled by DashboardLayout and Header component */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Production</h1>
          <p className="text-muted-foreground text-sm">Real-time manufacturing dashboard for comprehensive production oversight</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
                <span>Shift Output</span>
                <span className="text-indigo-600 font-semibold">Regional Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{kpiData.shiftOutput.value}</p>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">Total Units: {kpiData.shiftOutput.period}</p>
                <p className="flex items-center text-green-600 font-semibold">
                  <TrendingUp className="h-4 w-4 mr-1" /> {kpiData.shiftOutput.change}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
                <span className="flex items-center"><AlertTriangle className="h-4 w-4 mr-1 text-red-500" /> Downtime</span>
                <span className="text-indigo-600 font-semibold">Regional Impact Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{kpiData.downtime.value}</p>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">Total Cost Impact: {kpiData.downtime.period}</p>
                <p className="flex items-center text-red-600 font-semibold">
                  <TrendingUp className="h-4 w-4 mr-1" /> {kpiData.downtime.trend}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Events: {kpiData.downtime.events}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
                <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1 text-green-600" /> Cost Impact Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Regional</span><span className="font-bold">{kpiData.costImpact.regional}</span></div>
                <div className="flex justify-between"><span>Priority</span><span className="font-bold">{kpiData.costImpact.priority}</span></div>
                <div className="flex justify-between"><span>Monthly</span><span className="font-bold">{kpiData.costImpact.monthly}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Output by Region (Units)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData}>
                    <XAxis dataKey="region" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                    <Tooltip />
                    <Bar dataKey="output" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4 text-center text-xs">
                {regionalData.map(d => (
                  <div key={d.region}>
                    <p className="font-bold text-sm text-blue-600">{d.oee}%</p>
                    <p className="text-muted-foreground">{d.region}</p>
                    <p className="text-muted-foreground mt-1">OEE: {d.oee}</p>
                    <p className="text-muted-foreground">QA: {d.qa}</p>
                    <p className="text-muted-foreground">Rework: {d.rework}</p>
                    <p className="text-muted-foreground">Scrap: {d.scrap}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Impact by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData}>
                    <XAxis dataKey="region" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                    <Tooltip />
                    <Bar dataKey="cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
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

export default Production;