import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import DashboardStats from './components/DashboardStats';
import FocusSection from './components/FocusSection';
import BottomNav from './components/BottomNav';
import { WeekData, FocusItem } from './types';

// --- MOCK DATA GENERATORS ---
// --- REAL DATA TABLES (from CSVs) ---
const realWeights: Record<number, { h: number, m: number }> = {
  0: { h: 40, m: 38 },
  1: { h: 70, m: 77 },
  2: { h: 124, m: 144 },
  3: { h: 201, m: 237 },
  4: { h: 283, m: 340 },
  5: { h: 371, m: 464 },
  6: { h: 469, m: 608 },
  7: { h: 577, m: 752 },
  8: { h: 680, m: 927 },
  9: { h: 783, m: 1092 },
  10: { h: 881, m: 1257 },
  11: { h: 979, m: 1411 },
  12: { h: 1066, m: 1576 },
  13: { h: 1154, m: 1741 },
  14: { h: 1226, m: 1885 },
  15: { h: 1298, m: 2019 },
  16: { h: 1365, m: 2081 },
  17: { h: 1447, m: 2153 },
  18: { h: 1530, m: 2260 },
  19: { h: 1600, m: 2300 },
  20: { h: 1670, m: 2350 }
};

const realConsumption: Record<number, { h: number, m: number }> = {
  0: { h: 10, m: 10 },
  1: { h: 14, m: 15 },
  2: { h: 21, m: 22 },
  3: { h: 27, m: 28 },
  4: { h: 30, m: 31 },
  5: { h: 34, m: 35 },
  6: { h: 36, m: 39 },
  7: { h: 40, m: 43 },
  8: { h: 45, m: 48 },
  9: { h: 50, m: 53 },
  10: { h: 55, m: 58 },
  11: { h: 60, m: 63 },
  12: { h: 65, m: 68 },
  13: { h: 69, m: 72 },
  14: { h: 72, m: 75 },
  15: { h: 74, m: 77 },
  16: { h: 76, m: 79 },
  17: { h: 79, m: 81 },
  18: { h: 82, m: 84 },
  19: { h: 87, m: 89 },
  20: { h: 93, m: 95 },
  21: { h: 104, m: 106 }
};

const realWaterConsumption: Record<number, number> = {
  1: 19, 2: 30, 3: 40, 4: 46, 5: 52, 6: 58, 7: 64, 8: 72, 9: 80, 10: 88,
  11: 96, 12: 104, 13: 110, 14: 117, 15: 120, 16: 122, 17: 126, 18: 130
};

const generateWeekData = (): WeekData[] => {
  const data: WeekData[] = [];
  for (let i = 0; i <= 75; i++) {
    let phase: 'Cría' | 'Levante' | 'Producción' = 'Cría';

    // Phase logic
    if (i <= 4) phase = 'Cría';
    else if (i <= 19) phase = 'Levante';
    else phase = 'Producción';

    // Get real or mock weights
    let weightH, weightM;
    if (realWeights[i]) {
      weightH = realWeights[i].h;
      weightM = realWeights[i].m;
    } else {
      const targetWeight = 1670 + ((i - 20) * 5); // Simple linear mock for 20+
      weightH = Math.floor(targetWeight + (Math.random() * 50 - 25));
      weightM = Math.floor(targetWeight * 0.95 + (Math.random() * 50 - 25));
    }

    // Get real or mock consumption
    let water, feedH, feedM;
    if (realConsumption[i]) {
      feedH = realConsumption[i].h;
      feedM = realConsumption[i].m;
    } else {
      feedH = i > 18 ? 112 + (Math.random() * 5) : 10 + (i * 5);
      feedM = i > 18 ? 115 + (Math.random() * 5) : 12 + (i * 5.2);
    }

    if (realWaterConsumption[i]) {
      water = realWaterConsumption[i];
    } else {
      water = i * 15 + (Math.random() * 10);
    }

    data.push({
      week: i,
      phase,
      status: Math.random() > 0.8 ? 'Revisar' : 'Óptimo',
      weightH,
      weightM,
      waterConsumption: water,
      feedConsumptionH: feedH,
      feedConsumptionM: feedM,
      uniformity: 98 - (Math.random() * 5),
      eggMass: i >= 20 ? 62 + (Math.random() * 2) : 0,
    });
  }
  return data;
};

const mockFocusItems: FocusItem[] = [
  { id: '1', category: 'Manejo', title: 'Densidad', description: 'Verificar espacio de comederos (10 cm/ave).', icon: 'groups' },
  { id: '2', category: 'Manejo', title: 'Ventilación', description: 'Ajustar mínima para control de humedad.', icon: 'air' },
  { id: '3', category: 'Iluminación', title: 'Estímulo', description: 'Incrementar 15 min esta semana.', icon: 'wb_sunny' },
  { id: '4', category: 'Nutrición', title: 'Calcio', description: 'Aumentar partícula gruesa al 65%.', icon: 'restaurant_menu' },
  { id: '5', category: 'Nutrición', title: 'Agua', description: 'Purgar líneas antes de la vacunación.', icon: 'water_drop' },
  { id: '6', category: 'Manejo', title: 'Pesaje', description: 'Muestra individual de 100 aves.', icon: 'scale' },
];

const App: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const allWeeks = useMemo(() => generateWeekData(), []);

  // Preload images for instant transitions
  React.useEffect(() => {
    const imagesToPreload = [
      'Sem 1.png', 'Sem 2.png', 'Sem 3.png',
      'Sem 4.png', 'Sem 5.png', 'Sem 6.png',
      './pellets.png'
    ];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const currentData = allWeeks.find(w => w.week === currentWeek) || allWeeks[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-4">

        <WeekSelector
          currentWeek={currentWeek}
          onChange={setCurrentWeek}
          phase={currentData.phase}
        />

        <div className="mt-8 mb-4 flex items-baseline justify-between px-1">
          <h2 className="text-[22px] font-black text-gray-800">Métricas</h2>
        </div>

        <DashboardStats data={currentData} />

        <div className="mt-10 mb-5 px-1">
          <h2 className="text-[22px] font-black text-gray-800">Enfoque Semanal</h2>
          <p className="text-xs font-medium text-gray-400 mt-1">Tareas prioritarias para la semana {currentWeek}</p>
        </div>
        <FocusSection items={mockFocusItems} />
      </main>

      <BottomNav />
    </div>
  );
};

export default App;