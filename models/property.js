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
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   
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