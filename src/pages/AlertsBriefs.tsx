import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AlertsBriefs = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Alerts & Briefs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>New since last login</li>
                <li>Severity</li>
                <li>Owner</li>
                <li>Acknowledge</li>
                <li>Reassign</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Role-based brief</li>
                <li>Highlights</li>
                <li>PDF export</li>
                <li>Recipients</li>
                <li>Trend context</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>SLA Breaches</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Turnaround breaches</li>
                <li>Escalation path</li>
                <li>Aging queues</li>
                <li>Response time</li>
                <li>Auto-escalate</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>CSV/XLSX/PDF</li>
                <li>Saved views</li>
                <li>API keys</li>
                <li>Webhook Slack/Teams</li>
                <li>Schedule send</li>
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

export default AlertsBriefs;