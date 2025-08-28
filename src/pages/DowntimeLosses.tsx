import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DowntimeLosses = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Downtime & Losses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Pareto by Reason</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Top N reasons</li>
                <li>Cumulative % line</li>
                <li>Drilldowns</li>
                <li>Before/after actions</li>
                <li>Effect link</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MTTR / MTBF</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>By machine</li>
                <li>7/30/90-day windows</li>
                <li>Trend bands</li>
                <li>Targets</li>
                <li>Health score</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Loss Tree</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>A-&gt;R-&gt;Q decomposition</li>
                <li>Bottleneck highlight</li>
                <li>Click to filter all charts</li>
                <li>Cross-correlation hints</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>A3 Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Owner</li>
                <li>Due date</li>
                <li>Status</li>
                <li>Attachments</li>
                <li>SLA timer</li>
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

export default DowntimeLosses;