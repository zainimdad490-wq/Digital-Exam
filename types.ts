
export enum AppStatus {
  BOOTING = 'BOOTING',
  HOME = 'HOME',
  REGISTRATION = 'REGISTRATION',
  REG_SUCCESS = 'REG_SUCCESS',
  ADMISSION = 'ADMISSION',
  ADMISSION_SUCCESS = 'ADMISSION_SUCCESS',
  EXAM = 'EXAM',
  RESULT = 'RESULT',
  ADMIN = 'ADMIN',
  COMP_REG = 'COMP_REG',
  ABROAD_NOTES = 'ABROAD_NOTES',
  SUGGESTIONS = 'SUGGESTIONS',
  SCHEDULE_WAIT = 'SCHEDULE_WAIT',
  SUPPLY_PORTAL = 'SUPPLY_PORTAL'
}

export type SubjectKey = 'Islamic Studies' | 'Urdu' | 'Math' | 'English' | 'Pak Studies' | 'Chemistry' | 'Physics' | 'Biology' | 'Computer' | 'Competitive';

export type ExamMode = 'Instant' | 'Gap';
export type ExamType = 'Annual' | 'Supplementary';

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  age: number;
  elective: 'Biology' | 'Computer';
  examMode: ExamMode;
  currentExamType: ExamType;
  // Separate records for Annual and Supply
  annualMarks: Record<string, number>;
  supplyMarks: Record<string, number>;
  annualCompleted: SubjectKey[];
  supplyCompleted: SubjectKey[];
  
  subjectSchedule: Record<string, number>;
  status: 'Pass' | 'Fail' | 'Supply' | 'Pending';
  attempts: number;
  examTaken: boolean;
  isAdmitted: boolean;
  isCompetitive?: boolean;
  sessionId?: string;
  registrationDate: number;
}

export interface Announcement {
  id: string;
  text: string;
  date: number;
}

export interface Suggestion {
  id: string;
  text: string;
  status: 'Pending' | 'Approved' | 'Improved' | 'Cancelled';
  author: string;
  timestamp: number;
}

export interface Question {
  id: number;
  subject: SubjectKey;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ChatMessage {
  text: string;
  isBot: boolean;
}

export interface CompetitiveSession {
  id: string;
  isLocked: boolean;
  createdAt: number;
}
