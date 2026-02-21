
import React, { useState } from 'react';
import { Suggestion } from '../types';

interface Props {
  suggestions: Suggestion[];
  onSubmit: (text: string) => void;
  onBack: () => void;
}

const SuggestionsTerminal: React.FC<Props> = ({ suggestions, onSubmit, onBack }) => {
  const [input, setInput] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 page-entry">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter neon-text">Input Node</h1>
          <p className="text-pink-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Neural Refinement Suggestions</p>
        </div>
        <button onClick={onBack} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">✕ Exit</button>
      </div>

      <div className="holo-glass p-10 rounded-[3rem] border border-pink-500/20 mb-12">
        {!sent ? (
          <>
            <textarea 
              value={input} onChange={e => setInput(e.target.value)} 
              placeholder="Inject neural improvement logic here..."
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[150px] outline-none focus:border-pink-500 transition-all font-medium text-white placeholder:opacity-20 mb-6"
            />
            <button 
              onClick={() => { if(input) { onSubmit(input); setInput(''); setSent(true); setTimeout(() => setSent(false), 3000); }}}
              className="w-full py-6 bg-pink-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
            >
              Transmit Suggestion
            </button>
          </>
        ) : (
          <div className="text-center py-12 animate-in zoom-in duration-300">
            <div className="text-5xl mb-6">📡</div>
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Transmission Secured</h3>
            <p className="text-pink-400 text-[9px] font-black uppercase tracking-[0.4em] mt-2 italic">Awaiting Admin Validation Protocol</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic mb-6">Neural Community Sync:</h4>
        {suggestions.map((s, i) => (
          <div key={s.id} className="holo-glass p-6 rounded-[2rem] border border-white/5 flex flex-col gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <p className="text-slate-300 font-medium italic">"{s.text}"</p>
            <div className="flex justify-between items-center">
              <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                s.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 
                s.status === 'Improved' ? 'bg-cyan-500/20 text-cyan-400' : 
                s.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-slate-500'
              }`}>
                {s.status} {s.status === 'Approved' && s.approvedAt && (Date.now() - s.approvedAt < 60000) ? '— [SYNCING...]' : ''}
              </span>
              <span className="text-[8px] font-mono text-slate-600">{new Date(s.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsTerminal;
