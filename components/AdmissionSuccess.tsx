
import React from 'react';
import { Student } from '../types';

interface Props {
  student: Student;
  onStartExam: () => void;
  onBack: () => void;
}

const AdmissionSuccess: React.FC<Props> = ({ student, onStartExam, onBack }) => {
  return (
    <div className="flex flex-col items-center animate-in zoom-in duration-500">
      <div className="glass p-12 rounded-[3rem] w-full max-w-lg text-center relative border border-indigo-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 rounded-t-3xl"></div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2 mt-4 uppercase italic">Admission Successful</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">Candidate Verified: {student.name}</p>

        <div className="text-left space-y-6 mb-12 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
          <div>
            <h3 className="text-indigo-600 font-black uppercase text-xs tracking-widest mb-3">Examination Protocol:</h3>
            <ul className="text-slate-600 text-sm font-bold space-y-3">
              <li>• Assessment consists of 10 Neural Logic modules.</li>
              <li>• Total Maximum Marks: 550 Units.</li>
              <li>• Minimum Pass Threshold: 193 Units.</li>
              <li>• Retake requests require Administrator approval.</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-xl border border-indigo-100">
            <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Status Note</p>
            <p className="text-indigo-600 font-black text-sm italic">Candidate is cleared for immediate evaluation.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStartExam}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-indigo-100 transition-all uppercase tracking-widest text-xs"
          >
            Start Examination
          </button>
          <button 
            onClick={onBack}
            className="flex-1 bg-white border border-slate-200 text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSuccess;
