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
        { label: 'Peso H', value: data.weightH, unit: 'g', icon: 'female', color: 'text-blue-600', isImage: false },
        { label: 'Peso M', value: data.weightM, unit: 'g', icon: 'male', color: 'text-emerald-600', isImage: false },
    ];

    const consumptionStats = [
        { label: 'Consumo H', value: data.feedConsumptionH.toFixed(0), unit: 'g', icon: './pellets.png', isImage: true, color: 'text-orange-600' },
        { label: 'Consumo M', value: data.feedConsumptionM.toFixed(0), unit: 'g', icon: './pellets.png', isImage: true, color: 'text-rose-600' },
        { label: 'Consumo', value: `≈ ${data.waterConsumption.toFixed(0)}`, unit: 'ml', icon: 'water_drop', isImage: false, color: 'text-cyan-600' },
    ];

    const renderIcon = (stat: any) => {
        if (stat.isImage) {
            return <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain p-0.5" />;
        }
        return <span className="material-icons-round text-[20px]">{stat.icon}</span>;
    };

    return (
        <div className="flex gap-2 items-center justify-center min-h-[300px]">
            {/* Peso Column - Left (Unified Card) */}
            <div className="w-[105px] flex-shrink-0">
                <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
                    <div className="bg-white py-1.5 border-b border-gray-50 text-center">
                        <span className="text-[11px] font-black text-primary uppercase tracking-widest">Peso</span>
                    </div>
                    <div className="flex flex-col">
                        {/* Hembra Row */}
                        <div className="p-2 border-b border-gray-50">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                                <span className="text-[8px] font-bold text-gray-500 uppercase">Hembra</span>
                                <span className="material-icons-round text-primary text-[10px]">female</span>
                            </div>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[18px] font-black text-primary leading-none">{data.weightH}</span>
                                <span className="text-[10px] font-bold text-primary opacity-40">g</span>
                            </div>
                        </div>
                        {/* Macho Row */}
                        <div className="p-2">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                                <span className="text-[8px] font-bold text-gray-500 uppercase">Macho</span>
                                <span className="material-icons-round text-success text-[10px]">male</span>
                            </div>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[18px] font-black text-primary leading-none">{data.weightM}</span>
                                <span className="text-[10px] font-bold text-primary opacity-40">g</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chick Image - Center */}
            <div className="flex-1 self-center flex items-center justify-center relative group max-h-[300px]">
                {chickImage ? (
                    <img
                        src={chickImage}
                        alt={`Pollito Semana ${data.week}`}
                        className="w-full h-full object-contain transform scale-150 transition-transform duration-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                    />
                ) : (
                    <div className="w-full aspect-square bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 text-center p-4">
                        <span className="material-icons-round text-5xl mb-2">add_a_photo</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Consumptions Column - Right (Unified Card) */}
            <div className="flex flex-col gap-2 w-[105px] flex-shrink-0">
                <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
                    {/* Header with Pellet Icon */}
                    <div className="bg-white py-1.5 border-b border-gray-50 flex items-center justify-center gap-1.5">
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Consumo</span>
                        <img src="./pellets.png" className="w-4 h-4 object-contain" alt="" />
                    </div>

                    <div className="flex flex-col">
                        {/* Hembra Alimento */}
                        <div className="p-2 border-b border-gray-50 text-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase block mb-0.5">Hembra</span>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[18px] font-black text-orange-600 leading-none">{data.feedConsumptionH.toFixed(0)}</span>
                                <span className="text-[10px] font-bold text-orange-600 opacity-40">g</span>
                            </div>
                        </div>
                        {/* Macho Alimento */}
                        <div className="p-2 text-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase block mb-0.5">Macho</span>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[18px] font-black text-rose-600 leading-none">{data.feedConsumptionM.toFixed(0)}</span>
                                <span className="text-[10px] font-bold text-rose-600 opacity-40">g</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agua - Keep as separate clean card below */}
                <div className="bg-white p-2 rounded-lg shadow-soft border border-gray-50 flex flex-col justify-center aspect-square transition-transform active:scale-95">
                    <div className="w-8 h-8 rounded flex items-center justify-center mb-1 text-cyan-600">
                        <span className="material-icons-round text-[20px]">water_drop</span>
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-gray-400 tracking-tighter uppercase leading-none mb-0.5">Consumo Agua</p>
                        <div className="flex items-baseline gap-0.5">
                            <p className="text-[14px] font-black text-gray-800">≈ {data.waterConsumption.toFixed(0)}</p>
                            <p className="text-[10px] font-bold text-gray-300">ml</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
