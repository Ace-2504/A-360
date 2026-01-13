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
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const propertyRouter = require("./routes/property.js");
const userRouter = require("./routes/user.js");

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to A-360 Database");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "a360ecosystemsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; 
    next();
});
passport.use(new LocalStrategy(User.authenticate()));

app.use("/properties", propertyRouter);
app.use("/", userRouter);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.redirect("/properties");
});

app.get("/properties", (req, res) => {
    res.render("properties/index.ejs", { currentUser: null });
});

app.listen(8080, () => {
    console.log("A-360 server is listening on port 8080");
});

