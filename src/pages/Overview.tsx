import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useAIInsights } from "@/context/AIInsightsContext";
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, ArrowDown, ArrowUp, BarChart, CheckCircle, Clock, Gauge, Wrench } from "lucide-react";

// --- Data type definitions ---

// For main overview data
interface OeeSnapshot {
  availability: number; performance: number; quality: number; oee: number;
  target_oee: number; trend_7day: number[];
}
interface PlanVsActual {
  planned_quantity: number; actual_quantity: number; adherence_percentage: number;
  auto_explanation: string;
}
interface ScrapByMachine {
  machine_id: string; scrap_percentage: number; scrap_cost_inr: number; fpy: number;
}
interface AIInsight {
  type: string; confidence: number; message: string; recommendation: string;
  impact_estimate: { potential_gain?: string; cost_impact?: string; };
  priority: number;
}
interface OverviewData {
  oee_snapshot: OeeSnapshot; plan_vs_actual: PlanVsActual; top_losses: any[];
  scrap_by_machine: ScrapByMachine[]; ai_insights: AIInsight[];
}

// For KPI tile data
interface KpiTile {
  value: number;
  trend: 'up' | 'down';
  status: 'good' | 'warning' | 'danger';
}
interface KpiData {
  oee_tile: KpiTile;
  quality_tile: KpiTile;
  production_tile: KpiTile;
  downtime_tile: KpiTile;
}

// --- API fetch functions ---

const fetchOverviewData = async (): Promise<OverviewData> => {
  const response = await fetch('https://poc-85nh.onrender.com/api/overview/executive');
  if (!response.ok) throw new Error('Network response was not ok for overview data');
  return response.json();
};

const fetchKpiData = async (): Promise<KpiData> => {
  const response = await fetch('https://poc-85nh.onrender.com/api/overview/kpi-tiles');
  if (!response.ok) throw new Error('Network response was not ok for KPI tiles');
  return response.json();
};

const Overview = () => {
  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useQuery<OverviewData>({
    queryKey: ['overviewData'],
    queryFn: fetchOverviewData,
  });

  const { data: kpiData, isLoading: isKpiLoading, isError: isKpiError } = useQuery<KpiData>({
    queryKey: ['kpiData'],
    queryFn: fetchKpiData,
  });

  const { setInsights } = useAIInsights();

  useEffect(() => {
    if (overviewData?.ai_insights) {
      setInsights(overviewData.ai_insights);
    }
    return () => {
      setInsights([]); // Clear insights on component unmount
    };
  }, [overviewData, setInsights]);

  const isLoading = isOverviewLoading || isKpiLoading;
  const isError = isOverviewError || isKpiError;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid gap-6 md:grid-cols-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load executive overview data. Please try again later.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const trendData = overviewData.oee_snapshot.trend_7day.map((value, index) => ({ name: `Day ${index + 1}`, oee: value }));

  const kpiTiles = [
    { title: "OEE", data: kpiData.oee_tile, icon: <Gauge className="h-4 w-4 text-muted-foreground" />, unit: "%" },
    { title: "Quality", data: kpiData.quality_tile, icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />, unit: "%" },
    { title: "Production Adherence", data: kpiData.production_tile, icon: <BarChart className="h-4 w-4 text-muted-foreground" />, unit: "%" },
    { title: "Downtime", data: kpiData.downtime_tile, icon: <Clock className="h-4 w-4 text-muted-foreground" />, unit: " hrs" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-500';
      case 'danger': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Executive Overview</h1>

        <div className="grid gap-6 md:grid-cols-4 mb-6">
          {kpiTiles.map((tile) => (
            <Card key={tile.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{tile.title}</CardTitle>
                {tile.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tile.data.value.toFixed(1)}{tile.unit}</div>
                <p className={`text-xs flex items-center ${getStatusColor(tile.data.status)}`}>
                  {tile.data.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  vs last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Gauge className="h-5 w-5" /> OEE Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{overviewData.oee_snapshot.oee.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Overall OEE</p>
                </div>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <Tooltip contentStyle={{ fontSize: '12px', padding: '2px 8px' }} />
                      <Line type="monotone" dataKey="oee" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div><p className="font-semibold">{overviewData.oee_snapshot.availability.toFixed(1)}%</p><p className="text-xs text-muted-foreground">Availability</p></div>
                <div><p className="font-semibold">{overviewData.oee_snapshot.performance.toFixed(1)}%</p><p className="text-xs text-muted-foreground">Performance</p></div>
                <div><p className="font-semibold">{overviewData.oee_snapshot.quality.toFixed(1)}%</p><p className="text-xs text-muted-foreground">Quality</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5" /> Plan vs Actual (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><p className="font-semibold">{overviewData.plan_vs_actual.planned_quantity.toLocaleString()}</p><p className="text-xs text-muted-foreground">Planned</p></div>
                <div><p className="font-semibold">{overviewData.plan_vs_actual.actual_quantity.toLocaleString()}</p><p className="text-xs text-muted-foreground">Actual</p></div>
              </div>
              <Progress value={overviewData.plan_vs_actual.adherence_percentage} className="w-full mb-2" />
              <p className="text-sm text-center mb-4">{overviewData.plan_vs_actual.adherence_percentage.toFixed(1)}% Adherence</p>
              <p className="text-xs text-muted-foreground italic">AI Note: {overviewData.plan_vs_actual.auto_explanation}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5" /> Scrap by Machine</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead className="text-right">Scrap %</TableHead>
                  <TableHead className="text-right">Scrap Cost (INR)</TableHead>
                  <TableHead className="text-right">FPY %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewData.scrap_by_machine.map((machine) => (
                  <TableRow key={machine.machine_id}>
                    <TableCell>{machine.machine_id.replace('_', ' ')}</TableCell>
                    <TableCell className="text-right text-red-500">{machine.scrap_percentage.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">₹{machine.scrap_cost_inr.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right text-green-600">{machine.fpy.toFixed(2)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Overview;