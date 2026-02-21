import React, { useState } from 'react';

interface Props {
  onVerify: (roll: string) => { success: boolean; message?: string };
  onBack: () => void;
}

const Admission: React.FC<Props> = ({ onVerify, onBack }) => {
  const [roll, setRoll] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onVerify(roll);
    if (!res.success) setError(res.message || 'Error');
  };

  return (
    <div className="flex flex-col items-center py-20 page-entry">
      <div className="bg-white p-12 rounded-[4rem] w-full max-w-lg shadow-2xl relative light-input-container">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
        <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 font-bold text-[10px] uppercase">✕ Abort</button>
        
        <div className="text-center mt-8 mb-10">
          <h2 className="text-3xl font-black italic uppercase text-black tracking-tighter">Gateway Access</h2>
          <p className="text-indigo-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Credential Verification Hub</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-black text-center">Enter Online ID</label>
            <input 
              value={roll} onChange={e => setRoll(e.target.value)} 
              className="w-full bg-slate-100 border-2 border-slate-100 focus:border-indigo-500 rounded-3xl px-8 py-8 font-black text-4xl text-center uppercase outline-none transition-all placeholder:text-slate-200" 
              placeholder="S-000" autoFocus 
            />
          </div>

          {error && <p className="text-red-600 text-[10px] font-black bg-red-50 p-4 rounded-2xl border border-red-100 text-center uppercase">{error}</p>}

          <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200">Verify Identity</button>
        </form>
      </div>
    </div>
  );
};

export default Admission;