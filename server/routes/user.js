const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const path = require("path");

// Load Utility Modules
const db = require("../scripts/db.js");
const security = require("../scripts/security.js");

app.get("/login", async (req, res) => {
	if (req.session.user) {
		return res.redirect("/");
	}
	res.sendFile(path.join(__dirname, "../", "../build", "index.html"));
});

app.get("/logout", function (req, res, next) {
	req.session = null;
	res.redirect("/login");
});

async function AccountExists(email) {
	var result = await db.query("SELECT email FROM users WHERE email = $1", [email.toLowerCase()]);
	if (result === -1) return false;
	else return true;
}

app.post("/register", urlencodedParser, async (req, res) => {
	// Check if an account with that email already exists
	if (AccountExists(req.body.email)) {
		return res.end({ success: false });
	}

	// Hash their password
	var passwordHash = await security.Hash(req.body.password);

	// Insert into the users table
	await db.query(
		"INSERT INTO users (id, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)",
		[
			security.GetUUID(),
			req.body.email.toLowerCase(),
			req.body.first_name,
			req.body.last_name,
			passwordHash,
		]
	);

	// TODO Send confirmation email

	return res.end({ success: true });
});

app.post("/forgotPassword", urlencodedParser, async (req, res) => {
	if (!AccountExists(req.body.email)) {
		return res.end({ success: false });
	}
	return res.end({ success: true });
});

app.post("/login", urlencodedParser, async (req, res) => {
	// Check if an account with their email exists
	// If not return a fail
	if (!AccountExists(req.body.email)) {
		return res.end({ success: false });
	}

	// Get the password and id from their email
	var userQuery = await db.query("SELECT password, id FROM users WHERE email = $1", [
		req.body.email.toLowerCase(),
	]);
	if (userQuery === -1) return res.end({ success: false });

	// Check if the password hash matches the password the user put in
	if (await security.CheckHash(userQuery.rows[0].password, req.body.password)) {
		req.session.user = { id: userQuery.rows[0].id };
		return res.end({ success: true });
	} else {
		return res.end({ success: false });
	}
});

module.exports = app;
