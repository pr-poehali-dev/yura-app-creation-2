CREATE TABLE quiz_answers (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id),
  session_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);