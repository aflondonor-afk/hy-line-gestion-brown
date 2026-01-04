import React from 'react';

interface WeekSelectorProps {
    currentWeek: number;
    onChange: (week: number) => void;
    phase: string;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, onChange, phase }) => {
    const weeks = Array.from({ length: 75 }, (_, i) => i + 1);

    // Filter weeks to show a small window (e.g., 5-7 weeks)
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);
    let startIdx = Math.max(0, currentWeek - 1 - halfWindow);

    // Adjust startIdx if we are at the end of the range
    if (startIdx + windowSize > 75) {
        startIdx = 75 - windowSize;
    }

    const visibleWeeks = weeks.slice(startIdx, startIdx + windowSize);

    return (
        <div className="bg-white rounded-[28px] p-4 shadow-soft border border-gray-50 mb-6 max-w-sm mx-auto">
            <div className="flex flex-col items-center">
                {/* Minimalist Title with Integrated Phase */}
                <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-xs font-black text-primary">Semana {currentWeek}</span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">•</span>
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-wider">{phase}</span>
                </div>

                {/* Compact Horizontal List */}
                <div className="flex gap-4 items-center justify-center w-full py-1">
                    {visibleWeeks.map((week) => {
                        const isActive = currentWeek === week;
                        return (
                            <button
                                key={week}
                                onClick={() => onChange(week)}
                                className={`
                                    relative flex items-center justify-center transition-all duration-300
                                    ${isActive ? 'w-10 h-10' : 'w-8 h-8'}
                                `}
                            >
                                <div className={`
                                    w-full h-full rounded-full flex items-center justify-center font-bold text-xs ring-offset-2
                                    ${isActive
                                        ? 'bg-secondary text-primary shadow-glow ring-2 ring-secondary/20 scale-110'
                                        : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
                                    }
                                `}>
                                    {week}
                                </div>
                                {isActive && (
                                    <div className="absolute -bottom-1.5 w-1 h-2.5 bg-secondary rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeekSelector;
