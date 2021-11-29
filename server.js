// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require('./database.js')
// Require md5 MODULE
var md5 = require("md5")
//require cors module
var cors = require("cors");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make express use cors
app.use(cors());

// Set server port
var HTTP_PORT = 5000;
// Start server
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
	const stmt = db.prepare("INSERT INTO userinfo (user, pass, email, score) VALUES (?, ?, ?, 0)")
	const info = stmt.run(data.user, data.pass, data.email);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE id = ?").get(req.params.id);
	res.status(200).json(stmt);
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
//might also need to add an update score portion
app.patch("/app/update/user/:user", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
		email: req.body.email
	}
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass), email = COALESCE(?,email) WHERE user = ?");
	const info = stmt.run(data.user, data.pass, data.email, data.user);
	res.status(200).json({"message":info.changes +" record updated: ID " + data.user + " (200)"});
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:email
//return changes in message
app.delete("/app/delete/user/:user", (req, res) => {	
	const stmt = db.prepare("DELETE FROM userinfo WHERE email = ?").run(req.body.user);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.user + " (200)"});
});

// Log In (HTTP method GET) at endpoint /app/user/login
app.get("/app/user/login", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
	}
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?")
	const info = stmt.get(data.user, data.pass);
	res.status(200).json(stmt);
});

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
