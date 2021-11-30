var express = require("express")
var app = express()
var db = require('./database.js')
var dbi = require('./interactionDatabase.js')
var md5 = require("md5")
var cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var numRows = 0;


var HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
 
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
		email: req.body.email
	}
	const stmt = db.prepare("INSERT INTO userinfo (user, pass, email) VALUES (?, ?, ?)")
	const info = stmt.run(data.user, data.pass, data.email);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});


// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});


/*
// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:user", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.body.user);
	res.status(200).json(stmt);
});
*/

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
//might also need to add an update score portion
app.patch("/app/update/user/:id", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
		email: req.body.email
	}
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass), email = COALESCE(?,email) WHERE id = ?");
	const info = stmt.run(data.user, data.pass, data.email, req.params.id);
	res.status(200).json({"message":info.changes +" record updated: ID " + data.user + " (200)"});
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:email
//return changes in message
app.delete("/app/delete/user/:id", (req, res) => {	
	const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?").run(req.params.id);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.user + " (200)"});
});
//Define interaction endpoints
 
// CREATE a new user (HTTP method POST) at endpoint /app/new/interaction
app.post("/app/new/interaction", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
	}
	const stmt = dbi.prepare("INSERT INTO currentuser (user, pass) VALUES (?, ?)")
	const info = stmt.run(data.user, data.pass);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});
// READ a list of all users (HTTP method GET) at endpoint /app/interactions
app.get("/app/interactions/", (req, res) => {	
	const stmt = dbi.prepare("SELECT * FROM currentuser").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/interaction/:id", (req, res) => {	
	const stmt = dbi.prepare("SELECT * FROM currentuser WHERE id = ?").get(req.params.id);
	res.status(200).json(stmt);
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:email
//return changes in message
app.delete("/app/delete/interaction/:id", (req, res) => {	
	const stmt = dbi.prepare("DELETE FROM currentuser WHERE id = ?").run(req.params.id);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.user + " (200)"});
});
// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
