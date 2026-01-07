export interface WeekData {
  week: number;
  phase: 'Cría' | 'Levante' | 'Producción';
  status: 'Óptimo' | 'Revisar';
  weightH: number;
  weightM: number;
  expectedWeightH?: number;
  expectedWeightM?: number;
  waterConsumption: number;
  feedConsumptionH: number;
  feedConsumptionM: number;
  expectedFeedH?: number;
  expectedFeedM?: number;
  uniformity: number;
  eggMass: number;
  densityInfo?: string | { days: string, value: string }[];
}

export interface FocusItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
}