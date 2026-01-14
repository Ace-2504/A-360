const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
function isPasswordStrong(password) {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialChar = false;
    const specialChars = "!@#$%^&*()_+-=[]{}|;':\,./<>?";

    for (let char of password) {
        if (char >= 'A' && char <= 'Z') hasUppercase = true;
        else if (char >= 'a' && char <= 'z') hasLowercase = true;
        else if (char >= '0' && char <= '9') hasNumber = true;
        else if (specialChars.includes(char)) hasSpecialChar = true;
    }

    if (!hasUppercase) return "Password must include at least one uppercase letter.";
    if (!hasLowercase) return "Password must include at least one lowercase letter.";
    if (!hasNumber) return "Password must include at least one number.";
    if (!hasSpecialChar) return "Password must include at least one special character.";

    return null; 
}

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password, role } = req.body;
        const errorMessage = isPasswordStrong(password);
        
        if (errorMessage) {
            req.flash("error", errorMessage);
            return res.redirect("/signup");
        }
        const newUser = new User({ email, username, role });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.redirect("/");
        });
    } catch (e) {
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
    res.redirect("/");
});

router.get("/reset-password", (req, res) => {
    res.render("users/reset.ejs");
});

router.post("/reset-password", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect("/reset-password");
        }

        const errorMsg = isPasswordStrong(password); 
        if (errorMsg) {
            req.flash("error", errorMsg);
            return res.redirect("/reset-password");
        }

        const user = await User.findOne({ username: username });

        if (!user || user.email !== email) {
            req.flash("error", "Username or Email is incorrect.");
            return res.redirect("/reset-password");
        }
        await user.setPassword(password);
        await user.save();

        req.flash("success", "Password updated successfully! Please login.");
        res.redirect("/login");

    } catch (e) {
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/reset-password");
    }
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/");
    });
});

module.exports = router;