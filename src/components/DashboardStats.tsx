import React from 'react';
import { WeekData } from '../types';

interface DashboardStatsProps {
    data: WeekData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
    const getChickImage = (week: number) => {
        if (week === 0) return "Sem 1.png";
        if (week === 1) return "Sem 2.png";
        if (week === 2) return "Sem 3.png";
        if (week === 3) return "Sem 4.png";
        if (week === 4) return "Sem 5.png";
        if (week === 5) return "Sem 6.png";
        return null;
    };

    const chickImage = getChickImage(data.week);

    const weightStats = [
        { label: 'Peso H', value: data.weightH, unit: 'g', icon: 'inventory_2', color: 'text-blue-600', bg: 'bg-blue-50/50' },
        { label: 'Peso M', value: data.weightM, unit: 'g', icon: 'scale', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    ];

    const consumptionStats = [
        { label: 'Consumo H', value: data.feedConsumptionH.toFixed(1), unit: 'g', icon: 'feed-bag.png', isImage: true, color: 'text-orange-600', bg: 'bg-orange-50/50' },
        { label: 'Consumo M', value: data.feedConsumptionM.toFixed(1), unit: 'g', icon: 'feed-bag.png', isImage: true, color: 'text-rose-600', bg: 'bg-rose-50/50' },
        { label: 'Consumo', value: `≈ ${data.waterConsumption.toFixed(0)}`, unit: 'ml', icon: 'water_drop', color: 'text-cyan-600', bg: 'bg-cyan-50/50' },
    ];

    const renderIcon = (stat: any) => {
        if (stat.isImage) {
            return <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain p-0.5" />;
        }
        return <span className="material-icons-round text-[12px]">{stat.icon}</span>;
    };

    return (
        <div className="flex gap-1.5 items-start justify-center min-h-[300px]">
            {/* Weights Column - Left */}
            <div className="flex flex-col gap-2 w-[76px] flex-shrink-0">
                {weightStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg shadow-soft border border-gray-50 flex flex-col justify-center aspect-square transition-transform active:scale-95">
                        <div className={`${stat.bg} ${stat.color} w-5 h-5 rounded flex items-center justify-center mb-1`}>
                            {renderIcon(stat)}
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-gray-400 tracking-tighter uppercase leading-none mb-0.5">{stat.label}</p>
                            <div className="flex items-baseline gap-0.5">
                                <p className="text-[14px] font-black text-gray-800">{stat.value}</p>
                                <p className="text-[10px] font-bold text-gray-300">{stat.unit}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chick Image - Center */}
            <div className="flex-1 self-center flex items-center justify-center relative group max-h-[300px]">
                {chickImage ? (
                    <img
                        src={chickImage}
                        alt={`Pollito Semana ${data.week}`}
                        className="w-full h-full object-contain transform scale-110 transition-transform duration-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                    />
                ) : (
                    <div className="w-full aspect-square bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 text-center p-4">
                        <span className="material-icons-round text-5xl mb-2">add_a_photo</span>
                        <p className="text-xs font-bold uppercase tracking-widest">Sin foto</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Consumptions Column - Right */}
            <div className="flex flex-col gap-2 w-[76px] flex-shrink-0">
                {consumptionStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg shadow-soft border border-gray-50 flex flex-col justify-center aspect-square transition-transform active:scale-95">
                        <div className={`${stat.bg} ${stat.color} w-5 h-5 rounded flex items-center justify-center mb-1`}>
                            {renderIcon(stat)}
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-gray-400 tracking-tighter uppercase leading-none mb-0.5">{stat.label}</p>
                            <div className="flex items-baseline gap-0.5">
                                <p className="text-[14px] font-black text-gray-800">{stat.value}</p>
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
