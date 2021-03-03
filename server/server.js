// Load environment variables
require("dotenv").config();

// Initialise libraries
const express = require("express");
const app = express();

const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// Load Utility Modules
const db = require("./scripts/db.js");
const security = require("./scripts/security.js");

// Set path to static files
app.use(express.static(path.join(__dirname, "../build")));

// More server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Setting up session variables in their cookies
app.use(
	cookieSession({
		name: "session",
		secret: process.env.COOKIESECRET,
		// 2 Days
		maxAge: 2 * 24 * 60 * 60 * 1000,
	})
);

// Routing
app.use("/*", function (req, res, next) {
	req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
	next();
});

app.use(require("./routes/user.js"));

app.get("/", function (req, res) {
	if (req.session.user) {
		res.sendFile(path.join(__dirname, "../build", "index.html"));
	}
	else {
		res.redirect("/login")
	}
});

// Server listening
app.listen(9000, "0.0.0.0", () => {
	console.log("Listening at http://localhost:9000");
});
