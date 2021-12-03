//This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const dbi = new Database('scores.db');

// Is the database initialized or do we need to initialize it?
const stmt = dbi.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='scores';`);
let row = stmt.get();
if (row === undefined) {
    console.log('Your database appears to be empty. I will initialize it now');
// Set a const that will contain your SQL commands to initialize the database.
//will store user id, username, password, and eventually the score while they are logged in -> on log out we will write this score to the user database to store permanently
const sqlInit = `
    CREATE TABLE scores ( id INTEGER PRIMARY KEY, user TEXT, score INTEGER);
    INSERT INTO scores (user, score) VALUES ('admin','0')`;
// Execute SQL commands that we just wrote above.
    dbi.exec(sqlInit);
    console.log('Your database has been initialized with a new table and two entries containing a username, and email');
} else {
    console.log('current user Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = dbi