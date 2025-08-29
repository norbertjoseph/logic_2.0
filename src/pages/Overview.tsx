import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, LineChart, BarChart, Wrench, ClipboardList } from "lucide-react"; // Importing icons

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Executive Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">OEE Snapshot</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>KPI tiles (A, R, Q, OEE)</li>
                <li>7-day trend</li>
                <li>Benchmarks</li>
                <li>Filters: Plant/Line/Machine</li>
                <li>Shift selector</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan vs Actual (Today)</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Target vs Output</li>
                <li>Adherence % and variance</li>
                <li>Date quick-pick</li>
                <li>Export CSV/PDF</li>
                <li>Auto-explain variance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Losses (Pareto)</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Loss by reason</li>
                <li>Cumulative line</li>
                <li>Drill to root cause</li>
                <li>Assign owner</li>
                <li>Add A3 task</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scrap by Machine</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Scrap % + cost impact</li>
                <li>FPY overlay</li>
                <li>Defect taxonomy toggle</li>
                <li>Trend bands</li>
                <li>Drill: machine -&gt; lot -&gt; image</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>One-glance health</li>
              <li>AI brief</li>
              <li>Links to details via cards</li>
              <li>Exports</li>
              <li>Comments</li>
              <li>Owners</li>
              <li>Confidence badges</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Overview;