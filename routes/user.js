const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password, role } = req.body;
        
        // DEBUG 1: Is the form data reaching the route?
        console.log("--- SIGNUP ATTEMPT ---");
        console.log("Data:", { username, email, role });

        const newUser = new User({ email, username, role });
        
        // DEBUG 2: Is the User.register function executing?
        const registeredUser = await User.register(newUser, password);
        console.log("SUCCESS: User created in DB:", registeredUser.username);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to A-360!");
            res.redirect("/properties");
        });
    } catch (e) {
        // DEBUG 3: If it fails, WHY? (e.g., User already exists)
        console.log("SIGNUP ERROR:", e.message);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), (req, res) => {
    req.flash("success", "Welcome back to the Ecosystem!");
    res.redirect("/properties");
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/properties");
    });
});

module.exports = router;