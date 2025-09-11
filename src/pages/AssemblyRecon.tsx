import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AssemblyRecon = () => {
  return (
    <DashboardLayout title="Assembly Reconciliation">
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>FG -&gt; Assembly Mismatch</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Production vs receive</li>
                <li>Shortage with tolerance</li>
                <li>Risk score</li>
                <li>Alerts</li>
                <li>Click to reconcile</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue Drilldown</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Item/batch/machine</li>
                <li>Audit trail</li>
                <li>Assign to store/production</li>
                <li>Comment & attach</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Release Right Qty</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Recommended release</li>
                <li>Buffer logic</li>
                <li>Inputs: takt, WIP, min/max</li>
                <li>Approval workflow</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traceability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Lot</li>
                <li>Mold</li>
                <li>Operator</li>
                <li>Shift</li>
                <li>QC</li>
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

export default AssemblyRecon;