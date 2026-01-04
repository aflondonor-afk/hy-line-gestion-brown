import React from 'react';
import { WeekData } from '../types';

interface DashboardStatsProps {
    data: WeekData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
    const isCria = data.phase === 'Cría';

    const stats = [
        {
            label: 'PESO CORP. H',
            value: data.weightH,
            unit: 'g',
            icon: 'inventory_2',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            label: 'PESO CORP. M',
            value: data.weightM,
            unit: 'g',
            icon: 'scale',
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },
        {
            label: 'CONS. AGUA',
            value: data.waterConsumption.toFixed(1),
            unit: 'ml',
            icon: 'water_drop',
            iconBg: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
        },
        {
            label: 'CONS. ALIMENTO',
            value: data.feedConsumption.toFixed(1),
            unit: 'g',
            icon: 'restaurant',
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
    ];

    const getChickImage = (week: number) => {
        if (week === 1) return "Sem 1.png";
        if (week === 2) return "Sem 2.png";
        if (week === 3) return "Sem 3.png";
        if (week >= 4 && week <= 6) return "Sem 4-6.png";
        return null; // For week 7 onwards
    };

    const chickImage = getChickImage(data.week);

    return (
        <div className="flex gap-4 items-stretch min-h-[380px]">
            {/* Metrics Column - Left */}
            <div className="flex flex-col gap-2.5 w-[110px] flex-shrink-0">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-[24px] shadow-soft border border-gray-50 flex flex-col justify-center flex-1 hover:scale-105 transition-transform">
                        <div className={`${stat.iconBg} ${stat.iconColor} w-7 h-7 rounded-lg flex items-center justify-center mb-1.5`}>
                            <span className="material-icons-round text-base">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-[7.5px] font-black text-gray-400 tracking-tighter uppercase leading-none mb-0.5">{stat.label}</p>
                            <div className="flex items-baseline gap-0.5">
                                <p className="text-sm font-black text-gray-800">{stat.value}</p>
                                <p className="text-[8px] font-bold text-gray-300">{stat.unit}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chick Image - Right Column */}
            <div className="flex-1 bg-white rounded-[32px] p-6 shadow-soft border border-gray-50 flex items-center justify-center overflow-hidden relative group">
                {chickImage ? (
                    <img
                        src={chickImage}
                        alt={`Pollito Semana ${data.week}`}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300 text-center p-4">
                        <span className="material-icons-round text-5xl mb-2">add_a_photo</span>
                        <p className="text-xs font-bold uppercase tracking-widest">Sin foto</p>
                        <p className="text-[10px] mt-1 opacity-60">Semanas 7+</p>
                    </div>
                )}

                {/* Visual Accent */}
                {chickImage && <div className="absolute top-4 right-4 w-12 h-12 bg-secondary/10 rounded-full blur-2xl"></div>}
            </div>
        </div>
    );
};

export default DashboardStats;
