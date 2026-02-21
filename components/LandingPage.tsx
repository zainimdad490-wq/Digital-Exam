
import React from 'react';

interface Props {
  onProceed: () => void;
}

const LandingPage: React.FC<Props> = ({ onProceed }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="max-w-2xl px-6">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-indigo-100 text-indigo-600 rounded-full border border-indigo-200">
          Neural Core v4.0
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Excellence Through <span className="text-indigo-600">Artificial Insight</span>.
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
          Welcome to the Neural Academy Portal. A high-performance environment designed to evaluate, register, and manage the next generation of neural engineers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onProceed}
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95"
          >
            START ENROLLMENT
          </button>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest px-4">
            Secured via AES-256
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
        {[
          { label: 'Evaluation', desc: 'Comprehensive 10-tier diagnostic exam.' },
          { label: 'Ranking', desc: 'Live global standing calculations.' },
          { label: 'Dossier', desc: 'Digital certification of excellence.' }
        ].map((feat, i) => (
          <div key={i} className="glass p-8 rounded-3xl text-left">
            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">{feat.label}</h3>
            <p className="text-slate-500 text-sm font-medium">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
