
import React, { useState, useMemo } from 'react';
import { Student, Announcement, Suggestion, CompetitiveSession } from '../types';
import { ADMIN_PIN, ACADEMY_NAME } from '../constants';

interface Props {
  students: Student[];
  notes: Announcement[];
  suggestions: Suggestion[];
  compStudents: Student[];
  compSession: CompetitiveSession;
  onStartNewSession: () => void;
  onAddNote: (t: string) => void;
  onUpdateSuggestion: (id: string, st: Suggestion['status']) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ students, notes, suggestions, compStudents, compSession, onStartNewSession, onAddNote, onUpdateSuggestion, onClose }) => {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [broadcast, setBroadcast] = useState('');
  const [tab, setTab] = useState<'OVERVIEW' | 'AUDIT' | 'FEEDBACK'>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toUpperCase();
    return students.filter(s => 
      s.name.toUpperCase().includes(q) || 
      s.rollNumber.toUpperCase().includes(q)
    );
  }, [students, searchQuery]);

  if (!authed) return (
    <div className="flex flex-col items-center py-32 page-entry">
      <div className="holo-glass p-12 rounded-[3rem] w-full max-w-sm text-center border border-indigo-500/30">
        <h2 className="text-2xl font-black italic uppercase text-white mb-8 tracking-tighter">Admin Security</h2>
        <input 
          type="password" maxLength={4} value={pin} onChange={e => {setPin(e.target.value); if(e.target.value === ADMIN_PIN) setAuthed(true);}}
          className="w-full text-center text-5xl font-black bg-white/5 border-2 border-indigo-500/30 rounded-3xl py-6 text-white outline-none focus:border-indigo-500" placeholder="****"
        />
        <button onClick={onClose} className="mt-8 text-indigo-400 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">Abort Link</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 space-y-8 page-entry relative z-50">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-indigo-950 p-8 rounded-[3rem] border border-indigo-500/30 gap-6 shadow-2xl">
        <div className="flex-1">
          <h1 className="text-2xl font-black italic uppercase text-white tracking-tighter">{ACADEMY_NAME} Console</h1>
          <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em]">Master Override Protocol Active</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <nav className="flex gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
            {['OVERVIEW', 'AUDIT', 'FEEDBACK'].map(t => (
              <button key={t} onClick={() => setTab(t as any)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${tab === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>{t}</button>
            ))}
          </nav>
          <button onClick={onClose} className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] rounded-xl hover:bg-slate-100 transition-all shadow-xl">Exit Terminal</button>
        </div>
      </header>

      <div className="space-y-8">
        {tab === 'OVERVIEW' && (
          <>
            <section className="holo-glass p-10 rounded-[3rem] border-2 border-pink-500/30">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                <h3 className="text-xl font-black uppercase italic text-white flex items-center gap-3">
                  <span className="text-2xl">⚔️</span> Competitive Session
                </h3>
                <button onClick={onStartNewSession} className="px-8 py-4 bg-pink-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-pink-900/40 whitespace-nowrap">
                  Initiate New Session
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[0,1,2,3,4].map(idx => {
                  const s = compStudents[idx];
                  return (
                    <div key={idx} className={`p-6 rounded-[2.5rem] border transition-all ${s ? 'bg-pink-500/10 border-pink-500/30' : 'bg-white/5 border-white/5 opacity-20'}`}>
                      <p className="text-[9px] font-black text-pink-400 mb-2 tracking-widest uppercase">Rank #{idx + 1}</p>
                      {s ? (
                        <>
                          <p className="text-white font-bold truncate uppercase text-sm leading-tight">{s.name}</p>
                          <p className="text-3xl font-mono text-white mt-2 font-black tracking-tighter">{s.annualMarks['Competitive'] || 0}</p>
                          <span className={`text-[8px] font-black uppercase mt-1 inline-block ${s.status === 'Pass' ? 'text-green-400' : 'text-red-400'}`}>{s.status}</span>
                        </>
                      ) : <p className="text-[10px] text-slate-600 font-bold italic py-4 text-center">VACANT SLOT</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="holo-glass p-10 rounded-[3rem] border border-indigo-500/20">
              <h3 className="text-xl font-black uppercase italic text-white mb-8 flex items-center gap-3">
                 <span className="text-2xl">📢</span> Broadcast System
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  value={broadcast} onChange={e => setBroadcast(e.target.value)}
                  placeholder="EXAM UPDATE: SELLING COW - CONTACT ADMIN" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-bold text-white outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
                <button 
                  onClick={() => { if(broadcast) { onAddNote(broadcast); setBroadcast(''); }}}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-900/40"
                >
                  Transmit Message
                </button>
              </div>
            </section>
          </>
        )}

        {tab === 'AUDIT' && (
          <section className="holo-glass p-10 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-xl font-black uppercase italic text-white">Neural Registry Audit</h3>
              <div className="relative w-full md:w-72">
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Name / Roll..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left uppercase text-[10px] font-black">
                <thead>
                  <tr className="bg-white/5 text-indigo-400 border-b border-white/10">
                    <th className="p-6">ROLL</th>
                    <th className="p-6">NAME</th>
                    <th className="p-6">MODULES</th>
                    <th className="p-6">OVERALL STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? filteredStudents.map(s => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="p-6 text-white font-mono group-hover:text-indigo-400">{s.rollNumber}</td>
                      <td className="p-6 text-white">{s.name}</td>
                      <td className="p-6 text-slate-400 truncate max-w-xs">{[...s.annualCompleted, ...s.supplyCompleted].join(', ') || 'NONE'}</td>
                      <td className="p-6"><span className={`px-3 py-1 rounded-full ${s.status === 'Pass' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{s.status}</span></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-slate-600 italic">No matching records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === 'FEEDBACK' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map(s => (
              <div key={s.id} className="holo-glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-between gap-6 hover:border-indigo-500/30 transition-all">
                <div>
                  <p className="text-white text-lg font-bold italic mb-4 leading-relaxed">"{s.text}"</p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{new Date(s.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {['Approved', 'Improved', 'Cancelled'].map(st => (
                    <button 
                      key={st} onClick={() => onUpdateSuggestion(s.id, st as any)}
                      className={`flex-1 px-4 py-3 rounded-xl text-[8px] font-black uppercase transition-all ${s.status === st ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
