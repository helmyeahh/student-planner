import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskType = 'deadline' | 'ai' | 'normal';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  time?: string;
  completed: boolean;
  subject_id?: string;
}

export interface Subject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
  target_grade: string;
  schedule: string;
  room: string;
}

export interface Journal {
  id: string;
  date: string;
  subject_id: string;
  rating: number;
  notes: string;
}

interface AppState {
  user: {
    name: string;
  };
  subjects: Subject[];
  tasks: Task[];
  journals: Journal[];
  
  // Actions
  setUserName: (name: string) => void;
  
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  
  addJournal: (journal: Omit<Journal, 'id'>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        name: 'Alex',
      },
      subjects: [
        {
          id: '1',
          name: 'Advanced Calculus',
          difficulty: 'hard',
          color: 'red',
          target_grade: 'A',
          schedule: 'Mon, Wed 09:00 - 10:30',
          room: 'Room 302',
        },
        {
          id: '2',
          name: 'Digital Ethics',
          difficulty: 'easy',
          color: 'green',
          target_grade: 'A+',
          schedule: 'Tue, Thu 11:00 - 12:30',
          room: 'Room 105',
        },
      ],
      tasks: [
        { id: '1', title: 'History Essay Draft', type: 'deadline', time: 'Deadline: 6PM', completed: false },
        { id: '2', title: 'Review AI-generated flashcards', type: 'ai', time: '', completed: false },
        { id: '3', title: 'Math Problem Set', type: 'normal', time: '', completed: true },
      ],
      journals: [],

      setUserName: (name) => set((state) => ({ user: { ...state.user, name } })),

      addSubject: (subject) => set((state) => ({ 
        subjects: [...state.subjects, { ...subject, id: Date.now().toString() }] 
      })),
      
      updateSubject: (id, updatedFields) => set((state) => ({
        subjects: state.subjects.map(sub => sub.id === id ? { ...sub, ...updatedFields } : sub)
      })),
      
      deleteSubject: (id) => set((state) => ({
        subjects: state.subjects.filter(sub => sub.id !== id)
      })),

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Date.now().toString(), completed: false }]
      })),
      
      updateTask: (id, updatedFields) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t)
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      addJournal: (journal) => set((state) => ({
        journals: [...state.journals, { ...journal, id: Date.now().toString() }]
      })),
    }),
    {
      name: 'cogniplan-storage', // key in local storage
    }
  )
);
