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

    return (
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch">
            {/* Chick Image - Left Column */}
            <div className="w-full md:w-1/2 bg-white rounded-[32px] p-4 shadow-soft border border-gray-50 flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                    src={data.week <= 2 ? "/sem1-2.jpg" : "/sem1-2.jpg"} // Placeholder for other weeks if needed
                    alt="Pollito"
                    className="w-full h-auto object-contain transform scale-110 hover:scale-125 transition-transform duration-500"
                />
            </div>

            {/* Metrics Grid - Right Column */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-3">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-[28px] shadow-soft border border-gray-50 flex flex-col justify-between hover:scale-105 transition-transform">
                        <div className={`${stat.iconBg} ${stat.iconColor} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                            <span className="material-icons-round text-xl">{stat.icon}</span>
                        </div>

                        <div>
                            <p className="text-[9px] font-black text-gray-400 tracking-tighter mb-0.5 uppercase leading-none">{stat.label}</p>
                            <div className="flex items-baseline gap-0.5">
                                <p className="text-xl font-black text-gray-800">{stat.value}</p>
                                <p className="text-[10px] font-bold text-gray-300">{stat.unit}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
