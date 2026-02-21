
import React, { useState } from 'react';
import { AppStatus, Announcement, Student } from '../types';
import { ACADEMY_NAME } from '../constants';
import HelpChat from './HelpChat';

interface Props {
  onNavigate: (s: AppStatus) => void;
  onStartExam: (roll: string) => { success: boolean; message?: string };
  notes: Announcement[];
  compStudents: Student[];
  isSessionLocked: boolean;
}

const Home: React.FC<Props> = ({ onNavigate, onStartExam, notes, compStudents, isSessionLocked }) => {
  const [roll, setRoll] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [error, setError] = useState('');

  const handleStart = () => {
    const res = onStartExam(roll);
    if (!res.success) setError(res.message || 'Error');
  };

  return (
    <div className="flex flex-col items-center pt-8 px-6 page-entry pb-20">
      <HelpChat />
      
      <div className="w-full max-w-5xl mb-12 holo-glass p-3 rounded-full border border-indigo-500/30 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 px-6 bg-indigo-600 flex items-center z-10 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Digitalize Stream</span>
        </div>
        <div className="marquee pl-32 flex gap-12 text-sm italic text-indigo-200">
          {notes.length > 0 ? notes.map(n => <span key={n.id}>• {n.text}</span>) : <span>• Welcome to Digitalize Academy Portal — System Online — New Sessions Open...</span>}
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-2 uppercase">
          Digitalize<span className="text-indigo-500">Academy</span>
        </h1>
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">Neural Protocol v5.0 • PB-Punjab Context</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        <div className="holo-glass p-10 rounded-[3rem] border border-indigo-500/20 shadow-2xl">
          <h3 className="text-2xl font-black uppercase italic text-white mb-6">Annual Link</h3>
          {!showAuth ? (
            <button onClick={() => setShowAuth(true)} className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Engage Gateway</button>
          ) : (
            <div className="space-y-4">
              <input value={roll} onChange={e => setRoll(e.target.value)} placeholder="S-XXX" className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 font-black uppercase text-xl outline-none text-white focus:border-indigo-500" />
              {error && <p className="text-red-500 text-[10px] font-black uppercase">{error}</p>}
              <div className="flex gap-2">
                <button onClick={handleStart} className="flex-1 bg-indigo-600 py-4 rounded-xl font-black uppercase text-xs text-white">Link</button>
                <button onClick={() => setShowAuth(false)} className="px-6 border border-white/10 rounded-xl text-white">✕</button>
              </div>
            </div>
          )}
        </div>

        <div className="holo-glass p-10 rounded-[3rem] border border-pink-500/20 hover:border-pink-500/50 transition-all cursor-pointer shadow-2xl"
          onClick={() => onNavigate(AppStatus.SUPPLY_PORTAL)}>
          <h3 className="text-2xl font-black uppercase italic text-white mb-2">Supply Portal</h3>
          <p className="text-pink-400 text-[10px] font-black uppercase tracking-widest mb-6">Supplementary Examination v5.0</p>
          <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed">Failed or Supply modules? Re-register with identical credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <button onClick={() => onNavigate(AppStatus.REGISTRATION)} className="holo-glass p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all text-center">
          <h4 className="text-lg font-black uppercase italic text-white">Registry</h4>
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Enroll Annual</p>
        </button>
        <button onClick={() => onNavigate(AppStatus.COMP_REG)} className="holo-glass p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all text-center">
          <h4 className="text-lg font-black uppercase italic text-white">Combat</h4>
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Competitive Mode</p>
        </button>
        <button onClick={() => onNavigate(AppStatus.RESULT)} className="holo-glass p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/5 transition-all text-center">
          <h4 className="text-lg font-black uppercase italic text-white">Archives</h4>
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Check Result</p>
        </button>
      </div>

      <button onClick={() => onNavigate(AppStatus.ADMIN)} className="px-12 py-4 rounded-full border border-indigo-500/50 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-xl">System Console Override</button>
    </div>
  );
};

export default Home;
