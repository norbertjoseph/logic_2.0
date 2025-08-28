import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Logistics = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Logistics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Dispatch/Receipt</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Gate in/out</li>
                <li>LR/GRN capture</li>
                <li>Photos</li>
                <li>SLA warnings for dwell time</li>
                <li>Driver app hooks</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Late/Idle Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Loss by lane</li>
                <li>Reason tags</li>
                <li>Trends</li>
                <li>Anomaly flag</li>
                <li>Link to carrier</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Transport Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>FTL/LTL mix</li>
                <li>Cost per kg</li>
                <li>Consolidation</li>
                <li>What-if load plan</li>
                <li>Carrier compare</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warehouse</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Bin occupancy</li>
                <li>Pick path</li>
                <li>Putaway exceptions</li>
                <li>ABC analysis</li>
                <li>Slotting aid</li>
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

export default Logistics;