import type {  Shipment,Insight,Alert, MachineUtilization, ClashAlert, PredictiveSignal } from './types';
import type { User } from './types';


export const criticalShipments: Shipment[] = [
  { id: 'SH-8321', destination: 'Mumbai, MH', status: 'Delayed', eta: 'Sep 6, 14:00', carrier: 'BlueDart' },
  { id: 'SH-8329', destination: 'Bengaluru, KA', status: 'At Risk', eta: 'Sep 5, 18:00', carrier: 'Delhivery' },
  { id: 'SH-8401', destination: 'Kolkata, WB', status: 'Delayed', eta: 'Sep 7, 11:00', carrier: 'DTDC' },
  { id: 'SH-8415', destination: 'Chennai, TN', status: 'On Time', eta: 'Sep 5, 09:00', carrier: 'Gati' },
];

// The 'id' and 'status' properties have been added to each object below
export const aiInsights: Insight[] = [
  {
    id: 1,
    status: 'pending',
    level: 'alert',
    title: 'Transport Optimization Needed',
    category: 'FTL/LTL/Courier',
    description: '15% of LTL shipments to North region can be consolidated into FTL, saving an estimated ₹8.5L/month.',
  },
  {
    id: 2,
    status: 'pending',
    level: 'opportunity',
    title: 'Dynamic Routing Suggested',
    category: 'Route Planning',
    description: 'Weather patterns predict heavy rain on the NH48 route. Rerouting 22 shipments via SH76 can prevent an average of 4 hours in delays.',
  },
  {
    id: 3,
    status: 'pending',
    level: 'prediction',
    title: 'Carrier Performance Alert',
    category: 'Carrier Scoring',
    description: 'Carrier "Gati" OTD has dropped by 8% in the last 7 days for the Southern region. Consider re-assigning critical shipments.',
  },
];

export const costByModeData = [
  { name: 'Road (FTL)', value: 45 },
  { name: 'Road (LTL)', value: 25 },
  { name: 'Rail', value: 18 },
  { name: 'Air', value: 12 },
];


// src/mockData.ts


export const schedulerInsights: Insight[] = [
  {
    id: 4,
    status: 'pending',
    level: 'opportunity',
    title: 'Multi-objective Optimization',
    category: 'Delivery/Cost/Quality',
    description: 'Re-sequencing orders 1138 and 1142 on Machine 4 can improve delivery time by 8% with only a 2% increase in cost.',
  },
  {
    id: 5,
    status: 'pending',
    level: 'alert',
    title: 'Dynamic Rescheduling Required',
    category: 'Robust Plans',
    description: 'Material shortage for Mold B will impact 4 upcoming jobs. Auto-reschedule to prioritize high-margin orders?',
  },
  {
    id: 6,
    status: 'pending',
    level: 'prediction',
    title: 'Learning Scheduler Update',
    category: 'Actual vs Plan',
    description: 'Analysis of last 50 changeovers suggests Crew C\'s setup time is consistently 15% faster than planned. Model updated.',
  },
];

export const utilizationData: MachineUtilization[] = [
  { day: 'Mon', utilization: 85 },
  { day: 'Tue', utilization: 92 },
  { day: 'Wed', utilization: 88 },
  { day: 'Thu', utilization: 95 },
  { day: 'Fri', utilization: 91 },
  { day: 'Sat', utilization: 60 },
  { day: 'Sun', utilization: 55 },
];

export const clashAlerts: ClashAlert[] = [
    { id: 'C01', type: 'Clash', description: 'Mold M-102 required by Machine 3 & 5 simultaneously.', time: '14:30', severity: 'High' },
    { id: 'M01', type: 'Maintenance', description: 'Machine 2 scheduled for preventative maintenance.', time: '16:00', severity: 'Medium'},
    { id: 'C02', type: 'Clash', description: 'Crew A assigned to two parallel changeovers.', time: '18:00', severity: 'High' },
];


// src/mockData.ts

// ... (keep all existing exported data)

export const aiHubInsights: Insight[] = [
  {
    id: 7,
    status: 'pending',
    level: 'prediction',
    title: 'Executive Intelligence',
    category: 'Decision Trees',
    description: 'Predicted risk of 75% for delayed shipment SH-8401 due to carrier performance dip. Suggest re-assigning to BlueDart.',
  },
  {
    id: 8,
    status: 'pending',
    level: 'opportunity',
    title: 'Pattern Recognition',
    category: 'Optimization',
    description: 'Identified a recurring 3-hour downtime pattern on Machine 5 every Friday. Recommend proactive maintenance Thursday EOD.',
  },
];

export const predictiveSignalsData: PredictiveSignal[] = [
  { time: '08:00', value: 96 },
  { time: '09:00', value: 95 },
  { time: '10:00', value: 97 },
  { time: '11:00', value: 96 },
  { time: '12:00', value: 82, anomaly: true },
  { time: '13:00', value: 94 },
  { time: '14:00', value: 95 },
];



// ... (keep all existing exported data)

export const alertsAndBriefsInsights: Insight[] = [
  {
    id: 10,
    status: 'pending',
    level: 'alert',
    title: 'Priority Scoring by Impact',
    category: 'Urgency Analysis',
    description: 'Alert EX001 (OEE drop on Machine 5) has a 92% probability of impacting downstream orders. Urgency has been elevated to Critical.',
  },
  {
    id: 11,
    status: 'pending',
    level: 'opportunity',
    title: 'Personalized Alert Delivery',
    category: 'Fatigue Prevention',
    description: 'R. Sharma has acknowledged 5 similar low-severity alerts in 24h. Suggest bundling non-critical alerts to prevent fatigue.',
  },
];

export const alertsData: Alert[] = [
    { id: 'EX001', type: 'Exception', description: 'Machine 5 OEE dropped below 70% threshold', severity: 'High', owner: 'R. Sharma', status: 'New' },
    { id: 'SLA004', type: 'SLA Breach', description: 'Turnaround for PART_D012 exceeded 24h', severity: 'Medium', owner: 'S. Patel', status: 'New' },
    { id: 'EX002', type: 'Exception', description: 'Material shortage detected for next shift', severity: 'High', owner: 'Warehouse Lead', status: 'Acknowledged' },
    { id: 'SLA005', type: 'SLA Breach', description: 'Response time for quality issue QL-98 > 4 hours', severity: 'Low', owner: 'A. Kumar', status: 'New' },
];




export const usersData: User[] = [
    { id: 'usr_001', name: 'Anjali Sharma', email: 'anjali.sharma@example.com', role: 'CEO', status: 'Active', lastLogin: '2025-09-06 18:30' },
    { id: 'usr_002', name: 'Rohan Verma', email: 'rohan.verma@example.com', role: 'Plant Manager', status: 'Active', lastLogin: '2025-09-07 09:15' },
    { id: 'usr_003', name: 'Priya Mehta', email: 'priya.mehta@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-09-07 12:45' },
    { id: 'usr_004', name: 'Sanjay Patel', email: 'sanjay.patel@example.com', role: 'Plant Manager', status: 'Invited', lastLogin: 'Never' },
    { id: 'usr_005', name: 'Neha Gupta', email: 'neha.gupta@example.com', role: 'Plant Manager', status: 'Active', lastLogin: '2025-09-05 14:00' },
];