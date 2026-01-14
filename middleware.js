const Property = require("./models/property");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        // If AJAX request, send 401 instead of redirect
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(401).json({ error: "You must be logged in!" });
        }
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};
module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    req.flash("error", "Access denied! Only A-360 Admins can do that.");
    res.redirect("/properties");
};