import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import DashboardStats from './components/DashboardStats';
import FocusSection from './components/FocusSection';
import BottomNav from './components/BottomNav';
import { WeekData, FocusItem } from './types';

// --- MOCK DATA GENERATORS ---
const generateWeekData = (): WeekData[] => {
  const data: WeekData[] = [];
  for (let i = 1; i <= 75; i++) {
    let phase: 'Cría' | 'Levante' | 'Producción' = 'Cría';
    let targetWeight = 0;

    if (i <= 4) {
      phase = 'Cría';
      targetWeight = 40 + (i * 70);
    } else if (i <= 19) {
      phase = 'Levante';
      targetWeight = 320 + ((i - 4) * 85);
    } else {
      phase = 'Producción';
      targetWeight = 1600 + ((i - 19) * 5);
    }

    data.push({
      week: i,
      phase,
      status: Math.random() > 0.8 ? 'Revisar' : 'Óptimo',
      weightH: Math.floor(targetWeight + (Math.random() * 50 - 25)),
      weightM: Math.floor(targetWeight * 0.95 + (Math.random() * 50 - 25)),
      waterConsumption: i * 15 + (Math.random() * 10),
      feedConsumption: i > 18 ? 112 + (Math.random() * 5) : 10 + (i * 5),
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
  const [currentWeek, setCurrentWeek] = useState<number>(25);
  const allWeeks = useMemo(() => generateWeekData(), []);

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
          <h2 className="text-[22px] font-black text-gray-800">Métricas Clave</h2>
          <span className="text-[10px] font-bold text-gray-300 uppercase letter-spacing-1">Hoy 08:00 AM</span>
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