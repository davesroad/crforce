
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new Database('users.db');
db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT, role TEXT)`).run();
const count = db.prepare(`SELECT COUNT(*) AS count FROM users`).get().count;
if (count === 0) {
  const insert = db.prepare(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`);
  insert.run("admin@example.com", bcrypt.hashSync("admin123", 10), "admin");
  insert.run("sales@example.com", bcrypt.hashSync("sales123", 10), "sales");
  insert.run("exec@example.com", bcrypt.hashSync("exec123", 10), "executive");
}
function getUserByEmail(email) {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
}
module.exports = { getUserByEmail };
