import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import useStore from '../../store/useStore';

const COLORS = ['#34d399', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const Analytics = () => {
  const { sessionHistory } = useStore();

  // Data Processing for Charts
  const last7Days = Array(7).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  const barData = last7Days.map(day => {
    const hours = sessionHistory.filter(s => new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' }) === day && s.mode === 'focus')
                               .reduce((acc, s) => acc + s.duration / 3600, 0);
    return { name: day, hours: parseFloat(hours.toFixed(1)) || 0 };
  });

  const tagDistribution = Object.entries(
    sessionHistory.reduce((acc, s) => {
      acc[s.tag] = (acc[s.tag] || 0) + s.duration;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value / 60) }));

  const intensityData = sessionHistory.slice(-10).map(s => ({ 
    name: new Date(s.date).toLocaleTimeString('en-US', { hour: '2-digit' }), 
    intensity: s.intensity 
  }));

  // Skeleton Loader
  if (sessionHistory.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-64 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-full bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bar Chart - Focus Hours */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-slate-200">Weekly Focus</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{background: '#1e293b', border: 'none', borderRadius: '8px'}} />
            <Bar dataKey="hours" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Tags */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-slate-200">Time by Tag</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={tagDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {tagDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Intensity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-slate-200">Focus Intensity</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={intensityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} hide />
            <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{background: '#1e293b', border: 'none', borderRadius: '8px'}} />
            <Line type="monotone" dataKey="intensity" stroke="#8b5cf6" strokeWidth={2} dot={{r: 4, fill: "#8b5cf6"}} activeDot={{r: 6}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;