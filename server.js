//all database interactions
var express = require("express")
var app = express()
//user database
var db = require('./database.js')
var dbi = require('./interactiondb.js')
//interaction database
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
		email: req.body.email,
	}
	const stmt = db.prepare("INSERT INTO userinfo (user, pass, email, logged) VALUES (?, ?, ?, 0)")
	const info = stmt.run(data.user, data.pass, data.email);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});


// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});


// READ a single user (HTTP method GET) at endpoint /app/user/:user
/*app.get("/app/user/:user", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.params.user);
	res.status(200).json(stmt);
});
*/

// READ a single user (HTTP method GET) at endpoint /app/user/:user
app.get("/app/user/:logged", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE logged = ?").get(req.params.logged);
	res.status(200).json(stmt);
});


// UPDATE a single user (user that is logged in) (HTTP method PATCH) at endpoint app/update/user/:logged
//might also need to add an update score portion
app.patch("/app/update/user/:logged", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
		email: req.body.email
	}
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass), email = COALESCE(?,email) WHERE logged = ?");
	const info = stmt.run(data.user, data.pass, data.email, req.params.logged);
	res.status(200).json({"message":info.changes +" record updated: ID " + data.user + " (200)"});
});
// UPDATE a single user to be logged in (HTTP method PATCH) at endpoint /app/update/user/:user/password/:password
//might also need to add an update score portion
app.patch("/app/update/user/logged/:logged", (req, res) => {	
	const stmt = db.prepare("UPDATE userinfo SET logged = COALESCE(?, logged) WHERE user = ? AND pass = ?");
	const info = stmt.run(req.params.logged, req.body.user, md5(req.body.pass));
	res.status(200).json({"message":info.changes +" record updated: ID " + req.body.user + " (200)"});
});

// UPDATE a single user to be logged in (HTTP method PATCH) at endpoint /app/update/user/:user/password/:password
//might also need to add an update score portion
app.patch("/app/update/user/logoff/:logged", (req, res) => {	
	const stmt = db.prepare("UPDATE userinfo SET logged = COALESCE(0, logged) WHERE logged=?");
	const info = stmt.run(req.params.logged);
	res.status(200).json({"message":info.changes +" record updated: ID " + req.body.user + " (200)"});
});

// DELETE a single user (logged in user) (HTTP method DELETE) at endpoint /app/delete/logged/:logged
//return changes in message
app.delete("/app/delete/logged/:logged", (req, res) => {	
	const stmt = db.prepare("DELETE FROM userinfo WHERE logged = ?").run(req.params.logged);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.user + " (200)"});
});

//<--------------------------------------------------------------------------------------------------->
// CREATE a new score recording (HTTP method POST) at endpoint /app/new/interaction/logged/:logged with a score of 0
app.post("/app/new/interaction/logged/:logged", (req, res) => {	
	const stmt = db.prepare("INSERT INTO userinfo (user, score) VALUES (?, ?) ORDER BY score")
	const info = stmt.run(req.body.user, req.body.score);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});


// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
