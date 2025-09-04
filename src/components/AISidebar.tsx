import React from "react";
import { useAIInsights } from "@/context/AIInsightsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AISidebar = () => {
  const { insights } = useAIInsights();

  return (
    <aside className="dark w-64 bg-background text-foreground p-4 flex flex-col h-full border-l border-border">
      <div className="mb-8">
        <h2 className="text-xl font-bold">AI Insight Panel</h2>
      </div>
      {insights.length > 0 ? (
        <div className="space-y-4 overflow-y-auto">
          {insights.map((insight, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-semibold flex justify-between items-center">
                  {insight.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <Badge variant={insight.priority === 1 ? "destructive" : "secondary"}>
                    Priority {insight.priority}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-xs space-y-2">
                <p><span className="font-bold">Message:</span> {insight.message}</p>
                <p><span className="font-bold">Recommendation:</span> {insight.recommendation}</p>
                {insight.impact_estimate.potential_gain && (
                  <p className="text-green-400"><span className="font-bold">Potential Gain:</span> {insight.impact_estimate.potential_gain}</p>
                )}
                {insight.impact_estimate.cost_impact && (
                  <p className="text-yellow-400"><span className="font-bold">Cost Impact:</span> {insight.impact_estimate.cost_impact}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No AI insights available for the current view.</p>
      )}
    </aside>
  );
};

export default AISidebar;