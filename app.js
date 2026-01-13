const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/properties", (req, res) => {
    res.render("properties/index.ejs", { currentUser: null });
});

app.get("/", (req, res) => {
    res.redirect("/properties");
});

app.listen(8080, () => {
    console.log("A-360 server is listening on port 8080");
});

