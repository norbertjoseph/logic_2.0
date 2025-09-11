import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Scheduler = () => {
  return (
    <DashboardLayout title="Scheduler">
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Constraint-aware Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Machines</li>
                <li>Molds</li>
                <li>Changeovers</li>
                <li>Crew</li>
                <li>Material & QC locks</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Holiday surge</li>
                <li>Overtime</li>
                <li>Subcontract</li>
                <li>Compare A/B</li>
                <li>Save & share</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Utilization Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Week view</li>
                <li>Idle gaps</li>
                <li>Zoom</li>
                <li>Filter by line/machine</li>
                <li>Color by status</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Mold availability</li>
                <li>Maintenance windows</li>
                <li>Clash alerts</li>
                <li>Crew view</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
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

export default Scheduler;