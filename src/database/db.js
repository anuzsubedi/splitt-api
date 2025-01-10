import Database from "better-sqlite3";

// Create a database instance
const db = new Database("./src/database/app.db", { verbose: console.log });

// Initialize tables if not already created
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);


export default db;
