"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAIInsights } from "@/context/AIInsightsContext";
import { useDate } from "@/context/DateContext";
import { useRole, Role } from "@/context/RoleContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  TrendingDown, DollarSign, AlertTriangle, Zap, Wrench, CheckCircle2, TrendingUp, FileText, Download, Clock, Plus, MoreVertical, Minus, Search, Camera, Mic, PlusCircle, ArrowRight, Clock10, CircleCheck, CircleX, User as UserIcon, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// --- CEO Dashboard Code ---
const generateCeoInsights = (dayOffset: number) => {
    const randomFactor = 1 - dayOffset * 0.1;
    return [
        { type: "Cross-Region Pattern Detection", subtitle: "Revenue Alert", message: `Material wastage is ${(12 * randomFactor).toFixed(0)}% above average in 3 regions. Implement centralized drying protocol to save ₹${(12 * randomFactor).toFixed(1)}L/month.`, recommendation: "View Details", priority: 2, icon: TrendingDown, tag: "high", confidence: 0.91 * randomFactor, impact_estimate: {} },
        { type: "Capacity Bottleneck Forecast", subtitle: "Business Risk", message: `East region will hit capacity limit in ${(7 / randomFactor).toFixed(0)} weeks. Consider load balancing to West region (85% utilized).`, recommendation: "Take Action", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.97 * randomFactor, impact_estimate: {} },
        { type: "Energy Optimization Opportunity", subtitle: "Cost Optimization", message: `Shift ${(11 * randomFactor).toFixed(0)}% production to night shift across regions to save ₹${(9.5 * randomFactor).toFixed(1)}L/month on electricity.`, recommendation: "See Action", priority: 3, icon: Zap, tag: "medium", confidence: 0.94 * randomFactor, impact_estimate: {} },
    ];
};

const allCeoInsights = {
    today: generateCeoInsights(0),
    yesterday: generateCeoInsights(1),
    '2daysAgo': generateCeoInsights(2),
};

const generateCeoData = (dayOffset: number) => {
  const randomFactor = 1 - dayOffset * 0.05;
  return {
    kpi: {
      shiftOutput: (32.1 * randomFactor).toFixed(1),
      avgOee: (68.9 * randomFactor).toFixed(1),
      downtimeCost: (5.7 * randomFactor).toFixed(1),
      avgMttr: Math.round(39 * randomFactor),
      todaysImpact: (27990 * randomFactor),
      monthlyProjection: (278.4 * randomFactor).toFixed(1),
      costPerMinute: Math.round(1890 * randomFactor),
    },
    outputByRegion: [
      { name: 'North', value: 7500 * randomFactor }, { name: 'East', value: 6800 * randomFactor },
      { name: 'West', value: 8200 * randomFactor }, { name: 'South', value: 7100 * randomFactor },
    ],
    costImpactByRegion: [
      { name: 'North', value: 150000 * randomFactor }, { name: 'East', value: 190000 * randomFactor },
      { name: 'West', value: 120000 * randomFactor }, { name: 'South', value: 160000 * randomFactor },
    ],
    regionalStats: [
      { name: 'North', oee: (70.4 * randomFactor).toFixed(1), efficiency: '66.5%' },
      { name: 'East', oee: (66.5 * randomFactor).toFixed(1), efficiency: '70.8%' },
      { name: 'West', oee: (70.8 * randomFactor).toFixed(1), efficiency: '67.8%' },
      { name: 'South', oee: (67.8 * randomFactor).toFixed(1), efficiency: '70.4%' },
    ],
    topIssues: [
      { name: 'Material Wastage', cost: (160 * randomFactor).toFixed(0), icon: TrendingDown },
      { name: 'Quality Hold', cost: (122 * randomFactor).toFixed(0), icon: TrendingDown },
      { name: 'Tool change', cost: (85 * randomFactor).toFixed(0), icon: TrendingDown },
    ],
    mttrByRegion: [
      { region: 'North', mttr: Math.round(35 * randomFactor), best: 'PLANT_N2' },
      { region: 'East', mttr: Math.round(45 * randomFactor), best: 'PLANT_E2' },
      { region: 'West', mttr: Math.round(32 * randomFactor), best: 'PLANT_W1' },
      { region: 'South', mttr: Math.round(42 * randomFactor), best: 'PLANT_S2' },
    ],
    changeovers: {
      regionalEfficiency: (84 * randomFactor).toFixed(0),
      avgSetup: (1.9 * randomFactor).toFixed(1),
      optimizationPotential: {
        bestPractice: Math.round(28 * randomFactor),
        currentAverage: Math.round(34 * randomFactor),
        improvementPotential: (18 * randomFactor).toFixed(0),
      }
    },
    firstPassYield: {
      regionalQuality: (90.4 * randomFactor).toFixed(1),
      costOfPoorQuality: (3.5 * randomFactor).toFixed(1),
    },
    fpyByRegion: [
      { name: 'North', value: (92 * randomFactor) },
      { name: 'East', value: (88 * randomFactor) },
      { name: 'West', value: (94 * randomFactor) },
      { name: 'South', value: (89 * randomFactor) },
    ],
    efficiencyByRegion: [
        { name: 'North', value: (75 * randomFactor) },
        { name: 'East', value: (68 * randomFactor) },
        { name: 'West', value: (82 * randomFactor) },
        { name: 'South', value: (71 * randomFactor) },
    ],
    detailedCostImpact: [
        { region: 'North', cost: (85 * randomFactor).toFixed(0), oee: (91.2 * randomFactor).toFixed(1), best: 'PLANT_N2', trend: 'up' },
        { region: 'East', cost: (125 * randomFactor).toFixed(0), oee: (87.8 * randomFactor).toFixed(1), best: 'PLANT_E2', trend: 'down' },
        { region: 'West', cost: (74 * randomFactor).toFixed(0), oee: (93.5 * randomFactor).toFixed(1), best: 'PLANT_W1', trend: 'up' },
        { region: 'South', cost: (108 * randomFactor).toFixed(0), oee: (89.1 * randomFactor).toFixed(1), best: 'PLANT_S2', trend: 'down' },
    ],
    regionalBestPractices: [
        { region: 'North', oee: (85 * randomFactor).toFixed(0), time: 32, cost: 45, practice: 'Quick Die Change' },
        { region: 'East', oee: (78 * randomFactor).toFixed(0), time: 39, cost: 58, practice: 'Preventive Purging' },
        { region: 'West', oee: (92 * randomFactor).toFixed(0), time: 28, cost: 38, practice: 'SMED Practices' },
        { region: 'South', oee: (81 * randomFactor).toFixed(0), time: 35, cost: 52, practice: 'Operator Training' },
    ],
    bestPerformingPlants: [
        { name: 'PLANT W1', region: 'West Region', fpy: (94.2 * randomFactor).toFixed(1) },
        { name: 'PLANT N2', region: 'North Region', fpy: (92.8 * randomFactor).toFixed(1) },
        { name: 'PLANT E2', region: 'East Region', fpy: (91.1 * randomFactor).toFixed(1) },
    ]
  };
};

const allCeoData = {
  today: generateCeoData(0),
  yesterday: generateCeoData(1),
  '2daysAgo': generateCeoData(2),
};

const CeoProductionDashboard = () => {
  const { selectedDate } = useDate();
  const data = allCeoData[selectedDate];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div><CardTitle>Shift Output</CardTitle><p className="text-sm text-muted-foreground">Regional Comparison</p></div>
              <div className="text-right"><p className="text-2xl font-bold">{data.kpi.shiftOutput}K</p><p className="text-sm text-muted-foreground">Total Units</p></div>
              <div className="text-right"><p className="text-2xl font-bold">{data.kpi.avgOee}%</p><p className="text-sm text-muted-foreground">Avg OEE</p></div>
            </div>
          </CardHeader>
          <CardContent><div className="h-60"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.outputByRegion}><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />Downtime
                </CardTitle>
                <CardDescription className="text-xs">Regional Impact</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-center pt-2">
                <div>
                    <p className="text-xl font-bold">₹{data.kpi.downtimeCost}L</p>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                </div>
                <div>
                    <p className="text-xl font-bold">{data.kpi.avgMttr}</p>
                    <p className="text-xs text-muted-foreground">Avg MTTR</p>
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />Cost Impact Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-muted-foreground">Today's Impact</p>
                    <p className="font-semibold">₹{Math.round(data.kpi.todaysImpact / 1000)}k</p>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-muted-foreground">Monthly Projection</p>
                    <p className="font-semibold">₹{data.kpi.monthlyProjection}L</p>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-muted-foreground">Cost per Minute</p>
                    <p className="font-semibold">₹{data.kpi.costPerMinute.toLocaleString()}</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Top Issues by Cost</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {data.topIssues.map(issue => (
                    <div key={issue.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <issue.icon className="h-5 w-5 text-red-500" />
                            <span className="font-medium">{issue.name}</span>
                        </div>
                        <span className="font-bold text-lg">₹{issue.cost}K</span>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>MTTR by Region</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {data.mttrByRegion.map(region => (
                    <div key={region.region} className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-2xl font-bold">{region.mttr}</p>
                        <p className="text-sm text-muted-foreground">min</p>
                        <p className="font-semibold mt-1">{region.region}</p>
                        <p className="text-xs text-muted-foreground">Best: {region.best}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-orange-500" />Changeovers</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex justify-between items-baseline mb-4">
                      <div>
                          <p className="text-3xl font-bold">{data.changeovers.regionalEfficiency}%</p>
                          <p className="text-sm text-muted-foreground">Regional Efficiency</p>
                      </div>
                      <div>
                          <p className="text-xl font-bold">₹{data.changeovers.avgSetup}L</p>
                          <p className="text-sm text-muted-foreground">Avg Setup Cost</p>
                      </div>
                  </div>
                  <Card className="bg-green-50 border-green-200">
                      <CardHeader className="pb-2"><CardTitle className="text-base text-green-800">Optimization Potential</CardTitle></CardHeader>
                      <CardContent className="grid grid-cols-3 gap-2 text-center">
                          <div>
                              <p className="font-bold text-lg">{data.changeovers.optimizationPotential.bestPractice} min</p>
                              <p className="text-xs text-muted-foreground">Best Practice</p>
                          </div>
                          <div>
                              <p className="font-bold text-lg">{data.changeovers.optimizationPotential.currentAverage} min</p>
                              <p className="text-xs text-muted-foreground">Current Average</p>
                          </div>
                          <div>
                              <p className="font-bold text-lg text-green-600">{data.changeovers.optimizationPotential.improvementPotential}%</p>
                              <p className="text-xs text-muted-foreground">Improvement</p>
                          </div>
                      </CardContent>
                  </Card>
              </CardContent>
          </Card>
          <Card className="lg:col-span-2">
              <CardHeader>
                  <div className="flex justify-between items-start">
                      <div>
                          <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" />First Pass Yield</CardTitle>
                          <p className="text-sm text-muted-foreground">Regional Quality Analysis</p>
                      </div>
                      <div className="text-right">
                          <p className="text-3xl font-bold">{data.firstPassYield.regionalQuality}%</p>
                          <p className="text-sm text-muted-foreground">Avg FPY</p>
                      </div>
                      <div className="text-right">
                          <p className="text-3xl font-bold">₹{data.firstPassYield.costOfPoorQuality}L</p>
                          <p className="text-sm text-muted-foreground">Cost of Poor Quality</p>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.fpyByRegion} margin={{ top: 20 }}><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis domain={[80, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]}><LabelList dataKey="value" position="top" formatter={(value: number) => `${value.toFixed(0)}%`} /></Bar></BarChart></ResponsiveContainer></div>
              </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader><CardTitle>Efficiency by Region</CardTitle></CardHeader>
              <CardContent><div className="h-60"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.efficiencyByRegion}><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis domain={[50, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></CardContent>
          </Card>
          <Card>
              <CardHeader><CardTitle>Cost Impact by Region</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                  {data.detailedCostImpact.map(item => (
                      <div key={item.region} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50">
                          <div className="font-semibold">{item.region}</div>
                          <div className="text-right">
                              <p className="font-bold text-lg">₹{item.cost}K</p>
                              <p className="text-xs text-muted-foreground">Best: {item.best}</p>
                          </div>
                          <div className={`flex items-center font-semibold ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                              {item.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                              {item.oee}%
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader><CardTitle>Regional Best Practices</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  {data.regionalBestPractices.map(item => (
                      <div key={item.region} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-baseline">
                              <p className="font-bold">{item.region}</p>
                              <p className="text-xl font-bold text-indigo-600">{item.oee}%</p>
                          </div>
                          <p className="text-sm font-medium text-blue-700 mt-2">{item.practice}</p>
                          <p className="text-xs text-muted-foreground">Avg Time: {item.time} min</p>
                          <p className="text-xs text-muted-foreground">Cost Impact: ₹{item.cost}K</p>
                      </div>
                  ))}
              </CardContent>
          </Card>
          <Card>
              <CardHeader><CardTitle>Best Performing Plants</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                  {data.bestPerformingPlants.map(plant => (
                      <div key={plant.name} className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                          <div className="flex justify-between items-center">
                              <div>
                                  <p className="font-bold text-lg">{plant.name}</p>
                                  <p className="text-sm text-muted-foreground">{plant.region}</p>
                              </div>
                              <div className="text-right">
                                  <p className="text-2xl font-bold text-green-600">{plant.fpy}%</p>
                                  <p className="text-xs text-muted-foreground">FPY</p>
                              </div>
                          </div>
                      </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-2">Key success factors: Process standardization, proactive maintenance, operator training.</p>
              </CardContent>
          </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Notes</CardTitle>
          </CardHeader>
          <CardContent>
              <Tabs defaultValue="overview">
                  <div className="flex flex-wrap justify-between items-center border-b">
                      <TabsList className="bg-transparent p-0 border-b-0">
                          <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none text-muted-foreground">Regional Health Overview</TabsTrigger>
                          <TabsTrigger value="ai-brief" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none text-muted-foreground">Executive AI Brief</TabsTrigger>
                          <TabsTrigger value="actions" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none text-muted-foreground">Critical Actions Required</TabsTrigger>
                      </TabsList>
                      <Button variant="outline"><Download className="h-4 w-4 mr-2" />Board Report Export</Button>
                  </div>
                  <TabsContent value="overview" className="pt-4">
                      <Tabs defaultValue="summary">
                          <TabsList>
                              <TabsTrigger value="summary">Executive Summary</TabsTrigger>
                              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                          </TabsList>
                          <TabsContent value="summary" className="pt-4">
                              <p className="text-muted-foreground">Executive dashboard for strategic decision making, highlighting key performance indicators and regional health at a glance.</p>
                              <Button variant="link" className="p-0 h-auto mt-4">Full Board Report Package</Button>
                          </TabsContent>
                          <TabsContent value="metrics" className="pt-4">
                              <p className="text-muted-foreground">Detailed performance metrics across all regions, including OEE, downtime, and quality scores.</p>
                          </TabsContent>
                      </Tabs>
                  </TabsContent>
                  <TabsContent value="ai-brief" className="pt-4"><p className="text-muted-foreground">AI-generated summary of key insights and recommendations.</p></TabsContent>
                  <TabsContent value="actions" className="pt-4"><p className="text-muted-foreground">List of critical actions that require immediate attention.</p></TabsContent>
              </Tabs>
          </CardContent>
      </Card>
    </div>
  );
};

// --- Plant Manager Dashboard Code ---

const generatePlantManagerInsights = (dayOffset: number) => {
    const randomFactor = 1 - dayOffset * 0.1;
    return [
        { type: "Quality Degradation Detected", subtitle: "Quality Prediction", message: `PLANT_S1 showing dimensional issues. Schedule tool calibration within 24 hours to prevent ${(12 * randomFactor).toFixed(0)}% scrap increase.`, recommendation: "View Details", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.96 * randomFactor, impact_estimate: { potential_gain: `₹${(2.5 * randomFactor).toFixed(1)}L`, cost_impact: `₹${(1.8 * randomFactor).toFixed(1)}L` } },
        { type: "Preventive Maintenance Window", subtitle: "Maintenance Optimizer", message: `PLANT_S1 with 13 machines - schedule PM during shift C changeover. Saves ${(3 * randomFactor).toFixed(0)} hours downtime.`, recommendation: "Take Action", priority: 2, icon: Wrench, tag: "high", confidence: 0.92 * randomFactor, impact_estimate: { potential_gain: `${(3 * randomFactor).toFixed(0)} hours`, cost_impact: `₹${(0.8 * randomFactor).toFixed(1)}L` } },
        { type: "Material Alert - PLANT_S1", subtitle: "Inventory Alert", message: "Black ABS moisture content above spec. Contact warehouse immediately.", recommendation: "View Details", priority: 1, icon: AlertTriangle, tag: "critical", confidence: 0.99 * randomFactor, impact_estimate: { potential_gain: "Quality improvement", cost_impact: `₹${(1.2 * randomFactor).toFixed(1)}L` } },
        { type: "Process Optimization - PLANT_S1", subtitle: "Operator Guidance", message: "Material drying protocol needed for humidity control. Historical success rate: 86%.", recommendation: "Take Action", priority: 3, icon: CheckCircle2, tag: "medium", confidence: 0.87 * randomFactor, impact_estimate: { potential_gain: "86% success rate", cost_impact: `₹${(0.5 * randomFactor).toFixed(1)}L` } },
    ];
};

const allPlantManagerInsights = {
    today: generatePlantManagerInsights(0),
    yesterday: generatePlantManagerInsights(1),
    '2daysAgo': generatePlantManagerInsights(2),
};

const generatePlantData = (role: Role, dayOffset: number) => {
    const multipliers: Record<string, number> = {
        'north-manager': 1.05,
        'south-manager': 0.98,
        'east-manager': 0.95,
        'west-manager': 1.1,
    };
    const baseMultiplier = multipliers[role] || 1;
    const randomFactor = (1 - dayOffset * 0.05) * baseMultiplier;

    return {
        plantName: `PLANT_${role.charAt(0).toUpperCase()}1`,
        shiftOutput: {
            actual: Math.round(3800 * randomFactor),
            planned: 4500,
            planImprovement: (84 * randomFactor).toFixed(0),
        },
        qualityBreakdown: {
            goodParts: { value: Math.round(3400 * randomFactor), percentage: (89.5 * randomFactor).toFixed(1) },
            rework: { value: Math.round(214 * (2 - randomFactor)), percentage: (5.6 * (2 - randomFactor)).toFixed(1) },
            scrap: { value: Math.round(147 * (2 - randomFactor)), percentage: (3.9 * (2 - randomFactor)).toFixed(1) },
        },
        productionTimeline: Array.from({ length: 12 }, (_, i) => ({
            time: `${String(12 + i).padStart(2, '0')}:00`,
            value: Math.round((150 + Math.sin(i) * 20 + Math.random() * 15) * randomFactor)
        })),
        downtime: {
            activeIncidents: Math.round(4 * randomFactor),
            totalIncidents: Math.round(163 * randomFactor),
            mttr: Math.round(32 / randomFactor),
        },
        activeIncidents: [
            { machine: 'Machine 1', issue: 'Maintenance', crew: 'A', time: '17:30:11', duration: Math.round(85 * randomFactor), priority: 'High' },
            { machine: 'Machine 2', issue: 'Material Shortage', crew: 'B', time: '16:30:11', duration: Math.round(108 * randomFactor), priority: 'High' },
            { machine: 'Machine 3', issue: 'Tool change', crew: 'C', time: '15:30:11', duration: Math.round(42 * randomFactor), priority: 'High' },
            { machine: 'Machine 4', issue: 'Quality issues', crew: 'A', time: '14:30:11', duration: Math.round(34 * randomFactor), priority: 'High' },
        ],
        machinePerformance: [
            { name: 'Machine 1', performance: (67 * randomFactor).toFixed(0), output: '17k/25k' },
            { name: 'Machine 2', performance: (62 * randomFactor).toFixed(0), output: '18k/28k' },
            { name: 'Machine 3', performance: (62 * randomFactor).toFixed(0), output: '27k/38k' },
            { name: 'Machine 4', performance: (62 * randomFactor).toFixed(0), output: '26k/34k' },
        ],
        durationByReason: [
            { name: 'Material shortage', value: 60 * randomFactor }, { name: 'Tool change', value: 45 * randomFactor },
            { name: 'Quality hold', value: 38 * randomFactor }, { name: 'Maintenance', value: 32 * randomFactor },
            { name: 'Sensor', value: 25 * randomFactor }, { name: 'No operator', value: 18 * randomFactor },
        ],
        downtimeTimeline: Array.from({ length: 12 }, (_, i) => ({
            time: `${String(9 + i).padStart(2, '0')}:00`,
            value: Math.round((10 + Math.cos(i) * 5 + Math.random() * 10) * randomFactor)
        })),
        mttrTrend: [
            { name: 'Mon', value: 35 * randomFactor }, { name: 'Tue', value: 42 * randomFactor },
            { name: 'Wed', value: 38 * randomFactor }, { name: 'Thu', value: 33 * randomFactor },
            { name: 'Fri', value: 45 * randomFactor }, { name: 'Sat', value: 30 * randomFactor },
            { name: 'Sun', value: 28 * randomFactor },
        ],
        changeovers: {
            warnings: Math.round(2 * randomFactor),
            completed: Math.round(1.6 * randomFactor),
            total: 6,
            crewEfficiency: (84 * randomFactor).toFixed(0),
            avgTime: Math.round(37 / randomFactor),
            activeWarnings: [
                { title: 'Tool alignment critical on Machine 5 - double check', details: 'Machine 5 tool alignment' },
                { title: 'PART_E345 material not staged - potential 15 min delay', details: 'Machine 2 • material availability' },
            ],
            currentProgress: {
                machine: 'Machine 5: PART_C789 → PART_D012',
                started: '17:45:11 • ETC: 18:45:11',
                stepsComplete: 3,
                totalSteps: 6,
                crew: 'A',
                steps: [
                    { name: 'Remove old tool', time: 8, completed: true },
                    { name: 'Clean station', time: 5, completed: true },
                    { name: 'Install new tool', time: 12, completed: true },
                    { name: 'Calibration', time: 10, completed: false },
                    { name: 'First article', time: 7, completed: false },
                    { name: 'Quality check', time: 3, completed: false },
                ]
            }
        },
        firstPassYield: {
            current: (87.2 * randomFactor).toFixed(1),
            target: 95,
            trend: 'Increasing',
            topDefect: { name: 'Dimensional', percentage: (45 * randomFactor).toFixed(0) }
        },
        spcChart: Array.from({ length: 20 }, (_, i) => ({
            name: i + 1,
            value: (90 + Math.sin(i * 0.8) * 3 + Math.random() * 4) * randomFactor
        })),
        fpyByItem: [
            { name: 'PART_A123', mold: 'MOLD_01', fpy: (94.2 * randomFactor).toFixed(1), defects: 12 },
            { name: 'PART_B456', mold: 'MOLD_02', fpy: (87.5 * randomFactor).toFixed(1), defects: 28 },
            { name: 'PART_C789', mold: 'MOLD_03', fpy: (91.8 * randomFactor).toFixed(1), defects: 15 },
            { name: 'PART_D012', mold: 'MOLD_04', fpy: (82.3 * randomFactor).toFixed(1), defects: 45 },
            { name: 'PART_E345', mold: 'MOLD_05', fpy: (96.1 * randomFactor).toFixed(1), defects: 8 },
        ],
        changeoverSchedule: [
            { machine: 1, from: 'PART_S1', to: 'PART_S2', planned: 35, actual: 30, crew: 'A', status: 'completed', time: '6:0' },
            { machine: 2, from: 'PART_S2', to: 'PART_S3', planned: 41, actual: 43, crew: 'B', status: 'completed', time: '8:15' },
            { machine: 3, from: 'PART_S3', to: 'PART_S4', planned: 45, crew: 'C', status: 'pending', time: '10:30' },
            { machine: 4, from: 'PART_S4', to: 'PART_S1', planned: 28, crew: 'A', status: 'pending', time: '12:45' },
            { machine: 5, from: 'PART_S1', to: 'PART_S2', planned: 37, crew: 'B', status: 'pending', time: '14:0' },
        ],
        supplierPerformance: [
            { name: 'Supplier A', material: 'ABS Plastic', fpy: (95.2 * randomFactor).toFixed(1), lots: 12, issues: 1 },
            { name: 'Supplier B', material: 'Nylon PA66', fpy: (89.7 * randomFactor).toFixed(1), lots: 8, issues: 3 },
            { name: 'Supplier C', material: 'Polypropylene', fpy: (92.1 * randomFactor).toFixed(1), lots: 15, issues: 2 },
        ],
        crewPerformance: [
            { name: 'Crew A', value: 38 * randomFactor },
            { name: 'Crew B', value: 29 * randomFactor },
            { name: 'Crew C', value: 42 * randomFactor },
        ],
        notes: [
            { title: 'Machine 5 bottleneck resolution', team: 'Maintenance Team', status: 'in-progress' },
            { title: 'Blue ABS material investigation', team: 'Quality Inspector', status: 'assigned' },
            { title: 'Cavity 3 maintenance scheduling', team: 'Production Lead', status: 'pending' },
        ]
    };
};

const allPlantData: Record<string, any> = {
    today: {},
    yesterday: {},
    '2daysAgo': {},
};

['north-manager', 'south-manager', 'east-manager', 'west-manager'].forEach(role => {
    allPlantData.today[role] = generatePlantData(role as Role, 0);
    allPlantData.yesterday[role] = generatePlantData(role as Role, 1);
    allPlantData['2daysAgo'][role] = generatePlantData(role as Role, 2);
});

const PlantManagerProductionDashboard = ({ role }: { role: Role }) => {
    const { selectedDate } = useDate();
    const data = allPlantData[selectedDate][role];
    const [activeTab, setActiveTab] = useState("production");

    const qualityPieData = [
        { name: 'Good Parts', value: parseFloat(data.qualityBreakdown.goodParts.percentage) },
        { name: 'Rework', value: parseFloat(data.qualityBreakdown.rework.percentage) },
        { name: 'Scrap', value: parseFloat(data.qualityBreakdown.scrap.percentage) },
    ];
    const COLORS = ['#22c55e', '#f97316', '#ef4444'];

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="production">Production</TabsTrigger>
                    <TabsTrigger value="changeovers">Changeovers</TabsTrigger>
                    <TabsTrigger value="quality">First Pass Yield</TabsTrigger>
                </TabsList>
                <TabsContent value="production" className="mt-6 space-y-6">
                    {/* Production Tab Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Shift Output</span>
                                    <Badge variant="outline" className="font-normal"><Clock className="h-3 w-3 mr-1" /> 3h remaining</Badge>
                                </CardTitle>
                                <CardDescription>{data.plantName} - Shift C (65% Complete)</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-4 text-center">
                                <div><p className="text-2xl font-bold">{data.shiftOutput.actual.toLocaleString()}</p><p className="text-xs text-muted-foreground">Actual</p></div>
                                <div><p className="text-2xl font-bold text-muted-foreground">{data.shiftOutput.planned.toLocaleString()}</p><p className="text-xs text-muted-foreground">Planned</p></div>
                                <div><p className="text-2xl font-bold text-green-600">{data.shiftOutput.planImprovement}%</p><p className="text-xs text-muted-foreground">Plan Improvement</p></div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>Quality Breakdown</CardTitle></CardHeader>
                            <CardContent className="flex items-center gap-6">
                                <div className="grid grid-cols-3 gap-4 text-center flex-1">
                                    <div><p className="text-2xl font-bold text-green-600">{data.qualityBreakdown.goodParts.value.toLocaleString()}</p><p className="text-xs text-muted-foreground">{data.qualityBreakdown.goodParts.percentage}% Good Parts</p></div>
                                    <div><p className="text-2xl font-bold text-orange-500">{data.qualityBreakdown.rework.value.toLocaleString()}</p><p className="text-xs text-muted-foreground">{data.qualityBreakdown.rework.percentage}% Rework</p></div>
                                    <div><p className="text-2xl font-bold text-red-500">{data.qualityBreakdown.scrap.value.toLocaleString()}</p><p className="text-xs text-muted-foreground">{data.qualityBreakdown.scrap.percentage}% Scrap</p></div>
                                </div>
                                <div className="h-24 w-24"><ResponsiveContainer><PieChart><Pie data={qualityPieData} dataKey="value" cx="50%" cy="50%" innerRadius={25} outerRadius={40} paddingAngle={5}>{qualityPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie></PieChart></ResponsiveContainer></div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader><CardTitle>Production Timeline (Last 12 Hours)</CardTitle></CardHeader>
                        <CardContent className="h-60"><ResponsiveContainer><LineChart data={data.productionTimeline}><XAxis dataKey="time" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></CardContent>
                    </Card>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" />Downtime</div>
                                    <div><Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></div>
                                </CardTitle>
                                <CardDescription>{data.plantName} Operations</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-4 text-center">
                                <div><p className="text-2xl font-bold">{data.downtime.activeIncidents}</p><p className="text-xs text-muted-foreground">Active Incidents</p></div>
                                <div><p className="text-2xl font-bold text-muted-foreground">{data.downtime.totalIncidents}</p><p className="text-xs text-muted-foreground">Total Today</p></div>
                                <div><p className="text-2xl font-bold">{data.downtime.mttr}</p><p className="text-xs text-muted-foreground">MTTR (mins)</p></div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>Active Incidents</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                {data.activeIncidents.slice(0, 3).map((incident, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-50">
                                        <div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-red-500" /><div><span className="font-semibold">{incident.machine}</span><p className="text-xs text-muted-foreground">{incident.issue} • Crew {incident.crew} • Started {incident.time}</p></div></div>
                                        <div className="text-right"><p className="font-bold text-red-600">{incident.duration} min</p><p className="text-xs text-muted-foreground">{incident.priority} Priority</p></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="changeovers" className="mt-6 space-y-6">
                    {/* Changeovers Tab Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center"><span>Changeovers</span><Badge variant="destructive">{data.changeovers.warnings} Warnings</Badge></CardTitle>
                                <CardDescription>{data.plantName} Operations</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-4 text-center">
                                <div><p className="text-2xl font-bold">{data.changeovers.completed}/{data.changeovers.total}</p><p className="text-xs text-muted-foreground">Completed Today</p></div>
                                <div><p className="text-2xl font-bold">{data.changeovers.crewEfficiency}%</p><p className="text-xs text-muted-foreground">Crew Efficiency</p></div>
                                <div><p className="text-2xl font-bold">{data.changeovers.avgTime}</p><p className="text-xs text-muted-foreground">Avg Time (mins)</p></div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>Active Warnings</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                {data.changeovers.activeWarnings.map((warn, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div><p className="font-semibold text-sm">{warn.title}</p><p className="text-xs text-muted-foreground">{warn.details}</p></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Current Changeover Progress</CardTitle>
                                <CardDescription>{data.changeovers.currentProgress.machine}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Steps Complete</span>
                                    <Badge variant="outline">Crew {data.changeovers.currentProgress.crew}</Badge>
                                </div>
                                <Progress value={(data.changeovers.currentProgress.stepsComplete / data.changeovers.currentProgress.totalSteps) * 100} className="w-full" />
                                <p className="text-xs text-muted-foreground mt-1">{data.changeovers.currentProgress.stepsComplete} / {data.changeovers.currentProgress.totalSteps} Steps</p>
                                <Separator className="my-4" />
                                <ul className="space-y-2 text-sm">
                                    {data.changeovers.currentProgress.steps.map((step, i) => (
                                        <li key={i} className={`flex items-center justify-between ${step.completed ? 'text-muted-foreground' : 'font-medium'}`}>
                                            <div className="flex items-center gap-2">
                                                {step.completed ? <CircleCheck className="h-4 w-4 text-green-500" /> : <Clock10 className="h-4 w-4 text-blue-500" />}
                                                <span>{step.name}</span>
                                            </div>
                                            <span>{step.time} min</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>Today's Changeover Schedule (Gantt Chart)</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                {data.changeoverSchedule.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-2 rounded-lg bg-slate-50">
                                        <div className="text-center w-12"><p className="font-bold">{item.time}</p></div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Machine {item.machine}: {item.from} → {item.to}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Planned: {item.planned} min {item.actual ? `• Actual: ${item.actual} min` : ''}
                                                {item.actual && <span className={item.actual <= item.planned ? 'text-green-600' : 'text-red-600'}> ({item.actual - item.planned} min)</span>}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">Crew {item.crew}</Badge>
                                            {item.status === 'completed' ? <CircleCheck className="h-5 w-5 text-green-500" /> : <Clock10 className="h-5 w-5 text-gray-400" />}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="quality" className="mt-6 space-y-6">
                    {/* FPY Tab Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center"><span>First Pass Yield</span><Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button></CardTitle>
                                <CardDescription>Plant Quality Control</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-5xl font-bold text-green-600">{data.firstPassYield.current}%</p>
                                <p className="text-sm text-muted-foreground">Target: {data.firstPassYield.target}%</p>
                                <p className={`text-sm font-semibold mt-2 ${data.firstPassYield.trend === 'Increasing' ? 'text-green-500' : 'text-red-500'}`}>{data.firstPassYield.trend}</p>
                                <Separator className="my-4" />
                                <p className="text-sm font-semibold">Top Defect</p>
                                <p className="text-lg font-bold text-red-500">{data.firstPassYield.topDefect.name}</p>
                                <p className="text-xs text-muted-foreground">{data.firstPassYield.topDefect.percentage}% of issues</p>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>SPC Control Chart</CardTitle></CardHeader>
                            <CardContent className="h-72">
                                <ResponsiveContainer>
                                    <LineChart data={data.spcChart} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[80, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} name="FPY" />
                                        <Line type="monotone" dataKey={() => 97} stroke="#ef4444" strokeDasharray="5 5" name="UCL" />
                                        <Line type="monotone" dataKey={() => 83} stroke="#ef4444" strokeDasharray="5 5" name="LCL" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader><CardTitle>FPY by Item/Tool</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.fpyByItem.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-10 rounded-full ${parseFloat(item.fpy) > 95 ? 'bg-green-500' : parseFloat(item.fpy) > 90 ? 'bg-blue-500' : parseFloat(item.fpy) > 85 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.mold}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold">{item.fpy}%</p>
                                        <p className="text-xs text-muted-foreground">{item.defects} defects</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Card>
                <CardHeader><CardTitle>Notes</CardTitle><CardDescription>Operational Details</CardDescription></CardHeader>
                <CardContent>
                    <Tabs defaultValue="health">
                        <TabsList>
                            <TabsTrigger value="health">Plant Health Status</TabsTrigger>
                            <TabsTrigger value="brief">Operational AI Brief</TabsTrigger>
                            <TabsTrigger value="comments">Shift Comments</TabsTrigger>
                            <TabsTrigger value="ownership">Task Ownership</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ownership" className="pt-4">
                            {data.notes.map((note, i) => (
                                <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-md">
                                    <div>
                                        <p className="font-medium">{note.title}</p>
                                        <p className="text-sm text-muted-foreground">{note.team}</p>
                                    </div>
                                    <Badge variant={note.status === 'assigned' ? 'default' : note.status === 'in-progress' ? 'secondary' : 'outline'}>{note.status}</Badge>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

const Production = () => {
  const { setInsights } = useAIInsights();
  const { currentRole } = useRole();
  const { selectedDate } = useDate();

  useEffect(() => {
    if (currentRole === 'ceo') {
      setInsights(allCeoInsights[selectedDate]);
    } else {
      setInsights(allPlantManagerInsights[selectedDate]);
    }
    return () => setInsights([]);
  }, [setInsights, currentRole, selectedDate]);

  return (
    <DashboardLayout title="Production" subtitle="Real-time manufacturing dashboard for comprehensive production oversight">
      <div className="flex-1 p-6 bg-slate-50/50">
        {currentRole === 'ceo' ? <CeoProductionDashboard /> : <PlantManagerProductionDashboard role={currentRole} />}
      </div>
    </DashboardLayout>
  );
};

export default Production;