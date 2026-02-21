
import React from 'react';
import { Student } from '../types';

interface Props {
  student: Student;
  onFinish: () => void;
}

const ScheduleWait: React.FC<Props> = ({ student, onFinish }) => {
  const isSupply = student.currentExamType === 'Supplementary';
  const completed = isSupply ? student.supplyCompleted : student.annualCompleted;
  
  const nextList = ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', student.elective];
  const nextSub = nextList.find(s => !completed.includes(s as any));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 page-entry text-center">
      <div className="holo-glass p-16 rounded-[4rem] w-full max-w-2xl border-2 border-indigo-600 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 animate-pulse"></div>
        <div className="text-7xl mb-10">🛡️</div>
        
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Module Lock Active</h2>
        <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-10">Neural Cooling Initiated</p>
        
        <div className="bg-indigo-600/10 p-10 rounded-[3rem] border border-indigo-500/20 mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 italic">Scheduled Assessment Unit:</p>
          <h3 className="text-3xl font-black uppercase italic tracking-tight text-white mb-6">{nextSub || 'Session Complete'}</h3>
          
          <div className="bg-white/5 p-6 rounded-2xl">
            <p className="text-sm font-bold text-slate-300 italic leading-relaxed">
              Academic protocol requires a recess between modules in Gap Mode. <br/>
              Your next evaluation unit will be accessible tomorrow at <span className="text-white">08:00 AM</span>.
            </p>
          </div>
        </div>

        <button onClick={onFinish} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all">
          Return to Hub
        </button>
      </div>
    </div>
  );
};

export default ScheduleWait;
