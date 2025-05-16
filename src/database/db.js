// importerar sql-lite biblioteket
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('airbean.db');

// Skapar alla tabeller när servern startar
db.serialize(() => {
  // Tabell för användare:
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      user_id TEXT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabell för produkter:
  db.run(`
    CREATE TABLE IF NOT EXISTS Products (
      product_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price DECIMAL NOT NULL
    )
  `);

  // Tabell för order:
  db.run(`
    CREATE TABLE IF NOT EXISTS Orders (
      order_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      total_price DECIMAL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY(user_id) REFERENCES Users(user_id)
    )
  `);

  
  db.run(`
    CREATE TABLE IF NOT EXISTS OrderItems (
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      FOREIGN KEY(order_id) REFERENCES Orders(order_id),
      FOREIGN KEY(product_id) REFERENCES Products(product_id)
    )
  `);
});

module.exports = db;