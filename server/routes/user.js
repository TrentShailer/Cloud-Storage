const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const path = require("path");

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

module.exports = app;
