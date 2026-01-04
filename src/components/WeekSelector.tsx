import React from 'react';

interface WeekSelectorProps {
    currentWeek: number;
    onChange: (week: number) => void;
    phase: string;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, onChange, phase }) => {
    const weeks = Array.from({ length: 75 }, (_, i) => i + 1);

    return (
        <div className="bg-white rounded-[28px] p-4 shadow-soft border border-gray-50 mb-6 max-w-sm mx-auto">
            <div className="flex flex-col items-center">
                {/* Minimalist Title with Integrated Phase */}
                <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-xs font-black text-primary">Semana {currentWeek}</span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">•</span>
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-wider">{phase}</span>
                </div>

                {/* Scrollable Horizontal List */}
                <div className="w-full relative">
                    <div className="flex gap-3 items-center overflow-x-auto flex-nowrap py-4 no-scrollbar scroll-smooth px-10">
                        {weeks.map((week) => {
                            const isActive = currentWeek === week;
                            return (
                                <button
                                    key={week}
                                    id={`week-${week}`}
                                    onClick={() => onChange(week)}
                                    className={`
                                        relative flex-shrink-0 flex items-center justify-center transition-all duration-300
                                        ${isActive ? 'w-10 h-10' : 'w-9 h-9'}
                                    `}
                                >
                                    <div className={`
                                        w-full h-full rounded-full flex items-center justify-center font-bold text-xs
                                        ${isActive
                                            ? 'bg-secondary text-primary shadow-glow scale-110'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                        }
                                    `}>
                                        {week}
                                    </div>
                                    {isActive && (
                                        <div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(255,209,0,0.8)]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    {/* Subtle Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
        </div>
    );
};

export default WeekSelector;
