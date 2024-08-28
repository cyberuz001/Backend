const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');  // Fayl bazasi

db.serialize(() => {
    // Jadval mavjud bo'lmasa, uni yaratadi
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, family TEXT, formula TEXT, type TEXT, color TEXT, status TEXT)");
});

module.exports = db;
