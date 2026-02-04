import { useState, useEffect } from 'react';

const TimeDisplay = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date, timeZone) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: timeZone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <section className="bg-[#111] py-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
                {/* India Time */}
                <div className="flex items-center gap-4 border border-[#333] rounded-full px-8 py-3 bg-[#111] hover:border-white transition-colors cursor-default group">
                    <span className="text-white font-medium text-lg">India:</span>
                    <span className="text-white font-medium text-lg">{formatTime(time, 'Asia/Kolkata')}</span>
                </div>

                {/* Dubai Time */}
                <div className="flex items-center gap-4 border border-[#333] rounded-full px-8 py-3 bg-[#111] hover:border-white transition-colors cursor-default group">
                    <span className="text-white font-medium text-lg">Dubai:</span>
                    <span className="text-white font-medium text-lg">{formatTime(time, 'Asia/Dubai')}</span>
                </div>
            </div>
        </section>
    );
};

export default TimeDisplay;
