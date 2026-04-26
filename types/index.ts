export interface AdminSidebarProps {
  active: string;
  onNav?: (id: string) => void;
}

export interface HistoryRow {
  id: string;
  condition: string;
  risk: string;
  riskColor: string;
  confidence: number;
  barColor: string;
  date: string;
  status: string;
  statusStyle: string;
  imgColors: [string, string, string];
}
 export interface FeedbackItem {
  id: string;
  category: string;
  excerpt: string;
  date: string;
  status: string;
  statusStyle: string;
  rating: number;
}

export interface Case {
  id: string;
  clinician: string;
  clinicianRole: string;
  condition: string;
  conditionColor: string;
  confidence: number;
  confidenceColor: string;
  iqa: "Pass" | "Marginal" | "Fail";
  date: string;
  skinType: string;
  imageQuality: number;
  finding: string;
  risk: "high" | "medium" | "low";
}