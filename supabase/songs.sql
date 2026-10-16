-- Skvaderns sångbok tabell i Supabase
-- Kör detta skript i Supabase SQL Editor om tabellen inte redan finns.

CREATE TABLE IF NOT EXISTS public.songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  number INTEGER,
  category TEXT,
  melody TEXT,
  lyrics TEXT NOT NULL DEFAULT '',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index för snabb sökning
CREATE INDEX IF NOT EXISTS songs_slug_idx ON public.songs(slug);
CREATE INDEX IF NOT EXISTS songs_number_idx ON public.songs(number);

-- Aktivera Row Level Security (RLS)
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Alla kan läsa sånger
CREATE POLICY "Public read songs"
  ON public.songs
  FOR SELECT
  USING (true);

-- Endast inloggade administratörer kan lägga till, redigera och ta bort
CREATE POLICY "Authenticated insert songs"
  ON public.songs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated update songs"
  ON public.songs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated delete songs"
  ON public.songs
  FOR DELETE
  TO authenticated
  USING (true);
