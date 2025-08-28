import React from "react";

const AISidebar = () => {
  return (
    <aside className="w-64 bg-sidebar-right text-sidebar-right-foreground p-4 flex flex-col h-full border-l border-sidebar-border">
      <div className="mb-8">
        <h2 className="text-xl font-bold">AI Insight Panel</h2>
      </div>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>Dynamic KPI prioritization by business impact</li>
        <li>Context-aware variance explanations for KPI deltas</li>
        <li>Predictive KPI forecasting with confidence intervals</li>
        <li>Adaptive benchmark intelligence (mix/seasonality)</li>
        <li>Risk scoring + decision options with outcome modeling</li>
        <li>Customer impact predictor & cascade analysis</li>
        <li>Resource optimization suggestions (crew/machines)</li>
      </ul>
    </aside>
  );
};

export default AISidebar;