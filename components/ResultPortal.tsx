
import React, { useState } from 'react';
import { Student, SubjectKey, ExamType } from '../types';
import { SUBJECT_MARKS } from '../constants';

interface Props {
  student: Student | null;
  onSearch: (roll: string) => void;
  onBack: () => void;
}

const ResultPortal: React.FC<Props> = ({ student, onSearch, onBack }) => {
  const [searchRoll, setSearchRoll] = useState('');
  const [viewType, setViewType] = useState<ExamType>('Annual');

  if (!student) return (
    <div className="flex flex-col items-center py-20 page-entry">
      <div className="holo-glass p-12 rounded-[4rem] w-full max-w-md text-center border-4 border-indigo-500/30 shadow-2xl">
        <h2 className="text-3xl font-black text-white uppercase italic mb-8 tracking-tighter">Digitalize Archive</h2>
        <input 
          maxLength={12} value={searchRoll} onChange={e => setSearchRoll(e.target.value)} 
          placeholder="S-XXX" className="w-full text-center text-4xl font-black py-6 border-4 rounded-3xl mb-8 uppercase bg-white/5 text-white border-indigo-500/30 focus:border-indigo-500 outline-none transition-all placeholder:text-white/10" 
        />
        <button onClick={() => onSearch(searchRoll.toUpperCase())} className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl">Retrieve Records 🔓</button>
        <button onClick={onBack} className="mt-6 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white">Return to Hub</button>
      </div>
    </div>
  );

  const marksRecord = viewType === 'Annual' ? student.annualMarks : student.supplyMarks;
  const currentTotal = (Object.values(marksRecord) as number[]).reduce((a, b) => a + b, 0);
  const maxPossible = Object.keys(marksRecord).reduce((acc, key) => acc + SUBJECT_MARKS[key as SubjectKey], 0);

  return (
    <div className="max-w-4xl mx-auto page-entry pb-20 px-4">
      {/* Exam Type Selector */}
      <div className="flex justify-center mb-10 gap-4">
        <button onClick={() => setViewType('Annual')} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${viewType === 'Annual' ? 'bg-white text-black shadow-2xl' : 'bg-white/5 text-slate-500 border border-white/5'}`}>
          First Annual Exam
        </button>
        <button onClick={() => setViewType('Supplementary')} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${viewType === 'Supplementary' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40' : 'bg-white/5 text-slate-500 border border-white/5'}`}>
          Supplementary Exam
        </button>
      </div>

      <div className={`p-8 md:p-16 rounded-[4rem] border-[8px] shadow-2xl relative transition-all duration-700 ${
        student.status === 'Pass' ? 'bg-indigo-950 border-indigo-500/50' : 'bg-red-950 border-red-500/50'
      } text-white`}>
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-white/20 shadow-inner">
             <span className="text-5xl">{student.status === 'Pass' ? '🏆' : '⚠️'}</span>
          </div>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter">{student.name}</h2>
          <p className="font-mono text-[10px] font-black tracking-[0.4em] opacity-60 mt-4">ROLL: {student.rollNumber} • RECORD: {viewType}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-10 mb-10 border border-white/10 shadow-xl">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40">Modular Results Table</h3>
          <div className="space-y-8">
            {Object.entries(marksRecord).length > 0 ? Object.entries(marksRecord).map(([sub, marks]) => {
              const total = SUBJECT_MARKS[sub as SubjectKey];
              const ratio = ((marks as number) / total) * 100;
              return (
                <div key={sub} className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-wide">
                    <span>{sub}</span>
                    <span className={ratio >= 40 ? 'text-indigo-400' : 'text-red-400'}>{marks} / {total}</span>
                  </div>
                  <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full transition-all duration-[1.5s] ease-out ${ratio >= 40 ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'}`} 
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-10 opacity-30 italic font-bold">No data found in {viewType} archive.</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-black/20 border border-white/10 p-10 rounded-[3rem] text-center shadow-lg">
            <span className="text-[10px] font-black opacity-40 uppercase tracking-widest block mb-3">Obtained Units</span>
            <p className="text-5xl font-black tracking-tighter">{currentTotal} <span className="text-xs opacity-30">/ {maxPossible || '...'}</span></p>
          </div>
          <div className="bg-black/20 border border-white/10 p-10 rounded-[3rem] text-center shadow-lg">
            <span className="text-[10px] font-black opacity-40 uppercase tracking-widest block mb-3">Final Decision</span>
            <p className={`text-3xl font-black tracking-tighter uppercase ${student.status === 'Pass' ? 'text-green-400' : 'text-red-400'}`}>
              {viewType === 'Annual' && student.status === 'Supply' ? 'SUPPLY' : student.status}
            </p>
          </div>
        </div>

        <button onClick={onBack} className="w-full py-7 bg-white text-black rounded-3xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-slate-100 transition-all">Terminate Result Link</button>
      </div>
    </div>
  );
};

export default ResultPortal;
