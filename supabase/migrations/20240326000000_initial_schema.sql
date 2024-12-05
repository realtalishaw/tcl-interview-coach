-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    full_name text not null,
    age int,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Pageants table
create table public.pageants (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    type text not null,
    time_limit int not null, -- in seconds
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Practice sessions table
create table public.practice_sessions (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    pageant_id uuid references public.pageants(id) on delete set null,
    session_type text not null, -- 'interview', 'personal_intro', 'platform_speech', 'spokesmodel'
    overall_score int not null,
    recording_url text,
    feedback jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Metrics table for detailed performance tracking
create table public.session_metrics (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references public.practice_sessions(id) on delete cascade not null,
    category text not null, -- 'voice_quality', 'content', 'presence', etc.
    metric_name text not null, -- specific metric within category
    score int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert initial pageant types
insert into public.pageants (name, type, time_limit) values
    ('Miss Universe', 'interview', 300),
    ('Miss World', 'interview', 300),
    ('Miss International', 'interview', 300),
    ('General Practice', 'interview', 300);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.session_metrics enable row level security;

-- Create policies
create policy "Users can view own data" on public.users
    for select using (auth.uid() = id);

create policy "Users can update own data" on public.users
    for update using (auth.uid() = id);

create policy "Users can view own sessions" on public.practice_sessions
    for select using (auth.uid() = user_id);

create policy "Users can insert own sessions" on public.practice_sessions
    for insert with check (auth.uid() = user_id);

create policy "Users can view own metrics" on public.session_metrics
    for select using (
        exists (
            select 1 from public.practice_sessions
            where practice_sessions.id = session_metrics.session_id
            and practice_sessions.user_id = auth.uid()
        )
    );

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger handle_users_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();