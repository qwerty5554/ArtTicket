CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id),

    exhibition TEXT NOT NULL,
    museum TEXT NOT NULL,

    title TEXT,
    place TEXT,

    date TEXT,
    time TEXT,

    count INTEGER,
    price INTEGER,

    status TEXT,

    user_email TEXT,
    name TEXT
);