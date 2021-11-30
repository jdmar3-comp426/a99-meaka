var express = require("express")
var app = express()
var db = require('./interactionDatabase.js')
var md5 = require("md5")
var cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


var HTTP_PORT = 5000;
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

//Define endpoints
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});
 
// CREATE a new user (HTTP method POST) at endpoint /app/new/interaction
app.post("/app/new/interaction", (req, res) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass): null,
		date: req.body.date
	}
	const stmt = dbi.prepare("INSERT INTO currentUser (user, pass, date) VALUES (?, ?, ?)")
	const info = stmt.run(data.user, data.pass, data.date);
	res.status(201).json({"message":info.changes +" record created: ID " + info.lastInsertRowid + " (201)"});
});
// READ a list of all users (HTTP method GET) at endpoint /app/interactions
app.get("/app/interactions/", (req, res) => {	
	const stmt = dbi.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/interaction/:id", (req, res) => {	
	const stmt = dbi.prepare("SELECT * FROM currentUser WHERE id = ?").get(req.params.id);
	res.status(200).json(stmt);
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:email
//return changes in message
app.delete("/app/delete/interaction/:id", (req, res) => {	
	const stmt = dbi.prepare("DELETE FROM currentUser WHERE id = ?").run(req.params.id);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.user + " (200)"});
});

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
