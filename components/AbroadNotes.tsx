
import React from 'react';
import { Announcement } from '../types';

interface Props {
  notes: Announcement[];
  onBack: () => void;
}

const AbroadNotes: React.FC<Props> = ({ notes, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 page-entry">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter neon-text">Abroad Notes</h1>
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Global Neural Broadcasts</p>
        </div>
        <button onClick={onBack} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">✕ Back</button>
      </div>

      <div className="space-y-6">
        {notes.length > 0 ? notes.map((n, i) => (
          <div key={n.id} className="holo-glass p-8 rounded-[2.5rem] border border-indigo-500/20 animate-in slide-in-from-bottom" style={{animationDelay: `${i * 0.1}s`}}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Transmission #{notes.length - i}</span>
              <span className="text-[10px] font-mono text-slate-500">{new Date(n.date).toLocaleDateString()}</span>
            </div>
            <p className="text-lg font-medium text-white italic leading-relaxed">{n.text}</p>
          </div>
        )) : (
          <div className="py-20 text-center holo-glass rounded-[3rem] border border-dashed border-white/10">
            <p className="text-4xl mb-6 opacity-30">🛰️</p>
            <p className="text-slate-500 font-black uppercase tracking-[0.5em] italic">No active records found in archive...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbroadNotes;
