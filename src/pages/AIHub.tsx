import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AIHub = () => {
  return (
    <DashboardLayout title="AI Hub">
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>60-sec CEO Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Daily summary</li>
                <li>Risks</li>
                <li>3 actions</li>
                <li>Explainable bullets with links</li>
                <li>Send via Email/WhatsApp</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operator Copilot</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Guided downtime capture</li>
                <li>Hints</li>
                <li>Photo/voice input</li>
                <li>Multilingual</li>
                <li>Prompt templates</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>OEE/downtime/quality anomalies</li>
                <li>Confidence</li>
                <li>Snooze</li>
                <li>Root-cause links</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What-if Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Changeover reduction</li>
                <li>Extra crew</li>
                <li>Machine fix</li>
                <li>Projected OEE/output delta</li>
                <li>Save/compare scenarios</li>
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

export default AIHub;