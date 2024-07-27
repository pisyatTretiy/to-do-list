const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)");
});

module.exports = db;
