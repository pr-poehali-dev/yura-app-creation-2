CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  season TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gallery_photos (
  id SERIAL PRIMARY KEY,
  author_name TEXT NOT NULL,
  caption TEXT,
  photo_url TEXT NOT NULL,
  season TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE advent_cells (
  id SERIAL PRIMARY KEY,
  cell_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  content_id INTEGER,
  season TEXT NOT NULL,
  is_unlocked BOOLEAN DEFAULT false,
  unlock_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);