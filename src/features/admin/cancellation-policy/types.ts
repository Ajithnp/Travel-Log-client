export interface Rule {
  daysBeforeTrip: number;
  refundPercent: number;
}
 
export interface Policy {
  id: string;
  key: string;
  label: string;
  description?: string;
  rules: Rule[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

