
import React, { useState, useEffect } from 'react';
import { AppStatus, Student, SubjectKey, Announcement, Suggestion, CompetitiveSession, ExamMode, ExamType } from './types';
import { BOOT_DURATION, SUBJECT_MARKS, GAP_START_HOUR } from './constants';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';
import Registration from './components/Registration';
import RegSuccess from './components/RegSuccess';
import Admission from './components/Admission';
import AdmissionSuccess from './components/AdmissionSuccess';
import ExamTerminal from './components/ExamTerminal';
import ResultPortal from './components/ResultPortal';
import AdminPanel from './components/AdminPanel';
import AbroadNotes from './components/AbroadNotes';
import SuggestionsTerminal from './components/SuggestionsTerminal';
import ScheduleWait from './components/ScheduleWait';
import SupplyPortal from './components/SupplyPortal';

const STORAGE_KEY = 'digitalize_portal_final';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.BOOTING);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [notes, setNotes] = useState<Announcement[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [session, setSession] = useState<CompetitiveSession>({ id: crypto.randomUUID(), isLocked: false, createdAt: Date.now() });

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setStudents(parsed.students || []);
      setNotes(parsed.notes || []);
      setSuggestions(parsed.suggestions || []);
      setSession(parsed.session || { id: crypto.randomUUID(), isLocked: false, createdAt: Date.now() });
    }
    setTimeout(() => setStatus(AppStatus.HOME), BOOT_DURATION);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ students, notes, suggestions, session }));
  }, [students, notes, suggestions, session]);

  const currentSessionStudents = students.filter(s => s.isCompetitive && s.sessionId === session.id);

  const registerStudent = (s: Student) => {
    setStudents(prev => [...prev, s]);
    setCurrentStudent(s);
    setStatus(AppStatus.REG_SUCCESS);
  };

  const startSupplySession = (roll: string, mode: ExamMode) => {
    const s = students.find(st => st.rollNumber === roll.toUpperCase());
    if (!s) return { success: false, message: "Roll number not found." };
    if (s.status !== 'Supply' && s.status !== 'Fail') return { success: false, message: "Candidate is already cleared or not yet evaluated." };

    const updated = students.map(st => st.id === s.id ? { 
      ...st, 
      currentExamType: 'Supplementary' as ExamType,
      examMode: mode,
      supplyMarks: {},
      supplyCompleted: [],
      status: 'Pending' as const,
      examTaken: false
    } : st);
    
    setStudents(updated);
    const newS = updated.find(st => st.id === s.id)!;
    setCurrentStudent(newS);
    setStatus(AppStatus.REG_SUCCESS);
    return { success: true };
  };

  const verifyAdmission = (roll: string) => {
    const student = students.find(s => s.rollNumber === roll.toUpperCase());
    if (!student) return { success: false, message: "Credential not found." };
    
    const isSupply = student.currentExamType === 'Supplementary';
    const completed = isSupply ? student.supplyCompleted : student.annualCompleted;
    
    if (student.examMode === 'Gap' && completed.length > 0) {
      const list: SubjectKey[] = ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', student.elective];
      const nextSub = list.find(s => !completed.includes(s));
      if (nextSub && student.subjectSchedule[nextSub] > Date.now()) {
        return { success: false, message: `Access restricted. Next unit: ${nextSub} available tomorrow.` };
      }
    }

    setCurrentStudent(student);
    setStatus(student.isCompetitive ? AppStatus.EXAM : AppStatus.ADMISSION_SUCCESS);
    return { success: true };
  };

  const finalizeExam = (id: string, subjectMarks: Record<string, number>) => {
    const student = students.find(s => s.id === id)!;
    const subject = Object.keys(subjectMarks)[0] as SubjectKey;
    const isSupply = student.currentExamType === 'Supplementary';
    
    const marksRecord = isSupply ? { ...student.supplyMarks, ...subjectMarks } : { ...student.annualMarks, ...subjectMarks };
    const completedList = isSupply ? [...student.supplyCompleted, subject] : [...student.annualCompleted, subject];
    
    // Fix: Cast 'marks' to 'number' to handle cases where Object.entries inference might treat it as unknown.
    const required = isSupply 
      ? Object.entries(student.annualMarks).filter(([sub, marks]) => (marks as number) < (SUBJECT_MARKS[sub as SubjectKey] * 0.4)).map(([sub]) => sub as SubjectKey)
      : ['Islamic Studies', 'Urdu', 'Math', 'English', 'Pak Studies', 'Chemistry', 'Physics', student.elective];

    const isDone = required.every(r => completedList.includes(r as SubjectKey));

    let finalStatus: Student['status'] = 'Pending';
    let examTaken = false;

    if (student.isCompetitive) {
      finalStatus = subjectMarks[subject] >= 170 ? 'Pass' : 'Fail';
      examTaken = true;
    } else if (isDone) {
      const failedInFinal = Object.entries(marksRecord).filter(([sub, m]) => (m as number) < (SUBJECT_MARKS[sub as SubjectKey] * 0.4));
      if (failedInFinal.length === 0) finalStatus = 'Pass';
      else if (failedInFinal.length <= 2) finalStatus = 'Supply';
      else finalStatus = 'Fail';
      examTaken = true;
    }

    const updatedStudents = students.map(s => s.id === id ? { 
      ...s, 
      [isSupply ? 'supplyMarks' : 'annualMarks']: marksRecord,
      [isSupply ? 'supplyCompleted' : 'annualCompleted']: completedList,
      status: finalStatus, 
      examTaken,
    } : s);

    setStudents(updatedStudents);
    const updatedStudent = updatedStudents.find(s => s.id === id)!;
    setCurrentStudent(updatedStudent);

    if (examTaken) setStatus(AppStatus.RESULT);
    else if (student.examMode === 'Instant') setStatus(AppStatus.EXAM);
    else setStatus(AppStatus.SCHEDULE_WAIT);
  };

  return (
    <div className="relative min-h-screen">
      {status === AppStatus.BOOTING && <LoadingScreen />}
      
      <main className={`transition-opacity duration-300 ${status === AppStatus.BOOTING ? 'opacity-0' : 'opacity-100'}`}>
        {status === AppStatus.HOME && (
          <Home onNavigate={(s) => {
            if (s === AppStatus.RESULT) setCurrentStudent(null);
            setStatus(s);
          }} onStartExam={verifyAdmission} notes={notes} compStudents={currentSessionStudents} isSessionLocked={session.isLocked} />
        )}
        {status === AppStatus.REGISTRATION && (
          <Registration onRegister={registerStudent} onBack={() => setStatus(AppStatus.HOME)} students={students} nextRoll={() => `S-${(students.filter(s => !s.isCompetitive).length + 1).toString().padStart(3, '0')}`} />
        )}
        {status === AppStatus.SUPPLY_PORTAL && (
          <SupplyPortal onBack={() => setStatus(AppStatus.HOME)} onRegister={startSupplySession} />
        )}
        {status === AppStatus.COMP_REG && (
          <Registration isCompetitive onRegister={registerStudent} onBack={() => setStatus(AppStatus.HOME)} students={students} nextRoll={() => `C-${(students.filter(s => s.isCompetitive).length + 1).toString().padStart(3, '0')}`} compCount={currentSessionStudents.length} />
        )}
        {status === AppStatus.REG_SUCCESS && currentStudent && (
          <RegSuccess student={currentStudent} onBack={() => setStatus(AppStatus.HOME)} onGoAdmission={() => setStatus(AppStatus.ADMISSION)} />
        )}
        {status === AppStatus.ADMISSION && (
          <Admission onBack={() => setStatus(AppStatus.HOME)} onVerify={verifyAdmission} />
        )}
        {status === AppStatus.ADMISSION_SUCCESS && currentStudent && (
          <AdmissionSuccess student={currentStudent} onStartExam={() => setStatus(AppStatus.EXAM)} onBack={() => setStatus(AppStatus.HOME)} />
        )}
        {status === AppStatus.EXAM && currentStudent && (
          <ExamTerminal student={currentStudent} onFinish={finalizeExam} />
        )}
        {status === AppStatus.SCHEDULE_WAIT && currentStudent && (
          <ScheduleWait student={currentStudent} onFinish={() => setStatus(AppStatus.HOME)} />
        )}
        {status === AppStatus.RESULT && (
          <ResultPortal student={currentStudent} onBack={() => setStatus(AppStatus.HOME)} onSearch={(roll) => {
              const s = students.find(st => st.rollNumber === roll.toUpperCase());
              if (s) setCurrentStudent(s);
            }}
          />
        )}
        {status === AppStatus.ADMIN && (
          <AdminPanel students={students} notes={notes} suggestions={suggestions} compStudents={currentSessionStudents} compSession={session} onStartNewSession={() => setSession({ id: crypto.randomUUID(), isLocked: false, createdAt: Date.now() })} onAddNote={(t) => setNotes([{ id: crypto.randomUUID(), text: t, date: Date.now() }, ...notes])} onUpdateSuggestion={(id, st) => setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: st } : s))} onClose={() => setStatus(AppStatus.HOME)} />
        )}
        {status === AppStatus.ABROAD_NOTES && <AbroadNotes notes={notes} onBack={() => setStatus(AppStatus.HOME)} />}
        {status === AppStatus.SUGGESTIONS && (
          <SuggestionsTerminal suggestions={suggestions} onSubmit={(t) => setSuggestions([{ id: crypto.randomUUID(), text: t, author: 'User', status: 'Pending', timestamp: Date.now() }, ...suggestions])} onBack={() => setStatus(AppStatus.HOME)} />
        )}
      </main>
    </div>
  );
};

export default App;
