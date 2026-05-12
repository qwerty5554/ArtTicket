CREATE TABLE messages (
    id SERIAL PRIMARY KEY,

    user_email TEXT,
    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);