-- Skvaderns styrelse och ämbetsmän
-- Kör detta skript i Supabase SQL Editor om du vill hantera styrelsemedlemmarna dynamiskt via databasen.

CREATE TABLE IF NOT EXISTS public.board_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  role_description text,
  name text NOT NULL,
  email text,
  image text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Aktivera RLS
ALTER TABLE public.board_members ENABLE ROW LEVEL SECURITY;

-- Tillåt alla att läsa styrelsemedlemmar
DROP POLICY IF EXISTS "Allow public read access on board_members" ON public.board_members;
CREATE POLICY "Allow public read access on board_members"
  ON public.board_members
  FOR SELECT
  USING (true);

-- Tillåt inloggade administratörer full behörighet
DROP POLICY IF EXISTS "Allow authenticated full access on board_members" ON public.board_members;
CREATE POLICY "Allow authenticated full access on board_members"
  ON public.board_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Skapa index för snabb sortering
CREATE INDEX IF NOT EXISTS idx_board_members_sort_order ON public.board_members (sort_order ASC);

-- Lägg in Skvaderns traditionella sågverksposter
INSERT INTO public.board_members (role, role_description, name, email, image, sort_order)
VALUES
  ('Patron', 'Ordförande', 'Patron', 'patron@skvadern.net', NULL, 1),
  ('Broder Bas', 'Vice ordförande', 'Broder Bas', 'patron@skvadern.net', NULL, 2),
  ('Bokhållare', 'Skattmästare', 'Broder Bokhållare', 'kassor@skvadern.net', NULL, 3),
  ('Stämplare', 'Sekreterare', 'Broder Stämplare', 'sekreterare@skvadern.net', NULL, 4),
  ('Nitare', 'Klubbmästare & PR', 'Broder Nitare', 'kontakt@skvadern.net', NULL, 5),
  ('Barkborre', 'Kök- & Festkoordinator', 'Broder Barkborre', NULL, NULL, 6),
  ('Pinnpojke', 'Måltidsmarskalk', 'Broder Pinnpojke', NULL, NULL, 7),
  ('Samlare', 'Arkivarie & Förrådsmästare', 'Broder Samlare', NULL, NULL, 8)
ON CONFLICT DO NOTHING;
