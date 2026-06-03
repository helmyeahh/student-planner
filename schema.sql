-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: subjects
create table public.subjects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  base_difficulty_level text check (base_difficulty_level in ('easy', 'medium', 'hard')) not null,
  color_code text not null,
  target_grade text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.subjects enable row level security;
create policy "Users can view own subjects" on public.subjects for select using (auth.uid() = user_id);
create policy "Users can insert own subjects" on public.subjects for insert with check (auth.uid() = user_id);
create policy "Users can update own subjects" on public.subjects for update using (auth.uid() = user_id);
create policy "Users can delete own subjects" on public.subjects for delete using (auth.uid() = user_id);

-- Table: schedules
create table public.schedules (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid references public.subjects(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_of_week integer check (day_of_week >= 0 and day_of_week <= 6) not null,
  start_time time not null,
  end_time time not null,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.schedules enable row level security;
create policy "Users can view own schedules" on public.schedules for select using (auth.uid() = user_id);
create policy "Users can insert own schedules" on public.schedules for insert with check (auth.uid() = user_id);
create policy "Users can update own schedules" on public.schedules for update using (auth.uid() = user_id);
create policy "Users can delete own schedules" on public.schedules for delete using (auth.uid() = user_id);

-- Table: tasks
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  subject_id uuid references public.subjects(id) on delete cascade,
  title text not null,
  type text check (type in ('lecturer_deadline', 'ai_generated_target')) not null,
  due_date timestamp with time zone not null,
  status text check (status in ('pending', 'completed')) default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tasks enable row level security;
create policy "Users can view own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks" on public.tasks for update using (auth.uid() = user_id);
create policy "Users can delete own tasks" on public.tasks for delete using (auth.uid() = user_id);

-- Table: daily_journals
create table public.daily_journals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  subject_id uuid references public.subjects(id) on delete cascade not null,
  date date not null,
  understanding_rating integer check (understanding_rating >= 1 and understanding_rating <= 5) not null,
  reflection_notes text,
  note_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.daily_journals enable row level security;
create policy "Users can view own journals" on public.daily_journals for select using (auth.uid() = user_id);
create policy "Users can insert own journals" on public.daily_journals for insert with check (auth.uid() = user_id);
create policy "Users can update own journals" on public.daily_journals for update using (auth.uid() = user_id);
create policy "Users can delete own journals" on public.daily_journals for delete using (auth.uid() = user_id);
