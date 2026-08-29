export type Activity = {
  id: string;
  title: string;
  date: string; // ISO datetime, e.g. "2026-04-15T18:30:00"
  end_date?: string | null; // Optional end datetime
  description: string | null;
  location: string | null;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
  category?: string | null;
  created_at: string;
};
