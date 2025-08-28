import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Production = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Production</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Shift Output</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Plan vs Actual</li>
                <li>Good/Rework/Scrap breakdown</li>
                <li>OEE</li>
                <li>Filters: shift/crew, machine</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Downtime</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Duration by reason</li>
                <li>Incidents</li>
                <li>MTTR trend</li>
                <li>Quick-pick reasons</li>
                <li>Attach photo/voice</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Changeovers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Planned vs actual</li>
                <li>Setup time and crew</li>
                <li>Overdue or clash warnings</li>
                <li>Re-setup risk</li>
                <li>What-if sequence</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>First Pass Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>FPY by item/tool</li>
                <li>SPC-like bands</li>
                <li>Drill: lot -&gt; inspection -&gt; CAPA</li>
                <li>Supplier/material view</li>
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

export default Production;