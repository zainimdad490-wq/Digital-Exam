
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setProgress(p => p < 100 ? p + 1 : 100), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 neural-bg opacity-30"></div>
      
      <div className="relative z-10">
        <div className="w-64 h-64 rounded-full border-2 border-indigo-500/10 border-t-indigo-500 animate-[spin_1.5s_linear_infinite] shadow-[0_0_40px_rgba(99,102,241,0.3)]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black italic tracking-tighter text-white neon-text">{progress}%</span>
        </div>
      </div>
      
      <div className="mt-16 text-center z-10">
        <h2 className="text-2xl font-black italic uppercase text-white tracking-[0.5em] mb-4">Neural Boot Sequence</h2>
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse italic">Synchronizing Overseas Hubs...</p>
      </div>

      <div className="mt-12 w-80 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 relative z-10">
        <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)] transition-all duration-300" style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
