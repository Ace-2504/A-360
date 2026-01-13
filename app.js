if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Property = require("./models/property.js");
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/a360_db";

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to A-360 Database");
}

main().catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.redirect("/properties");
});

app.get("/properties", (req, res) => {
    res.render("properties/index.ejs", { currentUser: null });
});

app.listen(8080, () => {
    console.log("A-360 server is listening on port 8080");
});

