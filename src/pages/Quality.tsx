import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Quality = () => {
  return (
    <DashboardLayout title="Quality">
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Defects by Tool/Mold</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Top defects</li>
                <li>Cavity heatmap</li>
                <li>Attach photos/notes</li>
                <li>Cluster similar defects</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scrap Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>INR cost by machine/item</li>
                <li>Recovery trend</li>
                <li>Variance vs plan</li>
                <li>Alerts</li>
                <li>Root-cause link</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>First Pass Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>FPY by family</li>
                <li>Sigma bands</li>
                <li>Compare shift vs shift</li>
                <li>Defect mix overlay</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CAPA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Open vs closed</li>
                <li>Lead time</li>
                <li>Effectiveness</li>
                <li>Link to NCR</li>
                <li>Evidence</li>
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

export default Quality;