
import React, { useState, useMemo, useEffect } from 'react';
import { Student, SubjectKey } from '../types';
import { QUESTIONS, SUBJECT_MARKS } from '../constants';

interface Props {
  student: Student;
  onFinish: (id: string, marks: Record<string, number>) => void;
}

const ExamTerminal: React.FC<Props> = ({ student, onFinish }) => {
  const isSupply = student.currentExamType === 'Supplementary';
  
  const activeSubject = useMemo(() => {
    if (student.isCompetitive) return 'Competitive' as SubjectKey;
    const completed = isSupply ? student.supplyCompleted : student.annualCompleted;
    
    const list: SubjectKey[] = isSupply 
      ? Object.entries(student.annualMarks).filter(([sub, marks]) => (marks as number) < (SUBJECT_MARKS[sub as SubjectKey] * 0.4)).map(([sub]) => sub as SubjectKey)
      : ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', student.elective];
      
    return list.find(s => !completed.includes(s)) || list[0];
  }, [student, isSupply]);

  const questions = useMemo(() => QUESTIONS.filter(q => q.subject === activeSubject), [activeSubject]);
  const qLimit = questions.length;
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(qLimit).fill(-1));
  const [timeLeft, setTimeLeft] = useState(180);

  // SHUFFLING LOGIC: Generate a random order for options for each question once per subject session
  const shuffledOptionIndices = useMemo(() => {
    return questions.map(() => {
      const indices = [0, 1, 2, 3];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    });
  }, [activeSubject, questions]);

  // CRITICAL: Reset timer and index whenever the subject changes
  useEffect(() => {
    setTimeLeft(180);
    setCurrentIdx(0);
    setAnswers(new Array(qLimit).fill(-1));
  }, [activeSubject, qLimit]);

  useEffect(() => {
    if (qLimit === 0) return;
    const t = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    if (timeLeft === 0) finish();
    return () => clearInterval(t);
  }, [timeLeft, qLimit]);

  const finish = () => {
    const correct = answers.reduce((acc, val, i) => {
      // val is the index of the shuffledOptionIndices[i] that the user picked
      // val corresponds to shuffledOptionIndices[i][pickedIdx]
      if (val === -1) return acc;
      const originalIdx = shuffledOptionIndices[i][val];
      return originalIdx === questions[i]?.correctAnswer ? acc + 1 : acc;
    }, 0);
    const score = Math.round(correct * (SUBJECT_MARKS[activeSubject] / qLimit));
    onFinish(student.id, { [activeSubject]: score });
  };

  const q = questions[currentIdx];
  const qOptions = q?.options || [];
  const qIndices = shuffledOptionIndices[currentIdx] || [0, 1, 2, 3];

  if (qLimit === 0) return (
    <div className="flex items-center justify-center h-screen text-white uppercase font-black">
      Error: No questions found for {activeSubject}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 page-entry h-screen flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-black italic uppercase text-indigo-500 tracking-tighter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          {activeSubject}
        </h1>
        <div className="mt-2 h-1 w-32 bg-indigo-500 mx-auto rounded-full opacity-50"></div>
      </div>

      <div className="flex justify-between items-end mb-10 pb-6 border-b border-indigo-500/30">
        <div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Candidate Credentials</p>
          <p className="text-white font-mono font-bold">{student.rollNumber} • {student.name} ({student.currentExamType})</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-black text-indigo-400">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Timer resets per module (180s)</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="holo-glass p-10 rounded-[3rem] border border-white/10 relative shadow-2xl">
          <div className="absolute top-8 left-8 text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Sequence {currentIdx + 1} / {qLimit}</div>
          
          <div className="mt-8 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {q?.text}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qIndices.map((originalIdx, shuffledIdx) => (
              <button key={shuffledIdx} 
                onClick={() => { if(answers[currentIdx] === -1) { const n = [...answers]; n[currentIdx] = shuffledIdx; setAnswers(n); }}}
                disabled={answers[currentIdx] !== -1}
                className={`p-6 rounded-2xl border-2 font-bold text-left transition-all duration-300 transform hover:scale-[1.02] ${
                  answers[currentIdx] === shuffledIdx 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                }`}>
                <div className="flex items-center">
                  {/* Opaque Label Background for Privacy */}
                  <span className={`w-8 h-8 flex items-center justify-center rounded-lg mr-4 font-mono text-xs shadow-md border border-white/20 ${
                    answers[currentIdx] === shuffledIdx ? 'bg-indigo-400 text-white opacity-100' : 'bg-[#1a1a2e] text-indigo-400 opacity-100'
                  }`}>
                    {String.fromCharCode(65 + shuffledIdx)}
                  </span>
                  {qOptions[originalIdx]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <div className="flex gap-2">
          {answers.map((a, i) => (
            <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${
              i === currentIdx ? 'w-8 bg-indigo-500' : 
              a !== -1 ? 'w-4 bg-indigo-900' : 'w-4 bg-white/10'
            }`}></div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => currentIdx < (qLimit - 1) ? setCurrentIdx(p => p + 1) : finish()} 
            disabled={answers[currentIdx] === -1}
            className="px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl disabled:opacity-30 hover:bg-indigo-50 transition-colors"
          >
            {currentIdx === (qLimit - 1) ? 'Finalize Module' : 'Lock Response →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamTerminal;
