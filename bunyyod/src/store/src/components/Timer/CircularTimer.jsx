import React, { useEffect } from 'react';
import useStore from '../../store/useStore';

const CircularTimer = () => {
  const { timeLeft, isRunning, currentMode, modes, toggleTimer, resetTimer, completeSession, setTimeLeft } = useStore();
  const totalDuration = modes[currentMode].duration;

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      completeSession(); // Session tugadi
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, completeSession, setTimeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // SVG Progress Calculation
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalDuration) * circumference;

  const modeColors = {
    focus: 'stroke-emerald-450',
    shortBreak: 'stroke-sky-400',
    longBreak: 'stroke-violet-400'
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-64 h-64">
        <circle cx="128" cy="128" r={radius} stroke="currentColor" strokeWidth="8" fill="none" className="stroke-slate-700/50" />
        <circle 
          cx="128" cy="128" r={radius} 
          stroke="currentColor" strokeWidth="8" fill="none" 
          className={`${modeColors[currentMode]} transition-all duration-1000 ease-linear`}
          strokeLinecap="round"
          strokeDasharray={circumference} 
          strokeDashoffset={circumference - progress} 
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-6xl font-bold tracking-tighter text-slate-50 font-mono">
          {formatTime(timeLeft)}
        </span>
        <span className="text-sm text-slate-400 mt-2 uppercase tracking-widest">
          {modes[currentMode].label}
        </span>
        <div className="flex gap-4 mt-6">
          <button 
            onClick={toggleTimer}
            className="px-6 py-2 bg-emerald-500 text-slate-950 font-semibold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/20"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={resetTimer}
            className="px-4 py-2 bg-slate-700 text-slate-200 rounded-full hover:bg-slate-600 hover:scale-105 transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;