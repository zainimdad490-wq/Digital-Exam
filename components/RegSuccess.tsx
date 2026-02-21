import React from 'react';
import { Student, SubjectKey } from '../types';

interface Props {
  student: Student;
  onGoAdmission: () => void;
  onBack: () => void;
}

const RegSuccess: React.FC<Props> = ({ student, onGoAdmission, onBack }) => {
  const subjects: SubjectKey[] = student.isCompetitive 
    ? ['Competitive'] 
    : ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', student.elective];

  return (
    <div className="flex flex-col items-center py-12 px-6 page-entry">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">Registration Logged</h2>
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2 animate-pulse">Archives Updated Successfully</p>
      </div>

      <div className="w-full max-w-3xl bg-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden text-black light-input-container">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
        
        <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Candidate ID</p>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">{student.rollNumber}</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Issued: {new Date(student.registrationDate).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Neural Core</p>
            <p className="text-xl font-black italic uppercase">Official Slip</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Name</label>
            <p className="font-black uppercase text-lg">{student.name}</p>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Father</label>
            <p className="font-black uppercase text-lg">{student.fatherName}</p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 italic">Assessment Module Schedule ({student.examMode}):</p>
          <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
            <table className="w-full text-[11px] font-black text-left uppercase">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Module</th>
                  <th className="p-4">Window Open Time</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {subjects.map(s => (
                  <tr key={s} className="border-b border-slate-100 last:border-0">
                    <td className="p-4 italic">{s}</td>
                    <td className="p-4 font-mono">
                      {student.isCompetitive ? 'Instant Link' : (
                        student.examMode === 'Instant' ? 'Instant Access' : new Date(student.subjectSchedule[s]).toLocaleString()
                      )}
                    </td>
                    <td className="p-4 text-indigo-600">Ready</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-[9px] font-bold text-slate-400 italic text-center uppercase tracking-widest leading-relaxed">
          Proceed to verification hub to synchronize your neural link and begin evaluation.
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <button onClick={onGoAdmission} className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all">Proceed to Sync</button>
        <button onClick={onBack} className="px-12 py-5 border border-white/10 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-white/5 transition-all">Hub Home</button>
      </div>
    </div>
  );
};

export default RegSuccess;