export interface WeekData {
  week: number;
  phase: 'Cría' | 'Levante' | 'Producción';
  status: string;
  weightH: number;
  weightM: number;
  waterConsumption: number;
  feedConsumptionH: number;
  feedConsumptionM: number;
  uniformity: number;
  eggMass: number;
}

export type FocusTab = 'Manejo' | 'Iluminación' | 'Nutrición';

export interface FocusItem {
  id: string;
  category: FocusTab;
  title: string;
  description: string;
  icon: string; // Material Icon name
}