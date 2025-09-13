import React from "react";
import { useAIInsights } from "@/context/AIInsightsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, ArrowRight } from "lucide-react";

const priorityColors = {
  1: "#ef4444", // Red for High/Critical
  2: "#f59e0b", // Yellow for Medium/High
  3: "#3b82f6", // Blue for Low
};

const AISidebar = () => {
  const { insights } = useAIInsights();

  return (
    <aside className="w-80 bg-slate-50 text-gray-800 p-4 flex flex-col h-full border-l border-gray-200 shrink-0">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <BrainCircuit className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold">AI Insight Panel</h2>
          <p className="text-sm text-gray-500">Strategic Intelligence • Live</p>
        </div>
      </div>
      {insights.length > 0 ? (
        <div className="space-y-4 overflow-y-auto">
          {insights.map((insight, index) => (
            <Card 
              key={index} 
              className="bg-white border-l-4" 
              style={{ borderLeftColor: priorityColors[insight.priority] || '#6b7280' }}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-gray-800">
                    {insight.icon && <insight.icon className="h-4 w-4 text-gray-500" />}
                    {insight.type}
                  </CardTitle>
                  {insight.tag && (
                    <Badge variant="outline" className={
                      insight.tag === 'critical' 
                      ? 'bg-red-100 text-red-800 border-red-200 capitalize' 
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200 capitalize'
                    }>
                      {insight.tag}
                    </Badge>
                  )}
                </div>
                {insight.subtitle && <p className="text-xs text-gray-500 pt-1 ml-6">{insight.subtitle}</p>}
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs space-y-2">
                <p className="text-gray-600 leading-relaxed">{insight.message}</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline flex items-center text-[13px]">
                  {insight.recommendation} <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center mt-4">No AI insights available.</p>
      )}
    </aside>
  );
};

export default AISidebar;