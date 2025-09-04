import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AIInsight {
  type: string;
  confidence: number;
  message: string;
  recommendation: string;
  impact_estimate: {
    potential_gain?: string;
    cost_impact?: string;
  };
  priority: number;
}

interface AIInsightsContextType {
  insights: AIInsight[];
  setInsights: (insights: AIInsight[]) => void;
}

const AIInsightsContext = createContext<AIInsightsContextType | undefined>(undefined);

export const AIInsightsProvider = ({ children }: { children: ReactNode }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);

  return (
    <AIInsightsContext.Provider value={{ insights, setInsights }}>
      {children}
    </AIInsightsContext.Provider>
  );
};

export const useAIInsights = () => {
  const context = useContext(AIInsightsContext);
  if (context === undefined) {
    throw new Error('useAIInsights must be used within an AIInsightsProvider');
  }
  return context;
};