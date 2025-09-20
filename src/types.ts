// Defines the alert levels for an AI insight
export type InsightLevel = 'alert' | 'opportunity' | 'prediction';

// Defines the possible statuses for a task or insight
export type InsightStatus = 'pending' | 'processing' | 'completed';

// Defines the structure of a single Insight object used in the AI Panel
export interface Insight {
  id: number;
  level: InsightLevel;
  title: string;
  category: string;
  description: string;
  status: InsightStatus;
}

// Defines the structure for a shipment in the table
export interface Shipment {
  id: string;
  destination: string;
  status: 'Delayed' | 'At Risk' | 'On Time';
  eta: string;
  carrier: string;
}

// Defines the complete data structure for the logistics overview API response
export interface LogisticsOverviewData {
  kpis: {
    inTransitShipments: {
      total: number;
      details: string;
    };
    onTimeDelivery: {
      percentage: number;
      details: string;
    };
    avgTransitTime: {
      value: string;
      details: string;
    };
    avgDwellTime: {
      value: string;
      details: string;
    };
  };
  charts: {
    shipmentsByStatus: { name: string; value: number }[];
    costByMode: { name: string; value: number }[];
  };
  criticalShipments: Shipment[];
  aiInsights: Insight[];
}


// src/types.ts

// ... (keep all existing types: Insight, Shipment, etc.)

// Add these new types for the Scheduler page
export interface MachineUtilization {
  day: string;
  utilization: number;
}

export interface ClashAlert {
  id: string;
  type: 'Clash' | 'Maintenance';
  description: string;
  time: string;
  severity: 'High' | 'Medium';
}

export interface PredictiveSignal {
  time: string;
  value: number;
  anomaly?: boolean; // Optional property to flag an anomaly
}


export interface Alert {
  id: string;
  description: string;
  type: 'Exception' | 'SLA Breach';
  severity: 'High' | 'Medium' | 'Low';
  owner: string;
  status: 'New' | 'Acknowledged';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CEO' | 'Plant Manager' | 'Admin';
  status: 'Active' | 'Invited';
  lastLogin: string;
}