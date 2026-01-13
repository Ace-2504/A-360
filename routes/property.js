const express = require("express");
const router = express.Router();
const Property = require("../models/property");
const Review = require("../models/review.js");
const { isLoggedIn, isAdmin } = require("../middleware.js");

router.get("/", async (req, res) => {
    const allProperties = await Property.find({ status: "approved" });
    res.render("properties/index.ejs", { allProperties });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("properties/new.ejs");
});

router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newProperty = new Property(req.body.property);
        newProperty.owner = req.user._id;
        newProperty.image = { url: req.body.property.image, filename: "propimg" };
        
        await newProperty.save();
        req.flash("success", "Property submitted for A-360 verification!");
        res.redirect("/properties");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/properties/new");
    }
});

router.get("/my-submissions", isLoggedIn, async (req, res) => {
    try{
    const userProperties = await Property.find({ owner: req.user._id });
    res.render("properties/my_submissions.ejs", { userProperties });
    } catch(e) {
        req.flash("error", "Could not load your submissions.");
        res.redirect("/properties");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id).populate("owner");
        if (!property) {
            req.flash("error", "Property not found!");
            return res.redirect("/properties");
        }
        res.render("properties/show.ejs", { property });
    } catch (e) {
        res.redirect("/properties");
    }
});

router.get("/admin/dashboard", isLoggedIn, isAdmin, async (req, res) => {
    const pendingProperties = await Property.find({ status: "pending" }).populate("owner");
    res.render("properties/dashboard.ejs", { pendingProperties });
});

router.post("/:id/approve", isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    await Property.findByIdAndUpdate(id, { status: "approved", adminFeedback: "Verified by A-360" });
    req.flash("success", "Property approved and moved to live listings!");
    res.redirect("/properties/admin/dashboard");
});

router.post("/:id/reject", isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { feedback } = req.body;
    await Property.findByIdAndUpdate(id, { status: "rejected", adminFeedback: feedback || "Does not match verification criteria"});
    req.flash("error", "Property rejected.");
    res.redirect("/properties/admin/dashboard");
});

router.post("/:id/reviews", isLoggedIn, async (req, res) => {
    const property = await Property.findById(req.params.id);
    const newReview = new Review(req.body.review);
    
    newReview.author = req.user._id; 
    property.reviews.push(newReview);

    await newReview.save();
    await property.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/properties/${property._id}`);
});

router.delete("/:id/reviews/:reviewId", isLoggedIn, async (req, res) => {
    let { id, reviewId } = req.params;

    await Property.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/properties/${id}`);
});

router.get("/:id", async (req, res) => {
    const property = await Property.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: { path: "author" } 
        })
        .populate("owner");
    res.render("properties/show.ejs", { property });
});

module.exports = router;