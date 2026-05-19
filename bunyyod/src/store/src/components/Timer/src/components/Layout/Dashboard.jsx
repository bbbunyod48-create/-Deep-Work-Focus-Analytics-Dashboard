import React from 'react';
import CircularTimer from '../Timer/CircularTimer';
import Analytics from '../Analytics/Analytics';
import TagSelector from '../Timer/TagSelector';
import ModeSelector from '../Timer/ModeSelector';
import Sidebar from './Sidebar';
import useStore from '../../store/useStore';
import { EyeOff, Eye } from 'lucide-react';

const Dashboard = () => {
  const { isDeepWorkMode, toggleDeepWorkMode, isSidebarOpen } = useStore();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      {!isDeepWorkMode && <Sidebar />}
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isDeepWorkMode ? 'flex items-center justify-center' : 'p-8 overflow-y-auto'}`}>
        
        {/* Deep Work Toggle */}
        <button 
          onClick={toggleDeepWorkMode}
          className="absolute top-6 right-6 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all z-50 hover:scale-110"
        >
          {isDeepWorkMode ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>

        {isDeepWorkMode ? (
          <div className="flex flex-col items-center animate-fade-in">
            <TagSelector />
            <div className="my-12">
              <CircularTimer />
            </div>
            <ModeSelector />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-10">
            <header>
              <h1 className="text-3xl font-bold tracking-tight">Focus Analytics</h1>
              <p className="text-slate-400 mt-1">Track your deep work sessions</p>
            </header>

            {/* Timer Section */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center shadow-2xl">
              <ModeSelector />
              <TagSelector />
              <div className="my-8">
                <CircularTimer />
              </div>
            </section>

            {/* Analytics Section */}
            <Analytics />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;