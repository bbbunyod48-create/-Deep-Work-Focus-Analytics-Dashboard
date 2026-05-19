import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set, get) => ({
    // Timer States
    modes: {
      focus: { duration: 25 * 60, label: 'Focus' },
      shortBreak: { duration: 5 * 60, label: 'Short Break' },
      longBreak: { duration: 15 * 60, label: 'Long Break' },
    },
    currentMode: 'focus',
    timeLeft: 25 * 60,
    isRunning: false,
    selectedTag: 'Coding',
    
    // UI States
    isDeepWorkMode: false,
    isSidebarOpen: true,

    // Data
    sessionHistory: [],

    // Actions
    setCurrentMode: (mode) => set({ currentMode: mode, timeLeft: get().modes[mode].duration, isRunning: false }),
    
    setTimeLeft: (time) => set({ timeLeft: time }),
    
    toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),
    
    resetTimer: () => set((state) => ({ timeLeft: state.modes[state.currentMode].duration, isRunning: false })),
    
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    
    toggleDeepWorkMode: () => set((state) => ({ isDeepWorkMode: !state.isDeepWorkMode })),
    
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    completeSession: () => {
      const state = get();
      const newSession = {
        id: Date.now(),
        mode: state.currentMode,
        tag: state.selectedTag,
        duration: state.modes[state.currentMode].duration,
        date: new Date().toISOString(),
        intensity: Math.random() * 20 + 80 // Simulated focus intensity 80-100
      };
      set({ 
        sessionHistory: [...state.sessionHistory, newSession],
        isRunning: false,
        timeLeft: state.modes[state.currentMode].duration 
      });
    }
  }),
  { name: 'deep-work-storage' } // LocalStorage key
));

export default useStore;