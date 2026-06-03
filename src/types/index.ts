export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type TaskType = 'lecturer_deadline' | 'ai_generated_target';
export type TaskStatus = 'pending' | 'completed';

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  base_difficulty_level: DifficultyLevel;
  color_code: string;
  target_grade?: string | null;
  created_at: string;
}

export interface Schedule {
  id: string;
  subject_id: string;
  user_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
  start_time: string; // Time string like '09:00:00'
  end_time: string; // Time string like '10:30:00'
  location?: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  subject_id?: string | null;
  title: string;
  type: TaskType;
  due_date: string;
  status: TaskStatus;
  created_at: string;
}

export interface DailyJournal {
  id: string;
  user_id: string;
  subject_id: string;
  date: string; // YYYY-MM-DD
  understanding_rating: number; // 1 to 5
  reflection_notes?: string | null;
  note_image_url?: string | null;
  created_at: string;
}

// Database schema typing for Supabase Client
export interface Database {
  public: {
    Tables: {
      subjects: {
        Row: Subject;
        Insert: Omit<Subject, 'id' | 'created_at'>;
        Update: Partial<Omit<Subject, 'id' | 'created_at'>>;
      };
      schedules: {
        Row: Schedule;
        Insert: Omit<Schedule, 'id' | 'created_at'>;
        Update: Partial<Omit<Schedule, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
      daily_journals: {
        Row: DailyJournal;
        Insert: Omit<DailyJournal, 'id' | 'created_at'>;
        Update: Partial<Omit<DailyJournal, 'id' | 'created_at'>>;
      };
    };
  };
}
