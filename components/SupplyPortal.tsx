
import React, { useState } from 'react';
import { ExamMode } from '../types';

interface Props {
  onRegister: (roll: string, mode: ExamMode) => { success: boolean; message?: string };
  onBack: () => void;
}

const SupplyPortal: React.FC<Props> = ({ onRegister, onBack }) => {
  const [roll, setRoll] = useState('');
  const [mode, setMode] = useState<ExamMode>('Instant');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onRegister(roll, mode);
    if (!res.success) setError(res.message || 'Error');
  };

  return (
    <div className="flex flex-col items-center py-20 page-entry">
      <div className="bg-white p-12 rounded-[4rem] w-full max-w-lg shadow-2xl relative light-input-container">
        <div className="absolute top-0 left-0 w-full h-2 bg-pink-600"></div>
        <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 font-bold text-[10px] uppercase">✕ Abort</button>
        
        <div className="text-center mt-8 mb-10">
          <h2 className="text-3xl font-black italic uppercase text-black tracking-tighter">Supplementary Registry</h2>
          <p className="text-pink-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Re-assessment Verification Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-black text-center">Enter Original Online ID</label>
            <input 
              value={roll} onChange={e => setRoll(e.target.value)} 
              className="w-full bg-slate-100 border-2 border-slate-100 focus:border-pink-500 rounded-3xl px-8 py-6 font-black text-3xl text-center uppercase outline-none transition-all" 
              placeholder="S-000" autoFocus 
            />
          </div>

          <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <label className="text-[10px] font-black uppercase tracking-widest text-pink-600 block text-center mb-2">Examination Mode</label>
            <div className="flex gap-4">
              <button type="button" onClick={() => setMode('Instant')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${mode === 'Instant' ? 'bg-pink-600 border-pink-600 text-white shadow-lg' : 'border-slate-200 text-slate-400 bg-white'}`}>Instant Link</button>
              <button type="button" onClick={() => setMode('Gap')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${mode === 'Gap' ? 'bg-pink-600 border-pink-600 text-white shadow-lg' : 'border-slate-200 text-slate-400 bg-white'}`}>1-Day Recess</button>
            </div>
          </div>

          {error && <p className="text-red-600 text-[10px] font-black bg-red-50 p-4 rounded-2xl border border-red-100 text-center uppercase">{error}</p>}

          <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all">Initialize Supply Session</button>
          <p className="text-[9px] font-bold text-slate-400 text-center italic uppercase leading-tight px-4">Note: Roll number will remain the same. New session slip will be issued upon validation.</p>
        </form>
      </div>
    </div>
  );
};

export default SupplyPortal;
