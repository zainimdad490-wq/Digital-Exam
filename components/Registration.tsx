
import React, { useState } from 'react';
import { Student, ExamMode, SubjectKey, ExamType } from '../types';
import { GAP_START_HOUR } from '../constants';

interface Props {
  onRegister: (s: Student) => void;
  onBack: () => void;
  students: Student[];
  nextRoll: () => string;
  isCompetitive?: boolean;
  compCount?: number;
}

const Registration: React.FC<Props> = ({ onRegister, onBack, nextRoll, isCompetitive }) => {
  const [formData, setFormData] = useState({ name: '', fatherName: '', age: '', elective: 'Biology' as const, examMode: 'Instant' as ExamMode });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.fatherName || !formData.age) return setError('Incomplete inputs.');
    
    const age = parseInt(formData.age);
    if (age > 18) return setError('Age limit exceeded (18).');

    const roll = nextRoll();
    const schedule: Record<string, number> = {};
    const subList: SubjectKey[] = ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', formData.elective];

    if (formData.examMode === 'Gap') {
      subList.forEach((sub, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        date.setHours(GAP_START_HOUR, 0, 0, 0);
        schedule[sub] = date.getTime();
      });
    } else {
      subList.forEach(sub => schedule[sub] = Date.now());
    }

    const s: Student = {
      id: crypto.randomUUID(),
      rollNumber: roll,
      name: formData.name.toUpperCase(),
      fatherName: formData.fatherName.toUpperCase(),
      age,
      elective: formData.elective,
      examMode: formData.examMode,
      currentExamType: 'Annual' as ExamType,
      annualMarks: {},
      supplyMarks: {},
      annualCompleted: [],
      supplyCompleted: [],
      subjectSchedule: schedule,
      status: 'Pending',
      attempts: 0,
      examTaken: false,
      isAdmitted: false,
      isCompetitive,
      registrationDate: Date.now()
    };
    onRegister(s);
  };

  return (
    <div className="flex flex-col items-center py-12 page-entry">
      <div className={`holo-glass p-12 rounded-[4rem] w-full max-w-lg border-2 ${isCompetitive ? 'border-pink-500/30' : 'border-indigo-500/30'} bg-white light-input-container shadow-2xl`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">
            {isCompetitive ? 'Combat Registry' : 'Academy Registry'}
          </h2>
          <button onClick={onBack} className="text-slate-400 font-bold uppercase text-[10px]">✕ Abort</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-black">Candidate Identity</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl px-6 py-4 font-black uppercase outline-none text-black" placeholder="FULL NAME" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-black">Parental Core</label>
            <input value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl px-6 py-4 font-black uppercase outline-none text-black" placeholder="FATHER NAME" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-black">Temporal Age</label>
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full bg-slate-100 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl px-6 py-4 font-black outline-none text-black" placeholder="AGE" />
            </div>
            {!isCompetitive && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-black">Elective</label>
                <select value={formData.elective} onChange={e => setFormData({...formData, elective: e.target.value as any})} className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl px-4 py-4 font-black outline-none text-black">
                  <option value="Biology">Biology</option>
                  <option value="Computer">Computer</option>
                </select>
              </div>
            )}
          </div>

          {!isCompetitive && (
            <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block text-center mb-2">Protocol Selection</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setFormData({...formData, examMode: 'Instant'})} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${formData.examMode === 'Instant' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-400 bg-white'}`}>Instant Link</button>
                <button type="button" onClick={() => setFormData({...formData, examMode: 'Gap'})} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border-2 transition-all ${formData.examMode === 'Gap' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-400 bg-white'}`}>1-Day Recess</button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
          
          <button type="submit" className={`w-full py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] text-white shadow-xl ${isCompetitive ? 'bg-pink-600 shadow-pink-100' : 'bg-indigo-600 shadow-indigo-100'}`}>
            Secure Registry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
