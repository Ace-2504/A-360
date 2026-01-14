const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    contactEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   propertyType: { type: String, enum: ["Flat", "Villa", "Independent House", "PG"] },
    city: String,
    locality: String,
    floor: Number,
    totalFloors: Number,
    facing: { type: String, enum: ["North", "South", "East", "West"] },

    bhk: String,
    bedrooms: Number,
    bathrooms: Number,
    carpetArea: Number,
    furnishing: { type: String, enum: ["Unfurnished", "Semi-Furnished", "Fully Furnished"] },
    deposit: Number,
    maintenance: { type: String, enum: ["Included", "Extra"] },
    leaseDuration: Number,
    availableFrom: Date,
    amenities: [String],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending" 
    },
    adminFeedback: {
        type: String,
        default: "" 
    }, 
    reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }
]
});

module.exports = mongoose.model("Property", propertySchema);